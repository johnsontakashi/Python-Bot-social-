import React, { useState } from 'react';
import './Projects.css';

const Projects = ({ onCreateDashboard }) => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Federal Election 2024',
      description: 'Presidential campaign monitoring across all major platforms',
      datasets: 5,
      dashboards: 12,
      status: 'active',
      lastUpdate: '2024-11-25T10:30:00Z',
      platforms: ['Twitter', 'Instagram', 'TikTok', 'Facebook'],
      metrics: {
        totalPosts: 125430,
        sentiment: { positive: 45, neutral: 35, negative: 20 }
      }
    },
    {
      id: 2,
      name: 'State Governors Race',
      description: 'Gubernatorial campaigns monitoring for 15 states',
      datasets: 8,
      dashboards: 24,
      status: 'active',
      lastUpdate: '2024-11-25T09:15:00Z',
      platforms: ['Twitter', 'Instagram', 'Facebook'],
      metrics: {
        totalPosts: 87650,
        sentiment: { positive: 38, neutral: 42, negative: 20 }
      }
    },
    {
      id: 3,
      name: 'Municipal Elections 2024',
      description: 'Local mayoral campaigns in major cities',
      datasets: 12,
      dashboards: 36,
      status: 'paused',
      lastUpdate: '2024-11-20T16:45:00Z',
      platforms: ['Twitter', 'Instagram'],
      metrics: {
        totalPosts: 45320,
        sentiment: { positive: 42, neutral: 38, negative: 20 }
      }
    }
  ]);

  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showDashboardsModal, setShowDashboardsModal] = useState(false);
  const [selectedProjectDashboards, setSelectedProjectDashboards] = useState([]);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    platforms: [],
    type: 'Political Campaign',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  const [showViewDetailsModal, setShowViewDetailsModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  const handleCreateProject = () => {
    setShowNewProjectModal(true);
  };

  const handleCloseNewProjectModal = () => {
    setShowNewProjectModal(false);
    setNewProject({
      name: '',
      description: '',
      platforms: [],
      type: 'Political Campaign',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
  };

  const handleSaveNewProject = () => {
    if (!newProject.name || !newProject.description) {
      alert('Please fill in all required fields');
      return;
    }

    const project = {
      id: Math.max(...projects.map(p => p.id)) + 1,
      name: newProject.name,
      description: newProject.description,
      platforms: newProject.platforms,
      datasets: 0,
      dashboards: 0,
      status: 'active',
      lastUpdate: new Date().toISOString(),
      metrics: {
        totalPosts: 0,
        sentiment: { positive: 50, neutral: 30, negative: 20 }
      }
    };

    setProjects(prevProjects => [project, ...prevProjects]);
    setShowNewProjectModal(false);
    setNewProject({
      name: '',
      description: '',
      platforms: [],
      type: 'Political Campaign',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
  };

  const handleViewDashboards = (project) => {
    let allDashboards = JSON.parse(localStorage.getItem('all_dashboards') || '[]');
    
    // If no dashboards exist, create sample ones
    if (allDashboards.length === 0) {
      const sampleDashboards = [
        {
          id: `dashboard_${project.id}_1`,
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          resolution: '1920x1080',
          settings: {
            title: `${project.name} - Overview Dashboard`,
            projectId: project.id,
            gridSize: { w: 24, h: 18 },
            backgroundColor: '#0d1117',
            refreshRate: 30
          },
          widgets: [
            {
              id: 'widget_1',
              type: 'kpi',
              layout: { x: 0, y: 0, w: 6, h: 4 },
              config: {
                title: 'Total Posts',
                value: project.metrics.totalPosts,
                trend: '+12%',
                color: '#2ecc71'
              }
            },
            {
              id: 'widget_2',
              type: 'chart',
              layout: { x: 6, y: 0, w: 12, h: 8 },
              config: {
                title: 'Sentiment Analysis',
                chartType: 'pie',
                data: [
                  { name: 'Positive', value: project.metrics.sentiment.positive, color: '#2ecc71' },
                  { name: 'Neutral', value: project.metrics.sentiment.neutral, color: '#95a5a6' },
                  { name: 'Negative', value: project.metrics.sentiment.negative, color: '#e74c3c' }
                ]
              }
            },
            {
              id: 'widget_3',
              type: 'trend',
              layout: { x: 18, y: 0, w: 6, h: 4 },
              config: {
                title: 'Engagement Rate',
                value: '8.7%',
                trend: '+2.3%',
                period: '24h'
              }
            }
          ]
        },
        {
          id: `dashboard_${project.id}_2`,
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
          resolution: '3840x2160',
          settings: {
            title: `${project.name} - Detailed Analytics`,
            projectId: project.id,
            gridSize: { w: 24, h: 18 },
            backgroundColor: '#0d1117',
            refreshRate: 60
          },
          widgets: [
            {
              id: 'widget_1',
              type: 'counter',
              layout: { x: 0, y: 0, w: 4, h: 3 },
              config: {
                title: 'Active Campaigns',
                value: project.datasets,
                maxValue: 20,
                color: '#4a90e2'
              }
            },
            {
              id: 'widget_2',
              type: 'chart',
              layout: { x: 4, y: 0, w: 16, h: 8 },
              config: {
                title: 'Daily Posts Volume',
                chartType: 'line',
                data: Array.from({ length: 7 }, (_, i) => ({
                  date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
                  value: Math.floor(Math.random() * 1000) + 500
                }))
              }
            },
            {
              id: 'widget_3',
              type: 'text',
              layout: { x: 20, y: 0, w: 4, h: 6 },
              config: {
                title: 'Key Insights',
                content: `Project: ${project.name}\n\nStatus: ${project.status}\n\nPlatforms: ${project.platforms.join(', ')}\n\nLast Update: ${new Date(project.lastUpdate).toLocaleDateString()}`
              }
            }
          ]
        }
      ];

      // Add sample dashboards for other projects too
      projects.forEach(proj => {
        if (proj.id !== project.id && proj.dashboards > 0) {
          sampleDashboards.push({
            id: `dashboard_${proj.id}_1`,
            timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            resolution: '1920x1080',
            settings: {
              title: `${proj.name} - Main Dashboard`,
              projectId: proj.id,
              gridSize: { w: 24, h: 18 },
              backgroundColor: '#0d1117',
              refreshRate: 30
            },
            widgets: [
              {
                id: 'widget_1',
                type: 'kpi',
                layout: { x: 0, y: 0, w: 6, h: 4 },
                config: {
                  title: 'Total Posts',
                  value: proj.metrics.totalPosts,
                  trend: '+' + Math.floor(Math.random() * 20) + '%',
                  color: '#2ecc71'
                }
              }
            ]
          });
        }
      });

      localStorage.setItem('all_dashboards', JSON.stringify(sampleDashboards));
      allDashboards = sampleDashboards;
    }
    
    const projectDashboards = allDashboards.filter(d => 
      d.id.includes(`dashboard_${project.id}`) || 
      (d.settings && d.settings.projectId === project.id)
    );
    
    setSelectedProjectDashboards(projectDashboards);
    setShowDashboardsModal(true);
  };

  const handleLoadDashboard = (dashboard) => {
    onCreateDashboard({ 
      projectId: dashboard.settings.projectId || dashboard.id.split('_')[1], 
      name: dashboard.settings.title || 'Saved Dashboard',
      loadDashboard: dashboard
    });
    setShowDashboardsModal(false);
  };

  const handlePlatformToggle = (platform) => {
    setNewProject(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setShowViewDetailsModal(true);
  };

  const handleProjectSettings = (project) => {
    setEditingProject({ ...project });
    setShowSettingsModal(true);
  };

  const handleCloseViewDetailsModal = () => {
    setShowViewDetailsModal(false);
    setSelectedProject(null);
  };

  const handleCloseSettingsModal = () => {
    setShowSettingsModal(false);
    setEditingProject(null);
  };

  const handleSaveProjectSettings = () => {
    if (!editingProject.name || !editingProject.description) {
      alert('Please fill in all required fields');
      return;
    }

    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === editingProject.id ? editingProject : project
      )
    );
    
    setShowSettingsModal(false);
    setEditingProject(null);
  };

  const handleEditProjectPlatformToggle = (platform) => {
    setEditingProject(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
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
      case 'LinkedIn':
        return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
      case 'YouTube':
        return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="projects-container">
      <div className="projects-header">
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-value">{projects.length}</div>
            <div className="stat-label">Active Projects</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{projects.reduce((acc, p) => acc + p.datasets, 0)}</div>
            <div className="stat-label">Total Datasets</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{projects.reduce((acc, p) => acc + p.dashboards, 0)}</div>
            <div className="stat-label">Dashboards</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{formatNumber(projects.reduce((acc, p) => acc + p.metrics.totalPosts, 0))}</div>
            <div className="stat-label">Posts Collected</div>
          </div>
        </div>
        
        <button className="create-project-btn" onClick={handleCreateProject}>
          <span style={{marginRight: '6px'}}>+</span>
          Create Project
        </button>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <div className="project-title-section">
                <h3 className="project-name">{project.name}</h3>
                <span className={`project-status ${project.status}`}>
                  {project.status}
                </span>
              </div>
              <div className="project-actions">
                <button 
                  className="action-btn" 
                  title="Settings"
                  onClick={() => handleProjectSettings(project)}
                >
                  <span>⚙</span>
                </button>
              </div>
            </div>

            <p className="project-description">{project.description}</p>

            <div className="project-platforms">
              {project.platforms.map((platform, index) => (
                <span key={index} className="platform-tag">{platform}</span>
              ))}
            </div>

            <div className="project-metrics">
              <div className="metric-row">
                <div className="metric-item">
                  <span className="metric-label">Datasets</span>
                  <span className="metric-value">{project.datasets}</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Dashboards</span>
                  <span className="metric-value">{project.dashboards}</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Posts</span>
                  <span className="metric-value">{formatNumber(project.metrics.totalPosts)}</span>
                </div>
              </div>
              
              <div className="sentiment-bar">
                <div 
                  className="sentiment-segment positive"
                  style={{ width: `${project.metrics.sentiment.positive}%` }}
                ></div>
                <div 
                  className="sentiment-segment neutral"
                  style={{ width: `${project.metrics.sentiment.neutral}%` }}
                ></div>
                <div 
                  className="sentiment-segment negative"
                  style={{ width: `${project.metrics.sentiment.negative}%` }}
                ></div>
              </div>
            </div>

            <div className="project-footer">
              <div className="last-update">
                Last updated: {formatDate(project.lastUpdate)}
              </div>
              <div className="project-actions-footer">
                <button 
                  className="btn tertiary"
                  onClick={() => handleViewDashboards(project)}
                >
                  View Dashboards
                </button>
                <button 
                  className="btn secondary"
                  onClick={() => onCreateDashboard({ projectId: project.id, name: project.name })}
                >
                  Create Dashboard
                </button>
                <button 
                  className="btn primary"
                  onClick={() => handleViewDetails(project)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="modal-overlay" onClick={handleCloseNewProjectModal}>
          <div className="new-project-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Project</h3>
              <button className="close-btn" onClick={handleCloseNewProjectModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Project Name *</label>
                  <input
                    type="text"
                    value={newProject.name}
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    className="form-input"
                    placeholder="e.g., Senate Elections 2024"
                  />
                </div>
                <div className="form-group">
                  <label>Project Type</label>
                  <select
                    value={newProject.type}
                    onChange={(e) => setNewProject({...newProject, type: e.target.value})}
                    className="form-select"
                  >
                    <option value="Political Campaign">Political Campaign</option>
                    <option value="Election Monitoring">Election Monitoring</option>
                    <option value="Public Opinion">Public Opinion</option>
                    <option value="Crisis Communication">Crisis Communication</option>
                    <option value="Brand Monitoring">Brand Monitoring</option>
                    <option value="Event Tracking">Event Tracking</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label>Description *</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="form-textarea"
                  placeholder="Describe the goals and scope of this project..."
                  rows="3"
                />
              </div>

              <div className="form-group full-width">
                <label>Monitoring Platforms</label>
                <div className="platform-selector">
                  {['Twitter', 'Instagram', 'Facebook', 'TikTok', 'LinkedIn', 'YouTube'].map((platform) => (
                    <label key={platform} className="platform-checkbox">
                      <input
                        type="checkbox"
                        checked={newProject.platforms.includes(platform)}
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
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={newProject.endDate}
                    onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn secondary" onClick={handleCloseNewProjectModal}>
                Cancel
              </button>
              <button className="btn primary" onClick={handleSaveNewProject}>
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showViewDetailsModal && selectedProject && (
        <div className="modal-overlay" onClick={handleCloseViewDetailsModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{selectedProject.name}</h2>
              <button className="close-btn" onClick={handleCloseViewDetailsModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-section">
                <h3 className="section-title">Project Overview</h3>
                <div className="project-details">
                  <div className="detail-row">
                    <span className="detail-label">Status:</span>
                    <span className={`project-status ${selectedProject.status}`}>
                      {selectedProject.status}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Description:</span>
                    <span className="detail-value">{selectedProject.description}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Last Updated:</span>
                    <span className="detail-value">{formatDate(selectedProject.lastUpdate)}</span>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Monitoring Platforms</h3>
                <div className="platforms-grid-modal">
                  {selectedProject.platforms.map((platform) => (
                    <div key={platform} className="platform-option selected">
                      <div className={`platform-icon-modal ${platform.toLowerCase()}`}>
                        {getPlatformIcon(platform)}
                      </div>
                      <span className="platform-name">{platform}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Project Statistics</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-number">{selectedProject.datasets}</div>
                    <div className="stat-name">Datasets</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">{selectedProject.dashboards}</div>
                    <div className="stat-name">Dashboards</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">{formatNumber(selectedProject.metrics.totalPosts)}</div>
                    <div className="stat-name">Total Posts</div>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Sentiment Analysis</h3>
                <div className="sentiment-overview">
                  <div className="sentiment-stats">
                    <div className="sentiment-stat positive">
                      <span className="sentiment-percentage">{selectedProject.metrics.sentiment.positive}%</span>
                      <span className="sentiment-label">Positive</span>
                    </div>
                    <div className="sentiment-stat neutral">
                      <span className="sentiment-percentage">{selectedProject.metrics.sentiment.neutral}%</span>
                      <span className="sentiment-label">Neutral</span>
                    </div>
                    <div className="sentiment-stat negative">
                      <span className="sentiment-percentage">{selectedProject.metrics.sentiment.negative}%</span>
                      <span className="sentiment-label">Negative</span>
                    </div>
                  </div>
                  <div className="sentiment-bar">
                    <div 
                      className="sentiment-segment positive"
                      style={{ width: `${selectedProject.metrics.sentiment.positive}%` }}
                    ></div>
                    <div 
                      className="sentiment-segment neutral"
                      style={{ width: `${selectedProject.metrics.sentiment.neutral}%` }}
                    ></div>
                    <div 
                      className="sentiment-segment negative"
                      style={{ width: `${selectedProject.metrics.sentiment.negative}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-btn cancel" onClick={handleCloseViewDetailsModal}>
                Close
              </button>
              <button 
                className="modal-btn primary"
                onClick={() => onCreateDashboard({ projectId: selectedProject.id, name: selectedProject.name })}
              >
                Create Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && editingProject && (
        <div className="modal-overlay" onClick={handleCloseSettingsModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Project Settings</h2>
              <button className="close-btn" onClick={handleCloseSettingsModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-section">
                <h3 className="section-title">Basic Information</h3>
                <div className="form-group">
                  <label className="form-label">Project Name *</label>
                  <input
                    type="text"
                    value={editingProject.name}
                    onChange={(e) => setEditingProject({...editingProject, name: e.target.value})}
                    className="form-input"
                    placeholder="Enter project name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea
                    value={editingProject.description}
                    onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                    className="form-textarea"
                    placeholder="Describe the project goals and scope..."
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    value={editingProject.status}
                    onChange={(e) => setEditingProject({...editingProject, status: e.target.value})}
                    className="form-select"
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Monitoring Platforms</h3>
                <div className="platforms-selection">
                  <div className="platforms-grid-modal">
                    {['Twitter', 'Instagram', 'Facebook', 'TikTok', 'LinkedIn', 'YouTube'].map((platform) => (
                      <label 
                        key={platform} 
                        className={`platform-option ${editingProject.platforms.includes(platform) ? 'selected' : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={editingProject.platforms.includes(platform)}
                          onChange={() => handleEditProjectPlatformToggle(platform)}
                        />
                        <div className={`platform-icon-modal ${platform.toLowerCase()}`}>
                          {getPlatformIcon(platform)}
                        </div>
                        <span className="platform-name">{platform}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-btn cancel" onClick={handleCloseSettingsModal}>
                Cancel
              </button>
              <button className="modal-btn primary" onClick={handleSaveProjectSettings}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dashboards Modal */}
      {showDashboardsModal && (
        <div className="modal-overlay" onClick={() => setShowDashboardsModal(false)}>
          <div className="dashboards-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Saved Dashboards</h3>
              <button className="close-btn" onClick={() => setShowDashboardsModal(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              {selectedProjectDashboards.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-content">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <line x1="9" y1="9" x2="15" y2="15"/>
                      <line x1="15" y1="9" x2="9" y2="15"/>
                    </svg>
                    <h4>No Dashboards Found</h4>
                    <p>Create your first dashboard to get started</p>
                  </div>
                </div>
              ) : (
                <div className="dashboard-list">
                  {selectedProjectDashboards.map((dashboard, index) => (
                    <div key={index} className="dashboard-item">
                      <div className="dashboard-info">
                        <h4>{dashboard.settings?.title || `Dashboard ${index + 1}`}</h4>
                        <p>
                          Resolution: {dashboard.resolution || '1920x1080'} • 
                          {dashboard.widgets?.length || 0} widgets • 
                          Refresh: {dashboard.settings?.refreshRate || 30}s
                        </p>
                        <small>Last saved: {new Date(dashboard.timestamp).toLocaleString()}</small>
                      </div>
                      <div className="dashboard-actions">
                        <button 
                          className="btn secondary"
                          onClick={() => {
                            // Preview functionality
                            alert(`Preview: ${dashboard.settings?.title}\nWidgets: ${dashboard.widgets?.length}\nResolution: ${dashboard.resolution}`);
                          }}
                        >
                          Preview
                        </button>
                        <button 
                          className="btn primary"
                          onClick={() => handleLoadDashboard(dashboard)}
                        >
                          Load Dashboard
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;