import React from 'react';
import './TopNavigation.css';

const TopNavigation = ({ currentView }) => {
  const getViewTitle = (view) => {
    const titles = {
      projects: 'Projects',
      datasets: 'Datasets', 
      accounts: 'Accounts',
      locations: 'Locations',
      events: 'Events',
      alerts: 'Alerts',
      settings: 'Settings'
    };
    return titles[view] || 'Dashboard';
  };

  const getViewDescription = (view) => {
    const descriptions = {
      projects: 'Manage monitoring campaigns and create dashboards',
      datasets: 'Configure data collection streams and filters',
      accounts: 'Manage user accounts and permissions',
      locations: 'Configure geographic regions and mapping',
      events: 'View data collection logs and system events',
      alerts: 'Set up automated notifications and triggers',
      settings: 'Organization configuration and preferences'
    };
    return descriptions[view] || '';
  };

  return (
    <div className="top-navigation">
      <div className="nav-content">
        <div className="page-info">
          <h1 className="page-title">{getViewTitle(currentView)}</h1>
          <p className="page-description">{getViewDescription(currentView)}</p>
        </div>
        
        <div className="nav-actions">
          <div className="search-container">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input 
              type="text" 
              placeholder="Search..." 
              className="search-input"
            />
          </div>
          
          <button className="notification-button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span className="notification-badge">3</span>
          </button>
          
          <button className="help-button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <circle cx="12" cy="17" r="0.5"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;