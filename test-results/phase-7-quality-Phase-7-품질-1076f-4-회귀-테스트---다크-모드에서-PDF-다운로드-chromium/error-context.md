# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phase-7-quality.spec.ts >> Phase 7: 품질 개선 및 버그 수정 >> Task 024: 회귀 테스트 - 다크 모드에서 PDF 다운로드
- Location: __tests__/e2e/phase-7-quality.spec.ts:198:7

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
  145 |     expect(focusedElement).toBe('email');
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
  169 |     const downloadPromise = context.waitForEvent('download');
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
  189 |     const downloadPromise = context.waitForEvent('download');
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
> 216 |     const downloadPromise = context.waitForEvent('download');
      |                                     ^ Error: browserContext.waitForEvent: Test timeout of 30000ms exceeded.
  217 |     const downloadButton = page.locator('button:has-text("PDF 다운로드")');
  218 |     await downloadButton.click();
  219 | 
  220 |     const download = await downloadPromise;
  221 |     expect(download.suggestedFilename()).toContain('pdf');
  222 |   });
  223 | });
  224 | 
```