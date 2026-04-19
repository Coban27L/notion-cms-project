import { Badge } from '@/components/ui/badge';
import { QuoteStatus } from '@/lib/types/quote';

interface QuoteStatusBadgeProps {
  status: QuoteStatus;
}

const statusConfig: Record<QuoteStatus, { label: string; className: string }> = {
  발행: { label: '발행', className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' },
  승인: { label: '승인', className: 'bg-green-100 text-green-800 hover:bg-green-100' },
  취소: { label: '취소', className: 'bg-red-100 text-red-800 hover:bg-red-100' },
};

export function QuoteStatusBadge({ status }: QuoteStatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge className={config.className} variant="secondary">
      {config.label}
    </Badge>
  );
}
