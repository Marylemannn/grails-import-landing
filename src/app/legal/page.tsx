import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { legalNavItems } from "@/lib/site";

export const metadata: Metadata = {
  title: "Политика конфиденциальности и условия использования | GRAILS IMPORT",
  description:
    "Юридическая информация GRAILS IMPORT: политика конфиденциальности и условия использования.",
  alternates: {
    canonical: "/legal",
  },
};

export default function LegalPage() {
  return (
    <>
      <SiteHeader items={legalNavItems} />
      <main id="top">
        <LegalDocument />
      </main>
      <SiteFooter />
    </>
  );
}
