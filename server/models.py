from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from schemas import ActivityIn

class Base(DeclarativeBase):
    pass

class Activity(Base):
    __tablename__ = 'activities'
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    actor_name: Mapped[str | None] = mapped_column(String(255))
    actor_image: Mapped[str | None] = mapped_column(Text)
    timestamp: Mapped[datetime | None] = mapped_column(DateTime)
    datatype: Mapped[str | None] = mapped_column(String(50))
    content: Mapped[str | None] = mapped_column(Text)
    languages: Mapped[str | None] = mapped_column(Text)  # stored as comma-separated lower-case
    place: Mapped[str | None] = mapped_column(String(255))
    followers: Mapped[int | None] = mapped_column(Integer)
    sentiment: Mapped[str | None] = mapped_column(String(20))
    streams: Mapped[str | None] = mapped_column(Text)  # comma-separated

    @staticmethod
    def from_schema(a: ActivityIn):
        return Activity(
            actor_name=a.actor_name,
            actor_image=a.actor_image,
            timestamp=a.timestamp,
            datatype=a.datatype,
            content=a.content,
            languages=','.join(a.languages or []),
            place=a.place,
            followers=a.followers,
            sentiment=a.sentiment,
            streams=','.join(a.streams or [])
        )

    def to_dict(self):
        return {
            'id': self.id,
            'actorName': self.actor_name,
            'actorImage': self.actor_image,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None,
            'datatype': self.datatype,
            'content': self.content,
            'languages': [l for l in (self.languages or '').split(',') if l],
            'place': self.place,
            'followers': self.followers,
            'sentiment': self.sentiment,
            'streams': [s for s in (self.streams or '').split(',') if s]
        }


class Dashboard(Base):
    __tablename__ = 'dashboards'
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255))
    description: Mapped[str | None] = mapped_column(Text)
    resolution: Mapped[str | None] = mapped_column(String(32))  # e.g., 1920x1080
    layout_json: Mapped[str | None] = mapped_column(Text)  # serialized widget layout/config

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'resolution': self.resolution,
            'layout': self.layout_json,
        }


class Display(Base):
    __tablename__ = 'displays'
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255))
    location: Mapped[str | None] = mapped_column(String(255))
    resolution: Mapped[str | None] = mapped_column(String(32))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'resolution': self.resolution,
        }


class Playlist(Base):
    __tablename__ = 'playlists'
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255))
    description: Mapped[str | None] = mapped_column(Text)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
        }


class PlaylistItem(Base):
    __tablename__ = 'playlist_items'
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    playlist_id: Mapped[int] = mapped_column(ForeignKey('playlists.id'))
    dashboard_id: Mapped[int] = mapped_column(ForeignKey('dashboards.id'))
    order_index: Mapped[int] = mapped_column(Integer)
    duration_seconds: Mapped[int] = mapped_column(Integer, default=30)

    def to_dict(self):
        return {
            'id': self.id,
            'playlistId': self.playlist_id,
            'dashboardId': self.dashboard_id,
            'order': self.order_index,
            'durationSeconds': self.duration_seconds,
        }


class DisplayAssignment(Base):
    __tablename__ = 'display_assignments'
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    display_id: Mapped[int] = mapped_column(ForeignKey('displays.id'))
    # either dashboard or playlist can be assigned (one of them non-null)
    dashboard_id: Mapped[int | None] = mapped_column(ForeignKey('dashboards.id'))
    playlist_id: Mapped[int | None] = mapped_column(ForeignKey('playlists.id'))

    def to_dict(self):
        return {
            'id': self.id,
            'displayId': self.display_id,
            'dashboardId': self.dashboard_id,
            'playlistId': self.playlist_id,
        }
