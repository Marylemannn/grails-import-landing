import { FaqSection } from "@/components/faq-section";
import { FinalCta } from "@/components/final-cta";
import { CasesSection } from "@/components/cases-section";
import { Hero } from "@/components/hero";
import { InfoCardsSection } from "@/components/info-cards-section";
import { PageSectionLinks } from "@/components/page-section-links";
import { ProcessSection } from "@/components/process-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TestimonialsSection } from "@/components/testimonials-section";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <PageSectionLinks />
      <main>
        <Hero />
        <CasesSection />
        <ProcessSection />
        <InfoCardsSection />
        <TestimonialsSection />
        <FinalCta />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
