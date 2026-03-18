import Header from "@/app/components/header";
import HeroSection from "@/app/components/hero-section";
import ManifestoSection from "@/app/components/manifesto-section";
import ProductGrid from "@/app/components/product-grid";
import TechSpecsSection from "@/app/components/tech-specs-section";
import Footer from "@/app/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ManifestoSection />
        <ProductGrid />
        <TechSpecsSection />
      </main>
      <Footer />
    </div>
  );
}
