import React from 'react';
import './Dashboard.css';
import DatasetSection from './DatasetSection';

const Dashboard = () => {
  const socialMediaDatasets = [
    {
      name: 'Select all',
      subtitle: 'Combined results from all social media datasets in this project',
      hitsYesterday: '31.6k',
      hitsToday: '35.6k',
      color: '#4a90e2'
    },
    {
      name: 'Aborto',
      subtitle: 'Abortion-related social media content',
      hitsYesterday: '426',
      hitsToday: '410',
      color: '#e74c3c'
    },
    {
      name: 'Aedes Aegypti, Zika, Dengue e Chikungunya',
      subtitle: 'Disease vector and epidemic content',
      hitsYesterday: '24.1k',
      hitsToday: '28.7k',
      color: '#f39c12'
    },
    {
      name: 'H1N1',
      subtitle: 'H1N1 influenza pandemic content',
      hitsYesterday: '329',
      hitsToday: '346',
      color: '#9b59b6'
    },
    {
      name: 'Ministério da Saúde',
      subtitle: 'Brazilian Ministry of Health content',
      hitsYesterday: '4,728',
      hitsToday: '5,322',
      color: '#2ecc71'
    },
    {
      name: 'Ricardo José Magalhães Barros (Ministro da Saúde)',
      subtitle: 'Former Health Minister content',
      hitsYesterday: '1,943',
      hitsToday: '834',
      color: '#34495e'
    }
  ];

  const empresaBrasilDatasets = [
    {
      name: 'EBC General Content',
      subtitle: 'General communication content from EBC',
      hitsYesterday: '2,156',
      hitsToday: '2,344',
      color: '#16a085'
    },
    {
      name: 'TV Brasil',
      subtitle: 'TV Brasil programming and news',
      hitsYesterday: '1,234',
      hitsToday: '1,567',
      color: '#8e44ad'
    },
    {
      name: 'Agência Brasil',
      subtitle: 'Agência Brasil news articles',
      hitsYesterday: '876',
      hitsToday: '923',
      color: '#27ae60'
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <DatasetSection
          title="Social Media Datasets"
          datasets={socialMediaDatasets}
        />
        <DatasetSection
          title="Empresa Brasil De Comunicação Datasets"
          datasets={empresaBrasilDatasets}
        />
      </div>
    </div>
  );
};

export default Dashboard;