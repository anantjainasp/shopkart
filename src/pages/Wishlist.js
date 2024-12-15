// src/pages/Wishlist.js

import React from 'react';
import { useWishlistStore } from '../store/useWishlistStore';
import { useCartStore } from '../store/useCartStore';
import ProductItem from './ProductItem';

const Wishlist = () => {
  const { items, removeItem } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();

  const handleAddToCart = (product) => {
    addToCart(product);
    removeItem(product.id); // Optionally remove from wishlist after adding to cart
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
      {items.length ? (
        <div className="flex flex-wrap gap-4">
          {items.map(item => (
            <ProductItem
              key={item.id}
              product={item}
              onAddToCart={() => handleAddToCart(item)}
              onRemove={() => removeItem(item.id)}
            />
          ))}
        </div>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;