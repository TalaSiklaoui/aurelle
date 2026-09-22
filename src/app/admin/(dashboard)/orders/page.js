import { prisma } from "@/lib/prisma";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ marginBottom: "4px" }}>Orders</h1>
        <p style={{ color: "var(--gray-text)" }}>{orders.length} total</p>
      </div>

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
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                border: "1px solid #f0eee9",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "16px",
                  paddingBottom: "16px",
                  borderBottom: "1px solid #f0eee9",
                }}
              >
                <div>
                  <p style={{ fontWeight: "600", marginBottom: "4px" }}>
                    Order #{order.id}
                  </p>
                  <p style={{ fontSize: "13px", color: "var(--gray-text)" }}>
                    {order.fullName} · {order.email}
                  </p>
                  <p style={{ fontSize: "13px", color: "var(--gray-text)" }}>
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p
                    style={{
                      fontSize: "18px",
                      fontFamily: "'var(--font-playfair)', serif",
                      marginBottom: "4px",
                    }}
                  >
                    ${order.total.toFixed(2)}
                  </p>
                  <OrderStatusSelect
                    orderId={order.id}
                    currentStatus={order.status}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "14px",
                      padding: "6px 0",
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
                    padding: "6px 0",
                    borderTop: "1px solid #f0eee9",
                    marginTop: "4px",
                  }}
                >
                  <span>Delivery</span>
                  <span style={{ color: "var(--gray-text)" }}>
                    {order.shippingCost === 0
                      ? "Free"
                      : `$${order.shippingCost.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div
                style={{
                  fontSize: "13px",
                  color: "var(--gray-text)",
                  paddingTop: "12px",
                  borderTop: "1px solid #f0eee9",
                }}
              >
                Delivering to: {order.address}
                {order.apartment ? `, ${order.apartment}` : ""}, {order.city},{" "}
                {order.postalCode}, {order.country} · {order.phone}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
