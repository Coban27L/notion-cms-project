# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phase-7-quality.spec.ts >> Phase 7: 품질 개선 및 버그 수정 >> Task 023: 접근성 개선 - 키보드 네비게이션
- Location: __tests__/e2e/phase-7-quality.spec.ts:137:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "email"
Received: null
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "노션 CMS" [active] [ref=e4] [cursor=pointer]:
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
        - generic [ref=e23]:
          - generic [ref=e24]: 이메일
          - textbox "이메일" [ref=e25]:
            - /placeholder: admin@example.com
        - generic [ref=e26]:
          - generic [ref=e27]: 비밀번호
          - textbox "비밀번호" [ref=e28]:
            - /placeholder: ••••••••
        - button "로그인" [ref=e29]
  - contentinfo [ref=e30]:
    - generic [ref=e31]:
      - generic [ref=e32]:
        - generic [ref=e33]:
          - generic [ref=e34]:
            - img [ref=e35]
            - text: 노션 CMS
          - paragraph [ref=e38]: 노션 기반 견적서 발행 및 공유 플랫폼
        - generic [ref=e39]:
          - heading "서비스" [level=4] [ref=e40]
          - list [ref=e41]:
            - listitem [ref=e42]:
              - link "홈" [ref=e43] [cursor=pointer]:
                - /url: /
            - listitem [ref=e44]:
              - link "대시보드" [ref=e45] [cursor=pointer]:
                - /url: /dashboard
            - listitem [ref=e46]:
              - link "관리자 로그인" [ref=e47] [cursor=pointer]:
                - /url: /login
        - generic [ref=e48]:
          - heading "법률" [level=4] [ref=e49]
          - list [ref=e50]:
            - listitem [ref=e51]:
              - link "개인정보 보호" [ref=e52] [cursor=pointer]:
                - /url: /privacy
            - listitem [ref=e53]:
              - link "이용약관" [ref=e54] [cursor=pointer]:
                - /url: /terms
      - paragraph [ref=e56]: © 2026 노션 CMS. 모든 권리 보유.
  - region "Notifications alt+T"
  - button "Open Next.js Dev Tools" [ref=e62] [cursor=pointer]:
    - img [ref=e63]
  - alert [ref=e66]
```

# Test source

```ts
  45  | 
  46  |     // 파일 크기 확인 (다중 페이지이므로 더 큼)
  47  |     const { stat } = await import('fs/promises');
  48  |     const fileStats = await stat(filePath);
  49  |     expect(fileStats.size).toBeGreaterThan(1000000); // > 1MB for multi-page
  50  |   });
  51  | 
  52  |   test('Task 022: PDF 레이아웃 개선 - 한국 날짜 포맷 검증', async ({ page }) => {
  53  |     // 견적서 상세 페이지 접근
  54  |     await page.goto('/quotes/550e8400-e29b-41d4-a716-446655440001');
  55  | 
  56  |     // 발행일 확인 (한국 포맷: "2024년 3월 15일")
  57  |     const issuedDate = page.locator('text=2024년 3월 15일');
  58  |     await expect(issuedDate).toBeVisible();
  59  | 
  60  |     // 유효기간도 한국 포맷인지 확인
  61  |     const validDate = page.locator('text=2024년 4월 15일');
  62  |     await expect(validDate).toBeVisible();
  63  |   });
  64  | 
  65  |   test('Task 022: PDF 레이아웃 개선 - 통화 포맷 검증', async ({ page }) => {
  66  |     // 견적서 상세 페이지 접근
  67  |     await page.goto('/quotes/550e8400-e29b-41d4-a716-446655440001');
  68  | 
  69  |     // ₩ 기호와 천 단위 콤마 확인
  70  |     const currencyText = page.locator('text=/₩.+[\d,]+/');
  71  |     await expect(currencyText).toBeVisible();
  72  | 
  73  |     // 구체적인 금액 확인 (800,000)
  74  |     const specificAmount = page.locator('text=₩ 800,000');
  75  |     await expect(specificAmount).toBeVisible();
  76  |   });
  77  | 
  78  |   test('Task 022: PDF 레이아웃 개선 - 단일 페이지 문서에서 요약 섹션 표시', async ({ page }) => {
  79  |     // 단일 페이지 견적서 접근
  80  |     await page.goto('/quotes/550e8400-e29b-41d4-a716-446655440001');
  81  | 
  82  |     // 합계 영역이 페이지에 표시되는지 확인
  83  |     const summarySection = page.locator('text=합계');
  84  |     await expect(summarySection).toBeVisible();
  85  | 
  86  |     // 소계와 총액 확인
  87  |     const subtotal = page.locator('text=소계');
  88  |     const total = page.locator('text=1,500,000');
  89  |     await expect(subtotal).toBeVisible();
  90  |     await expect(total).toBeVisible();
  91  |   });
  92  | 
  93  |   test('Task 022: PDF 레이아웃 개선 - 다중 페이지 문서 페이지 번호 렌더링', async ({ page, context }) => {
  94  |     // 다중 페이지 견적서 접근
  95  |     await page.goto('/quotes/550e8400-e29b-41d4-a716-446655440006');
  96  | 
  97  |     // PDF 다운로드
  98  |     const downloadPromise = page.waitForEvent('download');
  99  |     await page.locator('button:has-text("PDF 다운로드")').click();
  100 |     const download = await downloadPromise;
  101 | 
  102 |     // 파일이 다중 페이지임을 확인 (간접 검증)
  103 |     const filePath = await download.path();
  104 |     expect(filePath).toBeTruthy();
  105 |   });
  106 | 
  107 |   test('Task 022: PDF 레이아웃 개선 - 비고 섹션 표시', async ({ page }) => {
  108 |     // 비고가 있는 견적서 접근
  109 |     await page.goto('/quotes/550e8400-e29b-41d4-a716-446655440001');
  110 | 
  111 |     // 비고 섹션 확인
  112 |     const notesSection = page.locator('text=비고');
  113 |     await expect(notesSection).toBeVisible();
  114 | 
  115 |     const notesContent = page.locator('text=결제는 50% 선금');
  116 |     await expect(notesContent).toBeVisible();
  117 |   });
  118 | 
  119 |   test('Task 022: PDF 레이아웃 개선 - 비고가 없는 견적서', async ({ page }) => {
  120 |     // 비고가 없는 견적서 접근 (page-003)
  121 |     await page.goto('/quotes/550e8400-e29b-41d4-a716-446655440003');
  122 | 
  123 |     // 페이지는 로드되어야 함
  124 |     await expect(page.locator('text=이순신')).toBeVisible();
  125 |   });
  126 | 
  127 |   test('Task 023: 접근성 개선 - ARIA 라벨 검증', async ({ page }) => {
  128 |     // 견적서 상세 페이지 접근
  129 |     await page.goto('/quotes/550e8400-e29b-41d4-a716-446655440001');
  130 | 
  131 |     // PDF 다운로드 버튼에 aria-label이 있는지 확인
  132 |     const downloadButton = page.locator('button:has-text("PDF 다운로드")');
  133 |     const ariaLabel = await downloadButton.getAttribute('aria-label');
  134 |     expect(ariaLabel).toBeTruthy();
  135 |   });
  136 | 
  137 |   test('Task 023: 접근성 개선 - 키보드 네비게이션', async ({ page }) => {
  138 |     // 로그인 페이지 접근
  139 |     await page.goto('/login');
  140 | 
  141 |     // 이메일 입력란 탭으로 포커스
  142 |     await page.keyboard.press('Tab');
  143 |     const emailInput = page.locator('input[type="email"]');
  144 |     const focusedElement = await page.evaluate(() => document.activeElement?.getAttribute('type'));
> 145 |     expect(focusedElement).toBe('email');
      |                            ^ Error: expect(received).toBe(expected) // Object.is equality
  146 | 
  147 |     // 탭 키로 다음 요소로 이동
  148 |     await page.keyboard.press('Tab');
  149 |     const focusedElement2 = await page.evaluate(() => document.activeElement?.getAttribute('type'));
  150 |     expect(focusedElement2).toBe('password');
  151 |   });
  152 | 
  153 |   test('Task 024: 회귀 테스트 - 전체 플로우 검증', async ({ page, context }) => {
  154 |     // 견적서 공유 링크 접근
  155 |     await page.goto('/quotes/550e8400-e29b-41d4-a716-446655440001');
  156 | 
  157 |     // 견적서 정보 확인
  158 |     await expect(page.locator('text=QT-2024-001')).toBeVisible();
  159 |     await expect(page.locator('text=홍길동')).toBeVisible();
  160 | 
  161 |     // 항목 테이블 확인
  162 |     const table = page.locator('table');
  163 |     await expect(table).toBeVisible();
  164 | 
  165 |     // 합계 영역 확인
  166 |     await expect(page.locator('text=합계')).toBeVisible();
  167 | 
  168 |     // PDF 다운로드 가능 확인
  169 |     const downloadPromise = page.waitForEvent('download');
  170 |     const downloadButton = page.locator('button:has-text("PDF 다운로드")');
  171 |     await expect(downloadButton).toBeVisible();
  172 |     await downloadButton.click();
  173 | 
  174 |     const download = await downloadPromise;
  175 |     expect(download.suggestedFilename()).toContain('pdf');
  176 |   });
  177 | 
  178 |   test('Task 024: 회귀 테스트 - 모바일 반응형 (PDF 다운로드)', async ({ page, context }) => {
  179 |     // 모바일 뷰포트 설정
  180 |     await page.setViewportSize({ width: 375, height: 667 });
  181 | 
  182 |     // 견적서 접근
  183 |     await page.goto('/quotes/550e8400-e29b-41d4-a716-446655440001');
  184 | 
  185 |     // 콘텐츠 표시 확인
  186 |     await expect(page.locator('text=홍길동')).toBeVisible();
  187 | 
  188 |     // 모바일에서도 PDF 다운로드 가능
  189 |     const downloadPromise = page.waitForEvent('download');
  190 |     const downloadButton = page.locator('button:has-text("PDF 다운로드")');
  191 |     await expect(downloadButton).toBeVisible();
  192 |     await downloadButton.click();
  193 | 
  194 |     const download = await downloadPromise;
  195 |     expect(download.suggestedFilename()).toContain('pdf');
  196 |   });
  197 | 
  198 |   test('Task 024: 회귀 테스트 - 다크 모드에서 PDF 다운로드', async ({ page, context }) => {
  199 |     // 견적서 접근
  200 |     await page.goto('/quotes/550e8400-e29b-41d4-a716-446655440001');
  201 | 
  202 |     // 다크 모드로 전환
  203 |     const htmlElement = page.locator('html');
  204 |     const isDarkMode = await htmlElement.evaluate((el) => el.classList.contains('dark'));
  205 | 
  206 |     if (!isDarkMode) {
  207 |       // 테마 토글 버튼이 있으면 클릭
  208 |       const themeButton = page.locator('button[title*="모드"]').first();
  209 |       if (await themeButton.isVisible()) {
  210 |         await themeButton.click();
  211 |         await page.waitForTimeout(200);
  212 |       }
  213 |     }
  214 | 
  215 |     // 다크 모드에서도 PDF 다운로드 가능
  216 |     const downloadPromise = page.waitForEvent('download');
  217 |     const downloadButton = page.locator('button:has-text("PDF 다운로드")');
  218 |     await downloadButton.click();
  219 | 
  220 |     const download = await downloadPromise;
  221 |     expect(download.suggestedFilename()).toContain('pdf');
  222 |   });
  223 | });
  224 | 
```