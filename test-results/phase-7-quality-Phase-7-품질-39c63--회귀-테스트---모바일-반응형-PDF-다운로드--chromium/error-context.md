# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phase-7-quality.spec.ts >> Phase 7: 품질 개선 및 버그 수정 >> Task 024: 회귀 테스트 - 모바일 반응형 (PDF 다운로드)
- Location: __tests__/e2e/phase-7-quality.spec.ts:178:7

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
      - generic [ref=e8]:
        - button "테마 토글" [ref=e9]:
          - img
        - button "메뉴" [ref=e11]:
          - img [ref=e12]
  - main [ref=e13]:
    - generic [ref=e15]:
      - link "돌아가기" [ref=e17] [cursor=pointer]:
        - /url: /
        - button "돌아가기" [ref=e18]:
          - img
          - text: 돌아가기
      - generic [ref=e19]:
        - heading "견적서 조회" [level=1] [ref=e20]
        - paragraph [ref=e21]: 견적서의 상세 내용을 확인하실 수 있습니다.
      - generic [ref=e22]:
        - generic [ref=e23]:
          - generic [ref=e24]:
            - img [ref=e25]
            - paragraph [ref=e27]: 이 견적서는 유효기간이 만료되었습니다.
          - generic [ref=e28]:
            - generic [ref=e29]:
              - img [ref=e31]
              - generic [ref=e34]:
                - paragraph [ref=e35]: 견적서 번호
                - heading "QT-2024-001" [level=2] [ref=e36]
            - generic [ref=e37]: 발행
          - separator [ref=e39]
          - generic [ref=e40]:
            - generic [ref=e41]:
              - img [ref=e43]
              - generic [ref=e47]:
                - paragraph [ref=e48]: 클라이언트
                - paragraph [ref=e49]: 홍길동
            - generic [ref=e50]:
              - img [ref=e52]
              - generic [ref=e54]:
                - paragraph [ref=e55]: 발행일
                - paragraph [ref=e56]: 2024년 3월 15일
            - generic [ref=e57]:
              - img [ref=e59]
              - generic [ref=e61]:
                - paragraph [ref=e62]: 유효기간
                - paragraph [ref=e63]: 2024년 4월 15일까지(만료됨)
        - generic [ref=e64]:
          - heading "견적 항목" [level=3] [ref=e65]
          - list "견적 항목 목록" [ref=e66]:
            - listitem [ref=e67]:
              - 'article "항목 1: UI/UX 디자인" [ref=e68]':
                - generic [ref=e69]:
                  - generic [ref=e70]:
                    - generic [ref=e71]: "1"
                    - paragraph [ref=e72]: UI/UX 디자인
                  - paragraph [ref=e73]: S$800,000.00
                - generic [ref=e74]:
                  - generic [ref=e75]:
                    - paragraph [ref=e76]: 수량
                    - paragraph [ref=e77]: "1"
                  - generic [ref=e78]:
                    - paragraph [ref=e79]: 단가
                    - paragraph [ref=e80]: S$800,000.00
            - listitem [ref=e81]:
              - 'article "항목 2: Frontend 개발" [ref=e82]':
                - generic [ref=e83]:
                  - generic [ref=e84]:
                    - generic [ref=e85]: "2"
                    - paragraph [ref=e86]: Frontend 개발
                  - paragraph [ref=e87]: S$700,000.00
                - generic [ref=e88]:
                  - generic [ref=e89]:
                    - paragraph [ref=e90]: 수량
                    - paragraph [ref=e91]: "1"
                  - generic [ref=e92]:
                    - paragraph [ref=e93]: 단가
                    - paragraph [ref=e94]: S$700,000.00
        - generic [ref=e95]:
          - heading "금액 요약" [level=3] [ref=e96]
          - generic [ref=e98]:
            - generic [ref=e99]:
              - generic [ref=e100]: 소계
              - generic [ref=e101]: S$1,500,000.00
            - generic [ref=e102]:
              - generic [ref=e103]: GST (9%)
              - generic [ref=e104]: S$135,000.00
            - separator [ref=e105]
            - generic [ref=e106]:
              - generic [ref=e107]: 합계
              - generic [ref=e108]: S$1,635,000.00
        - generic [ref=e109]:
          - generic [ref=e110]:
            - img [ref=e111]
            - heading "비고" [level=3] [ref=e114]
          - paragraph [ref=e115]: 결제는 50% 선금, 50% 완료 후 지급
        - separator [ref=e116]
        - generic [ref=e117]:
          - paragraph [ref=e118]: 이 견적서는 공유 링크를 통해 열람 가능합니다.
          - generic [ref=e119]:
            - button "공유 링크 복사" [ref=e120]:
              - generic [ref=e121]:
                - img
              - generic [ref=e122]: 링크 복사
            - button "PDF 다운로드" [ref=e123]:
              - img
              - text: PDF 다운로드
  - contentinfo [ref=e124]:
    - generic [ref=e125]:
      - generic [ref=e126]:
        - generic [ref=e127]:
          - generic [ref=e128]:
            - img [ref=e129]
            - text: 노션 CMS
          - paragraph [ref=e132]: 노션 기반 견적서 발행 및 공유 플랫폼
        - generic [ref=e133]:
          - heading "서비스" [level=4] [ref=e134]
          - list [ref=e135]:
            - listitem [ref=e136]:
              - link "홈" [ref=e137] [cursor=pointer]:
                - /url: /
            - listitem [ref=e138]:
              - link "대시보드" [ref=e139] [cursor=pointer]:
                - /url: /dashboard
            - listitem [ref=e140]:
              - link "관리자 로그인" [ref=e141] [cursor=pointer]:
                - /url: /login
        - generic [ref=e142]:
          - heading "법률" [level=4] [ref=e143]
          - list [ref=e144]:
            - listitem [ref=e145]:
              - link "개인정보 보호" [ref=e146] [cursor=pointer]:
                - /url: /privacy
            - listitem [ref=e147]:
              - link "이용약관" [ref=e148] [cursor=pointer]:
                - /url: /terms
      - paragraph [ref=e150]: © 2026 노션 CMS. 모든 권리 보유.
  - region "Notifications alt+T"
  - button "Open Next.js Dev Tools" [ref=e156] [cursor=pointer]:
    - img [ref=e157]
  - alert [ref=e160]
```

# Test source

```ts
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
> 189 |     const downloadPromise = context.waitForEvent('download');
      |                                     ^ Error: browserContext.waitForEvent: Test timeout of 30000ms exceeded.
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
  216 |     const downloadPromise = context.waitForEvent('download');
  217 |     const downloadButton = page.locator('button:has-text("PDF 다운로드")');
  218 |     await downloadButton.click();
  219 | 
  220 |     const download = await downloadPromise;
  221 |     expect(download.suggestedFilename()).toContain('pdf');
  222 |   });
  223 | });
  224 | 
```