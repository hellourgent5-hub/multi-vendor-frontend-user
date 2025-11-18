import axios from "axios";

const API = axios.create({
  baseURL: "https://multi-vendor-app-ey66.onrender.com/api",
});

// Attach Token Automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ===========================
      AUTH
=========================== */
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

/* ===========================
      PRODUCTS
=========================== */
export const getProducts = () => API.get("/products");
export const getProduct = (id) => API.get(`/products/${id}`);

/* ===========================
      CATEGORIES   (NEW)
=========================== */
export const getCategories = () => API.get("/categories");
export const getProductsByCategory = (catId) =>
  API.get(`/products/category/${catId}`);

/* ===========================
      ORDERS
=========================== */
export const createOrder = (data) => API.post("/orders", data);
export const getOrders = () => API.get("/orders");

export default API;
