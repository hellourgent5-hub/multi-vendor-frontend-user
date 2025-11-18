import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products") // Make sure backend has /products route
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {products.length === 0 && <p>No products available</p>}
      <ul>
        {products.map(prod => (
          <li key={prod._id}>
            {prod.name} - ${prod.price}
            <Link to={`/cart`}>Add to Cart</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
