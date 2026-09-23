import AdminSidebar from "@/components/admin/AdminSidebar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <div className="admin-layout">
        <AdminSidebar />

        <main className="admin-content">{children}</main>
      </div>

      <style>{`
        .admin-layout {
          display: flex;
          align-items: flex-start;
          min-height: 100vh;
          width: 100%;
        }

        .admin-content {
          flex: 1;
          min-width: 0;
          background-color: var(--cream);
          min-height: 100vh;
          padding: 40px;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .admin-layout {
            flex-direction: column;
          }

          .admin-content {
            width: 100%;
            padding: 32px 20px 60px;
          }
        }
      `}</style>
    </>
  );
}
