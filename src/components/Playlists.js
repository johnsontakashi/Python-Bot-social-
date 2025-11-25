import React, { useState, useEffect } from 'react';
import './Playlists.css';

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  const [previewPlaylist, setPreviewPlaylist] = useState(null);
  
  const [newPlaylist, setNewPlaylist] = useState({
    name: '',
    description: '',
    dashboards: [],
    defaultDuration: 30,
    loop: true,
    status: 'draft'
  });

  // Available dashboards (mock data)
  const availableDashboards = [
    { id: 1, name: 'Federal Election Overview', thumbnail: null, widgets: 12 },
    { id: 2, name: 'Executive Summary', thumbnail: null, widgets: 8 },
    { id: 3, name: 'Social Media Trends', thumbnail: null, widgets: 15 },
    { id: 4, name: 'Sentiment Analysis', thumbnail: null, widgets: 10 },
    { id: 5, name: 'Geographic Analysis', thumbnail: null, widgets: 9 },
    { id: 6, name: 'Real-time Monitor', thumbnail: null, widgets: 14 },
    { id: 7, name: 'Campaign Performance', thumbnail: null, widgets: 11 },
    { id: 8, name: 'Public Opinion', thumbnail: null, widgets: 7 }
  ];

  // Load playlists from localStorage on mount
  useEffect(() => {
    const savedPlaylists = localStorage.getItem('playlists');
    if (savedPlaylists) {
      setPlaylists(JSON.parse(savedPlaylists));
    } else {
      // Initialize with sample data
      const samplePlaylists = [
        {
          id: 1,
          name: 'Main Control Room',
          description: 'Primary dashboard rotation for control room displays',
          dashboards: [
            { ...availableDashboards[0], duration: 45, order: 0 },
            { ...availableDashboards[2], duration: 30, order: 1 },
            { ...availableDashboards[3], duration: 60, order: 2 },
            { ...availableDashboards[5], duration: 30, order: 3 }
          ],
          defaultDuration: 30,
          loop: true,
          status: 'active',
          totalDuration: 165,
          createdAt: '2024-11-20T10:00:00Z',
          lastPlayed: '2024-11-25T14:30:00Z'
        },
        {
          id: 2,
          name: 'Executive Briefing',
          description: 'High-level overview for executive presentations',
          dashboards: [
            { ...availableDashboards[1], duration: 120, order: 0 },
            { ...availableDashboards[6], duration: 90, order: 1 },
            { ...availableDashboards[7], duration: 60, order: 2 }
          ],
          defaultDuration: 60,
          loop: false,
          status: 'draft',
          totalDuration: 270,
          createdAt: '2024-11-22T14:15:00Z',
          lastPlayed: null
        },
        {
          id: 3,
          name: 'Public Display',
          description: 'Simplified view for public-facing screens',
          dashboards: [
            { ...availableDashboards[4], duration: 45, order: 0 },
            { ...availableDashboards[7], duration: 45, order: 1 }
          ],
          defaultDuration: 45,
          loop: true,
          status: 'paused',
          totalDuration: 90,
          createdAt: '2024-11-18T09:30:00Z',
          lastPlayed: '2024-11-24T16:45:00Z'
        }
      ];
      setPlaylists(samplePlaylists);
      localStorage.setItem('playlists', JSON.stringify(samplePlaylists));
    }
  }, []);

  const savePlaylists = (updatedPlaylists) => {
    setPlaylists(updatedPlaylists);
    localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
  };

  const calculateTotalDuration = (dashboards) => {
    return dashboards.reduce((total, dashboard) => total + dashboard.duration, 0);
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const formatLastPlayed = (dateString) => {
    if (!dateString) return 'Never played';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.ceil(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#2ecc71';
      case 'paused': return '#f39c12';
      case 'draft': return '#3498db';
      default: return '#7d8590';
    }
  };

  const handleCreatePlaylist = () => {
    if (!newPlaylist.name) {
      alert('Please enter a playlist name');
      return;
    }

    const playlist = {
      id: Math.max(0, ...playlists.map(p => p.id)) + 1,
      ...newPlaylist,
      totalDuration: calculateTotalDuration(newPlaylist.dashboards),
      createdAt: new Date().toISOString(),
      lastPlayed: null
    };

    const updatedPlaylists = [playlist, ...playlists];
    savePlaylists(updatedPlaylists);
    setShowCreateModal(false);
    resetNewPlaylist();
  };

  const handleEditPlaylist = (playlist) => {
    setEditingPlaylist(playlist);
    setNewPlaylist(playlist);
    setShowCreateModal(true);
  };

  const handleUpdatePlaylist = () => {
    if (!newPlaylist.name) {
      alert('Please enter a playlist name');
      return;
    }

    const updatedPlaylists = playlists.map(p => 
      p.id === editingPlaylist.id 
        ? { ...p, ...newPlaylist, totalDuration: calculateTotalDuration(newPlaylist.dashboards) }
        : p
    );
    savePlaylists(updatedPlaylists);
    setShowCreateModal(false);
    setEditingPlaylist(null);
    resetNewPlaylist();
  };

  const resetNewPlaylist = () => {
    setNewPlaylist({
      name: '',
      description: '',
      dashboards: [],
      defaultDuration: 30,
      loop: true,
      status: 'draft'
    });
  };

  const addDashboardToPlaylist = (dashboard) => {
    const newDashboard = {
      ...dashboard,
      duration: newPlaylist.defaultDuration,
      order: newPlaylist.dashboards.length
    };
    setNewPlaylist(prev => ({
      ...prev,
      dashboards: [...prev.dashboards, newDashboard]
    }));
  };

  const removeDashboardFromPlaylist = (index) => {
    setNewPlaylist(prev => ({
      ...prev,
      dashboards: prev.dashboards.filter((_, i) => i !== index)
        .map((dashboard, i) => ({ ...dashboard, order: i }))
    }));
  };

  const updateDashboardDuration = (index, duration) => {
    setNewPlaylist(prev => ({
      ...prev,
      dashboards: prev.dashboards.map((dashboard, i) => 
        i === index ? { ...dashboard, duration: parseInt(duration) } : dashboard
      )
    }));
  };

  const moveDashboard = (fromIndex, toIndex) => {
    const dashboards = [...newPlaylist.dashboards];
    const [moved] = dashboards.splice(fromIndex, 1);
    dashboards.splice(toIndex, 0, moved);
    
    setNewPlaylist(prev => ({
      ...prev,
      dashboards: dashboards.map((dashboard, i) => ({ ...dashboard, order: i }))
    }));
  };

  const togglePlaylistStatus = (playlistId) => {
    const updatedPlaylists = playlists.map(playlist => 
      playlist.id === playlistId 
        ? { 
            ...playlist, 
            status: playlist.status === 'active' ? 'paused' : 'active',
            lastPlayed: playlist.status === 'paused' ? new Date().toISOString() : playlist.lastPlayed
          }
        : playlist
    );
    savePlaylists(updatedPlaylists);
  };

  const startPreview = (playlist) => {
    if (playlist.dashboards.length === 0) {
      alert('Cannot preview empty playlist');
      return;
    }
    setPreviewPlaylist(playlist);
    setCurrentPreviewIndex(0);
    setPreviewMode(true);
  };

  const nextDashboard = () => {
    if (previewPlaylist) {
      const nextIndex = (currentPreviewIndex + 1) % previewPlaylist.dashboards.length;
      setCurrentPreviewIndex(nextIndex);
    }
  };

  const prevDashboard = () => {
    if (previewPlaylist) {
      const prevIndex = currentPreviewIndex === 0 
        ? previewPlaylist.dashboards.length - 1 
        : currentPreviewIndex - 1;
      setCurrentPreviewIndex(prevIndex);
    }
  };

  const activeCount = playlists.filter(p => p.status === 'active').length;
  const draftCount = playlists.filter(p => p.status === 'draft').length;

  return (
    <div className="playlists-container">
      <div className="playlists-header">
        <div className="header-title">
          <h2>Dashboard Playlists</h2>
          <p>Create and manage dashboard rotation sequences</p>
        </div>
        <div className="header-actions">
          <button className="create-playlist-btn" onClick={() => setShowCreateModal(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Create Playlist
          </button>
        </div>
      </div>

      <div className="playlists-stats">
        <div className="stat-card">
          <div className="stat-value">{playlists.length}</div>
          <div className="stat-label">Total Playlists</div>
        </div>
        <div className="stat-card active">
          <div className="stat-value">{activeCount}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{draftCount}</div>
          <div className="stat-label">Drafts</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{playlists.reduce((sum, p) => sum + p.dashboards.length, 0)}</div>
          <div className="stat-label">Total Dashboards</div>
        </div>
      </div>

      <div className="playlists-grid">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="playlist-card">
            <div className="playlist-header">
              <div className="playlist-info">
                <div className="playlist-name">
                  <h3>{playlist.name}</h3>
                  <span 
                    className="status-badge"
                    style={{ 
                      backgroundColor: `${getStatusColor(playlist.status)}20`,
                      color: getStatusColor(playlist.status),
                      borderColor: `${getStatusColor(playlist.status)}40`
                    }}
                  >
                    {playlist.status}
                  </span>
                </div>
                <p className="playlist-description">{playlist.description}</p>
              </div>
              <div className="playlist-actions">
                <button 
                  className="action-btn"
                  onClick={() => startPreview(playlist)}
                  title="Preview Playlist"
                  disabled={playlist.dashboards.length === 0}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </button>
                <button 
                  className="action-btn"
                  onClick={() => handleEditPlaylist(playlist)}
                  title="Edit Playlist"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/>
                  </svg>
                </button>
                <button 
                  className={`toggle-btn ${playlist.status === 'active' ? 'active' : ''}`}
                  onClick={() => togglePlaylistStatus(playlist.id)}
                  title={playlist.status === 'active' ? 'Pause Playlist' : 'Activate Playlist'}
                >
                  {playlist.status === 'active' ? 'Pause' : 'Activate'}
                </button>
              </div>
            </div>

            <div className="playlist-details">
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Dashboards:</span>
                  <span className="detail-value">{playlist.dashboards.length}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">{formatDuration(playlist.totalDuration)}</span>
                </div>
              </div>
              
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Loop:</span>
                  <span className="detail-value">{playlist.loop ? 'Enabled' : 'Disabled'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Last Played:</span>
                  <span className="detail-value">{formatLastPlayed(playlist.lastPlayed)}</span>
                </div>
              </div>

              {playlist.dashboards.length > 0 && (
                <div className="playlist-preview">
                  <div className="preview-header">
                    <span className="preview-label">Dashboards:</span>
                  </div>
                  <div className="dashboard-list">
                    {playlist.dashboards.slice(0, 3).map((dashboard, index) => (
                      <div key={index} className="dashboard-preview-item">
                        <span className="dashboard-name">{dashboard.name}</span>
                        <span className="dashboard-duration">{formatDuration(dashboard.duration)}</span>
                      </div>
                    ))}
                    {playlist.dashboards.length > 3 && (
                      <div className="more-dashboards">
                        +{playlist.dashboards.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Playlist Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => {
          setShowCreateModal(false);
          setEditingPlaylist(null);
          resetNewPlaylist();
        }}>
          <div className="create-playlist-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingPlaylist ? 'Edit Playlist' : 'Create New Playlist'}</h3>
              <button className="close-btn" onClick={() => {
                setShowCreateModal(false);
                setEditingPlaylist(null);
                resetNewPlaylist();
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-section">
                <h4>Playlist Information</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Playlist Name *</label>
                    <input
                      type="text"
                      value={newPlaylist.name}
                      onChange={(e) => setNewPlaylist({...newPlaylist, name: e.target.value})}
                      placeholder="e.g., Main Control Room"
                    />
                  </div>
                  <div className="form-group">
                    <label>Default Duration (seconds)</label>
                    <input
                      type="number"
                      value={newPlaylist.defaultDuration}
                      onChange={(e) => setNewPlaylist({...newPlaylist, defaultDuration: parseInt(e.target.value)})}
                      min="5"
                      max="300"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={newPlaylist.description}
                    onChange={(e) => setNewPlaylist({...newPlaylist, description: e.target.value})}
                    placeholder="Describe the purpose of this playlist..."
                  />
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={newPlaylist.loop}
                      onChange={(e) => setNewPlaylist({...newPlaylist, loop: e.target.checked})}
                    />
                    <span>Loop playlist continuously</span>
                  </label>
                </div>
              </div>

              <div className="form-section">
                <h4>Add Dashboards</h4>
                <div className="available-dashboards">
                  {availableDashboards.filter(db => 
                    !newPlaylist.dashboards.find(pd => pd.id === db.id)
                  ).map((dashboard) => (
                    <div key={dashboard.id} className="available-dashboard-item">
                      <div className="dashboard-info">
                        <span className="dashboard-name">{dashboard.name}</span>
                        <span className="dashboard-widgets">{dashboard.widgets} widgets</span>
                      </div>
                      <button 
                        className="add-dashboard-btn"
                        onClick={() => addDashboardToPlaylist(dashboard)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="5" x2="12" y2="19"/>
                          <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {newPlaylist.dashboards.length > 0 && (
                <div className="form-section">
                  <h4>Playlist Order ({formatDuration(calculateTotalDuration(newPlaylist.dashboards))} total)</h4>
                  <div className="playlist-dashboards">
                    {newPlaylist.dashboards.map((dashboard, index) => (
                      <div key={`${dashboard.id}-${index}`} className="playlist-dashboard-item">
                        <div className="dashboard-order">
                          <span className="order-number">{index + 1}</span>
                          <div className="order-controls">
                            <button 
                              className="order-btn"
                              onClick={() => moveDashboard(index, Math.max(0, index - 1))}
                              disabled={index === 0}
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="18,15 12,9 6,15"/>
                              </svg>
                            </button>
                            <button 
                              className="order-btn"
                              onClick={() => moveDashboard(index, Math.min(newPlaylist.dashboards.length - 1, index + 1))}
                              disabled={index === newPlaylist.dashboards.length - 1}
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="6,9 12,15 18,9"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        <div className="dashboard-info">
                          <span className="dashboard-name">{dashboard.name}</span>
                          <div className="duration-control">
                            <input
                              type="number"
                              value={dashboard.duration}
                              onChange={(e) => updateDashboardDuration(index, e.target.value)}
                              min="5"
                              max="300"
                            />
                            <span>seconds</span>
                          </div>
                        </div>
                        
                        <button 
                          className="remove-dashboard-btn"
                          onClick={() => removeDashboardFromPlaylist(index)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="modal-actions">
              <button className="btn secondary" onClick={() => {
                setShowCreateModal(false);
                setEditingPlaylist(null);
                resetNewPlaylist();
              }}>
                Cancel
              </button>
              <button 
                className="btn primary" 
                onClick={editingPlaylist ? handleUpdatePlaylist : handleCreatePlaylist}
              >
                {editingPlaylist ? 'Update Playlist' : 'Create Playlist'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewMode && previewPlaylist && (
        <div className="preview-overlay">
          <div className="preview-modal">
            <div className="preview-header">
              <div className="preview-title">
                <h3>Preview: {previewPlaylist.name}</h3>
                <span className="preview-position">
                  {currentPreviewIndex + 1} of {previewPlaylist.dashboards.length}
                </span>
              </div>
              <button className="close-preview-btn" onClick={() => setPreviewMode(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            
            <div className="preview-content">
              <div className="dashboard-preview">
                <div className="preview-dashboard">
                  <h4>{previewPlaylist.dashboards[currentPreviewIndex]?.name}</h4>
                  <p>Duration: {formatDuration(previewPlaylist.dashboards[currentPreviewIndex]?.duration)}</p>
                  <div className="dashboard-mockup">
                    <div className="mockup-grid">
                      {Array.from({ length: previewPlaylist.dashboards[currentPreviewIndex]?.widgets || 8 }, (_, i) => (
                        <div key={i} className="mockup-widget"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="preview-controls">
                <button 
                  className="preview-control-btn"
                  onClick={prevDashboard}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15,18 9,12 15,6"/>
                  </svg>
                  Previous
                </button>
                
                <div className="preview-timeline">
                  {previewPlaylist.dashboards.map((dashboard, index) => (
                    <div 
                      key={index} 
                      className={`timeline-item ${index === currentPreviewIndex ? 'active' : ''}`}
                      onClick={() => setCurrentPreviewIndex(index)}
                    >
                      <div className="timeline-dot"></div>
                      <span className="timeline-name">{dashboard.name}</span>
                    </div>
                  ))}
                </div>
                
                <button 
                  className="preview-control-btn"
                  onClick={nextDashboard}
                >
                  Next
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9,18 15,12 9,6"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Playlists;