import { MetadataRoute } from 'next';
import { getAllQuotes } from '@/lib/notion/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

  // 정적 페이지
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // 공개된 견적서 페이지
  let dynamicPages: MetadataRoute.Sitemap = [];

  try {
    const quotes = await getAllQuotes();
    dynamicPages = quotes
      .filter((q) => q.status !== '취소') // 취소된 견적서는 제외
      .map((quote) => ({
        url: `${baseUrl}/quotes/${quote.shareToken}`,
        lastModified: quote.issuedDate ? new Date(quote.issuedDate) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
  } catch (error) {
    console.warn('[Sitemap] 노션 API 조회 실패:', error);
    // API 실패 시 정적 페이지만 반환
  }

  return [...staticPages, ...dynamicPages];
}
