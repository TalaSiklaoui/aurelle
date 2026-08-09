import { prisma } from "@/lib/prisma";
import ProductCard from "./ProductCard";

const bestSellerTitles = [
  "Oval Halo Pendant",
  "Solitaire Engagement Ring",
  "Classic Stud Earrings",
  "Starlight Bangle",
];

export default async function ProductGrid() {
  const bestSellers = await prisma.product.findMany({
    where: { title: { in: bestSellerTitles } },
  });

  return (
    <section style={{ padding: "80px 60px", textAlign: "center" }}>
      <h2 style={{ fontSize: "32px", marginBottom: "16px" }}>Best Sellers</h2>
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
          flexWrap: "wrap",
          gap: "24px",
          justifyContent: "center",
        }}
      >
        {bestSellers.map((product, index) => (
          <ProductCard key={product.id} product={product} isNew={index < 3} />
        ))}
      </div>
    </section>
  );
}
