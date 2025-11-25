import React, { useState, useCallback } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import './DashboardBuilder.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import WidgetLibrary from './WidgetLibrary';
import Widget from './Widget';

const ResponsiveGridLayout = WidthProvider(Responsive);

const DashboardBuilder = ({ dataset, onBack }) => {
  const [isEditMode, setIsEditMode] = useState(true);
  const [selectedResolution, setSelectedResolution] = useState('1080p');
  const [dashboardSettings, setDashboardSettings] = useState({
    title: 'New Dashboard',
    background: { type: 'solid', value: '#0d1117' }
  });
  const [widgets, setWidgets] = useState([]);
  const [showWidgetLibrary, setShowWidgetLibrary] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState(null);

  const resolutions = {
    '720p': { width: 1280, height: 720 },
    '1080p': { width: 1920, height: 1080 },
    '4K': { width: 3840, height: 2160 },
    '8K': { width: 7680, height: 4320 }
  };

  const layouts = {
    lg: widgets.map(widget => widget.layout)
  };

  const onLayoutChange = useCallback((layout, layouts) => {
    setWidgets(prevWidgets => 
      prevWidgets.map(widget => ({
        ...widget,
        layout: layout.find(l => l.i === widget.id) || widget.layout
      }))
    );
  }, []);

  const addWidget = (widgetType) => {
    const newWidget = {
      id: `widget-${Date.now()}`,
      type: widgetType.type,
      title: widgetType.defaultTitle,
      config: widgetType.defaultConfig,
      layout: {
        i: `widget-${Date.now()}`,
        x: 0,
        y: 0,
        w: widgetType.defaultSize.w,
        h: widgetType.defaultSize.h,
        minW: widgetType.minSize.w,
        minH: widgetType.minSize.h
      }
    };

    setWidgets(prev => [...prev, newWidget]);
    setShowWidgetLibrary(false);
  };

  const removeWidget = (widgetId) => {
    setWidgets(prev => prev.filter(w => w.id !== widgetId));
    setSelectedWidget(null);
  };

  const updateWidget = (widgetId, updates) => {
    setWidgets(prev => 
      prev.map(w => w.id === widgetId ? { ...w, ...updates } : w)
    );
  };

  const getCanvasStyle = () => {
    const resolution = resolutions[selectedResolution];
    const scale = Math.min(
      (window.innerWidth - 400) / resolution.width,
      (window.innerHeight - 200) / resolution.height,
      1
    );

    return {
      width: resolution.width,
      height: resolution.height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: dashboardSettings.background.type === 'solid' 
        ? dashboardSettings.background.value 
        : `url(${dashboardSettings.background.value})`
    };
  };

  return (
    <div className="dashboard-builder">
      <div className="builder-header">
        <div className="header-left">
          <button onClick={onBack} className="back-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
            Back
          </button>
          
          <div className="dashboard-info">
            <input 
              type="text"
              value={dashboardSettings.title}
              onChange={(e) => setDashboardSettings(prev => ({ ...prev, title: e.target.value }))}
              className="dashboard-title-input"
            />
            <span className="dataset-name">{dataset?.name}</span>
          </div>
        </div>

        <div className="header-controls">
          <div className="resolution-selector">
            <label>Resolution:</label>
            <select 
              value={selectedResolution}
              onChange={(e) => setSelectedResolution(e.target.value)}
            >
              {Object.keys(resolutions).map(res => (
                <option key={res} value={res}>
                  {res} ({resolutions[res].width}×{resolutions[res].height})
                </option>
              ))}
            </select>
          </div>

          <div className="mode-toggle">
            <button 
              className={`mode-btn ${isEditMode ? 'active' : ''}`}
              onClick={() => setIsEditMode(true)}
            >
              Edit
            </button>
            <button 
              className={`mode-btn ${!isEditMode ? 'active' : ''}`}
              onClick={() => setIsEditMode(false)}
            >
              Preview
            </button>
          </div>

          <button 
            className="add-widget-btn"
            onClick={() => setShowWidgetLibrary(!showWidgetLibrary)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Widget
          </button>

          <button className="save-dashboard-btn">
            Save Dashboard
          </button>
        </div>
      </div>

      <div className="builder-content">
        {showWidgetLibrary && (
          <WidgetLibrary 
            onAddWidget={addWidget}
            onClose={() => setShowWidgetLibrary(false)}
          />
        )}

        <div className="canvas-container">
          <div className="canvas-wrapper">
            <div className="canvas" style={getCanvasStyle()}>
              <ResponsiveGridLayout
                className="layout"
                layouts={layouts}
                onLayoutChange={onLayoutChange}
                isDraggable={isEditMode}
                isResizable={isEditMode}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 24, md: 20, sm: 12, xs: 8, xxs: 4 }}
                rowHeight={30}
                margin={[8, 8]}
                containerPadding={[16, 16]}
              >
                {widgets.map(widget => (
                  <div key={widget.id} className="widget-container">
                    <Widget
                      widget={widget}
                      isEditMode={isEditMode}
                      isSelected={selectedWidget?.id === widget.id}
                      onSelect={() => setSelectedWidget(widget)}
                      onRemove={() => removeWidget(widget.id)}
                      onUpdate={(updates) => updateWidget(widget.id, updates)}
                    />
                  </div>
                ))}
              </ResponsiveGridLayout>
              
              {widgets.length === 0 && isEditMode && (
                <div className="empty-canvas">
                  <div className="empty-content">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <line x1="9" y1="9" x2="15" y2="15"/>
                      <line x1="15" y1="9" x2="9" y2="15"/>
                    </svg>
                    <h3>No Widgets Yet</h3>
                    <p>Click "Add Widget" to start building your dashboard</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {selectedWidget && isEditMode && (
          <div className="widget-settings">
            <div className="settings-header">
              <h3>Widget Settings</h3>
              <button 
                onClick={() => setSelectedWidget(null)}
                className="close-settings"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="settings-content">
              <div className="setting-group">
                <label>Title</label>
                <input 
                  type="text"
                  value={selectedWidget.title}
                  onChange={(e) => updateWidget(selectedWidget.id, { title: e.target.value })}
                />
              </div>
              
              <div className="setting-group">
                <label>Widget Type</label>
                <div className="widget-type-display">{selectedWidget.type}</div>
              </div>
              
              {/* Widget-specific settings would go here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardBuilder;