import AdminSidebar from "@/components/admin/AdminSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <main
        style={{
          flex: 1,
          backgroundColor: "var(--cream)",
          minHeight: "100vh",
          padding: "40px",
        }}
      >
        {children}
      </main>
    </div>
  );
}
