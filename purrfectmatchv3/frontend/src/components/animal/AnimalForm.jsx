import { useState, useEffect } from 'react';
import { animalService } from '../../services/api';

export default function AnimalForm({ animal, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    species: 'DOG',
    breed: '',
    age: '',
    gender: 'MALE',
    size: 'MEDIUM',
    weight: '',
    color: '',
    location: '',
    description: '',
    personalityTraits: '',
    goodWithKids: false,
    goodWithDogs: false,
    goodWithCats: false,
    energyLevel: 'MEDIUM',
    specialNeeds: '',
    vaccinationStatus: false,
    spayedNeutered: false,
    adoptionFee: '',
    status: 'AVAILABLE',
    imageUrl: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (animal) {
      setFormData({
        name: animal.name || '',
        species: animal.species || 'DOG',
        breed: animal.breed || '',
        age: animal.age || '',
        gender: animal.gender || 'MALE',
        size: animal.size || 'MEDIUM',
        weight: animal.weight || '',
        color: animal.color || '',
        location: animal.location || '',
        description: animal.description || '',
        personalityTraits: animal.personalityTraits || '',
        goodWithKids: animal.goodWithKids || false,
        goodWithDogs: animal.goodWithDogs || false,
        goodWithCats: animal.goodWithCats || false,
        energyLevel: animal.energyLevel || 'MEDIUM',
        specialNeeds: animal.specialNeeds || '',
        vaccinationStatus: animal.vaccinationStatus || false,
        spayedNeutered: animal.spayedNeutered || false,
        adoptionFee: animal.adoptionFee || '',
        status: animal.status || 'AVAILABLE',
        imageUrl: animal.imageUrl || ''
      });
    }
  }, [animal]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        age: formData.age ? parseInt(formData.age) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        adoptionFee: formData.adoptionFee ? parseFloat(formData.adoptionFee) : null
      };

      if (animal?.id) {
        await animalService.update(animal.id, submitData);
      } else {
        await animalService.create(submitData);
      }
      
      onSave();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save animal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animal-form-container">
      <h2>{animal ? 'Edit Animal' : 'Add New Animal'}</h2>
      
      {error && <div className="error-message">⚠️ {error}</div>}

      <form className="animal-form" onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="species">Species *</label>
              <select
                id="species"
                name="species"
                value={formData.species}
                onChange={handleChange}
                required
              >
                <option value="DOG">Dog</option>
                <option value="CAT">Cat</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="breed">Breed</label>
              <input
                type="text"
                id="breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="age">Age (years)</label>
              <input
                type="number"
                id="age"
                name="age"
                min="0"
                max="30"
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="UNKNOWN">Unknown</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="size">Size</label>
              <select
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
              >
                <option value="SMALL">Small</option>
                <option value="MEDIUM">Medium</option>
                <option value="LARGE">Large</option>
                <option value="XLARGE">X-Large</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="weight">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                step="0.1"
                min="0"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="color">Color/Markings</label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, State"
                required
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="form-section">
          <h3>Description</h3>
          <div className="form-group">
            <label htmlFor="description">About this animal</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="personalityTraits">Personality Traits</label>
            <textarea
              id="personalityTraits"
              name="personalityTraits"
              value={formData.personalityTraits}
              onChange={handleChange}
              rows="3"
            />
          </div>
        </div>

        {/* Compatibility */}
        <div className="form-section">
          <h3>Compatibility</h3>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="goodWithKids"
                checked={formData.goodWithKids}
                onChange={handleChange}
              />
              <span>Good with Kids</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="goodWithDogs"
                checked={formData.goodWithDogs}
                onChange={handleChange}
              />
              <span>Good with Dogs</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="goodWithCats"
                checked={formData.goodWithCats}
                onChange={handleChange}
              />
              <span>Good with Cats</span>
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="energyLevel">Energy Level</label>
            <select
              id="energyLevel"
              name="energyLevel"
              value={formData.energyLevel}
              onChange={handleChange}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
        </div>

        {/* Medical Info */}
        <div className="form-section">
          <h3>Medical Information</h3>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="vaccinationStatus"
                checked={formData.vaccinationStatus}
                onChange={handleChange}
              />
              <span>Vaccinations Up to Date</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="spayedNeutered"
                checked={formData.spayedNeutered}
                onChange={handleChange}
              />
              <span>Spayed/Neutered</span>
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="specialNeeds">Special Needs</label>
            <textarea
              id="specialNeeds"
              name="specialNeeds"
              value={formData.specialNeeds}
              onChange={handleChange}
              rows="2"
            />
          </div>
        </div>

        {/* Status & Fee */}
        <div className="form-section">
          <h3>Status & Adoption</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="AVAILABLE">Available</option>
                <option value="PENDING">Pending</option>
                <option value="ADOPTED">Adopted</option>
                <option value="ON_HOLD">On Hold</option>
                <option value="MEDICAL_HOLD">Medical Hold</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="adoptionFee">Adoption Fee ($)</label>
              <input
                type="number"
                id="adoptionFee"
                name="adoptionFee"
                step="0.01"
                min="0"
                value={formData.adoptionFee}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : animal ? 'Update Animal' : 'Add Animal'}
          </button>
        </div>
      </form>
    </div>
  );
}
