from collections import Counter, defaultdict
from datetime import datetime

def aggregate_sentiment(rows):
    counts = Counter(r.get('sentiment','neutral') for r in rows)
    total = sum(counts.values()) or 1
    return {
        'counts': {k: counts.get(k,0) for k in ['positive','neutral','negative']},
        'percentages': {k: round((counts.get(k,0)/total)*100,1) for k in ['positive','neutral','negative']},
        'total': total
    }

def aggregate_time_series(rows, granularity='day'):
    bucket = defaultdict(lambda: {'positive':0,'neutral':0,'negative':0})
    for r in rows:
        ts = r.get('timestamp')
        if not ts:
            continue
        try:
            dt = datetime.fromisoformat(ts.replace('Z','+00:00'))
        except Exception:
            continue
        if granularity == 'week':
            key = f"{dt.isocalendar().year}-W{dt.isocalendar().week:02d}"
        else:
            key = dt.date().isoformat()
        bucket[key][r.get('sentiment','neutral')] += 1
    out = []
    for k,v in bucket.items():
        out.append({'date': k, **v})
    return sorted(out, key=lambda x: x['date'])

def aggregate_languages(rows):
    counts = Counter(l for r in rows for l in r.get('languages',[]))
    return counts

def aggregate_streams(rows):
    counts = Counter(s for r in rows for s in r.get('streams',[]))
    return counts
