import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("cart");
    navigate("/");
  };

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const cartCount = cart.reduce((acc, i) => acc + (i.quantity || 1), 0);

  // Temporary static categories (later we connect to backend)
  const categories = [
    "Electronics",
    "Fashion",
    "Home Appliances",
    "Grocery",
    "Mobiles",
    "Beauty",
    "Sports",
  ];

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
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
          >
            <span className="text-md font-semibold">Categories ▾</span>

            {catOpen && (
              <div className="absolute top-8 left-0 bg-white shadow-lg border rounded w-48 text-sm">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    to={`/category/${cat}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative flex items-center text-lg font-semibold">
            🛒 Cart
            <span className="ml-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          </Link>

          {/* Login or Profile */}
          {user ? (
            <>
              <span className="text-sm">Hi, {user.name}</span>
              <button onClick={logout} className="text-sm text-red-600">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-sm text-blue-600">
              Login / Register
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow px-4 py-3 space-y-4">

          {/* Mobile Categories */}
          <div>
            <p className="font-semibold">Categories</p>
            <div className="pl-3 mt-2 space-y-2">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/category/${cat}`}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm text-gray-700"
                >
                  • {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Cart */}
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

          {/* Mobile Auth */}
          {user ? (
            <>
              <p className="text-sm">Hi, {user.name}</p>
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
