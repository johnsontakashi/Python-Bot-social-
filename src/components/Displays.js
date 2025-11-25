import React, { useState, useEffect } from 'react';
import './Displays.css';

const Displays = () => {
  const [displays, setDisplays] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingDisplay, setEditingDisplay] = useState(null);
  const [filter, setFilter] = useState('all');
  
  const [newDisplay, setNewDisplay] = useState({
    name: '',
    description: '',
    location: '',
    resolution: '1080p',
    type: 'video-wall',
    status: 'offline',
    assignedDashboard: null,
    refreshRate: 30,
    orientation: 'landscape'
  });

  // Load displays from localStorage on mount
  useEffect(() => {
    const savedDisplays = localStorage.getItem('displays');
    if (savedDisplays) {
      setDisplays(JSON.parse(savedDisplays));
    } else {
      // Initialize with sample data
      const sampleDisplays = [
        {
          id: 1,
          name: 'Main Video Wall',
          description: 'Central command center display - 3x3 arrangement',
          location: 'Control Room A',
          resolution: '4K',
          type: 'video-wall',
          status: 'online',
          assignedDashboard: 'Federal Election Overview',
          refreshRate: 30,
          orientation: 'landscape',
          lastActivity: '2024-11-25T15:30:00Z',
          uptime: '99.2%',
          screenCount: 9
        },
        {
          id: 2,
          name: 'Executive Dashboard',
          description: 'C-level executive monitoring display',
          location: 'Executive Office',
          resolution: '1080p',
          type: 'single-display',
          status: 'online',
          assignedDashboard: 'Executive Summary',
          refreshRate: 60,
          orientation: 'landscape',
          lastActivity: '2024-11-25T15:25:00Z',
          uptime: '98.8%',
          screenCount: 1
        },
        {
          id: 3,
          name: 'Analytics Station',
          description: 'Data analyst workstation display',
          location: 'Analysis Room',
          resolution: '1080p',
          type: 'dual-monitor',
          status: 'maintenance',
          assignedDashboard: null,
          refreshRate: 30,
          orientation: 'landscape',
          lastActivity: '2024-11-25T12:00:00Z',
          uptime: '95.1%',
          screenCount: 2
        },
        {
          id: 4,
          name: 'Public Display',
          description: 'Lobby information display for visitors',
          location: 'Main Lobby',
          resolution: '720p',
          type: 'digital-signage',
          status: 'offline',
          assignedDashboard: 'Public Info',
          refreshRate: 15,
          orientation: 'portrait',
          lastActivity: '2024-11-25T08:15:00Z',
          uptime: '87.3%',
          screenCount: 1
        }
      ];
      setDisplays(sampleDisplays);
      localStorage.setItem('displays', JSON.stringify(sampleDisplays));
    }
  }, []);

  const saveDisplays = (updatedDisplays) => {
    setDisplays(updatedDisplays);
    localStorage.setItem('displays', JSON.stringify(updatedDisplays));
  };

  const resolutions = [
    { value: '720p', label: '720p (1280×720)' },
    { value: '1080p', label: '1080p (1920×1080)' },
    { value: '4K', label: '4K (3840×2160)' },
    { value: '8K', label: '8K (7680×4320)' }
  ];

  const displayTypes = [
    { value: 'single-display', label: 'Single Display' },
    { value: 'dual-monitor', label: 'Dual Monitor' },
    { value: 'video-wall', label: 'Video Wall' },
    { value: 'digital-signage', label: 'Digital Signage' }
  ];

  const filteredDisplays = displays.filter(display => {
    if (filter === 'all') return true;
    return display.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#2ecc71';
      case 'offline': return '#e74c3c';
      case 'maintenance': return '#f39c12';
      default: return '#7d8590';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'single-display':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
        );
      case 'dual-monitor':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="10" height="14" rx="1" ry="1"/>
            <rect x="12" y="3" width="10" height="14" rx="1" ry="1"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
          </svg>
        );
      case 'video-wall':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="6" height="6" rx="1" ry="1"/>
            <rect x="9" y="2" width="6" height="6" rx="1" ry="1"/>
            <rect x="16" y="2" width="6" height="6" rx="1" ry="1"/>
            <rect x="2" y="9" width="6" height="6" rx="1" ry="1"/>
            <rect x="9" y="9" width="6" height="6" rx="1" ry="1"/>
            <rect x="16" y="9" width="6" height="6" rx="1" ry="1"/>
          </svg>
        );
      case 'digital-signage':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
            <line x1="8" y1="6" x2="16" y2="6"/>
            <line x1="8" y1="10" x2="16" y2="10"/>
            <line x1="8" y1="14" x2="12" y2="14"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const formatLastActivity = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.ceil(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const handleCreateDisplay = () => {
    if (!newDisplay.name || !newDisplay.location) {
      alert('Please fill in all required fields');
      return;
    }

    const display = {
      id: Math.max(0, ...displays.map(d => d.id)) + 1,
      ...newDisplay,
      lastActivity: new Date().toISOString(),
      uptime: '100%',
      screenCount: newDisplay.type === 'video-wall' ? 9 : newDisplay.type === 'dual-monitor' ? 2 : 1
    };

    const updatedDisplays = [display, ...displays];
    saveDisplays(updatedDisplays);
    setShowCreateModal(false);
    setNewDisplay({
      name: '',
      description: '',
      location: '',
      resolution: '1080p',
      type: 'video-wall',
      status: 'offline',
      assignedDashboard: null,
      refreshRate: 30,
      orientation: 'landscape'
    });
  };

  const handleEditDisplay = (display) => {
    setEditingDisplay(display);
    setNewDisplay(display);
    setShowCreateModal(true);
  };

  const handleUpdateDisplay = () => {
    if (!newDisplay.name || !newDisplay.location) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedDisplays = displays.map(d => 
      d.id === editingDisplay.id ? { ...d, ...newDisplay } : d
    );
    saveDisplays(updatedDisplays);
    setShowCreateModal(false);
    setEditingDisplay(null);
    setNewDisplay({
      name: '',
      description: '',
      location: '',
      resolution: '1080p',
      type: 'video-wall',
      status: 'offline',
      assignedDashboard: null,
      refreshRate: 30,
      orientation: 'landscape'
    });
  };

  const toggleDisplayStatus = (displayId) => {
    const updatedDisplays = displays.map(display => 
      display.id === displayId 
        ? { 
            ...display, 
            status: display.status === 'online' ? 'offline' : 'online',
            lastActivity: new Date().toISOString()
          }
        : display
    );
    saveDisplays(updatedDisplays);
  };

  const onlineCount = displays.filter(d => d.status === 'online').length;
  const maintenanceCount = displays.filter(d => d.status === 'maintenance').length;

  return (
    <div className="displays-container">
      <div className="displays-header">
        <div className="header-title">
          <h2>Display Management</h2>
          <p>Manage external screens and video wall configurations</p>
        </div>
        <div className="header-actions">
          <button className="create-display-btn" onClick={() => setShowCreateModal(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Display
          </button>
        </div>
      </div>

      <div className="displays-stats">
        <div className="stat-card">
          <div className="stat-value">{displays.length}</div>
          <div className="stat-label">Total Displays</div>
        </div>
        <div className="stat-card active">
          <div className="stat-value">{onlineCount}</div>
          <div className="stat-label">Online</div>
        </div>
        <div className="stat-card warning">
          <div className="stat-value">{maintenanceCount}</div>
          <div className="stat-label">Maintenance</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{displays.reduce((sum, d) => sum + (d.screenCount || 1), 0)}</div>
          <div className="stat-label">Total Screens</div>
        </div>
      </div>

      <div className="displays-controls">
        <div className="filter-controls">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Displays
          </button>
          <button 
            className={`filter-btn ${filter === 'online' ? 'active' : ''}`}
            onClick={() => setFilter('online')}
          >
            Online
          </button>
          <button 
            className={`filter-btn ${filter === 'offline' ? 'active' : ''}`}
            onClick={() => setFilter('offline')}
          >
            Offline
          </button>
          <button 
            className={`filter-btn ${filter === 'maintenance' ? 'active' : ''}`}
            onClick={() => setFilter('maintenance')}
          >
            Maintenance
          </button>
        </div>
      </div>

      <div className="displays-grid">
        {filteredDisplays.map((display) => (
          <div key={display.id} className="display-card">
            <div className="display-header">
              <div className="display-info">
                <div className="display-name">
                  <div className="display-type-icon">
                    {getTypeIcon(display.type)}
                  </div>
                  <div>
                    <h3>{display.name}</h3>
                    <span 
                      className="status-badge"
                      style={{ 
                        backgroundColor: `${getStatusColor(display.status)}20`,
                        color: getStatusColor(display.status),
                        borderColor: `${getStatusColor(display.status)}40`
                      }}
                    >
                      {display.status}
                    </span>
                  </div>
                </div>
                <p className="display-description">{display.description}</p>
              </div>
              <div className="display-actions">
                <button 
                  className="action-btn"
                  onClick={() => handleEditDisplay(display)}
                  title="Edit Display"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/>
                  </svg>
                </button>
                <button 
                  className={`toggle-btn ${display.status === 'online' ? 'active' : ''}`}
                  onClick={() => toggleDisplayStatus(display.id)}
                  title={display.status === 'online' ? 'Turn Offline' : 'Turn Online'}
                >
                  {display.status === 'online' ? 'Online' : 'Offline'}
                </button>
              </div>
            </div>

            <div className="display-details">
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">{display.location}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Resolution:</span>
                  <span className="detail-value">{display.resolution}</span>
                </div>
              </div>
              
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Type:</span>
                  <span className="detail-value">{display.type.replace('-', ' ')}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Screens:</span>
                  <span className="detail-value">{display.screenCount}</span>
                </div>
              </div>

              {display.assignedDashboard && (
                <div className="assigned-dashboard">
                  <span className="dashboard-label">Dashboard:</span>
                  <span className="dashboard-name">{display.assignedDashboard}</span>
                </div>
              )}

              <div className="display-stats">
                <div className="stat-item">
                  <span className="stat-label">Last Activity:</span>
                  <span className="stat-value">{formatLastActivity(display.lastActivity)}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Uptime:</span>
                  <span className="stat-value">{display.uptime}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Refresh Rate:</span>
                  <span className="stat-value">{display.refreshRate}s</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Display Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => {
          setShowCreateModal(false);
          setEditingDisplay(null);
          setNewDisplay({
            name: '',
            description: '',
            location: '',
            resolution: '1080p',
            type: 'video-wall',
            status: 'offline',
            assignedDashboard: null,
            refreshRate: 30,
            orientation: 'landscape'
          });
        }}>
          <div className="create-display-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingDisplay ? 'Edit Display' : 'Create New Display'}</h3>
              <button className="close-btn" onClick={() => {
                setShowCreateModal(false);
                setEditingDisplay(null);
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Display Name *</label>
                  <input
                    type="text"
                    value={newDisplay.name}
                    onChange={(e) => setNewDisplay({...newDisplay, name: e.target.value})}
                    placeholder="e.g., Main Video Wall"
                  />
                </div>
                <div className="form-group">
                  <label>Location *</label>
                  <input
                    type="text"
                    value={newDisplay.location}
                    onChange={(e) => setNewDisplay({...newDisplay, location: e.target.value})}
                    placeholder="e.g., Control Room A"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newDisplay.description}
                  onChange={(e) => setNewDisplay({...newDisplay, description: e.target.value})}
                  placeholder="Describe the display setup and purpose..."
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Display Type</label>
                  <select
                    value={newDisplay.type}
                    onChange={(e) => setNewDisplay({...newDisplay, type: e.target.value})}
                  >
                    {displayTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Resolution</label>
                  <select
                    value={newDisplay.resolution}
                    onChange={(e) => setNewDisplay({...newDisplay, resolution: e.target.value})}
                  >
                    {resolutions.map(res => (
                      <option key={res.value} value={res.value}>{res.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Refresh Rate (seconds)</label>
                  <input
                    type="number"
                    value={newDisplay.refreshRate}
                    onChange={(e) => setNewDisplay({...newDisplay, refreshRate: parseInt(e.target.value)})}
                    min="5"
                    max="300"
                  />
                </div>
                <div className="form-group">
                  <label>Orientation</label>
                  <select
                    value={newDisplay.orientation}
                    onChange={(e) => setNewDisplay({...newDisplay, orientation: e.target.value})}
                  >
                    <option value="landscape">Landscape</option>
                    <option value="portrait">Portrait</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Assigned Dashboard</label>
                <select
                  value={newDisplay.assignedDashboard || ''}
                  onChange={(e) => setNewDisplay({...newDisplay, assignedDashboard: e.target.value || null})}
                >
                  <option value="">No Dashboard Assigned</option>
                  <option value="Federal Election Overview">Federal Election Overview</option>
                  <option value="Executive Summary">Executive Summary</option>
                  <option value="Public Info">Public Info</option>
                  <option value="Analytics Dashboard">Analytics Dashboard</option>
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn secondary" onClick={() => {
                setShowCreateModal(false);
                setEditingDisplay(null);
              }}>
                Cancel
              </button>
              <button 
                className="btn primary" 
                onClick={editingDisplay ? handleUpdateDisplay : handleCreateDisplay}
              >
                {editingDisplay ? 'Update Display' : 'Create Display'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Displays;