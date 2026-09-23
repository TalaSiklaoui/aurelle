import { prisma } from "@/lib/prisma";
import ProductCard from "./ProductCard";
import "./ProductGrid.css";

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
    <section className="product-grid-section">
      <h2>Best Sellers</h2>

      <div className="product-grid-line" />

      <div className="product-grid">
        {bestSellers.map((product, index) => (
          <ProductCard key={product.id} product={product} isNew={index < 3} />
        ))}
      </div>
    </section>
  );
}
