import Hero from "@/components/hero";
import Atouts from "@/components/atouts";
import PricingSection from "@/components/pricing-section";
import NavbarDemo from "@/components/navbar";
import ContactForm from "@/components/contact/contact-form";
import FAQ from "@/components/faq";

export default function Home() {
  return (
    <main className="relative">
      <NavbarDemo />
      <Hero />
      <Atouts />
      <PricingSection />
      <ContactForm />
      <FAQ />
    </main>
  );
}
