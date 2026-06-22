import type { Metadata } from "next";
import { LegalDocument, termsDocument } from "@/components/legal-document";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { legalNavItems } from "@/lib/site";

export const metadata: Metadata = {
  title: "Пользовательское соглашение | GRAILS IMPORT",
  description: "Пользовательское соглашение GRAILS IMPORT.",
  alternates: {
    canonical: "/legal/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader items={legalNavItems} />
      <main id="top">
        <LegalDocument document={termsDocument} />
      </main>
      <SiteFooter />
    </>
  );
}
