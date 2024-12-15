// src/pages/ProductItem.js

import React from 'react';

const ProductItem = ({ product, onAddToCart, onRemove }) => (
  <div className="product-item border rounded shadow-sm p-2 flex flex-col items-center w-40">
    <img src={product.image} alt={product.title} className="w-24 h-24 object-contain mb-2" />
    <h3 className="text-sm font-semibold mb-1 text-center">{product.title}</h3>
    <p className="text-gray-700 mb-1">${product.price.toFixed(2)}</p>
    <div className="flex space-x-2">
      <button
        onClick={onAddToCart}
        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs"
      >
        Add to Cart
      </button>
      <button
        onClick={onRemove}
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
      >
        Remove
      </button>
    </div>
  </div>
);

export default ProductItem;