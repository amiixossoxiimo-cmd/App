import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear auth and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Animal API calls
export const animalService = {
  getAll: () => api.get('/animals'),
  
  getById: (id) => api.get(`/animals/${id}`),
  
  search: (params) => api.get('/animals/search', { params }),
  
  getByStatus: (status) => api.get(`/animals/status/${status}`),
  
  create: (data) => api.post('/animals', data),
  
  update: (id, data) => api.put(`/animals/${id}`, data),
  
  delete: (id) => api.delete(`/animals/${id}`),
  
  getStats: () => api.get('/animals/stats'),
};

// Auth API calls
export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  
  register: (data) => api.post('/auth/register', data),
  
  getCurrentUser: () => api.get('/auth/me'),
};
