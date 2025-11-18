import React, { useState } from "react";
// Import Link for navigation
import { Link, useNavigate } from "react-router-dom"; 
import { loginUser } from "../../api/api"; // Ensure this path is correct: ../../api/api or ../api/api

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); 
    
    try {
        const res = await loginUser({ email, password }); // Pass data as object
        
        if (res.data && res.data.token) {
            // Handle successful login (e.g., store token)
            alert("Login successful!");
            navigate('/');
        } else {
            setError("Login failed. Check credentials.");
        }
    } catch (err) {
        console.error("Login API Error:", err);
        setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-6 max-w-sm w-full bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
        
        <form onSubmit={handleLogin}>
          
          <div className="mb-4">
            <input 
              className="border p-2 w-full placeholder-gray-500 rounded" 
              type="email" 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-6">
            <input 
              className="border p-2 w-full placeholder-gray-500 rounded" 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        {/* This is the missing link */}
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account? 
            <Link to="/signup" className="text-blue-600 font-medium ml-1 hover:text-blue-700">
                Register Here
            </Link>
          </p>
        </div>
        
      </div>
    </div>
  );
}
