import { PackageSearch } from 'lucide-react';

/**
 * 견적 항목 테이블 전용 빈 상태 컴포넌트
 * - QuoteItemsTable에서 분리된 독립 컴포넌트
 * - 항목이 0개일 때 아이콘 + 설명 표시
 * - 다크모드: bg-muted/text-muted-foreground CSS 변수 자동 지원
 */
export function EmptyItemsState() {
  return (
    <div
      className="flex flex-col items-center justify-center py-12 gap-3"
      role="status"
      aria-label="견적 항목 없음"
    >
      {/* 아이콘 컨테이너 */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <PackageSearch
          className="h-6 w-6 text-muted-foreground"
          aria-hidden="true"
        />
      </div>

      {/* 텍스트 영역 */}
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">
          견적 항목이 없습니다
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          노션 DB에서 항목을 추가하면 여기에 표시됩니다.
        </p>
      </div>
    </div>
  );
}
