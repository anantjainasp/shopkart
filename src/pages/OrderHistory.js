// src/pages/OrderHistory.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders/my-orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      <ul className="space-y-4">
        {orders.map(order => (
          <li key={order._id} className="bg-white p-4 rounded-lg shadow-md">
            <p className="font-semibold">Order ID: {order._id}</p>
            <p>Status: {order.status}</p>
            <p>Total Amount: ${order.totalAmount}</p>
            <p>Tracking Number: {order.trackingNumber}</p>
            <p>Items: {order.items.map(item => item.name).join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;