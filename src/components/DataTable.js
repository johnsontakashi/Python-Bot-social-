import React from 'react';
import './DataTable.css';
import AnalyticsHeader from './AnalyticsHeader';
import AnalyticsSidebar from './AnalyticsSidebar';
import DataTableContent from './DataTableContent';

const DataTable = () => {
  return (
    <div className="data-table-view">
      <AnalyticsHeader />
      <div className="data-table-body">
        <AnalyticsSidebar />
        <DataTableContent />
      </div>
    </div>
  );
};

export default DataTable;