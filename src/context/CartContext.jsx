import React, { createContext, useContext, useState, useMemo } from 'react';

// 1. Create the Context
const CartContext = createContext();

/**
 * 2. Custom hook to use the cart context
 * @returns {object} The cart state and functions (cart, addItem, removeItem, clearCart, cartTotal)
 */
export const useCart = () => {
    return useContext(CartContext);
};

/**
 * 3. Cart Provider Component
 * @param {object} props - Component props, including children
 */
export const CartProvider = ({ children }) => {
    // State to hold the cart items: [{ product: {...}, quantity: 1 }]
    const [cart, setCart] = useState([]);

    /**
     * Adds an item to the cart or increments its quantity if it already exists.
     * @param {object} product - The product object to add.
     */
    const addItem = (product) => {
        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(item => item.product._id === product._id);

            if (existingItemIndex > -1) {
                // Item exists: increase quantity
                return prevCart.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Item does not exist: add new item
                return [...prevCart, { product, quantity: 1 }];
            }
        });
    };

    /**
     * Removes an item from the cart, or decrements its quantity.
     * @param {string} productId - The ID of the product to remove/decrement.
     */
    const removeItem = (productId) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.product._id === productId);

            if (!existingItem) return prevCart;

            if (existingItem.quantity > 1) {
                // Quantity is greater than 1: decrease quantity
                return prevCart.map(item =>
                    item.product._id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            } else {
                // Quantity is 1: remove the item completely
                return prevCart.filter(item => item.product._id !== productId);
            }
        });
    };

    /**
     * Clears all items from the cart.
     */
    const clearCart = () => {
        setCart([]);
    };
    
    /**
     * Calculates the total price of all items in the cart.
     */
    const cartTotal = useMemo(() => {
        return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }, [cart]);

    // Value exposed to consuming components
    const contextValue = useMemo(() => ({
        cart,
        addItem,
        removeItem,
        clearCart,
        cartTotal,
    }), [cart, cartTotal]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};
