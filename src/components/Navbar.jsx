import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar(){
  const nav = useNavigate();
  // Check if a token exists in local storage
  const isAuthenticated = localStorage.getItem('token'); 
  
  const logout = () => { 
    localStorage.removeItem('token'); 
    localStorage.removeItem('userId'); 
    nav('/'); // Navigate to home page after logging out
  };
  
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      
      {/* 🟢 Show My Orders only if logged in */}
      {isAuthenticated && <Link to="/orders">My Orders</Link>} 

      {/* 🔑 Conditional Rendering for Auth Links */}
      {isAuthenticated ? (
        // If Logged In, show Logout button
        <button onClick={logout}>Logout</button>
      ) : (
        // If Logged Out, show Login and Register links
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
