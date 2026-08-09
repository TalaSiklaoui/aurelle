import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product, isNew }) {
  return (
    <Link
      href={`/product/${product.id}`}
      style={{
        width: "220px",
        textDecoration: "none",
        color: "inherit",
        display: "block",
      }}
    >
      <div
        style={{
          position: "relative",
          backgroundColor: "#F0EAE0",
          borderRadius: "4px",
          overflow: "hidden",
          marginBottom: "16px",
          height: "220px",
        }}
      >
        {isNew && (
          <span
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              backgroundColor: "var(--black)",
              color: "white",
              fontSize: "10px",
              letterSpacing: "1px",
              padding: "4px 10px",
              textTransform: "uppercase",
              zIndex: 1,
            }}
          >
            New
          </span>
        )}
        <Image
          src={product.image}
          alt={product.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <h3
        style={{
          textAlign: "center",
          fontSize: "13px",
          letterSpacing: "1px",
          textTransform: "uppercase",
          marginBottom: "4px",
          fontWeight: "500",
        }}
      >
        {product.title}
      </h3>

      <p
        style={{
          textAlign: "center",
          fontSize: "12px",
          color: "var(--black)",
          letterSpacing: "0.5px",
        }}
      >
        ${product.price}
      </p>
    </Link>
  );
}
