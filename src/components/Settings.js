import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    organization: {
      name: 'Political Monitor Analytics',
      timezone: 'America/Sao_Paulo',
      language: 'Portuguese (Brazil)',
      currency: 'BRL'
    },
    api: {
      twitter_enabled: true,
      instagram_enabled: true,
      tiktok_enabled: false,
      facebook_enabled: true,
      rate_limit_buffer: 85,
      retry_attempts: 3
    },
    notifications: {
      email_alerts: true,
      sms_alerts: false,
      slack_integration: true,
      critical_only: false,
      daily_reports: true
    },
    security: {
      two_factor: true,
      session_timeout: 480,
      ip_whitelist: true,
      audit_logging: true
    },
    data: {
      retention_days: 365,
      auto_backup: true,
      backup_frequency: 'daily',
      export_format: 'json'
    }
  });

  const updateSetting = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const tabs = [
    { id: 'general', label: 'General', icon: 'settings' },
    { id: 'api', label: 'API Configuration', icon: 'database' },
    { id: 'notifications', label: 'Notifications', icon: 'bell' },
    { id: 'security', label: 'Security', icon: 'shield' },
    { id: 'data', label: 'Data Management', icon: 'archive' }
  ];

  const getTabIcon = (iconName) => {
    switch (iconName) {
      case 'settings':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        );
      case 'database':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <ellipse cx="12" cy="5" rx="9" ry="3"/>
            <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
            <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
          </svg>
        );
      case 'bell':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        );
      case 'shield':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        );
      case 'archive':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="21,8 21,21 3,21 3,8"/>
            <rect x="1" y="3" width="22" height="5"/>
            <line x1="10" y1="12" x2="14" y2="12"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <div className="header-title">
          <h2>Settings</h2>
          <p>Manage your organization configuration and preferences</p>
        </div>
        <div className="header-actions">
          <button className="save-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
              <polyline points="17,21 17,13 7,13 7,21"/>
              <polyline points="7,3 7,8 15,8"/>
            </svg>
            Save Changes
          </button>
        </div>
      </div>

      <div className="settings-content">
        <div className="settings-sidebar">
          <nav className="settings-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="tab-icon">{getTabIcon(tab.icon)}</div>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="settings-main">
          {activeTab === 'general' && (
            <div className="settings-panel">
              <h3>General Settings</h3>
              <div className="settings-section">
                <div className="setting-item">
                  <label>Organization Name</label>
                  <input
                    type="text"
                    value={settings.organization.name}
                    onChange={(e) => updateSetting('organization', 'name', e.target.value)}
                    className="setting-input"
                  />
                </div>
                <div className="setting-item">
                  <label>Timezone</label>
                  <select
                    value={settings.organization.timezone}
                    onChange={(e) => updateSetting('organization', 'timezone', e.target.value)}
                    className="setting-select"
                  >
                    <option value="America/Sao_Paulo">São Paulo (UTC-3)</option>
                    <option value="America/New_York">New York (UTC-5)</option>
                    <option value="Europe/London">London (UTC+0)</option>
                    <option value="Asia/Tokyo">Tokyo (UTC+9)</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Language</label>
                  <select
                    value={settings.organization.language}
                    onChange={(e) => updateSetting('organization', 'language', e.target.value)}
                    className="setting-select"
                  >
                    <option value="Portuguese (Brazil)">Portuguese (Brazil)</option>
                    <option value="English (US)">English (US)</option>
                    <option value="Spanish (Mexico)">Spanish (Mexico)</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Currency</label>
                  <select
                    value={settings.organization.currency}
                    onChange={(e) => updateSetting('organization', 'currency', e.target.value)}
                    className="setting-select"
                  >
                    <option value="BRL">Brazilian Real (BRL)</option>
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="settings-panel">
              <h3>API Configuration</h3>
              <div className="settings-section">
                <div className="setting-group">
                  <h4>Social Media Platforms</h4>
                  <div className="toggle-group">
                    <div className="toggle-item">
                      <label className="toggle-label">
                        <input
                          type="checkbox"
                          checked={settings.api.twitter_enabled}
                          onChange={(e) => updateSetting('api', 'twitter_enabled', e.target.checked)}
                          className="toggle-input"
                        />
                        <span className="toggle-switch"></span>
                        Twitter Integration
                      </label>
                    </div>
                    <div className="toggle-item">
                      <label className="toggle-label">
                        <input
                          type="checkbox"
                          checked={settings.api.instagram_enabled}
                          onChange={(e) => updateSetting('api', 'instagram_enabled', e.target.checked)}
                          className="toggle-input"
                        />
                        <span className="toggle-switch"></span>
                        Instagram Integration
                      </label>
                    </div>
                    <div className="toggle-item">
                      <label className="toggle-label">
                        <input
                          type="checkbox"
                          checked={settings.api.tiktok_enabled}
                          onChange={(e) => updateSetting('api', 'tiktok_enabled', e.target.checked)}
                          className="toggle-input"
                        />
                        <span className="toggle-switch"></span>
                        TikTok Integration
                      </label>
                    </div>
                    <div className="toggle-item">
                      <label className="toggle-label">
                        <input
                          type="checkbox"
                          checked={settings.api.facebook_enabled}
                          onChange={(e) => updateSetting('api', 'facebook_enabled', e.target.checked)}
                          className="toggle-input"
                        />
                        <span className="toggle-switch"></span>
                        Facebook Integration
                      </label>
                    </div>
                  </div>
                </div>

                <div className="setting-group">
                  <h4>Rate Limiting</h4>
                  <div className="setting-item">
                    <label>Rate Limit Buffer (%)</label>
                    <input
                      type="range"
                      min="70"
                      max="95"
                      value={settings.api.rate_limit_buffer}
                      onChange={(e) => updateSetting('api', 'rate_limit_buffer', parseInt(e.target.value))}
                      className="setting-range"
                    />
                    <span className="range-value">{settings.api.rate_limit_buffer}%</span>
                  </div>
                  <div className="setting-item">
                    <label>Retry Attempts</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={settings.api.retry_attempts}
                      onChange={(e) => updateSetting('api', 'retry_attempts', parseInt(e.target.value))}
                      className="setting-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-panel">
              <h3>Notification Settings</h3>
              <div className="settings-section">
                <div className="toggle-group">
                  <div className="toggle-item">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.notifications.email_alerts}
                        onChange={(e) => updateSetting('notifications', 'email_alerts', e.target.checked)}
                        className="toggle-input"
                      />
                      <span className="toggle-switch"></span>
                      Email Alerts
                    </label>
                  </div>
                  <div className="toggle-item">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.notifications.sms_alerts}
                        onChange={(e) => updateSetting('notifications', 'sms_alerts', e.target.checked)}
                        className="toggle-input"
                      />
                      <span className="toggle-switch"></span>
                      SMS Alerts
                    </label>
                  </div>
                  <div className="toggle-item">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.notifications.slack_integration}
                        onChange={(e) => updateSetting('notifications', 'slack_integration', e.target.checked)}
                        className="toggle-input"
                      />
                      <span className="toggle-switch"></span>
                      Slack Integration
                    </label>
                  </div>
                  <div className="toggle-item">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.notifications.critical_only}
                        onChange={(e) => updateSetting('notifications', 'critical_only', e.target.checked)}
                        className="toggle-input"
                      />
                      <span className="toggle-switch"></span>
                      Critical Alerts Only
                    </label>
                  </div>
                  <div className="toggle-item">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.notifications.daily_reports}
                        onChange={(e) => updateSetting('notifications', 'daily_reports', e.target.checked)}
                        className="toggle-input"
                      />
                      <span className="toggle-switch"></span>
                      Daily Reports
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="settings-panel">
              <h3>Security Settings</h3>
              <div className="settings-section">
                <div className="toggle-group">
                  <div className="toggle-item">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.security.two_factor}
                        onChange={(e) => updateSetting('security', 'two_factor', e.target.checked)}
                        className="toggle-input"
                      />
                      <span className="toggle-switch"></span>
                      Two-Factor Authentication
                    </label>
                  </div>
                  <div className="toggle-item">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.security.ip_whitelist}
                        onChange={(e) => updateSetting('security', 'ip_whitelist', e.target.checked)}
                        className="toggle-input"
                      />
                      <span className="toggle-switch"></span>
                      IP Whitelist Protection
                    </label>
                  </div>
                  <div className="toggle-item">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={settings.security.audit_logging}
                        onChange={(e) => updateSetting('security', 'audit_logging', e.target.checked)}
                        className="toggle-input"
                      />
                      <span className="toggle-switch"></span>
                      Audit Logging
                    </label>
                  </div>
                </div>

                <div className="setting-item">
                  <label>Session Timeout (minutes)</label>
                  <input
                    type="number"
                    min="30"
                    max="1440"
                    value={settings.security.session_timeout}
                    onChange={(e) => updateSetting('security', 'session_timeout', parseInt(e.target.value))}
                    className="setting-input"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="settings-panel">
              <h3>Data Management</h3>
              <div className="settings-section">
                <div className="setting-item">
                  <label>Data Retention (days)</label>
                  <input
                    type="number"
                    min="30"
                    max="2555"
                    value={settings.data.retention_days}
                    onChange={(e) => updateSetting('data', 'retention_days', parseInt(e.target.value))}
                    className="setting-input"
                  />
                </div>

                <div className="toggle-item">
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={settings.data.auto_backup}
                      onChange={(e) => updateSetting('data', 'auto_backup', e.target.checked)}
                      className="toggle-input"
                    />
                    <span className="toggle-switch"></span>
                    Automatic Backups
                  </label>
                </div>

                <div className="setting-item">
                  <label>Backup Frequency</label>
                  <select
                    value={settings.data.backup_frequency}
                    onChange={(e) => updateSetting('data', 'backup_frequency', e.target.value)}
                    className="setting-select"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div className="setting-item">
                  <label>Export Format</label>
                  <select
                    value={settings.data.export_format}
                    onChange={(e) => updateSetting('data', 'export_format', e.target.value)}
                    className="setting-select"
                  >
                    <option value="json">JSON</option>
                    <option value="csv">CSV</option>
                    <option value="xlsx">Excel (XLSX)</option>
                    <option value="xml">XML</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;