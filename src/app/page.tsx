import Hero from "@/components/hero";
import Atouts from "@/components/atouts";
import PricingSection from "@/components/pricing-section";
import NavbarDemo from "@/components/navbar";
import MultiStepForm from "@/components/contact/multi-step-form";
import FAQ from "@/components/faq";

export default function Home() {
  return (
    <main className="relative">
      <NavbarDemo />
      <Hero />
      <Atouts />
      <PricingSection />
      <MultiStepForm />
      <FAQ />
    </main>
  );
}
