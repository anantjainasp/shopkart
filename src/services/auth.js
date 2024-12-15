import api from './api';

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error("Login error: ", error.response?.data || error.message); // Log error details
    throw error.response?.data?.message || 'Login failed';
  }
};

export const register = async (data) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};