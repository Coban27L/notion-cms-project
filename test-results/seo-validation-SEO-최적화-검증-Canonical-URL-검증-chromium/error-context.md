# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: seo-validation.spec.ts >> SEO 최적화 검증 >> Canonical URL 검증
- Location: __tests__/e2e/seo-validation.spec.ts:107:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.getAttribute: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('link[rel="canonical"]')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "노션 CMS" [ref=e4] [cursor=pointer]:
        - /url: /
        - img [ref=e5]
        - text: 노션 CMS
      - navigation [ref=e8]:
        - link "홈" [ref=e9] [cursor=pointer]:
          - /url: /
        - link "대시보드" [ref=e10] [cursor=pointer]:
          - /url: /dashboard
      - generic [ref=e11]:
        - button "테마 토글" [ref=e12]:
          - img
        - link "로그인" [ref=e14] [cursor=pointer]:
          - /url: /login
          - button "로그인" [ref=e15]
  - main [ref=e16]:
    - generic [ref=e18]:
      - img [ref=e21]
      - heading "노션으로 관리하는 견적서 시스템" [level=1] [ref=e24]:
        - text: 노션으로 관리하는
        - text: 견적서 시스템
      - paragraph [ref=e25]:
        - text: 노션 DB에 견적서를 작성하면 자동으로 웹에서 확인 가능합니다.
        - text: 고유 링크로 클라이언트에게 공유하고 PDF로 다운받으세요.
      - generic [ref=e26]:
        - link "관리자 로그인" [ref=e27] [cursor=pointer]:
          - /url: /login
          - button "관리자 로그인" [ref=e28]
        - link "대시보드 보기" [ref=e29] [cursor=pointer]:
          - /url: /dashboard
          - button "대시보드 보기" [ref=e30]
    - generic [ref=e32]:
      - generic [ref=e33]:
        - heading "핵심 기능" [level=2] [ref=e34]
        - paragraph [ref=e35]: 프리랜서와 소규모 팀을 위한 견적서 관리의 모든 것
      - generic [ref=e36]:
        - generic [ref=e37]:
          - generic [ref=e38]:
            - img [ref=e40]
            - generic [ref=e44]: 노션 CMS 연동
          - generic [ref=e46]: 노션 데이터베이스에서 견적서를 작성하면 웹에서 자동으로 렌더링됩니다. 별도의 코딩 없이 노션만으로 견적서를 관리하세요.
        - generic [ref=e47]:
          - generic [ref=e48]:
            - img [ref=e50]
            - generic [ref=e53]: 고유 링크 공유
          - generic [ref=e55]: UUID 기반의 고유 링크를 생성하여 클라이언트에게 전달하세요. 로그인 없이도 견적서를 확인할 수 있습니다.
        - generic [ref=e56]:
          - generic [ref=e57]:
            - img [ref=e59]
            - generic [ref=e63]: PDF 다운로드
          - generic [ref=e65]: 견적서를 PDF 파일로 다운로드할 수 있습니다. 한글 폰트를 지원하며 인쇄에 최적화된 레이아웃을 제공합니다.
    - generic [ref=e68]:
      - heading "지금 바로 시작하세요" [level=2] [ref=e69]
      - paragraph [ref=e70]:
        - text: 노션에 견적서를 등록하고 관리자로 로그인하여
        - text: 클라이언트에게 공유 링크를 전달해보세요.
      - generic [ref=e71]:
        - link "관리자 로그인" [ref=e72] [cursor=pointer]:
          - /url: /login
          - button "관리자 로그인" [ref=e73]
        - link "대시보드 보기" [ref=e74] [cursor=pointer]:
          - /url: /dashboard
          - button "대시보드 보기" [ref=e75]
  - contentinfo [ref=e76]:
    - generic [ref=e77]:
      - generic [ref=e78]:
        - generic [ref=e79]:
          - generic [ref=e80]:
            - img [ref=e81]
            - text: 노션 CMS
          - paragraph [ref=e84]: 노션 기반 견적서 발행 및 공유 플랫폼
        - generic [ref=e85]:
          - heading "서비스" [level=4] [ref=e86]
          - list [ref=e87]:
            - listitem [ref=e88]:
              - link "홈" [ref=e89] [cursor=pointer]:
                - /url: /
            - listitem [ref=e90]:
              - link "대시보드" [ref=e91] [cursor=pointer]:
                - /url: /dashboard
            - listitem [ref=e92]:
              - link "관리자 로그인" [ref=e93] [cursor=pointer]:
                - /url: /login
        - generic [ref=e94]:
          - heading "법률" [level=4] [ref=e95]
          - list [ref=e96]:
            - listitem [ref=e97]:
              - link "개인정보 보호" [ref=e98] [cursor=pointer]:
                - /url: /privacy
            - listitem [ref=e99]:
              - link "이용약관" [ref=e100] [cursor=pointer]:
                - /url: /terms
      - paragraph [ref=e102]: © 2026 노션 CMS. 모든 권리 보유.
  - region "Notifications alt+T"
  - button "Open Next.js Dev Tools" [ref=e108] [cursor=pointer]:
    - img [ref=e109]
  - alert [ref=e112]
```

# Test source

```ts
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
  36  |     expect(content).toContain('User-agent: *');
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
> 110 |     const canonicalUrl = await page.getAttribute('link[rel="canonical"]', 'href');
      |                                     ^ Error: page.getAttribute: Test timeout of 30000ms exceeded.
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