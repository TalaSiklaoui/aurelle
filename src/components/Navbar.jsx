"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { itemCount } = useCart();

  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) return;

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Search failed:", error);
      }
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="navbar">
      {/* MOBILE HAMBURGER */}
      <button
        className="mobile-menu-button"
        onClick={() => setMobileMenuOpen((open) => !open)}
        aria-label="Open menu"
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {/* DESKTOP LINKS */}
      <div className="desktop-nav-links">
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

      {/* LOGO */}
      <Link href="/" className="navbar-logo">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.2"
          className="navbar-diamond"
        >
          <path d="M6 3h12l4 6-10 12L2 9z" />
          <path d="M2 9h20M9 3l-3 6 6 12 6-12-3-6" />
        </svg>

        <h1>AURELLE</h1>
        <p>JEWELRY</p>
      </Link>

      {/* RIGHT ICONS */}
      <div className="navbar-actions">
        <div ref={searchRef} className="navbar-search">
          <button
            className="navbar-icon-button"
            onClick={() => setSearchOpen((open) => !open)}
            aria-label="Search"
          >
            <svg
              width="19"
              height="19"
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
            <div className="search-dropdown">
              <input
                autoFocus
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);

                  if (!e.target.value.trim()) {
                    setResults([]);
                  }
                }}
              />

              {query.trim() && (
                <div className="search-results">
                  {results.length > 0 ? (
                    results.map((p) => (
                      <Link
                        key={p.id}
                        href={`/product/${p.id}`}
                        className="search-result-item"
                        onClick={() => {
                          setSearchOpen(false);
                          setQuery("");
                        }}
                      >
                        <div className="search-result-image">
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            sizes="36px"
                            style={{ objectFit: "cover" }}
                          />
                        </div>

                        <div>
                          <p className="search-result-title">{p.title}</p>
                          <p className="search-result-price">${p.price}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="no-search-results">No products found.</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <Link
          href="/account"
          className="navbar-action-link"
          aria-label="Account"
        >
          <svg
            width="19"
            height="19"
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
          className="navbar-action-link cart-link"
          aria-label="Cart"
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.7 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6" />
          </svg>

          {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
        </Link>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="mobile-nav-menu">
          <Link href="/" onClick={closeMobileMenu}>
            Home
          </Link>

          <Link href="/shop" onClick={closeMobileMenu}>
            Shop
          </Link>

          <Link href="/about" onClick={closeMobileMenu}>
            About
          </Link>

          <Link href="/contact" onClick={closeMobileMenu}>
            Contact
          </Link>
        </div>
      )}
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
