import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import { io } from 'socket.io-client';

export const socket = io(import.meta.env.VITE_API_URL || https://multi-vendor-app-ey66.onrender.com/api

export default function App(){
  const navigate = useNavigate();
  useEffect(()=>{
    // join room after login
    const userId = localStorage.getItem('userId');
    if(userId) socket.emit('join', `customer_${userId}`);
    socket.on('order:update', data => {
      // simple notification
      alert(`Order update: ${data._id} -> ${data.status}`);
    });
    return () => socket.off('order:update');
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/product/:id" element={<ProductDetail/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/orders" element={<Orders/>} />
        </Routes>
      </div>
    </>
  );
}
