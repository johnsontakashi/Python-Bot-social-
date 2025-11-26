import React from 'react';
import { fetchActivities, aggregateSentiment, aggregateTimeSeries } from '../utils/activityParser';

// Simple aggregation helpers local to dashboard
function aggregateTopActors(activities, limit = 10) {
  const counts = new Map();
  for (const a of activities) {
    const key = a.actorName || 'Unknown';
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([actor, count]) => ({ actor, count }));
}

function aggregateStreams(activities, limit = 10) {
  const counts = new Map();
  for (const a of activities) {
    for (const s of a.streams) {
      counts.set(s, (counts.get(s) || 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([stream, count]) => ({ stream, count }));
}

function aggregateLanguages(activities) {
  const counts = new Map();
  for (const a of activities) {
    for (const l of a.languages) counts.set(l, (counts.get(l) || 0) + 1);
  }
  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).map(([language, count]) => ({ language, count }));
}

const panel = {
  background: '#0d1117',
  border: '1px solid #30363d',
  borderRadius: 8,
  padding: 16
};

const barColors = {
  positive: '#ffcc99',
  neutral: '#4a90e2',
  negative: '#f39c12'
};

export default function ActivityDashboard() {
  const [activities, setActivities] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [granularity, setGranularity] = React.useState('day');
  const [language, setLanguage] = React.useState('all');
  const [toast, setToast] = React.useState(null); // { message, type }
  const [selectedIds, setSelectedIds] = React.useState(new Set());

  function notify(message, type = 'success') {
    setToast({ message, type });
    window.clearTimeout(notify._t);
    notify._t = window.setTimeout(() => setToast(null), 2500);
  }

  React.useEffect(() => {
    // Auto-load sample file on first mount
    loadSample();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadSample() {
    setLoading(true); setError('');
    try {
      const data = await fetchActivities('/data/sample_activities.json');
      setActivities(data);
      notify(`Sample data loaded: ${data.length} records`);
    } catch (e) { setError(String(e)); }
    finally { setLoading(false); }
  }

  async function onFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true); setError('');
    try {
      const text = await file.text();
      const { parseActivitiesFromText } = await import('../utils/activityParser');
      const parsed = parseActivitiesFromText(text);
      setActivities(parsed);
      notify(`Upload successful: ${parsed.length} records loaded`);
    } catch (e) { setError(String(e)); }
    finally { setLoading(false); }
  }

  const languageOptions = React.useMemo(() => {
    const set = new Set();
    for (const a of activities) {
      (a.languages || []).forEach(l => l && set.add(String(l)));
    }
    return Array.from(set).sort();
  }, [activities]);

  const filtered = React.useMemo(() => {
    if (language === 'all') return activities;
    return activities.filter(a => (a.languages || []).some(l => String(l) === language));
  }, [activities, language]);

  const sentiment = React.useMemo(() => aggregateSentiment(filtered), [filtered]);
  const series = React.useMemo(() => aggregateTimeSeries(filtered, granularity), [filtered, granularity]);
  const topActors = React.useMemo(() => aggregateTopActors(filtered), [filtered]);
  const topStreams = React.useMemo(() => aggregateStreams(filtered), [filtered]);
  const languages = React.useMemo(() => aggregateLanguages(filtered), [filtered]);
  const shown = React.useMemo(() => filtered.slice(0, 25), [filtered]);
  const allShownSelected = shown.length > 0 && shown.every(a => selectedIds.has(a.id));

  return (
    <div style={{ padding: '24px 32px', color: '#f0f6fc' }}>
      {toast && (
        <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 9999 }}>
          <div style={{
            background: toast.type === 'success' ? '#1f6feb' : '#e74c3c',
            color: '#fff',
            padding: '10px 14px',
            borderRadius: 6,
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
          }}>
            {toast.message}
          </div>
        </div>
      )}
      <h2 style={{ marginTop: 0 }}>Influencer Activity Dashboard</h2>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
        <button onClick={loadSample} style={{ padding: '8px 12px', background: '#4a90e2', border: 'none', color: '#fff', borderRadius: 6, cursor: 'pointer' }}>Reload Sample Data</button>
        <label style={{ padding: '8px 12px', background: '#30363d', border: '1px solid #30363d', color: '#f0f6fc', borderRadius: 6, cursor: 'pointer' }}>
          Upload JSON/NDJSON
          <input type="file" accept=".json,.ndjson,.txt" onChange={onFileChange} style={{ display: 'none' }} />
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
          <span>Language</span>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ background: '#0d1117', color: '#f0f6fc', border: '1px solid #30363d', borderRadius: 6, padding: '6px 8px' }}>
            <option value="all">All</option>
            {languageOptions.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <span>Granularity</span>
          <span>Granularity</span>
          <select value={granularity} onChange={(e) => setGranularity(e.target.value)} style={{ background: '#0d1117', color: '#f0f6fc', border: '1px solid #30363d', borderRadius: 6, padding: '6px 8px' }}>
            <option value="day">Day</option>
            <option value="week">Week</option>
          </select>
        </div>
      </div>

      {loading && <div style={{ ...panel, marginBottom: 16 }}>Loading…</div>}
      {error && <div style={{ ...panel, marginBottom: 16, borderColor: '#e74c3c', color: '#e74c3c' }}>{error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: 12, marginBottom: 16 }}>
        <KPI title="Total Posts" value={filtered.length} />
        <KPI title="Positive" value={sentiment.counts.positive} percent={sentiment.percentages.positive} color={barColors.positive} />
        <KPI title="Neutral" value={sentiment.counts.neutral} percent={sentiment.percentages.neutral} color={barColors.neutral} />
        <KPI title="Negative" value={sentiment.counts.negative} percent={sentiment.percentages.negative} color={barColors.negative} />
        <KPI title="Actors" value={topActors.length} />
        <KPI title="Streams" value={topStreams.length} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <div style={panel}>
          <h3 style={{ marginTop: 0 }}>Sentiment Over Time</h3>
          <div style={{ display: 'grid', gap: 6 }}>
            {series.map(row => {
              const total = row.positive + row.neutral + row.negative || 1;
              return (
                <div key={row.date} style={{ fontSize: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{row.date}</span>
                    <span>{total}</span>
                  </div>
                  <div style={{ display: 'flex', height: 8, marginTop: 4, borderRadius: 4, overflow: 'hidden', background: '#161b22' }}>
                    <div style={{ flexBasis: `${(row.positive / total) * 100}%`, background: barColors.positive }} />
                    <div style={{ flexBasis: `${(row.neutral / total) * 100}%`, background: barColors.neutral }} />
                    <div style={{ flexBasis: `${(row.negative / total) * 100}%`, background: barColors.negative }} />
                  </div>
                </div>
              );
            })}
          </div>
          <Legend />
        </div>
        <div style={panel}>
          <h3 style={{ marginTop: 0 }}>Sentiment Distribution</h3>
          <DistributionBars sentiment={sentiment} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 16 }}>
        <div style={panel}>
          <h3 style={{ marginTop: 0 }}>Top Actors</h3>
          <SimpleTable rows={topActors} columns={[{ key: 'actor', label: 'Actor' }, { key: 'count', label: 'Posts' }]} />
        </div>
        <div style={panel}>
          <h3 style={{ marginTop: 0 }}>Top Streams</h3>
          <SimpleTable rows={topStreams} columns={[{ key: 'stream', label: 'Stream' }, { key: 'count', label: 'Posts' }]} />
        </div>
        <div style={panel}>
          <h3 style={{ marginTop: 0 }}>Languages</h3>
          <SimpleTable rows={languages} columns={[{ key: 'language', label: 'Language' }, { key: 'count', label: 'Posts' }]} />
        </div>
      </div>

      <div style={{ ...panel, marginTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ marginTop: 0, marginBottom: 12 }}>Recent Activities</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              disabled={selectedIds.size === 0}
              onClick={() => {
                if (selectedIds.size === 0) return;
                if (!window.confirm(`Delete ${selectedIds.size} selected record(s)?`)) return;
                setActivities(prev => prev.filter(a => !selectedIds.has(a.id)));
                notify(`Deleted ${selectedIds.size} record(s)`);
                setSelectedIds(new Set());
              }}
              style={{ padding: '6px 10px', background: selectedIds.size ? '#e74c3c' : '#30363d', color: '#fff', border: 'none', borderRadius: 6, cursor: selectedIds.size ? 'pointer' : 'not-allowed' }}
            >Delete Selected</button>
            <button
              disabled={filtered.length === 0}
              onClick={() => {
                if (!window.confirm('Clear all loaded records?')) return;
                setActivities([]);
                setSelectedIds(new Set());
                notify('All records cleared');
              }}
              style={{ padding: '6px 10px', background: filtered.length ? '#6e7681' : '#30363d', color: '#fff', border: 'none', borderRadius: 6, cursor: filtered.length ? 'pointer' : 'not-allowed' }}
            >Clear All</button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '28px 160px 1fr 140px 100px', fontSize: 13, gap: 8 }}>
          <div>
            <input
              type="checkbox"
              checked={allShownSelected}
              onChange={(e) => {
                const next = new Set(selectedIds);
                if (e.target.checked) { shown.forEach(a => next.add(a.id)); } else { shown.forEach(a => next.delete(a.id)); }
                setSelectedIds(next);
              }}
              title="Select all shown"
            />
          </div>
          <HeaderCell>Time</HeaderCell>
          <HeaderCell>Content</HeaderCell>
          <HeaderCell>Actor</HeaderCell>
          <HeaderCell>Sentiment</HeaderCell>
          {shown.map(a => (
            <React.Fragment key={a.id}>
              <div>
                <input
                  type="checkbox"
                  checked={selectedIds.has(a.id)}
                  onChange={() => {
                    const next = new Set(selectedIds);
                    if (next.has(a.id)) next.delete(a.id); else next.add(a.id);
                    setSelectedIds(next);
                  }}
                />
              </div>
              <div>{a.timestamp ? new Date(a.timestamp).toLocaleString() : '-'}</div>
              <div style={{ color: '#c9d1d9' }}>{(a.content || '').slice(0, 140)}{(a.content || '').length > 140 ? '…' : ''}</div>
              <div>{a.actorName || '-'}</div>
              <div style={{ textTransform: 'capitalize' }}>{a.sentiment}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function KPI({ title, value, percent, color }) {
  return (
    <div style={{ ...panel, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontSize: 12, color: '#7d8590' }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: color || '#f0f6fc' }}>{value.toLocaleString()} {percent != null && <span style={{ fontSize: 14, color: '#7d8590' }}>({percent}%)</span>}</div>
    </div>
  );
}

function DistributionBars({ sentiment }) {
  const total = sentiment.total || 1;
  const items = [
    { key: 'positive', label: 'Positive', color: barColors.positive },
    { key: 'neutral', label: 'Neutral', color: barColors.neutral },
    { key: 'negative', label: 'Negative', color: barColors.negative }
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map(i => {
        const count = sentiment.counts[i.key];
        const pct = ((count / total) * 100).toFixed(1);
        return (
          <div key={i.key} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <span>{i.label}</span>
              <span>{count} ({pct}%)</span>
            </div>
            <div style={{ height: 10, borderRadius: 4, overflow: 'hidden', background: '#161b22' }}>
              <div style={{ width: `${pct}%`, height: '100%', background: i.color }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SimpleTable({ rows, columns }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: columns.map(() => '1fr').join(' '), gap: 6, fontSize: 13 }}>
      {columns.map(c => <HeaderCell key={c.key}>{c.label}</HeaderCell>)}
      {rows.map(r => (
        columns.map(c => <div key={c.key + r[c.key]}>{r[c.key]}</div>)
      ))}
    </div>
  );
}

function HeaderCell({ children }) {
  return <div style={{ fontWeight: 600, color: '#7d8590' }}>{children}</div>;
}

function Legend() {
  return (
    <div style={{ display: 'flex', gap: 12, marginTop: 12, fontSize: 12 }}>
      <LegendItem color={barColors.positive} label="Positive" />
      <LegendItem color={barColors.neutral} label="Neutral" />
      <LegendItem color={barColors.negative} label="Negative" />
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <span style={{ width: 12, height: 12, background: color, borderRadius: 3 }} />
      <span>{label}</span>
    </div>
  );
}
