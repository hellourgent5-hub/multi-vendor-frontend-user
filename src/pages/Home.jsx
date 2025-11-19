import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, getCategories } from "../api/api.js";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  // ------------------ Fetch Categories ------------------
  useEffect(() => {
    getCategories()
      .then((res) => {
        const cats = res.data || [];
        setCategories(cats);
      })
      .catch(() => {});
  }, []);

  // ------------------ Fetch Products ------------------
  useEffect(() => {
    getProducts()
      .then((res) => {
        const data = res.data || [];
        setProducts(data);
        setFiltered(data);
      })
      .catch(() => {});
  }, []);

  // ------------------ Filter Products ------------------
  useEffect(() => {
    let list = products;

    if (activeCat !== "All") {
      // Filter by category or subcategory dynamically from backend
      list = list.filter(
        (p) =>
          p.category === activeCat ||
          (categories.find((c) => c.name === activeCat)?.subcategories || []).includes(p.subcategory)
      );
    }

    if (search.trim() !== "") {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(list);
  }, [search, activeCat, products, categories]);

  return (
    <div className="max-w-7xl mx-auto p-4">

      {/* ------------------ Search ------------------ */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full p-3 border rounded shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ------------------ Categories ------------------ */}
      <h2 className="text-xl font-bold mb-3">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="p-3 rounded-xl border flex flex-col items-center hover:shadow transition"
          >
            <span className="text-sm mt-1 font-semibold">{cat.name}</span>

            {cat.subcategories && cat.subcategories.length > 0 && (
              <div className="mt-1 text-xs text-gray-500 flex flex-wrap justify-center gap-1">
                {cat.subcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setActiveCat(sub)}
                    className="px-1 py-0.5 rounded bg-gray-200 hover:bg-blue-100 text-gray-700"
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}

            {/* Click category name to filter all products in that category */}
            <button
              onClick={() => setActiveCat(cat.name)}
              className="mt-1 px-2 py-0.5 rounded bg-blue-600 text-white text-xs"
            >
              View All
            </button>
          </div>
        ))}
      </div>

      {/* ------------------ Product Grid ------------------ */}
      <h2 className="text-xl font-bold mb-3">Products</h2>
      {filtered.length === 0 ? (
        <div className="text-gray-500">No products found</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => {
            const img =
              (product.images && product.images[0]) ||
              product.image ||
              "https://via.placeholder.com/300";
            return (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="border rounded p-3 hover:shadow transition"
              >
                <img
                  src={img}
                  alt={product.name}
                  className="w-full h-36 sm:h-40 md:h-44 object-cover rounded"
                />
                <h3 className="mt-2 font-semibold truncate">{product.name}</h3>
                <p className="text-green-600 font-bold">₹{product.price}</p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
