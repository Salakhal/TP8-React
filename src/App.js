import { useState } from 'react';
import FetchData from './FetchData';
import AxiosData from './AxiosData';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState('both');

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🌸</span>
            <h1>API Explorer</h1>
          </div>
          <p className="subtitle">
            Découvrez la différence entre <strong className="fetch-badge">Fetch</strong> et{' '}
            <strong className="axios-badge">Axios</strong>
          </p>
        </div>
      </header>

      <div className="navigation">
        <button 
          className={`nav-btn ${activeView === 'both' ? 'active' : ''}`}
          onClick={() => setActiveView('both')}
        >
          <span>📊</span> Vue Complète
        </button>
        <button 
          className={`nav-btn ${activeView === 'fetch' ? 'active' : ''}`}
          onClick={() => setActiveView('fetch')}
        >
          <span>🔄</span> Fetch API
        </button>
        <button 
          className={`nav-btn ${activeView === 'axios' ? 'active' : ''}`}
          onClick={() => setActiveView('axios')}
        >
          <span>⚡</span> Axios
        </button>
      </div>

      <div className="main-container">
        {activeView !== 'axios' && (
          <div className="component-wrapper">
            <FetchData />
          </div>
        )}
        
        {activeView !== 'fetch' && (
          <div className="component-wrapper">
            <AxiosData />
          </div>
        )}
      </div>

      <footer className="app-footer">
        <p>✨ TP8 - Consommation d'API avec React • Données fournies par JSONPlaceholder</p>
      </footer>
    </div>
  );
}

export default App;