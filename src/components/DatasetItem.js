import React, { useState } from 'react';
import './DatasetItem.css';

const DatasetItem = ({ dataset, expandedView = false, rank = 0 }) => {
  const [isActive, setIsActive] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  
  const yesterdayCount = parseInt(dataset.hitsYesterday.replace(/[^0-9]/g, ''));
  const todayCount = parseInt(dataset.hitsToday.replace(/[^0-9]/g, ''));
  const changePercent = ((todayCount - yesterdayCount) / yesterdayCount * 100).toFixed(1);
  const isPositive = changePercent > 0;
  
  const handleToggleActive = () => {
    setIsActive(!isActive);
    alert(`Dataset ${dataset.name} ${!isActive ? 'activated' : 'deactivated'}`);
  };
  
  const handleAnalyze = () => {
    alert(`Opening analysis for: ${dataset.name}`);
  };
  
  const handleViewStream = () => {
    alert(`Opening live stream for: ${dataset.name}`);
  };

  return (
    <div className={`dataset-item ${expandedView ? 'expanded' : 'compact'} ${isActive ? 'active' : 'inactive'}`}>
      {rank > 0 && (
        <div className="dataset-rank">
          <span className="rank-number">#{rank}</span>
        </div>
      )}
      
      <div className="dataset-info">
        <div 
          className="dataset-icon"
          style={{ 
            backgroundColor: dataset.color,
            boxShadow: `0 0 20px ${dataset.color}40`
          }}
        >
          <div className="icon-pulse" style={{ backgroundColor: dataset.color }}></div>
        </div>
        
        <div className="dataset-details">
          <div className="dataset-header">
            <div className="dataset-name">{dataset.name}</div>
            <div className="dataset-status">
              <div className={`status-indicator ${isActive ? 'online' : 'offline'}`}></div>
              <span className="status-text">{isActive ? 'LIVE' : 'OFFLINE'}</span>
            </div>
          </div>
          <div className="dataset-subtitle">{dataset.subtitle}</div>
          
          {expandedView && (
            <div className="dataset-metadata">
              <span className="metadata-item">
                <strong>Source:</strong> Social Media API
              </span>
              <span className="metadata-item">
                <strong>Frequency:</strong> Real-time
              </span>
              <span className="metadata-item">
                <strong>Last Update:</strong> {new Date().toLocaleTimeString()}
              </span>
            </div>
          )}
        </div>
      </div>
      
      <div className="dataset-metrics">
        <div className="metric-column primary">
          <div className="metric-label">Yesterday</div>
          <div className="metric-value">{dataset.hitsYesterday}</div>
        </div>
        
        <div className="metric-column highlight">
          <div className="metric-label">Today</div>
          <div className="metric-value">{dataset.hitsToday}</div>
        </div>
        
        <div className="metric-column trend">
          <div className="metric-label">Trend</div>
          <div className={`trend-value ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? '↗' : '↘'} {Math.abs(changePercent)}%
          </div>
        </div>
        
        {expandedView && (
          <div className="metric-column activity">
            <div className="metric-label">Activity</div>
            <div className="activity-bar">
              <div 
                className="activity-fill" 
                style={{ 
                  width: `${Math.min(100, (todayCount / 10000) * 100)}%`,
                  backgroundColor: dataset.color
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="dataset-actions">
        {expandedView ? (
          <div className="expanded-actions">
            <button 
              className="action-button primary" 
              title="Analyze Data"
              onClick={handleAnalyze}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="7.5,4.21 12,6.81 16.5,4.21"></polyline>
                <polyline points="7.5,19.79 7.5,14.6 3,12"></polyline>
                <polyline points="21,12 16.5,14.6 16.5,19.79"></polyline>
              </svg>
              Analyze
            </button>
            
            <button 
              className="action-button secondary" 
              title="View Live Stream"
              onClick={handleViewStream}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="2"></circle>
                <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>
              </svg>
              Stream
            </button>
            
            <button 
              className={`action-button toggle ${isActive ? 'active' : 'inactive'}`}
              title={isActive ? 'Deactivate' : 'Activate'}
              onClick={handleToggleActive}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isActive ? (
                  <path d="M10 9v6l5-3z"></path>
                ) : (
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"></path>
                )}
              </svg>
              {isActive ? 'Pause' : 'Play'}
            </button>
          </div>
        ) : (
          <div className="compact-actions">
            <button className="action-button play-button" title="Analyze" onClick={handleAnalyze}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5,3 19,12 5,21"></polygon>
              </svg>
            </button>
            
            <button 
              className="action-button settings-button" 
              title="More Options"
              onClick={() => setShowDetails(!showDetails)}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </button>
          </div>
        )}
      </div>
      
      {showDetails && !expandedView && (
        <div className="quick-details">
          <div className="detail-row">
            <span>Change: </span>
            <span className={isPositive ? 'positive' : 'negative'}>
              {isPositive ? '+' : ''}{changePercent}%
            </span>
          </div>
          <div className="detail-row">
            <span>Status: </span>
            <span className={isActive ? 'active' : 'inactive'}>
              {isActive ? 'Active' : 'Paused'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatasetItem;