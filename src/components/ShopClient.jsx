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
  const [filtersOpen, setFiltersOpen] = useState(false);

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

    if (sortBy === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

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

  const filters = (
    <>
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
          onClick={() => {
            setActiveCategory(cat);
            setFiltersOpen(false);
          }}
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
    </>
  );

  return (
    <section className="shop-page">
      <h1 className="shop-title">Shop All</h1>

      <div className="shop-title-line" />

      <div className="shop-mobile-controls">
        <button
          className="shop-filter-button"
          onClick={() => setFiltersOpen((open) => !open)}
        >
          Filter {filtersOpen ? "−" : "+"}
        </button>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="shop-sort"
        >
          <option value="featured">Sort: Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {filtersOpen && <div className="shop-mobile-filters">{filters}</div>}

      <div className="shop-layout">
        <aside className="shop-sidebar">{filters}</aside>

        <div className="shop-products-area">
          <div className="shop-desktop-sort">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="shop-sort"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {filteredProducts.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                color: "var(--gray-text)",
              }}
            >
              No products match your filters.
            </p>
          ) : (
            <div className="shop-product-grid">
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
