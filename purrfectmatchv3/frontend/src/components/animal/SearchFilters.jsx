import { useState } from 'react';

export default function SearchFilters({ onFilter }) {
  const [show, setShow] = useState(false);
  const [filters, setFilters] = useState({ species: '', gender: '', status: 'AVAILABLE' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ''));
    onFilter(clean);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto 2rem', padding: '0 2rem' }}>
      <button className="btn btn-secondary" onClick={() => setShow(!show)}>
        {show ? '▲' : '▼'} Filters
      </button>
      {show && (
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <select value={filters.species} onChange={(e) => setFilters({...filters, species: e.target.value})}>
            <option value="">All Species</option>
            <option value="DOG">Dogs</option>
            <option value="CAT">Cats</option>
          </select>
          <select value={filters.gender} onChange={(e) => setFilters({...filters, gender: e.target.value})}>
            <option value="">All Genders</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          <button type="submit" className="btn btn-primary">Apply</button>
        </form>
      )}
    </div>
  );
}
