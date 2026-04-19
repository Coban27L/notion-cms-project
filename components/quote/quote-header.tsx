import { CalendarIcon, ClockIcon } from 'lucide-react';
import { Quote } from '@/lib/types/quote';
import { QuoteStatusBadge } from './quote-status-badge';

interface QuoteHeaderProps {
  quote: Quote;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function QuoteHeader({ quote }: QuoteHeaderProps) {
  return (
    <div className="bg-white rounded-xl border border-border p-6">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-2xl font-bold">{quote.title}</h2>
        <QuoteStatusBadge status={quote.status} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarIcon className="h-4 w-4" />
          <div>
            <p className="text-xs">발행일</p>
            <p className="text-foreground font-medium">{formatDate(quote.issuedDate)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ClockIcon className="h-4 w-4" />
          <div>
            <p className="text-xs">유효기간</p>
            <p className="text-foreground font-medium">{formatDate(quote.validUntil)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
