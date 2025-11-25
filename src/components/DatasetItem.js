import React from 'react';
import './DatasetItem.css';

const DatasetItem = ({ dataset }) => {
  return (
    <div className="dataset-item">
      <div className="dataset-info">
        <div 
          className="dataset-icon"
          style={{ backgroundColor: dataset.color }}
        ></div>
        <div className="dataset-details">
          <div className="dataset-name">{dataset.name}</div>
          <div className="dataset-subtitle">{dataset.subtitle}</div>
        </div>
      </div>
      
      <div className="dataset-metrics">
        <div className="metric-column">
          <div className="metric-label">Hits yesterday</div>
          <div className="metric-value">{dataset.hitsYesterday}</div>
        </div>
        <div className="metric-column">
          <div className="metric-label">Hits today</div>
          <div className="metric-value">{dataset.hitsToday}</div>
        </div>
      </div>
      
      <div className="dataset-actions">
        <button className="action-button play-button" title="Play">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5,3 19,12 5,21"></polygon>
          </svg>
        </button>
        <button className="action-button delete-button" title="Delete">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3,6 5,6 21,6"></polyline>
            <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DatasetItem;