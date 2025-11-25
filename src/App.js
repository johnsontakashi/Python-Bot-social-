import React, { useState } from 'react';
import './App.css';
import MainSidebar from './components/MainSidebar';
import TopNavigation from './components/TopNavigation';
import Projects from './components/Projects';
import Datasets from './components/Datasets';
import Accounts from './components/Accounts';
import Locations from './components/Locations';
import Events from './components/Events';
import Alerts from './components/Alerts';
import Settings from './components/Settings';
import DashboardBuilder from './components/DashboardBuilder';
import DataExplorer from './components/DataExplorer';
import Displays from './components/Displays';
import Playlists from './components/Playlists';
import Streams from './components/Streams';
import SentimentColors from './components/SentimentColors';

function App() {
  const [currentView, setCurrentView] = useState('projects');
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [currentMode, setCurrentMode] = useState('main'); // 'main', 'builder', 'explorer'

  const renderMainView = () => {
    switch (currentView) {
      case 'projects':
        return <Projects onCreateDashboard={(dataset) => {
          setSelectedDataset(dataset);
          setCurrentMode('builder');
        }} />;
      case 'datasets':
        return <Datasets onSelectDataset={(dataset) => {
          setSelectedDataset(dataset);
          setCurrentMode('explorer');
        }} />;
      case 'accounts':
        return <Accounts />;
      case 'locations':
        return <Locations />;
      case 'events':
        return <Events />;
      case 'alerts':
        return <Alerts />;
      case 'displays':
        return <Displays />;
      case 'playlists':
        return <Playlists />;
      case 'streams':
        return <Streams />;
      case 'sentimentcolors':
        return <SentimentColors />;
      case 'settings':
        return <Settings />;
      default:
        return <Projects />;
    }
  };

  const renderCurrentView = () => {
    switch (currentMode) {
      case 'builder':
        return (
          <DashboardBuilder 
            dataset={selectedDataset}
            onBack={() => setCurrentMode('main')}
          />
        );
      case 'explorer':
        return (
          <DataExplorer 
            dataset={selectedDataset}
            onBack={() => setCurrentMode('main')}
            onCreateDashboard={() => setCurrentMode('builder')}
          />
        );
      case 'main':
      default:
        return (
          <div className="main-layout">
            <MainSidebar 
              currentView={currentView}
              onViewChange={setCurrentView}
            />
            <div className="content-area">
              <TopNavigation currentView={currentView} />
              <main className="main-content">
                {renderMainView()}
              </main>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="app">
      {renderCurrentView()}
    </div>
  );
}

export default App;