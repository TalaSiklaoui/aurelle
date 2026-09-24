"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
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

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="admin-desktop-sidebar">
        <div className="admin-desktop-top">
          <div className="admin-desktop-logo">
            <h2>AURELLE</h2>
            <p>ADMIN</p>
          </div>

          <nav>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-desktop-link ${
                  isActive(item.href) ? "admin-active" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* DESKTOP-ONLY LOGOUT */}
        <button
          type="button"
          className="admin-desktop-logout"
          onClick={handleLogout}
        >
          LOG OUT
        </button>
      </aside>

      {/* MOBILE HEADER */}
      <header className="admin-mobile-header">
        <div className="admin-header-row">
          <button
            type="button"
            className={`admin-menu-button ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close admin menu" : "Open admin menu"}
          >
            {menuOpen ? (
              <span className="admin-close">×</span>
            ) : (
              <>
                <span className="admin-line" />
                <span className="admin-line" />
                <span className="admin-line" />
              </>
            )}
          </button>

          <div className="admin-mobile-logo">
            <h2>AURELLE</h2>
            <p>ADMIN</p>
          </div>

          <div className="admin-menu-spacer" />
        </div>

        {menuOpen && (
          <nav className="admin-mobile-menu">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`admin-mobile-link ${
                  isActive(item.href) ? "admin-mobile-active" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <style jsx global>{`
        /* =========================
           DESKTOP ADMIN SIDEBAR
        ========================== */

        .admin-desktop-sidebar {
          width: 240px;
          min-width: 240px;
          height: 100vh;
          background: var(--black);
          padding: 32px 20px;
          position: sticky;
          top: 0;
          box-sizing: border-box;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .admin-desktop-top {
          width: 100%;
        }

        .admin-desktop-logo {
          text-align: center;
          margin-bottom: 48px;
        }

        .admin-desktop-logo h2 {
          margin: 0;
          color: var(--gold);
          font-size: 22px;
          letter-spacing: 3px;
        }

        .admin-desktop-logo p {
          color: #999;
          font-size: 10px;
          letter-spacing: 4px;
          margin: 5px 0 0;
        }

        .admin-desktop-link {
          display: block;
          padding: 12px 14px;
          margin-bottom: 4px;
          border-radius: 4px;
          color: #ccc !important;
          text-decoration: none !important;
          font-size: 14px;
        }

        .admin-desktop-link.admin-active {
          color: var(--gold) !important;
          background: rgba(201, 162, 75, 0.12);
        }

        /* DESKTOP LOGOUT */

        .admin-desktop-logout {
          width: 100%;
          padding: 12px 14px;
          background: transparent;
          border: 1px solid #444;
          border-radius: 4px;
          color: #ccc;
          font-family: inherit;
          font-size: 12px;
          letter-spacing: 1.5px;
          cursor: pointer;

          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;

          transition:
            color 0.2s ease,
            border-color 0.2s ease,
            background 0.2s ease;
        }

        .admin-desktop-logout:hover {
          color: var(--gold);
          border-color: var(--gold);
          background: rgba(201, 162, 75, 0.08);
        }

        /* Hide mobile navbar on desktop */

        .admin-mobile-header {
          display: none;
        }

        /* =========================
           MOBILE ADMIN NAVBAR
        ========================== */

        @media (max-width: 768px) {
          .admin-desktop-sidebar {
            display: none;
          }

          .admin-mobile-header {
            display: block;
            width: 100%;
            background: var(--black);
            position: relative;
            z-index: 1000;
          }

          .admin-header-row {
            height: 116px;
            width: 100%;
            display: grid;
            grid-template-columns: 60px 1fr 60px;
            align-items: center;
            padding: 0 28px;
            box-sizing: border-box;
          }

          /* Hamburger */

          .admin-menu-button {
            width: 42px;
            height: 42px;
            padding: 0;
            margin: 0;
            border: none;
            background: transparent;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            gap: 6px;
          }

          .admin-line {
            width: 31px;
            height: 1.5px;
            background: #fff;
            display: block;
          }

          .admin-close {
            color: #fff;
            font-size: 38px;
            line-height: 1;
            font-weight: 200;
            margin-top: -3px;
          }

          /* Logo */

          .admin-mobile-logo {
            text-align: center;
            line-height: 1;
          }

          .admin-mobile-logo h2 {
            margin: 0;
            color: var(--gold);
            font-size: 23px;
            font-weight: 500;
            letter-spacing: 3px;
            font-family: var(--font-playfair), serif;
          }

          .admin-mobile-logo p {
            margin: 10px 0 0;
            color: #aaa;
            font-size: 10px;
            letter-spacing: 5px;
            font-family: inherit;
          }

          .admin-menu-spacer {
            width: 42px;
          }

          /* Dropdown */

          .admin-mobile-menu {
            width: 100%;
            background: var(--cream);
            border-top: 1px solid #ded9d0;
          }

          .admin-mobile-link {
            display: flex !important;
            align-items: center;
            width: 100%;
            min-height: 69px;
            padding: 0 32px !important;
            box-sizing: border-box;
            border-bottom: 1px solid #ded9d0;
            color: var(--black) !important;
            background: var(--cream) !important;
            text-decoration: none !important;
            text-transform: uppercase;
            font-size: 13px !important;
            font-weight: 400 !important;
            letter-spacing: 1.5px;
          }

          .admin-mobile-link:visited,
          .admin-mobile-link:hover,
          .admin-mobile-link:focus {
            color: var(--black) !important;
            text-decoration: none !important;
          }

          .admin-mobile-link.admin-mobile-active {
            color: var(--gold) !important;
          }
        }
      `}</style>
    </>
  );
}
