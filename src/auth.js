import API from "./api";

export const loginUser = async (email, password) => {
  const res = await API.post("/auth/login", { email, password });
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const signupUser = async (name, email, password) => {
  const res = await API.post("/auth/signup", { name, email, password });
  localStorage.setItem("token", res.data.token);
  return res.data;
};
