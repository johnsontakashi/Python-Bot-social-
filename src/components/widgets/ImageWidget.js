import React from 'react';
import './ImageWidget.css';

const ImageWidget = ({ config }) => {
  if (!config.src) {
    return (
      <div className="image-widget placeholder">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21,15 16,10 5,21"/>
        </svg>
        <span>No Image</span>
      </div>
    );
  }

  return (
    <div className="image-widget">
      <img 
        src={config.src}
        alt={config.alt || 'Widget Image'}
        className={`image-fit-${config.fit || 'cover'}`}
      />
    </div>
  );
};

export default ImageWidget;