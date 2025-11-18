import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// ✅ FIX 1: Import the correct function name: registerUser
import { registerUser } from "../api/api"; 

export default function Signup() {
  const navigate = useNavigate();
  // State structure confirmed from your screenshot: single 'form' object
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
      // ✅ FIX 2: Call the correct function: registerUser (and pass the 'form' object)
      const res = await registerUser(form); 

      if (res.data && res.data.success) {
        alert("Registration successful! Please login.");
        navigate("/login"); 
      } else {
        // Handle backend error message
        setError(res.data.message || "Sign Up failed. Please check your inputs.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      // Display error from the response or a generic message
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
            name="name" // Used for handleChange
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
            name="email" // Used for handleChange
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
            name="password" // Used for handleChange
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
