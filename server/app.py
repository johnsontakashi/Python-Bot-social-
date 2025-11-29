from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from models import Base, Activity
from schemas import ActivityIn
from config import settings
from aggregation import aggregate_sentiment, aggregate_time_series, aggregate_languages, aggregate_streams
import json

engine = create_engine(settings.DATABASE_URL, future=True)
SessionLocal = scoped_session(sessionmaker(bind=engine, autoflush=False, autocommit=False, expire_on_commit=False))

app = Flask(__name__)
CORS(app, origins="*")

@app.before_request
def create_tables_if_needed():
    # Lazy init (for local dev). In prod use Alembic migrations.
    Base.metadata.create_all(engine)

@app.route('/api/health')
def health():
    return {'status': 'ok'}

@app.route('/api/activities', methods=['POST'])
def ingest_activities():
    """Accept JSON array or NDJSON in body."""
    raw = request.data.decode('utf-8')
    items = []
    try:
        data = json.loads(raw)
        if isinstance(data, list):
            items = data
        elif isinstance(data, dict):
            items = [data]
    except json.JSONDecodeError:
        for line in raw.splitlines():
            line = line.strip()
            if not line:
                continue
            try:
                items.append(json.loads(line))
            except json.JSONDecodeError:
                pass
    if not items:
        return jsonify({'error': 'No valid JSON objects found'}), 400

    session = SessionLocal()
    created = 0
    for obj in items:
        try:
            activity_in = ActivityIn.model_validate(obj)
            activity = Activity.from_schema(activity_in)
            session.add(activity)
            created += 1
        except Exception:
            pass
    session.commit()
    return jsonify({'ingested': created})

@app.route('/api/activities', methods=['GET'])
def list_activities():
    language = request.args.get('language')
    limit = int(request.args.get('limit', 100))
    session = SessionLocal()
    q = session.query(Activity)
    if language and language != 'all':
        q = q.filter(Activity.languages.like(f'%{language.lower()}%'))
    rows = q.order_by(Activity.timestamp.desc()).limit(limit).all()
    return jsonify([r.to_dict() for r in rows])

@app.route('/api/activities/aggregate', methods=['GET'])
def aggregate():
    language = request.args.get('language')
    session = SessionLocal()
    q = session.query(Activity)
    if language and language != 'all':
        q = q.filter(Activity.languages.like(f'%{language.lower()}%'))
    rows = [r.to_dict() for r in q.all()]
    return jsonify({
        'sentiment': aggregate_sentiment(rows),
        'timeSeries': aggregate_time_series(rows, request.args.get('granularity','day')),
        'languages': aggregate_languages(rows),
        'streams': aggregate_streams(rows),
        'total': len(rows)
    })

@app.route('/api/activities/export', methods=['GET'])
def export_filtered():
    language = request.args.get('language')
    fmt = request.args.get('format', 'json')  # json | jsonl
    session = SessionLocal()
    q = session.query(Activity)
    if language and language != 'all':
        q = q.filter(Activity.languages.like(f"%{language.lower()}%"))
    rows = [r.to_dict() for r in q.all()]
    if fmt == 'jsonl':
        # Return NDJSON / JSONL lines
        lines = '\n'.join(json.dumps(r) for r in rows)
        return Response(lines, mimetype='application/x-ndjson')
    return jsonify(rows)

@app.route('/api/activities/<int:activity_id>', methods=['DELETE'])
def delete_activity(activity_id: int):
    session = SessionLocal()
    obj = session.query(Activity).filter(Activity.id == activity_id).first()
    if not obj:
        return jsonify({'error': 'Not found'}), 404
    session.delete(obj)
    session.commit()
    return ('', 204)

@app.route('/api/activities/bulk_delete', methods=['POST'])
def bulk_delete():
    data = request.get_json(silent=True) or {}
    ids = data.get('ids') or []
    if not isinstance(ids, list) or not ids:
        return jsonify({'error': 'ids list required'}), 400
    session = SessionLocal()
    q = session.query(Activity).filter(Activity.id.in_(ids))
    deleted = q.count()
    q.delete(synchronize_session=False)
    session.commit()
    return jsonify({'deleted': deleted})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
