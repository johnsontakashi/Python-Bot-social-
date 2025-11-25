import React, { useState, useEffect } from 'react';
import './ClockWidget.css';

const ClockWidget = ({ type, config }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date, format) => {
    if (format === '24h') {
      return date.toLocaleTimeString('en-US', { hour12: false });
    }
    return date.toLocaleTimeString('en-US', { hour12: true });
  };

  if (type === 'clock-digital') {
    return (
      <div className="clock-widget digital">
        <div className="clock-time">
          {formatTime(time, config.format)}
        </div>
        {config.showDate && (
          <div className="clock-date">
            {time.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        )}
      </div>
    );
  }

  // Analog clock placeholder
  return (
    <div className="clock-widget analog">
      <div className="clock-face">
        <div className="clock-center"></div>
        <div 
          className="clock-hand hour-hand"
          style={{ transform: `rotate(${(time.getHours() % 12) * 30 + time.getMinutes() * 0.5}deg)` }}
        ></div>
        <div 
          className="clock-hand minute-hand"
          style={{ transform: `rotate(${time.getMinutes() * 6}deg)` }}
        ></div>
      </div>
    </div>
  );
};

export default ClockWidget;