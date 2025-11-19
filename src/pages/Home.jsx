import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api/api.js";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [catModules, setCatModules] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  const defaultCategoryImages = {
    Mobiles: "https://via.placeholder.com/100?text=Mobiles",
    Electronics: "https://via.placeholder.com/100?text=Electronics",
    Fashion: "https://via.placeholder.com/100?text=Fashion",
    Beauty: "https://via.placeholder.com/100?text=Beauty",
    Grocery: "https://via.placeholder.com/100?text=Grocery",
    Home: "https://via.placeholder.com/100?text=Home",
  };

  const defaultSubcategories = {
    Mobiles: ["Smartphones", "Feature Phones"],
    Electronics: ["TV", "Audio"],
    Fashion: ["Men", "Women"],
    Beauty: ["Makeup", "Skincare"],
    Grocery: ["Vegetables", "Snacks"],
    Home: ["Furniture", "Decor"],
  };

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

  // ------------------ Load Categories with Defaults ------------------
  useEffect(() => {
    // Always use defaults
    const categories = Object.keys(defaultCategoryImages).map((name) => ({
      _id: name,
      name,
      image: defaultCategoryImages[name],
      subcategories: defaultSubcategories[name],
    }));
    setCatModules(categories);
  }, []);

  // ------------------ Filter Products ------------------
  useEffect(() => {
    let list = products;
    if (activeCat !== "All") {
      list = list.filter(
        (p) =>
          p.category === activeCat || 
          (defaultSubcategories[activeCat] || []).includes(p.subcategory)
      );
    }
    if (search.trim() !== "") {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(list);
  }, [search, activeCat, products]);

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
        {catModules.map((cat) => (
          <div
            key={cat._id}
            className="p-3 rounded-xl border flex flex-col items-center hover:shadow transition"
          >
            <img
              src={cat.image}
              className="w-16 h-16 object-cover rounded-full"
              alt={cat.name}
            />
            <span className="text-sm mt-1 font-semibold">{cat.name}</span>

            {cat.subcategories && cat.subcategories.length > 0 && (
              <div className="mt-1 text-xs text-gray-500 flex flex-wrap justify-center gap-1">
                {cat.subcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setActiveCat(sub)}
                    className={`px-1 py-0.5 rounded bg-gray-200 hover:bg-blue-100 text-gray-700`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
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
