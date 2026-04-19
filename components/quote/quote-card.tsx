import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Quote } from '@/lib/types/quote';
import { QuoteStatusBadge } from './quote-status-badge';

interface QuoteCardProps {
  quote: Quote;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatCurrency(amount: number) {
  return `₩${amount.toLocaleString('ko-KR')}`;
}

export function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-base">{quote.title}</span>
          <QuoteStatusBadge status={quote.status} />
        </div>
        <p className="text-sm text-muted-foreground">{quote.clientName}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-6 text-sm text-muted-foreground">
          <span>발행일: {formatDate(quote.issuedDate)}</span>
          <span>유효기간: {formatDate(quote.validUntil)}</span>
        </div>
        <p className="text-xl font-semibold">{formatCurrency(quote.totalAmount)}</p>
        <div className="flex gap-2 pt-1">
          <Link href={`/quotes/${quote.shareToken}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              상세보기
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
