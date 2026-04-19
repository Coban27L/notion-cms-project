import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Quote } from '@/lib/types/quote';

interface QuoteItemsTableProps {
  quote: Quote;
}

export function QuoteItemsTable({ quote }: QuoteItemsTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-2/5">품목</TableHead>
            <TableHead className="text-right w-1/5">수량</TableHead>
            <TableHead className="text-right w-1/5">단가</TableHead>
            <TableHead className="text-right w-1/5">금액</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quote.items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell className="text-right">{item.quantity}</TableCell>
              <TableCell className="text-right">{item.unitPrice.toLocaleString('ko-KR')}원</TableCell>
              <TableCell className="text-right font-medium">
                {item.amount.toLocaleString('ko-KR')}원
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
