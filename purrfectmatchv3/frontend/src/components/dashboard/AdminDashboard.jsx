import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { animalService } from '../../services/api';
import AnimalForm from '../animal/AnimalForm';
import AnimalCard from '../animal/AnimalCard';

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  
  const [stats, setStats] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    if (editId) {
      loadAnimalForEdit(editId);
    }
  }, [editId]);

  const loadDashboardData = async () => {
    try {
      const [statsRes, animalsRes] = await Promise.all([
        animalService.getStats(),
        animalService.getAll()
      ]);
      setStats(statsRes.data);
      setAnimals(animalsRes.data);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAnimalForEdit = async (id) => {
    try {
      const response = await animalService.getById(id);
      setEditingAnimal(response.data);
      setShowForm(true);
    } catch (error) {
      console.error('Error loading animal:', error);
    }
  };

  const handleAnimalSaved = () => {
    setShowForm(false);
    setEditingAnimal(null);
    navigate('/admin');
    loadDashboardData();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this animal?')) {
      try {
        await animalService.delete(id);
        loadDashboardData();
      } catch (error) {
        alert('Failed to delete animal');
      }
    }
  };

  if (loading) {
    return <div className="loading-container"><div className="loading">Loading dashboard...</div></div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard 🛠️</h1>
        <p>Welcome back, {user.firstName}!</p>
      </div>

      {/* Statistics */}
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>Total Animals</h3>
              <p className="stat-number">{stats.total}</p>
            </div>
          </div>
          
          <div className="stat-card stat-available">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>Available</h3>
              <p className="stat-number">{stats.available}</p>
            </div>
          </div>
          
          <div className="stat-card stat-pending">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <h3>Pending</h3>
              <p className="stat-number">{stats.pending}</p>
            </div>
          </div>
          
          <div className="stat-card stat-adopted">
            <div className="stat-icon">❤️</div>
            <div className="stat-info">
              <h3>Adopted</h3>
              <p className="stat-number">{stats.adopted}</p>
            </div>
          </div>
        </div>
      )}

      {/* Add Animal Button */}
      <div className="admin-actions">
        <button 
          className="btn btn-primary btn-large"
          onClick={() => {
            setEditingAnimal(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? '❌ Cancel' : '+ Add New Animal'}
        </button>
      </div>

      {/* Animal Form */}
      {showForm && (
        <div className="form-container">
          <AnimalForm 
            animal={editingAnimal} 
            onSave={handleAnimalSaved}
            onCancel={() => {
              setShowForm(false);
              setEditingAnimal(null);
              navigate('/admin');
            }}
          />
        </div>
      )}

      {/* Animals List */}
      <div className="admin-animals-section">
        <h2>All Animals ({animals.length})</h2>
        <div className="animals-grid">
          {animals.map(animal => (
            <div key={animal.id} className="admin-animal-card">
              <AnimalCard animal={animal} />
              <div className="admin-card-actions">
                <button 
                  className="btn btn-secondary btn-small"
                  onClick={() => {
                    setEditingAnimal(animal);
                    setShowForm(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  ✏️ Edit
                </button>
                <button 
                  className="btn btn-danger btn-small"
                  onClick={() => handleDelete(animal.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
