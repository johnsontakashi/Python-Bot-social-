import React from 'react';
import './WidgetLibrary.css';

const WidgetLibrary = ({ onAddWidget, onClose }) => {
  const widgetTypes = [
    {
      type: 'kpi',
      name: 'KPI Card',
      description: 'Large number with label for key metrics',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10"/>
          <line x1="12" y1="20" x2="12" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
      ),
      defaultTitle: 'KPI Metric',
      defaultSize: { w: 4, h: 4 },
      minSize: { w: 3, h: 3 },
      defaultConfig: {
        value: 1234,
        label: 'Total Posts',
        format: 'number',
        color: '#4a90e2'
      }
    },
    {
      type: 'counter',
      name: 'Counter',
      description: 'Animated counter with optional increment',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10,9 9,9 8,9"/>
        </svg>
      ),
      defaultTitle: 'Counter Widget',
      defaultSize: { w: 3, h: 3 },
      minSize: { w: 2, h: 2 },
      defaultConfig: {
        value: 0,
        target: 1000,
        animated: true,
        duration: 2000
      }
    },
    {
      type: 'chart-bar',
      name: 'Bar Chart',
      description: 'Vertical bar chart for data comparison',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="20" x2="12" y2="10"/>
          <line x1="18" y1="20" x2="18" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="16"/>
        </svg>
      ),
      defaultTitle: 'Bar Chart',
      defaultSize: { w: 6, h: 6 },
      minSize: { w: 4, h: 4 },
      defaultConfig: {
        data: [],
        xAxis: 'Date',
        yAxis: 'Count'
      }
    },
    {
      type: 'chart-line',
      name: 'Line Chart',
      description: 'Time series line chart for trends',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="3 6 9 1 16 7 21 2"/>
        </svg>
      ),
      defaultTitle: 'Line Chart',
      defaultSize: { w: 8, h: 6 },
      minSize: { w: 6, h: 4 },
      defaultConfig: {
        data: [],
        timeRange: '7d'
      }
    },
    {
      type: 'chart-pie',
      name: 'Pie Chart',
      description: 'Circular chart for data distribution',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
          <path d="M22 12A10 10 0 0 0 12 2v10z"/>
        </svg>
      ),
      defaultTitle: 'Pie Chart',
      defaultSize: { w: 5, h: 5 },
      minSize: { w: 4, h: 4 },
      defaultConfig: {
        data: [],
        showLegend: true
      }
    },
    {
      type: 'chart-donut',
      name: 'Donut Chart',
      description: 'Ring chart with center content',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="4"/>
        </svg>
      ),
      defaultTitle: 'Donut Chart',
      defaultSize: { w: 5, h: 5 },
      minSize: { w: 4, h: 4 },
      defaultConfig: {
        data: [],
        centerText: 'Total'
      }
    },
    {
      type: 'clock-digital',
      name: 'Digital Clock',
      description: 'Digital time display',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
          <line x1="7" y1="9" x2="17" y2="9"/>
          <line x1="7" y1="13" x2="17" y2="13"/>
        </svg>
      ),
      defaultTitle: 'Current Time',
      defaultSize: { w: 4, h: 3 },
      minSize: { w: 3, h: 2 },
      defaultConfig: {
        format: '24h',
        timezone: 'local',
        showDate: true
      }
    },
    {
      type: 'clock-analog',
      name: 'Analog Clock',
      description: 'Traditional clock face',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12,6 12,12 16,14"/>
        </svg>
      ),
      defaultTitle: 'Clock',
      defaultSize: { w: 4, h: 4 },
      minSize: { w: 3, h: 3 },
      defaultConfig: {
        timezone: 'local',
        showNumbers: true
      }
    },
    {
      type: 'image',
      name: 'Image Widget',
      description: 'Display images or logos',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21,15 16,10 5,21"/>
        </svg>
      ),
      defaultTitle: 'Image',
      defaultSize: { w: 4, h: 4 },
      minSize: { w: 2, h: 2 },
      defaultConfig: {
        src: '',
        alt: 'Image',
        fit: 'cover'
      }
    },
    {
      type: 'text',
      name: 'Text Panel',
      description: 'Rich text content display',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="4,7 4,4 20,4 20,7"/>
          <line x1="9" y1="20" x2="15" y2="20"/>
          <line x1="12" y1="4" x2="12" y2="20"/>
        </svg>
      ),
      defaultTitle: 'Text Content',
      defaultSize: { w: 6, h: 4 },
      minSize: { w: 3, h: 2 },
      defaultConfig: {
        content: 'Add your text content here...',
        fontSize: '16px',
        textAlign: 'left'
      }
    },
    {
      type: 'trend-twitter',
      name: 'Twitter Trend',
      description: 'Twitter mentions and trends',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
        </svg>
      ),
      defaultTitle: 'Twitter Activity',
      defaultSize: { w: 6, h: 5 },
      minSize: { w: 4, h: 3 },
      defaultConfig: {
        platform: 'twitter',
        metric: 'mentions'
      }
    },
    {
      type: 'trend-instagram',
      name: 'Instagram Trend',
      description: 'Instagram posts and engagement',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      ),
      defaultTitle: 'Instagram Activity',
      defaultSize: { w: 6, h: 5 },
      minSize: { w: 4, h: 3 },
      defaultConfig: {
        platform: 'instagram',
        metric: 'posts'
      }
    }
  ];

  const categories = [
    { name: 'All', filter: null },
    { name: 'KPIs', filter: ['kpi', 'counter'] },
    { name: 'Charts', filter: ['chart-bar', 'chart-line', 'chart-pie', 'chart-donut'] },
    { name: 'Clocks', filter: ['clock-digital', 'clock-analog'] },
    { name: 'Content', filter: ['image', 'text'] },
    { name: 'Social', filter: ['trend-twitter', 'trend-instagram'] }
  ];

  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredWidgets = widgetTypes.filter(widget => {
    const category = categories.find(c => c.name === selectedCategory);
    if (!category || !category.filter) return true;
    return category.filter.includes(widget.type);
  });

  return (
    <div className="widget-library">
      <div className="library-header">
        <h3>Widget Library</h3>
        <button onClick={onClose} className="close-library">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="library-categories">
        {categories.map(category => (
          <button
            key={category.name}
            className={`category-btn ${selectedCategory === category.name ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="library-content">
        <div className="widget-grid">
          {filteredWidgets.map(widget => (
            <div
              key={widget.type}
              className="widget-item"
              onClick={() => onAddWidget(widget)}
            >
              <div className="widget-icon">
                {widget.icon}
              </div>
              <div className="widget-info">
                <h4>{widget.name}</h4>
                <p>{widget.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WidgetLibrary;