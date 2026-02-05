import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { animalService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function AnimalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAnimal();
  }, [id]);

  const loadAnimal = async () => {
    try {
      const response = await animalService.getById(id);
      setAnimal(response.data);
    } catch (err) {
      setError('Animal not found');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${animal.name}?`)) {
      try {
        await animalService.delete(id);
        navigate('/browse');
      } catch (err) {
        alert('Failed to delete animal');
      }
    }
  };

  const getSpeciesEmoji = (species) => {
    switch(species) {
      case 'DOG': return '🐕';
      case 'CAT': return '🐱';
      default: return '🐾';
    }
  };

  if (loading) return <div className="loading-container"><div className="loading">Loading...</div></div>;
  if (error) return <div className="error-page"><h2>{error}</h2><Link to="/browse">Back to Browse</Link></div>;
  if (!animal) return null;

  return (
    <div className="animal-detail-page">
      <div className="detail-container">
        <div className="detail-header">
          <button onClick={() => navigate(-1)} className="btn-back">← Back</button>
          {isAdmin && (
            <div className="admin-actions">
              <Link to={`/admin?edit=${animal.id}`} className="btn btn-secondary btn-small">
                Edit
              </Link>
              <button onClick={handleDelete} className="btn btn-danger btn-small">
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="detail-content">
          <div className="detail-image-section">
            {animal.imageUrl ? (
              <img src={animal.imageUrl} alt={animal.name} className="detail-image" />
            ) : (
              <div className="detail-placeholder">
                <span className="placeholder-emoji">{getSpeciesEmoji(animal.species)}</span>
              </div>
            )}
          </div>

          <div className="detail-info-section">
            <div className="detail-header-info">
              <h1 className="detail-name">{animal.name}</h1>
              <span className={`status-badge status-${animal.status?.toLowerCase()}`}>
                {animal.status}
              </span>
            </div>

            <div className="detail-badges">
              <span className="badge">{getSpeciesEmoji(animal.species)} {animal.species}</span>
              {animal.breed && <span className="badge">🏷️ {animal.breed}</span>}
              {animal.age && <span className="badge">📅 {animal.age} year{animal.age !== 1 ? 's' : ''}</span>}
              {animal.gender && <span className="badge">⚥ {animal.gender}</span>}
              {animal.size && <span className="badge">📏 {animal.size}</span>}
              {animal.weight && <span className="badge">⚖️ {animal.weight} kg</span>}
            </div>

            {animal.location && (
              <p className="detail-location">📍 {animal.location}</p>
            )}

            {animal.description && (
              <div className="detail-section">
                <h3>About {animal.name}</h3>
                <p>{animal.description}</p>
              </div>
            )}

            {animal.personalityTraits && (
              <div className="detail-section">
                <h3>Personality</h3>
                <p>{animal.personalityTraits}</p>
              </div>
            )}

            <div className="detail-section">
              <h3>Compatibility</h3>
              <div className="compatibility-grid">
                <div className={`compatibility-item ${animal.goodWithKids ? 'yes' : 'no'}`}>
                  <span className="compatibility-icon">{animal.goodWithKids ? '✅' : '❌'}</span>
                  <span>Good with Kids</span>
                </div>
                <div className={`compatibility-item ${animal.goodWithDogs ? 'yes' : 'no'}`}>
                  <span className="compatibility-icon">{animal.goodWithDogs ? '✅' : '❌'}</span>
                  <span>Good with Dogs</span>
                </div>
                <div className={`compatibility-item ${animal.goodWithCats ? 'yes' : 'no'}`}>
                  <span className="compatibility-icon">{animal.goodWithCats ? '✅' : '❌'}</span>
                  <span>Good with Cats</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Additional Information</h3>
              <div className="info-grid">
                {animal.energyLevel && (
                  <div className="info-item">
                    <strong>Energy Level:</strong> {animal.energyLevel}
                  </div>
                )}
                {animal.color && (
                  <div className="info-item">
                    <strong>Color:</strong> {animal.color}
                  </div>
                )}
                <div className="info-item">
                  <strong>Vaccinated:</strong> {animal.vaccinationStatus ? '✅ Yes' : '❌ No'}
                </div>
                <div className="info-item">
                  <strong>Spayed/Neutered:</strong> {animal.spayedNeutered ? '✅ Yes' : '❌ No'}
                </div>
                {animal.adoptionFee && (
                  <div className="info-item">
                    <strong>Adoption Fee:</strong> ${animal.adoptionFee}
                  </div>
                )}
              </div>
            </div>

            {animal.specialNeeds && (
              <div className="detail-section">
                <h3>Special Needs</h3>
                <p className="special-needs">{animal.specialNeeds}</p>
              </div>
            )}

            {animal.status === 'AVAILABLE' && (
              <div className="detail-actions">
                <button className="btn btn-primary btn-large">
                  Contact About {animal.name}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
