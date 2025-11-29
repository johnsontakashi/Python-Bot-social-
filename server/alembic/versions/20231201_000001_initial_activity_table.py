"""Initial activities table matching SQLAlchemy model

Revision ID: 20231201_000001
Revises: 
Create Date: 2023-12-01 00:00:01

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '20231201_000001'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.create_table(
        'activities',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('actor_name', sa.String(length=255), nullable=True),
        sa.Column('actor_image', sa.Text(), nullable=True),
        sa.Column('timestamp', sa.DateTime(), nullable=True),
        sa.Column('datatype', sa.String(length=50), nullable=True),
        sa.Column('content', sa.Text(), nullable=True),
        sa.Column('languages', sa.Text(), nullable=True),
        sa.Column('place', sa.String(length=255), nullable=True),
        sa.Column('followers', sa.Integer(), nullable=True),
        sa.Column('sentiment', sa.String(length=20), nullable=True),
        sa.Column('streams', sa.Text(), nullable=True),
    )
    op.create_index('ix_activities_timestamp', 'activities', ['timestamp'])


def downgrade():
    op.drop_index('ix_activities_timestamp', table_name='activities')
    op.drop_table('activities')
