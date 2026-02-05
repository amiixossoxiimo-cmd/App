import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Welcome, {user.firstName}! 👋</h1>
        
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon">👤</div>
            <h3>Profile Information</h3>
            <div className="profile-info">
              <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> <span className="role-badge">{user.role}</span></p>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🐾</div>
            <h3>Browse Animals</h3>
            <p>Find your perfect companion from our available animals.</p>
            <Link to="/browse" className="btn btn-primary">View All Animals</Link>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🔍</div>
            <h3>Advanced Search</h3>
            <p>Use filters to find animals that match your preferences.</p>
            <Link to="/browse" className="btn btn-secondary">Start Searching</Link>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">📧</div>
            <h3>Contact Shelters</h3>
            <p>Get in touch with shelters to learn more about animals.</p>
            <button className="btn btn-secondary">View Contact Info</button>
          </div>
        </div>

        <div className="dashboard-info">
          <h2>Getting Started</h2>
          <div className="info-steps">
            <div className="info-step">
              <span className="step-number">1</span>
              <div>
                <h4>Browse Available Animals</h4>
                <p>Explore our collection of animals waiting for homes</p>
              </div>
            </div>
            <div className="info-step">
              <span className="step-number">2</span>
              <div>
                <h4>Use Advanced Filters</h4>
                <p>Filter by species, age, size, and compatibility</p>
              </div>
            </div>
            <div className="info-step">
              <span className="step-number">3</span>
              <div>
                <h4>Contact the Shelter</h4>
                <p>Reach out to arrange a meeting with your chosen animal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
