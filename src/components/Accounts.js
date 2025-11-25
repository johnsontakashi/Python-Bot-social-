import React, { useState } from 'react';
import './Accounts.css';

const Accounts = () => {
  const [users, setUsers] = useState([
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
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDeactivate, setUserToDeactivate] = useState(null);

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

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser({ ...user });
    setShowEditModal(true);
  };

  const handleDeactivateUser = (user) => {
    setUserToDeactivate(user);
    setShowConfirmModal(true);
  };

  const confirmDeactivateUser = () => {
    if (userToDeactivate) {
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userToDeactivate.id 
            ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
            : user
        )
      );
      setShowConfirmModal(false);
      setUserToDeactivate(null);
    }
  };

  const cancelDeactivate = () => {
    setShowConfirmModal(false);
    setUserToDeactivate(null);
  };

  const handleSaveUser = () => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === editingUser.id ? editingUser : user
      )
    );
    setShowEditModal(false);
    setEditingUser(null);
  };

  const handleCloseModal = () => {
    setShowUserModal(false);
    setSelectedUser(null);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingUser(null);
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
                  <button 
                    className="action-btn" 
                    title="View Profile"
                    onClick={() => handleViewProfile(user)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                  <button 
                    className="action-btn" 
                    title="Edit User"
                    onClick={() => handleEditUser(user)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="m18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button 
                    className="action-btn danger" 
                    title={user.status === 'active' ? 'Deactivate User' : 'Activate User'}
                    onClick={() => handleDeactivateUser(user)}
                  >
                    {user.status === 'active' ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 12l2 2 4-4"></path>
                        <circle cx="12" cy="12" r="10"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Profile Modal */}
      {showUserModal && selectedUser && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>User Profile</h3>
              <button className="close-btn" onClick={handleCloseModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="profile-section">
                <div className="profile-avatar large">
                  {selectedUser.avatar}
                </div>
                <div className="profile-info">
                  <h4>{selectedUser.name}</h4>
                  <p>{selectedUser.email}</p>
                  <span 
                    className="role-badge large"
                    style={{ 
                      backgroundColor: `${getRoleColor(selectedUser.role)}20`,
                      color: getRoleColor(selectedUser.role),
                      borderColor: `${getRoleColor(selectedUser.role)}40`
                    }}
                  >
                    {selectedUser.role}
                  </span>
                </div>
              </div>
              <div className="profile-details">
                <div className="detail-row">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{selectedUser.phone}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">{selectedUser.location}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className={`status-indicator ${selectedUser.status}`}>
                    {selectedUser.status}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Last Login:</span>
                  <span className="detail-value">{formatLastLogin(selectedUser.lastLogin)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && editingUser && (
        <div className="modal-overlay" onClick={handleCloseEditModal}>
          <div className="modal-content edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit User</h3>
              <button className="close-btn" onClick={handleCloseEditModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={editingUser.phone}
                    onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={editingUser.location}
                    onChange={(e) => setEditingUser({...editingUser, location: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                    className="form-select"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Campaign Manager">Campaign Manager</option>
                    <option value="Analyst">Analyst</option>
                    <option value="Data Specialist">Data Specialist</option>
                    <option value="Content Moderator">Content Moderator</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={editingUser.status}
                    onChange={(e) => setEditingUser({...editingUser, status: e.target.value})}
                    className="form-select"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn secondary" onClick={handleCloseEditModal}>
                  Cancel
                </button>
                <button className="btn primary" onClick={handleSaveUser}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Confirmation Modal */}
      {showConfirmModal && userToDeactivate && (
        <div className="modal-overlay" onClick={cancelDeactivate}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-header">
              <div className="confirm-icon">
                {userToDeactivate.status === 'active' ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                )}
              </div>
              <h3>
                {userToDeactivate.status === 'active' ? 'Deactivate User' : 'Activate User'}
              </h3>
            </div>
            <div className="confirm-body">
              <p>
                Are you sure you want to {userToDeactivate.status === 'active' ? 'deactivate' : 'activate'}{' '}
                <strong>{userToDeactivate.name}</strong>?
              </p>
              <div className="user-preview">
                <div className="preview-avatar">
                  {userToDeactivate.avatar}
                </div>
                <div className="preview-info">
                  <div className="preview-name">{userToDeactivate.name}</div>
                  <div className="preview-email">{userToDeactivate.email}</div>
                  <span 
                    className="preview-role"
                    style={{ 
                      backgroundColor: `${getRoleColor(userToDeactivate.role)}20`,
                      color: getRoleColor(userToDeactivate.role),
                      borderColor: `${getRoleColor(userToDeactivate.role)}40`
                    }}
                  >
                    {userToDeactivate.role}
                  </span>
                </div>
              </div>
              {userToDeactivate.status === 'active' && (
                <div className="warning-note">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  This user will lose access to all system features immediately.
                </div>
              )}
            </div>
            <div className="confirm-actions">
              <button className="btn secondary" onClick={cancelDeactivate}>
                Cancel
              </button>
              <button 
                className={`btn ${userToDeactivate.status === 'active' ? 'danger' : 'success'}`} 
                onClick={confirmDeactivateUser}
              >
                {userToDeactivate.status === 'active' ? 'Deactivate' : 'Activate'} User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accounts;