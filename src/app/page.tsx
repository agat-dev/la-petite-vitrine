import Hero from "@/components/hero";
import Hero171 from "@/components/atouts";
import PrincingSection from "@/components/pricing-section";
import Gallery from "@/components/gallery";
import Image from "next/image";
import FAQ from "@/components/faq";
import ContactForm from "@/components/contact/contact-form";

export default function Home() {
  return (
    <>
    <section className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Hero />
      <Hero171 />
      <Gallery />
      <PrincingSection />
      <ContactForm />
      <FAQ />
    </section>
    </>
  );
}
