import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCart, User, Store, Home } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx'; // Checking path again to resolve module error

const Navbar = () => {
    // Get the cart array from the context
    const { cart } = useCart();
    
    // Calculate the total number of items in the cart (for the badge)
    // This reduces the cart array down to a single number representing all quantities combined
    const totalItems = cart.reduce((count, item) => count + item.quantity, 0);

    // Style for the active link in the navigation
    const activeLinkClass = "text-indigo-600 border-b-2 border-indigo-600 font-bold transition duration-150";
    const defaultLinkClass = "text-gray-600 hover:text-indigo-600 transition duration-150 flex items-center space-x-1";

    return (
        <header className="bg-white shadow-md sticky top-0 z-10">
            <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
                
                {/* Logo / Home Link */}
                <NavLink to="/" className="flex items-center space-x-2 text-2xl font-extrabold text-gray-800 hover:text-indigo-600 transition">
                    <Store className="w-7 h-7 text-indigo-500" />
                    <span>Marketplace App</span>
                </NavLink>

                {/* Navigation Links */}
                <nav className="flex items-center space-x-4 md:space-x-8">
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}
                    >
                        <Home size={20} />
                        <span className="hidden sm:inline">Home</span>
                    </NavLink>
                    <NavLink 
                        to="/products" 
                        className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}
                    >
                        <Store size={20} />
                        <span className="hidden sm:inline">Shop</span>
                    </NavLink>

                    {/* Shopping Cart Link (New) */}
                    <NavLink 
                        to="/cart" 
                        className={({ isActive }) => 
                            `${isActive ? activeLinkClass : defaultLinkClass} relative p-2 rounded-lg`
                        }
                    >
                        <ShoppingCart size={22} />
                        {totalItems > 0 && (
                            <span 
                                className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
                                aria-label={`${totalItems} items in cart`}
                            >
                                {totalItems}
                            </span>
                        )}
                        <span className="hidden sm:inline">Cart</span>
                    </NavLink>

                    {/* Authentication Links */}
                    <NavLink 
                        to="/login" 
                        className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}
                    >
                        <User size={20} />
                        <span className="hidden sm:inline">Sign In</span>
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
