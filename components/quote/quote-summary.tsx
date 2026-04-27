import { Separator } from '@/components/ui/separator';
import { Quote } from '@/lib/types/quote';
import { formatSGD } from '@/lib/utils/currency';

interface QuoteSummaryProps {
  quote: Quote;
}

/** 싱가포르 GST 세율 9% */
const TAX_RATE = 0.09;

/**
 * 견적서 합계 요약 컴포넌트
 * - 소계, GST 세금(9%), 합계 표시
 * - 통화: 싱가포르 달러 (S$)
 * - 싱가포르 GST 9% 적용
 */
export function QuoteSummary({ quote }: QuoteSummaryProps) {
  const subtotal = (quote.items || []).reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return (
    <div className="flex justify-end">
      <div className="w-full max-w-xs space-y-3">
        {/* 소계 */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">소계</span>
          <span className="font-medium tabular-nums">{formatSGD(subtotal)}</span>
        </div>
        {/* GST 세금 */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">GST (9%)</span>
          <span className="font-medium tabular-nums">{formatSGD(tax)}</span>
        </div>

        <Separator />

        {/* 최종 합계 */}
        <div className="flex items-center justify-between">
          <span className="font-semibold">합계</span>
          <span className="text-xl font-bold tabular-nums text-primary">
            {formatSGD(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
