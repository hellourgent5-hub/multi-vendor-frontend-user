import React from 'react';
import { useCart } from '../context/CartContext.jsx'; 
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';

const Cart = () => {
    // 1. Access the cart state and functions from context
    const { cart, addItem, removeItem, clearCart, cartTotal } = useCart();
    
    // Placeholder values for calculation
    const taxRate = 0.08; 
    const shippingCost = cartTotal > 0 ? 10.00 : 0.00; // Free shipping logic later
    
    const calculatedTax = cartTotal * taxRate;
    const grandTotal = cartTotal + calculatedTax + shippingCost;

    // Helper function for currency formatting
    const formatCurrency = (amount) => {
        return `$${Number(amount).toFixed(2)}`;
    };

    // --- Empty Cart View ---
    if (cart.length === 0) {
        return (
            <div className="container mx-auto p-4 md:p-8 text-center min-h-[60vh] flex flex-col justify-center items-center bg-gray-50 rounded-xl shadow-inner mt-10">
                <ShoppingCart className="w-16 h-16 text-indigo-400 mb-4" strokeWidth={1.5} />
                <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Your Cart is Empty</h1>
                <p className="text-lg text-gray-600 mb-6">Looks like you haven't added anything to your cart yet. Time to shop!</p>
                <a 
                    href="/products" 
                    className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.05]"
                >
                    Browse Products
                </a>
            </div>
        );
    }

    // --- Cart with Items View ---
    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 border-b-4 border-indigo-500 pb-3">
                Your Shopping Cart ({cart.length} items)
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* --- Left Column: Cart Items List --- */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.map((item) => (
                        <div key={item.product._id} className="flex items-center bg-white p-4 rounded-xl shadow-md border border-gray-100">
                            
                            {/* Product Info */}
                            <div className="flex-grow min-w-0 pr-4">
                                <h2 className="text-lg font-bold text-gray-900 truncate">{item.product.name}</h2>
                                <p className="text-sm text-gray-500">
                                    {item.product.category || 'Uncategorized'} | Vendor: {item.product.vendor?.shopName || 'Unknown'}
                                </p>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2 border rounded-lg p-1 mr-4">
                                <button
                                    onClick={() => removeItem(item.product._id)}
                                    className="p-1 text-red-500 hover:bg-red-50 rounded-full transition"
                                    aria-label="Decrease quantity"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="text-lg font-semibold w-6 text-center">{item.quantity}</span>
                                <button
                                    onClick={() => addItem(item.product)}
                                    className="p-1 text-green-500 hover:bg-green-50 rounded-full transition"
                                    aria-label="Increase quantity"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                            
                            {/* Item Price and Subtotal */}
                            <div className="flex flex-col items-end w-24">
                                <span className="text-xl font-extrabold text-indigo-600">
                                    {formatCurrency(item.product.price * item.quantity)}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {formatCurrency(item.product.price)} ea.
                                </span>
                            </div>

                            {/* Remove All Button */}
                            <button
                                onClick={() => {
                                    // Remove the item completely by calling removeItem repeatedly
                                    // A better approach would be to add a dedicated removeAllItem function to context, 
                                    // but this works for now.
                                    for(let i = 0; i < item.quantity; i++) {
                                        removeItem(item.product._id);
                                    }
                                }}
                                className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition"
                                aria-label="Remove item completely"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                    
                    {/* Clear Cart Button */}
                    <button
                        onClick={clearCart}
                        className="mt-4 px-6 py-2 border border-red-400 text-red-600 rounded-lg hover:bg-red-50 transition duration-300 font-medium flex items-center space-x-2"
                    >
                        <Trash2 size={18} />
                        <span>Empty Cart</span>
                    </button>
                </div>

                {/* --- Right Column: Order Summary --- */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-xl border border-indigo-200 sticky top-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Order Summary</h2>
                        
                        <div className="space-y-3 text-gray-700">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span className="font-medium">{formatCurrency(cartTotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax (8%):</span>
                                <span className="font-medium">{formatCurrency(calculatedTax)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping:</span>
                                <span className="font-medium">{formatCurrency(shippingCost)}</span>
                            </div>
                            <div className="border-t border-gray-300 pt-4 flex justify-between text-xl font-extrabold text-indigo-700">
                                <span>Order Total:</span>
                                <span>{formatCurrency(grandTotal)}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => console.log('Proceed to Checkout')}
                            className="mt-6 w-full px-6 py-4 bg-green-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-[1.01]"
                        >
                            Proceed to Checkout
                        </button>
                        <p className="text-xs text-center text-gray-500 mt-3">
                            Taxes and shipping calculated based on current location.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
