import { FileTextIcon } from 'lucide-react';
import { QuoteItem } from '@/lib/types/quote';

interface QuoteItemsTableProps {
  items: QuoteItem[];
}

function formatCurrency(amount: number) {
  return `₩${amount.toLocaleString('ko-KR')}`;
}

export function QuoteItemsTable({ items }: QuoteItemsTableProps) {
  return (
    <div className="bg-white rounded-xl border border-border p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileTextIcon className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-semibold">견적 항목</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-muted-foreground font-medium">항목명</th>
              <th className="text-right py-2 text-muted-foreground font-medium">수량</th>
              <th className="text-right py-2 text-muted-foreground font-medium">단가</th>
              <th className="text-right py-2 text-muted-foreground font-medium">금액</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-border last:border-0">
                <td className="py-3">{item.name}</td>
                <td className="py-3 text-right">{item.quantity}</td>
                <td className="py-3 text-right">{formatCurrency(item.unitPrice)}</td>
                <td className="py-3 text-right font-medium">{formatCurrency(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
