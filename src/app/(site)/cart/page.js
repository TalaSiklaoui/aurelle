"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "80px 40px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-playfair), serif" }}>Your Cart</h1>

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
    <>
      <div className="cart-page">
        <h1 className="cart-title">Your Cart</h1>

        <div className="cart-layout">
          {/* CART PRODUCTS */}
          <div className="cart-products">
            {/* DESKTOP HEADER */}
            <div className="cart-header">
              <span>PRODUCT</span>
              <span>PRICE</span>
              <span>QUANTITY</span>
              <span>TOTAL</span>
              <span></span>
            </div>

            {/* CART ITEMS */}
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size || "default"}`}
                className="cart-item"
              >
                {/* PRODUCT */}
                <div className="cart-product">
                  <div className="cart-image">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 104px, 64px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div className="cart-product-info">
                    <span className="cart-product-title">{item.title}</span>

                    {item.size && (
                      <span className="cart-size">Size: {item.size}</span>
                    )}

                    {/* Mobile price */}
                    <span className="mobile-price">
                      ${item.price.toFixed(2)}
                    </span>

                    {/* Mobile quantity */}
                    <div className="mobile-quantity">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1, item.size)
                        }
                        className="qty-button"
                        aria-label={`Decrease ${item.title} quantity`}
                      >
                        −
                      </button>

                      <span className="qty-number">{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1, item.size)
                        }
                        className="qty-button"
                        aria-label={`Increase ${item.title} quantity`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* DESKTOP PRICE */}
                <span className="cart-price">${item.price.toFixed(2)}</span>

                {/* DESKTOP QUANTITY */}
                <div className="cart-quantity">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1, item.size)
                    }
                    className="qty-button"
                    aria-label={`Decrease ${item.title} quantity`}
                  >
                    −
                  </button>

                  <span className="qty-number">{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1, item.size)
                    }
                    className="qty-button"
                    aria-label={`Increase ${item.title} quantity`}
                  >
                    +
                  </button>
                </div>

                {/* TOTAL */}
                <span className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>

                {/* REMOVE */}
                <button
                  type="button"
                  className="cart-remove"
                  onClick={() => removeFromCart(item.id, item.size)}
                  aria-label={`Remove ${item.title} from cart`}
                >
                  ×
                </button>
              </div>
            ))}

            <Link href="/shop" className="continue-shopping">
              ‹ Continue Shopping
            </Link>
          </div>

          {/* CART TOTALS */}
          <div className="cart-summary">
            <h3>Cart Totals</h3>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>
                {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>

            <div className="summary-row total-row">
              <span>Total</span>
              <span>${(cartTotal + shippingCost).toFixed(2)}</span>
            </div>

            <Link href="/checkout" className="checkout-link">
              CHECKOUT
            </Link>

            <p className="delivery-note">
              Free delivery on all orders over $250
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cart-page {
          padding: 60px 40px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .cart-title {
          font-family: var(--font-playfair), serif;
          margin: 0 0 40px;
        }

        .cart-layout {
          display: flex;
          gap: 40px;
          align-items: flex-start;
          flex-wrap: wrap;
        }

        .cart-products {
          flex: 2 1 500px;
          min-width: 0;
        }

        .cart-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr auto;
          padding-bottom: 12px;
          border-bottom: 1px solid #e5e0d8;
          color: var(--gray-text);
          font-size: 13px;
        }

        .cart-item {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr auto;
          align-items: center;
          padding: 20px 0;
          border-bottom: 1px solid #e5e0d8;
          position: relative;
        }

        .cart-product {
          display: flex;
          align-items: center;
          gap: 16px;
          min-width: 0;
        }

        .cart-image {
          position: relative;
          width: 64px;
          height: 64px;
          flex-shrink: 0;
        }

        .cart-product-info {
          min-width: 0;
        }

        .cart-product-title {
          display: block;
          font-family: var(--font-playfair), serif;
        }

        .cart-size {
          display: block;
          font-size: 12px;
          color: var(--gray-text);
          margin-top: 5px;
        }

        .cart-price,
        .cart-item-total {
          font-size: 14px;
        }

        .cart-quantity {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .qty-button {
          width: 28px;
          height: 28px;
          border: 1px solid #d9d3c7;
          background: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          font-size: 15px;
          line-height: 1;
        }

        .qty-number {
          min-width: 18px;
          text-align: center;
        }

        .cart-remove {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--gray-text);
          font-size: 20px;
          padding: 8px;
        }

        .mobile-price,
        .mobile-quantity {
          display: none;
        }

        .continue-shopping {
          display: inline-block;
          margin-top: 20px;
          color: var(--gray-text);
          font-size: 14px;
        }

        .cart-summary {
          flex: 1 1 280px;
          background: var(--cream);
          border: 1px solid #e5e0d8;
          padding: 28px;
          box-sizing: border-box;
        }

        .cart-summary h3 {
          font-family: var(--font-playfair), serif;
          margin: 0 0 20px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .total-row {
          font-weight: 600;
          border-top: 1px solid #e5e0d8;
          padding-top: 12px;
          margin-bottom: 20px;
        }

        .checkout-link {
          display: block;
          width: 100%;
          box-sizing: border-box;
          padding: 14px;
          background: var(--black);
          color: #fff;
          text-align: center;
          text-decoration: none;
        }

        .delivery-note {
          font-size: 12px;
          color: var(--gray-text);
          margin: 12px 0 0;
          text-align: center;
        }

        @media (max-width: 768px) {
          .cart-page {
            padding: 52px 34px;
          }

          .cart-title {
            font-size: 38px;
            margin-bottom: 48px;
          }

          .cart-layout {
            display: block;
          }

          .cart-header {
            display: none;
          }

          .cart-item {
            display: grid;
            grid-template-columns: 104px minmax(0, 1fr) auto;
            gap: 22px;
            align-items: start;
            padding: 24px 0 28px;
          }

          .cart-product {
            display: contents;
          }

          .cart-image {
            width: 104px;
            height: 104px;
            grid-column: 1;
          }

          .cart-product-info {
            grid-column: 2;
            padding-top: 3px;
          }

          .cart-product-title {
            font-size: 20px;
            line-height: 1.3;
          }

          .cart-size {
            font-size: 13px;
            margin-top: 8px;
            line-height: 1.4;
          }

          .mobile-price {
            display: block;
            font-size: 17px;
            margin-top: 8px;
          }

          .mobile-quantity {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 16px;
          }

          .mobile-quantity .qty-button {
            width: 34px;
            height: 34px;
          }

          .cart-price,
          .cart-quantity {
            display: none;
          }

          .cart-item-total {
            grid-column: 3;
            align-self: end;
            padding-bottom: 7px;
            font-size: 18px;
            font-weight: 500;
            white-space: nowrap;
          }

          .cart-remove {
            position: absolute;
            top: 17px;
            right: 0;
            font-size: 21px;
          }

          .continue-shopping {
            margin-top: 24px;
          }

          .cart-summary {
            width: 100%;
            margin-top: 70px;
          }
        }

        @media (max-width: 430px) {
          .cart-page {
            padding-left: 24px;
            padding-right: 24px;
          }

          .cart-item {
            grid-template-columns: 94px minmax(0, 1fr) auto;
            gap: 16px;
          }

          .cart-image {
            width: 94px;
            height: 94px;
          }

          .cart-product-title {
            font-size: 18px;
            padding-right: 12px;
          }

          .cart-item-total {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
}
