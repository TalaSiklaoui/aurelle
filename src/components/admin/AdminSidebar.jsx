"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Products", href: "/admin/products" },
  { label: "Messages", href: "/admin/messages" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside className="admin-sidebar">
        <div className="admin-main">
          <div className="admin-logo">
            <h2>AURELLE</h2>
            <p>ADMIN</p>
          </div>

          <nav className="admin-nav">
            {navItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`admin-link ${isActive ? "active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <button
          className="logout-button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
        >
          Log out
        </button>
      </aside>

      <style jsx>{`
        .admin-sidebar {
          width: 240px;
          min-width: 240px;
          height: 100vh;
          background-color: var(--black);
          color: #fff;
          padding: 32px 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: sticky;
          top: 0;
          box-sizing: border-box;
          z-index: 20;
        }

        .admin-logo {
          margin-bottom: 48px;
          text-align: center;
        }

        .admin-logo h2 {
          color: var(--gold);
          font-size: 22px;
          letter-spacing: 2px;
          margin: 0;
        }

        .admin-logo p {
          font-size: 10px;
          letter-spacing: 3px;
          color: #999;
          margin-top: 4px;
        }

        .admin-nav {
          display: flex;
          flex-direction: column;
        }

        .admin-link {
          display: block;
          padding: 12px 14px;
          margin-bottom: 4px;
          border-radius: 4px;
          color: #ccc;
          background-color: transparent;
          text-decoration: none;
          font-size: 14px;
          transition: 0.2s ease;
        }

        .admin-link.active {
          color: var(--gold);
          background-color: rgba(201, 162, 75, 0.12);
        }

        .logout-button {
          background: none;
          border: 1px solid #444;
          color: #ccc;
          padding: 10px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 13px;
        }

        @media (max-width: 768px) {
          .admin-sidebar {
            width: 100%;
            min-width: 0;
            height: auto;
            position: relative;
            padding: 18px 20px 14px;
            flex-direction: column;
            gap: 16px;
          }

          .admin-main {
            width: 100%;
          }

          .admin-logo {
            margin-bottom: 16px;
            text-align: center;
          }

          .admin-logo h2 {
            font-size: 20px;
          }

          .admin-logo p {
            margin: 3px 0 0;
          }

          .admin-nav {
            width: 100%;
            flex-direction: row;
            overflow-x: auto;
            gap: 6px;
            padding-bottom: 2px;
            scrollbar-width: none;
          }

          .admin-nav::-webkit-scrollbar {
            display: none;
          }

          .admin-link {
            flex: 0 0 auto;
            margin: 0;
            padding: 9px 12px;
            font-size: 12px;
            white-space: nowrap;
          }

          .logout-button {
            width: 100%;
            padding: 9px;
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
}
