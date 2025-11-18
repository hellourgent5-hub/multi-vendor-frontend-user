import { Link } from "react-router-dom";

export default function Cart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="p-6">
      {cart.map(item => (
        <div key={item._id} className="border p-2 mb-2">
          {item.name} - ₹{item.price}
        </div>
      ))}

      <h2 className="text-xl font-bold mt-4">Total: ₹{total}</h2>

      <Link to="/checkout">
        <button className="w-full mt-4 bg-green-600 text-white p-3 rounded">
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
}
