import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const orders = await prisma.order.findMany({
    where: { email: session.user.email },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <section
      style={{
        padding: "50px 20px 70px",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      {/* Account header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          marginBottom: "8px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "34px",
            lineHeight: "1.2",
          }}
        >
          My Account
        </h1>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            style={{
              backgroundColor: "transparent",
              color: "var(--black)",
              border: "1px solid var(--black)",
              padding: "9px 16px",
              cursor: "pointer",
              fontSize: "11px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Log Out
          </button>
        </form>
      </div>

      {/* Customer information */}
      <p
        style={{
          color: "var(--gray-text)",
          margin: "0 0 28px",
          fontSize: "14px",
          lineHeight: "1.5",
        }}
      >
        {session.user.name} · {session.user.email}
      </p>

      {/* Orders */}
      <h2
        style={{
          margin: "0 0 16px",
          fontSize: "22px",
        }}
      >
        Your Orders
      </h2>

      {orders.length === 0 ? (
        <p style={{ color: "var(--gray-text)", margin: 0 }}>
          No orders yet.
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
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
              {/* Order header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "12px",
                  marginBottom: "12px",
                }}
              >
                <p
                  style={{
                    fontWeight: "600",
                    margin: 0,
                    lineHeight: "1.5",
                  }}
                >
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
                    padding: "5px 10px",
                    borderRadius: "3px",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                  }}
                >
                  {order.status}
                </span>
              </div>

              {/* Products */}
              {order.items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "16px",
                    fontSize: "14px",
                    padding: "4px 0",
                  }}
                >
                  <span>
                    {item.title} × {item.quantity}
                  </span>

                  <span
                    style={{
                      color: "var(--gray-text)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              {/* Subtotal */}
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

              {/* Delivery */}
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

              {/* Total */}
              <p
                style={{
                  margin: "10px 0 0",
                  fontWeight: "600",
                  fontSize: "15px",
                }}
              >
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