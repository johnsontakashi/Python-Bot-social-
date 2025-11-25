import React, { useState } from 'react';
import './AnalyticsSidebar.css';

const AnalyticsSidebar = () => {
  const [expandedSections, setExpandedSections] = useState({
    streams: true,
    mentions: false,
    demographics: false
  });

  const [selectedItem, setSelectedItem] = useState('stream-1');

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleItemClick = (itemId) => {
    setSelectedItem(itemId);
  };

  const sidebarData = {
    streams: {
      title: 'Streams',
      icon: '📊',
      items: [
        { id: 'stream-1', label: 'Main Stream', icon: '⭗' },
        { id: 'stream-2', label: 'Secondary Stream', icon: '⭗' },
        { id: 'stream-3', label: 'Backup Stream', icon: '⭗' },
        { id: 'stream-4', label: 'Archive Stream', icon: '⭗' }
      ]
    },
    mentions: {
      title: 'Mentions',
      icon: '💬',
      items: [
        { id: 'mentions-1', label: 'Direct Mentions', icon: '@' },
        { id: 'mentions-2', label: 'Indirect References', icon: '↗' },
        { id: 'mentions-3', label: 'Hashtag Mentions', icon: '#' },
        { id: 'mentions-4', label: 'Reply Mentions', icon: '↩' }
      ]
    },
    demographics: {
      title: 'Demographics',
      icon: '👥',
      items: [
        { id: 'demo-1', label: 'Age Groups', icon: '📊' },
        { id: 'demo-2', label: 'Geographic', icon: '🌍' },
        { id: 'demo-3', label: 'Gender', icon: '⚥' },
        { id: 'demo-4', label: 'Interests', icon: '🎯' }
      ]
    }
  };

  return (
    <div className="analytics-sidebar">
      {Object.entries(sidebarData).map(([sectionKey, section]) => (
        <div key={sectionKey} className="sidebar-section">
          <div 
            className="section-header"
            onClick={() => toggleSection(sectionKey)}
          >
            <div className="section-title">
              <span className="section-icon">{section.icon}</span>
              <span className="section-label">{section.title}</span>
            </div>
            <svg 
              className={`chevron ${expandedSections[sectionKey] ? 'expanded' : ''}`}
              width="12" 
              height="12" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </div>
          
          {expandedSections[sectionKey] && (
            <div className="section-items">
              {section.items.map((item) => (
                <div 
                  key={item.id}
                  className={`sidebar-item ${selectedItem === item.id ? 'selected' : ''}`}
                  onClick={() => handleItemClick(item.id)}
                >
                  <span className="item-icon">{item.icon}</span>
                  <span className="item-label">{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AnalyticsSidebar;