import React from 'react';
import './AnalyticsHeader.css';

const AnalyticsHeader = () => {
  return (
    <div className="analytics-header">
      <div className="header-left">
        <div className="project-label">PMDB</div>
        <div className="person-tag">Wellington Moreira Franco</div>
        <div className="date-range">03/03/2016 – 12/04/2016</div>
        <div className="hits-indicator">22,389 hits</div>
      </div>
      
      <div className="header-right">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-input"
          />
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>
        
        <div className="actions-dropdown">
          <button className="actions-button">
            Actions
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHeader;