import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Collections from "@/components/Collections";
import DetailBanner from "@/components/DetailBanner";
import ProductGrid from "@/components/ProductGrid";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Features />
      <Collections />
      <DetailBanner />
      <ProductGrid />
    </div>
  );
}
