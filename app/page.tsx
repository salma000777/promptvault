import { CTASection } from "@/components/landing/cta";
import { FAQSection } from "@/components/landing/faq";
import { FeaturesSection } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { HeroSection } from "@/components/landing/hero";
import { LandingNavbar } from "@/components/landing/navbar";
import { PreviewSection } from "@/components/landing/preview";
import { PricingSection } from "@/components/landing/pricing";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <LandingNavbar />
      <HeroSection />
      <FeaturesSection />
      <PreviewSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}