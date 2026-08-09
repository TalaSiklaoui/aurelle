"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = ["Rings", "Necklaces", "Bracelets", "Earrings"];

export default function ProductForm({ initialData }) {
  const router = useRouter();
  const isEditing = !!initialData;

  const [title, setTitle] = useState(initialData?.title || "");
  const [price, setPrice] = useState(initialData?.price || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [category, setCategory] = useState(initialData?.category || "Rings");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    setUploading(false);

    if (!res.ok) {
      setError("Image upload failed.");
      return;
    }

    const data = await res.json();
    setImage(data.url);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = { title, price, image, category, description };

    const url = isEditing
      ? `/api/admin/products/${initialData.id}`
      : "/api/admin/products";
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!res.ok) {
      setError("Something went wrong saving this product.");
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#fff",
        padding: "40px",
        borderRadius: "8px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        border: "1px solid #f0eee9",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0 24px",
        }}
      >
        <div>
          <label style={labelStyle}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Price (USD)</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginBottom: "8px", display: "block", fontSize: "14px" }}
          />
          {uploading && (
            <p style={{ fontSize: "13px", color: "var(--gray-text)" }}>
              Uploading...
            </p>
          )}
        </div>
      </div>

      {image && !uploading && (
        <img
          src={image}
          alt="Preview"
          style={{
            width: "140px",
            height: "140px",
            objectFit: "cover",
            borderRadius: "6px",
            marginBottom: "24px",
            marginTop: "4px",
            display: "block",
          }}
        />
      )}

      <label style={labelStyle}>Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={5}
        required
        style={{ ...inputStyle, resize: "vertical" }}
      />

      {error && (
        <p style={{ color: "#b23b3b", fontSize: "13px", marginBottom: "16px" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={saving || uploading}
        style={{
          backgroundColor: "var(--black)",
          color: "var(--gold)",
          border: "none",
          padding: "12px 28px",
          borderRadius: "4px",
          fontSize: "14px",
          cursor: saving ? "not-allowed" : "pointer",
          opacity: saving ? 0.7 : 1,
        }}
      >
        {saving ? "Saving..." : isEditing ? "Save Changes" : "Create Product"}
      </button>
    </form>
  );
}

const labelStyle = {
  display: "block",
  fontSize: "13px",
  color: "var(--gray-text)",
  marginBottom: "6px",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  marginBottom: "18px",
  border: "1px solid #ddd",
  borderRadius: "3px",
  fontSize: "14px",
  fontFamily: "inherit",
};
