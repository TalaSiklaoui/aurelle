"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, loaded } =
    useCart();

  // Prevent empty-cart flash before localStorage loads
  if (!loaded) {
    return null;
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h1>Your Cart</h1>

        <p>Your cart is empty.</p>

        <Link href="/shop">Continue Shopping</Link>

        <style jsx>{`
          .empty-cart {
            padding: 80px 40px;
            text-align: center;
          }

          .empty-cart h1 {
            font-family: var(--font-playfair), serif;
          }

          .empty-cart p {
            color: var(--gray-text);
            margin-top: 16px;
          }

          .empty-cart :global(a) {
            color: var(--gold);
            text-decoration: underline;
          }

          @media (max-width: 767px) {
            .empty-cart {
              padding: 60px 24px;
            }
          }
        `}</style>
      </div>
    );
  }

  const SHIPPING_THRESHOLD = 250;
  const SHIPPING_FEE = 6;

  const shippingCost = cartTotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

  const finalTotal = cartTotal + shippingCost;

  return (
    <main className="cart-page">
      <h1 className="cart-title">Your Cart</h1>

      <div className="cart-layout">
        {/* =========================
            PRODUCTS
        ========================= */}

        <section className="products-section">
          {/* DESKTOP CART */}
          <div className="desktop-cart">
            <div className="desktop-header">
              <span>PRODUCT</span>
              <span>PRICE</span>
              <span>QUANTITY</span>
              <span>TOTAL</span>
              <span></span>
            </div>

            {cartItems.map((item) => (
              <div
                className="desktop-item"
                key={`desktop-${item.id}-${item.size || "default"}`}
              >
                <div className="desktop-product">
                  <div className="desktop-image">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="64px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div className="desktop-product-info">
                    <span className="product-name">{item.title}</span>

                    {item.size && (
                      <span className="product-size">Size: {item.size}</span>
                    )}
                  </div>
                </div>

                <span>${Number(item.price).toFixed(2)}</span>

                <div className="quantity-controls">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1, item.size)
                    }
                    aria-label={`Decrease ${item.title} quantity`}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1, item.size)
                    }
                    aria-label={`Increase ${item.title} quantity`}
                  >
                    +
                  </button>
                </div>

                <strong>
                  ${(Number(item.price) * item.quantity).toFixed(2)}
                </strong>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeFromCart(item.id, item.size)}
                  aria-label={`Remove ${item.title} from cart`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* MOBILE CART */}
          <div className="mobile-cart">
            {cartItems.map((item) => (
              <article
                className="mobile-item"
                key={`mobile-${item.id}-${item.size || "default"}`}
              >
                {/* TOP PART */}
                <div className="mobile-item-main">
                  {/* IMAGE */}
                  <div className="mobile-image">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="105px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  {/* PRODUCT INFORMATION */}
                  <div className="mobile-info">
                    <h2>{item.title}</h2>

                    {item.size && (
                      <p className="mobile-size">Size: {item.size}</p>
                    )}

                    <p className="mobile-quantity-label">
                      Quantity: {item.quantity}
                    </p>

                    <p className="mobile-unit-price">
                      ${Number(item.price).toFixed(2)}
                    </p>

                    <div className="mobile-quantity-controls">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1, item.size)
                        }
                        aria-label={`Decrease ${item.title} quantity`}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1, item.size)
                        }
                        aria-label={`Increase ${item.title} quantity`}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* REMOVE */}
                  <button
                    type="button"
                    className="mobile-remove"
                    onClick={() => removeFromCart(item.id, item.size)}
                    aria-label={`Remove ${item.title} from cart`}
                  >
                    ×
                  </button>
                </div>

                {/* ITEM TOTAL */}
                <div className="mobile-item-total">
                  <strong>
                    ${(Number(item.price) * item.quantity).toFixed(2)}
                  </strong>
                </div>
              </article>
            ))}
          </div>

          <Link href="/shop" className="continue-shopping">
            ‹ Continue Shopping
          </Link>
        </section>

        {/* =========================
            CART TOTALS
        ========================= */}

        <aside className="cart-summary">
          <h3>Cart Totals</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${Number(cartTotal).toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>

            <span>
              {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
            </span>
          </div>

          <div className="summary-row summary-total">
            <span>Total</span>
            <span>${Number(finalTotal).toFixed(2)}</span>
          </div>

          <Link href="/checkout" className="checkout-link">
            CHECKOUT
          </Link>

          <p className="shipping-note">Free delivery on all orders over $250</p>
        </aside>
      </div>

      <style jsx>{`
        .cart-page {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 40px;
          box-sizing: border-box;
        }

        .cart-title {
          font-family: var(--font-playfair), serif;
          margin: 0 0 40px;
        }

        .cart-layout {
          display: flex;
          gap: 40px;
          align-items: flex-start;
        }

        .products-section {
          flex: 2;
          min-width: 0;
        }

        /* =========================
           DESKTOP
        ========================= */

        .desktop-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 30px;
          gap: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #e5e0d8;
          color: var(--gray-text);
          font-size: 13px;
        }

        .desktop-item {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 30px;
          gap: 16px;
          align-items: center;
          padding: 20px 0;
          border-bottom: 1px solid #e5e0d8;
        }

        .desktop-product {
          display: flex;
          align-items: center;
          gap: 16px;
          min-width: 0;
        }

        .desktop-image {
          position: relative;
          width: 64px;
          height: 64px;
          flex-shrink: 0;
        }

        .desktop-product-info {
          min-width: 0;
        }

        .product-name {
          display: block;
          font-family: var(--font-playfair), serif;
        }

        .product-size {
          display: block;
          margin-top: 5px;
          font-size: 12px;
          color: var(--gray-text);
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .quantity-controls button {
          width: 30px;
          height: 30px;
          border: 1px solid #d9d3c7;
          background: #fff;
          cursor: pointer;
          font-size: 16px;
        }

        .remove-button {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--gray-text);
          font-size: 20px;
        }

        /* Hide mobile version on desktop */
        .mobile-cart {
          display: none;
        }

        .continue-shopping {
          display: inline-block;
          margin-top: 22px;
          color: var(--gray-text);
          font-size: 14px;
        }

        /* =========================
           SUMMARY
        ========================= */

        .cart-summary {
          flex: 1;
          min-width: 280px;
          background: var(--cream);
          border: 1px solid #e5e0d8;
          padding: 28px;
          box-sizing: border-box;
        }

        .cart-summary h3 {
          font-family: var(--font-playfair), serif;
          margin: 0 0 22px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 14px;
        }

        .summary-total {
          border-top: 1px solid #e5e0d8;
          padding-top: 15px;
          margin-top: 15px;
          margin-bottom: 22px;
          font-weight: 600;
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
          font-size: 13px;
          letter-spacing: 1px;
        }

        .shipping-note {
          font-size: 12px;
          color: var(--gray-text);
          margin: 12px 0 0;
          text-align: center;
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 767px) {
          .cart-page {
            width: 100%;
            max-width: 100%;
            padding: 48px 24px 60px;
            overflow: hidden;
          }

          .cart-title {
            font-size: 42px;
            margin-bottom: 42px;
          }

          .cart-layout {
            display: block;
          }

          .desktop-cart {
            display: none;
          }

          .mobile-cart {
            display: block;
            width: 100%;
          }

          .mobile-item {
            width: 100%;
            padding: 0 0 24px;
            margin-bottom: 26px;
            border-bottom: 1px solid #e5e0d8;
            box-sizing: border-box;
          }

          .mobile-item-main {
            display: grid;
            grid-template-columns: 105px minmax(0, 1fr) 28px;
            gap: 18px;
            align-items: start;
            width: 100%;
          }

          .mobile-image {
            position: relative;
            width: 105px;
            height: 105px;
          }

          .mobile-info {
            min-width: 0;
          }

          .mobile-info h2 {
            font-family: var(--font-playfair), serif;
            font-size: 21px;
            line-height: 1.2;
            font-weight: 400;
            margin: 0 0 9px;
            overflow-wrap: break-word;
          }

          .mobile-size {
            margin: 0 0 8px;
            color: var(--gray-text);
            font-size: 14px;
          }

          .mobile-quantity-label {
            margin: 0 0 7px;
            font-size: 14px;
            color: var(--gray-text);
          }

          .mobile-unit-price {
            margin: 0 0 13px;
            font-size: 15px;
          }

          .mobile-quantity-controls {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .mobile-quantity-controls button {
            width: 36px;
            height: 36px;
            padding: 0;
            background: #fff;
            border: 1px solid #d9d3c7;
            cursor: pointer;
            font-size: 18px;
            line-height: 1;
          }

          .mobile-quantity-controls span {
            min-width: 16px;
            text-align: center;
            font-size: 16px;
          }

          .mobile-remove {
            width: 28px;
            height: 28px;
            padding: 0;
            border: none;
            background: transparent;
            color: var(--gray-text);
            font-size: 21px;
            line-height: 1;
            cursor: pointer;
            justify-self: end;
          }

          .mobile-item-total {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 16px;
            margin-top: 18px;
            font-size: 15px;
          }

          .mobile-item-total span {
            color: var(--gray-text);
          }

          .mobile-item-total strong {
            font-size: 18px;
          }

          .continue-shopping {
            display: inline-block;
            margin: 0 0 42px;
            font-size: 14px;
            color: var(--gray-text);
            text-decoration: underline;
          }

          .cart-summary {
            width: 100%;
            min-width: 0;
            padding: 26px 22px;
            margin: 20 0 0;
          }

          .cart-summary h3 {
            font-size: 25px;
          }

          .summary-row {
            font-size: 16px;
          }

          .checkout-link {
            padding: 15px;
          }
        }

        /* Extra-small phones */
        @media (max-width: 390px) {
          .cart-page {
            padding-left: 18px;
            padding-right: 18px;
          }

          .mobile-item-main {
            grid-template-columns: 90px minmax(0, 1fr) 24px;
            gap: 14px;
          }

          .mobile-image {
            width: 90px;
            height: 90px;
          }

          .mobile-info h2 {
            font-size: 19px;
          }

          .mobile-quantity-controls {
            gap: 9px;
          }

          .mobile-quantity-controls button {
            width: 34px;
            height: 34px;
          }
        }
      `}</style>
    </main>
  );
}
