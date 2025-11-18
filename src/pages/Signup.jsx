import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// IMPORTANT: Replace this path with the correct path to your register API function
import { registerUser } from '../api/api'; 

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Assuming you register with a name
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission (page reload)
    setError(null);
    setLoading(true);

    try {
      // 1. Call the API function to register the user
      const response = await registerUser(name, email, password); 

      // 2. Handle success (e.g., redirect to login or show success message)
      if (response.data && response.data.success) {
        alert("Registration successful! Please login.");
        navigate('/login'); // Redirect to the login page
      } else {
        setError(response.data.message || "Registration failed.");
      }

    } catch (err) {
      // 3. Handle errors
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "An unexpected error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5 flex justify-center">
      <form 
        onSubmit={handleSubmit} // 🔑 KEY CHANGE: Link form submission to handleSubmit
        className="p-6 bg-white rounded-xl shadow-lg" 
        style={{ maxWidth: '400px' }}
      >
        <h1 className="text-center text-2xl font-bold mb-4">📝 Register / Sign Up</h1>
        
        {/* Name Field */}
        <div className="mb-3">
          <label htmlFor="nameInput" className="form-label">Name</label>
          <input 
            type="text" 
            className="form-control border p-2 w-full rounded" 
            id="nameInput" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            required 
          />
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Email address</label>
          <input 
            type="email" 
            className="form-control border p-2 w-full rounded" 
            id="emailInput" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        
        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="passwordInput" className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control border p-2 w-full rounded" 
            id="passwordInput" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button 
          type="submit" 
          className="btn btn-primary w-full bg-blue-600 text-white py-2 rounded mb-3 disabled:opacity-50"
          disabled={loading} // Disable while loading
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        
        <p className="text-center">
          Already have an account? <Link to="/login" className="text-blue-600">Login Here</Link>
        </p>
      </form>
    </div>
  );
}
