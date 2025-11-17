import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
export default function Navbar(){
  const nav = useNavigate();
  const logout = ()=>{ localStorage.removeItem('token'); localStorage.removeItem('userId'); nav('/'); };
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/orders">My Orders</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
