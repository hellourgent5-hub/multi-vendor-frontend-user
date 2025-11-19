// src/pages/Wishlist.jsx
import React, { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "../utils/wishlist.js";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load wishlist on component mount
  useEffect(() => {
    const items = getWishlist();
    setWishlistItems(items);
  }, []);

  const handleRemove = (id) => {
    removeFromWishlist(id);
    // Update state locally
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty. <Link to="/" className="text-blue-600">Browse products</Link></p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="border rounded p-4 shadow">
              <h2 className="font-semibold">{item.name}</h2>
              <p>Price: ${item.price}</p>
              <button
                onClick={() => handleRemove(item.id)}
                className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
