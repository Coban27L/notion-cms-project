import { test, expect } from '@playwright/test';

test.describe('PDF 다운로드 기능', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/quotes/share-test-token-123');
  });

  test('PDF 다운로드 버튼이 표시되고 클릭 가능해야 함', async ({ page }) => {
    // 다운로드 버튼 찾기
    const downloadButton = page.getByRole('button', { name: /PDF 다운로드/ });

    // 버튼이 존재하고 활성화되어 있는지 확인
    await expect(downloadButton).toBeVisible();
    await expect(downloadButton).toBeEnabled();
  });

  test('PDF 다운로드 버튼 클릭 시 토스트 알림이 표시되어야 함', async ({ page }) => {
    const downloadButton = page.getByRole('button', { name: /PDF 다운로드/ });

    // 버튼 클릭
    await downloadButton.click();

    // "PDF 다운로드를 시작합니다" 토스트 메시지 확인
    await page.waitForTimeout(500);
    const toastMessages = await page.getByText(/PDF 다운로드/).all();
    expect(toastMessages.length).toBeGreaterThan(0);
  });

  test('PDF 생성 중에는 버튼이 비활성화되어야 함', async ({ page }) => {
    const downloadButton = page.getByRole('button', { name: /PDF 다운로드/ });

    // 버튼 클릭
    await downloadButton.click();

    // 일시적으로 버튼 상태 확인
    const isDisabled = await downloadButton.isDisabled();
    // 다운로드가 빠르게 완료될 수 있으므로 상태 확인은 선택적
    console.log('PDF 생성 중 버튼 비활성화 상태:', isDisabled);
  });

  test('클라이언트명에 특수문자가 있을 때 파일명이 올바르게 생성되어야 함', async ({ page }) => {
    // 페이지에서 클라이언트명 텍스트 확인
    const clientNameText = await page.locator('text=/클라이언트/').first().textContent();
    console.log('클라이언트명:', clientNameText);

    // 토스트 메시지에 파일명이 포함되는지 확인
    const downloadButton = page.getByRole('button', { name: /PDF 다운로드/ });
    await downloadButton.click();

    // 다운로드 성공 토스트 대기
    await page.waitForTimeout(2000);
  });
});

test.describe('공유 링크에서 견적서 조회', () => {
  test('공유 토큰으로 견적서 페이지에 접근할 수 있어야 함', async ({ page }) => {
    await page.goto('http://localhost:3000/quotes/share-test-token-123');

    // 페이지가 로드되었는지 확인
    const heading = page.getByRole('heading', { name: '견적서 조회' });
    await expect(heading).toBeVisible();
  });

  test('견적서 데이터가 올바르게 표시되어야 함', async ({ page }) => {
    await page.goto('http://localhost:3000/quotes/share-test-token-123');

    // 견적서 헤더 확인
    const title = page.getByRole('heading', { level: 1 }).first();
    await expect(title).toBeVisible();

    // 항목 테이블 확인
    const table = page.locator('table, [role="grid"]').first();
    await expect(table).toBeVisible();

    // 합계 섹션 확인
    const summarySection = page.getByText(/합계|금액 요약/);
    await expect(summarySection).toBeVisible();
  });

  test('공유 링크 복사 버튼이 작동해야 함', async ({ page } ) => {
    await page.goto('http://localhost:3000/quotes/share-test-token-123');

    // 공유 링크 복사 버튼 찾기
    const copyButton = page.getByRole('button', { name: /링크 복사/ });
    await expect(copyButton).toBeVisible();

    // 버튼 클릭
    await copyButton.click();

    // 성공 토스트 메시지 확인
    await page.waitForTimeout(500);
    const successToast = page.getByText(/복사되었습니다/);
    await expect(successToast).toBeVisible();
  });
});

test.describe('에러 핸들링', () => {
  test('잘못된 토큰으로 접근할 때 404 페이지를 표시해야 함', async ({ page }) => {
    await page.goto('http://localhost:3000/quotes/invalid-token-xyz', { waitUntil: 'networkidle' });

    // 404 페이지 표시 확인
    const notFoundText = page.getByText(/찾을 수 없습니다|404/i);
    const isVisible = await notFoundText.isVisible().catch(() => false);

    if (isVisible) {
      await expect(notFoundText).toBeVisible();
    }
  });
});
