-- PostgreSQL initialization script for Political Monitor platform
-- Run on the client's PostgreSQL server. Adjust names/passwords as needed.
-- This script focuses on schema objects your current backend uses.

-- =============================================================
-- Optional: Role/User and Database creation (run as superuser)
-- NOTE: CREATE DATABASE cannot run in a transaction; many admin panels
--       require doing these steps separately. Leave commented unless needed.
-- =============================================================
-- CREATE ROLE political_monitor_app LOGIN PASSWORD 'CHANGE_ME_STRONG_PASSWORD';
-- CREATE DATABASE political_monitor OWNER political_monitor_app ENCODING 'UTF8';
-- \c political_monitor

-- =============================================================
-- Schema: using public (default)
-- If you prefer a dedicated schema, uncomment below and set search_path.
-- =============================================================
-- CREATE SCHEMA IF NOT EXISTS monitor AUTHORIZATION political_monitor_app;
-- ALTER ROLE political_monitor_app SET search_path = monitor, public;

-- =============================================================
-- Table: activities (matches server/models.py Activity)
-- =============================================================
CREATE TABLE IF NOT EXISTS public.activities (
    id SERIAL PRIMARY KEY,
    actor_name VARCHAR(255),
    actor_image TEXT,
    timestamp TIMESTAMP,            -- Use TIMESTAMPTZ if you want timezone-aware storage
    datatype VARCHAR(50),
    content TEXT,
    languages TEXT,                 -- Comma-separated, lower-case language codes
    place VARCHAR(255),
    followers INTEGER,
    sentiment VARCHAR(20),          -- Expected values: positive | neutral | negative
    streams TEXT,
    CONSTRAINT chk_activities_sentiment
        CHECK (sentiment IS NULL OR sentiment IN ('positive','neutral','negative'))
);

-- Indexes
CREATE INDEX IF NOT EXISTS ix_activities_timestamp ON public.activities (timestamp);
CREATE INDEX IF NOT EXISTS ix_activities_sentiment ON public.activities (sentiment);
-- Optional language index (simple substring search aid)
-- CREATE INDEX IF NOT EXISTS ix_activities_languages_tsv ON public.activities USING gin (to_tsvector('simple', languages));

-- Privileges (if using dedicated role)
-- GRANT USAGE ON SCHEMA public TO political_monitor_app;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON public.activities TO political_monitor_app;
-- GRANT ALL PRIVILEGES ON SEQUENCE public.activities_id_seq TO political_monitor_app;

-- Extensions (optional, as superuser)
-- CREATE EXTENSION IF NOT EXISTS pg_trgm;    -- Accelerates LIKE/ILIKE searches
-- CREATE EXTENSION IF NOT EXISTS uuid-ossp;  -- For future UUID usage

-- Verification
-- SELECT COUNT(*) FROM public.activities;

-- Notes:
-- - The current backend stores languages and streams as comma-separated values.
--   If future analytics require relational modeling, consider junction tables.
-- - Migrations are managed by Alembic in the repository; this DDL mirrors the model.

-- =============================================================
-- New Tables: dashboards, displays, playlists, playlist_items, display_assignments
-- These support saving dashboards, assigning to displays, and playlists.
-- =============================================================

CREATE TABLE IF NOT EXISTS public.dashboards (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    resolution VARCHAR(32),
    layout_json TEXT
);

CREATE TABLE IF NOT EXISTS public.displays (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    resolution VARCHAR(32)
);

CREATE TABLE IF NOT EXISTS public.playlists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS public.playlist_items (
    id SERIAL PRIMARY KEY,
    playlist_id INTEGER NOT NULL REFERENCES public.playlists(id) ON DELETE CASCADE,
    dashboard_id INTEGER NOT NULL REFERENCES public.dashboards(id) ON DELETE CASCADE,
    order_index INTEGER NOT NULL,
    duration_seconds INTEGER NOT NULL DEFAULT 30
);
CREATE INDEX IF NOT EXISTS ix_playlist_items_playlist_id ON public.playlist_items (playlist_id);

CREATE TABLE IF NOT EXISTS public.display_assignments (
    id SERIAL PRIMARY KEY,
    display_id INTEGER NOT NULL REFERENCES public.displays(id) ON DELETE CASCADE,
    dashboard_id INTEGER REFERENCES public.dashboards(id) ON DELETE SET NULL,
    playlist_id INTEGER REFERENCES public.playlists(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS ix_display_assignments_display_id ON public.display_assignments (display_id);

-- Privileges (if using dedicated role)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON public.dashboards, public.displays, public.playlists, public.playlist_items, public.display_assignments TO political_monitor_app;
-- GRANT ALL PRIVILEGES ON SEQUENCE public.dashboards_id_seq, public.displays_id_seq, public.playlists_id_seq, public.playlist_items_id_seq, public.display_assignments_id_seq TO political_monitor_app;
