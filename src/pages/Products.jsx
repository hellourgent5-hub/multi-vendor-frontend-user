import React, {useEffect, useState} from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export default function Products(){
  const [products, setProducts] = useState([]);
  useEffect(()=> { axios.get(`${API}/api/products`).then(r=>setProducts(r.data)).catch(e=>console.error(e)); },[]);
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(p=>(
          <li key={p._id}><strong>{p.name}</strong> - ${p.price} <div>{p.description}</div><em>{p.vendor?.shopName}</em></li>
        ))}
      </ul>
    </div>
  );
}
