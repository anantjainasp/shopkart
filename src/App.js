// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import { Cart}  from './pages/Cart';
import { Profile } from './pages/Profile';
import  Checkout  from './pages/Checkout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Products } from './pages/Products';
import  OrderHistory  from './pages/OrderHistory';
import Wishlist from './pages/Wishlist';
function App() {
  return (
    <Router>
      <AppLayout>
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/order-history" element={<OrderHistory />} />
          </Routes>
        </main>
      </AppLayout>
    </Router>
  );
}

export default App;