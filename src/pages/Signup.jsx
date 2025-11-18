// Inside src/pages/Signup.jsx

// ... all your state setup ...

const handleSubmit = async (e) => {
  e.preventDefault(); 
  // ... setLoading(true), setError(null) ...
  
  try {
    // 🔑 Call the registerUser function with the correct arguments (name, email, password)
    const response = await registerUser(name, email, password); // Check argument order!
    
    if (response.data && response.data.success) {
      alert("Registration successful! Please login.");
      navigate('/login');
    } else {
      // Handle server-side validation messages if present
      setError(response.data.message || "Registration failed."); 
    }
  } catch (err) {
    // ... error handling ...
  } finally {
    // ... setLoading(false) ...
  }
};

// ... Link the form to the handler ...
<form onSubmit={handleSubmit}>
// ...
