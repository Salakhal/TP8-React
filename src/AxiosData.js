import { useState, useEffect } from 'react';
import axios from 'axios';
import './AxiosData.css';

function AxiosData() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    setError(null);
    
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="component-card">
        <div className="card-header axios-header">
          <h2>⚡ Axios</h2>
          <span className="method-badge axios-method">Librairie externe</span>
        </div>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Chargement des utilisateurs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="component-card">
        <div className="card-header axios-header">
          <h2>⚡ Axios</h2>
          <span className="method-badge axios-method">Librairie externe</span>
        </div>
        <div className="error-container">
          <div className="error-icon">😢</div>
          <h3>Une erreur est survenue</h3>
          <p>{error}</p>
          <button onClick={fetchUsers} className="retry-button">
            🔄 Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="component-card">
      <div className="card-header axios-header">
        <div>
          <h2>⚡ Axios</h2>
          <p className="header-subtitle">Requêtes HTTP simplifiées</p>
        </div>
        <span className="method-badge axios-method">Librairie externe</span>
      </div>

      <div className="search-section">
        <button onClick={fetchUsers} className="reload-button">
          🔄 Recharger les utilisateurs
        </button>
      </div>

      <div className="stats">
        <span>👥 {users.length} utilisateurs</span>
      </div>

      <div className="users-list">
        {users.map(user => (
          <div 
            key={user.id} 
            className={`user-item ${expandedUser === user.id ? 'expanded' : ''}`}
            onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}
          >
            <div className="user-header">
              <div className="user-avatar">
                <div className="avatar-circle">
                  {user.name.charAt(0)}{user.name.split(' ')[1]?.charAt(0) || ''}
                </div>
              </div>
              <div className="user-info">
                <h3 className="user-name">{user.name}</h3>
                <p className="user-email">✉️ {user.email}</p>
                <p className="user-phone">📞 {user.phone}</p>
              </div>
              <div className="expand-icon">
                {expandedUser === user.id ? '▼' : '▶'}
              </div>
            </div>
            
            {expandedUser === user.id && (
              <div className="user-details">
                <div className="detail-row">
                  <span className="detail-label">🏢 Entreprise:</span>
                  <span>{user.company.name}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">📍 Adresse:</span>
                  <span>{user.address.street}, {user.address.suite}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">🏙️ Ville:</span>
                  <span>{user.address.city}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">🌐 Site web:</span>
                  <span>{user.website}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">💼 Slogan:</span>
                  <span>"{user.company.catchPhrase}"</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AxiosData;