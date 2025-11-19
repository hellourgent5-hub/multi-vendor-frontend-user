import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, filterProducts } from "../api/api.js";
import FilterSidebar from "../components/FilterSidebar.jsx";

export default function Home() {
  const [bannerIndex, setBannerIndex] = useState(0);
  const [trending, setTrending] = useState([]);
  const [deals, setDeals] = useState([]);
  const [recent, setRecent] = useState([]);
  const [products, setProducts] = useState([]);

  const banners = [
    "/images/banner1.jpg",
    "/images/banner2.jpg",
    "/images/banner3.jpg",
  ];

  const categories = [
    { name: "Mobiles", image: "/images/mobile.jpg" },
    { name: "Electronics", image: "/images/electronics.jpg" },
    { name: "Home", image: "/images/home.jpg" },
    { name: "Fashion", image: "/images/fashion.jpg" },
    { name: "Beauty", image: "/images/beauty.jpg" },
    { name: "Grocery", image: "/images/grocery.jpg" },
  ];

  // ------------------ Banner Slider ------------------
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ------------------ Fetch Data ------------------
  useEffect(() => {
    // Trending Products
    fetch(`${import.meta.env.VITE_API_URL}/products/trending`)
      .then((res) => res.json())
      .then((data) => setTrending(data.products || []));

    // Deals
    fetch(`${import.meta.env.VITE_API_URL}/products/deals`)
      .then((res) => res.json())
      .then((data) => setDeals(data.products || []));

    // Recently Viewed
    const items = JSON.parse(localStorage.getItem("recent")) || [];
    setRecent(items);

    // All Products
    getProducts().then((res) => setProducts(res.data.products || []));
  }, []);

  const handleFilter = (params) => {
    filterProducts(params)
      .then((res) => setProducts(res.data.products))
      .catch(() => {});
  };

  return (
    <div className="p-4 max-w-7xl mx-auto flex gap-4">
      {/* ------------------ Sidebar ------------------ */}
      <FilterSidebar onFilter={handleFilter} />

      <div className="flex-1 flex flex-col gap-6">
        {/* ------------------ Banner Slider ------------------ */}
        <div className="relative w-full h-48">
          <img
            src={banners[bannerIndex]}
            className="w-full h-full object-cover rounded-xl shadow"
          />
        </div>

        {/* ------------------ Featured Categories ------------------ */}
        <div>
          <h2 className="text-lg font-bold mb-3">Featured Categories</h2>
          <div className="flex gap-4 overflow-x-auto pb-3">
            {categories.map((cat) => (
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

        {/* ------------------ Trending Products ------------------ */}
        <div>
          <h2 className="text-lg font-bold mb-3">🔥 Trending Now</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {trending.map((p) => (
              <Link
                to={`/product/${p._id}`}
                key={p._id}
                className="shadow p-3 rounded hover:scale-105 transition"
              >
                <img src={p.images?.[0]} className="rounded" />
                <h3 className="font-semibold mt-2">{p.name}</h3>
                <p className="text-green-600">₹{p.price}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* ------------------ Deals Section ------------------ */}
        <div>
          <h2 className="text-lg font-bold mb-3">💥 Top Deals</h2>
          <div className="flex gap-4 overflow-x-auto pb-3">
            {deals.map((d) => (
              <Link
                to={`/product/${d._id}`}
                key={d._id}
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

        {/* ------------------ Recently Viewed ------------------ */}
        {recent.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3">🕒 Recently Viewed</h2>
            <div className="flex gap-4 overflow-x-auto pb-3">
              {recent.map((r) => (
                <Link
                  to={`/product/${r._id}`}
                  key={r._id}
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

        {/* ------------------ All Products (Filtered Grid) ------------------ */}
        <div>
          <h2 className="text-lg font-bold mb-3">All Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products.map((p) => (
              <Link
                key={p._id}
                to={`/product/${p._id}`}
                className="border rounded shadow p-3 hover:scale-105 transition"
              >
                <img
                  src={p.images?.[0]}
                  className="h-40 w-full object-cover rounded"
                />
                <h3 className="font-semibold mt-2">{p.name}</h3>
                <p className="text-green-600">₹{p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
