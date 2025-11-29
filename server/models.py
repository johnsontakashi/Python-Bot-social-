from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Integer, String, Text, DateTime
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
