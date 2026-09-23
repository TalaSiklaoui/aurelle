import Link from "next/link";
import Image from "next/image";
import "./DetailBanner.css";

export default function DetailBanner() {
  return (
    <section className="detail-banner">
      <Image
        src="/images/Aure_openning_ring.jpeg"
        alt="Detail of fine jewelry"
        fill
        sizes="100vw"
        className="detail-banner-image"
      />

      <div className="detail-banner-overlay" />

      <div className="detail-banner-content">
        <h2>
          Elegance is in
          <br />
          the Details
        </h2>

        <div className="detail-banner-line" />

        <p>
          Every piece tells a story of craftsmanship, design, and timeless
          elegance.
        </p>

        <Link href="/shop" className="detail-banner-button">
          View Collection
        </Link>
      </div>
    </section>
  );
}
