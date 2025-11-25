import React, { useState } from 'react';
import './Datasets.css';

const Datasets = ({ onSelectDataset }) => {
  const [datasets, setDatasets] = useState([
    {
      id: 1,
      name: 'Brazil Elections 2024',
      description: 'Comprehensive social media monitoring for Brazilian presidential elections',
      status: 'active',
      platforms: ['Twitter', 'Instagram', 'Facebook', 'TikTok'],
      dateRange: { start: '2024-01-01', end: '2024-12-31' },
      recordCount: 2847692,
      lastUpdate: '2024-11-25T10:30:00Z',
      size: '1.2 GB',
      type: 'Political Campaign',
      keywords: ['#Eleições2024', 'Bolsonaro', 'Lula', 'política brasil']
    },
    {
      id: 2,
      name: 'São Paulo Mayoral Race',
      description: 'Social media sentiment analysis for São Paulo municipal elections',
      status: 'active',
      platforms: ['Twitter', 'Instagram', 'Facebook'],
      dateRange: { start: '2024-08-01', end: '2024-10-30' },
      recordCount: 892456,
      lastUpdate: '2024-11-25T09:15:00Z',
      size: '456 MB',
      type: 'Municipal Elections',
      keywords: ['#PrefeituraSP', 'Ricardo Nunes', 'Guilherme Boulos']
    },
    {
      id: 3,
      name: 'Rio de Janeiro Governor',
      description: 'Monitoring gubernatorial candidates across social platforms',
      status: 'completed',
      platforms: ['Twitter', 'Instagram'],
      dateRange: { start: '2024-06-01', end: '2024-10-31' },
      recordCount: 1234567,
      lastUpdate: '2024-10-31T23:59:00Z',
      size: '789 MB',
      type: 'State Elections',
      keywords: ['#GovernoRJ', 'Claudio Castro', 'política rio']
    },
    {
      id: 4,
      name: 'Federal Congress Monitor',
      description: 'Ongoing monitoring of federal deputies and senators',
      status: 'active',
      platforms: ['Twitter', 'Instagram', 'Facebook', 'TikTok'],
      dateRange: { start: '2024-01-01', end: '2024-12-31' },
      recordCount: 5678901,
      lastUpdate: '2024-11-25T11:45:00Z',
      size: '2.8 GB',
      type: 'Legislative Monitoring',
      keywords: ['congresso', 'senado', 'câmara', 'deputado', 'senador']
    },
    {
      id: 5,
      name: 'Supreme Court Decisions',
      description: 'Public reaction monitoring to STF decisions and ministers',
      status: 'paused',
      platforms: ['Twitter', 'Facebook'],
      dateRange: { start: '2024-09-01', end: '2024-11-30' },
      recordCount: 456789,
      lastUpdate: '2024-11-20T16:20:00Z',
      size: '234 MB',
      type: 'Judicial Monitoring',
      keywords: ['STF', 'Supremo', 'ministro', 'decisão judicial']
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showNewDatasetModal, setShowNewDatasetModal] = useState(false);
  const [newDataset, setNewDataset] = useState({
    name: '',
    description: '',
    type: 'Political Campaign',
    platforms: [],
    keywords: [],
    dateRange: {
      start: new Date().toISOString().split('T')[0],
      end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    keywordInput: ''
  });

  const filteredDatasets = datasets.filter(dataset => {
    if (filter === 'all') return true;
    return dataset.status === filter;
  });

  const activeDatasets = datasets.filter(d => d.status === 'active').length;
  const totalRecords = datasets.reduce((sum, d) => sum + d.recordCount, 0);
  const totalSize = datasets.reduce((sum, d) => {
    const size = parseFloat(d.size);
    const unit = d.size.includes('GB') ? 1000 : 1;
    return sum + (size * unit);
  }, 0);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatLastUpdate = (dateString) => {
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
      case 'completed': return '#3498db';
      case 'paused': return '#f39c12';
      default: return '#7d8590';
    }
  };

  const handleCreateDataset = () => {
    setShowNewDatasetModal(true);
  };

  const handleCloseNewDatasetModal = () => {
    setShowNewDatasetModal(false);
    setNewDataset({
      name: '',
      description: '',
      type: 'Political Campaign',
      platforms: [],
      keywords: [],
      dateRange: {
        start: new Date().toISOString().split('T')[0],
        end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      keywordInput: ''
    });
  };

  const handleSaveNewDataset = () => {
    if (!newDataset.name || !newDataset.description) {
      alert('Please fill in all required fields');
      return;
    }

    const dataset = {
      id: Math.max(...datasets.map(d => d.id)) + 1,
      name: newDataset.name,
      description: newDataset.description,
      status: 'active',
      platforms: newDataset.platforms,
      dateRange: newDataset.dateRange,
      recordCount: 0,
      lastUpdate: new Date().toISOString(),
      size: '0 MB',
      type: newDataset.type,
      keywords: newDataset.keywords
    };

    setDatasets(prevDatasets => [dataset, ...prevDatasets]);
    setShowNewDatasetModal(false);
    setNewDataset({
      name: '',
      description: '',
      type: 'Political Campaign',
      platforms: [],
      keywords: [],
      dateRange: {
        start: new Date().toISOString().split('T')[0],
        end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      keywordInput: ''
    });
  };

  const handlePlatformToggle = (platform) => {
    setNewDataset(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const handleAddKeyword = () => {
    if (newDataset.keywordInput.trim() && !newDataset.keywords.includes(newDataset.keywordInput.trim())) {
      setNewDataset(prev => ({
        ...prev,
        keywords: [...prev.keywords, prev.keywordInput.trim()],
        keywordInput: ''
      }));
    }
  };

  const handleRemoveKeyword = (keyword) => {
    setNewDataset(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const handleKeywordInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'Twitter':
        return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>;
      case 'Instagram':
        return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
      case 'Facebook':
        return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
      case 'TikTok':
        return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>;
      default:
        return null;
    }
  };

  return (
    <div className="datasets-container">
      <div className="datasets-header">
        <div className="header-title">
          <h2>Datasets</h2>
          <p>Manage and explore your social media data collections</p>
        </div>
        <div className="header-actions">
          <button className="create-dataset-btn" onClick={handleCreateDataset}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10,9 9,9 8,9"></polyline>
            </svg>
            New Dataset
          </button>
        </div>
      </div>

      <div className="datasets-stats">
        <div className="stat-card">
          <div className="stat-value">{datasets.length}</div>
          <div className="stat-label">Total Datasets</div>
        </div>
        <div className="stat-card active">
          <div className="stat-value">{activeDatasets}</div>
          <div className="stat-label">Active Collections</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{formatNumber(totalRecords)}</div>
          <div className="stat-label">Total Records</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{(totalSize / 1000).toFixed(1)} GB</div>
          <div className="stat-label">Total Size</div>
        </div>
      </div>

      <div className="datasets-controls">
        <div className="filter-controls">
          <div className="filter-group">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Datasets
            </button>
            <button 
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button 
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
            <button 
              className={`filter-btn ${filter === 'paused' ? 'active' : ''}`}
              onClick={() => setFilter('paused')}
            >
              Paused
            </button>
          </div>
        </div>

        <div className="view-controls">
          <button 
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </button>
          <button 
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <div className={`datasets-content ${viewMode}`}>
        {filteredDatasets.map((dataset) => (
          <div key={dataset.id} className="dataset-card">
            <div className="dataset-header">
              <div className="dataset-title">
                <h3>{dataset.name}</h3>
                <span 
                  className="status-badge"
                  style={{ 
                    backgroundColor: `${getStatusColor(dataset.status)}20`,
                    color: getStatusColor(dataset.status),
                    borderColor: `${getStatusColor(dataset.status)}40`
                  }}
                >
                  {dataset.status}
                </span>
              </div>
              <div className="dataset-actions">
                <button 
                  className="action-btn"
                  onClick={() => onSelectDataset(dataset)}
                  title="Explore Dataset"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
                <button className="action-btn" title="Download Dataset">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7,10 12,15 17,10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
                <button className="action-btn" title="Dataset Settings">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="dataset-description">
              <p>{dataset.description}</p>
            </div>

            <div className="dataset-platforms">
              {dataset.platforms.map((platform, index) => (
                <span key={index} className="platform-tag">
                  {getPlatformIcon(platform)}
                  {platform}
                </span>
              ))}
            </div>

            <div className="dataset-stats-row">
              <div className="stat-item">
                <span className="stat-label">Records</span>
                <span className="stat-value">{formatNumber(dataset.recordCount)}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Size</span>
                <span className="stat-value">{dataset.size}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Updated</span>
                <span className="stat-value">{formatLastUpdate(dataset.lastUpdate)}</span>
              </div>
            </div>

            <div className="dataset-footer">
              <div className="dataset-type">{dataset.type}</div>
              <div className="dataset-keywords">
                {dataset.keywords.slice(0, 3).map((keyword, index) => (
                  <span key={index} className="keyword-tag">{keyword}</span>
                ))}
                {dataset.keywords.length > 3 && (
                  <span className="keyword-more">+{dataset.keywords.length - 3} more</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Dataset Modal */}
      {showNewDatasetModal && (
        <div className="modal-overlay" onClick={handleCloseNewDatasetModal}>
          <div className="new-dataset-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Dataset</h3>
              <button className="close-btn" onClick={handleCloseNewDatasetModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Dataset Name *</label>
                  <input
                    type="text"
                    value={newDataset.name}
                    onChange={(e) => setNewDataset({...newDataset, name: e.target.value})}
                    className="form-input"
                    placeholder="e.g., Municipal Elections 2024"
                  />
                </div>
                <div className="form-group">
                  <label>Dataset Type</label>
                  <select
                    value={newDataset.type}
                    onChange={(e) => setNewDataset({...newDataset, type: e.target.value})}
                    className="form-select"
                  >
                    <option value="Political Campaign">Political Campaign</option>
                    <option value="Municipal Elections">Municipal Elections</option>
                    <option value="State Elections">State Elections</option>
                    <option value="Legislative Monitoring">Legislative Monitoring</option>
                    <option value="Judicial Monitoring">Judicial Monitoring</option>
                    <option value="Public Opinion">Public Opinion</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label>Description *</label>
                <textarea
                  value={newDataset.description}
                  onChange={(e) => setNewDataset({...newDataset, description: e.target.value})}
                  className="form-textarea"
                  placeholder="Describe the purpose and scope of this dataset..."
                  rows="3"
                />
              </div>

              <div className="form-group full-width">
                <label>Social Media Platforms</label>
                <div className="platform-selector">
                  {['Twitter', 'Instagram', 'Facebook', 'TikTok'].map((platform) => (
                    <label key={platform} className="platform-checkbox">
                      <input
                        type="checkbox"
                        checked={newDataset.platforms.includes(platform)}
                        onChange={() => handlePlatformToggle(platform)}
                      />
                      <div className="platform-card-mini">
                        {getPlatformIcon(platform)}
                        <span>{platform}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={newDataset.dateRange.start}
                    onChange={(e) => setNewDataset({...newDataset, dateRange: {...newDataset.dateRange, start: e.target.value}})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={newDataset.dateRange.end}
                    onChange={(e) => setNewDataset({...newDataset, dateRange: {...newDataset.dateRange, end: e.target.value}})}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Keywords & Hashtags</label>
                <div className="keyword-input-group">
                  <input
                    type="text"
                    value={newDataset.keywordInput}
                    onChange={(e) => setNewDataset({...newDataset, keywordInput: e.target.value})}
                    onKeyPress={handleKeywordInputKeyPress}
                    className="form-input"
                    placeholder="Add keywords, hashtags, or phrases..."
                  />
                  <button type="button" onClick={handleAddKeyword} className="add-keyword-btn">
                    Add
                  </button>
                </div>
                <div className="keywords-list">
                  {newDataset.keywords.map((keyword, index) => (
                    <span key={index} className="keyword-chip">
                      {keyword}
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyword(keyword)}
                        className="remove-keyword-btn"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn secondary" onClick={handleCloseNewDatasetModal}>
                Cancel
              </button>
              <button className="btn primary" onClick={handleSaveNewDataset}>
                Create Dataset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Datasets;