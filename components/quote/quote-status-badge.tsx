import { Badge } from '@/components/ui/badge';
import { QuoteStatus } from '@/lib/types/quote';

interface QuoteStatusBadgeProps {
  status: QuoteStatus;
}

export function QuoteStatusBadge({ status }: QuoteStatusBadgeProps) {
  const variants: Record<QuoteStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    '발행': 'default',
    '승인': 'secondary',
    '취소': 'destructive',
  };

  const labels: Record<QuoteStatus, string> = {
    '발행': '발행',
    '승인': '승인',
    '취소': '취소',
  };

  return <Badge variant={variants[status]}>{labels[status]}</Badge>;
}
