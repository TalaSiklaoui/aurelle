import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";

export default function SiteLayout({ children }) {
  return (
    <CartProvider>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <AnnouncementBar />
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </div>
    </CartProvider>
  );
}
