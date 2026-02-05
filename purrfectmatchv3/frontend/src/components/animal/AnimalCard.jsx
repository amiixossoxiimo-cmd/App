import { Link } from 'react-router-dom';
export default function AnimalCard({ animal }) {
  return (
    <div className="animal-card">
      <div className="animal-image-container">
        {animal.imageUrl ? <img src={animal.imageUrl} alt={animal.name} className="animal-image" /> : 
          <div className="placeholder-image">{animal.species === 'DOG' ? '🐕' : '🐱'}</div>}
      </div>
      <div className="animal-info">
        <h3 className="animal-name">{animal.name}</h3>
        <div className="animal-details">
          <span className="detail-badge">{animal.species}</span>
          <span className="detail-badge">{animal.age} yr</span>
        </div>
        <Link to={`/animals/${animal.id}`} className="btn btn-primary btn-small">View</Link>
      </div>
    </div>
  );
}
