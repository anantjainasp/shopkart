import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  login: (userData) => {
    localStorage.setItem('token', userData.token); // Assuming token handling
    set({ 
      user: userData.user, 
      isAuthenticated: true 
    });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ 
      user: null, 
      isAuthenticated: false 
    });
  },
}));