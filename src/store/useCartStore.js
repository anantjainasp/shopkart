import { create } from 'zustand';
import { getProductById } from '../services/products';

export const useCartStore = create((set, get) => ({
  items: [],
  addItem: async (product) => {
    const productData = typeof product === 'object' ? product : await getProductById(product);
    set((state) => {
      const existingItem = state.items.find((item) => item.id === productData.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === productData.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { items: [...state.items, { ...productData, quantity: 1 }] };
    });
  },
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      ),
    })),
  clearCart: () => set({ items: [] }),
}));