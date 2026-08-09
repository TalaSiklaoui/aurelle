import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductActions from "@/components/ProductActions";
import Accordion from "@/components/Accordion";

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  if (!product) notFound();

  return (
    <div>
      <section
        style={{
          display: "flex",
          gap: "60px",
          padding: "80px 60px 40px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "relative", width: "400px", height: "400px" }}>
          <Image
            src={product.image}
            alt={product.title}
            fill
            style={{ objectFit: "cover", backgroundColor: "#F0EAE0" }}
          />
        </div>

        <div style={{ maxWidth: "400px" }}>
          <Link
            href="/shop"
            style={{
              fontSize: "12px",
              color: "var(--gray-text)",
              textDecoration: "none",
            }}
          >
            ← Back to Shop
          </Link>

          <h1 style={{ fontSize: "28px", margin: "16px 0 8px" }}>
            {product.title}
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "var(--gold)",
              marginBottom: "20px",
            }}
          >
            ${product.price}
          </p>
          <p
            style={{
              fontSize: "14px",
              color: "var(--gray-text)",
              lineHeight: "1.7",
              marginBottom: "28px",
            }}
          >
            {product.description}
          </p>

          <ProductActions product={product} />
        </div>
      </section>

      <section
        style={{ padding: "0 60px 80px", maxWidth: "980px", margin: "0 auto" }}
      >
        <Accordion title="Details">
          Crafted with care using premium materials, designed to be worn every
          day and cherished for years to come.
        </Accordion>
        <Accordion title="Delivery">
          Free delivery on all orders over $250. Standard delivery takes 3–5
          business days.
        </Accordion>
        <Accordion title="Returns & Exchanges">
          We offer 14-day easy returns. Items must be unworn and in original
          packaging.
        </Accordion>
      </section>
    </div>
  );
}
