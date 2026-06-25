import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = new URL(siteConfig.url);

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteUrl.host,
  };
}
