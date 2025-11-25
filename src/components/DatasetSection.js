import React from 'react';
import './DatasetSection.css';
import DatasetItem from './DatasetItem';

const DatasetSection = ({ title, datasets }) => {
  return (
    <div className="dataset-section">
      <h2 className="section-title">{title}</h2>
      <div className="dataset-list">
        {datasets.map((dataset, index) => (
          <DatasetItem key={index} dataset={dataset} />
        ))}
      </div>
    </div>
  );
};

export default DatasetSection;