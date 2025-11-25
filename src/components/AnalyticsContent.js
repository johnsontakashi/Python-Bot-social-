import React from 'react';
import './AnalyticsContent.css';
import TimeSeriesChart from './TimeSeriesChart';
import SentimentTable from './SentimentTable';
import ProportionChart from './ProportionChart';

const AnalyticsContent = () => {
  return (
    <div className="analytics-content">
      <div className="content-main">
        <div className="chart-section">
          <TimeSeriesChart />
        </div>
        <div className="table-section">
          <SentimentTable />
        </div>
      </div>
      <div className="content-sidebar">
        <ProportionChart />
      </div>
    </div>
  );
};

export default AnalyticsContent;