import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api";

function Header({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/cart">Cart</Link> |{" "}
        {user ? (
          <>
            <Link to="/profile">Profile</Link> |{" "}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> |{" "}
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
