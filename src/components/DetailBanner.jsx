import Link from "next/link";
import Image from "next/image";

export default function DetailBanner() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "450px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Image
        src="/images/Aure_openning_ring.jpeg"
        alt="Detail of fine jewelry"
        fill
        style={{ objectFit: "cover", zIndex: 0 }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "60px",
          maxWidth: "420px",
          color: "white",
        }}
      >
        <h2
          style={{ fontSize: "36px", lineHeight: "1.3", marginBottom: "20px" }}
        >
          Elegance is in
          <br />
          the Details
        </h2>

        <div
          style={{
            width: "40px",
            height: "2px",
            backgroundColor: "var(--gold)",
            marginBottom: "20px",
          }}
        />

        <p
          style={{
            fontSize: "14px",
            lineHeight: "1.6",
            marginBottom: "28px",
            color: "#E5E0D5",
          }}
        >
          Every piece tells a story of craftsmanship, design, and timeless
          elegance.
        </p>

        <Link href="/shop">
          <button
            style={{
              backgroundColor: "transparent",
              color: "white",
              border: "1px solid var(--gold)",
              padding: "14px 28px",
              fontSize: "13px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            View Collection
          </button>
        </Link>
      </div>
    </section>
  );
}
