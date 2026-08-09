"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "80px 40px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "Playfair Display, serif" }}>Your Cart</h1>
        <p style={{ color: "var(--gray-text)", marginTop: "16px" }}>
          Your cart is empty.
        </p>
        <Link
          href="/shop"
          style={{ color: "var(--gold)", textDecoration: "underline" }}
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const SHIPPING_THRESHOLD = 250;
  const SHIPPING_FEE = 6;
  const shippingCost = cartTotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

  return (
    <div style={{ padding: "60px 40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1
        style={{ fontFamily: "Playfair Display, serif", marginBottom: "40px" }}
      >
        Your Cart
      </h1>

      <div
        style={{
          display: "flex",
          gap: "40px",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "2 1 500px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr auto",
              padding: "0 0 12px",
              borderBottom: "1px solid #E5E0D8",
              color: "var(--gray-text)",
              fontSize: "13px",
            }}
          >
            <span>PRODUCT</span>
            <span>PRICE</span>
            <span>QUANTITY</span>
            <span>TOTAL</span>
            <span></span>
          </div>

          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr auto",
                alignItems: "center",
                padding: "20px 0",
                borderBottom: "1px solid #E5E0D8",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "64px",
                    height: "64px",
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <span style={{ fontFamily: "Playfair Display, serif" }}>
                  {item.title}
                </span>
              </div>
              <span>${item.price}</span>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={qtyBtn}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={qtyBtn}
                >
                  +
                </button>
              </div>
              <span>${item.price * item.quantity}</span>
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--gray-text)",
                }}
              >
                ×
              </button>
            </div>
          ))}

          <Link
            href="/shop"
            style={{
              display: "inline-block",
              marginTop: "20px",
              color: "var(--gray-text)",
              fontSize: "14px",
            }}
          >
            ‹ Continue Shopping
          </Link>
        </div>

        <div
          style={{
            flex: "1 1 280px",
            background: "var(--cream)",
            border: "1px solid #E5E0D8",
            padding: "28px",
          }}
        >
          <h3
            style={{
              fontFamily: "Playfair Display, serif",
              marginBottom: "20px",
            }}
          >
            Cart Totals
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <span>Subtotal</span>
            <span>${cartTotal}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <span>Delivery</span>
            <span>{shippingCost === 0 ? "Free" : `$${shippingCost}`}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 600,
              borderTop: "1px solid #E5E0D8",
              paddingTop: "12px",
              marginBottom: "20px",
            }}
          >
            <span>Total</span>
            <span>${cartTotal + shippingCost}</span>
          </div>
          <Link href="/checkout">
            <button
              style={{
                width: "100%",
                padding: "14px",
                background: "var(--black)",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              CHECKOUT
            </button>
          </Link>
          <p
            style={{
              fontSize: "12px",
              color: "var(--gray-text)",
              marginTop: "12px",
              textAlign: "center",
            }}
          >
            Free delivery on all orders over $250
          </p>
        </div>
      </div>
    </div>
  );
}

const qtyBtn = {
  width: "24px",
  height: "24px",
  border: "1px solid #D9D3C7",
  background: "#fff",
  cursor: "pointer",
};
