import React from 'react';
import './TrendWidget.css';

const TrendWidget = ({ type, config }) => {
  const getPlatformIcon = () => {
    switch (type) {
      case 'trend-twitter':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
          </svg>
        );
      case 'trend-instagram':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const getPlatformColor = () => {
    switch (type) {
      case 'trend-twitter': return '#1DA1F2';
      case 'trend-instagram': return '#E4405F';
      default: return '#4a90e2';
    }
  };

  const mockMetrics = {
    mentions: 1234,
    sentiment: { positive: 65, negative: 20, neutral: 15 },
    trend: '+12.5%'
  };

  return (
    <div className="trend-widget">
      <div className="trend-header">
        <div className="platform-info">
          <div className="platform-icon" style={{ color: getPlatformColor() }}>
            {getPlatformIcon()}
          </div>
          <span className="platform-name">
            {type === 'trend-twitter' ? 'Twitter' : 'Instagram'}
          </span>
        </div>
        <div className="trend-change" style={{ color: '#2ecc71' }}>
          {mockMetrics.trend}
        </div>
      </div>
      
      <div className="trend-metrics">
        <div className="metric-item">
          <div className="metric-value">{mockMetrics.mentions.toLocaleString()}</div>
          <div className="metric-label">{config.metric || 'Mentions'}</div>
        </div>
      </div>
      
      <div className="sentiment-breakdown">
        <div className="sentiment-bar">
          <div 
            className="sentiment-segment positive"
            style={{ width: `${mockMetrics.sentiment.positive}%` }}
          ></div>
          <div 
            className="sentiment-segment neutral"
            style={{ width: `${mockMetrics.sentiment.neutral}%` }}
          ></div>
          <div 
            className="sentiment-segment negative"
            style={{ width: `${mockMetrics.sentiment.negative}%` }}
          ></div>
        </div>
        <div className="sentiment-labels">
          <span style={{ color: '#2ecc71' }}>{mockMetrics.sentiment.positive}%</span>
          <span style={{ color: '#4a90e2' }}>{mockMetrics.sentiment.neutral}%</span>
          <span style={{ color: '#e74c3c' }}>{mockMetrics.sentiment.negative}%</span>
        </div>
      </div>
    </div>
  );
};

export default TrendWidget;