# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pdf-download.spec.ts >> PDF 다운로드 기능 >> PDF 다운로드 버튼 클릭 시 토스트 알림이 표시되어야 함
- Location: __tests__/e2e/pdf-download.spec.ts:17:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /PDF 다운로드/ })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "QuoteKit" [ref=e4] [cursor=pointer]:
        - /url: /
        - img [ref=e5]
        - text: QuoteKit
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
      - img [ref=e20]
      - generic [ref=e22]:
        - heading "404" [level=1] [ref=e23]
        - paragraph [ref=e24]: 페이지를 찾을 수 없습니다
      - paragraph [ref=e25]: 죄송합니다. 요청하신 견적서나 페이지를 찾을 수 없거나 삭제되었습니다.
      - link "홈으로 돌아가기" [ref=e26] [cursor=pointer]:
        - /url: /
        - button "홈으로 돌아가기" [ref=e27]
  - contentinfo [ref=e28]:
    - generic [ref=e29]:
      - generic [ref=e30]:
        - generic [ref=e31]:
          - generic [ref=e32]:
            - img [ref=e33]
            - text: QuoteKit
          - paragraph [ref=e36]: 노션 기반 견적서 발행 및 공유 플랫폼
        - generic [ref=e37]:
          - heading "서비스" [level=4] [ref=e38]
          - list [ref=e39]:
            - listitem [ref=e40]:
              - link "홈" [ref=e41] [cursor=pointer]:
                - /url: /
            - listitem [ref=e42]:
              - link "대시보드" [ref=e43] [cursor=pointer]:
                - /url: /dashboard
            - listitem [ref=e44]:
              - link "관리자 로그인" [ref=e45] [cursor=pointer]:
                - /url: /login
        - generic [ref=e46]:
          - heading "법률" [level=4] [ref=e47]
          - list [ref=e48]:
            - listitem [ref=e49]:
              - link "개인정보 보호" [ref=e50] [cursor=pointer]:
                - /url: /privacy
            - listitem [ref=e51]:
              - link "이용약관" [ref=e52] [cursor=pointer]:
                - /url: /terms
      - paragraph [ref=e54]: © 2026 QuoteKit. 모든 권리 보유.
  - region "Notifications alt+T"
  - button "Open Next.js Dev Tools" [ref=e60] [cursor=pointer]:
    - img [ref=e61]
  - alert [ref=e64]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('PDF 다운로드 기능', () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     await page.goto('http://localhost:3000/quotes/share-test-token-123');
  6   |   });
  7   | 
  8   |   test('PDF 다운로드 버튼이 표시되고 클릭 가능해야 함', async ({ page }) => {
  9   |     // 다운로드 버튼 찾기
  10  |     const downloadButton = page.getByRole('button', { name: /PDF 다운로드/ });
  11  | 
  12  |     // 버튼이 존재하고 활성화되어 있는지 확인
  13  |     await expect(downloadButton).toBeVisible();
  14  |     await expect(downloadButton).toBeEnabled();
  15  |   });
  16  | 
  17  |   test('PDF 다운로드 버튼 클릭 시 토스트 알림이 표시되어야 함', async ({ page }) => {
  18  |     const downloadButton = page.getByRole('button', { name: /PDF 다운로드/ });
  19  | 
  20  |     // 버튼 클릭
> 21  |     await downloadButton.click();
      |                          ^ Error: locator.click: Test timeout of 30000ms exceeded.
  22  | 
  23  |     // "PDF 다운로드를 시작합니다" 토스트 메시지 확인
  24  |     await page.waitForTimeout(500);
  25  |     const toastMessages = await page.getByText(/PDF 다운로드/).all();
  26  |     expect(toastMessages.length).toBeGreaterThan(0);
  27  |   });
  28  | 
  29  |   test('PDF 생성 중에는 버튼이 비활성화되어야 함', async ({ page }) => {
  30  |     const downloadButton = page.getByRole('button', { name: /PDF 다운로드/ });
  31  | 
  32  |     // 버튼 클릭
  33  |     await downloadButton.click();
  34  | 
  35  |     // 일시적으로 버튼 상태 확인
  36  |     const isDisabled = await downloadButton.isDisabled();
  37  |     // 다운로드가 빠르게 완료될 수 있으므로 상태 확인은 선택적
  38  |     console.log('PDF 생성 중 버튼 비활성화 상태:', isDisabled);
  39  |   });
  40  | 
  41  |   test('클라이언트명에 특수문자가 있을 때 파일명이 올바르게 생성되어야 함', async ({ page }) => {
  42  |     // 페이지에서 클라이언트명 텍스트 확인
  43  |     const clientNameText = await page.locator('text=/클라이언트/').first().textContent();
  44  |     console.log('클라이언트명:', clientNameText);
  45  | 
  46  |     // 토스트 메시지에 파일명이 포함되는지 확인
  47  |     const downloadButton = page.getByRole('button', { name: /PDF 다운로드/ });
  48  |     await downloadButton.click();
  49  | 
  50  |     // 다운로드 성공 토스트 대기
  51  |     await page.waitForTimeout(2000);
  52  |   });
  53  | });
  54  | 
  55  | test.describe('공유 링크에서 견적서 조회', () => {
  56  |   test('공유 토큰으로 견적서 페이지에 접근할 수 있어야 함', async ({ page }) => {
  57  |     await page.goto('http://localhost:3000/quotes/share-test-token-123');
  58  | 
  59  |     // 페이지가 로드되었는지 확인
  60  |     const heading = page.getByRole('heading', { name: '견적서 조회' });
  61  |     await expect(heading).toBeVisible();
  62  |   });
  63  | 
  64  |   test('견적서 데이터가 올바르게 표시되어야 함', async ({ page }) => {
  65  |     await page.goto('http://localhost:3000/quotes/share-test-token-123');
  66  | 
  67  |     // 견적서 헤더 확인
  68  |     const title = page.getByRole('heading', { level: 1 }).first();
  69  |     await expect(title).toBeVisible();
  70  | 
  71  |     // 항목 테이블 확인
  72  |     const table = page.locator('table, [role="grid"]').first();
  73  |     await expect(table).toBeVisible();
  74  | 
  75  |     // 합계 섹션 확인
  76  |     const summarySection = page.getByText(/합계|금액 요약/);
  77  |     await expect(summarySection).toBeVisible();
  78  |   });
  79  | 
  80  |   test('공유 링크 복사 버튼이 작동해야 함', async ({ page } ) => {
  81  |     await page.goto('http://localhost:3000/quotes/share-test-token-123');
  82  | 
  83  |     // 공유 링크 복사 버튼 찾기
  84  |     const copyButton = page.getByRole('button', { name: /링크 복사/ });
  85  |     await expect(copyButton).toBeVisible();
  86  | 
  87  |     // 버튼 클릭
  88  |     await copyButton.click();
  89  | 
  90  |     // 성공 토스트 메시지 확인
  91  |     await page.waitForTimeout(500);
  92  |     const successToast = page.getByText(/복사되었습니다/);
  93  |     await expect(successToast).toBeVisible();
  94  |   });
  95  | });
  96  | 
  97  | test.describe('에러 핸들링', () => {
  98  |   test('잘못된 토큰으로 접근할 때 404 페이지를 표시해야 함', async ({ page }) => {
  99  |     await page.goto('http://localhost:3000/quotes/invalid-token-xyz', { waitUntil: 'networkidle' });
  100 | 
  101 |     // 404 페이지 표시 확인
  102 |     const notFoundText = page.getByText(/찾을 수 없습니다|404/i);
  103 |     const isVisible = await notFoundText.isVisible().catch(() => false);
  104 | 
  105 |     if (isVisible) {
  106 |       await expect(notFoundText).toBeVisible();
  107 |     }
  108 |   });
  109 | });
  110 | 
```