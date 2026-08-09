import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div style={{ maxWidth: "900px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ marginBottom: "4px" }}>Add Product</h1>
        <p style={{ color: "var(--gray-text)" }}>
          Create a new piece for the AURELLE catalog.
        </p>
      </div>
      <ProductForm />
    </div>
  );
}
