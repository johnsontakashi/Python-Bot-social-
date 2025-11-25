import React from 'react';

const DataExplorer = ({ dataset, onBack, onCreateDashboard }) => {
  return (
    <div style={{ padding: '24px 32px', color: '#f0f6fc' }}>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={onBack} style={{ padding: '8px 16px', backgroundColor: '#30363d', color: '#f0f6fc', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>← Back</button>
      </div>
      <h2>Data Explorer - {dataset?.name}</h2>
      <p>Rich content cards and sentiment analysis for collected posts</p>
      <button 
        onClick={onCreateDashboard}
        style={{ 
          padding: '8px 16px', 
          backgroundColor: '#4a90e2', 
          color: 'white', 
          border: 'none', 
          borderRadius: '6px',
          cursor: 'pointer',
          marginTop: '16px'
        }}
      >
        Create Dashboard
      </button>
    </div>
  );
};

export default DataExplorer;