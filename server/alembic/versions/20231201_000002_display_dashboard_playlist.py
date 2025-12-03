"""Add dashboards, displays, playlists and related tables

Revision ID: 20231201_000002
Revises: 20231201_000001
Create Date: 2023-12-01 00:05:00

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '20231201_000002'
down_revision = '20231201_000001'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'dashboards',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('name', sa.String(length=255), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('resolution', sa.String(length=32), nullable=True),
        sa.Column('layout_json', sa.Text(), nullable=True),
    )

    op.create_table(
        'displays',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('name', sa.String(length=255), nullable=False),
        sa.Column('location', sa.String(length=255), nullable=True),
        sa.Column('resolution', sa.String(length=32), nullable=True),
    )

    op.create_table(
        'playlists',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('name', sa.String(length=255), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
    )

    op.create_table(
        'playlist_items',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('playlist_id', sa.Integer(), sa.ForeignKey('playlists.id', ondelete='CASCADE'), nullable=False),
        sa.Column('dashboard_id', sa.Integer(), sa.ForeignKey('dashboards.id', ondelete='CASCADE'), nullable=False),
        sa.Column('order_index', sa.Integer(), nullable=False),
        sa.Column('duration_seconds', sa.Integer(), nullable=False, server_default='30'),
    )
    op.create_index('ix_playlist_items_playlist_id', 'playlist_items', ['playlist_id'])

    op.create_table(
        'display_assignments',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('display_id', sa.Integer(), sa.ForeignKey('displays.id', ondelete='CASCADE'), nullable=False),
        sa.Column('dashboard_id', sa.Integer(), sa.ForeignKey('dashboards.id', ondelete='SET NULL'), nullable=True),
        sa.Column('playlist_id', sa.Integer(), sa.ForeignKey('playlists.id', ondelete='SET NULL'), nullable=True),
    )
    op.create_index('ix_display_assignments_display_id', 'display_assignments', ['display_id'])


def downgrade():
    op.drop_index('ix_display_assignments_display_id', table_name='display_assignments')
    op.drop_table('display_assignments')
    op.drop_index('ix_playlist_items_playlist_id', table_name='playlist_items')
    op.drop_table('playlist_items')
    op.drop_table('playlists')
    op.drop_table('displays')
    op.drop_table('dashboards')
