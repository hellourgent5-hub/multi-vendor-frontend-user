import { useEffect, useState } from "react";
import { getUserOrders } from "../api/api";

export default function Orders() {
  const user = localStorage.getItem("user");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getUserOrders(user).then(res => setOrders(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-3">My Orders</h1>
      {orders.map(order => (
        <div key={order._id} className="border p-3 mb-2">
          <p>Order: {order._id}</p>
          <p>Total Items: {order.items.length}</p>
        </div>
      ))}
    </div>
  );
}

