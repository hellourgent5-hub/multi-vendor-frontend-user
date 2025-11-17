// Import axios
import axios from "axios";

// Create an axios instance with base URL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // URL from .env file
  withCredentials: true,                  // allows cookies if backend uses them
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add request interceptor (e.g., for auth token)
API.interceptors.request.use(
  (config) => {
    // If you store token in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptor for errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle global errors here
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;
