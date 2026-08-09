"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { itemCount } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timeout = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    }, 250);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 60px",
        backgroundColor: "var(--cream)",
        borderBottom: "1px solid #E5DFD3",
        position: "relative",
        minHeight: "80px",
      }}
    >
      <div style={{ display: "flex", gap: "32px" }}>
        <Link href="/" style={navLinkStyle}>
          Home
        </Link>
        <Link href="/shop" style={navLinkStyle}>
          Shop
        </Link>
        <Link href="/about" style={navLinkStyle}>
          About
        </Link>
        <Link href="/contact" style={navLinkStyle}>
          Contact
        </Link>
      </div>

      <div
        style={{
          textAlign: "center",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.2"
          style={{ marginBottom: "4px" }}
        >
          <path d="M6 3h12l4 6-10 12L2 9z" />
          <path d="M2 9h20M9 3l-3 6 6 12 6-12-3-6" />
        </svg>
        <h1
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "24px",
            letterSpacing: "3px",
            margin: 0,
          }}
        >
          AURELLE
        </h1>
        <p
          style={{
            fontSize: "9px",
            letterSpacing: "3px",
            color: "var(--black)",
            marginTop: "2px",
          }}
        >
          JEWELRY
        </p>
      </div>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <div ref={searchRef} style={{ position: "relative" }}>
          <button
            onClick={() => setSearchOpen((open) => !open)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {searchOpen && (
            <div
              style={{
                position: "absolute",
                top: "36px",
                right: 0,
                width: "280px",
                backgroundColor: "#fff",
                border: "1px solid #E5DFD3",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                zIndex: 20,
              }}
            >
              <input
                autoFocus
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: "none",
                  borderBottom: "1px solid #E5DFD3",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  outline: "none",
                }}
              />
              {query.trim() && (
                <div style={{ maxHeight: "280px", overflowY: "auto" }}>
                  {results.length > 0 ? (
                    results.map((p) => (
                      <Link
                        key={p.id}
                        href={`/product/${p.id}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setQuery("");
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          padding: "10px 14px",
                          textDecoration: "none",
                          color: "var(--black)",
                          borderBottom: "1px solid #F0EBE0",
                        }}
                      >
                        <div
                          style={{
                            position: "relative",
                            width: "36px",
                            height: "36px",
                          }}
                        >
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div>
                          <p style={{ fontSize: "13px", margin: 0 }}>
                            {p.title}
                          </p>
                          <p
                            style={{
                              fontSize: "12px",
                              color: "var(--gold)",
                              margin: 0,
                            }}
                          >
                            ${p.price}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p
                      style={{
                        padding: "14px",
                        fontSize: "13px",
                        color: "var(--gray-text)",
                      }}
                    >
                      No products found.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <Link
          href="/account"
          style={{ color: "var(--black)", display: "flex" }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
          </svg>
        </Link>

        <Link
          href="/cart"
          style={{ position: "relative", color: "var(--black)" }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.7 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6" />
          </svg>
          <span
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              backgroundColor: "var(--black)",
              color: "white",
              fontSize: "9px",
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {itemCount}
          </span>
        </Link>
      </div>
    </nav>
  );
}

const navLinkStyle = {
  textDecoration: "none",
  color: "var(--black)",
  fontSize: "13px",
  letterSpacing: "0.5px",
  textTransform: "uppercase",
};
