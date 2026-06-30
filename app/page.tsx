import { Marquee } from "@/components/Marquee";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WordStrip } from "@/components/WordStrip";
import { CatalogSection } from "@/components/CatalogSection";
import { EditorialBanner } from "@/components/EditorialBanner";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default function Page() {
  return (
    <main>
      <Marquee />
      <Navbar />
      <Hero />
      <WordStrip />
      <CatalogSection />
      <EditorialBanner />
      <About />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
