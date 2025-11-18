import { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <h2 className="text-center text-gray-500">Your cart is empty</h2>
      ) : (
        cart.map((item) => (
          <div key={item._id} className="flex justify-between items-center border-b p-3">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p>₹{item.price} × {item.qty}</p>

              <div className="flex gap-2 mt-2">
                <button onClick={() => decreaseQty(item._id)} className="p-1 bg-gray-200">-</button>
                <button onClick={() => increaseQty(item._id)} className="p-1 bg-gray-200">+</button>
                <button onClick={() => removeFromCart(item._id)} className="p-1 bg-red-500 text-white">
                  Remove
                </button>
              </div>
            </div>

            <p className="font-bold">₹{item.price * item.qty}</p>
          </div>
        ))
      )}

      {cart.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Total: ₹{total}</h2>
          <Link to="/checkout">
            <button className="w-full bg-blue-600 text-white p-2 rounded mt-3">
              Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
