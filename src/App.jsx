import React from 'react';
import { Routes, Route } from 'react-router-dom';
// 💡 FIX: Added .jsx extension to all imports to help the compiler resolve paths
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Cart from './pages/Cart.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx'; 
import Register from './pages/Register.jsx';

export default function App(){
  return (
    <div>
      {/* Navbar renders the header with Login/Register links */}
      <Navbar />
      <div style={{ padding: 20 }}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/profile' element={<Profile/>}/>
          
          {/* Routes for Login and Register */}
          <Route path='/login' element={<Login/>}/> 
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </div>
    </div>
  );
}
