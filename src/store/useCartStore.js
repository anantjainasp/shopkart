import { create } from 'zustand';
import { getProductById } from '../services/products';
import api from '../services/api';

export const useCartStore = create((set, get) => ({
  items: [],
  fetchCart: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
    try {
      const response = await api.get('/cart', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      console.log('Fetched cart items:', response.data);
      const items = response.data.items || []; // Ensure items is an array
      const detailedItems = await Promise.all(items.map(async item => {
        const productDetails = await getProductById(item.productId); // Fetch product details
        return {
          ...item,
          productDetails
        };
      }));
      set({ items: detailedItems });
      
      console.log('Updated state:', get());
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  },
  addItem: async (product) => {
    const productData = typeof product === 'object' ? product : await getProductById(product);
    const token = localStorage.getItem('token');
    if (!productData || !productData.id) {
      console.error('Invalid product data:', productData);
      return;
    }
    try {
      const existingItem = get().items.find((item) => item.productId === productData.id);
      if (existingItem) {
        await api.post('/cart/update', { productId: productData.id.toString(), quantity: existingItem.quantity + 1 }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('Updated quantity for:', productData.id);
      } else {
        await api.post('/cart', { productId: productData.id.toString(), quantity: 1 }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('Added to cart:', productData.id);
      }
      await get().fetchCart(); // Ensure fetchCart is called to update state
    } catch (error) {
      console.error('Error adding to cart:', error);
      console.error('Failed to add product to cart.');
    }
  },
  updateQuantity: async (productId, change) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found');
      return;
    }
    try {
      const currentItem = get().items.find(item => item.productId === productId);
      const newQuantity = (currentItem ? currentItem.quantity : 0) + change;
      if (newQuantity < 1) {
        await get().removeItem(productId);
        return;
      }
      const response = await api.post('/cart/update', { productId, quantity: newQuantity }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: newQuantity }
              : item
          ),
        }));
        console.log('Updated cart:', response.data);
      } else {
        console.error('Failed to update cart:', response.data);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  },
  removeItem: async (productId) => {
    const token = localStorage.getItem('token');
    try {
      await api.delete(`/cart/remove`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: { productId } 
      });
      console.log('Removed from cart:', productId);
      set((state) => ({
        items: state.items.filter((item) => item.productId !== productId),
      }));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  },
  checkout: () => {
    window.location.href = '/checkout';
  },
  clearCart: () => set({ items: [] }),
}));