import { useEffect, useState } from "react";
import { getProducts } from "../api/api";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(res => setProducts(res.data));
  }, []);

  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map(product => (
        <Link key={product._id} to={`/product/${product._id}`}>
          <div className="border p-3 rounded">
            <img src={product.image} className="w-full h-40 object-cover" />
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-green-600">₹{product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
