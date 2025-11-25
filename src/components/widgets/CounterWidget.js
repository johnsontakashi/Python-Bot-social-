import React, { useEffect, useState } from 'react';
import './CounterWidget.css';

const CounterWidget = ({ config }) => {
  const [currentValue, setCurrentValue] = useState(config.animated ? 0 : config.value);

  useEffect(() => {
    if (config.animated && config.target) {
      const duration = config.duration || 2000;
      const increment = config.target / (duration / 50);
      
      const timer = setInterval(() => {
        setCurrentValue(prev => {
          const newValue = prev + increment;
          if (newValue >= config.target) {
            clearInterval(timer);
            return config.target;
          }
          return newValue;
        });
      }, 50);

      return () => clearInterval(timer);
    }
  }, [config]);

  return (
    <div className="counter-widget">
      <div className="counter-value">
        {Math.floor(currentValue).toLocaleString()}
      </div>
      <div className="counter-progress">
        <div 
          className="progress-bar"
          style={{ width: `${(currentValue / (config.target || 1)) * 100}%` }}
        ></div>
      </div>
      <div className="counter-target">
        Target: {(config.target || 0).toLocaleString()}
      </div>
    </div>
  );
};

export default CounterWidget;