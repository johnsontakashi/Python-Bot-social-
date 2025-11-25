import React, { useState } from 'react';
import './Events.css';

const Events = () => {
  const [timeFilter, setTimeFilter] = useState('24h');
  const [typeFilter, setTypeFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  const [events] = useState([
    {
      id: 1,
      timestamp: '2024-11-25T10:30:15Z',
      type: 'data_collection',
      severity: 'info',
      title: 'Instagram data collection completed',
      description: 'Successfully collected 1,247 posts from Instagram API for Federal Election 2024 campaign',
      source: 'Instagram Collector',
      campaign: 'Federal Election 2024',
      details: {
        posts: 1247,
        accounts: 89,
        hashtags: 156,
        duration: '45s'
      }
    },
    {
      id: 2,
      timestamp: '2024-11-25T10:15:32Z',
      type: 'system',
      severity: 'warning',
      title: 'High API rate limit usage detected',
      description: 'Twitter API rate limit at 85% capacity. Consider reducing collection frequency.',
      source: 'Rate Limiter',
      campaign: 'State Governors Race',
      details: {
        current_usage: '85%',
        limit_reset: '14:30',
        affected_endpoints: 3
      }
    },
    {
      id: 3,
      timestamp: '2024-11-25T10:00:45Z',
      type: 'alert',
      severity: 'error',
      title: 'Data collection failed for TikTok',
      description: 'TikTok API returned 403 Forbidden error. Authentication token may have expired.',
      source: 'TikTok Collector',
      campaign: 'Municipal Elections 2024',
      details: {
        error_code: '403',
        retry_count: 3,
        last_success: '2024-11-24T22:15:00Z'
      }
    },
    {
      id: 4,
      timestamp: '2024-11-25T09:45:18Z',
      type: 'user_action',
      severity: 'info',
      title: 'Dashboard created by Maria Silva',
      description: 'New dashboard "Election Sentiment Analysis" created for Federal Election 2024 project',
      source: 'Dashboard Builder',
      campaign: 'Federal Election 2024',
      details: {
        user: 'Maria Silva',
        dashboard_name: 'Election Sentiment Analysis',
        widgets: 8,
        resolution: '1080p'
      }
    },
    {
      id: 5,
      timestamp: '2024-11-25T09:30:22Z',
      type: 'data_processing',
      severity: 'success',
      title: 'Sentiment analysis batch completed',
      description: 'Processed 5,432 posts for sentiment analysis with 94.2% confidence score',
      source: 'Sentiment Processor',
      campaign: 'Federal Election 2024',
      details: {
        processed_posts: 5432,
        confidence_avg: '94.2%',
        positive: '45%',
        neutral: '35%',
        negative: '20%'
      }
    },
    {
      id: 6,
      timestamp: '2024-11-25T09:15:10Z',
      type: 'system',
      severity: 'info',
      title: 'Database backup completed',
      description: 'Scheduled database backup completed successfully. Backup size: 2.3GB',
      source: 'Backup Service',
      campaign: 'System',
      details: {
        backup_size: '2.3GB',
        duration: '12m 34s',
        tables: 47,
        records: '1,234,567'
      }
    },
    {
      id: 7,
      timestamp: '2024-11-25T08:50:35Z',
      type: 'alert',
      severity: 'warning',
      title: 'Unusual activity pattern detected',
      description: 'Spike in negative sentiment posts detected for candidate Wellington Moreira Franco',
      source: 'Anomaly Detector',
      campaign: 'Federal Election 2024',
      details: {
        candidate: 'Wellington Moreira Franco',
        sentiment_change: '-15%',
        time_window: '2h',
        trigger_threshold: '10%'
      }
    },
    {
      id: 8,
      timestamp: '2024-11-25T08:30:45Z',
      type: 'data_collection',
      severity: 'info',
      title: 'Facebook data collection started',
      description: 'Started collecting Facebook posts and comments for Municipal Elections 2024',
      source: 'Facebook Collector',
      campaign: 'Municipal Elections 2024',
      details: {
        target_accounts: 156,
        estimated_posts: '2,000-3,000',
        collection_period: '24h'
      }
    }
  ]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'data_collection':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <ellipse cx="12" cy="5" rx="9" ry="3"/>
            <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
            <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
          </svg>
        );
      case 'system':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        );
      case 'alert':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        );
      case 'user_action':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        );
      case 'data_processing':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        );
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'error': return '#e74c3c';
      case 'warning': return '#f39c12';
      case 'success': return '#2ecc71';
      case 'info': return '#4a90e2';
      default: return '#7d8590';
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

  const filteredEvents = events.filter(event => {
    if (typeFilter !== 'all' && event.type !== typeFilter) return false;
    if (severityFilter !== 'all' && event.severity !== severityFilter) return false;
    return true;
  });

  const eventCounts = {
    total: events.length,
    error: events.filter(e => e.severity === 'error').length,
    warning: events.filter(e => e.severity === 'warning').length,
    success: events.filter(e => e.severity === 'success').length,
    info: events.filter(e => e.severity === 'info').length
  };

  return (
    <div className="events-container">
      <div className="events-header">
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-value">{eventCounts.total}</div>
            <div className="stat-label">Total Events</div>
          </div>
          <div className="stat-card error">
            <div className="stat-value">{eventCounts.error}</div>
            <div className="stat-label">Errors</div>
          </div>
          <div className="stat-card warning">
            <div className="stat-value">{eventCounts.warning}</div>
            <div className="stat-label">Warnings</div>
          </div>
          <div className="stat-card success">
            <div className="stat-value">{eventCounts.success}</div>
            <div className="stat-label">Success</div>
          </div>
        </div>

        <div className="header-controls">
          <div className="filter-group">
            <label>Time Range:</label>
            <select 
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="filter-select"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Type:</label>
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Types</option>
              <option value="data_collection">Data Collection</option>
              <option value="system">System</option>
              <option value="alert">Alerts</option>
              <option value="user_action">User Actions</option>
              <option value="data_processing">Data Processing</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Severity:</label>
            <select 
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Levels</option>
              <option value="error">Error</option>
              <option value="warning">Warning</option>
              <option value="success">Success</option>
              <option value="info">Info</option>
            </select>
          </div>
        </div>
      </div>

      <div className="events-content">
        <div className="events-timeline">
          {filteredEvents.map((event) => (
            <div key={event.id} className="event-item">
              <div className="event-timeline-marker">
                <div 
                  className="timeline-dot"
                  style={{ backgroundColor: getSeverityColor(event.severity) }}
                ></div>
                <div className="timeline-line"></div>
              </div>

              <div className="event-card">
                <div className="event-header">
                  <div className="event-type">
                    <div 
                      className="type-icon"
                      style={{ color: getSeverityColor(event.severity) }}
                    >
                      {getTypeIcon(event.type)}
                    </div>
                    <span className="type-label">{event.type.replace('_', ' ')}</span>
                  </div>
                  
                  <div className="event-meta">
                    <span className="event-time">{formatTimestamp(event.timestamp)}</span>
                    <span 
                      className="severity-badge"
                      style={{ 
                        backgroundColor: `${getSeverityColor(event.severity)}20`,
                        color: getSeverityColor(event.severity),
                        borderColor: `${getSeverityColor(event.severity)}40`
                      }}
                    >
                      {event.severity}
                    </span>
                  </div>
                </div>

                <div className="event-content">
                  <h4 className="event-title">{event.title}</h4>
                  <p className="event-description">{event.description}</p>
                  
                  <div className="event-details">
                    <div className="detail-row">
                      <span className="detail-label">Source:</span>
                      <span className="detail-value">{event.source}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Campaign:</span>
                      <span className="detail-value">{event.campaign}</span>
                    </div>
                    
                    {Object.entries(event.details).map(([key, value]) => (
                      <div key={key} className="detail-row">
                        <span className="detail-label">{key.replace('_', ' ')}:</span>
                        <span className="detail-value">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="event-actions">
                  <button className="action-btn" title="View Full Details">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                  <button className="action-btn" title="Download Log">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7,10 12,15 17,10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;