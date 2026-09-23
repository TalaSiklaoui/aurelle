import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <div className="products-page">
        <div className="products-header">
          <div>
            <h1>Products</h1>
            <p>{products.length} total</p>
          </div>

          <Link href="/admin/products/new" className="add-product">
            + Add Product
          </Link>
        </div>

        {/* DESKTOP TABLE */}
        <div className="desktop-products">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <Image
                      src={product.image || "/images/placeholder.jpeg"}
                      alt={product.title}
                      width={48}
                      height={48}
                      className="product-image-small"
                    />
                  </td>

                  <td>{product.title}</td>

                  <td className="category">{product.category}</td>

                  <td>${product.price.toFixed(2)}</td>

                  <td className="actions">
                    <Link href={`/admin/products/${product.id}/edit`}>
                      Edit
                    </Link>

                    <DeleteProductButton productId={product.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="mobile-products">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-card-top">
                <div className="mobile-image-wrapper">
                  <Image
                    src={product.image || "/images/placeholder.jpeg"}
                    alt={product.title}
                    fill
                    className="mobile-product-image"
                  />
                </div>

                <div className="product-info">
                  <h3>{product.title}</h3>

                  <p className="product-category">{product.category}</p>

                  <p className="product-price">${product.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="mobile-actions">
                <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>

                <DeleteProductButton productId={product.id} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .products-page {
          width: 100%;
        }

        .products-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 24px;
        }

        .products-header h1 {
          margin: 0 0 4px;
        }

        .products-header p {
          margin: 0;
          color: var(--gray-text);
        }

        .add-product {
          background: var(--black);
          color: var(--gold);
          padding: 11px 20px;
          text-decoration: none;
          font-size: 13px;
          letter-spacing: 0.4px;
          white-space: nowrap;
        }

        /* DESKTOP */

        .desktop-products {
          background: #fff;
          border-radius: 6px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
          overflow: hidden;
        }

        .desktop-products table {
          width: 100%;
          border-collapse: collapse;
        }

        .desktop-products th {
          text-align: left;
          padding: 14px 20px;
          font-size: 12px;
          color: var(--gray-text);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid #eee;
        }

        .desktop-products td {
          padding: 14px 20px;
          font-size: 14px;
          border-bottom: 1px solid #f5f5f5;
        }

        .product-image-small {
          object-fit: cover;
          border-radius: 4px;
        }

        .category {
          text-transform: capitalize;
        }

        .actions {
          text-align: right;
          white-space: nowrap;
        }

        .actions a {
          color: var(--gold);
          margin-right: 16px;
          font-size: 13px;
          text-decoration: none;
        }

        /* MOBILE VERSION HIDDEN ON DESKTOP */

        .mobile-products {
          display: none;
        }

        @media (max-width: 768px) {
          .products-header {
            align-items: flex-end;
            margin-bottom: 24px;
          }

          .products-header h1 {
            font-size: 34px;
          }

          .products-header p {
            font-size: 13px;
          }

          .add-product {
            padding: 10px 14px;
            font-size: 12px;
          }

          /* remove table completely on mobile */
          .desktop-products {
            display: none;
          }

          .mobile-products {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .product-card {
            width: 100%;
            background: #fff;
            border: 1px solid #f0eee9;
            padding: 16px;
            box-sizing: border-box;
            border-radius: 6px;
          }

          .product-card-top {
            display: flex;
            align-items: center;
            gap: 16px;
          }

          .mobile-image-wrapper {
            width: 82px;
            height: 82px;
            position: relative;
            flex-shrink: 0;
            background: #f0eae0;
            border-radius: 4px;
            overflow: hidden;
          }

          .mobile-product-image {
            object-fit: cover;
          }

          .product-info {
            flex: 1;
            min-width: 0;
          }

          .product-info h3 {
            margin: 0 0 6px;
            font-size: 16px;
            line-height: 1.3;
          }

          .product-category {
            margin: 0 0 7px;
            color: var(--gray-text);
            font-size: 12px;
            text-transform: capitalize;
          }

          .product-price {
            margin: 0;
            font-size: 15px;
            font-weight: 600;
          }

          .mobile-actions {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid #f0eee9;
            margin-top: 14px;
            padding-top: 12px;
          }

          .mobile-actions a {
            color: var(--gold);
            text-decoration: none;
            font-size: 13px;
          }
        }

        @media (max-width: 400px) {
          .products-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .add-product {
            width: 100%;
            text-align: center;
            box-sizing: border-box;
          }
        }
      `}</style>
    </>
  );
}
