import React from 'react';
import './ChartWidget.css';

const ChartWidget = ({ type, config }) => {
  // Mock data for demonstration
  const mockData = [
    { name: 'Positive', value: 45, color: '#2ecc71' },
    { name: 'Neutral', value: 35, color: '#4a90e2' },
    { name: 'Negative', value: 20, color: '#e74c3c' }
  ];

  const renderBarChart = () => (
    <div className="chart-container">
      <div className="chart-bars">
        {mockData.map((item, index) => (
          <div key={index} className="bar-item">
            <div 
              className="bar"
              style={{ 
                height: `${item.value * 2}px`,
                backgroundColor: item.color 
              }}
            ></div>
            <div className="bar-label">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPieChart = () => {
    const total = mockData.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;
    
    return (
      <div className="chart-container">
        <svg width="120" height="120" viewBox="0 0 120 120">
          {mockData.map((item, index) => {
            const angle = (item.value / total) * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            currentAngle += angle;
            
            const x1 = 60 + 50 * Math.cos((startAngle * Math.PI) / 180);
            const y1 = 60 + 50 * Math.sin((startAngle * Math.PI) / 180);
            const x2 = 60 + 50 * Math.cos((endAngle * Math.PI) / 180);
            const y2 = 60 + 50 * Math.sin((endAngle * Math.PI) / 180);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            return (
              <path
                key={index}
                d={`M 60 60 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                fill={item.color}
                stroke="#161b22"
                strokeWidth="2"
              />
            );
          })}
        </svg>
        <div className="chart-legend">
          {mockData.map((item, index) => (
            <div key={index} className="legend-item">
              <div className="legend-color" style={{ backgroundColor: item.color }}></div>
              <span>{item.name}: {item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderChart = () => {
    switch (type) {
      case 'chart-bar':
        return renderBarChart();
      case 'chart-pie':
      case 'chart-donut':
        return renderPieChart();
      case 'chart-line':
        return (
          <div className="chart-placeholder">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 9 1 16 7 21 2"/>
            </svg>
            <span>Line Chart</span>
          </div>
        );
      default:
        return <div>Chart</div>;
    }
  };

  return (
    <div className="chart-widget">
      {renderChart()}
    </div>
  );
};

export default ChartWidget;