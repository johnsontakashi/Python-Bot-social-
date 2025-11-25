import React, { useState } from 'react';
import './TimeSeriesChart.css';

const TimeSeriesChart = () => {
  const [chartOptions, setChartOptions] = useState({
    showStreamHistory: true,
    showReposts: false,
    showTotal: true,
    summariseBy: 'Day'
  });

  const toggleOption = (option) => {
    setChartOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const setSummariseBy = (value) => {
    setChartOptions(prev => ({
      ...prev,
      summariseBy: value
    }));
  };

  // Mock data points for the chart
  const chartData = [
    { date: '03/03', neutral: 120, negative: 80, positive: 60 },
    { date: '04/03', neutral: 140, negative: 90, positive: 70 },
    { date: '05/03', neutral: 110, negative: 100, positive: 50 },
    { date: '06/03', neutral: 160, negative: 70, positive: 80 },
    { date: '07/03', neutral: 180, negative: 60, positive: 90 },
    { date: '08/03', neutral: 150, negative: 85, positive: 75 },
    { date: '09/03', neutral: 170, negative: 75, positive: 85 },
    { date: '10/03', neutral: 190, negative: 65, positive: 95 },
    { date: '11/03', neutral: 160, negative: 80, positive: 70 },
    { date: '12/03', neutral: 200, negative: 55, positive: 100 }
  ];

  const maxValue = Math.max(...chartData.flatMap(d => [d.neutral, d.negative, d.positive]));

  return (
    <div className="time-series-chart">
      <div className="chart-header">
        <h3 className="chart-title">Sentiment Analysis Over Time</h3>
        
        <div className="chart-controls">
          <div className="toggle-controls">
            <label className="toggle-option">
              <input 
                type="checkbox" 
                checked={chartOptions.showStreamHistory}
                onChange={() => toggleOption('showStreamHistory')}
              />
              <span>Show stream history</span>
            </label>
            
            <label className="toggle-option">
              <input 
                type="checkbox" 
                checked={chartOptions.showReposts}
                onChange={() => toggleOption('showReposts')}
              />
              <span>Show reposts</span>
            </label>
            
            <label className="toggle-option">
              <input 
                type="checkbox" 
                checked={chartOptions.showTotal}
                onChange={() => toggleOption('showTotal')}
              />
              <span>Show total</span>
            </label>
          </div>
          
          <div className="summarise-control">
            <span className="control-label">Summarise by</span>
            <div className="button-group">
              <button 
                className={`group-button ${chartOptions.summariseBy === 'Day' ? 'active' : ''}`}
                onClick={() => setSummariseBy('Day')}
              >
                Day
              </button>
              <button 
                className={`group-button ${chartOptions.summariseBy === 'Week' ? 'active' : ''}`}
                onClick={() => setSummariseBy('Week')}
              >
                Week
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="chart-container">
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#4a90e2' }}></div>
            <span>Neutral</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#f39c12' }}></div>
            <span>Negative</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#ffcc99' }}></div>
            <span>Positive</span>
          </div>
        </div>
        
        <div className="chart-area">
          <div className="chart-y-axis">
            {[0, 50, 100, 150, 200].map(value => (
              <div key={value} className="y-axis-label">{value}</div>
            ))}
          </div>
          
          <div className="chart-plot">
            <svg width="100%" height="300" viewBox="0 0 800 300">
              {/* Grid lines */}
              {[0, 60, 120, 180, 240, 300].map(y => (
                <line 
                  key={y} 
                  x1="0" 
                  y1={y} 
                  x2="800" 
                  y2={y} 
                  stroke="#404040" 
                  strokeWidth="1"
                />
              ))}
              
              {/* Data lines */}
              {/* Neutral line */}
              <polyline
                points={chartData.map((d, i) => `${i * 80 + 40},${300 - (d.neutral / maxValue) * 280}`).join(' ')}
                fill="none"
                stroke="#4a90e2"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              
              {/* Negative line */}
              <polyline
                points={chartData.map((d, i) => `${i * 80 + 40},${300 - (d.negative / maxValue) * 280}`).join(' ')}
                fill="none"
                stroke="#f39c12"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              
              {/* Positive line */}
              <polyline
                points={chartData.map((d, i) => `${i * 80 + 40},${300 - (d.positive / maxValue) * 280}`).join(' ')}
                fill="none"
                stroke="#ffcc99"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              
              {/* Data points */}
              {chartData.map((d, i) => (
                <g key={i}>
                  <circle cx={i * 80 + 40} cy={300 - (d.neutral / maxValue) * 280} r="4" fill="#4a90e2" />
                  <circle cx={i * 80 + 40} cy={300 - (d.negative / maxValue) * 280} r="4" fill="#f39c12" />
                  <circle cx={i * 80 + 40} cy={300 - (d.positive / maxValue) * 280} r="4" fill="#ffcc99" />
                </g>
              ))}
            </svg>
          </div>
        </div>
        
        <div className="chart-x-axis">
          {chartData.map((d, i) => (
            <div key={i} className="x-axis-label">{d.date}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeSeriesChart;