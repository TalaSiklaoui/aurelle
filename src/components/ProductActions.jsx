"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

const ringSizes = ["5", "6", "7", "8", "9"];

export default function ProductActions({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);

  const { addToCart } = useCart();
  const router = useRouter();

  const isRing = product.category === "Rings";

  const handleAddToCart = () => {
    if (isRing && !selectedSize) {
      setSizeError(true);
      return;
    }

    setSizeError(false);
    addToCart(product, quantity, isRing ? selectedSize : null);

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    if (isRing && !selectedSize) {
      setSizeError(true);
      return;
    }

    setSizeError(false);
    addToCart(product, quantity, isRing ? selectedSize : null);
    router.push("/checkout");
  };

  return (
    <>
      {isRing && (
        <>
          <p
            style={{
              fontSize: "12px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            Ring Size
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: sizeError ? "8px" : "24px",
            }}
          >
            {ringSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => {
                  setSelectedSize(size);
                  setSizeError(false);
                }}
                style={{
                  width: "44px",
                  height: "44px",
                  backgroundColor:
                    selectedSize === size ? "var(--black)" : "transparent",
                  color: selectedSize === size ? "#fff" : "var(--black)",
                  border: "1px solid var(--black)",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                {size}
              </button>
            ))}
          </div>

          {sizeError && (
            <p
              style={{
                color: "#b23b3b",
                fontSize: "12px",
                marginBottom: "20px",
              }}
            >
              Please select a ring size.
            </p>
          )}
        </>
      )}

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
          type="button"
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
          type="button"
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
        type="button"
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
        type="button"
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
