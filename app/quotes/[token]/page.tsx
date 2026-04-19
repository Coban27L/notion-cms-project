import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BuildingIcon, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { QuoteHeader } from '@/components/quote/quote-header';
import { QuoteItemsTable } from '@/components/quote/quote-items-table';
import { QuoteSummary } from '@/components/quote/quote-summary';
import { ShareLinkButton } from '@/components/quote/share-link-button';
import { generateMockQuotes, getMockQuoteByToken } from '@/lib/mock/quotes';

export async function generateStaticParams() {
  const quotes = generateMockQuotes();
  return quotes.map((q) => ({ token: q.shareToken }));
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
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              돌아가기
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">견적서 조회</h1>
          <p className="text-muted-foreground mt-1">견적서의 상세 내용을 확인하실 수 있습니다.</p>
        </div>

        <div className="space-y-6">
          <QuoteHeader quote={quote} />

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

          <div className="bg-white dark:bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold mb-4">견적 항목</h3>
            <QuoteItemsTable quote={quote} />
          </div>

          <div className="bg-white dark:bg-card rounded-xl border border-border p-6">
            <QuoteSummary quote={quote} />
          </div>

          {quote.notes && (
            <div className="bg-white dark:bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold mb-2">비고</h3>
              <p className="text-sm text-muted-foreground">{quote.notes}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <ShareLinkButton token={quote.shareToken} />
            <Button className="flex-1">PDF 다운로드</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
