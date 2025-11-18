import { useEffect, useState } from "react";
import { getProducts, addToCartAPI } from "../api";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const addToCart = async (id) => {
    try {
      await addToCartAPI(id);
      alert("Added to cart!");
    } catch (err) {
      alert("Failed to add to cart");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      {products.length === 0 && <p>No products available</p>}
      <ul>
        {products.map(p => (
          <li key={p._id}>
            {p.name} - ${p.price} 
            <button onClick={() => addToCart(p._id)}>Add to Cart</button>
          </li>
        ))}
      </ul>
      <Link to="/cart">Go to Cart</Link>
    </div>
  );
}
