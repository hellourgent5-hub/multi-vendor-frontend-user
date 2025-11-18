import axios from "axios";

const API_URL = "https://multi-vendor-app-ey66.onrender.com/api/auth";

export const registerUser = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/register`, {
      name: data.name,
      email: data.email,
      password: data.password,
    });

    return res.data;
  } catch (err) {
    console.error("REGISTER ERROR:", err.response?.data || err.message);
    return { error: err.response?.data?.message || "Registration failed" };
  }
};

export const loginUser = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/login`, {
      email: data.email,
      password: data.password,
    });

    return res.data;
  } catch (err) {
    console.error("LOGIN ERROR:", err.response?.data || err.message);
    return { error: err.response?.data?.message || "Login failed" };
  }
};
