import { useState, useEffect } from 'react';
import './FetchData.css';

function FetchData() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    setLoading(true);
    setError(null);
    
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        if (!response.ok) throw new Error('Erreur de chargement');
        return response.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="component-card">
        <div className="card-header fetch-header">
          <h2>🔄 Fetch API</h2>
          <span className="method-badge">Méthode Native</span>
        </div>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Chargement des articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="component-card">
        <div className="card-header fetch-header">
          <h2>🔄 Fetch API</h2>
          <span className="method-badge">Méthode Native</span>
        </div>
        <div className="error-container">
          <div className="error-icon">😢</div>
          <h3>Une erreur est survenue</h3>
          <p>{error}</p>
          <button onClick={fetchPosts} className="retry-button">
            🔄 Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="component-card">
      <div className="card-header fetch-header">
        <div>
          <h2>🔄 Fetch API</h2>
          <p className="header-subtitle">Requêtes HTTP natives du navigateur</p>
        </div>
        <span className="method-badge">Méthode Native</span>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="🔍 Rechercher un article..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={fetchPosts} className="reload-button">
          🔄 Recharger
        </button>
      </div>

      <div className="stats">
        <span>📝 {filteredPosts.length} / {posts.length} articles</span>
      </div>

      <div className="posts-list">
        {filteredPosts.slice(0, 8).map(post => (
          <article key={post.id} className="post-item">
            <div className="post-number">#{post.id}</div>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-excerpt">{post.body.substring(0, 120)}...</p>
            <div className="post-footer">
              <span className="read-more">Lire l'article →</span>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="no-results">
          <p>Aucun article trouvé pour "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}

export default FetchData;