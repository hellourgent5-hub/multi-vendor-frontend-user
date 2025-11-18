import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";

import Home from "./pages/Home.jsx";
import LoginRegister from "./pages/LoginRegister.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";

import CartPage from "./pages/CartPage.jsx";
import Checkout from "./pages/Checkout.jsx";
import Orders from "./pages/Orders.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Auth */}
          <Route path="/login" element={<LoginRegister />} />

          {/* Products */}
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* Cart */}
          <Route path="/cart" element={<CartPage />} />

          {/* Checkout */}
          <Route path="/checkout" element={<Checkout />} />

          {/* Orders */}
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
