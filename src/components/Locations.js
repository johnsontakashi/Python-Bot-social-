import React, { useState } from 'react';
import './Locations.css';

const Locations = () => {
  const [selectedCountry, setSelectedCountry] = useState('Brazil');
  const [selectedState, setSelectedState] = useState('São Paulo');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [filters, setFilters] = useState({
    activeCampaigns: true,
    highPopulation: true,
    federalCapitals: false,
    borderCities: false
  });

  const locations = {
    'Brazil': {
      'São Paulo': [
        { name: 'São Paulo Capital', population: '12.3M', campaigns: 15, status: 'active', isCapital: true, isBorder: false, populationNum: 12300000 },
        { name: 'Campinas', population: '1.2M', campaigns: 8, status: 'active', isCapital: false, isBorder: false, populationNum: 1200000 },
        { name: 'Santos', population: '433K', campaigns: 5, status: 'active', isCapital: false, isBorder: false, populationNum: 433000 },
        { name: 'Ribeirão Preto', population: '703K', campaigns: 6, status: 'active', isCapital: false, isBorder: false, populationNum: 703000 }
      ],
      'Rio de Janeiro': [
        { name: 'Rio de Janeiro Capital', population: '6.7M', campaigns: 12, status: 'active', isCapital: true, isBorder: false, populationNum: 6700000 },
        { name: 'Niterói', population: '515K', campaigns: 4, status: 'active', isCapital: false, isBorder: false, populationNum: 515000 },
        { name: 'Petrópolis', population: '306K', campaigns: 3, status: 'paused', isCapital: false, isBorder: false, populationNum: 306000 },
        { name: 'Volta Redonda', population: '273K', campaigns: 2, status: 'active', isCapital: false, isBorder: true, populationNum: 273000 }
      ],
      'Minas Gerais': [
        { name: 'Belo Horizonte', population: '2.5M', campaigns: 10, status: 'active', isCapital: true, isBorder: false, populationNum: 2500000 },
        { name: 'Uberlândia', population: '699K', campaigns: 5, status: 'active', isCapital: false, isBorder: true, populationNum: 699000 },
        { name: 'Juiz de Fora', population: '573K', campaigns: 4, status: 'active', isCapital: false, isBorder: false, populationNum: 573000 }
      ],
      'Brasília': [
        { name: 'Brasília', population: '3.1M', campaigns: 18, status: 'active', isCapital: true, isBorder: false, populationNum: 3100000 },
        { name: 'Gama', population: '141K', campaigns: 2, status: 'active', isCapital: false, isBorder: false, populationNum: 141000 },
        { name: 'Taguatinga', population: '214K', campaigns: 3, status: 'active', isCapital: false, isBorder: false, populationNum: 214000 }
      ]
    }
  };

  const states = Object.keys(locations[selectedCountry] || {});
  const rawCities = locations[selectedCountry]?.[selectedState] || [];

  const toggleFilter = (filterName) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const cities = rawCities.filter(city => {
    if (filters.activeCampaigns && city.status !== 'active') return false;
    if (filters.highPopulation && city.populationNum < 1000000) return false;
    if (filters.federalCapitals && !city.isCapital) return false;
    if (filters.borderCities && !city.isBorder) return false;
    return true;
  });

  const totalCampaigns = Object.values(locations[selectedCountry] || {})
    .flat()
    .reduce((sum, city) => sum + city.campaigns, 0);

  const activeCities = Object.values(locations[selectedCountry] || {})
    .flat()
    .filter(city => city.status === 'active').length;

  return (
    <div className="locations-container">
      <div className="locations-header">
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-value">{states.length}</div>
            <div className="stat-label">States/Regions</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{activeCities}</div>
            <div className="stat-label">Active Cities</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{totalCampaigns}</div>
            <div className="stat-label">Total Campaigns</div>
          </div>
        </div>

        <div className="header-controls">
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
              List View
            </button>
            <button 
              className={`view-btn ${viewMode === 'map' ? 'active' : ''}`}
              onClick={() => setViewMode('map')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                <line x1="8" y1="2" x2="8" y2="18"></line>
                <line x1="16" y1="6" x2="16" y2="22"></line>
              </svg>
              Map View
            </button>
          </div>
        </div>
      </div>

      <div className="locations-content">
        <div className="locations-sidebar">
          <div className="region-selector">
            <div className="selector-group">
              <label>Country/Region</label>
              <select 
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="location-select"
              >
                <option value="Brazil">Brazil</option>
                <option value="Argentina">Argentina</option>
                <option value="Mexico">Mexico</option>
              </select>
            </div>

            <div className="selector-group">
              <label>State/Province</label>
              <select 
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="location-select"
              >
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="quick-filters">
            <h3>Quick Filters</h3>
            <div className="filter-group">
              <label className="filter-checkbox">
                <input 
                  type="checkbox" 
                  checked={filters.activeCampaigns}
                  onChange={() => toggleFilter('activeCampaigns')}
                />
                <span>Active Campaigns</span>
              </label>
              <label className="filter-checkbox">
                <input 
                  type="checkbox" 
                  checked={filters.highPopulation}
                  onChange={() => toggleFilter('highPopulation')}
                />
                <span>High Population (1M+)</span>
              </label>
              <label className="filter-checkbox">
                <input 
                  type="checkbox" 
                  checked={filters.federalCapitals}
                  onChange={() => toggleFilter('federalCapitals')}
                />
                <span>State Capitals</span>
              </label>
              <label className="filter-checkbox">
                <input 
                  type="checkbox" 
                  checked={filters.borderCities}
                  onChange={() => toggleFilter('borderCities')}
                />
                <span>Border Cities</span>
              </label>
            </div>
          </div>
        </div>

        <div className="locations-main">
          {viewMode === 'list' ? (
            <div className="cities-list">
              <div className="list-header">
                <h3>Cities in {selectedState}</h3>
                <span className="city-count">{cities.length} cities</span>
              </div>
              
              <div className="cities-grid">
                {cities.map((city, index) => (
                  <div key={index} className="city-card">
                    <div className="city-header">
                      <div className="city-info">
                        <h4 className="city-name">{city.name}</h4>
                        <span className={`city-status ${city.status}`}>
                          {city.status}
                        </span>
                      </div>
                      <div className="city-actions">
                        <button className="action-btn" title="View Details">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        </button>
                        <button className="action-btn" title="Edit">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="m18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div className="city-metrics">
                      <div className="metric">
                        <span className="metric-label">Population</span>
                        <span className="metric-value">{city.population}</span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">Campaigns</span>
                        <span className="metric-value">{city.campaigns}</span>
                      </div>
                    </div>

                    <div className="city-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${(city.campaigns / 20) * 100}%` }}
                        ></div>
                      </div>
                      <span className="progress-label">Campaign Coverage</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="map-view">
              <div className="map-container">
                <iframe
                  src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodeURIComponent(selectedState + ', ' + selectedCountry)}&t=&z=8&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${selectedState}, ${selectedCountry}`}
                ></iframe>
                <div className="map-overlay">
                  <div className="map-legend">
                    <h4>Campaign Coverage</h4>
                    <div className="legend-items">
                      <div className="legend-item">
                        <div className="legend-dot active"></div>
                        <span>Active Campaigns</span>
                      </div>
                      <div className="legend-item">
                        <div className="legend-dot paused"></div>
                        <span>Paused Campaigns</span>
                      </div>
                      <div className="legend-item">
                        <div className="legend-dot high-population"></div>
                        <span>High Population Centers</span>
                      </div>
                    </div>
                  </div>
                  <div className="map-stats">
                    <div className="stat-item">
                      <span className="stat-number">{cities.length}</span>
                      <span className="stat-label">Cities</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">{cities.reduce((sum, city) => sum + city.campaigns, 0)}</span>
                      <span className="stat-label">Campaigns</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Locations;