import { useEffect, useState } from 'react';
import { animalService } from '../../services/api';
import AnimalCard from '../animal/AnimalCard';
export default function Browse() {
  const [animals, setAnimals] = useState([]);
  useEffect(() => { animalService.getAll().then(r => setAnimals(r.data)).catch(e => {}); }, []);
  return <div style={{padding:'2rem'}}><h1 className="section-title">Browse Animals</h1><div className="animals-grid">{animals.map(a => <AnimalCard key={a.id} animal={a} />)}</div></div>;
}
