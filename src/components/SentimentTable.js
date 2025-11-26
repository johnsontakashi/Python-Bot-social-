import React from 'react';
import './SentimentTable.css';

const SentimentTable = ({ summary }) => {
  const fallback = {
    counts: { neutral: 15234, negative: 4672, positive: 2483 },
    percentages: { neutral: 68.1, negative: 20.9, positive: 11.0 },
    total: 22389
  };

  const s = summary && summary.total ? summary : fallback;
  const sentimentData = [
    {
      id: 'neutral',
      label: 'Neutral',
      color: '#4a90e2',
      count: s.counts.neutral,
      percentage: s.percentages.neutral,
      total: s.total
    },
    {
      id: 'negative',
      label: 'Negative',
      color: '#f39c12',
      count: s.counts.negative,
      percentage: s.percentages.negative,
      total: s.total
    },
    {
      id: 'positive',
      label: 'Positive',
      color: '#ffcc99',
      count: s.counts.positive,
      percentage: s.percentages.positive,
      total: s.total
    }
  ];

  return (
    <div className="sentiment-table">
      <div className="table-header">
        <h3 className="table-title">Sentiment Breakdown</h3>
      </div>
      
      <div className="table-content">
        <div className="table-header-row">
          <div className="col-sentiment">Sentiment</div>
          <div className="col-count">Count</div>
          <div className="col-percentage">Percentage</div>
          <div className="col-actions">Filter</div>
        </div>
        
        {sentimentData.map((item) => (
          <div key={item.id} className="table-row">
            <div className="col-sentiment">
              <div className="sentiment-info">
                <div 
                  className="sentiment-color-chip"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="sentiment-label">{item.label}</span>
              </div>
            </div>
            
            <div className="col-count">
              <span className="count-value">{item.count.toLocaleString()}</span>
            </div>
            
            <div className="col-percentage">
              <div className="percentage-container">
                <div className="percentage-bar">
                  <div 
                    className="percentage-fill"
                    style={{ 
                      width: `${item.percentage}%`,
                      backgroundColor: item.color 
                    }}
                  ></div>
                </div>
                <span className="percentage-value">{item.percentage}%</span>
              </div>
            </div>
            
            <div className="col-actions">
              <button className="filter-button">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3"></polygon>
                </svg>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </button>
            </div>
          </div>
        ))}
        
        <div className="table-footer">
          <div className="total-row">
            <div className="col-sentiment">
              <span className="total-label">Total</span>
            </div>
            <div className="col-count">
              <span className="total-count">{sentimentData.reduce((sum, item) => sum + item.count, 0).toLocaleString()}</span>
            </div>
            <div className="col-percentage">
              <span className="total-percentage">100%</span>
            </div>
            <div className="col-actions"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentTable;