// Normalizes heterogeneous activity JSON into a common shape used by the app
// Supported inputs: Array JSON and NDJSON (one object per line)

export function parseTimestamp(raw) {
  if (raw == null) return null;
  // Epoch milliseconds
  if (typeof raw === 'number') {
    return new Date(raw).toISOString();
  }
  if (typeof raw === 'string') {
    // Try ISO
    const iso = Date.parse(raw);
    if (!Number.isNaN(iso)) return new Date(iso).toISOString();
    // Try dd/MM/yyyy HH:mm:ss
    const m = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2}):(\d{2})$/);
    if (m) {
      const [, dd, mm, yyyy, HH, MM, SS] = m;
      const d = new Date(
        Number(yyyy),
        Number(mm) - 1,
        Number(dd),
        Number(HH),
        Number(MM),
        Number(SS)
      );
      return d.toISOString();
    }
  }
  return null;
}

export function normalizeActivity(obj) {
  // Prefer keys using provided schema; fallback to common alternatives
  const get = (k, fallback) => (obj[k] !== undefined ? obj[k] : fallback);

  const actorImage = get('schema:actor:image', get('actor_image', null));
  const actorName = get('schema:actor:name', get('actor', get('user', null)));
  const tsRaw = get('schema:activity.timestamp:timestamp', get('timestamp', get('created_at', null)));
  const datatype = get('schema:metadata:datatype', get('type', 'unknown'));
  const content = get('schema:activity.content:value', get('text', ''));
  let languages = get('schema:activity.content:language', get('languages', []));
  const place = get('schema:activity.location:placename', get('place', null));
  const followers = get('schema:actor:followers_count', get('followers', null));
  const sentiment = (get('schema:activity.content:sentiment', get('sentiment', 'neutral')) || 'neutral').toLowerCase();
  const streams = get('streams', []);

  return {
    id: `${actorName || 'unknown'}_${tsRaw || Math.random().toString(36).slice(2)}`,
    actorImage,
    actorName,
    timestamp: parseTimestamp(tsRaw),
    datatype,
    content,
    languages: (Array.isArray(languages) ? languages : [languages])
      .filter(Boolean)
      .map((l) => String(l).trim().toLowerCase()),
    place,
    followers: typeof followers === 'number' ? followers : null,
    sentiment: ['positive', 'negative', 'neutral'].includes(sentiment) ? sentiment : 'neutral',
    streams: Array.isArray(streams) ? streams : [],
  };
}

export function parseActivitiesFromText(text) {
  // Try parse as JSON array
  try {
    const arr = JSON.parse(text);
    if (Array.isArray(arr)) return arr.map(normalizeActivity).filter(a => a.timestamp);
  } catch {}
  // Fallback: NDJSON or concatenated JSON objects separated by newlines
  const lines = text
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean);
  const activities = [];
  for (const line of lines) {
    try {
      const obj = JSON.parse(line);
      activities.push(normalizeActivity(obj));
    } catch {
      // Ignore malformed lines
    }
  }
  return activities.filter(a => a.timestamp);
}

export async function fetchActivities(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const text = await res.text();
  return parseActivitiesFromText(text);
}

export function aggregateSentiment(activities) {
  const total = activities.length;
  const counts = activities.reduce(
    (acc, a) => {
      acc[a.sentiment] = (acc[a.sentiment] || 0) + 1;
      return acc;
    },
    { positive: 0, neutral: 0, negative: 0 }
  );
  return {
    counts,
    percentages: {
      positive: total ? Number(((counts.positive / total) * 100).toFixed(1)) : 0,
      neutral: total ? Number(((counts.neutral / total) * 100).toFixed(1)) : 0,
      negative: total ? Number(((counts.negative / total) * 100).toFixed(1)) : 0,
    },
    total,
  };
}

export function aggregateTimeSeries(activities, granularity = 'day') {
  // Returns [{ date: 'YYYY-MM-DD', positive, neutral, negative }]
  const byKey = new Map();
  const toKey = (iso) => {
    const d = new Date(iso);
    if (granularity === 'day') {
      return d.toISOString().slice(0, 10);
    }
    // week key: ISO year-week
    const tmp = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
    const dayNum = (tmp.getUTCDay() + 6) % 7;
    tmp.setUTCDate(tmp.getUTCDate() - dayNum + 3);
    const firstThursday = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 4));
    const week = 1 + Math.round(((tmp - firstThursday) / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7);
    return `${tmp.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
  };
  for (const a of activities) {
    const key = toKey(a.timestamp);
    const cur = byKey.get(key) || { date: key, positive: 0, neutral: 0, negative: 0 };
    cur[a.sentiment] += 1;
    byKey.set(key, cur);
  }
  return Array.from(byKey.values()).sort((a, b) => (a.date > b.date ? 1 : -1));
}

export function aggregatePlatforms(activities) {
  const counts = {};
  for (const a of activities) {
    const key = a.datatype || 'unknown';
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}
