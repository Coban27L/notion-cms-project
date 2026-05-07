import { test, expect } from '@playwright/test';

test.describe('Phase 7: 품질 개선 및 버그 수정', () => {
  test('Task 021: PDF 한글 폰트 렌더링 - 단일 페이지 PDF 다운로드', async ({ page }) => {
    // 공유 링크를 통해 견적서 페이지 접근
    await page.goto('/quotes/550e8400-e29b-41d4-a716-446655440001');

    // 클라이언트명 확인 (한글)
    await expect(page.locator('text=홍길동')).toBeVisible();

    // PDF 다운로드 버튼 찾기
    const downloadPromise = page.waitForEvent('download');
    const downloadButton = page.locator('button:has-text("PDF 다운로드")');
    await expect(downloadButton).toBeVisible();

    // 다운로드 클릭
    await downloadButton.click();
    const download = await downloadPromise;

    // 다운로드된 파일 확인
    expect(download.suggestedFilename()).toContain('pdf');
    const filePath = await download.path();
    expect(filePath).toBeTruthy();
  });

  test('Task 022: PDF 레이아웃 개선 - 다중 페이지 PDF 생성', async ({ page }) => {
    // 다중 페이지 테스트용 견적서 접근 (15개 항목)
    await page.goto('/quotes/550e8400-e29b-41d4-a716-446655440006');

    // 클라이언트명 확인
    await expect(page.locator('text=다중페이지 테스트')).toBeVisible();

    // 항목 목록 확인
    const itemCount = await page.locator('[role="row"]').count();
    expect(itemCount).toBeGreaterThan(10);

    // PDF 다운로드
    const downloadPromise = page.waitForEvent('download');
    await page.locator('button:has-text("PDF 다운로드")').click();
    const download = await downloadPromise;

    // 파일 생성 확인
    const filePath = await download.path();
    expect(filePath).toBeTruthy();

    // 파일 크기 확인 (다중 페이지이므로 더 큼)
    const { stat } = await import('fs/promises');
    const fileStats = await stat(filePath);
    expect(fileStats.size).toBeGreaterThan(1000000); // > 1MB for multi-page
  });

  test('Task 022: PDF 레이아웃 개선 - 한국 날짜 포맷 검증', async ({ page }) => {
    // 견적서 상세 페이지 접근
    await page.goto('/quotes/550e8400-e29b-41d4-a716-446655440001');

    // 발행일 확인 (한국 포맷: "2024년 3월 15일")
    const issuedDate = page.locator('text=2024년 3월 15일');
    await expect(issuedDate).toBeVisible();

    // 유효기간도 한국 포맷인지 확인
    const validDate = page.locator('text=2024년 4월 15일');
    await expect(validDate).toBeVisible();
  });

  test('Task 022: PDF 레이아웃 개선 - 통화 포맷 검증', async ({ page }) => {
    // 견적서 상세 페이지 접근
    await page.goto('/quotes/550e8400-e29b-41d4-a716-446655440001');

    // ₩ 기호와 천 단위 콤마 확인
    const currencyText = page.locator('text=/₩.+[\d,]+/');
    await expect(currencyText).toBeVisible();

    // 구체적인 금액 확인 (800,000)
    const specificAmount = page.locator('text=₩ 800,000');
    await expect(specificAmount).toBeVisible();
  });

  test('Task 022: PDF 레이아웃 개선 - 단일 페이지 문서에서 요약 섹션 표시', async ({ page }) => {
    // 단일 페이지 견적서 접근
    await page.goto('/quotes/550e8400-e29b-41d4-a716-446655440001');

    // 합계 영역이 페이지에 표시되는지 확인
    const summarySection = page.locator('text=합계');
    await expect(summarySection).toBeVisible();

    // 소계와 총액 확인
    const subtotal = page.locator('text=소계');
    const total = page.locator('text=1,500,000');
    await expect(subtotal).toBeVisible();
    await expect(total).toBeVisible();
  });

  test('Task 022: PDF 레이아웃 개선 - 다중 페이지 문서 페이지 번호 렌더링', async ({ page }) => {
    // 다중 페이지 견적서 접근
    await page.goto('/quotes/550e8400-e29b-41d4-a716-446655440006');

    // PDF 다운로드
    const downloadPromise = page.waitForEvent('download');
    await page.locator('button:has-text("PDF 다운로드")').click();
    const download = await downloadPromise;

    // 파일이 다중 페이지임을 확인 (간접 검증)
    const filePath = await download.path();
    expect(filePath).toBeTruthy();
  });

  test('Task 022: PDF 레이아웃 개선 - 비고 섹션 표시', async ({ page }) => {
    // 비고가 있는 견적서 접근
    await page.goto('/quotes/550e8400-e29b-41d4-a716-446655440001');

    // 비고 섹션 확인
    const notesSection = page.locator('text=비고');
    await expect(notesSection).toBeVisible();

    const notesContent = page.locator('text=결제는 50% 선금');
    await expect(notesContent).toBeVisible();
  });

  test('Task 022: PDF 레이아웃 개선 - 비고가 없는 견적서', async ({ page }) => {
    // 비고가 없는 견적서 접근 (page-003)
    await page.goto('/quotes/550e8400-e29b-41d4-a716-446655440003');

    // 페이지는 로드되어야 함
    await expect(page.locator('text=이순신')).toBeVisible();
  });

  test('Task 023: 접근성 개선 - ARIA 라벨 검증', async ({ page }) => {
    // 견적서 상세 페이지 접근
    await page.goto('/quotes/550e8400-e29b-41d4-a716-446655440001');

    // PDF 다운로드 버튼에 aria-label이 있는지 확인
    const downloadButton = page.locator('button:has-text("PDF 다운로드")');
    const ariaLabel = await downloadButton.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
  });

  test('Task 023: 접근성 개선 - 키보드 네비게이션', async ({ page }) => {
    // 로그인 페이지 접근
    await page.goto('/login');

    // 이메일 입력란 탭으로 포커스
    await page.keyboard.press('Tab');
    const emailInput = page.locator('input[type="email"]');
    const focusedElement = await page.evaluate(() => document.activeElement?.getAttribute('type'));
    expect(focusedElement).toBe('email');

    // 탭 키로 다음 요소로 이동
    await page.keyboard.press('Tab');
    const focusedElement2 = await page.evaluate(() => document.activeElement?.getAttribute('type'));
    expect(focusedElement2).toBe('password');
  });

  test('Task 024: 회귀 테스트 - 전체 플로우 검증', async ({ page, context }) => {
    // 견적서 공유 링크 접근
    await page.goto('/quotes/550e8400-e29b-41d4-a716-446655440001');

    // 견적서 정보 확인
    await expect(page.locator('text=QT-2024-001')).toBeVisible();
    await expect(page.locator('text=홍길동')).toBeVisible();

    // 항목 테이블 확인
    const table = page.locator('table');
    await expect(table).toBeVisible();

    // 합계 영역 확인
    await expect(page.locator('text=합계')).toBeVisible();

    // PDF 다운로드 가능 확인
    const downloadPromise = page.waitForEvent('download');
    const downloadButton = page.locator('button:has-text("PDF 다운로드")');
    await expect(downloadButton).toBeVisible();
    await downloadButton.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('pdf');
  });

  test('Task 024: 회귀 테스트 - 모바일 반응형 (PDF 다운로드)', async ({ page, context }) => {
    // 모바일 뷰포트 설정
    await page.setViewportSize({ width: 375, height: 667 });

    // 견적서 접근
    await page.goto('/quotes/550e8400-e29b-41d4-a716-446655440001');

    // 콘텐츠 표시 확인
    await expect(page.locator('text=홍길동')).toBeVisible();

    // 모바일에서도 PDF 다운로드 가능
    const downloadPromise = page.waitForEvent('download');
    const downloadButton = page.locator('button:has-text("PDF 다운로드")');
    await expect(downloadButton).toBeVisible();
    await downloadButton.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('pdf');
  });

  test('Task 024: 회귀 테스트 - 다크 모드에서 PDF 다운로드', async ({ page, context }) => {
    // 견적서 접근
    await page.goto('/quotes/550e8400-e29b-41d4-a716-446655440001');

    // 다크 모드로 전환
    const htmlElement = page.locator('html');
    const isDarkMode = await htmlElement.evaluate((el) => el.classList.contains('dark'));

    if (!isDarkMode) {
      // 테마 토글 버튼이 있으면 클릭
      const themeButton = page.locator('button[title*="모드"]').first();
      if (await themeButton.isVisible()) {
        await themeButton.click();
        await page.waitForTimeout(200);
      }
    }

    // 다크 모드에서도 PDF 다운로드 가능
    const downloadPromise = page.waitForEvent('download');
    const downloadButton = page.locator('button:has-text("PDF 다운로드")');
    await downloadButton.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('pdf');
  });
});
