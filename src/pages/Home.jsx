import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, getCategories, getVendors } from "../api/api.js";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSub, setActiveSub] = useState("All");
  const [search, setSearch] = useState("");

  // ------------------ Fetch Data ------------------
  useEffect(() => {
    getCategories().then(res => setCategories(res.data || []));
    getVendors().then(res => setVendors(res.data || []));
    getProducts().then(res => setProducts(res.data || []));
  }, []);

  // ------------------ Filtered Vendors ------------------
  const filteredVendors = activeCategory === "All"
    ? vendors
    : vendors.filter(v => v.category === activeCategory && (activeSub === "All" || v.subcategories.includes(activeSub)));

  // ------------------ Filtered Products ------------------
  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSub = activeSub === "All" || p.subcategory === activeSub;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSub && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto p-4">

      {/* ------------------ Search ------------------ */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full p-3 border rounded shadow-sm"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* ------------------ Categories ------------------ */}
      <h2 className="text-xl font-bold mb-3">Categories</h2>
      <div className="flex gap-3 overflow-x-auto mb-6">
        <button
          onClick={() => { setActiveCategory("All"); setActiveSub("All"); }}
          className={`px-3 py-1 rounded ${activeCategory === "All" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat._id}
            onClick={() => { setActiveCategory(cat.name); setActiveSub("All"); }}
            className={`px-3 py-1 rounded ${activeCategory === cat.name ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* ------------------ Subcategories ------------------ */}
      {activeCategory !== "All" && (
        <div className="flex gap-2 mb-4 flex-wrap">
          <button
            onClick={() => setActiveSub("All")}
            className={`px-2 py-1 rounded ${activeSub === "All" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            All
          </button>
          {categories.find(c => c.name === activeCategory)?.subcategories.map(sub => (
            <button
              key={sub}
              onClick={() => setActiveSub(sub)}
              className={`px-2 py-1 rounded ${activeSub === sub ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* ------------------ Vendors/Shops ------------------ */}
      {activeCategory !== "All" && filteredVendors.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-3">Shops</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
            {filteredVendors.map(v => (
              <div key={v._id} className="border rounded p-3 hover:shadow transition">
                <h3 className="font-semibold">{v.name}</h3>
                <p className="text-sm text-gray-500">{v.subcategories.join(", ")}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ------------------ Products ------------------ */}
      <h2 className="text-xl font-bold mb-3">Products</h2>
      {filteredProducts.length === 0 ? (
        <div className="text-gray-500">No products found</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map(p => (
            <Link key={p._id} to={`/product/${p._id}`} className="border rounded p-3 hover:shadow transition">
              <img src={p.images?.[0] || p.image || "https://via.placeholder.com/300"} alt={p.name} className="w-full h-36 sm:h-40 md:h-44 object-cover rounded" />
              <h3 className="mt-2 font-semibold truncate">{p.name}</h3>
              <p className="text-green-600 font-bold">₹{p.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
