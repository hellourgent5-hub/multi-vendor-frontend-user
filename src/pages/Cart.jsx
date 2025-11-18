import { useEffect, useState } from "react";
import API from "../api";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items from backend
  const fetchCart = async () => {
    try {
      const res = await API.get("/cart"); // backend route: GET /cart
      setCartItems(res.data);
    } catch (err) {
      console.error("Failed to fetch cart:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Add item to cart
  const addToCart = async (productId) => {
    try {
      await API.post("/cart", { productId }); // backend route: POST /cart
      fetchCart(); // refresh cart
    } catch (err) {
      console.error("Failed to add to cart:", err.response?.data || err.message);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      await API.delete(`/cart/${itemId}`); // backend route: DELETE /cart/:itemId
      fetchCart(); // refresh cart
    } catch (err) {
      console.error("Failed to remove from cart:", err.response?.data || err.message);
    }
  };

  if (loading) return <div>Loading cart...</div>;
  if (cartItems.length === 0) return <div>Your cart is empty</div>;

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item._id}>
            {item.product.name} - ${item.product.price} x {item.quantity}
            <button onClick={() => removeFromCart(item._id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>
        Total: $
        {cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)}
      </h3>
    </div>
  );
}
