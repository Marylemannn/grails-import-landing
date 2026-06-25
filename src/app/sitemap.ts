import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    {
      path: "",
      priority: 1,
    },
    {
      path: "/legal/privacy",
      priority: 0.3,
    },
    {
      path: "/legal/terms",
      priority: 0.3,
    },
  ];

  return [
    ...routes.map(({ path, priority }) => ({
      url: path ? `${siteConfig.url}${path}` : `${siteConfig.url}/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority,
    })),
  ];
}
