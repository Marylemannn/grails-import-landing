import { faqItems, siteConfig } from "@/lib/site";

export function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: ["Grails Import", "Грейлз импорт", "грейлз", "grails"],
    url: `${siteConfig.url}/`,
    logo: `${siteConfig.url}/images/hero-car.png`,
    image: `${siteConfig.url}/images/hero-car.png`,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Москва",
      addressRegion: "Москва",
      addressCountry: "RU",
      streetAddress: "Ленинградский проспект 34А",
    },
    areaServed: {
      "@type": "Country",
      name: "Россия",
    },
    description: siteConfig.description,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "sales",
      areaServed: "RU",
      availableLanguage: ["ru"],
    },
    sameAs: [siteConfig.managerTelegramUrl, siteConfig.calculatorTelegramUrl],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    alternateName: ["Grails Import", "Грейлз импорт"],
    url: `${siteConfig.url}/`,
    inLanguage: "ru-RU",
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/#service`,
    name: "Привоз авто из Кореи под ключ",
    serviceType: "Привоз авто из Кореи под ключ",
    provider: {
      "@id": `${siteConfig.url}/#organization`,
    },
    areaServed: {
      "@type": "Country",
      name: "Россия",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: siteConfig.calculatorTelegramUrl,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги GRAILS IMPORT",
      itemListElement: [
        "подбор авто из Кореи",
        "проверка автомобиля в Южной Корее",
        "выкуп автомобиля из Кореи",
        "доставка авто из Кореи",
        "растаможка авто из Кореи",
        "расчет стоимости авто из Кореи",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
        },
      })),
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
        type="application/ld+json"
      />
    </>
  );
}
