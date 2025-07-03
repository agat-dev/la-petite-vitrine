import Hero from "@/components/hero";
import Atouts from "@/components/atouts";
import PricingSection from "@/components/pricing-section";
import NavbarDemo from "@/components/navbar";
import MultiStepForm from "@/components/contact/multi-step-form";
import FAQ from "@/components/faq";
import Gallery from "@/components/gallery";

export default function Home() {
  return (
    <main className="relative">
      <NavbarDemo />
      <Hero />
      <Atouts />
      <PricingSection />
      <Gallery />
      <MultiStepForm />
      <FAQ />
    </main>
  );
}
