import React from 'react';
import './Widget.css';
import KpiWidget from './widgets/KpiWidget';
import CounterWidget from './widgets/CounterWidget';
import ChartWidget from './widgets/ChartWidget';
import ClockWidget from './widgets/ClockWidget';
import ImageWidget from './widgets/ImageWidget';
import TextWidget from './widgets/TextWidget';
import TrendWidget from './widgets/TrendWidget';

const Widget = ({ widget, isEditMode, isSelected, onSelect, onRemove, onUpdate }) => {
  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'kpi':
        return <KpiWidget config={widget.config} />;
      case 'counter':
        return <CounterWidget config={widget.config} />;
      case 'chart-bar':
      case 'chart-line':
      case 'chart-pie':
      case 'chart-donut':
        return <ChartWidget type={widget.type} config={widget.config} />;
      case 'clock-digital':
      case 'clock-analog':
        return <ClockWidget type={widget.type} config={widget.config} />;
      case 'image':
        return <ImageWidget config={widget.config} />;
      case 'text':
        return <TextWidget config={widget.config} />;
      case 'trend-twitter':
      case 'trend-instagram':
        return <TrendWidget type={widget.type} config={widget.config} />;
      default:
        return (
          <div className="widget-placeholder">
            <div className="placeholder-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
              </svg>
            </div>
            <div className="placeholder-text">Unknown Widget</div>
          </div>
        );
    }
  };

  return (
    <div 
      className={`widget ${isEditMode ? 'edit-mode' : ''} ${isSelected ? 'selected' : ''}`}
      onClick={isEditMode ? onSelect : undefined}
    >
      {isEditMode && (
        <div className="widget-toolbar">
          <div className="widget-title">{widget.title}</div>
          <div className="widget-actions">
            <button 
              className="widget-action settings-btn"
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
              title="Widget Settings"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </button>
            <button 
              className="widget-action remove-btn"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              title="Remove Widget"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3,6 5,6 21,6"></polyline>
                <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
      
      <div className="widget-content">
        {renderWidgetContent()}
      </div>

      {isEditMode && isSelected && (
        <div className="widget-selection-border"></div>
      )}
    </div>
  );
};

export default Widget;