import Image from "next/image";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Timeless Beauty.
          <br />
          Made to <span>Shine.</span>
        </h1>

        <p>
          Discover our collection of fine jewelry, crafted with passion and
          designed to last a lifetime.
        </p>

        <a href="#collections" className="hero-button">
          Shop Collection
        </a>
      </div>

      <div className="hero-image">
        <Image
          src="/images/Aure_openning_set.jpeg"
          alt="Featured jewelry"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />

        <div className="hero-gradient" />
      </div>
    </section>
  );
}