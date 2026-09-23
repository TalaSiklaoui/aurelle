"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Products", href: "/admin/products" },
  { label: "Messages", href: "/admin/messages" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="desktop-sidebar">
        <div>
          <div className="desktop-logo">
            <h2>AURELLE</h2>
            <p>ADMIN</p>
          </div>

          <nav>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`desktop-link ${
                  isActive(item.href) ? "active" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* MOBILE TOP NAV */}
      <header className="mobile-admin-header">
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open admin menu"
        >
          <span />
          <span />
          <span />
        </button>

        <div className="mobile-logo">
          <h2>AURELLE</h2>
          <p>ADMIN</p>
        </div>

        {/* keeps logo perfectly centered */}
        <div className="menu-spacer" />

        {menuOpen && (
          <nav className="mobile-menu">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={isActive(item.href) ? "active" : ""}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <style jsx>{`
        .desktop-sidebar {
          width: 240px;
          min-width: 240px;
          height: 100vh;
          background: var(--black);
          padding: 32px 20px;
          position: sticky;
          top: 0;
          box-sizing: border-box;
        }

        .desktop-logo {
          text-align: center;
          margin-bottom: 48px;
        }

        .desktop-logo h2,
        .mobile-logo h2 {
          margin: 0;
          color: var(--gold);
          font-size: 22px;
          letter-spacing: 2px;
        }

        .desktop-logo p,
        .mobile-logo p {
          color: #999;
          font-size: 10px;
          letter-spacing: 3px;
          margin: 4px 0 0;
        }

        .desktop-link {
          display: block;
          padding: 12px 14px;
          margin-bottom: 4px;
          border-radius: 4px;
          color: #ccc;
          text-decoration: none;
          font-size: 14px;
        }

        .desktop-link.active {
          color: var(--gold);
          background: rgba(201, 162, 75, 0.12);
        }

        .mobile-admin-header {
          display: none;
        }

        @media (max-width: 768px) {
          .desktop-sidebar {
            display: none;
          }

          .mobile-admin-header {
            width: 100%;
            height: 82px;
            background: var(--black);
            display: grid;
            grid-template-columns: 50px 1fr 50px;
            align-items: center;
            padding: 0 20px;
            box-sizing: border-box;
            position: relative;
            z-index: 100;
          }

          .mobile-logo {
            text-align: center;
          }

          .mobile-logo h2 {
            font-size: 20px;
          }

          .menu-button {
            width: 38px;
            height: 38px;
            border: none;
            background: transparent;
            padding: 7px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
          }

          .menu-button span {
            display: block;
            width: 23px;
            height: 1px;
            background: #fff;
          }

          .mobile-menu {
            position: absolute;
            top: 82px;
            left: 0;
            width: 100%;
            background: var(--black);
            padding: 12px 20px 22px;
            box-sizing: border-box;
            border-top: 1px solid #333;
          }

          .mobile-menu a {
            display: block;
            color: #ccc;
            text-decoration: none;
            padding: 14px 6px;
            font-size: 14px;
            border-bottom: 1px solid #292929;
          }

          .mobile-menu a.active {
            color: var(--gold);
          }
        }
      `}</style>
    </>
  );
}
