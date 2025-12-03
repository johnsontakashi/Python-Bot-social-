# FTP / SFTP Deployment Guide

This guide explains what you can (and cannot) do when deploying this project using only FTP access, and how to prepare the correct artifacts.

> If possible, request **SFTP (SSH File Transfer Protocol)** or full **SSH shell access**. Plain FTP is insecure (credentials + data unencrypted) and severely limits backend setup (Python virtualenv, Celery worker, RabbitMQ, database migrations). SFTP or SSH gives you command execution which you need for the backend services.

## 1. Understand Hosting Constraints

From the screenshot the remote root shows only `/` with `cgi-bin` and an `index.html`. This looks like a typical shared hosting or panel-managed environment. Such environments often:
- Provide a web root (e.g., `/public_html` or `/`)
- Allow static file hosting (HTML/CSS/JS)
- Sometimes allow limited CGI / PHP scripts
- Do **not** let you run long-lived processes (Celery, RabbitMQ) or custom services

The full stack (Flask API + Celery + RabbitMQ + PostgreSQL) usually **requires** either a VPS, container hosting, or PaaS with process control. If the client insists on their existing shared hosting only, you should:
- Deploy **only the static React build** to FTP
- Host the backend separately (e.g., a small VPS, Render, Railway, Azure, AWS EC2, Heroku alternative) and set `REACT_APP_API_BASE` to point there.

## 2. Frontend Deployment Via FTP

### Build Locally
```powershell
# From project root
npm install
npm run build
```
This creates a production-ready static site in `build/`.

### Upload Files
Using FileZilla:
1. Left pane: navigate to your local `build/` folder (`C:\Users\ndrwb\OneDrive\Desktop\PROJECTS\Python-Bot-social-\build`).
2. Right pane (remote): navigate to web root (the directory where `index.html` lives). Often that is `/` or `/public_html`.
3. Upload **all contents inside** `build/` (not the folder itself, unless you want it nested) — typically: `index.html`, `asset-manifest.json`, `static/` directory, etc.
4. If an existing `index.html` is present, rename the old one first (e.g., `index_old.html`) then upload new.

### Cache Busting / Overwrites
- The build uses hashed filenames (e.g., `main.cc13d35b.js`) so overwriting is safe.
- Ensure transfer type is **Binary** (FileZilla: Transfer > Transfer type > Binary) to avoid newline corruption.

### Verification
Visit the site’s public URL. Hard refresh (`Ctrl+F5`). If API calls fail, open dev tools Network tab and confirm requests go to the correct `REACT_APP_API_BASE`.

## 3. Backend Deployment Options

You cannot reliably run the Flask API through FTP alone. Choose one:

| Option | Where | Pros | Cons |
|--------|-------|------|------|
| Docker Compose | Client VPS | Full stack identical to dev | Needs Docker + ports |
| Managed Postgres + Managed RabbitMQ + Gunicorn/Uvicorn | Cloud provider | Scalable, secure | More configuration |
| Single VPS (systemd services) | Ubuntu/Debian server | Direct control | Manual hardening |
| PaaS (Render/Railway/Fly.io) | Cloud | Fast to deploy | Costs / service limits |

### Minimal Backend Deployment (Gunicorn + systemd)
On an SSH-capable server:
```bash
sudo apt update && sudo apt install -y python3-pip python3-venv
python3 -m venv /opt/pmonitor/venv
source /opt/pmonitor/venv/bin/activate
pip install -r server/requirements.txt
export DATABASE_URL=postgresql+psycopg2://user:pass@db-host:5432/political_monitor
export SECRET_KEY=CHANGE_ME
export CELERY_BROKER_URL=amqp://user:pass@rabbitmq-host:5672//
export CELERY_RESULT_BACKEND=rpc://
cd server
alembic upgrade head
gunicorn app:app -b 0.0.0.0:5000 --workers 3
```
Then point Nginx reverse proxy `/api` to `http://127.0.0.1:5000/api`.

### Celery & RabbitMQ
- Celery worker needs to run as a separate service:
```bash
cd /opt/pmonitor/server
source ../venv/bin/activate
celery -A tasks.celery_app worker --loglevel=info
```
- RabbitMQ can be a managed instance or locally installed.

## 4. PostgreSQL Script For Client
If client asks for only DB creation, send them:
```sql
CREATE TABLE IF NOT EXISTS public.activities (
    id SERIAL PRIMARY KEY,
    actor_name VARCHAR(255),
    actor_image TEXT,
    timestamp TIMESTAMP,
    datatype VARCHAR(50),
    content TEXT,
    languages TEXT,
    place VARCHAR(255),
    followers INTEGER,
    sentiment VARCHAR(20),
    streams TEXT
);
CREATE INDEX IF NOT EXISTS ix_activities_timestamp ON public.activities (timestamp);
```
Full script: `server/sql/init_postgres.sql`.

## 5. Packaging For FTP Delivery
If you want to send artifacts via FTP for an ops team to unpack:
1. Create a zip with frontend build + DB script + README excerpts:
```powershell
Compress-Archive -Path build/*, server/sql/init_postgres.sql, docs/DEPLOYMENT.md -DestinationPath deploy_bundle.zip
```
2. Upload `deploy_bundle.zip` via FTP.
3. Provide a short instruction file (`INSTRUCTIONS.txt`) in the zip root.

## 6. Common FileZilla Issues
| Symptom | Cause | Fix |
|---------|-------|-----|
| Uploaded JS missing | Not in correct folder | Ensure files inside `build/` copied directly under web root |
| White page / 404 | Old cached assets | Hard refresh / clear CDN cache |
| Mixed content errors | API over HTTP while site is HTTPS | Use HTTPS for API endpoint |
| CORS errors | Backend missing CORS headers | Ensure Flask CORS configured (`CORS(app, origins="*")`) |

## 7. Security Notes
- Plain FTP exposes credentials; prefer SFTP.
- Do not upload `.env` (keep secrets server-side, not in build output).
- Regenerate build if adding environment variables (they are baked at build time).

## 8. Checklist Before Telling Client "Uploaded"
- [ ] React `build/` uploaded (index.html + static assets)
- [ ] Old index.html backed up or replaced
- [ ] API endpoint reachable from browser console
- [ ] Database table created (client applied script)
- [ ] No secrets committed or uploaded accidentally
- [ ] Provided instructions for backend hosting (if not on same server)

## 9. Next Steps
- Acquire SSH access (if possible) to deploy backend & worker.
- Switch ActivityDashboard aggregates to use backend `/aggregate` endpoint (fallback to local).
- Add authentication before production.

## 10. Glossary
- **FTP**: File Transfer Protocol (unencrypted file transfer)
- **SFTP**: SSH File Transfer Protocol (secure) — preferred
- **FTPS**: FTP over TLS (adds encryption but still legacy workflow)
- **Reverse Proxy**: Server that forwards client requests to backend service (e.g., Nginx → Flask)

---
If you obtain SSH access, use the non-Docker or Docker instructions in `docs/DEPLOYMENT.md` for full stack deployment.
