import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BuildingIcon } from 'lucide-react';
import { QuoteHeader } from '@/components/quote/quote-header';
import { QuoteItemsTable } from '@/components/quote/quote-items-table';
import { QuoteSummary } from '@/components/quote/quote-summary';
import { ShareLinkButton } from '@/components/quote/share-link-button';
import { getMockQuoteByToken } from '@/lib/mock/quotes';

export async function generateStaticParams() {
  const { mockQuotes } = await import('@/lib/mock/quotes');
  return mockQuotes.map((q) => ({ token: q.shareToken }));
}

interface QuotePageProps {
  params: Promise<{ token: string }>;
}

export async function generateMetadata({ params }: QuotePageProps): Promise<Metadata> {
  const { token } = await params;
  const quote = getMockQuoteByToken(token);
  if (!quote) return { title: '견적서를 찾을 수 없습니다' };

  return {
    title: `견적서 ${quote.title}`,
    description: `${quote.clientName} 견적서`,
  };
}

export default async function QuotePage({ params }: QuotePageProps) {
  const { token } = await params;
  const quote = getMockQuoteByToken(token);

  if (!quote) notFound();

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* 페이지 제목 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">견적서 조회</h1>
          <p className="text-muted-foreground mt-1">견적서의 상세 내용을 확인하실 수 있습니다.</p>
        </div>

        <div className="space-y-4">
          {/* 1. 견적서 헤더 */}
          <QuoteHeader quote={quote} />

          {/* 2. 클라이언트 정보 */}
          <div className="bg-white dark:bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <BuildingIcon className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold">클라이언트 정보</h3>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">회사명</p>
              <p className="text-lg font-semibold">{quote.clientName}</p>
            </div>
          </div>

          {/* 3. 견적 항목 */}
          <QuoteItemsTable items={quote.items} />

          {/* 4. 총액 */}
          <QuoteSummary totalAmount={quote.totalAmount} itemCount={quote.items.length} />

          {/* 5. 비고 */}
          {quote.notes && (
            <div className="bg-white dark:bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold mb-2">비고</h3>
              <p className="text-sm text-muted-foreground">{quote.notes}</p>
            </div>
          )}

          {/* 액션 버튼 */}
          <div className="flex gap-3 pt-2">
            <ShareLinkButton token={quote.shareToken} />
            <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
              PDF 다운로드
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
