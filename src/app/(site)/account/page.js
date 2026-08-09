import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AccountPage() {
  const session = await auth();

  const orders = await prisma.order.findMany({
    where: { email: session.user.email },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <section
      style={{ padding: "60px 20px", maxWidth: "700px", margin: "0 auto" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <h1>My Account</h1>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            style={{
              background: "none",
              border: "1px solid #ddd",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            Log out
          </button>
        </form>
      </div>
      <p style={{ color: "var(--gray-text)", marginBottom: "32px" }}>
        {session.user.name} · {session.user.email}
      </p>

      <h3 style={{ marginBottom: "16px" }}>Your Orders</h3>

      {orders.length === 0 ? (
        <p style={{ color: "var(--gray-text)" }}>No orders yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                padding: "24px",
                border: "1px solid #f0eee9",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <p style={{ fontWeight: "600" }}>
                  Order placed{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <span
                  style={{
                    fontSize: "11px",
                    textTransform: "uppercase",
                    backgroundColor:
                      statusColors[order.status]?.bg || "#fdf3e0",
                    color: statusColors[order.status]?.text || "#a9791f",
                    padding: "4px 10px",
                    borderRadius: "3px",
                    fontWeight: "600",
                  }}
                >
                  {order.status}
                </span>
              </div>
              {order.items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                    padding: "4px 0",
                  }}
                >
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                  <span style={{ color: "var(--gray-text)" }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                  padding: "10px 0 4px",
                  marginTop: "8px",
                  borderTop: "1px solid #f0eee9",
                }}
              >
                <span>Subtotal</span>
                <span style={{ color: "var(--gray-text)" }}>
                  ${order.subtotal.toFixed(2)}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                  padding: "4px 0",
                }}
              >
                <span>Delivery</span>
                <span style={{ color: "var(--gray-text)" }}>
                  {order.shippingCost === 0
                    ? "Free"
                    : `$${order.shippingCost.toFixed(2)}`}
                </span>
              </div>
              <p style={{ marginTop: "10px", fontWeight: "600" }}>
                Total: ${order.total.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

const statusColors = {
  pending: { bg: "#fdf3e0", text: "#a9791f" },
  processing: { bg: "#e6eef7", text: "#2c5f8a" },
  delivered: { bg: "#e8f3ea", text: "#3a7d4f" },
  cancelled: { bg: "#f7e6e6", text: "#a33a3a" },
};
