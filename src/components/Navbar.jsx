import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { getCategories } from "../api/api.js";

export default function Navbar() {
  const { user, setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(null); // track which category dropdown is open
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("cart");
    navigate("/");
  };

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const cartCount = cart.reduce((acc, i) => acc + (i.quantity || 1), 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          MultiVendor
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Categories Dropdown */}
          <div className="relative">
            <span className="text-md font-semibold cursor-pointer">Categories ▾</span>
            <div className="absolute top-8 left-0 bg-white shadow-lg border rounded w-64 text-sm z-10">
              {categories.map((cat) => (
                <div
                  key={cat._id}
                  className="group relative"
                  onMouseEnter={() => setCatOpen(cat._id)}
                  onMouseLeave={() => setCatOpen(null)}
                >
                  <Link
                    to={`/category/${cat.name}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {cat.name} {cat.subcategories.length > 0 && "▸"}
                  </Link>

                  {/* Subcategories */}
                  {cat.subcategories.length > 0 && catOpen === cat._id && (
                    <div className="absolute top-0 left-full bg-white shadow-lg border rounded w-48 text-sm">
                      {cat.subcategories.map((sub, idx) => (
                        <Link
                          key={idx}
                          to={`/category/${cat.name}/${sub}`}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="border px-2 py-1 rounded-l text-sm"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-1 rounded-r text-sm"
            >
              🔍
            </button>
          </form>

          {/* Cart */}
          <Link to="/cart" className="relative flex items-center text-lg font-semibold">
            🛒 Cart
            <span className="ml-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          </Link>

          {/* User Menu */}
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm">Hi, {user.name}</span>
              <Link to="/profile" className="text-sm text-gray-700 hover:text-blue-600">
                Profile
              </Link>
              <Link to="/wishlist" className="text-sm text-gray-700 hover:text-blue-600">
                Wishlist
              </Link>
              {user.isAdmin && (
                <Link to="/admin" className="text-sm text-gray-700 hover:text-blue-600">
                  Admin
                </Link>
              )}
              <button onClick={logout} className="text-sm text-red-600">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-sm text-blue-600">
              Login / Register
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow px-4 py-3 space-y-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex mb-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="border px-2 py-1 rounded-l text-sm w-full"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-1 rounded-r text-sm"
            >
              🔍
            </button>
          </form>

          {/* Categories */}
          <div>
            <p className="font-semibold">Categories</p>
            <div className="pl-3 mt-2 space-y-2">
              {categories.map((cat) => (
                <div key={cat._id}>
                  <Link
                    to={`/category/${cat.name}`}
                    onClick={() => setMenuOpen(false)}
                    className="block text-sm text-gray-700"
                  >
                    {cat.name}
                  </Link>
                  {cat.subcategories.length > 0 && (
                    <div className="pl-4 mt-1 space-y-1">
                      {cat.subcategories.map((sub, idx) => (
                        <Link
                          key={idx}
                          to={`/category/${cat.name}/${sub}`}
                          onClick={() => setMenuOpen(false)}
                          className="block text-sm text-gray-600"
                        >
                          • {sub}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="flex items-center text-lg font-semibold"
          >
            🛒 Cart
            <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          </Link>

          {/* User */}
          {user ? (
            <>
              <p className="text-sm">Hi, {user.name}</p>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-gray-700"
              >
                Profile
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-gray-700"
              >
                Wishlist
              </Link>
              {user.isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm text-gray-700"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="text-red-600 text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              onClick={() => setMenuOpen(false)}
              to="/login"
              className="text-blue-600 text-sm"
            >
              Login / Register
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
