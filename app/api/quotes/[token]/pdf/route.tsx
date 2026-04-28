import { pdf } from '@react-pdf/renderer';
import { QuoteDocument } from '@/components/pdf/quote-document';
import { getQuoteByToken } from '@/lib/notion/queries';
import { notFound } from 'next/navigation';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  try {
    console.log(`[API] PDF 생성 시작 - token: ${token}`);

    // 견적서 데이터 조회
    const quote = await getQuoteByToken(token);
    if (!quote) {
      console.warn(`[API] 견적서를 찾을 수 없음 - token: ${token}`);
      return notFound();
    }

    console.log(`[API] 견적서 조회 성공: ${quote.title}`);

    // PDF 생성
    console.log(`[API] PDF 생성 중...`);
    const pdfInstance = pdf(<QuoteDocument quote={quote} />);
    const buffer = await pdfInstance.toBuffer();

    console.log(`[API] PDF 생성 완료 - 크기: ${buffer.length}bytes`);

    // 파일명 생성
    const issuedDate = quote.issuedDate
      ? new Date(quote.issuedDate).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];
    const sanitizedClientName = quote.clientName.replace(/[^가-힣a-zA-Z0-9_-]/g, '');
    const filename = `QT-${issuedDate}-${quote.id}_${sanitizedClientName}.pdf`;

    return new Response(buffer, {
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
