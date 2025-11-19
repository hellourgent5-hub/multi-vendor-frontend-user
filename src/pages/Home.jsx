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

  const featured = products.slice(0, 5); // first 5 featured items

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
            <Link
              key={item._id}
              to={`/product/${item._id}`}
              className="min-w-[150px] bg-white rounded shadow p-3 hover:shadow-lg transition"
            >
              <img src={img} className="w-full h-28 object-cover rounded" alt={item.name} />
              <h3 className="mt-2 text-sm font-semibold truncate">{item.name}</h3>
              <p className="text-green-600 font-bold text-sm">₹{item.price}</p>
            </Link>
          );
        })}
      </div>

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
            const img =
              (product.images && product.images[0]) ||
              product.image ||
              "/images/placeholder.png";

            return (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="border rounded p-3 hover:shadow transition"
              >
                <img
                  src={img}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="mt-2 font-semibold truncate">{product.name}</h3>
                <p className="text-green-600 font-bold">₹{product.price}</p>
              </Link>
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
    </div>
  );
}
