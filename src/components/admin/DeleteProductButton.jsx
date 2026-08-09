"use client";

import { useRouter } from "next/navigation";

export default function DeleteProductButton({ productId }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this product? This cannot be undone.")) return;

    const res = await fetch(`/api/admin/products/${productId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to delete product.");
    }
  }

  return (
    <button
      onClick={handleDelete}
      style={{
        background: "none",
        border: "none",
        color: "#b23b3b",
        cursor: "pointer",
        fontSize: "13px",
        padding: 0,
      }}
    >
      Delete
    </button>
  );
}
