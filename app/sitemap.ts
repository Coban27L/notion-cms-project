import { MetadataRoute } from "next";
import { getAllQuotesWithCache } from "@/lib/notion/cache";

const BASE_URL = "https://notion-cms.example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const quotes = await getAllQuotesWithCache();

    const quoteRoutes: MetadataRoute.Sitemap = quotes.map((quote) => ({
      url: `${BASE_URL}/quotes/${quote.shareToken}`,
      lastModified: new Date(quote.issuedDate),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    const staticRoutes: MetadataRoute.Sitemap = [
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${BASE_URL}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      },
      {
        url: `${BASE_URL}/privacy`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.3,
      },
      {
        url: `${BASE_URL}/terms`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.3,
      },
    ];

    return [...staticRoutes, ...quoteRoutes];
  } catch (error) {
    console.error("[Sitemap] 노션 API 오류:", error);
    return [
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
    ];
  }
}
