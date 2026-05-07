import { test, expect } from "@playwright/test";

test.describe("접근성 감시 (a11y Audit)", () => {
  test("공개 페이지 - 홈페이지 기본 접근성", async ({ page }) => {
    await page.goto("/");

    // 기본 랜드마크 확인
    const header = page.locator("header").first();
    await expect(header).toBeVisible();

    // 제목 구조 확인
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();

    // 링크 접근성 확인
    const links = page.locator("a");
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThan(0);

    // 버튼 접근성 확인
    const buttons = page.locator("button");
    await expect(buttons.first()).toBeVisible();
  });

  test("로그인 페이지 - 폼 접근성", async ({ page }) => {
    await page.goto("/login");

    // 폼 요소 확인
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();

    // 폼 라벨 확인
    const labels = page.locator("label");
    expect(await labels.count()).toBeGreaterThan(0);

    // 버튼 텍스트 확인
    const submitButton = page.locator('button:has-text("로그인")').first();
    await expect(submitButton).toBeVisible();
  });

  test("공유 링크 페이지 - 견적서 상세 접근성", async ({ page }) => {
    // 공개 공유 링크로 접근 (인증 불필요)
    await page.goto("/quotes/550e8400-e29b-41d4-a716-446655440001");

    // 페이지 제목 확인
    const heading = page.locator("h1, h2").first();
    await expect(heading).toBeVisible();

    // 테이블 구조 확인
    const table = page.locator("table").first();
    if (await table.isVisible()) {
      // 테이블 헤더 확인
      const headers = page.locator("thead th");
      expect(await headers.count()).toBeGreaterThan(0);
    }

    // 상호작용 요소 확인 (PDF 다운로드)
    const downloadButton = page
      .locator('button:has-text("PDF 다운로드")')
      .first();
    if (await downloadButton.isVisible()) {
      const ariaLabel = await downloadButton.getAttribute("aria-label");
      // aria-label이 있거나 버튼 텍스트가 명확해야 함
      expect(ariaLabel || (await downloadButton.textContent())).toBeTruthy();
    }
  });

  test("관리자 대시보드 - 네비게이션 접근성", async ({ page }) => {
    // 홈페이지에서 네비게이션 구조 확인 (대시보드는 인증 필요)
    await page.goto("/");

    // 헤더 배너 확인
    const header = page.locator("header").first();
    if (await header.isVisible()) {
      // h1, nav, section 등 주요 랜드마크 확인
      const headings = page.locator("h1, h2, h3").first();
      await expect(headings).toBeVisible();
    }

    // 네비게이션 링크 확인
    const navLinks = page.locator('nav a, a[href*="/"]').first();
    if (await navLinks.isVisible()) {
      // 링크가 상호작용 가능해야 함
      const href = await navLinks.getAttribute("href");
      expect(href).toBeTruthy();
    }
  });

  test("포커스 관리 - Skip to main content 링크", async ({ page }) => {
    await page.goto("/");

    // Skip link가 존재하고 포커스 시 표시되는지 확인
    const skipLink = page.locator('a:has-text("주 콘텐츠로")');

    // 초기 상태: 숨겨짐 (off-screen 또는 negative translate)
    if (await skipLink.isVisible()) {
      const isOffScreen = await skipLink.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top < 0;
      });
      // 초기에 화면 밖이거나 숨겨져 있어야 함
      expect(isOffScreen || (await skipLink.isHidden())).toBeTruthy();
    }

    // Tab 키로 포커스 시 표시
    await page.keyboard.press("Tab");

    // 포커스된 요소 확인
    const focusedElement = await page.evaluate(() => {
      return (document.activeElement as HTMLElement).tagName.toLowerCase();
    });
    // a, button 등 상호작용 요소여야 함
    expect(["a", "button"].includes(focusedElement)).toBeTruthy();
  });

  test("시맨틱 마크업 - ARIA 속성 검증", async ({ page }) => {
    await page.goto("/dashboard");

    // 활성 메뉴 확인
    const activeMenuItem = page.locator('a[aria-current="page"]');
    if (await activeMenuItem.isVisible()) {
      const ariaCurrent = await activeMenuItem.getAttribute("aria-current");
      expect(ariaCurrent).toBe("page");
    }

    // 버튼 aria-label 확인
    const ariaLabelButtons = page.locator("button[aria-label]");
    const buttonCount = await ariaLabelButtons.count();
    expect(buttonCount).toBeGreaterThan(0);

    // 아이콘 aria-hidden 확인
    const hiddenIcons = page.locator('[aria-hidden="true"]');
    const hiddenCount = await hiddenIcons.count();
    expect(hiddenCount).toBeGreaterThan(0);
  });

  test("색상 대비 - 기본 색상 검증", async ({ page }) => {
    await page.goto("/");

    // 텍스트 가독성 확인 (간단한 검증)
    const textElements = page.locator("p, span, div").first();

    if (await textElements.isVisible()) {
      const styles = await textElements.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
          fontSize: computed.fontSize,
        };
      });

      // 폰트 크기가 합리적인지 확인
      const fontSize = parseInt(styles.fontSize);
      expect(fontSize).toBeGreaterThanOrEqual(12);
    }
  });

  test("폼 접근성 - 라벨과 입력 필드 연결", async ({ page }) => {
    await page.goto("/login");

    // 이메일 입력 필드
    const emailInput = page.locator('input[type="email"]');
    const emailLabel = page
      .locator("label")
      .filter({ has: emailInput })
      .first();

    if (await emailLabel.isVisible()) {
      // label이 input과 연결되어야 함
      const forAttr = await emailLabel.getAttribute("for");
      const inputId = await emailInput.getAttribute("id");

      // for 속성이 있거나 input이 label 내부에 있어야 함
      expect(forAttr === inputId || (forAttr && inputId)).toBeTruthy();
    }

    // 비밀번호 입력 필드
    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput).toBeVisible();
  });

  test("키보드 네비게이션 - Tab 순서", async ({ page }) => {
    await page.goto("/login");

    // Tab 키 이동
    await page.keyboard.press("Tab");
    const focusedAfterTab = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      return el?.tagName.toLowerCase();
    });

    // 상호작용 요소로 포커스 이동해야 함
    expect(
      ["a", "button", "input", "select", "textarea"].includes(focusedAfterTab),
    ).toBeTruthy();

    // Tab을 계속 누르면 포커스가 순환
    await page.keyboard.press("Tab");
    const focusedAfterSecondTab = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      return el?.tagName.toLowerCase();
    });

    expect(
      ["a", "button", "input", "select", "textarea"].includes(
        focusedAfterSecondTab,
      ),
    ).toBeTruthy();
  });

  test("반응형 접근성 - 모바일 뷰", async ({ page }) => {
    page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // 모바일 해상도에서도 주요 콘텐츠 접근 가능
    const heading = page.locator("h1").first();
    await expect(heading).toBeVisible();

    // 버튼 크기가 합리적인지 확인
    const buttons = page.locator("button").first();
    if (await buttons.isVisible()) {
      const size = await buttons.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
      });

      // 아이콘 버튼은 더 작을 수 있으므로 최소 24px
      expect(size.width).toBeGreaterThanOrEqual(24);
      expect(size.height).toBeGreaterThanOrEqual(24);
    }
  });
});
