export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>🐾 PurrfectMatch V3</h3>
          <p>Professional animal adoption platform with advanced features including authentication, role-based access, and comprehensive animal management.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/browse">Browse Animals</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Features</h3>
          <ul className="footer-links">
            <li>User Authentication</li>
            <li>Advanced Search & Filters</li>
            <li>Admin Dashboard</li>
            <li>Role-Based Access Control</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Connect With Us</h3>
          <div className="social-icons">
            <a href="#facebook">📘</a>
            <a href="#instagram">📷</a>
            <a href="#twitter">🐦</a>
          </div>
          <p style={{ marginTop: '1.5rem' }}>
            📧 contact@purrfectmatch.com<br />
            📞 1-800-ADOPT-ME
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 PurrfectMatch V3. All rights reserved. Built with ❤️ for animals in need.</p>
      </div>
    </footer>
  );
}
