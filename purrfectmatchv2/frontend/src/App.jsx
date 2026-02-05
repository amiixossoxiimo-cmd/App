import { useState, useEffect } from 'react';
import { getAllCats, createCat, deleteCat } from './api';
import './App.css';

function App() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    age: '',
    imageUrl: '',
    species: 'Cat',
    gender: 'Male',
    location: '',
  });

  useEffect(() => {
    loadAnimals();
  }, []);

  const loadAnimals = async () => {
    try {
      setLoading(true);
      const data = await getAllCats();
      setAnimals(data);
      setError(null);
    } catch (err) {
      setError('Failed to load animals. Please try again later.');
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
      setFormData({ 
        name: '', 
        description: '', 
        age: '', 
        imageUrl: '', 
        species: 'Cat',
        gender: 'Male',
        location: '',
      });
      setShowForm(false);
      loadAnimals();
    } catch (err) {
      alert('Failed to add animal. Please try again.');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this animal from adoption?')) {
      try {
        await deleteCat(id);
        loadAnimals();
      } catch (err) {
        alert('Failed to delete animal. Please try again.');
        console.error(err);
      }
    }
  };

  const getSpeciesEmoji = (species) => {
    return species === 'Dog' ? '🐕' : '🐱';
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading animals...</div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Header & Navigation */}
      <header>
        <nav>
          <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
            🐾 AdoptMe
          </a>
          
          <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
            <li><a href="#animals" onClick={(e) => { e.preventDefault(); scrollToSection('animals'); }}>Browse Animals</a></li>
            <li><a href="#how" onClick={(e) => { e.preventDefault(); scrollToSection('how'); }}>How It Works</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
            <li>
              <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : '+ Add Animal'}
              </button>
            </li>
          </ul>

          <div className="mobile-menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            ☰
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Give Them a Second Chance 🐾</h1>
          <p>Connect with loving animals waiting for their forever home. Every adoption saves a life and creates an unbreakable bond.</p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => scrollToSection('animals')}>
              Browse Animals
            </button>
            <button className="btn btn-secondary" onClick={() => scrollToSection('how')}>
              How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Add Animal Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form className="animal-form" onSubmit={handleSubmit}>
              <h2>Add a New Animal for Adoption</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Max"
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
                    placeholder="e.g., 3"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="species">Species *</label>
                  <select
                    id="species"
                    name="species"
                    value={formData.species}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Cat">Cat 🐱</option>
                    <option value="Dog">Dog 🐕</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="gender">Gender *</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Los Angeles, CA"
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
                  placeholder="Tell us about this animal's personality..."
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
                  placeholder="https://example.com/animal.jpg"
                />
              </div>

              <div className="form-buttons">
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Animal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Animals Listing Section */}
      <section className="animals" id="animals">
        <h2 className="section-title">Meet Your New Best Friend 🐶🐱</h2>
        <p className="section-subtitle">Discover loving animals waiting for their forever home</p>

        {error && <div className="error">{error}</div>}

        <div className="animals-grid">
          {animals.length === 0 ? (
            <div className="no-animals">
              <div className="no-animals-icon">🐾</div>
              <h3>No Animals Available Yet</h3>
              <p>Be the first to add an animal for adoption!</p>
              <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                Add First Animal
              </button>
            </div>
          ) : (
            animals.map((animal) => (
              <div key={animal.id} className="animal-card">
                <div className="animal-image-container">
                  {animal.imageUrl ? (
                    <img src={animal.imageUrl} alt={animal.name} className="animal-image" />
                  ) : (
                    <div className="placeholder-image">
                      {getSpeciesEmoji(animal.species)}
                    </div>
                  )}
                </div>
                <div className="animal-info">
                  <h3 className="animal-name">{animal.name}</h3>
                  <div className="animal-details">
                    <span className="detail-badge">
                      {getSpeciesEmoji(animal.species)} {animal.species || 'Cat'}
                    </span>
                    <span className="detail-badge">
                      {animal.age} {animal.age === 1 ? 'year' : 'years'}
                    </span>
                    <span className="detail-badge">
                      {animal.gender || 'Unknown'}
                    </span>
                  </div>
                  {animal.location && (
                    <p className="animal-location">📍 {animal.location}</p>
                  )}
                  {animal.description && (
                    <p className="animal-description">{animal.description}</p>
                  )}
                  <div className="card-actions">
                    <button className="btn btn-primary btn-small">View Profile</button>
                    <button 
                      className="btn-icon-delete" 
                      onClick={() => handleDelete(animal.id)}
                      title="Remove animal"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works" id="how">
        <h2 className="section-title">How Adoption Works</h2>
        <p className="section-subtitle">Four simple steps to welcome your new family member</p>

        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-icon">🔍</div>
            <h3>Search an Animal</h3>
            <p>Browse our verified listings and find the perfect companion that matches your lifestyle.</p>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-icon">🤝</div>
            <h3>Meet the Animal</h3>
            <p>Schedule a meet-and-greet to ensure it's the perfect match for both of you.</p>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-icon">📝</div>
            <h3>Complete Adoption</h3>
            <p>Fill out the adoption paperwork with guidance from our partner shelters.</p>
          </div>

          <div className="step">
            <div className="step-number">4</div>
            <div className="step-icon">❤️</div>
            <h3>Bring Them Home</h3>
            <p>Welcome your new family member home and start your beautiful journey together.</p>
          </div>
        </div>
      </section>

      {/* Why Adopt Section */}
      <section className="why-adopt" id="about">
        <h2 className="section-title">Why Adopt From Us?</h2>
        <p className="section-subtitle">We're committed to making pet adoption safe, transparent, and joyful</p>

        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon">✅</div>
            <h3>Verified Shelters</h3>
            <p>All partner shelters are thoroughly verified to ensure the highest standards of care.</p>
          </div>

          <div className="feature">
            <div className="feature-icon">🏥</div>
            <h3>Health Checked</h3>
            <p>Every animal is vaccinated, neutered/spayed, and comes with complete health records.</p>
          </div>

          <div className="feature">
            <div className="feature-icon">💬</div>
            <h3>Lifetime Support</h3>
            <p>Get ongoing guidance from our team of pet care experts after adoption.</p>
          </div>

          <div className="feature">
            <div className="feature-icon">💕</div>
            <h3>Saving Lives</h3>
            <p>Every adoption saves a life and makes room for another animal in need.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        <h2>Thousands of Animals Are Waiting for a Home 🐾</h2>
        <p>Don't wait. Your perfect companion is out there looking for you right now. Make a difference today.</p>
        <button className="btn btn-light" onClick={() => scrollToSection('animals')}>
          Start Adopting Today
        </button>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h3>🐾 AdoptMe</h3>
            <p>We're dedicated to connecting loving families with animals in need. Every adoption makes a difference.</p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
              <li><a href="#animals" onClick={(e) => { e.preventDefault(); scrollToSection('animals'); }}>Browse Animals</a></li>
              <li><a href="#how" onClick={(e) => { e.preventDefault(); scrollToSection('how'); }}>How It Works</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About Us</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Connect With Us</h3>
            <div className="social-icons">
              <a href="#facebook">📘</a>
              <a href="#instagram">📷</a>
              <a href="#twitter">🐦</a>
              <a href="#youtube">▶️</a>
            </div>
            <p style={{ marginTop: '1.5rem' }}>
              📧 contact@adoptme.com<br />
              📞 1-800-ADOPT-ME
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 AdoptMe. All rights reserved. Built with ❤️ for animals in need.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
