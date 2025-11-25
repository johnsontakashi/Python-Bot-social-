import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { icon: '📊', label: 'Projects', active: false },
    { icon: '📁', label: 'Datasets', active: true },
    { icon: '👤', label: 'Accounts', active: false },
    { icon: '📍', label: 'Locations', active: false },
    { icon: '📅', label: 'Events', active: false },
    { icon: '🔔', label: 'Alerts', active: false },
    { icon: '⚙️', label: 'Settings', active: false },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Social Media Datasets</h2>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <div key={index} className={`nav-item ${item.active ? 'active' : ''}`}>
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;