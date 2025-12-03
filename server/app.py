from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from models import Base, Activity, Dashboard, Display, Playlist, PlaylistItem, DisplayAssignment
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


# Dashboards CRUD
@app.route('/api/dashboards', methods=['GET'])
def list_dashboards():
    session = SessionLocal()
    rows = session.query(Dashboard).order_by(Dashboard.id.desc()).all()
    return jsonify([r.to_dict() for r in rows])


@app.route('/api/dashboards', methods=['POST'])
def create_dashboard():
    data = request.get_json(silent=True) or {}
    session = SessionLocal()
    obj = Dashboard(
        name=data.get('name') or 'Untitled',
        description=data.get('description'),
        resolution=data.get('resolution'),
        layout_json=data.get('layout') if isinstance(data.get('layout'), str) else json.dumps(data.get('layout')) if data.get('layout') else None,
    )
    session.add(obj)
    session.commit()
    return jsonify(obj.to_dict()), 201


@app.route('/api/dashboards/<int:dashboard_id>', methods=['GET'])
def get_dashboard(dashboard_id: int):
    session = SessionLocal()
    obj = session.query(Dashboard).get(dashboard_id)
    if not obj:
        return jsonify({'error': 'Not found'}), 404
    return jsonify(obj.to_dict())


@app.route('/api/dashboards/<int:dashboard_id>', methods=['PUT'])
def update_dashboard(dashboard_id: int):
    data = request.get_json(silent=True) or {}
    session = SessionLocal()
    obj = session.query(Dashboard).get(dashboard_id)
    if not obj:
        return jsonify({'error': 'Not found'}), 404
    obj.name = data.get('name', obj.name)
    obj.description = data.get('description', obj.description)
    obj.resolution = data.get('resolution', obj.resolution)
    layout = data.get('layout')
    if layout is not None:
        obj.layout_json = layout if isinstance(layout, str) else json.dumps(layout)
    session.commit()
    return jsonify(obj.to_dict())


@app.route('/api/dashboards/<int:dashboard_id>', methods=['DELETE'])
def delete_dashboard(dashboard_id: int):
    session = SessionLocal()
    obj = session.query(Dashboard).get(dashboard_id)
    if not obj:
        return jsonify({'error': 'Not found'}), 404
    session.delete(obj)
    session.commit()
    return ('', 204)


# Displays CRUD and assignment
@app.route('/api/displays', methods=['GET'])
def list_displays():
    session = SessionLocal()
    rows = session.query(Display).order_by(Display.id.desc()).all()
    return jsonify([r.to_dict() for r in rows])


@app.route('/api/displays', methods=['POST'])
def create_display():
    data = request.get_json(silent=True) or {}
    session = SessionLocal()
    obj = Display(
        name=data.get('name') or 'New Display',
        location=data.get('location'),
        resolution=data.get('resolution'),
    )
    session.add(obj)
    session.commit()
    return jsonify(obj.to_dict()), 201


@app.route('/api/displays/<int:display_id>', methods=['PUT'])
def update_display(display_id: int):
    data = request.get_json(silent=True) or {}
    session = SessionLocal()
    obj = session.query(Display).get(display_id)
    if not obj:
        return jsonify({'error': 'Not found'}), 404
    obj.name = data.get('name', obj.name)
    obj.location = data.get('location', obj.location)
    obj.resolution = data.get('resolution', obj.resolution)
    session.commit()
    return jsonify(obj.to_dict())


@app.route('/api/displays/<int:display_id>', methods=['DELETE'])
def delete_display(display_id: int):
    session = SessionLocal()
    obj = session.query(Display).get(display_id)
    if not obj:
        return jsonify({'error': 'Not found'}), 404
    session.delete(obj)
    session.commit()
    return ('', 204)


@app.route('/api/displays/<int:display_id>/assignment', methods=['GET'])
def get_display_assignment(display_id: int):
    session = SessionLocal()
    asg = session.query(DisplayAssignment).filter(DisplayAssignment.display_id == display_id).first()
    if not asg:
        return jsonify(None)
    return jsonify(asg.to_dict())


@app.route('/api/displays/<int:display_id>/assignment', methods=['PUT'])
def put_display_assignment(display_id: int):
    data = request.get_json(silent=True) or {}
    dashboard_id = data.get('dashboardId')
    playlist_id = data.get('playlistId')
    if not dashboard_id and not playlist_id:
        return jsonify({'error': 'dashboardId or playlistId required'}), 400
    if dashboard_id and playlist_id:
        return jsonify({'error': 'Provide only one of dashboardId or playlistId'}), 400
    session = SessionLocal()
    asg = session.query(DisplayAssignment).filter(DisplayAssignment.display_id == display_id).first()
    if not asg:
        asg = DisplayAssignment(display_id=display_id)
        session.add(asg)
    asg.dashboard_id = dashboard_id if dashboard_id else None
    asg.playlist_id = playlist_id if playlist_id else None
    session.commit()
    return jsonify(asg.to_dict())


# Playlists CRUD and items
@app.route('/api/playlists', methods=['GET'])
def list_playlists():
    session = SessionLocal()
    rows = session.query(Playlist).order_by(Playlist.id.desc()).all()
    return jsonify([r.to_dict() for r in rows])


@app.route('/api/playlists', methods=['POST'])
def create_playlist():
    data = request.get_json(silent=True) or {}
    session = SessionLocal()
    obj = Playlist(
        name=data.get('name') or 'New Playlist',
        description=data.get('description'),
    )
    session.add(obj)
    session.commit()
    return jsonify(obj.to_dict()), 201


@app.route('/api/playlists/<int:playlist_id>', methods=['PUT'])
def update_playlist(playlist_id: int):
    data = request.get_json(silent=True) or {}
    session = SessionLocal()
    obj = session.query(Playlist).get(playlist_id)
    if not obj:
        return jsonify({'error': 'Not found'}), 404
    obj.name = data.get('name', obj.name)
    obj.description = data.get('description', obj.description)
    session.commit()
    return jsonify(obj.to_dict())


@app.route('/api/playlists/<int:playlist_id>', methods=['DELETE'])
def delete_playlist(playlist_id: int):
    session = SessionLocal()
    obj = session.query(Playlist).get(playlist_id)
    if not obj:
        return jsonify({'error': 'Not found'}), 404
    # delete items first
    session.query(PlaylistItem).filter(PlaylistItem.playlist_id == playlist_id).delete(synchronize_session=False)
    session.delete(obj)
    session.commit()
    return ('', 204)


@app.route('/api/playlists/<int:playlist_id>/items', methods=['GET'])
def get_playlist_items(playlist_id: int):
    session = SessionLocal()
    items = session.query(PlaylistItem).filter(PlaylistItem.playlist_id == playlist_id).order_by(PlaylistItem.order_index.asc()).all()
    return jsonify([i.to_dict() for i in items])


@app.route('/api/playlists/<int:playlist_id>/items', methods=['PUT'])
def put_playlist_items(playlist_id: int):
    data = request.get_json(silent=True) or []
    if not isinstance(data, list):
        return jsonify({'error': 'Expected an array of items'}), 400
    session = SessionLocal()
    session.query(PlaylistItem).filter(PlaylistItem.playlist_id == playlist_id).delete(synchronize_session=False)
    for item in data:
        dashboard_id = item.get('dashboardId')
        order_index = int(item.get('order', 0))
        duration = int(item.get('durationSeconds', 30))
        session.add(PlaylistItem(
            playlist_id=playlist_id,
            dashboard_id=dashboard_id,
            order_index=order_index,
            duration_seconds=duration,
        ))
    session.commit()
    items = session.query(PlaylistItem).filter(PlaylistItem.playlist_id == playlist_id).order_by(PlaylistItem.order_index.asc()).all()
    return jsonify([i.to_dict() for i in items])


# Lightweight player payload for a display
@app.route('/api/displays/<int:display_id>/player', methods=['GET'])
def get_display_player_payload(display_id: int):
    session = SessionLocal()
    asg = session.query(DisplayAssignment).filter(DisplayAssignment.display_id == display_id).first()
    if not asg:
        return jsonify({'mode': 'none'})
    if asg.dashboard_id:
        dash = session.query(Dashboard).get(asg.dashboard_id)
        return jsonify({'mode': 'dashboard', 'dashboard': dash.to_dict() if dash else None})
    if asg.playlist_id:
        pl = session.query(Playlist).get(asg.playlist_id)
        items = session.query(PlaylistItem).filter(PlaylistItem.playlist_id == asg.playlist_id).order_by(PlaylistItem.order_index.asc()).all()
        return jsonify({'mode': 'playlist', 'playlist': pl.to_dict() if pl else None, 'items': [i.to_dict() for i in items]})
    return jsonify({'mode': 'none'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
