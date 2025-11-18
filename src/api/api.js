import axios from 'axios';

const API = axios.create({
    baseURL: "https://multi-vendor-app-ey66.onrender.com/api",
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if(token){
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// Admin API endpoints
export const loginAdmin = (data) => API.post('/auth/login', data);
export const getVendors = () => API.get('/vendors');
export const getProducts = () => API.get('/products');
export const getOrders = () => API.get('/orders');
export const approveVendor = (id) => API.patch(`/vendors/approve/${id}`);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
