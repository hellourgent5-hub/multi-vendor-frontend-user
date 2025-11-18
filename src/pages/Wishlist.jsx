import React, { useEffect, useState } from "react";
import { getWishlist, saveWishlist } from "../utils/wishlist.js";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  const remove = (id) => {
    const updated = wishlist.filter((i) => i._id !== id);
    saveWishlist(updated);
    setWishlist(updated);
  };

  if (wishlist.length === 0)
    return <div className="p-4 text-center">No items in Wishlist</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {wishlist.map((p) => (
        <div key={p._id} className="border rounded shadow p-3 relative">
          <button
            className="absolute top-2 right-2 text-xl"
            onClick={() => remove(p._id)}
          >
            ❌
          </button>

          <Link to={`/product/${p._id}`}>
            <img src={p.images?.[0]} className="h-40 w-full object-cover rounded" />
            <h3 className="font-semibold mt-2">{p.name}</h3>
            <p className="text-green-600">₹{p.price}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
