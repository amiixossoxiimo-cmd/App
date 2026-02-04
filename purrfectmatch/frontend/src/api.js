const API_BASE_URL = 'http://localhost:8080/api';

export const getAllCats = async () => {
  const response = await fetch(`${API_BASE_URL}/cats`);
  if (!response.ok) {
    throw new Error('Failed to fetch cats');
  }
  return response.json();
};

export const createCat = async (catData) => {
  const response = await fetch(`${API_BASE_URL}/cats`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(catData),
  });
  if (!response.ok) {
    throw new Error('Failed to create cat');
  }
  return response.json();
};

export const deleteCat = async (id) => {
  const response = await fetch(`${API_BASE_URL}/cats/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete cat');
  }
};
