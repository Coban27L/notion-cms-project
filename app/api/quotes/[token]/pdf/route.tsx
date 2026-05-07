import { getQuoteByToken } from '@/lib/notion/queries';
import { getMockQuoteByToken } from '@/lib/mock/quotes';
import puppeteer from 'puppeteer';

let browserInstance: any = null;

async function getBrowser() {
  if (browserInstance) {
    return browserInstance;
  }
  browserInstance = await puppeteer.launch({
    headless: true,
  });
  return browserInstance;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  try {
    console.log(`[PDF] PDF 생성 시작 - token: ${token}`);

    // 견적서 데이터 존재 확인
    let quote = await getQuoteByToken(token);
    if (!quote) {
      console.warn(`[PDF] Notion에서 찾을 수 없음, mock 데이터 시도`);
      const mockQuote = getMockQuoteByToken(token);
      if (mockQuote) {
        quote = mockQuote;
        console.log(`[PDF] Mock 데이터 사용: ${mockQuote.title}`);
      } else {
        return new Response('견적서를 찾을 수 없습니다.', { status: 404 });
      }
    }

    // Puppeteer로 PDF 생성
    const browser = await getBrowser();
    const page = await browser.newPage();

    // 페이지 방문
    const pageUrl = `${request.url.split('/api/')[0]}/quotes/${token}`;
    console.log(`[PDF] 페이지 로드 중: ${pageUrl}`);

    await page.goto(pageUrl, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    // PDF 생성 (Tailwind CSS 포함 렌더링)
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm',
      },
      printBackground: true,
    });

    await page.close();

    console.log(`[PDF] PDF 생성 완료 - 크기: ${pdfBuffer.length}bytes`);

    // 파일명 생성
    const issuedDate = quote.issuedDate
      ? new Date(quote.issuedDate).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];

    const sanitizedClientName = quote.clientName.replace(/[^a-zA-Z0-9_-]/g, '') || 'quote';
    const asciiFilename = `QT-${issuedDate}-${quote.id}_${sanitizedClientName}.pdf`;
    const encodedClientName = encodeURIComponent(quote.clientName);
    const rfc5987Filename = `QT-${issuedDate}-${quote.id}_${encodedClientName}.pdf`;

    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${asciiFilename}"; filename*=UTF-8''${rfc5987Filename}`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[PDF] PDF 생성 실패:', errorMessage);
    console.error('[PDF] 전체 에러:', error);
    return new Response(`PDF 생성에 실패했습니다: ${errorMessage}`, { status: 500 });
  }
}
