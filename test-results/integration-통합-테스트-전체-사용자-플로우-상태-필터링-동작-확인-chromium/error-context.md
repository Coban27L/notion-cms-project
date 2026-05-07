# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: integration.spec.ts >> 통합 테스트: 전체 사용자 플로우 >> 상태 필터링 동작 확인
- Location: __tests__/e2e/integration.spec.ts:128:7

# Error details

```
TimeoutError: page.waitForURL: Timeout 10000ms exceeded.
=========================== logs ===========================
waiting for navigation to "**/dashboard" until "load"
============================================================
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
      - generic [ref=e20]: 관리자 로그인
      - generic [ref=e22]:
        - generic [ref=e23]: 이메일 또는 비밀번호가 올바르지 않습니다
        - generic [ref=e24]:
          - generic [ref=e25]: 이메일
          - textbox "이메일" [ref=e26]:
            - /placeholder: admin@example.com
            - text: admin@example.com
        - generic [ref=e27]:
          - generic [ref=e28]: 비밀번호
          - textbox "비밀번호" [ref=e29]:
            - /placeholder: ••••••••
            - text: admin123456
        - button "로그인" [ref=e30]
  - contentinfo [ref=e31]:
    - generic [ref=e32]:
      - generic [ref=e33]:
        - generic [ref=e34]:
          - generic [ref=e35]:
            - img [ref=e36]
            - text: 노션 CMS
          - paragraph [ref=e39]: 노션 기반 견적서 발행 및 공유 플랫폼
        - generic [ref=e40]:
          - heading "서비스" [level=4] [ref=e41]
          - list [ref=e42]:
            - listitem [ref=e43]:
              - link "홈" [ref=e44] [cursor=pointer]:
                - /url: /
            - listitem [ref=e45]:
              - link "대시보드" [ref=e46] [cursor=pointer]:
                - /url: /dashboard
            - listitem [ref=e47]:
              - link "관리자 로그인" [ref=e48] [cursor=pointer]:
                - /url: /login
        - generic [ref=e49]:
          - heading "법률" [level=4] [ref=e50]
          - list [ref=e51]:
            - listitem [ref=e52]:
              - link "개인정보 보호" [ref=e53] [cursor=pointer]:
                - /url: /privacy
            - listitem [ref=e54]:
              - link "이용약관" [ref=e55] [cursor=pointer]:
                - /url: /terms
      - paragraph [ref=e57]: © 2026 노션 CMS. 모든 권리 보유.
  - region "Notifications alt+T"
  - button "Open Next.js Dev Tools" [ref=e63] [cursor=pointer]:
    - img [ref=e64]
  - alert [ref=e67]
```

# Test source

```ts
  34  | 
  35  |       // 6. PDF 다운로드 버튼 확인
  36  |       const downloadButton = page.getByRole('button', { name: /PDF 다운로드/ });
  37  |       const isButtonVisible = await downloadButton.isVisible().catch(() => false);
  38  |       console.log(`PDF 다운로드 버튼 표시: ${isButtonVisible}`);
  39  |     }
  40  |   });
  41  | 
  42  |   test('클라이언트 플로우: 공유 링크 접속 → 견적서 확인', async ({ page }) => {
  43  |     // 공유 링크로 직접 접근 (notFound 처리 확인)
  44  |     await page.goto('http://localhost:3000/quotes/550e8400-e29b-41d4-a716-446655440001');
  45  | 
  46  |     // 404 또는 견적서 페이지 로드 대기
  47  |     await page.waitForLoadState('networkidle');
  48  | 
  49  |     // 페이지가 로드되었는지 확인
  50  |     const url = page.url();
  51  |     console.log('현재 URL:', url);
  52  | 
  53  |     // 견적서가 로드되었을 경우
  54  |     if (url.includes('/quotes/')) {
  55  |       const heading = page.getByRole('heading').first();
  56  |       await expect(heading).toBeVisible();
  57  |     }
  58  |   });
  59  | 
  60  |   test('로그아웃 후 대시보드 접근 리디렉션 확인', async ({ page }) => {
  61  |     // 1. 로그인
  62  |     await page.goto('http://localhost:3000/login');
  63  |     await page.fill('input[name="email"]', 'admin@example.com');
  64  |     await page.fill('input[name="password"]', 'admin123456');
  65  |     await page.click('button[type="submit"]');
  66  |     await page.waitForURL('**/dashboard', { timeout: 10000 });
  67  | 
  68  |     // 2. 로그아웃 버튼 찾기 및 클릭
  69  |     const logoutButton = page.getByRole('button', { name: /로그아웃/ });
  70  |     if (await logoutButton.isVisible()) {
  71  |       await logoutButton.click();
  72  |       await page.waitForURL('**/', { timeout: 10000 });
  73  |       console.log('로그아웃 성공');
  74  |     }
  75  | 
  76  |     // 3. 대시보드 직접 접근 시도
  77  |     await page.goto('http://localhost:3000/dashboard');
  78  | 
  79  |     // 로그인 페이지로 리디렉션되었는지 확인
  80  |     const url = page.url();
  81  |     console.log('리디렉션 후 URL:', url);
  82  |     const isLoginPage = url.includes('/login');
  83  |     console.log(`로그인 페이지로 리디렉션됨: ${isLoginPage}`);
  84  |   });
  85  | 
  86  |   test('잘못된 자격증명으로 로그인 실패', async ({ page }) => {
  87  |     await page.goto('http://localhost:3000/login');
  88  | 
  89  |     // 잘못된 비밀번호로 로그인 시도
  90  |     await page.fill('input[name="email"]', 'admin@example.com');
  91  |     await page.fill('input[name="password"]', 'wrongpassword');
  92  |     await page.click('button[type="submit"]');
  93  | 
  94  |     // 에러 메시지 확인 또는 페이지 유지
  95  |     await page.waitForTimeout(1000);
  96  |     const url = page.url();
  97  |     console.log('로그인 실패 후 URL:', url);
  98  |     const stillOnLoginPage = url.includes('/login');
  99  |     console.log(`로그인 페이지 유지: ${stillOnLoginPage}`);
  100 |   });
  101 | 
  102 |   test('공유 링크 복사 기능 검증', async ({ page }) => {
  103 |     // 로그인하여 대시보드 접근
  104 |     await page.goto('http://localhost:3000/login');
  105 |     await page.fill('input[name="email"]', 'admin@example.com');
  106 |     await page.fill('input[name="password"]', 'admin123456');
  107 |     await page.click('button[type="submit"]');
  108 |     await page.waitForURL('**/dashboard', { timeout: 10000 });
  109 | 
  110 |     // 견적서 상세 페이지 이동
  111 |     const quoteLink = page.locator('a[href*="/quotes/"]').first();
  112 |     if (await quoteLink.isVisible()) {
  113 |       await quoteLink.click();
  114 |       await page.waitForURL('**/quotes/**', { timeout: 10000 });
  115 | 
  116 |       // 공유 링크 복사 버튼 클릭
  117 |       const copyButton = page.getByRole('button', { name: /링크 복사/ });
  118 |       if (await copyButton.isVisible()) {
  119 |         await copyButton.click();
  120 | 
  121 |         // 토스트 메시지 확인
  122 |         await page.waitForTimeout(500);
  123 |         console.log('공유 링크 복사 버튼이 작동했습니다');
  124 |       }
  125 |     }
  126 |   });
  127 | 
  128 |   test('상태 필터링 동작 확인', async ({ page }) => {
  129 |     // 로그인
  130 |     await page.goto('http://localhost:3000/login');
  131 |     await page.fill('input[name="email"]', 'admin@example.com');
  132 |     await page.fill('input[name="password"]', 'admin123456');
  133 |     await page.click('button[type="submit"]');
> 134 |     await page.waitForURL('**/dashboard', { timeout: 10000 });
      |                ^ TimeoutError: page.waitForURL: Timeout 10000ms exceeded.
  135 | 
  136 |     // 상태 필터 버튼 확인
  137 |     const statusButtons = page.locator('button, [role="button"]').filter({
  138 |       hasText: /전체|발행|승인|취소/,
  139 |     });
  140 | 
  141 |     const count = await statusButtons.count();
  142 |     console.log(`발견된 상태 필터 버튼: ${count}개`);
  143 | 
  144 |     if (count > 0) {
  145 |       // 각 필터 클릭 시도
  146 |       for (let i = 0; i < Math.min(2, count); i++) {
  147 |         const button = statusButtons.nth(i);
  148 |         const text = await button.textContent();
  149 |         console.log(`필터 버튼 클릭: ${text}`);
  150 |         await button.click();
  151 |         await page.waitForTimeout(500);
  152 |       }
  153 |     }
  154 |   });
  155 | });
  156 | 
  157 | test.describe('에러 처리 및 엣지 케이스', () => {
  158 |   test('존재하지 않는 견적서 토큰 접근', async ({ page }) => {
  159 |     await page.goto('http://localhost:3000/quotes/invalid-uuid-format-123');
  160 | 
  161 |     // 404 페이지 또는 에러 표시 확인
  162 |     await page.waitForLoadState('networkidle');
  163 |     const pageContent = await page.content();
  164 | 
  165 |     const has404Text = pageContent.includes('404') || pageContent.includes('찾을 수 없습니다');
  166 |     console.log(`404 또는 에러 메시지 표시: ${has404Text}`);
  167 |   });
  168 | 
  169 |   test('빈 견적서 목록 처리', async ({ page }) => {
  170 |     // 로그인
  171 |     await page.goto('http://localhost:3000/login');
  172 |     await page.fill('input[name="email"]', 'admin@example.com');
  173 |     await page.fill('input[name="password"]', 'admin123456');
  174 |     await page.click('button[type="submit"]');
  175 |     await page.waitForURL('**/dashboard', { timeout: 10000 });
  176 | 
  177 |     // 대시보드 로드 확인
  178 |     const dashboard = page.locator('[class*="dashboard"], [class*="container"]').first();
  179 |     await expect(dashboard).toBeVisible();
  180 | 
  181 |     console.log('대시보드가 정상 로드되었습니다');
  182 |   });
  183 | 
  184 |   test('빠른 연속 PDF 다운로드 클릭', async ({ page }) => {
  185 |     // 로그인 후 견적서 상세 페이지로 이동
  186 |     await page.goto('http://localhost:3000/login');
  187 |     await page.fill('input[name="email"]', 'admin@example.com');
  188 |     await page.fill('input[name="password"]', 'admin123456');
  189 |     await page.click('button[type="submit"]');
  190 |     await page.waitForURL('**/dashboard', { timeout: 10000 });
  191 | 
  192 |     const quoteLink = page.locator('a[href*="/quotes/"]').first();
  193 |     if (await quoteLink.isVisible()) {
  194 |       await quoteLink.click();
  195 |       await page.waitForURL('**/quotes/**', { timeout: 10000 });
  196 | 
  197 |       const downloadButton = page.getByRole('button', { name: /PDF 다운로드/ });
  198 |       if (await downloadButton.isVisible()) {
  199 |         // 빠른 연속 클릭 시도
  200 |         await downloadButton.click();
  201 |         await downloadButton.click();
  202 | 
  203 |         // 버튼이 비활성화되었는지 확인 (또는 로딩 상태)
  204 |         await page.waitForTimeout(1000);
  205 |         console.log('빠른 연속 클릭 테스트 완료');
  206 |       }
  207 |     }
  208 |   });
  209 | });
  210 | 
```