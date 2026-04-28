import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/about',
          '/privacy',
          '/terms',
          '/quotes/*', // 공유 링크는 공개
        ],
        disallow: [
          '/dashboard', // 관리자 대시보드 비공개
          '/login', // 로그인 페이지는 크롤링 불필요
          '/api/*', // API는 크롤링 불필요
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
