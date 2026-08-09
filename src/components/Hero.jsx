import Image from "next/image";

export default function Hero() {
  return (
    <section
      style={{ display: "flex", alignItems: "stretch", minHeight: "600px" }}
    >
      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px",
          maxWidth: "560px",
        }}
      >
        <h1
          style={{ fontSize: "48px", lineHeight: "1.2", marginBottom: "20px" }}
        >
          Timeless Beauty.
          <br />
          Made to <span style={{ color: "var(--gold)" }}>Shine.</span>
        </h1>

        <p
          style={{
            color: "var(--gray-text)",
            fontSize: "15px",
            lineHeight: "1.6",
            marginBottom: "28px",
          }}
        >
          Discover our collection of fine jewelry, crafted with passion and
          designed to last a lifetime.
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <a href="#collections" style={{ textDecoration: "none" }}>
            <button
              style={{
                backgroundColor: "var(--black)",
                color: "white",
                border: "none",
                padding: "16px 32px",
                fontSize: "13px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Shop Collection
            </button>
          </a>
        </div>
      </div>

      <div style={{ flex: "1", position: "relative" }}>
        <Image
          src="/images/Aure_openning_set.jpeg"
          alt="Featured jewelry"
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
            background: "linear-gradient(to right, var(--cream), transparent)",
          }}
        />
      </div>
    </section>
  );
}
