from celery import Celery
from config import settings
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, Activity
from schemas import ActivityIn
import json

celery_app = Celery('social_monitor', broker=settings.CELERY_BROKER_URL, backend=settings.CELERY_RESULT_BACKEND)

engine = create_engine(settings.DATABASE_URL, future=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, expire_on_commit=False)

@celery_app.task
def ingest_json_text(text: str):
    items = []
    try:
        data = json.loads(text)
        if isinstance(data, list):
            items = data
        elif isinstance(data, dict):
            items = [data]
    except json.JSONDecodeError:
        for line in text.splitlines():
            line = line.strip()
            if not line:
                continue
            try:
                items.append(json.loads(line))
            except json.JSONDecodeError:
                pass
    session = SessionLocal()
    created = 0
    for obj in items:
        try:
            a_in = ActivityIn.model_validate(obj)
            session.add(Activity.from_schema(a_in))
            created += 1
        except Exception:
            pass
    session.commit()
    return {'ingested': created}

@celery_app.task
def placeholder_social_pull(source: str):
    # TODO: integrate actual platform APIs
    return {'source': source, 'status': 'not_implemented'}
