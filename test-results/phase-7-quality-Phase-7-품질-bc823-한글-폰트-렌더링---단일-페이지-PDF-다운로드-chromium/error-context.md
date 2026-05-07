# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phase-7-quality.spec.ts >> Phase 7: 품질 개선 및 버그 수정 >> Task 021: PDF 한글 폰트 렌더링 - 단일 페이지 PDF 다운로드
- Location: __tests__/e2e/phase-7-quality.spec.ts:4:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: browserContext.waitForEvent: Test timeout of 30000ms exceeded.
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
      - link "돌아가기" [ref=e20] [cursor=pointer]:
        - /url: /
        - button "돌아가기" [ref=e21]:
          - img
          - text: 돌아가기
      - generic [ref=e22]:
        - heading "견적서 조회" [level=1] [ref=e23]
        - paragraph [ref=e24]: 견적서의 상세 내용을 확인하실 수 있습니다.
      - generic [ref=e25]:
        - generic [ref=e26]:
          - generic [ref=e27]:
            - img [ref=e28]
            - paragraph [ref=e30]: 이 견적서는 유효기간이 만료되었습니다.
          - generic [ref=e31]:
            - generic [ref=e32]:
              - img [ref=e34]
              - generic [ref=e37]:
                - paragraph [ref=e38]: 견적서 번호
                - heading "QT-2024-001" [level=2] [ref=e39]
            - generic [ref=e40]: 발행
          - separator [ref=e42]
          - generic [ref=e43]:
            - generic [ref=e44]:
              - img [ref=e46]
              - generic [ref=e50]:
                - paragraph [ref=e51]: 클라이언트
                - paragraph [ref=e52]: 홍길동
            - generic [ref=e53]:
              - img [ref=e55]
              - generic [ref=e57]:
                - paragraph [ref=e58]: 발행일
                - paragraph [ref=e59]: 2024년 3월 15일
            - generic [ref=e60]:
              - img [ref=e62]
              - generic [ref=e64]:
                - paragraph [ref=e65]: 유효기간
                - paragraph [ref=e66]: 2024년 4월 15일까지(만료됨)
        - generic [ref=e67]:
          - heading "견적 항목" [level=3] [ref=e68]
          - table [ref=e71]:
            - rowgroup [ref=e72]:
              - row "품목 수량 단가 금액" [ref=e73]:
                - columnheader "품목" [ref=e74]
                - columnheader "수량" [ref=e75]
                - columnheader "단가" [ref=e76]
                - columnheader "금액" [ref=e77]
            - rowgroup [ref=e78]:
              - row "UI/UX 디자인 1 S$800,000.00 S$800,000.00" [ref=e79]:
                - cell "UI/UX 디자인" [ref=e80]
                - cell "1" [ref=e81]
                - cell "S$800,000.00" [ref=e82]
                - cell "S$800,000.00" [ref=e83]
              - row "Frontend 개발 1 S$700,000.00 S$700,000.00" [ref=e84]:
                - cell "Frontend 개발" [ref=e85]
                - cell "1" [ref=e86]
                - cell "S$700,000.00" [ref=e87]
                - cell "S$700,000.00" [ref=e88]
        - generic [ref=e89]:
          - heading "금액 요약" [level=3] [ref=e90]
          - generic [ref=e92]:
            - generic [ref=e93]:
              - generic [ref=e94]: 소계
              - generic [ref=e95]: S$1,500,000.00
            - generic [ref=e96]:
              - generic [ref=e97]: GST (9%)
              - generic [ref=e98]: S$135,000.00
            - separator [ref=e99]
            - generic [ref=e100]:
              - generic [ref=e101]: 합계
              - generic [ref=e102]: S$1,635,000.00
        - generic [ref=e103]:
          - generic [ref=e104]:
            - img [ref=e105]
            - heading "비고" [level=3] [ref=e108]
          - paragraph [ref=e109]: 결제는 50% 선금, 50% 완료 후 지급
        - separator [ref=e110]
        - generic [ref=e111]:
          - paragraph [ref=e112]: 이 견적서는 공유 링크를 통해 열람 가능합니다.
          - generic [ref=e113]:
            - button "공유 링크 복사" [ref=e114]:
              - generic [ref=e115]:
                - img
              - generic [ref=e116]: 링크 복사
            - button "PDF 다운로드" [ref=e117]:
              - img
              - text: PDF 다운로드
  - contentinfo [ref=e118]:
    - generic [ref=e119]:
      - generic [ref=e120]:
        - generic [ref=e121]:
          - generic [ref=e122]:
            - img [ref=e123]
            - text: 노션 CMS
          - paragraph [ref=e126]: 노션 기반 견적서 발행 및 공유 플랫폼
        - generic [ref=e127]:
          - heading "서비스" [level=4] [ref=e128]
          - list [ref=e129]:
            - listitem [ref=e130]:
              - link "홈" [ref=e131] [cursor=pointer]:
                - /url: /
            - listitem [ref=e132]:
              - link "대시보드" [ref=e133] [cursor=pointer]:
                - /url: /dashboard
            - listitem [ref=e134]:
              - link "관리자 로그인" [ref=e135] [cursor=pointer]:
                - /url: /login
        - generic [ref=e136]:
          - heading "법률" [level=4] [ref=e137]
          - list [ref=e138]:
            - listitem [ref=e139]:
              - link "개인정보 보호" [ref=e140] [cursor=pointer]:
                - /url: /privacy
            - listitem [ref=e141]:
              - link "이용약관" [ref=e142] [cursor=pointer]:
                - /url: /terms
      - paragraph [ref=e144]: © 2026 노션 CMS. 모든 권리 보유.
  - region "Notifications alt+T"
  - button "Open Next.js Dev Tools" [ref=e150] [cursor=pointer]:
    - img [ref=e151]
  - alert [ref=e154]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Phase 7: 품질 개선 및 버그 수정', () => {
  4   |   test('Task 021: PDF 한글 폰트 렌더링 - 단일 페이지 PDF 다운로드', async ({ page, context }) => {
  5   |     // 공유 링크를 통해 견적서 페이지 접근
  6   |     await page.goto('/quotes/550e8400-e29b-41d4-a716-446655440001');
  7   | 
  8   |     // 클라이언트명 확인 (한글)
  9   |     await expect(page.locator('text=홍길동')).toBeVisible();
  10  | 
  11  |     // PDF 다운로드 버튼 찾기
> 12  |     const downloadPromise = context.waitForEvent('download');
      |                                     ^ Error: browserContext.waitForEvent: Test timeout of 30000ms exceeded.
  13  |     const downloadButton = page.locator('button:has-text("PDF 다운로드")');
  14  |     await expect(downloadButton).toBeVisible();
  15  | 
  16  |     // 다운로드 클릭
  17  |     await downloadButton.click();
  18  |     const download = await downloadPromise;
  19  | 
  20  |     // 다운로드된 파일 확인
  21  |     expect(download.suggestedFilename()).toContain('pdf');
  22  |     const filePath = await download.path();
  23  |     expect(filePath).toBeTruthy();
  24  |   });
  25  | 
  26  |   test('Task 022: PDF 레이아웃 개선 - 다중 페이지 PDF 생성', async ({ page, context }) => {
  27  |     // 다중 페이지 테스트용 견적서 접근 (15개 항목)
  28  |     await page.goto('/quotes/550e8400-e29b-41d4-a716-446655440006');
  29  | 
  30  |     // 클라이언트명 확인
  31  |     await expect(page.locator('text=다중페이지 테스트')).toBeVisible();
  32  | 
  33  |     // 항목 목록 확인
  34  |     const itemCount = await page.locator('[role="row"]').count();
  35  |     expect(itemCount).toBeGreaterThan(10);
  36  | 
  37  |     // PDF 다운로드
  38  |     const downloadPromise = context.waitForEvent('download');
  39  |     await page.locator('button:has-text("PDF 다운로드")').click();
  40  |     const download = await downloadPromise;
  41  | 
  42  |     // 파일 생성 확인
  43  |     const filePath = await download.path();
  44  |     expect(filePath).toBeTruthy();
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
  98  |     const downloadPromise = context.waitForEvent('download');
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
```