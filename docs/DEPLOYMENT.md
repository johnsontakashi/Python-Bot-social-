# Deployment & Integration Guide

This guide explains how to run the full stack (React frontend, Flask API backend, PostgreSQL, RabbitMQ, Celery worker) locally and on client servers that support ASP.NET/IIS, Node.js, PHP/Apache, or Java/Tomcat.

## Quick Start (Docker Compose)

1. Create `.env` (copy `.env.example`):

```
# Flask backend
DATABASE_URL=postgresql+psycopg2://postgres:postgres@postgres:5432/political_monitor
SECRET_KEY=dev

# Celery worker and broker
CELERY_BROKER_URL=amqp://guest:guest@rabbitmq:5672//
CELERY_RESULT_BACKEND=rpc://

# Frontend (React)
REACT_APP_API_BASE=http://localhost:5000/api
```

2. Build and start:

```
docker compose up -d --build
```

3. URLs:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api`
- RabbitMQ UI: `http://localhost:15672` (guest/guest)

## Running Without Docker (Windows PowerShell)

1. Backend (Flask API):
```
python -m venv .venv; . .venv\Scripts\Activate.ps1
pip install -r server\requirements.txt
$env:DATABASE_URL = "postgresql+psycopg2://postgres:postgres@localhost:5432/political_monitor"
$env:SECRET_KEY = "dev"
$env:CELERY_BROKER_URL = "amqp://guest:guest@localhost:5672//"
$env:CELERY_RESULT_BACKEND = "rpc://"
cd server; alembic upgrade head; cd ..
python server\app.py
```

2. Worker (Celery):
```
cd server
celery -A tasks.celery_app worker --loglevel=info
```

3. Frontend (React):
```
npm install
$env:REACT_APP_API_BASE = "http://localhost:5000/api"
npm start
```

## Integration on Client Servers

Recommended patterns:
- Docker Compose (preferred): run all services in containers.
- Hybrid: containerize API + worker; serve React build via IIS/Apache/Nginx/Tomcat; proxy `/api` to Flask.
- Pure services: run Flask API under Gunicorn/Uvicorn as a service; RabbitMQ and PostgreSQL as services; Celery worker as a service.

Reverse proxy examples:
- ASP.NET/IIS: URL Rewrite mapping `/api/*` → `http://localhost:5000/api/*`.
- PHP/Apache: `ProxyPass /api http://127.0.0.1:5000/api`.
- Java/Tomcat behind Nginx: proxy `/api`; serve React build as static.
- Node.js: `http-proxy-middleware` or Nginx for `/api`.

## Databases

Optimized for PostgreSQL. To switch:
- Update `DATABASE_URL`:
  - PostgreSQL: `postgresql+psycopg2://user:pass@host:5432/db`
  - MySQL/MariaDB: `mysql+pymysql://user:pass@host:3306/db` (add `PyMySQL`)
  - SQL Server: `mssql+pyodbc://user:pass@server/db?driver=ODBC+Driver+17+for+SQL+Server` (add `pyodbc`)
  - SQLite (dev): `sqlite:///local.db`
  - DuckDB (experimental): `duckdb:///local.duckdb`
- Add driver to `server/requirements.txt`.
- Run migrations: `cd server; alembic upgrade head`.
- Validate column types/index constraints per DB.

## API Endpoints

- `POST /api/activities` — Ingest JSON array or NDJSON lines.
- `GET /api/activities?language=all&limit=100` — List recent activities.
- `GET /api/activities/aggregate?language=all&granularity=day` — Aggregates.
- `GET /api/activities/export?format=json|jsonl&language=all` — Export.
- `DELETE /api/activities/{id}` — Delete one.
- `POST /api/activities/bulk_delete` — Delete many (`{"ids":[1,2]}`).

## Frontend Integration

- Set `REACT_APP_API_BASE` to point React to the backend.
- `src/api.js` centralizes calls; `ActivityDashboard` and `DataExplorer` use API with sample fallback.
- Super Admin dashboard enables export (JSON/JSONL), preview, and download.

## Production Hardening

- Use strong `SECRET_KEY` and broker credentials.
- Enforce HTTPS for frontend and API.
- Disable lazy table creation; rely on Alembic migrations only.
- Add authentication/authorization for admin operations.
- Configure logging/monitoring and backups for PostgreSQL.
