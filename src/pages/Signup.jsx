// src/pages/Signup.jsx

import React from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  return (
    <div className="container my-5">
      <h1 className="text-center">📝 Register / Sign Up</h1>
      <form className="mx-auto" style={{ maxWidth: '400px' }}>
        <p className="text-center">Create a new account</p>
        
        {/* Email Field */}
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Email address</label>
          <input type="email" className="form-control" id="emailInput" required />
        </div>
        
        {/* Password Field */}
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">Password</label>
          <input type="password" className="form-control" id="passwordInput" required />
        </div>
        
        <button type="submit" className="btn btn-primary w-100 mb-3">Sign Up</button>
        
        <p className="text-center">
          Already have an account? <Link to="/login">Login Here</Link>
        </p>
      </form>
    </div>
  );
}
