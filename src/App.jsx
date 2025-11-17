import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Profile from './pages/Profile';

export default function App(){
  return (
    <div>
      <Navbar />
      <div style={{ padding: 20 }}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </div>
    </div>
  );
}
