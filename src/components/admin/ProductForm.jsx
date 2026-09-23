"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        setError("Image upload failed.");
        return;
      }

      const data = await res.json();
      setImage(data.url);
    } catch {
      setError("Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSaving(true);
    setError("");

    const payload = {
      title,
      price,
      image,
      category,
      description,
    };

    const url = isEditing
      ? `/api/admin/products/${initialData.id}`
      : "/api/admin/products";

    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        setError("Something went wrong saving this product.");
        return;
      }

      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Something went wrong saving this product.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="product-form-grid">
          {/* TITLE */}
          <div className="form-field">
            <label>Title</label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* PRICE */}
          <div className="form-field">
            <label>Price (USD)</label>

            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* CATEGORY */}
          <div className="form-field">
            <label>Category</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((categoryName) => (
                <option key={categoryName} value={categoryName}>
                  {categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* IMAGE */}
          <div className="form-field">
            <label>Product Image</label>

            <input
              className="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />

            {uploading && <p className="upload-text">Uploading...</p>}
          </div>
        </div>

        {/* IMAGE PREVIEW */}
        {image && !uploading && (
          <div className="image-preview-wrapper">
            <Image
              src={image}
              alt="Product preview"
              width={180}
              height={180}
              className="image-preview"
            />
          </div>
        )}

        {/* DESCRIPTION */}
        <div className="form-field description-field">
          <label>Description</label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            required
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <button
          type="submit"
          disabled={saving || uploading}
          className="save-product-button"
        >
          {saving ? "SAVING..." : isEditing ? "SAVE CHANGES" : "CREATE PRODUCT"}
        </button>
      </form>

      <style jsx global>{`
        .product-form {
          width: 100%;
          box-sizing: border-box;
          background: #fff;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          border: 1px solid #f0eee9;
          overflow: hidden;
        }

        .product-form-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          column-gap: 28px;
          row-gap: 4px;
        }

        .form-field {
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }

        .form-field label {
          display: block;
          color: var(--gray-text);
          font-size: 13px;
          margin-bottom: 8px;
        }

        .form-field input:not([type="file"]),
        .form-field select,
        .form-field textarea {
          display: block;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          padding: 12px 13px;
          margin: 0 0 20px;
          border: 1px solid #ddd;
          border-radius: 3px;
          background: #fff;
          color: var(--black);
          font-family: inherit;
          font-size: 14px;
          outline: none;
        }

        .form-field input:not([type="file"]):focus,
        .form-field select:focus,
        .form-field textarea:focus {
          border-color: #b9ad97;
        }

        .form-field select {
          min-height: 45px;
        }

        .form-field textarea {
          resize: vertical;
          min-height: 150px;
          line-height: 1.5;
        }

        .file-input {
          display: block;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          font-family: inherit;
          font-size: 13px;
          color: var(--gray-text);
          margin-bottom: 20px;
          overflow: hidden;
        }

        .file-input::file-selector-button {
          background: #f3f1ed;
          color: var(--black);
          border: 1px solid #ddd;
          border-radius: 3px;
          padding: 9px 12px;
          margin-right: 10px;
          cursor: pointer;
          font-family: inherit;
        }

        .upload-text {
          color: var(--gray-text);
          font-size: 12px;
          margin: -10px 0 18px;
        }

        .image-preview-wrapper {
          margin: 2px 0 24px;
        }

        .image-preview {
          display: block;
          width: 180px;
          height: 180px;
          object-fit: cover;
          border-radius: 5px;
        }

        .description-field {
          margin-top: 2px;
        }

        .form-error {
          color: #b23b3b;
          font-size: 13px;
          margin: -4px 0 18px;
        }

        .save-product-button {
          min-width: 180px;
          background: var(--black);
          color: var(--gold);
          border: none;
          padding: 14px 28px;
          border-radius: 3px;
          font-size: 12px;
          letter-spacing: 1px;
          cursor: pointer;
          font-family: inherit;
        }

        .save-product-button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        /* =====================
           MOBILE
        ====================== */

        @media (max-width: 768px) {
          .product-form {
            padding: 28px 20px;
            border-radius: 7px;
          }

          .product-form-grid {
            display: block;
          }

          .form-field {
            width: 100%;
          }

          .form-field label {
            font-size: 13px;
            margin-bottom: 7px;
          }

          .form-field input:not([type="file"]),
          .form-field select {
            width: 100%;
            height: 48px;
            padding: 11px 12px;
            margin-bottom: 20px;
            font-size: 15px;
          }

          .form-field textarea {
            width: 100%;
            min-height: 160px;
            margin-bottom: 22px;
            padding: 12px;
            font-size: 14px;
          }

          .file-input {
            width: 100%;
            margin-bottom: 22px;
            font-size: 12px;
          }

          .image-preview-wrapper {
            width: 100%;
            margin: 0 0 24px;
          }

          .image-preview {
            width: 150px;
            height: 150px;
          }

          .save-product-button {
            width: 100%;
            min-width: 0;
            padding: 15px 20px;
          }
        }

        @media (max-width: 420px) {
          .product-form {
            padding: 24px 18px;
          }

          .image-preview {
            width: 140px;
            height: 140px;
          }
        }
      `}</style>
    </>
  );
}
