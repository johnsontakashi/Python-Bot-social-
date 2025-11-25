import React, { useState, useEffect } from 'react';
import './Streams.css';

const Streams = () => {
  const [streams, setStreams] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingStream, setEditingStream] = useState(null);
  const [filter, setFilter] = useState('all');
  
  const [newStream, setNewStream] = useState({
    name: '',
    description: '',
    type: 'keyword',
    platform: 'all',
    keywords: [],
    accounts: [],
    hashtags: [],
    location: '',
    language: 'pt',
    status: 'active',
    keywordInput: '',
    accountInput: '',
    hashtagInput: ''
  });

  const streamTypes = [
    { value: 'keyword', label: 'Keyword Stream' },
    { value: 'account', label: 'Account Stream' },
    { value: 'hashtag', label: 'Hashtag Stream' },
    { value: 'location', label: 'Location Stream' }
  ];

  const platforms = [
    { value: 'all', label: 'All Platforms' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'tiktok', label: 'TikTok' }
  ];

  const languages = [
    { value: 'all', label: 'All Languages' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' }
  ];

  // Load streams from localStorage on mount
  useEffect(() => {
    const savedStreams = localStorage.getItem('streams');
    if (savedStreams) {
      setStreams(JSON.parse(savedStreams));
    } else {
      // Initialize with sample data
      const sampleStreams = [
        {
          id: 1,
          name: 'Federal Election Keywords',
          description: 'Monitor key terms related to federal election campaign',
          type: 'keyword',
          platform: 'all',
          keywords: ['eleições2024', 'Lula', 'Bolsonaro', 'política', 'voto'],
          accounts: [],
          hashtags: [],
          location: 'Brazil',
          language: 'pt',
          status: 'active',
          postsCollected: 45672,
          lastActivity: '2024-11-25T15:30:00Z',
          createdAt: '2024-11-20T10:00:00Z'
        },
        {
          id: 2,
          name: 'Political Candidates',
          description: 'Track official accounts of major political candidates',
          type: 'account',
          platform: 'twitter',
          keywords: [],
          accounts: ['@LulaOficial', '@jairbolsonaro', '@cirogomes', '@simonetebete'],
          hashtags: [],
          location: '',
          language: 'pt',
          status: 'active',
          postsCollected: 12849,
          lastActivity: '2024-11-25T15:25:00Z',
          createdAt: '2024-11-18T14:30:00Z'
        },
        {
          id: 3,
          name: 'São Paulo Election Hashtags',
          description: 'Monitor hashtags for São Paulo mayoral election',
          type: 'hashtag',
          platform: 'instagram',
          keywords: [],
          accounts: [],
          hashtags: ['#PrefeituraSP', '#SãoPaulo2024', '#EleiçõesSP'],
          location: 'São Paulo',
          language: 'pt',
          status: 'paused',
          postsCollected: 8934,
          lastActivity: '2024-11-24T12:15:00Z',
          createdAt: '2024-11-15T09:20:00Z'
        },
        {
          id: 4,
          name: 'Rio de Janeiro Location',
          description: 'Geographic tracking for Rio de Janeiro political content',
          type: 'location',
          platform: 'all',
          keywords: [],
          accounts: [],
          hashtags: [],
          location: 'Rio de Janeiro',
          language: 'pt',
          status: 'active',
          postsCollected: 23567,
          lastActivity: '2024-11-25T14:45:00Z',
          createdAt: '2024-11-10T16:45:00Z'
        }
      ];
      setStreams(sampleStreams);
      localStorage.setItem('streams', JSON.stringify(sampleStreams));
    }
  }, []);

  const saveStreams = (updatedStreams) => {
    setStreams(updatedStreams);
    localStorage.setItem('streams', JSON.stringify(updatedStreams));
  };

  const filteredStreams = streams.filter(stream => {
    if (filter === 'all') return true;
    if (filter === 'platform') return true; // Could filter by platform
    return stream.status === filter || stream.platform === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#2ecc71';
      case 'paused': return '#f39c12';
      case 'error': return '#e74c3c';
      default: return '#7d8590';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'keyword':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/>
          </svg>
        );
      case 'account':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        );
      case 'hashtag':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="9" x2="20" y2="9"/>
            <line x1="4" y1="15" x2="20" y2="15"/>
            <line x1="10" y1="3" x2="8" y2="21"/>
            <line x1="16" y1="3" x2="14" y2="21"/>
          </svg>
        );
      case 'location':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'twitter':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
        );
      case 'facebook':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        );
      case 'tiktok':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
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

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const handleCreateStream = () => {
    if (!newStream.name) {
      alert('Please enter a stream name');
      return;
    }

    const stream = {
      id: Math.max(0, ...streams.map(s => s.id)) + 1,
      ...newStream,
      postsCollected: 0,
      lastActivity: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    const updatedStreams = [stream, ...streams];
    saveStreams(updatedStreams);
    setShowCreateModal(false);
    resetNewStream();
  };

  const handleEditStream = (stream) => {
    setEditingStream(stream);
    setNewStream(stream);
    setShowCreateModal(true);
  };

  const handleUpdateStream = () => {
    if (!newStream.name) {
      alert('Please enter a stream name');
      return;
    }

    const updatedStreams = streams.map(s => 
      s.id === editingStream.id ? { ...s, ...newStream } : s
    );
    saveStreams(updatedStreams);
    setShowCreateModal(false);
    setEditingStream(null);
    resetNewStream();
  };

  const resetNewStream = () => {
    setNewStream({
      name: '',
      description: '',
      type: 'keyword',
      platform: 'all',
      keywords: [],
      accounts: [],
      hashtags: [],
      location: '',
      language: 'pt',
      status: 'active',
      keywordInput: '',
      accountInput: '',
      hashtagInput: ''
    });
  };

  const toggleStreamStatus = (streamId) => {
    const updatedStreams = streams.map(stream => 
      stream.id === streamId 
        ? { 
            ...stream, 
            status: stream.status === 'active' ? 'paused' : 'active',
            lastActivity: new Date().toISOString()
          }
        : stream
    );
    saveStreams(updatedStreams);
  };

  const addKeyword = () => {
    if (newStream.keywordInput.trim() && !newStream.keywords.includes(newStream.keywordInput.trim())) {
      setNewStream(prev => ({
        ...prev,
        keywords: [...prev.keywords, prev.keywordInput.trim()],
        keywordInput: ''
      }));
    }
  };

  const removeKeyword = (keyword) => {
    setNewStream(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const addAccount = () => {
    if (newStream.accountInput.trim() && !newStream.accounts.includes(newStream.accountInput.trim())) {
      setNewStream(prev => ({
        ...prev,
        accounts: [...prev.accounts, prev.accountInput.trim()],
        accountInput: ''
      }));
    }
  };

  const removeAccount = (account) => {
    setNewStream(prev => ({
      ...prev,
      accounts: prev.accounts.filter(a => a !== account)
    }));
  };

  const addHashtag = () => {
    if (newStream.hashtagInput.trim() && !newStream.hashtags.includes(newStream.hashtagInput.trim())) {
      const hashtag = newStream.hashtagInput.trim().startsWith('#') 
        ? newStream.hashtagInput.trim() 
        : '#' + newStream.hashtagInput.trim();
      setNewStream(prev => ({
        ...prev,
        hashtags: [...prev.hashtags, hashtag],
        hashtagInput: ''
      }));
    }
  };

  const removeHashtag = (hashtag) => {
    setNewStream(prev => ({
      ...prev,
      hashtags: prev.hashtags.filter(h => h !== hashtag)
    }));
  };

  const activeCount = streams.filter(s => s.status === 'active').length;
  const totalPosts = streams.reduce((sum, s) => sum + s.postsCollected, 0);

  return (
    <div className="streams-container">
      <div className="streams-header">
        <div className="header-title">
          <h2>Data Streams & Filters</h2>
          <p>Configure data collection streams and filtering rules</p>
        </div>
        <div className="header-actions">
          <button className="create-stream-btn" onClick={() => setShowCreateModal(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Create Stream
          </button>
        </div>
      </div>

      <div className="streams-stats">
        <div className="stat-card">
          <div className="stat-value">{streams.length}</div>
          <div className="stat-label">Total Streams</div>
        </div>
        <div className="stat-card active">
          <div className="stat-value">{activeCount}</div>
          <div className="stat-label">Active Streams</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{formatNumber(totalPosts)}</div>
          <div className="stat-label">Posts Collected</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{streams.reduce((sum, s) => sum + s.keywords.length + s.accounts.length + s.hashtags.length, 0)}</div>
          <div className="stat-label">Total Filters</div>
        </div>
      </div>

      <div className="streams-controls">
        <div className="filter-controls">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Streams
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={`filter-btn ${filter === 'paused' ? 'active' : ''}`}
            onClick={() => setFilter('paused')}
          >
            Paused
          </button>
          <button 
            className={`filter-btn ${filter === 'twitter' ? 'active' : ''}`}
            onClick={() => setFilter('twitter')}
          >
            Twitter
          </button>
          <button 
            className={`filter-btn ${filter === 'instagram' ? 'active' : ''}`}
            onClick={() => setFilter('instagram')}
          >
            Instagram
          </button>
        </div>
      </div>

      <div className="streams-list">
        {filteredStreams.map((stream) => (
          <div key={stream.id} className="stream-card">
            <div className="stream-header">
              <div className="stream-info">
                <div className="stream-name">
                  <div className="stream-type-icon">
                    {getTypeIcon(stream.type)}
                  </div>
                  <div>
                    <h3>{stream.name}</h3>
                    <span 
                      className="status-badge"
                      style={{ 
                        backgroundColor: `${getStatusColor(stream.status)}20`,
                        color: getStatusColor(stream.status),
                        borderColor: `${getStatusColor(stream.status)}40`
                      }}
                    >
                      {stream.status}
                    </span>
                  </div>
                </div>
                <p className="stream-description">{stream.description}</p>
              </div>
              <div className="stream-actions">
                <button 
                  className="action-btn"
                  onClick={() => handleEditStream(stream)}
                  title="Edit Stream"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/>
                  </svg>
                </button>
                <button 
                  className={`toggle-btn ${stream.status === 'active' ? 'active' : ''}`}
                  onClick={() => toggleStreamStatus(stream.id)}
                  title={stream.status === 'active' ? 'Pause Stream' : 'Activate Stream'}
                >
                  {stream.status === 'active' ? 'Pause' : 'Activate'}
                </button>
              </div>
            </div>

            <div className="stream-details">
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Type:</span>
                  <span className="detail-value">{stream.type}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Platform:</span>
                  <div className="platform-value">
                    {stream.platform !== 'all' && getPlatformIcon(stream.platform)}
                    <span>{stream.platform}</span>
                  </div>
                </div>
              </div>
              
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Posts Collected:</span>
                  <span className="detail-value">{formatNumber(stream.postsCollected)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Last Activity:</span>
                  <span className="detail-value">{formatLastActivity(stream.lastActivity)}</span>
                </div>
              </div>

              <div className="filters-section">
                {stream.keywords.length > 0 && (
                  <div className="filter-group">
                    <span className="filter-label">Keywords:</span>
                    <div className="filter-tags">
                      {stream.keywords.slice(0, 3).map((keyword, index) => (
                        <span key={index} className="filter-tag keyword">{keyword}</span>
                      ))}
                      {stream.keywords.length > 3 && (
                        <span className="filter-more">+{stream.keywords.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}
                
                {stream.accounts.length > 0 && (
                  <div className="filter-group">
                    <span className="filter-label">Accounts:</span>
                    <div className="filter-tags">
                      {stream.accounts.slice(0, 3).map((account, index) => (
                        <span key={index} className="filter-tag account">{account}</span>
                      ))}
                      {stream.accounts.length > 3 && (
                        <span className="filter-more">+{stream.accounts.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}
                
                {stream.hashtags.length > 0 && (
                  <div className="filter-group">
                    <span className="filter-label">Hashtags:</span>
                    <div className="filter-tags">
                      {stream.hashtags.slice(0, 3).map((hashtag, index) => (
                        <span key={index} className="filter-tag hashtag">{hashtag}</span>
                      ))}
                      {stream.hashtags.length > 3 && (
                        <span className="filter-more">+{stream.hashtags.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}

                {stream.location && (
                  <div className="filter-group">
                    <span className="filter-label">Location:</span>
                    <span className="filter-tag location">{stream.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Stream Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => {
          setShowCreateModal(false);
          setEditingStream(null);
          resetNewStream();
        }}>
          <div className="create-stream-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingStream ? 'Edit Stream' : 'Create New Stream'}</h3>
              <button className="close-btn" onClick={() => {
                setShowCreateModal(false);
                setEditingStream(null);
                resetNewStream();
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
                  <label>Stream Name *</label>
                  <input
                    type="text"
                    value={newStream.name}
                    onChange={(e) => setNewStream({...newStream, name: e.target.value})}
                    placeholder="e.g., Federal Election Keywords"
                  />
                </div>
                <div className="form-group">
                  <label>Stream Type</label>
                  <select
                    value={newStream.type}
                    onChange={(e) => setNewStream({...newStream, type: e.target.value})}
                  >
                    {streamTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newStream.description}
                  onChange={(e) => setNewStream({...newStream, description: e.target.value})}
                  placeholder="Describe the purpose of this data stream..."
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Platform</label>
                  <select
                    value={newStream.platform}
                    onChange={(e) => setNewStream({...newStream, platform: e.target.value})}
                  >
                    {platforms.map(platform => (
                      <option key={platform.value} value={platform.value}>{platform.label}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Language</label>
                  <select
                    value={newStream.language}
                    onChange={(e) => setNewStream({...newStream, language: e.target.value})}
                  >
                    {languages.map(lang => (
                      <option key={lang.value} value={lang.value}>{lang.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {(newStream.type === 'keyword' || newStream.type === 'all') && (
                <div className="form-group">
                  <label>Keywords</label>
                  <div className="tag-input-group">
                    <input
                      type="text"
                      value={newStream.keywordInput}
                      onChange={(e) => setNewStream({...newStream, keywordInput: e.target.value})}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                      placeholder="Enter keywords..."
                    />
                    <button type="button" onClick={addKeyword} className="add-tag-btn">Add</button>
                  </div>
                  <div className="tags-list">
                    {newStream.keywords.map((keyword, index) => (
                      <span key={index} className="tag-chip keyword">
                        {keyword}
                        <button onClick={() => removeKeyword(keyword)} className="remove-tag-btn">×</button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(newStream.type === 'account' || newStream.type === 'all') && (
                <div className="form-group">
                  <label>Accounts</label>
                  <div className="tag-input-group">
                    <input
                      type="text"
                      value={newStream.accountInput}
                      onChange={(e) => setNewStream({...newStream, accountInput: e.target.value})}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAccount())}
                      placeholder="Enter account handles (e.g., @username)..."
                    />
                    <button type="button" onClick={addAccount} className="add-tag-btn">Add</button>
                  </div>
                  <div className="tags-list">
                    {newStream.accounts.map((account, index) => (
                      <span key={index} className="tag-chip account">
                        {account}
                        <button onClick={() => removeAccount(account)} className="remove-tag-btn">×</button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(newStream.type === 'hashtag' || newStream.type === 'all') && (
                <div className="form-group">
                  <label>Hashtags</label>
                  <div className="tag-input-group">
                    <input
                      type="text"
                      value={newStream.hashtagInput}
                      onChange={(e) => setNewStream({...newStream, hashtagInput: e.target.value})}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHashtag())}
                      placeholder="Enter hashtags (e.g., #election)..."
                    />
                    <button type="button" onClick={addHashtag} className="add-tag-btn">Add</button>
                  </div>
                  <div className="tags-list">
                    {newStream.hashtags.map((hashtag, index) => (
                      <span key={index} className="tag-chip hashtag">
                        {hashtag}
                        <button onClick={() => removeHashtag(hashtag)} className="remove-tag-btn">×</button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(newStream.type === 'location' || newStream.type === 'all') && (
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={newStream.location}
                    onChange={(e) => setNewStream({...newStream, location: e.target.value})}
                    placeholder="e.g., Brazil, São Paulo, Rio de Janeiro"
                  />
                </div>
              )}
            </div>
            
            <div className="modal-actions">
              <button className="btn secondary" onClick={() => {
                setShowCreateModal(false);
                setEditingStream(null);
                resetNewStream();
              }}>
                Cancel
              </button>
              <button 
                className="btn primary" 
                onClick={editingStream ? handleUpdateStream : handleCreateStream}
              >
                {editingStream ? 'Update Stream' : 'Create Stream'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Streams;