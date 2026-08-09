import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div>
          <h1 style={{ marginBottom: "4px" }}>Products</h1>
          <p style={{ color: "var(--gray-text)" }}>{products.length} total</p>
        </div>
        <Link
          href="/admin/products/new"
          style={{
            backgroundColor: "var(--black)",
            color: "var(--gold)",
            padding: "10px 20px",
            borderRadius: "4px",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          + Add Product
        </Link>
      </div>

      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "6px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <th style={thStyle}>Image</th>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                style={{ borderBottom: "1px solid #f5f5f5" }}
              >
                <td style={tdStyle}>
                  <img
                    src={product.image || "/images/placeholder.jpeg"}
                    alt={product.title}
                    style={{
                      width: "48px",
                      height: "48px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                </td>
                <td style={tdStyle}>{product.title}</td>
                <td style={{ ...tdStyle, textTransform: "capitalize" }}>
                  {product.category}
                </td>
                <td style={tdStyle}>${product.price.toFixed(2)}</td>
                <td style={{ ...tdStyle, textAlign: "right" }}>
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    style={{
                      color: "var(--gold)",
                      marginRight: "16px",
                      fontSize: "13px",
                      textDecoration: "none",
                    }}
                  >
                    Edit
                  </Link>
                  <DeleteProductButton productId={product.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "14px 20px",
  fontSize: "12px",
  color: "var(--gray-text)",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const tdStyle = {
  padding: "14px 20px",
  fontSize: "14px",
};
