import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });

  if (!product) notFound();

  return (
    <div style={{ maxWidth: "900px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ marginBottom: "4px" }}>Edit Product</h1>
        <p style={{ color: "var(--gray-text)" }}>{product.title}</p>
      </div>
      <ProductForm initialData={product} />
    </div>
  );
}
