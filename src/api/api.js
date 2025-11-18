import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// AUTH
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);

// PRODUCTS
export const getProducts = () => API.get("/products");
export const getProductById = (id) => API.get(`/products/${id}`);

// CART / ORDER
export const createOrder = (data) => API.post("/orders", data);
export const getUserOrders = (id) => API.get(`/orders/user/${id}`);

export default API;
