import type { Metadata } from "next";
import { LegalDocument, privacyDocument } from "@/components/legal-document";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { legalNavItems } from "@/lib/site";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | GRAILS IMPORT",
  description: "Политика конфиденциальности GRAILS IMPORT.",
  alternates: {
    canonical: "/legal/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader items={legalNavItems} />
      <main id="top">
        <LegalDocument document={privacyDocument} />
      </main>
      <SiteFooter />
    </>
  );
}
