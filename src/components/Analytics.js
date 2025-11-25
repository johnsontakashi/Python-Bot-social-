import React from 'react';
import './Analytics.css';
import AnalyticsHeader from './AnalyticsHeader';
import AnalyticsSidebar from './AnalyticsSidebar';
import AnalyticsContent from './AnalyticsContent';

const Analytics = () => {
  return (
    <div className="analytics-view">
      <AnalyticsHeader />
      <div className="analytics-body">
        <AnalyticsSidebar />
        <AnalyticsContent />
      </div>
    </div>
  );
};

export default Analytics;