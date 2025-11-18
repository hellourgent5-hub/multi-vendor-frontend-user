import { useEffect, useState } from "react";
import { getProductById } from "../api/api";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id).then(res => setProduct(res.data));
  }, []);

  if (!product) return "Loading...";

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  return (
    <div className="p-6">
      <img src={product.image} className="w-full h-80 object-cover" />
      <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
      <p className="text-xl text-green-600">₹{product.price}</p>

      <button onClick={addToCart}
        className="bg-blue-600 text-white px-4 py-2 mt-4 rounded">
        Add to Cart
      </button>
    </div>
  );
}
