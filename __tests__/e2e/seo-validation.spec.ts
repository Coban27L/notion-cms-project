import { test, expect } from '@playwright/test';

test.describe('SEO 최적화 검증', () => {
  test('메타데이터 - 홈페이지', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Open Graph 태그 확인
    const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
    expect(ogTitle).toContain('노션 CMS');
    
    const ogDescription = await page.getAttribute('meta[property="og:description"]', 'content');
    expect(ogDescription).toBeTruthy();
    
    const ogImage = await page.getAttribute('meta[property="og:image"]', 'content');
    expect(ogImage).toBeTruthy();
  });

  test('JSON-LD 구조화 데이터 - 홈페이지', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const jsonLd = await page.evaluate(() => {
      const script = document.querySelector('script[type="application/ld+json"]');
      return script ? JSON.parse(script.textContent || '{}') : null;
    });
    
    expect(jsonLd).not.toBeNull();
    expect(jsonLd['@type']).toBe('WebApplication');
    expect(jsonLd.name).toContain('노션 CMS');
  });

  test('robots.txt 검증', async ({ page }) => {
    const response = await page.goto('http://localhost:3000/robots.txt');
    expect(response?.status()).toBe(200);
    
    const content = await page.content();
    expect(content).toContain('User-agent: *');
    expect(content).toContain('Disallow: /dashboard');
  });

  test('sitemap.xml 검증', async ({ page }) => {
    const response = await page.goto('http://localhost:3000/sitemap.xml');
    expect(response?.status()).toBe(200);
    
    const content = await page.content();
    expect(content).toContain('<url>');
    expect(content).toContain('https://notion-cms.example.com');
  });

  test('Twitter Card 메타 태그', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const twitterCard = await page.getAttribute('meta[name="twitter:card"]', 'content');
    expect(twitterCard).toBe('summary_large_image');
    
    const twitterTitle = await page.getAttribute('meta[name="twitter:title"]', 'content');
    expect(twitterTitle).toBeTruthy();
  });

  test('모바일 뷰포트 - 375px (아이폰 SE)', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 },
    });
    const page = await context.newPage();
    
    await page.goto('http://localhost:3000');
    
    // 주요 요소가 보이는지 확인
    await expect(page.locator('h1').first()).toBeVisible();
    
    // 페이지가 완전히 로드되었는지 확인
    const status = await page.evaluate(() => document.readyState);
    expect(status).toBe('complete');
    
    await context.close();
  });

  test('태블릿 뷰포트 - 768px (아이패드)', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 768, height: 1024 },
    });
    const page = await context.newPage();
    
    await page.goto('http://localhost:3000');
    
    // 타블릿 레이아웃이 제대로 렌더링되는지 확인
    const mainElement = page.locator('main');
    await expect(mainElement).toBeVisible();
    
    await context.close();
  });

  test('데스크톱 뷰포트 - 1920px', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
    });
    const page = await context.newPage();
    
    await page.goto('http://localhost:3000');
    
    // 데스크톱 레이아웃이 제대로 렌더링되는지 확인
    const mainElement = page.locator('main');
    await expect(mainElement).toBeVisible();
    
    await context.close();
  });

  test('Canonical URL 검증', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const canonicalUrl = await page.getAttribute('link[rel="canonical"]', 'href');
    expect(canonicalUrl).toBe('https://notion-cms.example.com/');
  });

  test('언어 설정 검증', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const htmlLang = await page.getAttribute('html', 'lang');
    expect(htmlLang).toBe('ko');
  });
});
