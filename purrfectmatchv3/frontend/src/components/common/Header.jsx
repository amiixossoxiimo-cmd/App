import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

export default function Header() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <nav className="nav-container">
        <Link to="/" className="logo">
          🐾 PurrfectMatch V3
        </Link>

        <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
          <li><Link to="/browse" onClick={() => setMobileMenuOpen(false)}>Browse Animals</Link></li>
          
          {user ? (
            <>
              <li><Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link></li>
              {isAdmin && (
                <li><Link to="/admin" onClick={() => setMobileMenuOpen(false)}>Admin</Link></li>
              )}
              <li className="user-menu">
                <span className="user-name">👤 {user.firstName}</span>
                <button onClick={handleLogout} className="btn btn-secondary btn-small">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link></li>
              <li>
                <Link 
                  to="/register" 
                  className="btn btn-primary btn-small"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="mobile-menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          ☰
        </div>
      </nav>
    </header>
  );
}
