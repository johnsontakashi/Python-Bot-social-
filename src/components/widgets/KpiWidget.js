import React from 'react';
import './KpiWidget.css';

const KpiWidget = ({ config }) => {
  const formatValue = (value, format) => {
    switch (format) {
      case 'number':
        return new Intl.NumberFormat().format(value);
      case 'currency':
        return new Intl.NumberFormat('en-US', { 
          style: 'currency', 
          currency: 'USD' 
        }).format(value);
      case 'percentage':
        return `${value}%`;
      default:
        return value.toString();
    }
  };

  return (
    <div className="kpi-widget">
      <div className="kpi-value" style={{ color: config.color || '#4a90e2' }}>
        {formatValue(config.value, config.format)}
      </div>
      <div className="kpi-label">
        {config.label}
      </div>
      <div className="kpi-trend">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="7 13,12 8,16 12,21 7"></polyline>
          <polyline points="16 7,21 7,21 12"></polyline>
        </svg>
        <span>+12.5%</span>
      </div>
    </div>
  );
};

export default KpiWidget;