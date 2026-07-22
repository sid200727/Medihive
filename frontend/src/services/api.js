import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('medihive_access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('medihive_access_token');
      localStorage.removeItem('medihive_refresh_token');
      localStorage.removeItem('medihive_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: (email, password) => api.post('/auth/login/', { email, password }),
  refresh: (refresh) => api.post('/auth/refresh/', { refresh }),
};

export const recordsService = {
  list: () => api.get('/records/'),
  upload: (formData) => api.post('/records/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};

export const usersService = {
  list: () => api.get('/users/'),
  create: (data) => api.post('/users/', data),
};

export default api;
