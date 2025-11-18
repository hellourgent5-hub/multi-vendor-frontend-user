import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://multi-vendor-app-ey66.onrender.com/api"
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// Products
export const getProducts = () => API.get("/products");
export const getProduct = (id) => API.get(`/products/${id}`);

// Orders
export const createOrder = (data) => API.post("/orders", data);
export const getOrders = () => API.get("/orders");
export const getAllOrdersForUser = () => API.get("/orders"); // same as getOrders for this backend shape

export default API;
