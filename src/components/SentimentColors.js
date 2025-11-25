import React, { useState, useEffect } from 'react';
import './SentimentColors.css';

const SentimentColors = () => {
  const [colorScheme, setColorScheme] = useState('default');
  const [customColors, setCustomColors] = useState({
    positive: '#2ecc71',
    negative: '#e74c3c',
    neutral: '#95a5a6',
    veryPositive: '#27ae60',
    veryNegative: '#c0392b'
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [thresholds, setThresholds] = useState({
    veryPositive: 0.8,
    positive: 0.2,
    neutral: 0.0,
    negative: -0.2,
    veryNegative: -0.8
  });
  const [previewData, setPreviewData] = useState([
    { label: 'Very Positive', value: 0.9, count: 145 },
    { label: 'Positive', value: 0.5, count: 234 },
    { label: 'Neutral', value: 0.0, count: 189 },
    { label: 'Negative', value: -0.4, count: 98 },
    { label: 'Very Negative', value: -0.9, count: 67 }
  ]);

  const colorSchemes = {
    default: {
      name: 'Default',
      description: 'Standard sentiment colors',
      colors: {
        positive: '#2ecc71',
        negative: '#e74c3c',
        neutral: '#95a5a6',
        veryPositive: '#27ae60',
        veryNegative: '#c0392b'
      }
    },
    vibrant: {
      name: 'Vibrant',
      description: 'High contrast colors',
      colors: {
        positive: '#00ff00',
        negative: '#ff0000',
        neutral: '#ffff00',
        veryPositive: '#32cd32',
        veryNegative: '#dc143c'
      }
    },
    pastel: {
      name: 'Pastel',
      description: 'Soft, muted colors',
      colors: {
        positive: '#a8e6cf',
        negative: '#ffaaa5',
        neutral: '#ffd3a5',
        veryPositive: '#88d8a3',
        veryNegative: '#ff8a80'
      }
    },
    professional: {
      name: 'Professional',
      description: 'Business-friendly colors',
      colors: {
        positive: '#4a90e2',
        negative: '#f39c12',
        neutral: '#7f8c8d',
        veryPositive: '#357abd',
        veryNegative: '#e67e22'
      }
    },
    accessibility: {
      name: 'Accessibility',
      description: 'Colorblind-friendly palette',
      colors: {
        positive: '#1f77b4',
        negative: '#d62728',
        neutral: '#ff7f0e',
        veryPositive: '#17becf',
        veryNegative: '#9467bd'
      }
    }
  };

  useEffect(() => {
    const savedSettings = localStorage.getItem('sentimentColorSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setColorScheme(settings.colorScheme || 'default');
      setCustomColors(settings.customColors || customColors);
      setThresholds(settings.thresholds || thresholds);
      setShowAdvanced(settings.showAdvanced || false);
    }
  }, []);

  const saveSettings = () => {
    const settings = {
      colorScheme,
      customColors,
      thresholds,
      showAdvanced
    };
    localStorage.setItem('sentimentColorSettings', JSON.stringify(settings));
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.textContent = 'Settings saved successfully!';
    successMessage.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--color-success);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(successMessage);
    setTimeout(() => {
      if (document.body.contains(successMessage)) {
        document.body.removeChild(successMessage);
      }
    }, 3000);
  };

  const resetToDefaults = () => {
    setColorScheme('default');
    setCustomColors(colorSchemes.default.colors);
    setThresholds({
      veryPositive: 0.8,
      positive: 0.2,
      neutral: 0.0,
      negative: -0.2,
      veryNegative: -0.8
    });
    setShowAdvanced(false);
  };

  const handleSchemeChange = (scheme) => {
    setColorScheme(scheme);
    if (scheme !== 'custom') {
      setCustomColors(colorSchemes[scheme].colors);
    }
  };

  const handleColorChange = (type, color) => {
    setCustomColors(prev => ({
      ...prev,
      [type]: color
    }));
    if (colorScheme !== 'custom') {
      setColorScheme('custom');
    }
  };

  const handleThresholdChange = (type, value) => {
    setThresholds(prev => ({
      ...prev,
      [type]: parseFloat(value)
    }));
  };

  const getSentimentColor = (value) => {
    const colors = colorScheme === 'custom' ? customColors : colorSchemes[colorScheme]?.colors || customColors;
    
    if (value >= thresholds.veryPositive) return colors.veryPositive;
    if (value >= thresholds.positive) return colors.positive;
    if (value <= thresholds.veryNegative) return colors.veryNegative;
    if (value <= thresholds.negative) return colors.negative;
    return colors.neutral;
  };

  const exportSettings = () => {
    const settings = {
      colorScheme,
      customColors,
      thresholds,
      showAdvanced,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sentiment-colors-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importSettings = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const settings = JSON.parse(e.target.result);
          if (settings.colorScheme) setColorScheme(settings.colorScheme);
          if (settings.customColors) setCustomColors(settings.customColors);
          if (settings.thresholds) setThresholds(settings.thresholds);
          if (settings.showAdvanced !== undefined) setShowAdvanced(settings.showAdvanced);
          
          const successMessage = document.createElement('div');
          successMessage.textContent = 'Settings imported successfully!';
          successMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-success);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 1000;
          `;
          document.body.appendChild(successMessage);
          setTimeout(() => {
            if (document.body.contains(successMessage)) {
              document.body.removeChild(successMessage);
            }
          }, 3000);
        } catch (error) {
          alert('Error importing settings. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
    event.target.value = '';
  };

  const currentColors = colorScheme === 'custom' ? customColors : colorSchemes[colorScheme]?.colors || customColors;

  return (
    <div className="sentiment-colors-container">
      <div className="sentiment-header">
        <div className="header-title">
          <h2>Sentiment Color Configuration</h2>
          <p>Customize colors and thresholds for sentiment analysis visualization</p>
        </div>
        <div className="header-actions">
          <button className="action-btn secondary" onClick={resetToDefaults}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4V2L9 5L12 8V6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18C8.69 18 6 15.31 6 12H4C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4Z" fill="currentColor"/>
            </svg>
            Reset to Defaults
          </button>
          <button className="action-btn primary" onClick={saveSettings}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H16L21 8V19C21 20.1 20.1 21 19 21ZM17 19V10H7V19H17ZM15 15V13H9V15H15ZM12 1L8 5L12 9V7H18V3H12V1Z" fill="currentColor"/>
            </svg>
            Save Settings
          </button>
        </div>
      </div>

      <div className="sentiment-content">
        <div className="settings-section">
          <div className="section-header">
            <h3>Color Schemes</h3>
            <p>Choose from predefined color schemes or create your own custom palette</p>
          </div>

          <div className="schemes-grid">
            {Object.entries(colorSchemes).map(([key, scheme]) => (
              <div
                key={key}
                className={`scheme-card ${colorScheme === key ? 'active' : ''}`}
                onClick={() => handleSchemeChange(key)}
              >
                <div className="scheme-header">
                  <h4>{scheme.name}</h4>
                  <p>{scheme.description}</p>
                </div>
                <div className="scheme-colors">
                  {Object.entries(scheme.colors).map(([type, color]) => (
                    <div
                      key={type}
                      className="color-dot"
                      style={{ backgroundColor: color }}
                      title={type}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
            
            <div
              className={`scheme-card custom ${colorScheme === 'custom' ? 'active' : ''}`}
              onClick={() => handleSchemeChange('custom')}
            >
              <div className="scheme-header">
                <h4>Custom</h4>
                <p>Create your own color palette</p>
              </div>
              <div className="scheme-colors">
                {Object.entries(customColors).map(([type, color]) => (
                  <div
                    key={type}
                    className="color-dot"
                    style={{ backgroundColor: color }}
                    title={type}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <h3>Color Customization</h3>
            <p>Fine-tune individual sentiment colors</p>
          </div>

          <div className="color-controls">
            {Object.entries(currentColors).map(([type, color]) => (
              <div key={type} className="color-control">
                <label>{type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                <div className="color-input-group">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => handleColorChange(type, e.target.value)}
                    className="color-picker"
                  />
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => handleColorChange(type, e.target.value)}
                    className="color-text"
                    placeholder="#000000"
                  />
                  <div
                    className="color-preview"
                    style={{ backgroundColor: color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <h3>Advanced Settings</h3>
            <button
              className="toggle-advanced"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d={showAdvanced ? "M18 15L12 9L6 15" : "M6 9L12 15L18 9"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {showAdvanced ? 'Hide' : 'Show'} Advanced Options
            </button>
          </div>

          {showAdvanced && (
            <div className="advanced-controls">
              <div className="threshold-controls">
                <h4>Sentiment Thresholds</h4>
                <p>Configure the numerical ranges for each sentiment category</p>
                
                <div className="threshold-grid">
                  {Object.entries(thresholds).map(([type, value]) => (
                    <div key={type} className="threshold-control">
                      <label>{type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                      <div className="threshold-input-group">
                        <input
                          type="range"
                          min="-1"
                          max="1"
                          step="0.1"
                          value={value}
                          onChange={(e) => handleThresholdChange(type, e.target.value)}
                          className="threshold-slider"
                        />
                        <input
                          type="number"
                          min="-1"
                          max="1"
                          step="0.1"
                          value={value}
                          onChange={(e) => handleThresholdChange(type, e.target.value)}
                          className="threshold-number"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="import-export">
                <h4>Import/Export Settings</h4>
                <div className="import-export-buttons">
                  <label className="import-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15M17 8L12 3L7 8M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Import Settings
                    <input
                      type="file"
                      accept=".json"
                      onChange={importSettings}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <button className="export-btn" onClick={exportSettings}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15M7 10L12 15L17 10M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Export Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="preview-section">
        <div className="section-header">
          <h3>Live Preview</h3>
          <p>See how your color scheme looks with sample data</p>
        </div>

        <div className="preview-content">
          <div className="preview-chart">
            <div className="chart-title">Sentiment Distribution</div>
            <div className="chart-bars">
              {previewData.map((item, index) => (
                <div key={index} className="chart-bar">
                  <div
                    className="bar-fill"
                    style={{
                      backgroundColor: getSentimentColor(item.value),
                      width: `${(item.count / Math.max(...previewData.map(d => d.count))) * 100}%`
                    }}
                  ></div>
                  <div className="bar-label">
                    <span className="label-text">{item.label}</span>
                    <span className="label-count">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="preview-legend">
            <h4>Color Legend</h4>
            <div className="legend-items">
              {Object.entries(currentColors).map(([type, color]) => (
                <div key={type} className="legend-item">
                  <div
                    className="legend-color"
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="legend-label">
                    {type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                  <span className="legend-threshold">
                    {thresholds[type] !== undefined ? `${thresholds[type] > 0 ? '+' : ''}${thresholds[type]}` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentColors;