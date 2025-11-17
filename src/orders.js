import API from "./api";

export const placeOrder = async (orderData) => {
  const res = await API.post("/orders", orderData);
  return res.data;
};

export const getUserOrders = async () => {
  const res = await API.get("/orders/user");
  return res.data;
};
