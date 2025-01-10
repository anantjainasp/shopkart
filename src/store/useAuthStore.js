import { create } from 'zustand';
import {jwtDecode} from 'jwt-decode';
import { getToken, setToken, removeToken } from '../services/auth';

const token = getToken();
const initialUser = token ? { user: jwtDecode(token), isAuthenticated: !!token } : { user: null, isAuthenticated: false };

export const useAuthStore = create((set) => ({
  ...initialUser,
  login: (userData) => {
    setToken(userData.token);
    set({ 
      user: userData.user, 
      isAuthenticated: true 
    });
  },
  logout: () => {
    removeToken();
    set({ 
      user: null, 
      isAuthenticated: false 
    });
  },
}));