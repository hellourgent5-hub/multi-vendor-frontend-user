import React, { useEffect, useState } from "react";
import { getProducts } from "../api/api.js";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);

  // Load products
  useEffect(() => {
    getProducts()
      .then((res) => {
        const data = res.data || [];
        setProducts(data);
        setFiltered(data);

        // Extract unique categories
        const cats = [...new Set(data.map((p) => p.category || "Other"))];
        setCategories(cats);
      })
      .catch(() => {});
  }, []);

  // Category Filter
  const filterByCategory = (cat) => {
    if (cat === "All") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((p) => p.category === cat));
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">

      {/* Categories */}
      <h2 className="text-xl font-bold mb-3">Categories</h2>
      <div className="flex gap-2 overflow-x-auto pb-3">
        <button
          onClick={() => filterByCategory("All")}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => filterByCategory(cat)}
            className="px-3 py-1 bg-gray-200 rounded whitespace-nowrap"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product List */}
      <h2 className="text-xl font-bold mt-6 mb-3">Products</h2>

      {filtered.length === 0 && (
        <div className="text-gray-600">No products found</div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3">
        {filtered.map((product) => {
          const img =
            (product.images && product.images[0]) ||
            product.image ||
            "https://via.placeholder.com/300";

          return (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="border rounded p-2 hover:shadow"
            >
              <img
                src={img}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold">{product.name}</h3>

              <p className="text-green-600 font-bold">₹{product.price}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
