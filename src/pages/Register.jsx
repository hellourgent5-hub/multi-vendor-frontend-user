import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // 💡 Import Axios directly

// ⚠️ IMPORTANT: REPLACE THIS URL with your live Render Backend URL
const BACKEND_URL = 'YOUR_BACKEND_API_URL'; 
const REGISTER_ENDPOINT = `${BACKEND_URL}/api/vendors/register`;

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shopName, setShopName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Simple validation check
    if (!name || !email || !password || !shopName) {
      setError('Please fill in all fields (Name, Shop Name, Email, Password).');
      setLoading(false);
      return;
    }
    
    // Check if the placeholder URL was used
    if (BACKEND_URL.includes('YOUR_BACKEND_API_URL')) {
        setError('Configuration Error: Please replace "YOUR_BACKEND_API_URL" with your actual Render backend address.');
        setLoading(false);
        return;
    }

    try {
      // 🟢 FIX: Use axios directly with the full URL
      const res = await axios.post(REGISTER_ENDPOINT, { 
        name, 
        email, 
        password,
        shopName
      });

      // Assuming your backend returns { token: '...', id: '...' } in res.data
      const { token, id } = res.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('userId', id);
      
      // Navigate to the home page on success
      nav('/');
      window.location.reload(); // Force reload to update Navbar state

    } catch (err) {
      console.error('Registration Error:', err.response?.data || err.message);
      // Display the error message from the backend (if available)
      setError(err.response?.data?.message || 'Registration failed. Check server logs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Register New Vendor</h1>
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
      {loading && <p>Processing...</p>}
      
      <form onSubmit={submitHandler}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc' }} 
        />
        <input 
          type="text" 
          placeholder="Shop Name" 
          value={shopName} 
          onChange={(e) => setShopName(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc' }} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc' }} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc' }} 
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '10px 20px', backgroundColor: loading ? '#ccc' : '#008CBA', color: 'white', border: 'none', cursor: 'pointer' }}>
          {loading ? 'Processing...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
