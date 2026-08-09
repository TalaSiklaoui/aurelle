import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--black)",
        color: "#B8B8B5",
        padding: "60px",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "40px",
      }}
    >
      <div style={{ maxWidth: "280px" }}>
        <h2
          style={{
            color: "white",
            fontSize: "22px",
            letterSpacing: "2px",
            marginBottom: "16px",
          }}
        >
          AURELLE
        </h2>
        <p style={{ fontSize: "13px", lineHeight: "1.6" }}>
          Timeless 18k gold vermeil jewelry crafted with passion, designed to
          last a lifetime.
        </p>
      </div>

      <div>
        <h3 style={footerHeading}>Shop</h3>
        <Link href="/shop?category=Rings" style={footerLink}>
          Rings
        </Link>
        <Link href="/shop?category=Necklaces" style={footerLink}>
          Necklaces
        </Link>
        <Link href="/shop?category=Bracelets" style={footerLink}>
          Bracelets
        </Link>
        <Link
          href="/shop?category=Earrings"
          style={{ ...footerLink, marginBottom: 0 }}
        >
          Earrings
        </Link>
      </div>

      <div>
        <h3 style={footerHeading}>Company</h3>
        <Link href="/about" style={footerLink}>
          About Us
        </Link>
        <Link href="/contact" style={footerLink}>
          Contact
        </Link>
        <Link
          href="/admin/login"
          style={{
            ...footerLink,
            marginBottom: 0,
            opacity: 0.4,
            fontSize: "12px",
          }}
        >
          Admin
        </Link>
      </div>
      <div style={{ fontSize: "12px", alignSelf: "flex-end" }}>
        © {new Date().getFullYear()} AURELLE. All rights reserved.
      </div>
    </footer>
  );
}

const footerHeading = {
  color: "white",
  fontSize: "13px",
  letterSpacing: "1px",
  marginBottom: "16px",
  textTransform: "uppercase",
};

const footerLink = {
  display: "block",
  fontSize: "13px",
  marginBottom: "10px",
  color: "#B8B8B5",
  textDecoration: "none",
};
