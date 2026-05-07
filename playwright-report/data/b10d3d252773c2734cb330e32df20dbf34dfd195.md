# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phase-6-integration.spec.ts >> Phase 6: 관리자 대시보드 통합 테스트 >> 모바일 뷰포트 (375px) 반응형 테스트
- Location: __tests__/e2e/phase-6-integration.spec.ts:190:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('button:has-text("로그인")')
    - locator resolved to 2 elements. Proceeding with the first one: <button tabindex="0" type="button" data-slot="button" class="group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:bor…>로그인</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    57 × waiting for element to be visible, enabled and stable
       - element is not visible
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e1]:
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
      - generic [ref=e17]: 관리자 로그인
      - generic [ref=e19]:
        - generic [ref=e20]:
          - generic [ref=e21]: 이메일
          - textbox "이메일" [ref=e22]:
            - /placeholder: admin@example.com
            - text: admin@example.com
        - generic [ref=e23]:
          - generic [ref=e24]: 비밀번호
          - textbox "비밀번호" [active] [ref=e25]:
            - /placeholder: ••••••••
            - text: password123
        - button "로그인" [ref=e26]
  - contentinfo [ref=e27]:
    - generic [ref=e28]:
      - generic [ref=e29]:
        - generic [ref=e30]:
          - generic [ref=e31]:
            - img [ref=e32]
            - text: 노션 CMS
          - paragraph [ref=e35]: 노션 기반 견적서 발행 및 공유 플랫폼
        - generic [ref=e36]:
          - heading "서비스" [level=4] [ref=e37]
          - list [ref=e38]:
            - listitem [ref=e39]:
              - link "홈" [ref=e40] [cursor=pointer]:
                - /url: /
            - listitem [ref=e41]:
              - link "대시보드" [ref=e42] [cursor=pointer]:
                - /url: /dashboard
            - listitem [ref=e43]:
              - link "관리자 로그인" [ref=e44] [cursor=pointer]:
                - /url: /login
        - generic [ref=e45]:
          - heading "법률" [level=4] [ref=e46]
          - list [ref=e47]:
            - listitem [ref=e48]:
              - link "개인정보 보호" [ref=e49] [cursor=pointer]:
                - /url: /privacy
            - listitem [ref=e50]:
              - link "이용약관" [ref=e51] [cursor=pointer]:
                - /url: /terms
      - paragraph [ref=e53]: © 2026 노션 CMS. 모든 권리 보유.
  - region "Notifications alt+T"
  - button "Open Next.js Dev Tools" [ref=e59] [cursor=pointer]:
    - img [ref=e60]
  - alert [ref=e63]
```

# Test source

```ts
  1   | import { test, expect, Page } from '@playwright/test';
  2   | 
  3   | // 관리자 로그인 fixture
  4   | async function loginAsAdmin(page: Page) {
  5   |   await page.goto('/login');
  6   |   await page.fill('input[type="email"]', 'admin@example.com');
  7   |   await page.fill('input[type="password"]', 'password123');
> 8   |   await page.click('button:has-text("로그인")');
      |              ^ Error: page.click: Test timeout of 30000ms exceeded.
  9   |   await page.waitForURL('/dashboard', { timeout: 60000 });
  10  | }
  11  | 
  12  | test.describe('Phase 6: 관리자 대시보드 통합 테스트', () => {
  13  |   test('관리자 로그인 → 대시보드 진입 → UI 노출 검증 (데스크톱)', async ({ page }) => {
  14  |     await page.setViewportSize({ width: 1440, height: 900 });
  15  | 
  16  |     // 로그인
  17  |     await loginAsAdmin(page);
  18  | 
  19  |     // 현재 URL 확인
  20  |     await expect(page).toHaveURL('/dashboard');
  21  | 
  22  |     // 관리자 셸 확인
  23  |     const sidebar = page.locator('aside');
  24  |     await expect(sidebar).toBeVisible();
  25  | 
  26  |     // 헤더 확인
  27  |     const header = page.locator('header');
  28  |     await expect(header).toBeVisible();
  29  |     await expect(page.locator('text=견적서 관리')).toBeVisible();
  30  | 
  31  |     // 일반 헤더 없음 확인 (관리자 셸만)
  32  |     const generalHeader = page.locator('text=노션 CMS');
  33  |     await expect(generalHeader).not.toBeVisible();
  34  | 
  35  |     // 메뉴 항목 확인
  36  |     await expect(page.locator('a:has-text("대시보드")')).toBeVisible();
  37  |   });
  38  | 
  39  |   test('견적서 목록 검색 기능', async ({ page }) => {
  40  |     await page.setViewportSize({ width: 1440, height: 900 });
  41  |     await loginAsAdmin(page);
  42  | 
  43  |     // 검색 입력란 확인
  44  |     const searchInput = page.locator('input[placeholder*="클라이언트명"]');
  45  |     await expect(searchInput).toBeVisible();
  46  | 
  47  |     // 검색어 입력
  48  |     await searchInput.fill('테스트');
  49  | 
  50  |     // URL 파라미터 확인
  51  |     await page.waitForURL(/search=테스트/);
  52  |     await expect(page).toHaveURL(/search=테스트/);
  53  | 
  54  |     // 검색 필터 적용 확인
  55  |     const filterReset = page.locator('button:has-text("필터 초기화")');
  56  |     await expect(filterReset).toBeVisible();
  57  | 
  58  |     // 필터 초기화
  59  |     await filterReset.click();
  60  | 
  61  |     // URL 복원 확인
  62  |     await page.waitForURL('/dashboard');
  63  |     await expect(searchInput).toHaveValue('');
  64  |   });
  65  | 
  66  |   test('견적서 목록 상태 필터링', async ({ page }) => {
  67  |     await page.setViewportSize({ width: 1440, height: 900 });
  68  |     await loginAsAdmin(page);
  69  | 
  70  |     // 상태 필터 칩 확인
  71  |     const allButton = page.locator('button:has-text("전체")');
  72  |     const publishedButton = page.locator('button:has-text("발행")');
  73  | 
  74  |     await expect(allButton).toBeVisible();
  75  |     await expect(publishedButton).toBeVisible();
  76  | 
  77  |     // 발행 상태 필터 클릭
  78  |     await publishedButton.click();
  79  | 
  80  |     // URL 파라미터 확인
  81  |     await page.waitForURL(/status=발행/);
  82  |     await expect(page).toHaveURL(/status=발행/);
  83  | 
  84  |     // 발행 버튼이 활성 상태 (파란색)
  85  |     await expect(publishedButton).toHaveClass(/bg-blue-600/);
  86  | 
  87  |     // 전체로 복원
  88  |     await allButton.click();
  89  |     await page.waitForURL(/status=all/);
  90  |   });
  91  | 
  92  |   test('견적서 목록 정렬 기능', async ({ page }) => {
  93  |     await page.setViewportSize({ width: 1440, height: 900 });
  94  |     await loginAsAdmin(page);
  95  | 
  96  |     // 정렬 선택 확인
  97  |     const sortSelect = page.locator('[role="combobox"]');
  98  |     await expect(sortSelect).toBeVisible();
  99  | 
  100 |     // 정렬 변경
  101 |     await sortSelect.click();
  102 |     await page.locator('text=높은 금액순').click();
  103 | 
  104 |     // URL 파라미터 확인
  105 |     await page.waitForURL(/sort=amount-desc/);
  106 |     await expect(page).toHaveURL(/sort=amount-desc/);
  107 |   });
  108 | 
```