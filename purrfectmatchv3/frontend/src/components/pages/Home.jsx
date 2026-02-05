import { Link } from 'react-router-dom';
export default function Home() {
  return <div><section className="hero"><div className="hero-content"><h1>Give Them a Second Chance 🐾</h1><p>Professional adoption platform</p><div className="hero-buttons"><Link to="/browse" className="btn btn-primary">Browse</Link><Link to="/register" className="btn btn-secondary">Register</Link></div></div></section></div>;
}
