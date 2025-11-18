import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const addToCart = async (productId) => {
    try {
      await API.post("/cart", { productId });
      alert("Added to cart!");
    } catch (err) {
      alert("Failed to add to cart");
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {products.length === 0 && <p>No products available</p>}
      <ul>
        {products.map((prod) => (
          <li key={prod._id}>
            {prod.name} - ${prod.price}
            <button onClick={() => addToCart(prod._id)}>Add to Cart</button>
          </li>
        ))}
      </ul>
      <Link to="/cart">Go to Cart</Link>
    </div>
  );
}
