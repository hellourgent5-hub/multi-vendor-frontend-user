import React, { useEffect, useState } from "react";
import { getProducts } from "../api/api.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then(res => { setProducts(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {loading ? <p>Loading...</p> :
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      }
    </div>
  );
}
