// src/pages/Cart.js

import React, { useEffect, useState } from "react";
import { useCartStore } from "../store/useCartStore";
import { formatPrice } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Cart = () => {
  const { items, removeItem, updateQuantity, addItem } = useCartStore();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const updatedItems = await Promise.all(
        items.map(async (item) => {
          const response = await axios.get(`https://fakestoreapi.com/products/${item.id}`);
          return { ...item, ...response.data };
        })
      );
      setCartItems(updatedItems);
    };

    fetchCartItems();
  }, [items]);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return <div className="text-center py-8">Your cart is empty</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 bg-white shadow-md rounded-md"
          >
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p>{formatPrice(item.price)}</p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    updateQuantity(item.id, item.quantity - 1)
                  }
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </div>
        ))}
      </div>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};