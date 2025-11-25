import React from 'react';
import './TextWidget.css';

const TextWidget = ({ config }) => {
  return (
    <div 
      className="text-widget"
      style={{
        fontSize: config.fontSize || '16px',
        textAlign: config.textAlign || 'left'
      }}
    >
      <div className="text-content">
        {config.content || 'Add your text content here...'}
      </div>
    </div>
  );
};

export default TextWidget;