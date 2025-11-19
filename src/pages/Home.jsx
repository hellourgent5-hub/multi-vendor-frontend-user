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
  const [quickView, setQuickView] = useState(null);

  const banners = [
    "/images/banner1.jpg",
    "/images/banner2.jpg",
    "/images/banner3.jpg",
  ];

  const featuredRef = useRef(null);
  const trendingRef = useRef(null);
  const dealsRef = useRef(null);
  const recentRef = useRef(null);

  const [activeSlide, setActiveSlide] = useState({
    featured: 0,
    trending: 0,
    deals: 0,
    recent: 0,
  });

  // ------------------ Fetch Products ------------------
  useEffect(() => {
    getProducts()
      .then((res) => {
        const data = res.data || [];
        setProducts(data);
        setFiltered(data);

        const cats = [...new Set(data.map((p) => p.category || "Other"))];
        setCategories(cats);

        setTrending([...data].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 6));
        setDeals(data.filter((p) => p.originalPrice && p.price < p.originalPrice).slice(0, 6));
      })
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

  const scrollCarousel = (el, direction = 1) => {
    if (!el) return;
    const cardWidth = el.firstChild?.offsetWidth + 16 || 216;
    el.scrollBy({
      left: direction * cardWidth,
      behavior: "smooth",
    });
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
          <button
            onClick={() => setQuickView(product)}
            className="bg-gray-200 px-2 py-1 rounded text-xs"
          >
            Quick View
          </button>
        </div>
      </div>
    );
  };

  const CarouselSection = ({ title, items, refEl, keyName }) => {
    if (!items || items.length === 0) return null;

    const handleScroll = () => {
      const el = refEl.current;
      if (!el) return;
      const cardWidth = el.firstChild?.offsetWidth + 16 || 216;
      const index = Math.round(el.scrollLeft / cardWidth);
      setActiveSlide((prev) => ({ ...prev, [keyName]: index }));
    };

    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3">{title}</h2>
        <div className="relative group">
          <div
            ref={refEl}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scroll-smooth"
          >
            {items.map((item) => (
              <CarouselCard key={item._id} product={item} />
            ))}
          </div>
          {/* Arrows (show only on hover) */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition"
            onClick={() => scrollCarousel(refEl.current, -1)}
          >
            ◀
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition"
            onClick={() => scrollCarousel(refEl.current, 1)}
          >
            ▶
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-1 mt-2">
          {items.map((_, idx) => (
            <span
              key={idx}
              className={`w-2 h-2 rounded-full ${
                activeSlide[keyName] === idx ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
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
      <CarouselSection title="🔥 Featured Products" items={featured} refEl={featuredRef} keyName="featured" />
      <CarouselSection title="🔥 Trending Now" items={trending} refEl={trendingRef} keyName="trending" />
      <CarouselSection title="💥 Top Deals" items={deals} refEl={dealsRef} keyName="deals" />
      {recent.length > 0 && <CarouselSection title="🕒 Recently Viewed" items={recent} refEl={recentRef} keyName="recent" />}

      {/* Search */}
      <div className="mt-6 mb-4">
        <input
          className="w-full p-3 border rounded shadow-sm"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Categories */}
      <h2 className="text-xl font-bold mb-3">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
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

      {/* Quick View Modal */}
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
