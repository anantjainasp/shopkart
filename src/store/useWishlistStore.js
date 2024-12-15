// src/store/useWishlistStore.js

import { create } from 'zustand';

export const useWishlistStore = create((set) => ({
  items: [],
  addItem: (product) => set((state) => {
    if (!state.items.find((item) => item.id === product.id)) {
      return { items: [...state.items, product] };
    }
    return state;
  }),
  removeItem: (productId) => set((state) => ({
    items: state.items.filter((item) => item.id !== productId),
  })),
}));