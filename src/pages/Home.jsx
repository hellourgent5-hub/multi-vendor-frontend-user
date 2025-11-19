import React, { useEffect, useState } from "react";
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
  const [cart, setCart] = useState([]);
  const [quickView, setQuickView] = useState(null);

  const banners = [
    "/images/banner1.jpg",
    "/images/banner2.jpg",
    "/images/banner3.jpg",
  ];

  // ------------------ Fetch Products ------------------
  useEffect(() => {
    getProducts()
      .then((res) => {
        const data = res.data || [];
        setProducts(data);
        setFiltered(data);

        // Extract unique categories
        const cats = [...new Set(data.map((p) => p.category || "Other"))];
        setCategories(cats);

        // Trending (top 6 sold)
        const trendingItems = [...data].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 6);
        setTrending(trendingItems);

        // Deals (discounted products)
        const dealItems = data.filter((p) => p.originalPrice && p.price < p.originalPrice).slice(0, 6);
        setDeals(dealItems);
      })
      .catch(() => {});
  }, []);

  // ------------------ Apply Filters ------------------
  useEffect(() => {
    let list = products;
    if (activeCat !== "All") list = list.filter((p) => p.category === activeCat);
    if (search.trim() !== "")
      list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
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

  // ------------------ Add to Cart ------------------
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p._id === product._id);
      if (exists) return prev; // already in cart
      return [...prev, { ...product, quantity: 1 }];
    });
    alert(`${product.name} added to cart`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">

      {/* ------------------ Banner ------------------ */}
      <div className="w-full h-52 md:h-72 rounded-xl overflow-hidden mb-6">
        <img
          src={banners[bannerIndex]}
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ------------------ Featured Products ------------------ */}
      <h2 className="text-xl font-bold mb-3">🔥 Featured Products</h2>
      <div className="flex gap-4 overflow-x-auto pb-3">
        {featured.map((item) => {
          const img = (item.images && item.images[0]) || item.image || "/images/placeholder.png";
          return (
            <div key={item._id} className="min-w-[150px] bg-white rounded shadow p-3 hover:shadow-lg transition relative">
              <img src={img} className="w-full h-28 object-cover rounded" alt={item.name} />
              <h3 className="mt-2 text-sm font-semibold truncate">{item.name}</h3>
              <p className="text-green-600 font-bold text-sm">₹{item.price}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => addToCart(item)}
                  className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => setQuickView(item)}
                  className="bg-gray-200 px-2 py-1 rounded text-xs"
                >
                  Quick View
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ------------------ Trending Products ------------------ */}
      {trending.length > 0 && (
        <>
          <h2 className="text-xl font-bold mt-6 mb-3">🔥 Trending Now</h2>
          <div className="flex gap-4 overflow-x-auto pb-3">
            {trending.map((p) => {
              const img = (p.images && p.images[0]) || p.image || "/images/placeholder.png";
              return (
                <div key={p._id} className="min-w-[150px] bg-white rounded shadow p-3 hover:shadow-lg transition relative">
                  <img src={img} className="w-full h-28 object-cover rounded" alt={p.name} />
                  <h3 className="mt-2 text-sm font-semibold truncate">{p.name}</h3>
                  <p className="text-green-600 font-bold text-sm">₹{p.price}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => addToCart(p)}
                      className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => setQuickView(p)}
                      className="bg-gray-200 px-2 py-1 rounded text-xs"
                    >
                      Quick View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ------------------ Deals Section ------------------ */}
      {deals.length > 0 && (
        <>
          <h2 className="text-xl font-bold mt-6 mb-3">💥 Top Deals</h2>
          <div className="flex gap-4 overflow-x-auto pb-3">
            {deals.map((d) => {
              const img = (d.images && d.images[0]) || d.image || "/images/placeholder.png";
              return (
                <div key={d._id} className="min-w-[150px] bg-white rounded shadow p-3 hover:shadow-lg transition relative">
                  <img src={img} className="w-full h-28 object-cover rounded" alt={d.name} />
                  <h3 className="mt-2 text-sm font-semibold truncate">{d.name}</h3>
                  <p className="text-red-600 line-through text-sm">₹{d.originalPrice}</p>
                  <p className="text-green-600 font-bold text-sm">₹{d.price}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => addToCart(d)}
                      className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => setQuickView(d)}
                      className="bg-gray-200 px-2 py-1 rounded text-xs"
                    >
                      Quick View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ------------------ Search ------------------ */}
      <div className="mt-6 mb-4">
        <input
          className="w-full p-3 border rounded shadow-sm"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ------------------ Categories ------------------ */}
      <h2 className="text-xl font-bold mb-3">Categories</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`p-3 rounded-xl border flex flex-col items-center hover:shadow ${
              activeCat === cat ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            <span className="text-3xl">🛍️</span>
            <span className="text-sm mt-1">{cat}</span>
          </button>
        ))}
      </div>

      {/* ------------------ Product Grid ------------------ */}
      <h2 className="text-xl font-bold mb-3">All Products</h2>
      {filtered.length === 0 ? (
        <div className="text-gray-500">No products found</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => {
            const img = (product.images && product.images[0]) || product.image || "/images/placeholder.png";
            return (
              <div key={product._id} className="border rounded p-3 hover:shadow transition relative">
                <img src={img} alt={product.name} className="w-full h-40 object-cover rounded" />
                <h3 className="mt-2 font-semibold truncate">{product.name}</h3>
                <p className="text-green-600 font-bold">₹{product.price}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => setQuickView(product)}
                    className="bg-gray-200 px-2 py-1 rounded text-xs"
                  >
                    Quick View
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ------------------ Recently Viewed ------------------ */}
      {recent.length > 0 && (
        <>
          <h2 className="text-xl font-bold mt-6 mb-3">🕒 Recently Viewed</h2>
          <div className="flex gap-4 overflow-x-auto pb-3">
            {recent.map((r) => (
              <Link
                key={r._id}
                to={`/product/${r._id}`}
                className="min-w-[160px] shadow p-3 rounded"
              >
                <img src={r.image} className="rounded" alt={r.name} />
                <h3 className="font-semibold mt-2 truncate">{r.name}</h3>
                <p className="text-green-600 font-bold">₹{r.price}</p>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* ------------------ Quick View Modal ------------------ */}
      {quickView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 relative">
            <button
              onClick={() => setQuickView(null)}
              className="absolute top-2 right-2 text-gray-600 font-bold"
            >
              ×
            </button>
            <img
              src={(quickView.images && quickView.images[0]) || quickView.image || "/images/placeholder.png"}
              className="w-full h-40 object-cover rounded mb-4"
              alt={quickView.name}
            />
            <h3 className="font-semibold text-lg mb-2">{quickView.name}</h3>
            <p className="text-green-600 font-bold mb-2">₹{quickView.price}</p>
            {quickView.originalPrice && quickView.price < quickView.originalPrice && (
              <p className="text-red-600 line-through text-sm">₹{quickView.originalPrice}</p>
            )}
            <p className="text-sm mb-4">{quickView.description || "No description available."}</p>
            <button
              onClick={() => { addToCart(quickView); setQuickView(null); }}
              className="bg-blue-600 text-white w-full py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
