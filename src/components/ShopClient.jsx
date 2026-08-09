"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";

const categories = ["All", "Rings", "Necklaces", "Bracelets", "Earrings"];

export default function ShopClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(200);
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;
      const matchesPrice = p.price <= maxPrice;
      return matchesCategory && matchesPrice;
    });

    if (sortBy === "price-low")
      result = [...result].sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high")
      result = [...result].sort((a, b) => b.price - a.price);

    return result;
  }, [products, activeCategory, maxPrice, sortBy]);

  const categoryButtonStyle = (cat) => ({
    display: "block",
    width: "100%",
    textAlign: "left",
    background: "none",
    border: "none",
    padding: "8px 0",
    fontSize: "13px",
    color: activeCategory === cat ? "var(--black)" : "var(--gray-text)",
    fontWeight: activeCategory === cat ? "600" : "400",
    cursor: "pointer",
  });

  if (loading) {
    return <p style={{ textAlign: "center", padding: "80px" }}>Loading...</p>;
  }

  return (
    <section style={{ padding: "60px", textAlign: "center" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "16px" }}>Shop All</h1>
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
          gap: "48px",
          textAlign: "left",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <aside style={{ width: "180px", flexShrink: 0 }}>
          <p
            style={{
              fontSize: "12px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: "12px",
              fontWeight: "600",
            }}
          >
            Category
          </p>
          {categories.map((cat) => (
            <button
              key={cat}
              style={categoryButtonStyle(cat)}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}

          <p
            style={{
              fontSize: "12px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              margin: "28px 0 12px",
              fontWeight: "600",
            }}
          >
            Max Price: ${maxPrice}
          </p>
          <input
            type="range"
            min="40"
            max="200"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </aside>

        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "24px",
            }}
          >
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: "8px 12px",
                fontSize: "13px",
                border: "1px solid #E5DFD3",
                backgroundColor: "white",
              }}
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {filteredProducts.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--gray-text)" }}>
              No products match your filters.
            </p>
          ) : (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "24px",
                justifyContent: "center",
              }}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} isNew={false} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
