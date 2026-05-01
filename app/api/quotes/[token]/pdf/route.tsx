import { renderToBuffer, Font } from '@react-pdf/renderer';
import { QuoteDocument } from '@/components/pdf/quote-document';
import { getQuoteByToken } from '@/lib/notion/queries';
import { getMockQuoteByToken } from '@/lib/mock/quotes';
import path from 'path';
import fs from 'fs';

// 폰트 등록: 모듈 로드 시 한 번만 실행
function registerFonts() {
  const fontDir = path.join(process.cwd(), 'public/fonts');
  const normalFontPath = path.join(fontDir, 'noto-sans-kr-korean-400-normal.woff2');
  const boldFontPath = path.join(fontDir, 'noto-sans-kr-korean-700-normal.woff2');

  try {
    if (fs.existsSync(normalFontPath)) {
      Font.register({
        family: 'NotoSansKR',
        src: normalFontPath,
        fontWeight: 'normal',
      });
    }
    if (fs.existsSync(boldFontPath)) {
      Font.register({
        family: 'NotoSansKR',
        src: boldFontPath,
        fontWeight: 'bold',
      });
    }
    console.log('[PDF] 한글 폰트 등록 완료');
  } catch (error) {
    console.warn('[PDF] 한글 폰트 로딩 실패:', error);
  }
}

registerFonts();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  try {
    console.log(`[API] PDF 생성 시작 - token: ${token}`);

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
    const sanitizedClientName = quote.clientName.replace(/[^가-힣a-zA-Z0-9_-]/g, '');
    const filename = `QT-${issuedDate}-${quote.id}_${sanitizedClientName}.pdf`;

    return new Response(buffer as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
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
