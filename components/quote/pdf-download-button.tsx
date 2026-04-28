'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Quote } from '@/lib/types/quote';
import { generateAndDownloadPDF } from '@/lib/utils/pdf-download';
import {
  showDownloadStart,
  showDownloadSuccess,
  showDownloadError,
} from '@/lib/utils/toast-notifications';

interface PDFDownloadButtonProps {
  quote: Quote;
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function PDFDownloadButton({ quote, size = 'default' }: PDFDownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    if (isLoading) return;

    setIsLoading(true);
    showDownloadStart();

    try {
      await generateAndDownloadPDF(quote);
      showDownloadSuccess(`QT-${quote.id}_${quote.clientName}.pdf`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'PDF 생성에 실패했습니다';
      showDownloadError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isLoading}
      size={size}
      className="w-full sm:w-auto gap-2"
      aria-label={isLoading ? 'PDF 생성 중...' : 'PDF 다운로드'}
    >
      <Download className="h-4 w-4" />
      {isLoading ? 'PDF 생성 중...' : 'PDF 다운로드'}
    </Button>
  );
}
