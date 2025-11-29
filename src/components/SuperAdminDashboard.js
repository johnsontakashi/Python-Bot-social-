import React from 'react';
import { exportActivities, fetchAggregates } from '../api';

const box = {
  background: '#0d1117',
  border: '1px solid #30363d',
  borderRadius: 8,
  padding: 16,
  marginBottom: 16
};

export default function SuperAdminDashboard() {
  const [exportText, setExportText] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [aggregates, setAggregates] = React.useState(null);

  async function handleExport(format) {
    setStatus('Exporting...');
    try {
      const data = await exportActivities(format);
      if (format === 'jsonl') {
        setExportText(data);
      } else {
        setExportText(JSON.stringify(await data.json(), null, 2));
      }
      setStatus('Export complete');
    } catch (e) {
      setStatus('Export failed: ' + e.message);
    }
  }

  async function refreshAggregates() {
    setStatus('Refreshing aggregates...');
    try {
      const agg = await fetchAggregates();
      setAggregates(agg);
      setStatus(`Aggregates refreshed (total ${agg.total})`);
    } catch (e) {
      setStatus('Aggregate fetch failed: ' + e.message);
    }
  }

  function downloadFile() {
    const blob = new Blob([exportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'activities_export.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ padding: '24px 32px', color: '#f0f6fc' }}>
      <h2 style={{ marginTop: 0 }}>Super Admin Dashboard</h2>
      <div style={box}>
        <h3 style={{ marginTop: 0 }}>Data Maintenance</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button onClick={() => handleExport('jsonl')} style={btn}>Export JSONL</button>
          <button onClick={() => handleExport('json')} style={btn}>Export JSON Array</button>
          <button onClick={downloadFile} disabled={!exportText} style={{ ...btn, background: exportText ? '#238636' : '#30363d', cursor: exportText ? 'pointer' : 'not-allowed' }}>Download Last Export</button>
          <button onClick={refreshAggregates} style={btn}>Refresh Aggregates</button>
        </div>
        {status && <div style={{ marginTop: 12, fontSize: 13, color: '#7d8590' }}>{status}</div>}
      </div>
      {aggregates && (
        <div style={box}>
          <h3 style={{ marginTop: 0 }}>Aggregates Snapshot</h3>
          <pre style={{ maxHeight: 300, overflow: 'auto', fontSize: 12 }}>{JSON.stringify(aggregates, null, 2)}</pre>
        </div>
      )}
      {exportText && (
        <div style={box}>
          <h3 style={{ marginTop: 0 }}>Export Preview</h3>
          <pre style={{ maxHeight: 300, overflow: 'auto', fontSize: 12 }}>{exportText.slice(0, 20000)}</pre>
        </div>
      )}
    </div>
  );
}

const btn = {
  padding: '8px 12px',
  background: '#4a90e2',
  border: 'none',
  color: '#fff',
  borderRadius: 6,
  cursor: 'pointer'
};
