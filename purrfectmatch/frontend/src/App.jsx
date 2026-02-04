import { useState, useEffect } from 'react';
import { getAllCats, createCat, deleteCat } from './api';
import './App.css';

function App() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    age: '',
    imageUrl: '',
  });

  useEffect(() => {
    loadCats();
  }, []);

  const loadCats = async () => {
    try {
      setLoading(true);
      const data = await getAllCats();
      setCats(data);
      setError(null);
    } catch (err) {
      setError('Failed to load cats. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCat({
        ...formData,
        age: parseInt(formData.age),
      });
      setFormData({ name: '', description: '', age: '', imageUrl: '' });
      setShowForm(false);
      loadCats();
    } catch (err) {
      alert('Failed to add cat. Please try again.');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this cat from adoption?')) {
      try {
        await deleteCat(id);
        loadCats();
      } catch (err) {
        alert('Failed to delete cat. Please try again.');
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading cats...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <h1>🐱 PurrfectMatch</h1>
        <p className="subtitle">Find Your Purrfect Companion</p>
      </header>

      <button
        className="add-button"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Cancel' : '+ Add Cat for Adoption'}
      </button>

      {showForm && (
        <form className="cat-form" onSubmit={handleSubmit}>
          <h2>Add a New Cat</h2>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age (years) *</label>
            <input
              type="number"
              id="age"
              name="age"
              min="0"
              max="30"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/cat.jpg"
            />
          </div>
          <button type="submit" className="submit-button">
            Add Cat
          </button>
        </form>
      )}

      {error && <div className="error">{error}</div>}

      <div className="cats-grid">
        {cats.length === 0 ? (
          <div className="no-cats">
            <p>No cats available for adoption yet.</p>
            <p>Be the first to add one!</p>
          </div>
        ) : (
          cats.map((cat) => (
            <div key={cat.id} className="cat-card">
              <div className="cat-image">
                {cat.imageUrl ? (
                  <img src={cat.imageUrl} alt={cat.name} />
                ) : (
                  <div className="placeholder-image">🐱</div>
                )}
              </div>
              <div className="cat-info">
                <h3>{cat.name}</h3>
                <p className="cat-age">{cat.age} year{cat.age !== 1 ? 's' : ''} old</p>
                {cat.description && (
                  <p className="cat-description">{cat.description}</p>
                )}
                <button
                  className="delete-button"
                  onClick={() => handleDelete(cat.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
