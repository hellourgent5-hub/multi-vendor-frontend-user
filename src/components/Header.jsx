import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Header({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
    } catch (err) {
      alert("Logout failed");
      console.error(err);
    }
  };

  return (
    <header style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
      <Link to="/cart" style={{ marginRight: "10px" }}>Cart</Link>
      <Link to="/profile" style={{ marginRight: "10px" }}>Profile</Link>
      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </header>
  );
}
