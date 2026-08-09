"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("aurelle_cart");
    if (saved) setCartItems(JSON.parse(saved));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("aurelle_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, loaded]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return removeFromCart(id);
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
