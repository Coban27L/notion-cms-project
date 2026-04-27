import { QuoteItem } from '@/lib/types/quote';
import { formatSGD } from '@/lib/utils/currency';

interface QuoteItemCardProps {
  item: QuoteItem;
  index: number;
}

/**
 * 견적 항목 모바일 카드 컴포넌트
 * - QuoteItemsTable의 모바일 대체 뷰
 * - 각 항목을 카드 형태로 세로 나열 (1열 레이아웃)
 * - 품목명, 수량, 단가, 금액을 2열 그리드로 표시
 */
export function QuoteItemCard({ item, index }: QuoteItemCardProps) {
  return (
    <div
      className="rounded-lg border border-border bg-muted/20 p-4"
      role="article"
      aria-label={`항목 ${index + 1}: ${item.name}`}
    >
      {/* 항목 번호 + 품목명 */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground"
            aria-hidden="true"
          >
            {index + 1}
          </span>
          <p className="font-medium text-sm text-foreground leading-snug">
            {item.name}
          </p>
        </div>
        {/* 금액 (우측 상단 강조) */}
        <p className="text-sm font-bold text-primary tabular-nums shrink-0">
          {formatSGD(item.amount)}
        </p>
      </div>

      {/* 수량 × 단가 상세 */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <p className="text-muted-foreground mb-0.5">수량</p>
          <p className="font-medium tabular-nums">
            {item.quantity.toLocaleString('en-SG')}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground mb-0.5">단가</p>
          <p className="font-medium tabular-nums">{formatSGD(item.unitPrice)}</p>
        </div>
      </div>
    </div>
  );
}
