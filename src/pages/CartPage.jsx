import React, { useEffect, useState } from "react";
import CartList from "../components/CartList.jsx";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  const total = cart.reduce((acc, i) => acc + (i.price * (i.quantity || 1)), 0);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <CartList cart={cart} setCart={setCart} />
      <div className="mt-6 flex justify-between items-center">
        <div className="text-xl font-semibold">Total: ₹{total}</div>
        <Link to="/checkout" className="bg-green-600 text-white px-4 py-2 rounded">Proceed to Checkout</Link>
      </div>
    </div>
  );
}
