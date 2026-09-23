import Link from "next/link";
import Image from "next/image";
import "./ProductCard.css";

export default function ProductCard({ product, isNew }) {
  return (
    <Link href={`/product/${product.id}`} className="product-card">
      <div className="product-card-image">
        {isNew && <span className="product-new-badge">New</span>}

        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 45vw, 220px"
          style={{ objectFit: "cover" }}
        />
      </div>

      <h3>{product.title}</h3>

      <p>${product.price}</p>
    </Link>
  );
}
