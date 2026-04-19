import { Quote } from '@/lib/types/quote';

interface QuoteSummaryProps {
  quote: Quote;
}

const TAX_RATE = 0.1;

export function QuoteSummary({ quote }: QuoteSummaryProps) {
  const subtotal = quote.items.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return (
    <div className="w-full border-t pt-6">
      <div className="space-y-2 ml-auto w-64">
        <div className="flex justify-between">
          <span className="text-gray-600">소계</span>
          <span className="font-medium">{subtotal.toLocaleString('ko-KR')}원</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">세금(10%)</span>
          <span className="font-medium">{tax.toLocaleString('ko-KR')}원</span>
        </div>
        <div className="flex justify-between border-t pt-2">
          <span className="font-bold">합계</span>
          <span className="text-xl font-bold">{total.toLocaleString('ko-KR')}원</span>
        </div>
      </div>
    </div>
  );
}
