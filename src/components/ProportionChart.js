import React, { useState } from 'react';
import './ProportionChart.css';

const ProportionChart = ({ distribution }) => {
  const [showOthers, setShowOthers] = useState(false);

  const fallback = [
    { label: 'Neutral', value: 68.1, color: '#4a90e2' },
    { label: 'Negative', value: 20.9, color: '#f39c12' },
    { label: 'Positive', value: 11.0, color: '#ffcc99' }
  ];

  const sentimentData = distribution && distribution.length ? distribution : fallback;
  // Calculate angles for donut chart
  const total = sentimentData.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;
  
  const segments = sentimentData.map(item => {
    const angle = (item.value / total) * 360;
    const segment = {
      ...item,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
      angle: angle
    };
    currentAngle += angle;
    return segment;
  });

  const createPath = (centerX, centerY, radius, innerRadius, startAngle, endAngle) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const innerStart = polarToCartesian(centerX, centerY, innerRadius, endAngle);
    const innerEnd = polarToCartesian(centerX, centerY, innerRadius, startAngle);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      "L", innerEnd.x, innerEnd.y,
      "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
      "Z"
    ].join(" ");
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div className="proportion-chart">
      <div className="chart-header">
        <h3 className="chart-title">Proportion</h3>
        <label className="show-others-toggle">
          <input 
            type="checkbox" 
            checked={showOthers}
            onChange={(e) => setShowOthers(e.target.checked)}
          />
          <span>Show others</span>
        </label>
      </div>
      
      <div className="donut-container">
        <svg width="280" height="280" viewBox="0 0 280 280">
          {/* Donut chart segments */}
          {segments.map((segment, index) => (
            <path
              key={index}
              d={createPath(140, 140, 120, 70, segment.startAngle, segment.endAngle)}
              fill={segment.color}
              stroke="#262626"
              strokeWidth="2"
            />
          ))}
          
          {/* Center icon (smiley face) */}
          <g transform="translate(140, 140)">
            <circle cx="0" cy="0" r="35" fill="none" stroke="#999999" strokeWidth="2" />
            {/* Eyes */}
            <circle cx="-12" cy="-8" r="3" fill="#999999" />
            <circle cx="12" cy="-8" r="3" fill="#999999" />
            {/* Smile */}
            <path d="M -15 8 Q 0 20 15 8" stroke="#999999" strokeWidth="2" fill="none" />
          </g>
        </svg>
        
        {/* Center percentage */}
        <div className="center-text">
          <div className="center-percentage">100%</div>
          <div className="center-label">Total</div>
        </div>
      </div>
      
      <div className="chart-legend">
        {segments.map((segment, index) => (
          <div key={index} className="legend-row">
            <div className="legend-info">
              <div 
                className="legend-color-dot"
                style={{ backgroundColor: segment.color }}
              ></div>
              <span className="legend-label">{segment.label}</span>
            </div>
            <div className="legend-values">
              <span className="legend-percentage">{segment.value}%</span>
              <span className="legend-count">
                {Math.round((segment.value / 100) * 22389).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProportionChart;