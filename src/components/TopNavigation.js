import React, { useState } from 'react';
import './TopNavigation.css';

const TopNavigation = ({ currentView }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New dataset ready',
      message: 'Federal Election 2024 dataset has been processed and is ready for analysis',
      time: '2 minutes ago',
      type: 'success',
      read: false
    },
    {
      id: 2,
      title: 'Alert threshold reached',
      message: 'Sentiment analysis shows negative trend above 75% threshold',
      time: '15 minutes ago',
      type: 'warning',
      read: false
    },
    {
      id: 3,
      title: 'Data collection paused',
      message: 'Twitter API rate limit reached. Collection will resume in 1 hour',
      time: '1 hour ago',
      type: 'info',
      read: true
    }
  ]);

  const helpItems = [
    {
      title: 'Getting Started',
      description: 'Learn how to create your first monitoring project',
      icon: '🚀'
    },
    {
      title: 'Data Collection Guide',
      description: 'Understanding datasets, platforms, and filters',
      icon: '📊'
    },
    {
      title: 'Dashboard Builder',
      description: 'Create custom visualizations and reports',
      icon: '📈'
    },
    {
      title: 'API Documentation',
      description: 'Integrate with external systems and tools',
      icon: '⚙️'
    },
    {
      title: 'Contact Support',
      description: 'Get help from our technical support team',
      icon: '💬'
    }
  ];

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowHelp(false);
  };

  const handleHelpClick = () => {
    setShowHelp(!showHelp);
    setShowNotifications(false);
  };

  const markAsRead = (notificationId) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  const handleViewAllNotifications = () => {
    setShowNotifications(false);
    setShowAllNotifications(true);
  };

  const handleCloseAllNotifications = () => {
    setShowAllNotifications(false);
  };

  const handleHelpItemClick = (item) => {
    console.log('Opening help item:', item.title);
    setShowHelp(false);
  };
  const getViewTitle = (view) => {
    const titles = {
      projects: 'Projects',
      datasets: 'Datasets', 
      accounts: 'Accounts',
      locations: 'Locations',
      events: 'Events',
      alerts: 'Alerts',
      settings: 'Settings'
    };
    return titles[view] || 'Dashboard';
  };

  const getViewDescription = (view) => {
    const descriptions = {
      projects: 'Manage monitoring campaigns and create dashboards',
      datasets: 'Configure data collection streams and filters',
      accounts: 'Manage user accounts and permissions',
      locations: 'Configure geographic regions and mapping',
      events: 'View data collection logs and system events',
      alerts: 'Set up automated notifications and triggers',
      settings: 'Organization configuration and preferences'
    };
    return descriptions[view] || '';
  };

  return (
    <div className="top-navigation">
      <div className="nav-content">
        <div className="page-info">
          <h1 className="page-title">{getViewTitle(currentView)}</h1>
          <p className="page-description">{getViewDescription(currentView)}</p>
        </div>
        
        <div className="nav-actions">
          <div className="search-container">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input 
              type="text" 
              placeholder="Search..." 
              className="search-input"
            />
          </div>
          
          <div className="dropdown-container">
            <button 
              className={`notification-button ${showNotifications ? 'active' : ''}`}
              onClick={handleNotificationClick}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className="notification-badge">{notifications.filter(n => !n.read).length}</span>
            </button>
            
            {showNotifications && (
              <div className="dropdown-menu notifications-dropdown">
                <div className="dropdown-header">
                  <h3>Notifications</h3>
                  <button className="mark-all-read" onClick={markAllAsRead}>Mark all as read</button>
                </div>
                <div className="notifications-list">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`notification-item ${notification.read ? 'read' : 'unread'} ${notification.type}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="notification-content">
                        <div className="notification-title">{notification.title}</div>
                        <div className="notification-message">{notification.message}</div>
                        <div className="notification-time">{notification.time}</div>
                      </div>
                      {!notification.read && <div className="unread-indicator"></div>}
                    </div>
                  ))}
                </div>
                <div className="dropdown-footer">
                  <button className="view-all-btn" onClick={handleViewAllNotifications}>View all notifications</button>
                </div>
              </div>
            )}
          </div>
          
          <div className="dropdown-container">
            <button 
              className={`help-button ${showHelp ? 'active' : ''}`}
              onClick={handleHelpClick}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <circle cx="12" cy="17" r="0.5"/>
              </svg>
            </button>
            
            {showHelp && (
              <div className="dropdown-menu help-dropdown">
                <div className="dropdown-header">
                  <h3>Help & Support</h3>
                </div>
                <div className="help-list">
                  {helpItems.map((item, index) => (
                    <div 
                      key={index} 
                      className="help-item"
                      onClick={() => handleHelpItemClick(item)}
                    >
                      <div className="help-icon">{item.icon}</div>
                      <div className="help-content">
                        <div className="help-title">{item.title}</div>
                        <div className="help-description">{item.description}</div>
                      </div>
                      <svg className="help-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9,18 15,12 9,6"></polyline>
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Overlay to close dropdowns when clicking outside */}
      {(showNotifications || showHelp) && (
        <div 
          className="dropdown-overlay" 
          onClick={() => {
            setShowNotifications(false);
            setShowHelp(false);
          }}
        ></div>
      )}

      {/* Full Notifications Modal */}
      {showAllNotifications && (
        <div className="modal-overlay" onClick={handleCloseAllNotifications}>
          <div className="notifications-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">All Notifications</h2>
              <button className="close-btn" onClick={handleCloseAllNotifications}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="notifications-controls">
                <div className="notifications-stats">
                  <span className="total-count">{notifications.length} total notifications</span>
                  <span className="unread-count">{notifications.filter(n => !n.read).length} unread</span>
                </div>
                <button className="mark-all-read-btn" onClick={markAllAsRead}>
                  Mark all as read
                </button>
              </div>
              <div className="all-notifications-list">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`notification-item-full ${notification.read ? 'read' : 'unread'} ${notification.type}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="notification-content-full">
                      <div className="notification-header-full">
                        <div className="notification-title-full">{notification.title}</div>
                        <div className="notification-time-full">{notification.time}</div>
                      </div>
                      <div className="notification-message-full">{notification.message}</div>
                      <div className="notification-type-badge">{notification.type}</div>
                    </div>
                    {!notification.read && <div className="unread-indicator-full"></div>}
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-btn cancel" onClick={handleCloseAllNotifications}>
                Close
              </button>
              <button className="modal-btn primary" onClick={markAllAsRead}>
                Mark All Read
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopNavigation;