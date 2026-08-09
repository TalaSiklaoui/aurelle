import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [totalOrders, revenueResult, totalProducts, recentOrders, orderItems] =
    await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { total: true } }),
      prisma.product.count(),
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.orderItem.findMany(),
    ]);

  const totalRevenue = revenueResult._sum.total || 0;

  const distinctCustomers = await prisma.order.findMany({
    distinct: ["email"],
    select: { email: true },
  });
  const totalCustomers = distinctCustomers.length;

  const productStats = {};
  orderItems.forEach((item) => {
    if (!productStats[item.productId]) {
      productStats[item.productId] = {
        title: item.title,
        orders: 0,
        revenue: 0,
      };
    }
    productStats[item.productId].orders += item.quantity;
    productStats[item.productId].revenue += item.price * item.quantity;
  });
  const topProducts = Object.values(productStats)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  const stats = [
    { label: "Total Orders", value: totalOrders },
    { label: "Total Revenue", value: `$${totalRevenue.toFixed(2)}` },
    { label: "Total Products", value: totalProducts },
    { label: "Total Customers", value: totalCustomers },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: "4px" }}>Dashboard</h1>
      <p style={{ color: "var(--gray-text)", marginBottom: "32px" }}>
        Welcome back, Admin
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              backgroundColor: "#fff",
              padding: "24px",
              borderRadius: "6px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            <p
              style={{
                color: "var(--gray-text)",
                fontSize: "13px",
                marginBottom: "8px",
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                fontSize: "28px",
                fontFamily: "'Playfair Display', serif",
                margin: 0,
              }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "6px",
            padding: "24px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: "16px" }}>Recent Orders</h3>
          {recentOrders.length === 0 && (
            <p style={{ color: "var(--gray-text)", fontSize: "14px" }}>
              No orders yet.
            </p>
          )}
          {recentOrders.map((order) => (
            <div
              key={order.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #f0eee9",
                fontSize: "14px",
              }}
            >
              <span>
                #{order.id} — {order.fullName}
              </span>
              <span style={{ color: "var(--gold)" }}>
                ${order.total.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "6px",
            padding: "24px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: "16px" }}>Top Products</h3>
          {topProducts.length === 0 && (
            <p style={{ color: "var(--gray-text)", fontSize: "14px" }}>
              No sales yet.
            </p>
          )}
          {topProducts.map((product, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #f0eee9",
                fontSize: "14px",
              }}
            >
              <span>{product.title}</span>
              <span style={{ color: "var(--gray-text)" }}>
                {product.orders} sold — ${product.revenue.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
