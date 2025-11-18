import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, Star } from 'lucide-react'; // Using lucide-react for icons

// IMPORTANT: Replace with your actual backend URL
const API_URL = 'YOUR_BACKEND_API_URL/api/v1'; 

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch all products from the backend
    const fetchAllProducts = async () => {
        setLoading(true);
        try {
            // NOTE: This is a public route, so no authorization header is needed.
            const { data } = await axios.get(`${API_URL}/products`); 
            setProducts(data.products);
            setError(null);
        } catch (err) {
            console.error('Error fetching all products:', err);
            // This error message is for a general audience
            setError('We encountered an error loading the product catalog. Please try again later.');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);

    // --- Loading and Error States ---
    if (loading) {
        return (
            <div className="flex justify-center items-center h-96 bg-gray-50">
                <div className="text-center p-8">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 mx-auto mb-4"></div>
                    <p className="text-xl text-gray-700 font-medium">Loading the Marketplace...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-8 text-center">
                <h1 className="text-3xl font-bold text-red-600 mb-4">Catalog Unavailable</h1>
                <p className="text-lg text-gray-700">{error}</p>
            </div>
        );
    }

    // --- Main Render ---
    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-10 border-b-4 border-indigo-500 pb-3">
                Marketplace Catalog
            </h1>
            
            {products.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl shadow-inner border border-dashed border-gray-300">
                    <p className="text-2xl text-gray-500 font-semibold">
                        No products listed yet. Check back soon!
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div 
                            key={product._id} 
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-[1.01] overflow-hidden border border-gray-100 flex flex-col"
                        >
                            {/* Placeholder Image/Icon */}
                            <div className="h-48 bg-indigo-50 flex items-center justify-center p-4">
                                <ShoppingCart className="w-12 h-12 text-indigo-500" strokeWidth={1.5} />
                            </div>

                            <div className="p-5 flex flex-col flex-grow">
                                <span className="text-xs font-semibold uppercase text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full self-start mb-2">
                                    {product.category || 'General'}
                                </span>
                                <h3 className="text-xl font-bold text-gray-900 line-clamp-2 mb-2">{product.name}</h3>
                                
                                <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">{product.description || 'No description provided.'}</p>
                                
                                <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
                                    <span className="text-3xl font-extrabold text-indigo-700">
                                        ${product.price ? product.price.toFixed(2) : '0.00'}
                                    </span>
                                    <button 
                                        className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-200 disabled:bg-gray-400"
                                        disabled={product.stock === 0}
                                        onClick={() => console.log(`Added ${product.name} to cart!`)}
                                    >
                                        <ShoppingCart size={20} />
                                        <span>{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                                    </button>
                                </div>
                                <p className={`text-xs mt-2 font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                    {product.stock > 0 ? `In Stock: ${product.stock} units` : 'Currently unavailable.'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;
