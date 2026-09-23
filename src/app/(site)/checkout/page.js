"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    email: "",
    fullName: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    async function autofill() {
      const session = await getSession();

      if (session?.user?.role !== "customer") return;

      const res = await fetch("/api/customers/last-order");
      const data = await res.json();

      setForm((f) => ({
        ...f,
        email: session.user.email || f.email,
        fullName: data.order?.fullName || session.user.name || f.fullName,
        address: data.order?.address || f.address,
        apartment: data.order?.apartment || f.apartment,
        city: data.order?.city || f.city,
        postalCode: data.order?.postalCode || f.postalCode,
        country: data.order?.country || f.country,
        phone: data.order?.phone || f.phone,
      }));
    }

    autofill();
  }, []);

  const SHIPPING_THRESHOLD = 250;
  const SHIPPING_FEE = 6;

  const shippingCost = cartTotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

  const orderTotal = cartTotal + shippingCost;

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (
      !form.email ||
      !form.fullName ||
      !form.address ||
      !form.city ||
      !form.postalCode ||
      !form.country ||
      !form.phone
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          cartItems,
          subtotal: cartTotal,
          shippingCost,
          total: orderTotal,
        }),
      });

      if (!res.ok) throw new Error("Order failed");

      clearCart();
      router.push("/order-confirmation");
    } catch (err) {
      alert("Something went wrong placing your order. Please try again.");
      setSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div
        className="checkout-empty"
        style={{
          padding: "80px 40px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-playfair), serif",
          }}
        >
          Checkout
        </h1>

        <p
          style={{
            color: "var(--gray-text)",
            marginTop: "16px",
          }}
        >
          Your cart is empty.
        </p>

        <Link
          href="/shop"
          style={{
            color: "var(--gold)",
            textDecoration: "underline",
          }}
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div
      className="checkout-page"
      style={{
        padding: "60px 40px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h1
        className="checkout-title"
        style={{
          fontFamily: "var(--font-playfair), serif",
          marginBottom: "40px",
        }}
      >
        Checkout
      </h1>

      <div
        className="checkout-layout"
        style={{
          display: "flex",
          gap: "40px",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <form
          onSubmit={handlePlaceOrder}
          className="checkout-form"
          style={{
            flex: "2 1 500px",
          }}
        >
          <h3 style={sectionTitleStyle}>1. Contact Information</h3>

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              color: "var(--gray-text)",
              marginBottom: "32px",
            }}
          >
            <input type="checkbox" />
            Keep me up to date on news and exclusive offers.
          </label>

          <h3 style={sectionTitleStyle}>2. Delivery Address</h3>

          <input
            type="text"
            name="fullName"
            placeholder="Full name"
            value={form.fullName}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <input
            type="text"
            name="apartment"
            placeholder="Apartment, suite, etc. (optional)"
            value={form.apartment}
            onChange={handleChange}
            style={inputStyle}
          />

          <div
            className="checkout-field-row"
            style={{
              display: "flex",
              gap: "16px",
            }}
          >
            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              style={{
                ...inputStyle,
                flex: 1,
              }}
              required
            />

            <input
              type="text"
              name="postalCode"
              placeholder="Postal code"
              value={form.postalCode}
              onChange={handleChange}
              style={{
                ...inputStyle,
                flex: 1,
              }}
              required
            />
          </div>

          <div
            className="checkout-field-row"
            style={{
              display: "flex",
              gap: "16px",
            }}
          >
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={form.country}
              onChange={handleChange}
              style={{
                ...inputStyle,
                flex: 1,
              }}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              style={{
                ...inputStyle,
                flex: 1,
              }}
              required
            />
          </div>

          <div
            className="checkout-actions"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "32px",
            }}
          >
            <Link
              href="/cart"
              style={{
                fontSize: "13px",
                color: "var(--gray-text)",
                textDecoration: "none",
              }}
            >
              ‹ Return to Cart
            </Link>

            <button
              type="submit"
              disabled={submitting}
              style={{
                ...placeOrderBtnStyle,
                opacity: submitting ? 0.6 : 1,
              }}
            >
              {submitting ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </form>

        <div
          className="checkout-summary"
          style={{
            flex: "1 1 280px",
            background: "var(--cream)",
            border: "1px solid #E5E0D8",
            padding: "28px",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-playfair), serif",
              marginBottom: "20px",
            }}
          >
            Order Summary
          </h3>

          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "48px",
                  height: "48px",
                  flexShrink: 0,
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: "13px",
                    margin: 0,
                  }}
                >
                  {item.title}
                </p>

                <p
                  style={{
                    fontSize: "12px",
                    color: "var(--gray-text)",
                    margin: 0,
                  }}
                >
                  Qty {item.quantity}
                </p>
              </div>

              <span style={{ fontSize: "13px" }}>
                ${item.price * item.quantity}
              </span>
            </div>
          ))}

          <div
            style={{
              borderTop: "1px solid #E5E0D8",
              paddingTop: "16px",
              marginTop: "8px",
            }}
          >
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
              }}
            >
              <span>Total</span>
              <span>${orderTotal}</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "8px",
              marginTop: "20px",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="1.5"
              style={{
                flexShrink: 0,
                marginTop: "2px",
              }}
            >
              <rect x="5" y="11" width="14" height="10" rx="1" />
              <path d="M8 11V7a4 4 0 018 0v4" />
            </svg>

            <p
              style={{
                fontSize: "12px",
                color: "var(--gray-text)",
                textAlign: "left",
                margin: 0,
                maxWidth: "220px",
              }}
            >
              Secure Checkout — your payment information is encrypted and safe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const sectionTitleStyle = {
  fontFamily: "var(--font-playfair), serif",
  fontSize: "16px",
  marginBottom: "16px",
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: "16px",
  border: "1px solid #E5DFD3",
  backgroundColor: "#fff",
  fontSize: "14px",
  fontFamily: "Inter, sans-serif",
  boxSizing: "border-box",
};

const placeOrderBtnStyle = {
  backgroundColor: "var(--black)",
  color: "white",
  border: "none",
  padding: "16px 40px",
  fontSize: "13px",
  letterSpacing: "1px",
  textTransform: "uppercase",
  cursor: "pointer",
};
