import Link from "next/link";
import Image from "next/image";

const collections = [
  { name: "Rings", image: "/images/Aure_r02.jpeg" },
  { name: "Necklaces", image: "/images/Aure_n01.jpeg" },
  { name: "Bracelets", image: "/images/Aure_br02.jpeg" },
  { name: "Earrings", image: "/images/Aure_er03.jpeg" },
];

export default function Collections() {
  return (
    <section
      id="collections"
      style={{ padding: "80px 60px", textAlign: "center" }}
    >
      <h2 style={{ fontSize: "32px", marginBottom: "16px" }}>
        Shop by Collection
      </h2>
      <div
        style={{
          width: "40px",
          height: "2px",
          backgroundColor: "var(--gold)",
          margin: "0 auto 48px",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        {collections.map((item) => (
          <div key={item.name} style={{ width: "220px" }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "220px",
                backgroundColor: "#F0EAE0",
                borderRadius: "4px",
                overflow: "hidden",
                marginBottom: "16px",
              }}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <h3
              style={{
                fontSize: "13px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              {item.name}
            </h3>
            <Link
              href={`/shop?category=${item.name}`}
              style={{
                fontSize: "12px",
                color: "var(--black)",
                textDecoration: "none",
                letterSpacing: "0.5px",
              }}
            >
              Discover →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
