import { test, expect, Page } from "@playwright/test";

// 관리자 로그인 fixture
async function loginAsAdmin(page: Page) {
  await page.goto("/login");
  await page.fill('input[type="email"]', "admin@example.com");
  await page.fill('input[type="password"]', "password123");
  await page.click('button:has-text("로그인")');
  await page.waitForURL("/dashboard", { timeout: 60000 });
}

test.describe("Phase 6: 관리자 대시보드 통합 테스트", () => {
  test("관리자 로그인 → 대시보드 진입 → UI 노출 검증 (데스크톱)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 로그인
    await loginAsAdmin(page);

    // 현재 URL 확인
    await expect(page).toHaveURL("/dashboard");

    // 관리자 셸 확인
    const sidebar = page.locator("aside");
    await expect(sidebar).toBeVisible();

    // 헤더 확인
    const header = page.locator("header");
    await expect(header).toBeVisible();
    await expect(page.locator("text=견적서 관리")).toBeVisible();

    // 일반 헤더 없음 확인 (관리자 셸만)
    const generalHeader = page.locator("text=노션 CMS");
    await expect(generalHeader).not.toBeVisible();

    // 메뉴 항목 확인
    await expect(page.locator('a:has-text("대시보드")')).toBeVisible();
  });

  test("견적서 목록 검색 기능", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await loginAsAdmin(page);

    // 검색 입력란 확인
    const searchInput = page.locator('input[placeholder*="클라이언트명"]');
    await expect(searchInput).toBeVisible();

    // 검색어 입력
    await searchInput.fill("테스트");

    // URL 파라미터 확인
    await page.waitForURL(/search=테스트/);
    await expect(page).toHaveURL(/search=테스트/);

    // 검색 필터 적용 확인
    const filterReset = page.locator('button:has-text("필터 초기화")');
    await expect(filterReset).toBeVisible();

    // 필터 초기화
    await filterReset.click();

    // URL 복원 확인
    await page.waitForURL("/dashboard");
    await expect(searchInput).toHaveValue("");
  });

  test("견적서 목록 상태 필터링", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await loginAsAdmin(page);

    // 상태 필터 칩 확인
    const allButton = page.locator('button:has-text("전체")');
    const publishedButton = page.locator('button:has-text("발행")');

    await expect(allButton).toBeVisible();
    await expect(publishedButton).toBeVisible();

    // 발행 상태 필터 클릭
    await publishedButton.click();

    // URL 파라미터 확인
    await page.waitForURL(/status=발행/);
    await expect(page).toHaveURL(/status=발행/);

    // 발행 버튼이 활성 상태 (파란색)
    await expect(publishedButton).toHaveClass(/bg-blue-600/);

    // 전체로 복원
    await allButton.click();
    await page.waitForURL(/status=all/);
  });

  test("견적서 목록 정렬 기능", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await loginAsAdmin(page);

    // 정렬 선택 확인
    const sortSelect = page.locator('[role="combobox"]');
    await expect(sortSelect).toBeVisible();

    // 정렬 변경
    await sortSelect.click();
    await page.locator("text=높은 금액순").click();

    // URL 파라미터 확인
    await page.waitForURL(/sort=amount-desc/);
    await expect(page).toHaveURL(/sort=amount-desc/);
  });

  test("뷰 전환 (카드/테이블)", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await loginAsAdmin(page);

    // 뷰 전환 버튼 확인
    const cardButton = page.locator('button:has-text("카드")');
    const tableButton = page.locator('button:has-text("테이블")');

    await expect(cardButton).toBeVisible();
    await expect(tableButton).toBeVisible();

    // 테이블 뷰로 전환
    await tableButton.click();

    // 테이블 구조 확인
    const table = page.locator("table");
    await expect(table).toBeVisible();

    // 카드 뷰로 복원
    await cardButton.click();

    // 카드 확인
    const quoteCard = page
      .locator('[class*="rounded-xl"][class*="border"]')
      .first();
    await expect(quoteCard).toBeVisible();
  });

  test("공유 링크 복사 전체 플로우", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await loginAsAdmin(page);

    // 공유 링크 복사 버튼 찾기
    const copyButton = page.locator('button:has-text("링크 복사")').first();
    await expect(copyButton).toBeVisible();

    // 클릭
    await copyButton.click();

    // 토스트 알림 확인
    const toast = page.locator("text=복사되었습니다");
    await expect(toast).toBeVisible();

    // 아이콘 변경 (Check로) 확인
    const checkIcon = page.locator('[data-lucide="check"]').first();
    await expect(checkIcon).toBeVisible();

    // 1.5초 후 복구 확인
    await page.waitForTimeout(1800);
    const copyIcon = page.locator('[data-lucide="copy"]').first();
    await expect(copyIcon).toBeVisible();
  });

  test("테마 토글 (라이트/다크 모드)", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await loginAsAdmin(page);

    // 초기 모드 확인
    const htmlElement = page.locator("html");
    const initialClass = await htmlElement.evaluate((el) => el.className);
    const isDarkMode = initialClass.includes("dark");

    // 테마 토글 버튼
    const themeButton = page.locator('button[title*="모드로"]').first();
    await expect(themeButton).toBeVisible();

    // 테마 전환
    await themeButton.click();

    // 클래스 변경 확인
    await page.waitForTimeout(200);
    const newClass = await htmlElement.evaluate((el) => el.className);
    const newIsDarkMode = newClass.includes("dark");

    expect(newIsDarkMode).toBe(!isDarkMode);

    // 다시 전환
    await themeButton.click();
    await page.waitForTimeout(200);
    const restoredClass = await htmlElement.evaluate((el) => el.className);
    expect(restoredClass).toBe(initialClass);
  });

  test("모바일 뷰포트 (375px) 반응형 테스트", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await loginAsAdmin(page);

    // 사이드바 숨김 확인 (모바일)
    const desktopSidebar = page.locator("aside");
    await expect(desktopSidebar).not.toBeVisible();

    // 햄버거 메뉴 확인
    const hamburgerButton = page.locator('button[class*="md:hidden"]').first();
    await expect(hamburgerButton).toBeVisible();

    // 햄버거 클릭 시 드로어 열림
    await hamburgerButton.click();
    const drawer = page.locator('[role="dialog"]');
    await expect(drawer).toBeVisible();

    // 메뉴 항목 확인
    await expect(page.locator("text=대시보드")).toBeVisible();

    // 메뉴 항목 클릭 시 드로어 닫힘
    await page.locator('a:has-text("대시보드")').click();
    await expect(drawer).not.toBeVisible();

    // 필터 버튼들도 스택 레이아웃
    const filterSection = page.locator('input[placeholder*="클라이언트명"]');
    await expect(filterSection).toBeVisible();
  });

  test("태블릿 뷰포트 (768px) 반응형 테스트", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await loginAsAdmin(page);

    // 사이드바 표시
    const sidebar = page.locator("aside");
    await expect(sidebar).toBeVisible();

    // 헤더도 표시
    const header = page.locator("header");
    await expect(header).toBeVisible();

    // 레이아웃이 flex 양쪽 정렬
    const mainContent = page.locator("main");
    await expect(mainContent).toBeVisible();
  });

  test("데스크톱 뷰포트 (1440px) 반응형 테스트", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await loginAsAdmin(page);

    // 사이드바 고정 확인
    const sidebar = page.locator("aside");
    const sidebarWidth = await sidebar.evaluate(
      (el) => (el as HTMLElement).offsetWidth,
    );
    expect(sidebarWidth).toBe(256); // w-64

    // 햄버거 메뉴 숨김
    const hamburgerButton = page.locator('button[class*="md:hidden"]');
    await expect(hamburgerButton).not.toBeVisible();

    // 헤더 레이아웃 확인
    const header = page.locator("header");
    const headerContent = header.locator("> div");
    await expect(headerContent).toHaveClass(/justify-between/);
  });

  test("사이드바 접기/펼치기 + 상태 저장", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await loginAsAdmin(page);

    // 초기 상태: 펼쳐짐
    const sidebar = page.locator("aside");
    let width = await sidebar.evaluate(
      (el: HTMLElement) => (el as HTMLElement).offsetWidth,
    );
    expect(width).toBe(256);

    // 접기
    await page.locator('button:has-text("접기")').click();
    await page.waitForTimeout(300);

    width = await sidebar.evaluate(
      (el: HTMLElement) => (el as HTMLElement).offsetWidth,
    );
    expect(width).toBe(80);

    // 페이지 새로고침 후 상태 유지
    await page.reload();
    await page.waitForURL("/dashboard");

    width = await sidebar.evaluate(
      (el: HTMLElement) => (el as HTMLElement).offsetWidth,
    );
    expect(width).toBe(80);

    // 펼치기
    await page.locator('button:has-text("펼치기")').click();
    await page.waitForTimeout(300);

    width = await sidebar.evaluate(
      (el: HTMLElement) => (el as HTMLElement).offsetWidth,
    );
    expect(width).toBe(256);
  });

  test("로그아웃 플로우", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await loginAsAdmin(page);

    // 사이드바 로그아웃 버튼
    const sidebarLogout = page
      .locator('aside button:has-text("로그아웃")')
      .first();
    await expect(sidebarLogout).toBeVisible();

    // 클릭
    await sidebarLogout.click();

    // 로그인 페이지로 리디렉션
    await page.waitForURL("/login");
    await expect(page).toHaveURL(/\/login/);

    // 로그인 폼 표시
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });

  test("복합 필터 (검색 + 상태 + 정렬)", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await loginAsAdmin(page);

    // 검색
    const searchInput = page.locator('input[placeholder*="클라이언트명"]');
    await searchInput.fill("테스트");

    // 상태 필터
    await page.locator('button:has-text("발행")').click();

    // 정렬 변경
    const sortSelect = page.locator('[role="combobox"]');
    await sortSelect.click();
    await page.locator("text=높은 금액순").click();

    // URL 파라미터 확인
    await page.waitForURL(
      /search=테스트.*status=발행.*sort=amount-desc|status=발행.*search=테스트.*sort=amount-desc/,
    );

    // 필터 초기화
    const resetButton = page.locator('button:has-text("필터 초기화")');
    await expect(resetButton).toBeVisible();
    await resetButton.click();

    // URL 복원
    await page.waitForURL("/dashboard");
  });

  test("접근성 (ARIA 속성)", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await loginAsAdmin(page);

    // 버튼에 aria-label 확인
    const copyButton = page.locator('button:has-text("링크 복사")').first();
    const ariaLabel = await copyButton.getAttribute("aria-label");
    expect(ariaLabel).toBeTruthy();

    // 메뉴 네비게이션 체크
    const navLinks = page.locator('a[href="/dashboard"]');
    await expect(navLinks.first()).toHaveAttribute("href", "/dashboard");

    // 헤더 제목
    const h1 = page.locator("h1");
    await expect(h1).toContainText("견적서 관리");

    // 활성 메뉴 aria-current 확인
    const activeMenuItem = page.locator('a[aria-current="page"]');
    await expect(activeMenuItem).toBeVisible();

    // 테마 토글 버튼 aria-label 확인
    const themeButton = page.locator('button[aria-label*="모드로"]').first();
    const themeLabel = await themeButton.getAttribute("aria-label");
    expect(themeLabel).toBeTruthy();

    // 사이드바 접기/펼치기 버튼 aria-expanded 확인
    const collapseButton = page
      .locator('button[aria-label*="사이드바"]')
      .first();
    if (await collapseButton.isVisible()) {
      const ariaExpanded = await collapseButton.getAttribute("aria-expanded");
      expect(ariaExpanded).toBeTruthy();
    }
  });
});
