import React, { useEffect, useState } from "react";
import { getProducts, filterProducts } from "../api/api.js";
import { Link } from "react-router-dom";
import FilterSidebar from "../components/FilterSidebar.jsx";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [bannerIndex, setBannerIndex] = useState(0);
  const [trending, setTrending] = useState([]);
  const [deals, setDeals] = useState([]);
  const [recent, setRecent] = useState([]);

  const banners = [
    "/images/banner1.jpg",
    "/images/banner2.jpg",
    "/images/banner3.jpg",
  ];

  const featuredCategories = [
    { name: "Mobiles", image: "/images/mobile.jpg" },
    { name: "Electronics", image: "/images/electronics.jpg" },
    { name: "Home", image: "/images/home.jpg" },
    { name: "Fashion", image: "/images/fashion.jpg" },
    { name: "Beauty", image: "/images/beauty.jpg" },
    { name: "Grocery", image: "/images/grocery.jpg" },
  ];

  // Banner Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Load products
  useEffect(() => {
    getProducts()
      .then((res) => {
        const data = res.data.products || [];
        setProducts(data);
        setFiltered(data);
        setCategories([...new Set(data.map((p) => p.category || "Other"))]);
      })
      .catch(() => {});
  }, []);

  // Apply search + category filter
  useEffect(() => {
    let list = products;
    if (activeCat !== "All") list = list.filter((p) => p.category === activeCat);
    if (search.trim() !== "") list = list.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(list);
  }, [search, activeCat, products]);

  // Fetch trending products
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products/trending`)
      .then((res) => res.json())
      .then((data) => setTrending(data.products || []));
  }, []);

  // Fetch deals
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products/deals`)
      .then((res) => res.json())
      .then((data) => setDeals(data.products || []));
  }, []);

  // Load recently viewed
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("recent")) || [];
    setRecent(items);
  }, []);

  const handleFilter = (params) => {
    filterProducts(params)
      .then((res) => setProducts(res.data.products))
      .catch(() => {});
  };

  return (
    <div className="max-w-7xl mx-auto p-4 flex gap-4">

      {/* Sidebar Filter */}
      <FilterSidebar onFilter={handleFilter} />

      <div className="flex-1 flex flex-col gap-6">

        {/* Banner */}
        <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden">
          <img
            src={banners[bannerIndex]}
            alt="banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Featured Categories */}
        <div>
          <h2 className="text-xl font-bold mb-3">Featured Categories</h2>
          <div className="flex gap-4 overflow-x-auto pb-3">
            {featuredCategories.map((cat) => (
              <Link
                to={`/category/${cat.name}`}
                key={cat.name}
                className="min-w-[90px] text-center"
              >
                <img
                  src={cat.image}
                  className="w-20 h-20 rounded-full shadow"
                  alt={cat.name}
                />
                <p className="text-sm mt-1">{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Search + Category Filter */}
        <div className="flex flex-col gap-3">
          <input
            className="w-full p-3 border rounded shadow-sm"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveCat("All")}
              className={`px-3 py-1 rounded ${
                activeCat === "All" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-3 py-1 rounded whitespace-nowrap ${
                  activeCat === cat ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Trending */}
        <div>
          <h2 className="text-xl font-bold mb-3">🔥 Trending Now</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {trending.map((p) => (
              <Link
                key={p._id}
                to={`/product/${p._id}`}
                className="shadow p-3 rounded hover:scale-105 transition"
              >
                <img src={p.images?.[0]} className="rounded" />
                <h3 className="font-semibold mt-2">{p.name}</h3>
                <p className="text-green-600">₹{p.price}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Deals */}
        <div>
          <h2 className="text-xl font-bold mb-3">💥 Top Deals</h2>
          <div className="flex gap-4 overflow-x-auto pb-3">
            {deals.map((d) => (
              <Link
                key={d._id}
                to={`/product/${d._id}`}
                className="min-w-[180px] shadow p-3 rounded"
              >
                <img src={d.images?.[0]} className="rounded" />
                <h3 className="font-semibold mt-2">{d.name}</h3>
                <p className="text-red-600 line-through">₹{d.originalPrice}</p>
                <p className="text-green-600 font-bold">₹{d.price}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recently Viewed */}
        {recent.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-3">🕒 Recently Viewed</h2>
            <div className="flex gap-4 overflow-x-auto pb-3">
              {recent.map((r) => (
                <Link
                  key={r._id}
                  to={`/product/${r._id}`}
                  className="min-w-[160px] shadow p-3 rounded"
                >
                  <img src={r.image} className="rounded" />
                  <h3 className="font-semibold mt-2">{r.name}</h3>
                  <p className="text-green-600 font-bold">₹{r.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Products */}
        <div>
          <h2 className="text-xl font-bold mb-3">All Products</h2>
          {filtered.length === 0 && (
            <div className="text-gray-500">No products found</div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="border rounded p-3 hover:shadow transition"
              >
                <img
                  src={product.images?.[0] || product.image || "https://via.placeholder.com/300"}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="mt-2 font-semibold truncate">{product.name}</h3>
                <p className="text-green-600 font-bold">₹{product.price}</p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
