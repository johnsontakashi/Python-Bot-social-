import React, { useState } from 'react';
import './Projects.css';

const Projects = ({ onCreateDashboard }) => {
  const [projects] = useState([
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
        
        <button className="create-project-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
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
                <button className="action-btn" title="Settings">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
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
                  className="btn secondary"
                  onClick={() => onCreateDashboard({ projectId: project.id, name: project.name })}
                >
                  Create Dashboard
                </button>
                <button className="btn primary">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;