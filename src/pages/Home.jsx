import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api/api.js";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [recent, setRecent] = useState([]);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [trending, setTrending] = useState([]);
  const [deals, setDeals] = useState([]);
  const [catModules, setCatModules] = useState([]);

  const banners = [
    "/images/banner1.jpg",
    "/images/banner2.jpg",
    "/images/banner3.jpg",
  ];

  const featuredRef = useRef(null);

  // Default images and subcategories in case backend doesn't provide
  const defaultCategoryImages = {
    Mobiles: "/images/mobile.jpg",
    Electronics: "/images/electronics.jpg",
    Fashion: "/images/fashion.jpg",
    Beauty: "/images/beauty.jpg",
    Grocery: "/images/grocery.jpg",
    Home: "/images/home.jpg",
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

        setTrending([...data].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 6));
        setDeals(data.filter((p) => p.originalPrice && p.price < p.originalPrice).slice(0, 6));
      })
      .catch(() => {});
  }, []);

  // ------------------ Fetch Categories ------------------
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCatModules(data))
      .catch(() => {});
  }, []);

  // ------------------ Apply Filters ------------------
  useEffect(() => {
    let list = products;
    if (activeCat !== "All") list = list.filter((p) => p.category === activeCat);
    if (search.trim() !== "")
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    setFiltered(list);
  }, [search, activeCat, products]);

  // ------------------ Recent Products ------------------
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("recent")) || [];
    setRecent(items);
  }, []);

  // ------------------ Auto Banner Slider ------------------
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const featured = products.slice(0, 5);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((p) => p._id === product._id);
    if (!exists) cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart`);
  };

  const CarouselCard = ({ product }) => {
    const img = (product.images && product.images[0]) || product.image || "/images/placeholder.png";
    return (
      <div className="flex-shrink-0 w-40 sm:w-44 md:w-48 bg-white rounded shadow p-3 hover:shadow-lg transition snap-start">
        <img
          src={img}
          className="w-full h-32 sm:h-36 md:h-40 object-cover rounded"
          alt={product.name}
        />
        <h3 className="mt-2 text-sm font-semibold truncate">{product.name}</h3>
        <p className="text-green-600 font-bold text-sm">₹{product.price}</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  };

  const CarouselSection = ({ title, items }) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3">{title}</h2>
        <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scroll-smooth">
          {items.map((item) => (
            <CarouselCard key={item._id} product={item} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Banner */}
      <div className="w-full h-52 sm:h-64 md:h-72 rounded-xl overflow-hidden mb-6">
        <img
          src={banners[bannerIndex]}
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Carousels */}
      <CarouselSection title="🔥 Featured Products" items={featured} />
      <CarouselSection title="🔥 Trending Now" items={trending} />
      <CarouselSection title="💥 Top Deals" items={deals} />
      {recent.length > 0 && <CarouselSection title="🕒 Recently Viewed" items={recent} />}

      {/* Search */}
      <div className="mt-6 mb-4">
        <input
          className="w-full p-3 border rounded shadow-sm"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Categories + Subcategories */}
      <h2 className="text-xl font-bold mb-3">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
        {catModules.map((cat) => {
          const img = cat.image || defaultCategoryImages[cat.name] || "/images/placeholder.png";
          const subs = cat.subcategories || defaultSubcategories[cat.name] || [];

          return (
            <div key={cat._id} className="p-3 rounded-xl border flex flex-col items-center hover:shadow">
              <img src={img} className="w-12 h-12 object-cover rounded-full" />
              <span className="text-sm mt-1 font-semibold">{cat.name}</span>

              {subs.length > 0 && (
                <div className="mt-1 text-xs text-gray-500 flex flex-wrap justify-center gap-1">
                  {subs.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setActiveCat(sub)}
                      className="px-1 py-0.5 bg-gray-200 rounded hover:bg-blue-100 text-gray-700"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Product Grid */}
      <h2 className="text-xl font-bold mb-3">All Products</h2>
      {filtered.length === 0 ? (
        <div className="text-gray-500">No products found</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => {
            const img = (product.images && product.images[0]) || product.image || "/images/placeholder.png";
            return (
              <div key={product._id} className="border rounded p-3 hover:shadow transition">
                <img src={img} alt={product.name} className="w-full h-36 sm:h-40 md:h-44 object-cover rounded" />
                <h3 className="mt-2 font-semibold truncate">{product.name}</h3>
                <p className="text-green-600 font-bold">₹{product.price}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
