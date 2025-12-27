import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers['x-admin-auth'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('adminToken');
      window.location.href = '/admin';
    }
    return Promise.reject(error);
  }
);

// =====================================================
// Auth API
// =====================================================

export const login = async (password) => {
  const response = await api.post('/auth/login', { password });
  return response.data;
};

export const verifyAuth = async () => {
  const response = await api.get('/auth/verify');
  return response.data;
};

// =====================================================
// Bills API
// =====================================================

export const createBill = async (billData) => {
  const response = await api.post('/bills', billData);
  return response.data;
};

export const getBills = async (limit = 50, offset = 0) => {
  const response = await api.get(`/bills?limit=${limit}&offset=${offset}`);
  return response.data;
};

export const getBill = async (billId) => {
  const response = await api.get(`/bills/${billId}`);
  return response.data;
};

export const getBillsByStatus = async (status) => {
  const response = await api.get(`/bills/status/${status}`);
  return response.data;
};

export const retrySMS = async (billId) => {
  const response = await api.post(`/bills/${billId}/retry-sms`);
  return response.data;
};

export default api;