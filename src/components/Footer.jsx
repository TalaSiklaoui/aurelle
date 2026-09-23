import Link from "next/link";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <h2>AURELLE</h2>
        <p>
          Timeless 18k gold vermeil jewelry crafted with passion, designed to
          last a lifetime.
        </p>
      </div>

      <div className="footer-column">
        <h3>Shop</h3>

        <Link href="/shop?category=Rings">Rings</Link>
        <Link href="/shop?category=Necklaces">Necklaces</Link>
        <Link href="/shop?category=Bracelets">Bracelets</Link>
        <Link href="/shop?category=Earrings">Earrings</Link>
      </div>

      <div className="footer-column">
        <h3>Company</h3>

        <Link href="/about">About Us</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/admin/login" className="footer-admin">
          Admin
        </Link>
      </div>

      <div className="footer-copyright">
        © {new Date().getFullYear()} AURELLE. All rights reserved.
      </div>
    </footer>
  );
}
