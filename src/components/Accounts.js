import React, { useState } from 'react';
import './Accounts.css';

const Accounts = () => {
  const [users] = useState([
    {
      id: 1,
      name: 'Maria Silva',
      email: 'maria.silva@example.com',
      role: 'Super Admin',
      status: 'active',
      lastLogin: '2024-11-25T08:30:00Z',
      phone: '+55 11 99999-1234',
      location: 'São Paulo, Brazil',
      avatar: 'MS'
    },
    {
      id: 2,
      name: 'João Santos',
      email: 'joao.santos@example.com',
      role: 'Campaign Manager',
      status: 'active',
      lastLogin: '2024-11-25T07:45:00Z',
      phone: '+55 21 98888-5678',
      location: 'Rio de Janeiro, Brazil',
      avatar: 'JS'
    },
    {
      id: 3,
      name: 'Ana Costa',
      email: 'ana.costa@example.com',
      role: 'Analyst',
      status: 'active',
      lastLogin: '2024-11-24T16:20:00Z',
      phone: '+55 31 97777-9012',
      location: 'Belo Horizonte, Brazil',
      avatar: 'AC'
    },
    {
      id: 4,
      name: 'Carlos Oliveira',
      email: 'carlos.oliveira@example.com',
      role: 'Data Specialist',
      status: 'inactive',
      lastLogin: '2024-11-20T14:15:00Z',
      phone: '+55 61 96666-3456',
      location: 'Brasília, Brazil',
      avatar: 'CO'
    },
    {
      id: 5,
      name: 'Fernanda Lima',
      email: 'fernanda.lima@example.com',
      role: 'Content Moderator',
      status: 'active',
      lastLogin: '2024-11-25T09:10:00Z',
      phone: '+55 85 95555-7890',
      location: 'Fortaleza, Brazil',
      avatar: 'FL'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const filteredUsers = users.filter(user => {
    if (filter === 'all') return true;
    return user.status === filter;
  });

  const activeUsers = users.filter(user => user.status === 'active').length;
  const totalUsers = users.length;

  const formatLastLogin = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    return `${diffDays - 1} days ago`;
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Super Admin': return '#e74c3c';
      case 'Campaign Manager': return '#4a90e2';
      case 'Analyst': return '#2ecc71';
      case 'Data Specialist': return '#f39c12';
      case 'Content Moderator': return '#9b59b6';
      default: return '#7d8590';
    }
  };

  return (
    <div className="accounts-container">
      <div className="accounts-header">
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-value">{totalUsers}</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{activeUsers}</div>
            <div className="stat-label">Active Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{totalUsers - activeUsers}</div>
            <div className="stat-label">Inactive Users</div>
          </div>
        </div>

        <div className="header-controls">
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Users
            </button>
            <button 
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button 
              className={`filter-btn ${filter === 'inactive' ? 'active' : ''}`}
              onClick={() => setFilter('inactive')}
            >
              Inactive
            </button>
          </div>

          <button className="add-user-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            Add User
          </button>
        </div>
      </div>

      <div className="accounts-content">
        <div className="users-table">
          <div className="table-header">
            <div className="header-cell">User</div>
            <div className="header-cell">Role</div>
            <div className="header-cell">Contact</div>
            <div className="header-cell">Status</div>
            <div className="header-cell">Last Login</div>
            <div className="header-cell">Actions</div>
          </div>

          <div className="table-body">
            {filteredUsers.map((user) => (
              <div key={user.id} className="table-row">
                <div className="user-info">
                  <div className="user-avatar">
                    {user.avatar}
                  </div>
                  <div className="user-details">
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                  </div>
                </div>

                <div className="user-role">
                  <span 
                    className="role-badge"
                    style={{ 
                      backgroundColor: `${getRoleColor(user.role)}20`,
                      color: getRoleColor(user.role),
                      borderColor: `${getRoleColor(user.role)}40`
                    }}
                  >
                    {user.role}
                  </span>
                </div>

                <div className="user-contact">
                  <div className="contact-item">{user.phone}</div>
                  <div className="contact-location">{user.location}</div>
                </div>

                <div className="user-status">
                  <span className={`status-indicator ${user.status}`}>
                    {user.status}
                  </span>
                </div>

                <div className="user-login">
                  {formatLastLogin(user.lastLogin)}
                </div>

                <div className="user-actions">
                  <button className="action-btn" title="View Profile">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                  <button className="action-btn" title="Edit User">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="m18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button className="action-btn danger" title="Deactivate User">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;