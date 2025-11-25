import React from 'react';

const Datasets = ({ onSelectDataset }) => {
  return (
    <div style={{ padding: '24px 32px', color: '#f0f6fc' }}>
      <h2>Datasets</h2>
      <p>Configure data collection streams and filters</p>
      <button 
        onClick={() => onSelectDataset({ name: 'Sample Dataset', id: 1 })}
        style={{ 
          padding: '8px 16px', 
          backgroundColor: '#4a90e2', 
          color: 'white', 
          border: 'none', 
          borderRadius: '6px',
          cursor: 'pointer' 
        }}
      >
        Explore Sample Dataset
      </button>
    </div>
  );
};

export default Datasets;