'use client';

import { Quote } from '@/lib/types/quote';

export async function generateAndDownloadPDF(quote: Quote): Promise<void> {
  try {
    // API 라우트에서 PDF 다운로드
    const response = await fetch(`/api/quotes/${quote.shareToken}/pdf`);

    if (!response.ok) {
      throw new Error('PDF 생성에 실패했습니다');
    }

    // 파일명 생성: QT-발행일-견적번호_클라이언트명.pdf
    const issuedDate = quote.issuedDate
      ? new Date(quote.issuedDate).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];

    const sanitizedClientName = quote.clientName.replace(/[^가-힣a-zA-Z0-9_-]/g, '');
    const filename = `QT-${issuedDate}-${quote.id}_${sanitizedClientName}.pdf`;

    // Blob으로 변환
    const blob = await response.blob();

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
    console.error('PDF 다운로드 실패:', error);
    throw new Error('PDF 다운로드에 실패했습니다. 다시 시도해주세요.');
  }
}
