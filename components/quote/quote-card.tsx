import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Quote } from '@/lib/types/quote';
import { QuoteStatusBadge } from './quote-status-badge';
import Link from 'next/link';

interface QuoteCardProps {
  quote: Quote;
  interactive?: boolean;
}

export function QuoteCard({ quote, interactive = true }: QuoteCardProps) {
  const content = (
    <Card className={interactive ? 'hover:shadow-lg transition-shadow cursor-pointer' : ''}>
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div>
            <CardTitle className="text-lg">{quote.title}</CardTitle>
            <p className="text-sm text-gray-600 mt-2">{quote.clientName}</p>
          </div>
          <QuoteStatusBadge status={quote.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">발행일</p>
            <p className="font-medium">{new Date(quote.issuedDate).toLocaleDateString('ko-KR')}</p>
          </div>
          <div>
            <p className="text-gray-600">유효기간</p>
            <p className="font-medium">{new Date(quote.validUntil).toLocaleDateString('ko-KR')}</p>
          </div>
        </div>
        <div>
          <p className="text-gray-600 text-sm mb-1">총액</p>
          <p className="text-2xl font-bold text-blue-600">
            {quote.totalAmount.toLocaleString('ko-KR')}원
          </p>
        </div>
      </CardContent>
    </Card>
  );

  if (interactive) {
    return <Link href={`/quotes/${quote.shareToken}`}>{content}</Link>;
  }

  return content;
}
