import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div>
      <section
        style={{
          display: "flex",
          alignItems: "stretch",
          flexWrap: "wrap",
          minHeight: "600px",
        }}
      >
        <div
          style={{
            flex: "1 1 400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px",
          }}
        >
          <h1
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "36px",
              marginBottom: "20px",
            }}
          >
            Our Story
          </h1>
          <p
            style={{
              color: "var(--gray-text)",
              lineHeight: "1.8",
              fontSize: "15px",
              maxWidth: "440px",
            }}
          >
            AURELLE was born from a passion for timeless beauty and meaningful
            craftsmanship. The name draws from the French word <em>or</em>,
            meaning gold, softened into something warmer and more personal — a
            reflection of the elegance we pour into every piece. Each piece is
            crafted in 18k gold vermeil, designed to celebrate life&apos;s most
            precious moments and made to shine with you, every day.
          </p>
        </div>

        <div style={{ flex: "1 1 400px", position: "relative" }}>
          <Image
            src="/images/Aure_aboutUs_woman.jpeg"
            alt="Woman wearing AURELLE jewelry"
            fill
            style={{ objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: "150px",
              background:
                "linear-gradient(to right, var(--cream), transparent)",
              pointerEvents: "none",
            }}
          />
        </div>
      </section>

      <section style={{ padding: "60px 60px 80px", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "28px",
            marginBottom: "8px",
          }}
        >
          Our Values
        </h2>
        <div
          style={{
            width: "40px",
            height: "2px",
            backgroundColor: "var(--gold)",
            margin: "0 auto 48px",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "60px",
            flexWrap: "wrap",
          }}
        >
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

      <section
        style={{
          position: "relative",
          height: "460px",
          backgroundImage: "url(/images/Aure_aboutUs_rbr.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "70% center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, var(--black) 0%, rgba(26,26,26,0.85) 25%, rgba(26,26,26,0.3) 55%, transparent 75%)",
          }}
        />
        <div
          style={{
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 60px",
          }}
        >
          <h2
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "34px",
              color: "#fff",
              maxWidth: "480px",
              lineHeight: "1.4",
              marginBottom: "8px",
            }}
          >
            Handcrafted with passion.
            <br />
            Made to be treasured.
          </h2>
          <div
            style={{
              width: "40px",
              height: "2px",
              backgroundColor: "var(--gold)",
              marginBottom: "20px",
            }}
          />
          <Link href="/shop">
            <button
              style={{
                backgroundColor: "transparent",
                color: "#fff",
                border: "1px solid var(--gold)",
                padding: "14px 32px",
                fontSize: "13px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                cursor: "pointer",
                width: "fit-content",
              }}
            >
              Shop Collection
            </button>
          </Link>
        </div>
      </section>
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
    <div
      style={{
        maxWidth: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1.3"
        style={{ marginBottom: "14px" }}
      >
        {icons[icon]}
      </svg>
      <h3
        style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "16px",
          marginBottom: "10px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "13px",
          color: "var(--gray-text)",
          lineHeight: "1.6",
        }}
      >
        {description}
      </p>
    </div>
  );
}
