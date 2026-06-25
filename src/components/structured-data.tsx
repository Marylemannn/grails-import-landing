import { faqItems, pageSections, siteConfig } from "@/lib/site";

export function StructuredData() {
  const siteUrl = `${siteConfig.url}/`;
  const sectionGraph = pageSections.map((section, index) => ({
    "@type": "WebPageElement",
    "@id": `${siteUrl}#${section.id}`,
    name: section.title,
    description: section.description,
    url: `${siteUrl}#${section.id}`,
    position: index + 1,
    isPartOf: {
      "@id": `${siteUrl}#webpage`,
    },
  }));

  const organization = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "@id": `${siteUrl}#organization`,
    name: siteConfig.name,
    alternateName: ["Grails Import", "Грейлз импорт", "грейлз", "grails"],
    url: siteUrl,
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
    "@id": `${siteUrl}#website`,
    name: siteConfig.name,
    alternateName: ["Grails Import", "Грейлз импорт"],
    url: siteUrl,
    inLanguage: "ru-RU",
    publisher: {
      "@id": `${siteUrl}#organization`,
    },
  };

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}#webpage`,
    name: siteConfig.title,
    description: siteConfig.description,
    url: siteUrl,
    inLanguage: "ru-RU",
    isPartOf: {
      "@id": `${siteUrl}#website`,
    },
    about: {
      "@id": `${siteUrl}#service`,
    },
    mainEntity: {
      "@id": `${siteUrl}#service`,
    },
    hasPart: sectionGraph.map((section) => ({
      "@id": section["@id"],
    })),
  };

  const navigation = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteUrl}#section-navigation`,
    name: "Разделы главной страницы GRAILS IMPORT",
    itemListElement: pageSections.map((section, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SiteNavigationElement",
        name: section.label,
        description: section.description,
        url: `${siteUrl}#${section.id}`,
      },
    })),
  };

  const pageSectionGraph = {
    "@context": "https://schema.org",
    "@graph": sectionGraph,
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}#service`,
    name: "Привоз авто из Кореи под ключ",
    serviceType: "Привоз авто из Кореи под ключ",
    provider: {
      "@id": `${siteUrl}#organization`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpage) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navigation) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSectionGraph) }}
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
