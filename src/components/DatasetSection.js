import React, { useState } from 'react';
import './DatasetSection.css';
import DatasetItem from './DatasetItem';

const DatasetSection = ({ title, datasets }) => {
  const [expandedView, setExpandedView] = useState(false);
  const [sortBy, setSortBy] = useState('activity');

  const sortedDatasets = [...datasets].sort((a, b) => {
    switch(sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'activity':
        return parseInt(b.hitsToday.replace(/[^0-9]/g, '')) - parseInt(a.hitsToday.replace(/[^0-9]/g, ''));
      case 'trend':
        return parseFloat(b.trend?.replace('%', '') || 0) - parseFloat(a.trend?.replace('%', '') || 0);
      default:
        return 0;
    }
  });

  const totalActivity = datasets.reduce((sum, dataset) => {
    return sum + parseInt(dataset.hitsToday.replace(/[^0-9]/g, ''));
  }, 0);

  return (
    <div className="dataset-section">
      <div className="section-header-enhanced">
        <div className="section-title-group">
          <h2 className="section-title">{title}</h2>
          <div className="section-stats">
            <span className="total-activity">
              {totalActivity.toLocaleString()} total posts today
            </span>
            <span className="dataset-count">
              {datasets.length} active sources
            </span>
          </div>
        </div>
        
        <div className="section-controls">
          <div className="sort-controls">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="activity">Activity</option>
              <option value="name">Name</option>
              <option value="trend">Trend</option>
            </select>
          </div>
          
          <button 
            className={`view-toggle ${expandedView ? 'expanded' : 'compact'}`}
            onClick={() => setExpandedView(!expandedView)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {expandedView ? (
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
              ) : (
                <path d="M15 3h6v6m-11 5L21 3M9 21H3v-6m11-5L3 21"/>
              )}
            </svg>
            {expandedView ? 'Compact' : 'Expand'}
          </button>
        </div>
      </div>
      
      <div className={`dataset-list ${expandedView ? 'expanded' : 'compact'}`}>
        {sortedDatasets.map((dataset, index) => (
          <DatasetItem 
            key={index} 
            dataset={dataset} 
            expandedView={expandedView}
            rank={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default DatasetSection;