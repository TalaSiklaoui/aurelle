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
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
    },
    { label: "Total Products", value: totalProducts },
    { label: "Total Customers", value: totalCustomers },
  ];

  return (
    <>
      <div className="dashboard">
        <div className="dashboard-heading">
          <h1>Dashboard</h1>
          <p>Welcome back, Admin</p>
        </div>

        <div className="stats-grid">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* TOP PRODUCTS FIRST */}
        <div className="dashboard-card">
          <h3>Top Products</h3>

          {topProducts.length === 0 ? (
            <p className="empty-text">No sales yet.</p>
          ) : (
            topProducts.map((product, index) => (
              <div className="list-row" key={index}>
                <span className="product-name">{product.title}</span>

                <span className="product-stats">
                  {product.orders} sold
                  <br />${product.revenue.toFixed(2)}
                </span>
              </div>
            ))
          )}
        </div>

        {/* RECENT ORDERS SECOND */}
        <div className="dashboard-card">
          <h3>Recent Orders</h3>

          {recentOrders.length === 0 ? (
            <p className="empty-text">No orders yet.</p>
          ) : (
            recentOrders.map((order) => (
              <div className="list-row" key={order.id}>
                <span>
                  #{order.id} — {order.fullName}
                </span>

                <span className="order-price">${order.total.toFixed(2)}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        .dashboard {
          width: 100%;
        }

        .dashboard-heading {
          margin-bottom: 32px;
        }

        .dashboard-heading h1 {
          margin: 0 0 4px;
        }

        .dashboard-heading p {
          color: var(--gray-text);
          margin: 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: #fff;
          padding: 24px;
          border-radius: 6px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
          min-width: 0;
        }

        .stat-label {
          color: var(--gray-text);
          font-size: 13px;
          margin: 0 0 8px;
        }

        .stat-value {
          font-size: 28px;
          font-family: var(--font-playfair), serif;
          margin: 0;
          overflow-wrap: anywhere;
        }

        .dashboard-card {
          width: 100%;
          background: #fff;
          border-radius: 6px;
          padding: 24px;
          box-sizing: border-box;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
          margin-bottom: 20px;
        }

        .dashboard-card h3 {
          margin: 0 0 16px;
        }

        .list-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 12px 0;
          border-bottom: 1px solid #f0eee9;
          font-size: 14px;
        }

        .list-row:last-child {
          border-bottom: none;
        }

        .product-name {
          min-width: 0;
        }

        .product-stats {
          color: var(--gray-text);
          text-align: right;
          flex-shrink: 0;
        }

        .order-price {
          color: var(--gold);
          flex-shrink: 0;
        }

        .empty-text {
          color: var(--gray-text);
          font-size: 14px;
        }

        @media (max-width: 900px) {
          .stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 768px) {
          .dashboard-heading {
            margin-bottom: 28px;
          }

          .dashboard-heading h1 {
            font-size: 34px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
            margin-bottom: 24px;
          }

          .stat-card {
            padding: 20px 16px;
          }

          .stat-label {
            font-size: 12px;
          }

          .stat-value {
            font-size: 24px;
          }

          .dashboard-card {
            padding: 20px;
            margin-bottom: 16px;
          }

          .list-row {
            font-size: 13px;
            gap: 12px;
          }
        }

        @media (max-width: 380px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
