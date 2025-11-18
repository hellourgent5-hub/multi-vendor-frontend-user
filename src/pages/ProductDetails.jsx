import React, { useEffect, useState } from "react";
import { getProduct } from "../api/api.js";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct(id).then(res => setProduct(res.data)).catch(() => {});
  }, [id]);

  if (!product) return <div className="p-4">Loading...</div>;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const found = cart.find(i => i._id === product._id);
    if (found) {
      found.quantity = (found.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  const img = (product.images && product.images[0]) || product.image || "https://via.placeholder.com/800x600";

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img src={img} alt={product.name} className="w-full h-96 object-cover rounded" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-xl text-green-600 mt-2">₹{product.price}</p>
          <p className="mt-4 text-gray-700">{product.description}</p>
          <button onClick={addToCart} className="mt-6 bg-blue-600 text-white px-4 py-2 rounded">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
