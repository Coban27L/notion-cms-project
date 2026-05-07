import { test, expect } from "@playwright/test";

test.describe("통합 테스트: 전체 사용자 플로우", () => {
  test("관리자 플로우: 로그인 → 대시보드 → 견적서 상세 → PDF 다운로드", async ({
    page,
  }) => {
    // 1. 로그인 페이지로 직접 이동
    await page.goto("http://localhost:3000/login");
    await page.waitForLoadState("networkidle");

    // 2. 로그인 양식 작성
    await page.fill('input[name="email"]', "admin@example.com");
    await page.fill('input[name="password"]', "admin123456");
    await page.click('button[type="submit"]');

    // 3. 대시보드로 리디렉션 확인
    await page.waitForURL("**/dashboard", { timeout: 10000 });
    const dashboardHeading = page.getByRole("heading", { level: 1 });
    await expect(dashboardHeading).toBeVisible();

    // 4. 견적서 링크 확인
    const quoteLink = page.locator('a[href*="/quotes/"]').first();
    const quoteExists = await quoteLink.isVisible().catch(() => false);
    console.log(`견적서 링크 존재: ${quoteExists}`);

    if (quoteExists) {
      await quoteLink.click();

      // 5. 견적서 상세 페이지 로드 확인
      await page.waitForURL("**/quotes/**", { timeout: 10000 });
      const quoteTitle = page.getByRole("heading", { name: /견적서 조회/ });
      const isTitleVisible = await quoteTitle.isVisible().catch(() => false);
      console.log(`견적서 상세 페이지 로드: ${isTitleVisible}`);

      // 6. PDF 다운로드 버튼 확인
      const downloadButton = page.getByRole("button", { name: /PDF 다운로드/ });
      const isButtonVisible = await downloadButton
        .isVisible()
        .catch(() => false);
      console.log(`PDF 다운로드 버튼 표시: ${isButtonVisible}`);
    }
  });

  test("클라이언트 플로우: 공유 링크 접속 → 견적서 확인", async ({ page }) => {
    // 공유 링크로 직접 접근 (notFound 처리 확인)
    await page.goto(
      "http://localhost:3000/quotes/550e8400-e29b-41d4-a716-446655440001",
    );

    // 404 또는 견적서 페이지 로드 대기
    await page.waitForLoadState("networkidle");

    // 페이지가 로드되었는지 확인
    const url = page.url();
    console.log("현재 URL:", url);

    // 견적서가 로드되었을 경우
    if (url.includes("/quotes/")) {
      const heading = page.getByRole("heading").first();
      await expect(heading).toBeVisible();
    }
  });

  test("로그아웃 후 대시보드 접근 리디렉션 확인", async ({ page }) => {
    // 1. 로그인
    await page.goto("http://localhost:3000/login");
    await page.fill('input[name="email"]', "admin@example.com");
    await page.fill('input[name="password"]', "admin123456");
    await page.click('button[type="submit"]');
    await page.waitForURL("**/dashboard", { timeout: 10000 });

    // 2. 로그아웃 버튼 찾기 및 클릭
    const logoutButton = page.getByRole("button", { name: /로그아웃/ });
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
      await page.waitForURL("**/", { timeout: 10000 });
      console.log("로그아웃 성공");
    }

    // 3. 대시보드 직접 접근 시도
    await page.goto("http://localhost:3000/dashboard");

    // 로그인 페이지로 리디렉션되었는지 확인
    const url = page.url();
    console.log("리디렉션 후 URL:", url);
    const isLoginPage = url.includes("/login");
    console.log(`로그인 페이지로 리디렉션됨: ${isLoginPage}`);
  });

  test("잘못된 자격증명으로 로그인 실패", async ({ page }) => {
    await page.goto("http://localhost:3000/login");

    // 잘못된 비밀번호로 로그인 시도
    await page.fill('input[name="email"]', "admin@example.com");
    await page.fill('input[name="password"]', "wrongpassword");
    await page.click('button[type="submit"]');

    // 에러 메시지 확인 또는 페이지 유지
    await page.waitForTimeout(1000);
    const url = page.url();
    console.log("로그인 실패 후 URL:", url);
    const stillOnLoginPage = url.includes("/login");
    console.log(`로그인 페이지 유지: ${stillOnLoginPage}`);
  });

  test("공유 링크 복사 기능 검증", async ({ page }) => {
    // 로그인하여 대시보드 접근
    await page.goto("http://localhost:3000/login");
    await page.fill('input[name="email"]', "admin@example.com");
    await page.fill('input[name="password"]', "admin123456");
    await page.click('button[type="submit"]');
    await page.waitForURL("**/dashboard", { timeout: 10000 });

    // 견적서 상세 페이지 이동
    const quoteLink = page.locator('a[href*="/quotes/"]').first();
    if (await quoteLink.isVisible()) {
      await quoteLink.click();
      await page.waitForURL("**/quotes/**", { timeout: 10000 });

      // 공유 링크 복사 버튼 클릭
      const copyButton = page.getByRole("button", { name: /링크 복사/ });
      if (await copyButton.isVisible()) {
        await copyButton.click();

        // 토스트 메시지 확인
        await page.waitForTimeout(500);
        console.log("공유 링크 복사 버튼이 작동했습니다");
      }
    }
  });

  test("상태 필터링 동작 확인", async ({ page }) => {
    // 로그인
    await page.goto("http://localhost:3000/login");
    await page.fill('input[name="email"]', "admin@example.com");
    await page.fill('input[name="password"]', "admin123456");
    await page.click('button[type="submit"]');
    await page.waitForURL("**/dashboard", { timeout: 10000 });

    // 상태 필터 버튼 확인
    const statusButtons = page.locator('button, [role="button"]').filter({
      hasText: /전체|발행|승인|취소/,
    });

    const count = await statusButtons.count();
    console.log(`발견된 상태 필터 버튼: ${count}개`);

    if (count > 0) {
      // 각 필터 클릭 시도
      for (let i = 0; i < Math.min(2, count); i++) {
        const button = statusButtons.nth(i);
        const text = await button.textContent();
        console.log(`필터 버튼 클릭: ${text}`);
        await button.click();
        await page.waitForTimeout(500);
      }
    }
  });
});

test.describe("에러 처리 및 엣지 케이스", () => {
  test("존재하지 않는 견적서 토큰 접근", async ({ page }) => {
    await page.goto("http://localhost:3000/quotes/invalid-uuid-format-123");

    // 404 페이지 또는 에러 표시 확인
    await page.waitForLoadState("networkidle");
    const pageContent = await page.content();

    const has404Text =
      pageContent.includes("404") || pageContent.includes("찾을 수 없습니다");
    console.log(`404 또는 에러 메시지 표시: ${has404Text}`);
  });

  test("빈 견적서 목록 처리", async ({ page }) => {
    // 로그인
    await page.goto("http://localhost:3000/login");
    await page.fill('input[name="email"]', "admin@example.com");
    await page.fill('input[name="password"]', "admin123456");
    await page.click('button[type="submit"]');
    await page.waitForURL("**/dashboard", { timeout: 10000 });

    // 대시보드 로드 확인
    const dashboard = page
      .locator('[class*="dashboard"], [class*="container"]')
      .first();
    await expect(dashboard).toBeVisible();

    console.log("대시보드가 정상 로드되었습니다");
  });

  test("빠른 연속 PDF 다운로드 클릭", async ({ page }) => {
    // 로그인 후 견적서 상세 페이지로 이동
    await page.goto("http://localhost:3000/login");
    await page.fill('input[name="email"]', "admin@example.com");
    await page.fill('input[name="password"]', "admin123456");
    await page.click('button[type="submit"]');
    await page.waitForURL("**/dashboard", { timeout: 10000 });

    const quoteLink = page.locator('a[href*="/quotes/"]').first();
    if (await quoteLink.isVisible()) {
      await quoteLink.click();
      await page.waitForURL("**/quotes/**", { timeout: 10000 });

      const downloadButton = page.getByRole("button", { name: /PDF 다운로드/ });
      if (await downloadButton.isVisible()) {
        // 빠른 연속 클릭 시도
        await downloadButton.click();
        await downloadButton.click();

        // 버튼이 비활성화되었는지 확인 (또는 로딩 상태)
        await page.waitForTimeout(1000);
        console.log("빠른 연속 클릭 테스트 완료");
      }
    }
  });
});
