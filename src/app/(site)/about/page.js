import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div>
      {/* OUR STORY */}
      <section className="storySection">
        <div className="storyText">
          <h1>Our Story</h1>

          <p>
            AURELLE was born from a passion for timeless beauty and meaningful
            craftsmanship. The name draws from the French word <em>or</em>,
            meaning gold, softened into something warmer and more personal — a
            reflection of the elegance we pour into every piece. Each piece is
            crafted in 18k gold vermeil, designed to celebrate life&apos;s most
            precious moments and made to shine with you, every day.
          </p>
        </div>

        <div className="storyImage">
          <Image
            src="/images/Aure_aboutUs_woman.jpeg"
            alt="Woman wearing AURELLE jewelry"
            fill
            sizes="(max-width: 600px) 100vw, 50vw"
            style={{
              objectFit: "cover",
              objectPosition: "center center",
            }}
          />

          <div className="storyGradient" />
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="valuesSection">
        <h2>Our Values</h2>

        <div className="goldLine" />

        <div className="valuesGrid">
          <ValueItem
            icon="gem"
            title="Fine Quality"
            description="We use the finest materials for lasting elegance."
          />

          <ValueItem
            icon="heart"
            title="Handcrafted"
            description="Each piece is carefully handcrafted by artisans."
          />

          <ValueItem
            icon="leaf"
            title="Sustainable"
            description="We are committed to ethical and sustainable practices."
          />

          <ValueItem
            icon="clock"
            title="Timeless Design"
            description="Beautiful today, cherished forever."
          />
        </div>
      </section>

      {/* BOTTOM BANNER */}
      <section className="aboutBanner">
        <div className="bannerOverlay" />

        <div className="bannerContent">
          <h2>
            Handcrafted with passion.
            <br />
            Made to be treasured.
          </h2>

          <div className="bannerLine" />

          <Link href="/shop">
            <button>Shop Collection</button>
          </Link>
        </div>
      </section>

      <style>{`
        /* =========================
           OUR STORY - DESKTOP
        ========================== */

        .storySection {
          display: flex;
          align-items: stretch;
          min-height: 600px;
        }

        .storyText {
          flex: 1 1 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px;
        }

        .storyText h1 {
          font-family: var(--font-playfair), serif;
          font-size: 36px;
          margin: 0 0 20px;
        }

        .storyText p {
          color: var(--gray-text);
          line-height: 1.8;
          font-size: 15px;
          max-width: 440px;
          margin: 0;
        }

        .storyImage {
          flex: 1 1 50%;
          position: relative;
          min-height: 600px;
          overflow: hidden;
        }

        .storyGradient {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 150px;
          background: linear-gradient(
            to right,
            var(--cream),
            transparent
          );
          pointer-events: none;
        }

        /* =========================
           OUR VALUES
        ========================== */

        .valuesSection {
          padding: 60px 60px 80px;
          text-align: center;
        }

        .valuesSection h2 {
          font-family: var(--font-playfair), serif;
          font-size: 28px;
          margin: 0 0 8px;
        }

        .goldLine {
          width: 40px;
          height: 2px;
          background-color: var(--gold);
          margin: 0 auto 48px;
        }

        .valuesGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 50px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .valueItem {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .valueItem svg {
          margin-bottom: 14px;
        }

        .valueItem h3 {
          font-family: var(--font-playfair), serif;
          font-size: 16px;
          margin: 0 0 10px;
        }

        .valueItem p {
          font-size: 13px;
          color: var(--gray-text);
          line-height: 1.6;
          margin: 0;
          max-width: 200px;
        }

        /* =========================
           BOTTOM BANNER
        ========================== */

        .aboutBanner {
          position: relative;
          height: 460px;
          background-image: url("/images/Aure_aboutUs_rbr.jpeg");
          background-size: cover;
          background-position: 70% center;
        }

        .bannerOverlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            var(--black) 0%,
            rgba(26, 26, 26, 0.85) 25%,
            rgba(26, 26, 26, 0.3) 55%,
            transparent 75%
          );
        }

        .bannerContent {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 60px;
        }

        .bannerContent h2 {
          font-family: var(--font-playfair), serif;
          font-size: 34px;
          color: white;
          max-width: 480px;
          line-height: 1.4;
          margin: 0 0 8px;
        }

        .bannerLine {
          width: 40px;
          height: 2px;
          background-color: var(--gold);
          margin-bottom: 20px;
        }

        .bannerContent button {
          background-color: transparent;
          color: white;
          border: 1px solid var(--gold);
          padding: 14px 32px;
          font-size: 13px;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          width: fit-content;
        }

        /* =========================
           TABLET
        ========================== */

        @media (max-width: 900px) {
          .valuesGrid {
            grid-template-columns: repeat(2, 1fr);
            gap: 45px 30px;
          }
        }

        /* =========================
           MOBILE
        ========================== */

        @media (max-width: 600px) {
          .storySection {
            display: flex;
            flex-direction: column;
            min-height: 0;
          }

          .storyText {
            flex: none;
            padding: 55px 30px 45px;
          }

          .storyText h1 {
            font-size: 34px;
            margin-bottom: 20px;
          }

          .storyText p {
            font-size: 15px;
            line-height: 1.75;
            max-width: none;
          }

          /*
           * IMPORTANT:
           * Keep the About image large on mobile.
           * Do not turn it into a thin banner.
           */
          .storyImage {
            flex: none;
            position: relative;
            width: 100%;
            height: 500px;
            min-height: 500px;
          }

          .storyImage img {
            object-fit: cover !important;
            object-position: center center !important;
          }

          .storyGradient {
            display: none;
          }

          /* VALUES */

          .valuesSection {
            padding: 55px 25px 65px;
          }

          .valuesSection h2 {
            font-size: 28px;
          }

          .goldLine {
            margin-bottom: 38px;
          }

          .valuesGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 42px 24px;
          }

          .valueItem {
            min-width: 0;
          }

          .valueItem svg {
            margin-bottom: 12px;
          }

          .valueItem h3 {
            font-size: 15px;
            margin-bottom: 8px;
          }

          .valueItem p {
            font-size: 12px;
            line-height: 1.55;
            max-width: 150px;
          }

          /* BOTTOM BANNER */

          .aboutBanner {
            height: 420px;
            background-position: 65% center;
          }

          .bannerOverlay {
            background: linear-gradient(
              to right,
              rgba(20, 20, 20, 0.85) 0%,
              rgba(20, 20, 20, 0.55) 55%,
              rgba(20, 20, 20, 0.15) 100%
            );
          }

          .bannerContent {
            padding: 0 30px;
          }

          .bannerContent h2 {
            font-size: 32px;
            line-height: 1.25;
            max-width: 330px;
          }

          .bannerContent button {
            padding: 14px 28px;
          }
        }
      `}</style>
    </div>
  );
}

function ValueItem({ icon, title, description }) {
  const icons = {
    gem: (
      <>
        <path d="M6 3h12l4 6-10 12L2 9z" />
        <path d="M2 9h20M9 3l-3 6 6 12 6-12-3-6" />
      </>
    ),

    heart: (
      <path d="M12 20s-7-4.5-9.5-9C.8 7.6 2.8 4 6.5 4c2.1 0 3.7 1.2 5.5 3.2C13.8 5.2 15.4 4 17.5 4c3.7 0 5.7 3.6 4 7-2.5 4.5-9.5 9-9.5 9z" />
    ),

    leaf: (
      <>
        <path d="M12 20v-7" />
        <path d="M12 15C8 15 5.5 12.5 5 8c4.5 0 7 2.5 7 7z" />
        <path d="M12 15c4 0 6.5-2.5 7-7-4.5 0-7 2.5-7 7z" />
      </>
    ),

    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </>
    ),
  };

  return (
    <div className="valueItem">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1.3"
      >
        {icons[icon]}
      </svg>

      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
