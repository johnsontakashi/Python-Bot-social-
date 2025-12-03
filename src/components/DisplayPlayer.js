import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDisplayPlayerPayload } from '../api';
import './DisplayPlayer.css';

const DisplayPlayer = () => {
  const { id: displayId } = useParams();
  const [playerData, setPlayerData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    loadPlayerData();
  }, [displayId]);

  const loadPlayerData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchDisplayPlayerPayload(displayId);
      setPlayerData(data);
      setError(null);
      
      if (data.mode === 'playlist' && data.items?.length > 0) {
        setCurrentIndex(0);
        setTimeRemaining(data.items[0].durationSeconds);
      }
    } catch (err) {
      console.error('Failed to load player data:', err);
      setError('Failed to load display content');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (playerData?.mode === 'playlist' && playerData.items?.length > 0) {
      const interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Move to next item
            const nextIndex = (currentIndex + 1) % playerData.items.length;
            setCurrentIndex(nextIndex);
            return playerData.items[nextIndex].durationSeconds;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [playerData, currentIndex]);

  const renderDashboard = (dashboard) => {
    if (!dashboard || !dashboard.layout) {
      return (
        <div className="player-placeholder">
          <div className="placeholder-content">
            <h2>{dashboard?.name || 'Dashboard'}</h2>
            <p>Dashboard content would be rendered here</p>
            <div className="placeholder-widgets">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="placeholder-widget"></div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Parse layout JSON and render widgets
    let layout;
    try {
      layout = typeof dashboard.layout === 'string' 
        ? JSON.parse(dashboard.layout) 
        : dashboard.layout;
    } catch {
      layout = {};
    }

    return (
      <div className="player-dashboard">
        <div className="dashboard-header">
          <h1>{dashboard.name}</h1>
        </div>
        <div className="dashboard-content">
          {layout.widgets?.map((widget, index) => (
            <div key={widget.id || index} className="dashboard-widget">
              <div className="widget-header">
                <h3>{widget.title}</h3>
              </div>
              <div className="widget-content">
                <p>Widget: {widget.type}</p>
              </div>
            </div>
          )) || (
            <div className="placeholder-widgets">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="placeholder-widget"></div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="display-player loading">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p>Loading display content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="display-player error">
        <div className="error-content">
          <h2>Display Error</h2>
          <p>{error}</p>
          <button onClick={loadPlayerData} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (playerData?.mode === 'none' || !playerData) {
    return (
      <div className="display-player no-content">
        <div className="no-content-message">
          <h2>No Content Assigned</h2>
          <p>This display has no dashboard or playlist assigned.</p>
          <p className="display-id">Display ID: {displayId}</p>
        </div>
      </div>
    );
  }

  if (playerData.mode === 'dashboard') {
    return (
      <div className="display-player dashboard-mode">
        {renderDashboard(playerData.dashboard)}
      </div>
    );
  }

  if (playerData.mode === 'playlist') {
    const currentItem = playerData.items[currentIndex];
    
    return (
      <div className="display-player playlist-mode">
        {currentItem && renderDashboard({ 
          name: `Dashboard ${currentIndex + 1} of ${playerData.items.length}`,
          layout: currentItem.layout 
        })}
        
        {/* Progress indicator */}
        <div className="playlist-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${((currentItem?.durationSeconds - timeRemaining) / currentItem?.durationSeconds) * 100}%` 
              }}
            ></div>
          </div>
          <div className="progress-info">
            <span className="current-item">{currentIndex + 1} / {playerData.items.length}</span>
            <span className="time-remaining">{timeRemaining}s</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default DisplayPlayer;