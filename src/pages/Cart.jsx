import { useEffect, useState } from "react";
import { getCart, removeFromCartAPI } from "../api";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCartItems(res.data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchCart(); }, []);

  const removeItem = async (id) => {
    try {
      await removeFromCartAPI(id);
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading cart...</div>;
  if (!cartItems.length) return <div>Your cart is empty</div>;

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item._id}>
            {item.product.name} - ${item.product.price} x {item.quantity}
            <button onClick={() => removeItem(item._id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0)}</h3>
    </div>
  );
}
