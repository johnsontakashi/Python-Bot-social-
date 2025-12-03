import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import DatasetSection from './DatasetSection';

const Dashboard = () => {
  const [realTimeStats, setRealTimeStats] = useState({
    totalPosts: 847263,
    activeFeeds: 127,
    sentimentScore: 72.3,
    alertsCount: 5,
    lastUpdate: new Date().toLocaleTimeString()
  });

  const [systemStatus, setSystemStatus] = useState({
    dataIngestion: 'operational',
    analytics: 'operational',
    alerting: 'warning',
    storage: 'operational'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeStats(prev => ({
        ...prev,
        totalPosts: prev.totalPosts + Math.floor(Math.random() * 50),
        sentimentScore: Math.max(0, Math.min(100, prev.sentimentScore + (Math.random() - 0.5) * 5)),
        lastUpdate: new Date().toLocaleTimeString()
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const socialMediaDatasets = [
    {
      name: 'All Platforms Combined',
      subtitle: 'Unified social media monitoring dashboard',
      hitsYesterday: '31.6k',
      hitsToday: '35.6k',
      color: '#00d4ff',
      trend: '+12.6%'
    },
    {
      name: 'Political Discourse',
      subtitle: 'Political discussions and campaign content',
      hitsYesterday: '18.2k',
      hitsToday: '22.1k',
      color: '#ff6b35',
      trend: '+21.4%'
    },
    {
      name: 'Health & Safety',
      subtitle: 'Public health information and safety alerts',
      hitsYesterday: '24.1k',
      hitsToday: '28.7k',
      color: '#4ecdc4',
      trend: '+19.1%'
    },
    {
      name: 'Economic Policy',
      subtitle: 'Economic discussions and policy analysis',
      hitsYesterday: '12.3k',
      hitsToday: '15.8k',
      color: '#45b7d1',
      trend: '+28.5%'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'operational': return '#00ff41';
      case 'warning': return '#ffaa00';
      case 'error': return '#ff4757';
      default: return '#666';
    }
  };

  return (
    <div className="dashboard">
      {/* Command Center Header */}
      <div className="command-header">
        <div className="command-title">
          <h1>Social Media Command Center</h1>
          <p>Real-time monitoring and analytics dashboard</p>
        </div>
        <div className="system-time">
          <div className="time-display">{realTimeStats.lastUpdate}</div>
          <div className="date-display">{new Date().toLocaleDateString()}</div>
        </div>
      </div>

      {/* Real-time Statistics Panel */}
      <div className="stats-panel">
        <div className="stat-card primary">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <div className="stat-value">{realTimeStats.totalPosts.toLocaleString()}</div>
            <div className="stat-label">Total Posts Monitored</div>
          </div>
          <div className="stat-trend positive">↗ +3.2%</div>
        </div>
        
        <div className="stat-card secondary">
          <div className="stat-icon">🔄</div>
          <div className="stat-info">
            <div className="stat-value">{realTimeStats.activeFeeds}</div>
            <div className="stat-label">Active Data Feeds</div>
          </div>
          <div className="stat-trend positive">↗ +5</div>
        </div>
        
        <div className="stat-card accent">
          <div className="stat-icon">💭</div>
          <div className="stat-info">
            <div className="stat-value">{realTimeStats.sentimentScore.toFixed(1)}%</div>
            <div className="stat-label">Sentiment Score</div>
          </div>
          <div className="stat-trend neutral">→ Stable</div>
        </div>
        
        <div className="stat-card warning">
          <div className="stat-icon">⚠️</div>
          <div className="stat-info">
            <div className="stat-value">{realTimeStats.alertsCount}</div>
            <div className="stat-label">Active Alerts</div>
          </div>
          <div className="stat-trend negative">↗ +2</div>
        </div>
      </div>

      {/* System Status Indicators */}
      <div className="system-status">
        <div className="status-header">System Health</div>
        <div className="status-indicators">
          {Object.entries(systemStatus).map(([system, status]) => (
            <div key={system} className="status-indicator">
              <div 
                className="status-dot" 
                style={{ backgroundColor: getStatusColor(status) }}
              ></div>
              <span className="status-label">{system.charAt(0).toUpperCase() + system.slice(1)}</span>
              <span className={`status-text ${status}`}>{status.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Left Column - Data Sources */}
        <div className="grid-section data-sources">
          <div className="section-header">
            <h3>📡 Data Sources</h3>
            <button className="refresh-btn" onClick={() => window.location.reload()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                <path d="M21 3v5h-5"/>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                <path d="M3 21v-5h5"/>
              </svg>
              Refresh
            </button>
          </div>
          <DatasetSection
            title="Social Media Monitoring"
            datasets={socialMediaDatasets}
          />
        </div>

        {/* Right Column - Quick Actions & Monitoring */}
        <div className="grid-section monitoring">
          <div className="section-header">
            <h3>🎛️ Control Panel</h3>
          </div>
          
          <div className="control-panels">
            <div className="control-panel">
              <h4>Quick Actions</h4>
              <div className="action-buttons">
                <button className="action-btn primary">🚀 Launch Analysis</button>
                <button className="action-btn secondary">📈 Generate Report</button>
                <button className="action-btn accent">⚡ Real-time Stream</button>
                <button className="action-btn warning">🔔 Configure Alerts</button>
              </div>
            </div>
            
            <div className="control-panel">
              <h4>Live Activity Feed</h4>
              <div className="activity-feed">
                <div className="activity-item">
                  <span className="activity-time">{new Date(Date.now() - 30000).toLocaleTimeString()}</span>
                  <span className="activity-text">New sentiment spike detected in Political Discourse</span>
                  <span className="activity-badge positive">+15%</span>
                </div>
                <div className="activity-item">
                  <span className="activity-time">{new Date(Date.now() - 120000).toLocaleTimeString()}</span>
                  <span className="activity-text">Health & Safety feed processing 1.2K new posts</span>
                  <span className="activity-badge info">Processing</span>
                </div>
                <div className="activity-item">
                  <span className="activity-time">{new Date(Date.now() - 300000).toLocaleTimeString()}</span>
                  <span className="activity-text">Alert threshold reached for Economic Policy</span>
                  <span className="activity-badge warning">Alert</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;