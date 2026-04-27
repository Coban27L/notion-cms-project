import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Quote } from '@/lib/types/quote';
import { formatSGD } from '@/lib/utils/currency';
import { EmptyItemsState } from './empty-items-state';
import { QuoteItemCard } from './quote-item-card';

interface QuoteItemsTableProps {
  quote: Quote;
}

/**
 * 견적 항목 테이블 컴포넌트 (반응형)
 * - 모바일(~639px): QuoteItemCard 기반 세로 카드 레이아웃
 * - 태블릿/데스크톱(640px+): 4열 테이블 레이아웃
 * - 통화: 싱가포르 달러 (S$) - lib/utils/currency.ts 공유 유틸 사용
 * - 소계는 QuoteSummary 컴포넌트에서 표시 (중복 방지)
 * - 항목 없을 때 EmptyItemsState 컴포넌트 표시
 */
export function QuoteItemsTable({ quote }: QuoteItemsTableProps) {
  /* 항목이 없을 때 분리된 EmptyItemsState 컴포넌트 사용 */
  if (!quote.items || quote.items.length === 0) {
    return <EmptyItemsState />;
  }

  return (
    <>
      {/* 모바일: 카드 레이아웃 (640px 미만) */}
      <div className="flex flex-col gap-3 sm:hidden" role="list" aria-label="견적 항목 목록">
        {quote.items.map((item, index) => (
          <div key={index} role="listitem">
            <QuoteItemCard item={item} index={index} />
          </div>
        ))}
      </div>

      {/* 태블릿/데스크톱: 테이블 레이아웃 (640px 이상) */}
      <div className="hidden sm:block w-full overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-[40%] pl-4">품목</TableHead>
              <TableHead className="text-right w-[15%]">수량</TableHead>
              <TableHead className="text-right w-[20%]">단가</TableHead>
              <TableHead className="text-right w-[25%] pr-4">금액</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quote.items.map((item, index) => (
              <TableRow
                key={index}
                className="transition-colors duration-150 hover:bg-muted/30"
              >
                {/* 품목명 */}
                <TableCell className="pl-4 font-medium">{item.name}</TableCell>
                {/* 수량 */}
                <TableCell className="text-right text-muted-foreground tabular-nums">
                  {item.quantity.toLocaleString('en-SG')}
                </TableCell>
                {/* 단가 */}
                <TableCell className="text-right text-muted-foreground tabular-nums">
                  {formatSGD(item.unitPrice)}
                </TableCell>
                {/* 금액 */}
                <TableCell className="text-right font-semibold pr-4 tabular-nums">
                  {formatSGD(item.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* 소계는 QuoteSummary 컴포넌트에서 표시하므로 TableFooter 제거 (중복 방지) */}
        </Table>
      </div>
    </>
  );
}
