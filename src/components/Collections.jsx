import Link from "next/link";
import Image from "next/image";
import "./Collections.css";

const collections = [
  { name: "Rings", image: "/images/Aure_r02.jpeg" },
  { name: "Necklaces", image: "/images/Aure_n01.jpeg" },
  { name: "Bracelets", image: "/images/Aure_br02.jpeg" },
  { name: "Earrings", image: "/images/Aure_er03.jpeg" },
];

export default function Collections() {
  return (
    <section id="collections" className="collections-section">
      <h2>Shop by Collection</h2>

      <div className="collections-line" />

      <div className="collections-grid">
        {collections.map((item) => (
          <div key={item.name} className="collection-card">
            <Link
              href={`/shop?category=${item.name}`}
              className="collection-image"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 45vw, 220px"
                style={{ objectFit: "cover" }}
              />
            </Link>

            <h3>{item.name}</h3>

            <Link
              href={`/shop?category=${item.name}`}
              className="collection-link"
            >
              Discover →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
