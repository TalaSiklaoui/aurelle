import Link from "next/link";

export default function OrderConfirmationPage() {
  return (
    <div style={{ padding: "100px 40px", textAlign: "center" }}>
      <div
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: "2px solid var(--gold)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
          fontSize: "28px",
          color: "var(--gold)",
        }}
      >
        ✓
      </div>
      <h1 style={{ fontFamily: "Playfair Display, serif" }}>Thank You!</h1>
      <p
        style={{
          color: "var(--gray-text)",
          marginTop: "12px",
          maxWidth: "400px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Your order has been placed successfully. You will receive an email
        confirmation shortly.
      </p>
      <Link href="/shop">
        <button
          style={{
            marginTop: "32px",
            backgroundColor: "transparent",
            color: "var(--black)",
            border: "1px solid var(--black)",
            padding: "14px 32px",
            fontSize: "13px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Continue Shopping
        </button>
      </Link>
    </div>
  );
}
