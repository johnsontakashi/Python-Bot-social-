from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class ActivityIn(BaseModel):
    actor_image: Optional[str] = Field(None, alias='schema:actor:image')
    actor_name: Optional[str] = Field(None, alias='schema:actor:name')
    raw_timestamp: Optional[str | int] = Field(None, alias='schema:activity.timestamp:timestamp')
    datatype: Optional[str] = Field(None, alias='schema:metadata:datatype')
    content: Optional[str] = Field(None, alias='schema:activity.content:value')
    languages: Optional[List[str]] = Field(default_factory=list, alias='schema:activity.content:language')
    place: Optional[str] = Field(None, alias='schema:activity.location:placename')
    followers: Optional[int] = Field(None, alias='schema:actor:followers_count')
    sentiment: Optional[str] = Field(None, alias='schema:activity.content:sentiment')
    streams: Optional[List[str]] = Field(default_factory=list, alias='streams')

    @property
    def timestamp(self) -> Optional[datetime]:
        rt = self.raw_timestamp
        if rt is None:
            return None
        if isinstance(rt, int):
            try:
                return datetime.utcfromtimestamp(rt/1000 if rt > 1e12 else rt)
            except Exception:
                return None
        if isinstance(rt, str):
            from datetime import timezone
            import re
            try:
                return datetime.fromisoformat(rt.replace('Z','+00:00'))
            except Exception:
                m = re.match(r'^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2}):(\d{2})$', rt)
                if m:
                    dd, mm, yyyy, HH, MM, SS = m.groups()
                    try:
                        return datetime(int(yyyy), int(mm), int(dd), int(HH), int(MM), int(SS), tzinfo=timezone.utc)
                    except Exception:
                        return None
        return None

    def model_post_init(self, __context):
        # normalize sentiment and languages
        if self.sentiment:
            low = self.sentiment.lower()
            self.sentiment = low if low in {'positive','neutral','negative'} else 'neutral'
        if self.languages:
            self.languages = [l.strip().lower() for l in self.languages if l]
