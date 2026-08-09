"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function ProductActions({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/checkout");
  };

  return (
    <>
      <p
        style={{
          fontSize: "12px",
          letterSpacing: "1px",
          textTransform: "uppercase",
          marginBottom: "10px",
        }}
      >
        Quantity
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          border: "1px solid #E5DFD3",
          width: "fit-content",
          padding: "8px 16px",
          marginBottom: "24px",
        }}
      >
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          −
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          +
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        style={{
          backgroundColor: "var(--black)",
          color: "white",
          border: "none",
          padding: "16px 40px",
          fontSize: "13px",
          letterSpacing: "1px",
          textTransform: "uppercase",
          cursor: "pointer",
          width: "100%",
          marginBottom: "10px",
        }}
      >
        {added ? "Added ✓" : "Add to Cart"}
      </button>

      <button
        onClick={handleBuyNow}
        style={{
          backgroundColor: "transparent",
          color: "var(--black)",
          border: "1px solid var(--black)",
          padding: "16px 40px",
          fontSize: "13px",
          letterSpacing: "1px",
          textTransform: "uppercase",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Buy It Now
      </button>
    </>
  );
}
