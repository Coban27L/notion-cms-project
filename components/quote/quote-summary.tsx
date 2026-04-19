import { DollarSignIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface QuoteSummaryProps {
  totalAmount: number;
  itemCount: number;
}

function formatCurrency(amount: number) {
  return `₩${amount.toLocaleString('ko-KR')}`;
}

export function QuoteSummary({ totalAmount, itemCount }: QuoteSummaryProps) {
  return (
    <div className="bg-white rounded-xl border border-border p-6">
      <div className="flex items-center gap-2 mb-4">
        <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-semibold">총액</h3>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">총 견적 금액</p>
          <p className="text-4xl font-bold">{formatCurrency(totalAmount)}</p>
        </div>
        <Badge variant="secondary" className="text-sm px-3 py-1">
          총 항목 {itemCount}개
        </Badge>
      </div>
    </div>
  );
}
