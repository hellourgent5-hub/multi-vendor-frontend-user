import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api/api.js";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  const defaultCategoryImages = {
    Restaurants: "https://via.placeholder.com/100?text=Restaurants",
    Grocery: "https://via.placeholder.com/100?text=Grocery",
    Fashion: "https://via.placeholder.com/100?text=Fashion",
    Beauty: "https://via.placeholder.com/100?text=Beauty",
    Electronics: "https://via.placeholder.com/100?text=Electronics",
    Home: "https://via.placeholder.com/100?text=Home",
  };

  const defaultSubcategories = {
    Restaurants: ["Biryani", "Snacks", "Cold Drinks"],
    Grocery: ["Vegetables", "Fruits", "Dairy"],
    Fashion: ["Men", "Women", "Kids"],
    Beauty: ["Makeup", "Skincare"],
    Electronics: ["TV", "Audio"],
    Home: ["Furniture", "Decor"],
  };

  // Fetch products
  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data || []))
      .catch(console.error);
  }, []);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchText), 300);
    return () => clearTimeout(timer);
  }, [searchText]);

  // Filtered products with useMemo for performance
  const filteredProducts = useMemo(() => {
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
    return list;
  }, [products, activeCat, search]);

  // Generate category modules
  const catModules = useMemo(() => {
    return Object.keys(defaultCategoryImages).map((name) => ({
      name,
      image: defaultCategoryImages[name],
      subcategories: defaultSubcategories[name],
    }));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-3 border rounded shadow-sm"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Categories */}
      <h2 className="text-xl font-bold mb-3">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
        {catModules.map((cat) => (
          <div
            key={cat.name}
            className="p-3 rounded-xl border flex flex-col items-center hover:shadow transition"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-16 h-16 object-cover rounded-full"
            />
            <span className="text-sm mt-1 font-semibold">{cat.name}</span>

            {cat.subcategories && (
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
          </div>
        ))}
      </div>

      {/* Products Grid */}
      <h2 className="text-xl font-bold mb-3">Products</h2>
      {filteredProducts.length === 0 ? (
        <div className="text-gray-500">No products found</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => {
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
