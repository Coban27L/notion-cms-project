# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phase-7-quality.spec.ts >> Phase 7: 품질 개선 및 버그 수정 >> Task 022: PDF 레이아웃 개선 - 다중 페이지 PDF 생성
- Location: __tests__/e2e/phase-7-quality.spec.ts:26:7

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 10
Received:   0
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
            - generic [ref=e28]:
              - img [ref=e30]
              - generic [ref=e33]:
                - paragraph [ref=e34]: 견적서 번호
                - heading "QT-2024-006" [level=2] [ref=e35]
            - generic [ref=e36]: 발행
          - separator [ref=e38]
          - generic [ref=e39]:
            - generic [ref=e40]:
              - img [ref=e42]
              - generic [ref=e46]:
                - paragraph [ref=e47]: 클라이언트
                - paragraph [ref=e48]: 다중페이지 테스트
            - generic [ref=e49]:
              - img [ref=e51]
              - generic [ref=e53]:
                - paragraph [ref=e54]: 발행일
                - paragraph [ref=e55]: 2026년 5월 7일
            - generic [ref=e56]:
              - img [ref=e58]
              - generic [ref=e60]:
                - paragraph [ref=e61]: 유효기간
                - paragraph [ref=e62]: 2026년 6월 7일까지
        - generic [ref=e63]:
          - heading "견적 항목" [level=3] [ref=e64]
          - table [ref=e67]:
            - rowgroup [ref=e68]:
              - row "품목 수량 단가 금액" [ref=e69]:
                - columnheader "품목" [ref=e70]
                - columnheader "수량" [ref=e71]
                - columnheader "단가" [ref=e72]
                - columnheader "금액" [ref=e73]
            - rowgroup [ref=e74]:
              - row "개발 항목 1 1 S$500,000.00 S$500,000.00" [ref=e75]:
                - cell "개발 항목 1" [ref=e76]
                - cell "1" [ref=e77]
                - cell "S$500,000.00" [ref=e78]
                - cell "S$500,000.00" [ref=e79]
              - row "개발 항목 2 1 S$520,000.00 S$520,000.00" [ref=e80]:
                - cell "개발 항목 2" [ref=e81]
                - cell "1" [ref=e82]
                - cell "S$520,000.00" [ref=e83]
                - cell "S$520,000.00" [ref=e84]
              - row "개발 항목 3 1 S$540,000.00 S$540,000.00" [ref=e85]:
                - cell "개발 항목 3" [ref=e86]
                - cell "1" [ref=e87]
                - cell "S$540,000.00" [ref=e88]
                - cell "S$540,000.00" [ref=e89]
              - row "개발 항목 4 1 S$560,000.00 S$560,000.00" [ref=e90]:
                - cell "개발 항목 4" [ref=e91]
                - cell "1" [ref=e92]
                - cell "S$560,000.00" [ref=e93]
                - cell "S$560,000.00" [ref=e94]
              - row "개발 항목 5 1 S$580,000.00 S$580,000.00" [ref=e95]:
                - cell "개발 항목 5" [ref=e96]
                - cell "1" [ref=e97]
                - cell "S$580,000.00" [ref=e98]
                - cell "S$580,000.00" [ref=e99]
              - row "개발 항목 6 1 S$600,000.00 S$600,000.00" [ref=e100]:
                - cell "개발 항목 6" [ref=e101]
                - cell "1" [ref=e102]
                - cell "S$600,000.00" [ref=e103]
                - cell "S$600,000.00" [ref=e104]
              - row "개발 항목 7 1 S$620,000.00 S$620,000.00" [ref=e105]:
                - cell "개발 항목 7" [ref=e106]
                - cell "1" [ref=e107]
                - cell "S$620,000.00" [ref=e108]
                - cell "S$620,000.00" [ref=e109]
              - row "개발 항목 8 1 S$640,000.00 S$640,000.00" [ref=e110]:
                - cell "개발 항목 8" [ref=e111]
                - cell "1" [ref=e112]
                - cell "S$640,000.00" [ref=e113]
                - cell "S$640,000.00" [ref=e114]
              - row "개발 항목 9 1 S$660,000.00 S$660,000.00" [ref=e115]:
                - cell "개발 항목 9" [ref=e116]
                - cell "1" [ref=e117]
                - cell "S$660,000.00" [ref=e118]
                - cell "S$660,000.00" [ref=e119]
              - row "개발 항목 10 1 S$680,000.00 S$680,000.00" [ref=e120]:
                - cell "개발 항목 10" [ref=e121]
                - cell "1" [ref=e122]
                - cell "S$680,000.00" [ref=e123]
                - cell "S$680,000.00" [ref=e124]
              - row "개발 항목 11 1 S$700,000.00 S$700,000.00" [ref=e125]:
                - cell "개발 항목 11" [ref=e126]
                - cell "1" [ref=e127]
                - cell "S$700,000.00" [ref=e128]
                - cell "S$700,000.00" [ref=e129]
              - row "개발 항목 12 1 S$720,000.00 S$720,000.00" [ref=e130]:
                - cell "개발 항목 12" [ref=e131]
                - cell "1" [ref=e132]
                - cell "S$720,000.00" [ref=e133]
                - cell "S$720,000.00" [ref=e134]
              - row "개발 항목 13 1 S$740,000.00 S$740,000.00" [ref=e135]:
                - cell "개발 항목 13" [ref=e136]
                - cell "1" [ref=e137]
                - cell "S$740,000.00" [ref=e138]
                - cell "S$740,000.00" [ref=e139]
              - row "개발 항목 14 1 S$760,000.00 S$760,000.00" [ref=e140]:
                - cell "개발 항목 14" [ref=e141]
                - cell "1" [ref=e142]
                - cell "S$760,000.00" [ref=e143]
                - cell "S$760,000.00" [ref=e144]
              - row "개발 항목 15 1 S$780,000.00 S$780,000.00" [ref=e145]:
                - cell "개발 항목 15" [ref=e146]
                - cell "1" [ref=e147]
                - cell "S$780,000.00" [ref=e148]
                - cell "S$780,000.00" [ref=e149]
        - generic [ref=e150]:
          - heading "금액 요약" [level=3] [ref=e151]
          - generic [ref=e153]:
            - generic [ref=e154]:
              - generic [ref=e155]: 소계
              - generic [ref=e156]: S$9,600,000.00
            - generic [ref=e157]:
              - generic [ref=e158]: GST (9%)
              - generic [ref=e159]: S$864,000.00
            - separator [ref=e160]
            - generic [ref=e161]:
              - generic [ref=e162]: 합계
              - generic [ref=e163]: S$10,464,000.00
        - generic [ref=e164]:
          - generic [ref=e165]:
            - img [ref=e166]
            - heading "비고" [level=3] [ref=e169]
          - paragraph [ref=e170]: 다중 페이지 테스트용 견적서입니다. 15개의 항목이 포함되어 있으며, 페이지 분할 및 합계 영역 렌더링을 검증합니다.
        - separator [ref=e171]
        - generic [ref=e172]:
          - paragraph [ref=e173]: 이 견적서는 공유 링크를 통해 열람 가능합니다.
          - generic [ref=e174]:
            - button "공유 링크 복사" [ref=e175]:
              - generic [ref=e176]:
                - img
              - generic [ref=e177]: 링크 복사
            - button "PDF 다운로드" [ref=e178]:
              - img
              - text: PDF 다운로드
  - contentinfo [ref=e179]:
    - generic [ref=e180]:
      - generic [ref=e181]:
        - generic [ref=e182]:
          - generic [ref=e183]:
            - img [ref=e184]
            - text: 노션 CMS
          - paragraph [ref=e187]: 노션 기반 견적서 발행 및 공유 플랫폼
        - generic [ref=e188]:
          - heading "서비스" [level=4] [ref=e189]
          - list [ref=e190]:
            - listitem [ref=e191]:
              - link "홈" [ref=e192] [cursor=pointer]:
                - /url: /
            - listitem [ref=e193]:
              - link "대시보드" [ref=e194] [cursor=pointer]:
                - /url: /dashboard
            - listitem [ref=e195]:
              - link "관리자 로그인" [ref=e196] [cursor=pointer]:
                - /url: /login
        - generic [ref=e197]:
          - heading "법률" [level=4] [ref=e198]
          - list [ref=e199]:
            - listitem [ref=e200]:
              - link "개인정보 보호" [ref=e201] [cursor=pointer]:
                - /url: /privacy
            - listitem [ref=e202]:
              - link "이용약관" [ref=e203] [cursor=pointer]:
                - /url: /terms
      - paragraph [ref=e205]: © 2026 노션 CMS. 모든 권리 보유.
  - region "Notifications alt+T"
  - button "Open Next.js Dev Tools" [ref=e211] [cursor=pointer]:
    - img [ref=e212]
  - alert [ref=e215]
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
  12  |     const downloadPromise = context.waitForEvent('download');
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
> 35  |     expect(itemCount).toBeGreaterThan(10);
      |                       ^ Error: expect(received).toBeGreaterThan(expected)
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
```