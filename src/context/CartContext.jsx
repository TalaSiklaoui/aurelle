"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // IMPORTANT:
  // Server and first client render both start with []
  const [cartItems, setCartItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load cart from localStorage only AFTER hydration
  useEffect(() => {
    try {
      const saved = localStorage.getItem("aurelle_cart");

      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Could not load cart:", error);
    }

    setLoaded(true);
  }, []);

  // Save changes only after the original cart has been loaded
  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem("aurelle_cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Could not save cart:", error);
    }
  }, [cartItems, loaded]);

  const addToCart = (product, quantity = 1, size = null) => {
    setCartItems((prev) => {
      // Same product + same size = same cart item
      const existing = prev.find(
        (item) =>
          item.id === product.id && (item.size || null) === (size || null),
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id && (item.size || null) === (size || null)
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
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
          size: size || null,
        },
      ];
    });
  };

  const removeFromCart = (id, size = null) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.id === id && (item.size || null) === (size || null)),
      ),
    );
  };

  const updateQuantity = (id, quantity, size = null) => {
    if (quantity < 1) {
      removeFromCart(id, size);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && (item.size || null) === (size || null)
          ? {
              ...item,
              quantity,
            }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

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
        loaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
