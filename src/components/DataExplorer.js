import React from 'react';
import TimeSeriesChart from './TimeSeriesChart';
import SentimentTable from './SentimentTable';
import ProportionChart from './ProportionChart';
import { fetchActivities, aggregateSentiment, aggregateTimeSeries } from '../utils/activityParser';

const box = {
  background: '#0d1117',
  border: '1px solid #30363d',
  borderRadius: 8,
  padding: 16
};

const DataExplorer = ({ dataset, onBack, onCreateDashboard }) => {
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

  const loadSample = async () => {
    setLoading(true); setError('');
    try {
      const data = await fetchActivities('/data/sample_activities.json');
      setActivities(data);
      notify(`Sample data loaded: ${data.length} records`);
    } catch (e) {
      setError(String(e));
    } finally { setLoading(false); }
  };

  const onFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true); setError('');
    try {
      const text = await file.text();
      const { parseActivitiesFromText } = await import('../utils/activityParser');
      const parsed = parseActivitiesFromText(text);
      setActivities(parsed);
      notify(`Upload successful: ${parsed.length} records loaded`);
    } catch (e) {
      setError(String(e));
    } finally { setLoading(false); }
  };

  const languageOptions = React.useMemo(() => {
    const set = new Set();
    for (const a of activities) (a.languages || []).forEach(l => l && set.add(String(l)));
    return Array.from(set).sort();
  }, [activities]);

  const filtered = React.useMemo(() => {
    if (language === 'all') return activities;
    return activities.filter(a => (a.languages || []).some(l => String(l) === language));
  }, [activities, language]);

  const sentiment = React.useMemo(() => aggregateSentiment(filtered), [filtered]);
  const series = React.useMemo(() => aggregateTimeSeries(filtered, granularity), [filtered, granularity]);
  const shown = React.useMemo(() => filtered.slice(0, 20), [filtered]);
  const allShownSelected = shown.length > 0 && shown.every(a => selectedIds.has(a.id));

  const distribution = React.useMemo(() => [
    { label: 'Neutral', value: sentiment.percentages.neutral, color: '#4a90e2' },
    { label: 'Negative', value: sentiment.percentages.negative, color: '#f39c12' },
    { label: 'Positive', value: sentiment.percentages.positive, color: '#ffcc99' }
  ], [sentiment]);

  const kpiStyle = { ...box, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' };

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
      <div style={{ marginBottom: '20px', display: 'flex', gap: 12, alignItems: 'center' }}>
        <button onClick={onBack} style={{ padding: '8px 16px', backgroundColor: '#30363d', color: '#f0f6fc', border: '1px solid #30363d', borderRadius: '6px', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0 }}>Data Explorer - {dataset?.name}</h2>
      </div>

      <div style={{ ...box, marginBottom: 16, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <button onClick={loadSample} style={{ padding: '8px 12px', background: '#4a90e2', border: 'none', color: '#fff', borderRadius: 6, cursor: 'pointer' }}>Load Sample Data</button>
        <label style={{ padding: '8px 12px', background: '#30363d', border: '1px solid #30363d', color: '#f0f6fc', borderRadius: 6, cursor: 'pointer' }}>
          Upload JSON/NDJSON
          <input type="file" accept=".json,.ndjson,.txt" onChange={onFileChange} style={{ display: 'none' }} />
        </label>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>Language</span>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ background: '#0d1117', color: '#f0f6fc', border: '1px solid #30363d', borderRadius: 6, padding: '6px 8px' }}>
            <option value="all">All</option>
            {languageOptions.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <span>Summarise by</span>
          <select value={granularity} onChange={(e) => setGranularity(e.target.value)} style={{ background: '#0d1117', color: '#f0f6fc', border: '1px solid #30363d', borderRadius: 6, padding: '6px 8px' }}>
            <option value="day">Day</option>
            <option value="week">Week</option>
          </select>
        </div>
      </div>

      {loading && <div style={{ ...box, marginBottom: 16 }}>Loading…</div>}
      {error && <div style={{ ...box, marginBottom: 16, borderColor: '#e74c3c', color: '#e74c3c' }}>{error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12, marginBottom: 16 }}>
        <div style={kpiStyle}>
          <div style={{ fontSize: 12, color: '#7d8590' }}>Total Posts</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{activities.length.toLocaleString()}</div>
        </div>
        <div style={kpiStyle}>
          <div style={{ fontSize: 12, color: '#7d8590' }}>Positive</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#ffcc99' }}>{sentiment.counts.positive.toLocaleString()} <span style={{ fontSize: 14, color: '#7d8590' }}>({sentiment.percentages.positive}%)</span></div>
        </div>
        <div style={kpiStyle}>
          <div style={{ fontSize: 12, color: '#7d8590' }}>Neutral</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#4a90e2' }}>{sentiment.counts.neutral.toLocaleString()} <span style={{ fontSize: 14, color: '#7d8590' }}>({sentiment.percentages.neutral}%)</span></div>
        </div>
        <div style={kpiStyle}>
          <div style={{ fontSize: 12, color: '#7d8590' }}>Negative</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#f39c12' }}>{sentiment.counts.negative.toLocaleString()} <span style={{ fontSize: 14, color: '#7d8590' }}>({sentiment.percentages.negative}%)</span></div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <div style={{ ...box }}>
          <TimeSeriesChart title="Sentiment Over Time" data={series.map(s => ({ date: s.date, positive: s.positive, neutral: s.neutral, negative: s.negative }))} />
        </div>
        <div style={{ ...box }}>
          <ProportionChart distribution={distribution} />
        </div>
      </div>

      <div style={{ ...box, marginTop: 16 }}>
        <SentimentTable summary={sentiment} />
      </div>

      <div style={{ ...box, marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: '0 0 12px 0' }}>Recent Activities</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            <button 
              onClick={onCreateDashboard}
              style={{ padding: '8px 12px', background: '#4a90e2', border: 'none', color: '#fff', borderRadius: 6, cursor: 'pointer' }}
            >
              Create Dashboard
            </button>
            <button
              disabled={selectedIds.size === 0}
              onClick={() => {
                if (selectedIds.size === 0) return;
                if (!window.confirm(`Delete ${selectedIds.size} selected record(s)?`)) return;
                setActivities(prev => prev.filter(a => !selectedIds.has(a.id)));
                setSelectedIds(new Set());
                notify('Selected records deleted');
              }}
              style={{ padding: '8px 12px', background: selectedIds.size ? '#e74c3c' : '#30363d', border: 'none', color: '#fff', borderRadius: 6, cursor: selectedIds.size ? 'pointer' : 'not-allowed' }}
            >Delete Selected</button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '28px 160px 1fr 120px 120px', gap: 8, fontSize: 14 }}>
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
          <div style={{ color: '#7d8590' }}>Time</div>
          <div style={{ color: '#7d8590' }}>Content</div>
          <div style={{ color: '#7d8590' }}>Actor</div>
          <div style={{ color: '#7d8590' }}>Sentiment</div>
          {shown.map((a) => (
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
              <div>{new Date(a.timestamp).toLocaleString()}</div>
              <div style={{ color: '#c9d1d9' }}>{a.content?.slice(0, 120) || ''}{(a.content || '').length > 120 ? '…' : ''}</div>
              <div>{a.actorName || '-'}</div>
              <div style={{ textTransform: 'capitalize' }}>{a.sentiment}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataExplorer;