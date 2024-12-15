// src/pages/Checkout.js

import React, { useState, useEffect } from 'react';
import { useCartStore } from '../store/useCartStore';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import axios from 'axios';

const Checkout = () => {
  const { items, clearCart } = useCartStore();
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    isDefault: false
  });
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await api.get('/users/profile');
        setAddresses(response.data.addresses || []);
      } catch (err) {
        console.error('Failed to load addresses:', err);
      }
    };
    fetchAddresses();
  }, []);

  const handlePlaceOrder = async () => {
    try {
      // Save the address to the user's profile
      await api.put('/users/profile', { addresses: [...addresses, address] });

      // Create order data
      const orderData = {
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
          name: item.title
        })),
        totalAmount: items.reduce((total, item) => total + item.price * item.quantity, 0),
        address,
        status: 'Pending',
        trackingNumber: `TRK${Math.floor(Math.random() * 1000000)}` // Example tracking number
      };

      // Send order data to the backend
      const response = await api.post('/api/orders', orderData);
      if (response.status === 201) {
        console.log('Order placed successfully:', response.data);
        clearCart();
        navigate('/order-history');  // Redirect to order history
      } else {
        console.error('Failed to place order:', response);
      }
    } catch (err) {
      console.error('Failed to place order:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
        <ul className="space-y-2">
          {items.map(item => (
            <li key={item.id} className="flex justify-between">
              <span>{item.title}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p className="text-xl font-bold mt-4">Total: ${items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
        <input
          type="text"
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
          className="mt-1 p-2 border rounded-md w-full"
          placeholder="Street"
        />
        <input
          type="text"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          className="mt-1 p-2 border rounded-md w-full"
          placeholder="City"
        />
        <input
          type="text"
          value={address.state}
          onChange={(e) => setAddress({ ...address, state: e.target.value })}
          className="mt-1 p-2 border rounded-md w-full"
          placeholder="State"
        />
        <input
          type="text"
          value={address.zipCode}
          onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
          className="mt-1 p-2 border rounded-md w-full"
          placeholder="Zip Code"
        />
        <input
          type="text"
          value={address.country}
          onChange={(e) => setAddress({ ...address, country: e.target.value })}
          className="mt-1 p-2 border rounded-md w-full"
          placeholder="Country"
        />
      </div>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mt-4"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;