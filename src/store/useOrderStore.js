import { create } from 'zustand';
import api from '../services/api';

export const useOrderStore = create((set) => ({
  orders: [],
  fetchOrders: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
    try {
      const response = await api.get('/orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      console.log('Fetched orders:', response.data);
      set({ orders: response.data });
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  },
}));
