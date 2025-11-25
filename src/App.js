import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'analytics':
        return <Analytics />;
      case 'dashboard':
      default:
        return (
          <div className="dashboard-layout">
            <Sidebar />
            <Dashboard />
          </div>
        );
    }
  };

  return (
    <div className="app">
      <div className="view-selector">
        <button 
          className={`view-button ${currentView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentView('dashboard')}
        >
          📊 Datasets Dashboard
        </button>
        <button 
          className={`view-button ${currentView === 'analytics' ? 'active' : ''}`}
          onClick={() => setCurrentView('analytics')}
        >
          📈 Analytics View
        </button>
      </div>
      {renderCurrentView()}
    </div>
  );
}

export default App;