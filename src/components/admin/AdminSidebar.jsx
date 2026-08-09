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
    <aside
      style={{
        width: "240px",
        height: "100vh",
        backgroundColor: "var(--black)",
        color: "#fff",
        padding: "32px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
      }}
    >
      <div>
        <div style={{ marginBottom: "48px", textAlign: "center" }}>
          <h2
            style={{
              color: "var(--gold)",
              fontSize: "22px",
              letterSpacing: "2px",
              margin: 0,
            }}
          >
            AURELLE
          </h2>
          <p
            style={{
              fontSize: "10px",
              letterSpacing: "3px",
              color: "#999",
              marginTop: "4px",
            }}
          >
            ADMIN
          </p>
        </div>

        <nav>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "block",
                  padding: "12px 14px",
                  marginBottom: "4px",
                  borderRadius: "4px",
                  color: isActive ? "var(--gold)" : "#ccc",
                  backgroundColor: isActive
                    ? "rgba(201,162,75,0.12)"
                    : "transparent",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <button
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        style={{
          background: "none",
          border: "1px solid #444",
          color: "#ccc",
          padding: "10px",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "13px",
        }}
      >
        Log out
      </button>
    </aside>
  );
}
