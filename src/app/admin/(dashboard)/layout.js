"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { signOut } from "next-auth/react";

export default function DashboardLayout({ children }) {
  return (
    <>
      <div className="admin-layout">
        <AdminSidebar />

        <main className="admin-main">
          <div className="admin-content">{children}</div>

          {/* MOBILE-ONLY LOGOUT */}
          <div className="logout-area">
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="logout-button"
            >
              LOG OUT
            </button>
          </div>
        </main>
      </div>

      <style jsx>{`
        .admin-layout {
          display: flex;
          align-items: flex-start;
          min-height: 100vh;
          width: 100%;
        }

        .admin-main {
          flex: 1;
          min-width: 0;
          min-height: 100vh;
          background: var(--cream);
          display: flex;
          flex-direction: column;
        }

        .admin-content {
          flex: 1;
          padding: 40px;
          box-sizing: border-box;
        }

        /* Hidden on desktop */
        .logout-area {
          display: none;
        }

        @media (max-width: 768px) {
          .admin-layout {
            flex-direction: column;
          }

          .admin-main {
            width: 100%;
          }

          .admin-content {
            width: 100%;
            padding: 40px 20px;
          }

          /* Visible only on mobile */
          .logout-area {
            display: block;
            width: 100%;
            padding: 20px 20px 40px;
            box-sizing: border-box;
          }

          .logout-button {
            width: 100%;
            padding: 16px;
            background: var(--black);
            color: white;
            border: none;
            font-size: 12px;
            letter-spacing: 1.5px;
            cursor: pointer;
          }
        }
      `}</style>
    </>
  );
}
