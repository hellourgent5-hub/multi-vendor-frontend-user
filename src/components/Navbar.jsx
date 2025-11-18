import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="p-4 bg-black text-white flex justify-between">
      <Link to="/">Home</Link>
      <div className="flex gap-4">
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
