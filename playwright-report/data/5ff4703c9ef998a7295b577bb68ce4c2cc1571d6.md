# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: seo-validation.spec.ts >> SEO 최적화 검증 >> robots.txt 검증
- Location: __tests__/e2e/seo-validation.spec.ts:31:7

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "User-agent: *"
Received string:    "<html><head><meta name=\"color-scheme\" content=\"light dark\"></head><body><pre style=\"word-wrap: break-word; white-space: pre-wrap;\">User-Agent: *
Allow: /
Disallow: /login
Disallow: /dashboard
Disallow: /api/·
Sitemap: https://notion-cms.example.com/sitemap.xml
</pre></body></html>"
```

# Page snapshot

```yaml
- generic [ref=e2]: "User-Agent: * Allow: / Disallow: /login Disallow: /dashboard Disallow: /api/ Sitemap: https://notion-cms.example.com/sitemap.xml"
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('SEO 최적화 검증', () => {
  4   |   test('메타데이터 - 홈페이지', async ({ page }) => {
  5   |     await page.goto('http://localhost:3000');
  6   |     
  7   |     // Open Graph 태그 확인
  8   |     const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
  9   |     expect(ogTitle).toContain('노션 CMS');
  10  |     
  11  |     const ogDescription = await page.getAttribute('meta[property="og:description"]', 'content');
  12  |     expect(ogDescription).toBeTruthy();
  13  |     
  14  |     const ogImage = await page.getAttribute('meta[property="og:image"]', 'content');
  15  |     expect(ogImage).toBeTruthy();
  16  |   });
  17  | 
  18  |   test('JSON-LD 구조화 데이터 - 홈페이지', async ({ page }) => {
  19  |     await page.goto('http://localhost:3000');
  20  |     
  21  |     const jsonLd = await page.evaluate(() => {
  22  |       const script = document.querySelector('script[type="application/ld+json"]');
  23  |       return script ? JSON.parse(script.textContent || '{}') : null;
  24  |     });
  25  |     
  26  |     expect(jsonLd).not.toBeNull();
  27  |     expect(jsonLd['@type']).toBe('WebApplication');
  28  |     expect(jsonLd.name).toContain('노션 CMS');
  29  |   });
  30  | 
  31  |   test('robots.txt 검증', async ({ page }) => {
  32  |     const response = await page.goto('http://localhost:3000/robots.txt');
  33  |     expect(response?.status()).toBe(200);
  34  |     
  35  |     const content = await page.content();
> 36  |     expect(content).toContain('User-agent: *');
      |                     ^ Error: expect(received).toContain(expected) // indexOf
  37  |     expect(content).toContain('Disallow: /dashboard');
  38  |   });
  39  | 
  40  |   test('sitemap.xml 검증', async ({ page }) => {
  41  |     const response = await page.goto('http://localhost:3000/sitemap.xml');
  42  |     expect(response?.status()).toBe(200);
  43  |     
  44  |     const content = await page.content();
  45  |     expect(content).toContain('<url>');
  46  |     expect(content).toContain('https://notion-cms.example.com');
  47  |   });
  48  | 
  49  |   test('Twitter Card 메타 태그', async ({ page }) => {
  50  |     await page.goto('http://localhost:3000');
  51  |     
  52  |     const twitterCard = await page.getAttribute('meta[name="twitter:card"]', 'content');
  53  |     expect(twitterCard).toBe('summary_large_image');
  54  |     
  55  |     const twitterTitle = await page.getAttribute('meta[name="twitter:title"]', 'content');
  56  |     expect(twitterTitle).toBeTruthy();
  57  |   });
  58  | 
  59  |   test('모바일 뷰포트 - 375px (아이폰 SE)', async ({ browser }) => {
  60  |     const context = await browser.newContext({
  61  |       viewport: { width: 375, height: 667 },
  62  |     });
  63  |     const page = await context.newPage();
  64  |     
  65  |     await page.goto('http://localhost:3000');
  66  |     
  67  |     // 주요 요소가 보이는지 확인
  68  |     await expect(page.locator('h1').first()).toBeVisible();
  69  |     
  70  |     // 페이지가 완전히 로드되었는지 확인
  71  |     const status = await page.evaluate(() => document.readyState);
  72  |     expect(status).toBe('complete');
  73  |     
  74  |     await context.close();
  75  |   });
  76  | 
  77  |   test('태블릿 뷰포트 - 768px (아이패드)', async ({ browser }) => {
  78  |     const context = await browser.newContext({
  79  |       viewport: { width: 768, height: 1024 },
  80  |     });
  81  |     const page = await context.newPage();
  82  |     
  83  |     await page.goto('http://localhost:3000');
  84  |     
  85  |     // 타블릿 레이아웃이 제대로 렌더링되는지 확인
  86  |     const mainElement = page.locator('main');
  87  |     await expect(mainElement).toBeVisible();
  88  |     
  89  |     await context.close();
  90  |   });
  91  | 
  92  |   test('데스크톱 뷰포트 - 1920px', async ({ browser }) => {
  93  |     const context = await browser.newContext({
  94  |       viewport: { width: 1920, height: 1080 },
  95  |     });
  96  |     const page = await context.newPage();
  97  |     
  98  |     await page.goto('http://localhost:3000');
  99  |     
  100 |     // 데스크톱 레이아웃이 제대로 렌더링되는지 확인
  101 |     const mainElement = page.locator('main');
  102 |     await expect(mainElement).toBeVisible();
  103 |     
  104 |     await context.close();
  105 |   });
  106 | 
  107 |   test('Canonical URL 검증', async ({ page }) => {
  108 |     await page.goto('http://localhost:3000');
  109 |     
  110 |     const canonicalUrl = await page.getAttribute('link[rel="canonical"]', 'href');
  111 |     expect(canonicalUrl).toBe('https://notion-cms.example.com/');
  112 |   });
  113 | 
  114 |   test('언어 설정 검증', async ({ page }) => {
  115 |     await page.goto('http://localhost:3000');
  116 |     
  117 |     const htmlLang = await page.getAttribute('html', 'lang');
  118 |     expect(htmlLang).toBe('ko');
  119 |   });
  120 | });
  121 | 
```