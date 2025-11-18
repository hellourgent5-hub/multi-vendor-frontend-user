import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// ✅ FIXED 1: Corrected API path to go up one directory: ../api/api
import { registerUser } from "../api/api"; 

export default function Signup() {
  const navigate = useNavigate();
  // State structure matching your code: single 'form' object
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // ✅ FIXED 2: Calling the correct function: registerUser (and passing the 'form' object)
      const res = await registerUser(form); 

      if (res.data && res.data.success) {
        alert("Registration successful! Please login.");
        navigate("/login"); 
      } else {
        setError(res.data.message || "Sign Up failed. Please check your inputs.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "An unexpected error occurred during sign up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-6 max-w-sm w-full bg-white rounded-xl shadow-lg"
      >
        <h1 className="text-center text-2xl font-bold mb-4">📝 Register / Sign Up</h1>

        {/* Name Field */}
        <div className="mb-3">
          <label htmlFor="nameInput" className="form-label">Name</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            name="name" 
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Email address</label>
          <input
            type="email"
            className="border p-2 w-full rounded"
            name="email" 
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="passwordInput" className="form-label">Password</label>
          <input
            type="password"
            className="border p-2 w-full rounded"
            name="password" 
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Already have an account? 
          <Link to="/login" className="text-blue-600 font-medium ml-1">
            Login Here
          </Link>
        </p>
      </form>
    </div>
  );
}
