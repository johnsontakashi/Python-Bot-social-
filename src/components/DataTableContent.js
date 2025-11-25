import React, { useState } from 'react';
import './DataTableContent.css';

const DataTableContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1000);
  const totalPages = 23;

  const sampleData = [
    {
      id: 1,
      avatar: '👤',
      timestamp: '11/04/2016 15:10:09',
      source: 'Tweet',
      username: '@paulotechsecret',
      text: 'Just discovered this amazing new tech stack! Really impressed with the performance improvements. Check it out: https://example.com/tech #innovation',
      hasUrl: true,
      language: 'Portuguese',
      location: 'Rio de Janeiro, Brazil',
      likes: 336,
      shares: 577,
      comments: 521,
      sentiment: 'Positive',
      gender: 'Male',
      ageRange: '25-34',
      relationship: 'Single',
      inDataset: 'Yes'
    },
    {
      id: 2,
      avatar: '👩',
      timestamp: '11/04/2016 14:45:32',
      source: 'Tweet',
      username: '@mariasilva2016',
      text: 'Not happy with the recent changes in government policy. This affects everyone and we need to speak up about it. #politics #change',
      hasUrl: false,
      language: 'Portuguese',
      location: 'São Paulo, Brazil',
      likes: 89,
      shares: 156,
      comments: 234,
      sentiment: 'Negative',
      gender: 'Female',
      ageRange: '35-44',
      relationship: 'Married',
      inDataset: 'Yes'
    },
    {
      id: 3,
      avatar: '👨',
      timestamp: '11/04/2016 14:30:18',
      source: 'Tweet',
      username: '@joaoanalytics',
      text: 'Looking at the data from yesterday. Numbers seem stable across all metrics. Nothing particularly exciting to report today.',
      hasUrl: false,
      language: 'Portuguese',
      location: 'Brasília, Brazil',
      likes: 12,
      shares: 8,
      comments: 3,
      sentiment: 'Neutral',
      gender: 'Male',
      ageRange: '45-54',
      relationship: 'Unknown',
      inDataset: 'Yes'
    },
    {
      id: 4,
      avatar: '👩',
      timestamp: '11/04/2016 14:15:41',
      source: 'Tweet',
      username: '@anacarvalho',
      text: 'Beautiful sunset today in Copacabana! Perfect weather for a beach walk. Life is good ☀️🏖️ @friend1 @friend2',
      hasUrl: false,
      language: 'Portuguese',
      location: 'Rio de Janeiro, Brazil',
      likes: 445,
      shares: 67,
      comments: 89,
      sentiment: 'Positive',
      gender: 'Female',
      ageRange: '18-24',
      relationship: 'In relationship',
      inDataset: 'Yes'
    },
    {
      id: 5,
      avatar: '👤',
      timestamp: '11/04/2016 13:58:15',
      source: 'Tweet',
      username: '@techbrasil',
      text: 'Server downtime affecting multiple services. Investigation ongoing. Will provide updates as we learn more about the root cause.',
      hasUrl: false,
      language: 'Portuguese',
      location: 'Unknown',
      likes: 78,
      shares: 234,
      comments: 156,
      sentiment: 'Negative',
      gender: 'Unknown',
      ageRange: 'Unknown',
      relationship: 'Unknown',
      inDataset: 'Yes'
    },
    {
      id: 6,
      avatar: '👨',
      timestamp: '11/04/2016 13:42:07',
      source: 'Tweet',
      username: '@carlosm_dev',
      text: 'Working on a new project using React and Node.js. Documentation is getting better but still some gaps. Overall progress is good.',
      hasUrl: false,
      language: 'Portuguese',
      location: 'Belo Horizonte, Brazil',
      likes: 156,
      shares: 89,
      comments: 45,
      sentiment: 'Neutral',
      gender: 'Male',
      ageRange: '25-34',
      relationship: 'Single',
      inDataset: 'Yes'
    }
  ];

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getSentimentClass = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'sentiment-positive';
      case 'negative':
        return 'sentiment-negative';
      case 'neutral':
      default:
        return 'sentiment-neutral';
    }
  };

  return (
    <div className="data-table-content">
      <div className="table-controls">
        <div className="pagination-controls">
          <button 
            className="pagination-button" 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>
          
          <span className="page-info">Page {currentPage} of {totalPages}</span>
          
          <button 
            className="pagination-button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        </div>
        
        <div className="page-size-selector">
          <span className="selector-label">Show:</span>
          <select 
            value={pageSize}
            onChange={(e) => setPageSize(parseInt(e.target.value))}
            className="page-size-select"
          >
            <option value={100}>100</option>
            <option value={500}>500</option>
            <option value={1000}>1000</option>
            <option value={2000}>2000</option>
          </select>
        </div>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr className="table-header">
              <th className="col-avatar"></th>
              <th className="col-timestamp">Timestamp</th>
              <th className="col-source">Source</th>
              <th className="col-username">Username</th>
              <th className="col-text">Content</th>
              <th className="col-url">URL</th>
              <th className="col-language">Language</th>
              <th className="col-location">Location</th>
              <th className="col-likes">Likes</th>
              <th className="col-shares">Shares</th>
              <th className="col-comments">Comments</th>
              <th className="col-sentiment">Sentiment</th>
              <th className="col-gender">Gender</th>
              <th className="col-age">Age</th>
              <th className="col-relationship">Relationship</th>
              <th className="col-dataset">In Dataset</th>
              <th className="col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((row, index) => (
              <tr key={row.id} className={`table-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                <td className="col-avatar">
                  <div className="avatar">{row.avatar}</div>
                </td>
                <td className="col-timestamp">{row.timestamp}</td>
                <td className="col-source">{row.source}</td>
                <td className="col-username">{row.username}</td>
                <td className="col-text">
                  <div className="text-content">{row.text}</div>
                </td>
                <td className="col-url">
                  {row.hasUrl && (
                    <button className="url-button">Open URL</button>
                  )}
                </td>
                <td className="col-language">{row.language}</td>
                <td className="col-location">{row.location}</td>
                <td className="col-likes">{row.likes.toLocaleString()}</td>
                <td className="col-shares">{row.shares.toLocaleString()}</td>
                <td className="col-comments">{row.comments.toLocaleString()}</td>
                <td className="col-sentiment">
                  <span className={`sentiment-badge ${getSentimentClass(row.sentiment)}`}>
                    {row.sentiment}
                  </span>
                </td>
                <td className="col-gender">{row.gender}</td>
                <td className="col-age">{row.ageRange}</td>
                <td className="col-relationship">{row.relationship}</td>
                <td className="col-dataset">{row.inDataset}</td>
                <td className="col-actions">
                  <div className="action-buttons">
                    <button className="action-btn" title="View Details">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                    <button className="action-btn" title="Edit">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="m18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button className="action-btn delete" title="Delete">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3,6 5,6 21,6"></polyline>
                        <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTableContent;