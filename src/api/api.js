import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://multi-vendor-app-ey66.onrender.com/api"
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// AUTH FIXED
export const registerUser = async (data) => {
  try {
    const res = await API.post("/auth/register", data);
    return res.data;   // returns { message: "..."} or error
  } catch (err) {
    return { error: err.response?.data?.message || "Registration failed" };
  }
};

export const loginUser = async (data) => {
  try {
    const res = await API.post("/auth/login", data);
    return res.data;  // returns { user: {...}, token: "..." }
  } catch (err) {
    return { error: err.response?.data?.message || "Login failed" };
  }
};

// PRODUCTS
export const getProducts = () => API.get("/products");
export const getProduct = (id) => API.get(`/products/${id}`);

// ORDERS
export const createOrder = (data) => API.post("/orders", data);
export const getOrders = () => API.get("/orders");

export default API;
