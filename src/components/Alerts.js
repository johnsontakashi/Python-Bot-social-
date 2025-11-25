import React, { useState } from 'react';
import './Alerts.css';

const Alerts = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const [alerts] = useState([
    {
      id: 1,
      title: 'High API Rate Limit Usage',
      description: 'Twitter API usage has exceeded 90% of daily limit. Consider reducing collection frequency or upgrading plan.',
      severity: 'critical',
      status: 'active',
      timestamp: '2024-11-25T10:45:00Z',
      source: 'Twitter API Monitor',
      category: 'rate_limit',
      affected_campaigns: ['Federal Election 2024', 'State Governors Race'],
      threshold: '90%',
      current_value: '94%',
      actions_taken: 0
    },
    {
      id: 2,
      title: 'Authentication Token Expired',
      description: 'TikTok API authentication token has expired. Data collection for Municipal Elections 2024 is currently paused.',
      severity: 'high',
      status: 'active',
      timestamp: '2024-11-25T10:30:00Z',
      source: 'TikTok Collector',
      category: 'authentication',
      affected_campaigns: ['Municipal Elections 2024'],
      last_success: '2024-11-24T22:15:00Z',
      retry_attempts: 3,
      actions_taken: 1
    },
    {
      id: 3,
      title: 'Unusual Sentiment Pattern Detected',
      description: 'Significant negative sentiment spike detected for candidate Wellington Moreira Franco in the last 3 hours.',
      severity: 'medium',
      status: 'investigating',
      timestamp: '2024-11-25T09:15:00Z',
      source: 'Sentiment Analyzer',
      category: 'anomaly',
      affected_campaigns: ['Federal Election 2024'],
      sentiment_change: '-18%',
      post_volume: '2,847 posts',
      confidence: '96.3%',
      actions_taken: 2
    },
    {
      id: 4,
      title: 'Database Connection Issues',
      description: 'Intermittent database connection timeouts detected. Some data synchronization may be delayed.',
      severity: 'medium',
      status: 'resolved',
      timestamp: '2024-11-25T08:20:00Z',
      source: 'Database Monitor',
      category: 'infrastructure',
      affected_campaigns: ['All Campaigns'],
      resolution_time: '45 minutes',
      downtime: '0.3%',
      actions_taken: 3
    },
    {
      id: 5,
      title: 'Data Quality Anomaly',
      description: 'Detected unusual pattern in Instagram engagement data. Possible bot activity or data collection error.',
      severity: 'low',
      status: 'monitoring',
      timestamp: '2024-11-25T07:30:00Z',
      source: 'Quality Controller',
      category: 'data_quality',
      affected_campaigns: ['Federal Election 2024'],
      anomaly_score: '3.2/10',
      affected_posts: '156 posts',
      false_positive_rate: '12%',
      actions_taken: 1
    },
    {
      id: 6,
      title: 'Storage Space Warning',
      description: 'Database storage usage has reached 75%. Consider archiving old campaign data or expanding storage.',
      severity: 'low',
      status: 'acknowledged',
      timestamp: '2024-11-25T06:00:00Z',
      source: 'Storage Monitor',
      category: 'storage',
      affected_campaigns: ['System'],
      current_usage: '75%',
      available_space: '2.1TB',
      estimated_full: '45 days',
      actions_taken: 0
    }
  ]);

  const filteredAlerts = alerts.filter(alert => {
    if (filterStatus !== 'all' && alert.status !== filterStatus) return false;
    if (filterSeverity !== 'all' && alert.severity !== filterSeverity) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.timestamp) - new Date(a.timestamp);
    } else if (sortBy === 'oldest') {
      return new Date(a.timestamp) - new Date(b.timestamp);
    } else if (sortBy === 'severity') {
      const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    }
    return 0;
  });

  const alertCounts = {
    total: alerts.length,
    active: alerts.filter(a => a.status === 'active').length,
    critical: alerts.filter(a => a.severity === 'critical').length,
    high: alerts.filter(a => a.severity === 'high').length,
    resolved: alerts.filter(a => a.status === 'resolved').length
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#e74c3c';
      case 'high': return '#f39c12';
      case 'medium': return '#f1c40f';
      case 'low': return '#3498db';
      default: return '#7d8590';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#e74c3c';
      case 'investigating': return '#f39c12';
      case 'monitoring': return '#3498db';
      case 'acknowledged': return '#9b59b6';
      case 'resolved': return '#2ecc71';
      default: return '#7d8590';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'rate_limit':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12,6 12,12 16,14"/>
          </svg>
        );
      case 'authentication':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <circle cx="12" cy="16" r="1"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        );
      case 'anomaly':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
        );
      case 'infrastructure':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
            <line x1="6" y1="6" x2="6.01" y2="6"/>
            <line x1="6" y1="18" x2="6.01" y2="18"/>
          </svg>
        );
      case 'data_quality':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10,9 9,9 8,9"/>
          </svg>
        );
      case 'storage':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <ellipse cx="12" cy="5" rx="9" ry="3"/>
            <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
            <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        );
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  return (
    <div className="alerts-container">
      <div className="alerts-header">
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-value">{alertCounts.total}</div>
            <div className="stat-label">Total Alerts</div>
          </div>
          <div className="stat-card active">
            <div className="stat-value">{alertCounts.active}</div>
            <div className="stat-label">Active</div>
          </div>
          <div className="stat-card critical">
            <div className="stat-value">{alertCounts.critical}</div>
            <div className="stat-label">Critical</div>
          </div>
          <div className="stat-card high">
            <div className="stat-value">{alertCounts.high}</div>
            <div className="stat-label">High Priority</div>
          </div>
          <div className="stat-card resolved">
            <div className="stat-value">{alertCounts.resolved}</div>
            <div className="stat-label">Resolved</div>
          </div>
        </div>

        <div className="header-controls">
          <div className="filter-group">
            <label>Status:</label>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="investigating">Investigating</option>
              <option value="monitoring">Monitoring</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Severity:</label>
            <select 
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Severity</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort by:</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="severity">Severity</option>
            </select>
          </div>
        </div>
      </div>

      <div className="alerts-content">
        <div className="alerts-list">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className="alert-card">
              <div className="alert-header">
                <div className="alert-indicator">
                  <div 
                    className="severity-dot"
                    style={{ backgroundColor: getSeverityColor(alert.severity) }}
                  ></div>
                  <div 
                    className="category-icon"
                    style={{ color: getSeverityColor(alert.severity) }}
                  >
                    {getCategoryIcon(alert.category)}
                  </div>
                </div>

                <div className="alert-info">
                  <div className="alert-title-row">
                    <h3 className="alert-title">{alert.title}</h3>
                    <div className="alert-badges">
                      <span 
                        className="severity-badge"
                        style={{ 
                          backgroundColor: `${getSeverityColor(alert.severity)}20`,
                          color: getSeverityColor(alert.severity),
                          borderColor: `${getSeverityColor(alert.severity)}40`
                        }}
                      >
                        {alert.severity}
                      </span>
                      <span 
                        className="status-badge"
                        style={{ 
                          backgroundColor: `${getStatusColor(alert.status)}20`,
                          color: getStatusColor(alert.status),
                          borderColor: `${getStatusColor(alert.status)}40`
                        }}
                      >
                        {alert.status}
                      </span>
                    </div>
                  </div>
                  
                  <p className="alert-description">{alert.description}</p>
                  
                  <div className="alert-meta">
                    <div className="meta-item">
                      <span className="meta-label">Source:</span>
                      <span className="meta-value">{alert.source}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Time:</span>
                      <span className="meta-value">{formatTimestamp(alert.timestamp)}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Actions:</span>
                      <span className="meta-value">{alert.actions_taken} taken</span>
                    </div>
                  </div>
                </div>

                <div className="alert-actions">
                  <button className="action-btn primary" title="View Details">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                  {alert.status === 'active' && (
                    <button className="action-btn warning" title="Acknowledge">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20,6 9,17 4,12"></polyline>
                      </svg>
                    </button>
                  )}
                  <button className="action-btn" title="Mute Alert">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                      <line x1="23" y1="9" x2="17" y2="15"></line>
                      <line x1="17" y1="9" x2="23" y2="15"></line>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="alert-details">
                <div className="details-grid">
                  <div className="detail-section">
                    <h4>Affected Campaigns</h4>
                    <div className="campaign-list">
                      {alert.affected_campaigns.map((campaign, index) => (
                        <span key={index} className="campaign-tag">{campaign}</span>
                      ))}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h4>Technical Details</h4>
                    <div className="technical-details">
                      {Object.entries(alert).map(([key, value]) => {
                        if (['id', 'title', 'description', 'affected_campaigns', 'timestamp', 'source', 'category', 'severity', 'status'].includes(key)) return null;
                        return (
                          <div key={key} className="tech-detail">
                            <span className="tech-label">{key.replace('_', ' ')}:</span>
                            <span className="tech-value">{value}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alerts;