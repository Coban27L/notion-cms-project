'use client';

import { pdf } from '@react-pdf/renderer';
import { QuoteDocument } from '@/components/pdf/quote-document';
import { Quote } from '@/lib/types/quote';

export async function generateAndDownloadPDF(quote: Quote): Promise<void> {
  try {
    // 파일명 생성: QT-발행일-견적번호_클라이언트명.pdf
    const issuedDate = quote.issuedDate
      ? new Date(quote.issuedDate).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];

    const sanitizedClientName = quote.clientName.replace(/[^가-힣a-zA-Z0-9_-]/g, '');
    const filename = `QT-${issuedDate}-${quote.id}_${sanitizedClientName}.pdf`;

    // PDF 문서 생성
    const pdfInstance = pdf(<QuoteDocument quote={quote} />);

    // Blob으로 변환
    const blob = await pdfInstance.toBlob();

    // 다운로드 링크 생성 및 클릭
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return undefined;
  } catch (error) {
    console.error('PDF 생성 실패:', error);
    throw new Error('PDF 생성에 실패했습니다. 다시 시도해주세요.');
  }
}
