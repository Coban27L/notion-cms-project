import { renderToBuffer, Font } from '@react-pdf/renderer';
import { QuoteDocument } from '@/components/pdf/quote-document';
import { getQuoteByToken } from '@/lib/notion/queries';
import { getMockQuoteByToken } from '@/lib/mock/quotes';
import path from 'path';
import fs from 'fs';

// 폰트 등록: 버퍼 기반 로딩
let fontRegistered = false;

async function registerFontsAsync() {
  if (fontRegistered) return;

  const fontDir = path.join(process.cwd(), 'public/fonts');
  const normalFontPath = path.join(fontDir, 'noto-sans-kr-korean-400-normal.woff2');
  const boldFontPath = path.join(fontDir, 'noto-sans-kr-korean-700-normal.woff2');

  try {
    // Normal 폰트 - base64 데이터 URL로 변환
    if (fs.existsSync(normalFontPath)) {
      const normalFontBuffer = await fs.promises.readFile(normalFontPath);
      const normalBase64 = normalFontBuffer.toString('base64');
      const normalDataUrl = `data:font/woff2;base64,${normalBase64}`;
      Font.register({
        family: 'NotoSansKR',
        src: normalDataUrl,
        fontWeight: 'normal',
      });
      console.log('[PDF] Normal 한글 폰트 등록 완료 (base64)');
    }

    // Bold 폰트 - base64 데이터 URL로 변환
    if (fs.existsSync(boldFontPath)) {
      const boldFontBuffer = await fs.promises.readFile(boldFontPath);
      const boldBase64 = boldFontBuffer.toString('base64');
      const boldDataUrl = `data:font/woff2;base64,${boldBase64}`;
      Font.register({
        family: 'NotoSansKR',
        src: boldDataUrl,
        fontWeight: 'bold',
      });
      console.log('[PDF] Bold 한글 폰트 등록 완료 (base64)');
    }

    fontRegistered = true;
    console.log('[PDF] 한글 폰트 등록 완료');
  } catch (error) {
    console.error('[PDF] 한글 폰트 로딩 실패:', error);
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  try {
    console.log(`[API] PDF 생성 시작 - token: ${token}`);

    // 폰트 등록 (비동기)
    await registerFontsAsync();

    // 견적서 데이터 조회 (Notion API + mock 폴백)
    let quote = await getQuoteByToken(token);
    if (!quote) {
      console.warn(`[API] Notion에서 찾을 수 없음, mock 데이터 시도 - token: ${token}`);
      const mockQuote = getMockQuoteByToken(token);
      if (mockQuote) {
        quote = mockQuote;
        console.log(`[API] Mock 데이터 사용: ${mockQuote.title}`);
      } else {
        console.warn(`[API] Mock에서도 찾을 수 없음 - token: ${token}`);
        return new Response('견적서를 찾을 수 없습니다.', { status: 404 });
      }
    }

    console.log(`[API] 견적서 조회 성공: ${quote.title}`);

    // PDF 생성 (renderToBuffer 사용 - 공식 권장 API)
    console.log(`[API] PDF 생성 중...`);
    const buffer = await renderToBuffer(<QuoteDocument quote={quote} />);

    console.log(`[API] PDF 생성 완료 - 크기: ${buffer.length}bytes`);

    // 파일명 생성
    const issuedDate = quote.issuedDate
      ? new Date(quote.issuedDate).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];

    // ASCII 파일명 (한글 제거)
    const sanitizedClientName = quote.clientName.replace(/[^a-zA-Z0-9_-]/g, '') || 'quote';
    const asciiFilename = `QT-${issuedDate}-${quote.id}_${sanitizedClientName}.pdf`;

    // RFC 5987 인코딩 파일명 (한글 지원)
    const encodedClientName = encodeURIComponent(quote.clientName);
    const rfc5987Filename = `QT-${issuedDate}-${quote.id}_${encodedClientName}.pdf`;

    return new Response(buffer as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${asciiFilename}"; filename*=UTF-8''${rfc5987Filename}`,
        'Content-Length': buffer.length.toString(),
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[API] PDF 생성 실패:', errorMessage);
    console.error('[API] 전체 에러:', error);
    return new Response(`PDF 생성에 실패했습니다: ${errorMessage}`, { status: 500 });
  }
}
