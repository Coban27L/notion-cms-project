import { test, expect, Page } from "@playwright/test";

// 관리자 로그인 fixture
async function loginAsAdmin(page: Page) {
  await page.goto("/login");
  await page.fill(
    'input[type="email"]',
    process.env.ADMIN_EMAIL || "admin@example.com",
  );
  await page.fill(
    'input[type="password"]',
    process.env.ADMIN_PASSWORD || "password123",
  );
  await page.click('button:has-text("로그인")');
  await page.waitForURL("/dashboard");
}

test.describe("AdminSidebar 네비게이션", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test("데스크톱에서 사이드바 항상 표시", async ({ page }) => {
    // 데스크톱 크기로 리사이즈
    await page.setViewportSize({ width: 1440, height: 900 });

    // 사이드바 확인
    const sidebar = page.locator("aside");
    await expect(sidebar).toBeVisible();

    // 메뉴 항목 확인
    await expect(page.locator("text=대시보드")).toBeVisible();
    await expect(page.locator("text=통계")).toBeVisible();
    await expect(page.locator("text=설정")).toBeVisible();
  });

  test("모바일에서 햄버거 메뉴 클릭 시 드로어 열림", async ({ page }) => {
    // 모바일 크기로 리사이즈
    await page.setViewportSize({ width: 375, height: 667 });

    // 햄버거 메뉴 버튼 확인 (desktop에서 hidden, mobile에서 보임)
    const hamburgerButton = page
      .locator('button:has(svg[data-lucide="menu"])')
      .first();
    await expect(hamburgerButton).toBeVisible();

    // 클릭하여 드로어 열기
    await hamburgerButton.click();

    // 드로어 컨텐츠 확인
    const drawerContent = page.locator('[role="dialog"]');
    await expect(drawerContent).toBeVisible();

    // 메뉴 항목 확인
    await expect(page.locator("text=대시보드")).toBeVisible();
  });

  test("활성 메뉴 항목 시각적 강조", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 대시보드 링크가 활성 상태 (bg-blue-600)
    const dashboardLink = page.locator('a:has-text("대시보드")');
    await expect(dashboardLink).toHaveClass(/bg-blue-600/);

    // 통계 링크는 활성 상태 아님
    const statsLink = page.locator('a:has-text("통계")');
    await expect(statsLink).not.toHaveClass(/bg-blue-600/);
  });

  test("관리자 정보 카드 표시", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 관리자 정보 카드 확인
    await expect(page.locator("text=관리자")).toBeVisible();

    // 이메일 표시 확인
    const email = page.locator('[class*="text-slate-400"]');
    await expect(email).toContainText(
      process.env.ADMIN_EMAIL || "admin@example.com",
    );
  });

  test("사이드바 접기/펼치기 토글", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 초기 상태: 사이드바 펼쳐짐
    const sidebar = page.locator("aside");
    let width = await sidebar.evaluate(
      (el: HTMLElement) => (el as HTMLElement).offsetWidth,
    );
    expect(width).toBe(256); // w-64 = 16rem = 256px

    // 접기 버튼 클릭
    const collapseButton = page.locator('button:has-text("접기")');
    await collapseButton.click();

    // 사이드바 축소 확인
    await page.waitForTimeout(300); // transition duration
    width = await sidebar.evaluate(
      (el: HTMLElement) => (el as HTMLElement).offsetWidth,
    );
    expect(width).toBe(80); // w-20 = 5rem = 80px

    // 펼치기 버튼 클릭
    const expandButton = page.locator('button:has-text("펼치기")');
    await expandButton.click();

    // 사이드바 확장 확인
    await page.waitForTimeout(300);
    width = await sidebar.evaluate(
      (el: HTMLElement) => (el as HTMLElement).offsetWidth,
    );
    expect(width).toBe(256);
  });

  test("로그아웃 버튼 클릭 시 세션 종료 및 로그인 페이지 리디렉션", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 로그아웃 버튼 클릭
    const logoutButton = page.locator('button:has-text("로그아웃")');
    await logoutButton.click();

    // 로그인 페이지로 리디렉션 확인
    await page.waitForURL("/login");
    await expect(page).toHaveURL(/\/login/);

    // 로그인 폼 확인
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });

  test("메뉴 항목 네비게이션", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 대시보드 링크 클릭 (이미 있음)
    const dashboardLink = page.locator('a:has-text("대시보드")');
    await dashboardLink.click();

    // 대시보드 페이지 유지
    await expect(page).toHaveURL("/dashboard");
  });

  test("비활성 메뉴 항목 (통계, 설정) 클릭 불가", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 통계 링크 확인 (비활성)
    const statsLink = page.locator('a:has-text("통계")');
    await expect(statsLink).toHaveClass(/pointer-events-none/);
    await expect(statsLink).toHaveClass(/opacity-50/);

    // 설정 링크 확인 (비활성)
    const settingsLink = page.locator('a:has-text("설정")');
    await expect(settingsLink).toHaveClass(/pointer-events-none/);
  });

  test("로컬스토리지 상태 저장 (접기/펼치기)", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 사이드바 접기
    const collapseButton = page.locator('button:has-text("접기")');
    await collapseButton.click();

    // 로컬스토리지 확인
    const collapsed = await page.evaluate(() => {
      return JSON.parse(
        localStorage.getItem("adminSidebarCollapsed") || "false",
      );
    });
    expect(collapsed).toBe(true);

    // 페이지 새로고침
    await page.reload();

    // 상태 유지 확인
    const sidebar = page.locator("aside");
    const width = await sidebar.evaluate(
      (el: HTMLElement) => (el as HTMLElement).offsetWidth,
    );
    expect(width).toBe(80); // 여전히 축소 상태
  });

  test("모바일에서 메뉴 클릭 후 드로어 자동 닫힘", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // 햄버거 메뉴 열기
    const hamburgerButton = page
      .locator('button:has(svg[data-lucide="menu"])')
      .first();
    await hamburgerButton.click();

    // 드로어 확인
    const drawer = page.locator('[role="dialog"]');
    await expect(drawer).toBeVisible();

    // 메뉴 클릭
    const dashboardLink = page.locator('a:has-text("대시보드")');
    await dashboardLink.click();

    // 드로어 자동 닫힘 확인
    await expect(drawer).not.toBeVisible();
  });
});
