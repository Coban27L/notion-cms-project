import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

/**
 * 견적서 상세 페이지 스켈레톤 컴포넌트
 * - 노션 API 로딩 중 표시되는 플레이스홀더
 * - QuoteHeader, QuoteItemsTable, QuoteSummary 구조와 동일한 레이아웃
 * - animate-pulse + bg-muted 기반으로 다크모드 자동 지원
 */
export function QuoteDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* 헤더 스켈레톤 */}
      <QuoteHeaderSkeleton />

      {/* 견적 항목 테이블 스켈레톤 */}
      <div className="rounded-xl border border-border bg-card p-6">
        {/* 섹션 제목 */}
        <Skeleton className="h-5 w-24 mb-4" />
        <QuoteItemsTableSkeleton />
      </div>

      {/* 합계 요약 스켈레톤 */}
      <div className="rounded-xl border border-border bg-card p-6">
        {/* 섹션 제목 */}
        <Skeleton className="h-5 w-20 mb-4" />
        <QuoteSummarySkeleton />
      </div>

      {/* 액션 버튼 영역 스켈레톤 */}
      <Separator />
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        {/* 안내 문구 */}
        <Skeleton className="h-4 w-48" />
        {/* 버튼 그룹 */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Skeleton className="h-9 w-full sm:w-28" />
          <Skeleton className="h-9 w-full sm:w-32" />
        </div>
      </div>
    </div>
  );
}

/**
 * 견적서 헤더 영역 스켈레톤
 * - 견적서 번호, 상태 배지, 클라이언트/발행일/유효기간 그리드
 */
export function QuoteHeaderSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 md:p-8">
      {/* 견적서 번호 + 상태 배지 행 */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          {/* 아이콘 원형 */}
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div className="space-y-2">
            {/* "견적서 번호" 라벨 */}
            <Skeleton className="h-3 w-16" />
            {/* 견적서 제목 */}
            <Skeleton className="h-7 w-40" />
          </div>
        </div>
        {/* 상태 배지 */}
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>

      <Separator className="mb-6" />

      {/* 발행 정보 그리드 (클라이언트, 발행일, 유효기간) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            {/* 아이콘 박스 */}
            <Skeleton className="h-8 w-8 rounded-md shrink-0" />
            <div className="space-y-2 flex-1">
              {/* 라벨 */}
              <Skeleton className="h-3 w-12" />
              {/* 값 */}
              <Skeleton className="h-5 w-28" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 견적 항목 테이블 스켈레톤
 * - 테이블 헤더 + 5행 더미 항목
 */
export function QuoteItemsTableSkeleton() {
  return (
    <div className="w-full rounded-lg border border-border overflow-hidden">
      {/* 테이블 헤더 */}
      <div className="bg-muted/50 px-4 py-3 grid grid-cols-4 gap-4">
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-4 w-8 ml-auto" />
        <Skeleton className="h-4 w-10 ml-auto" />
        <Skeleton className="h-4 w-10 ml-auto" />
      </div>

      {/* 5행 더미 항목 */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="px-4 py-3 grid grid-cols-4 gap-4 border-t border-border"
        >
          {/* 품목명 - 너비 다양하게 설정해 자연스럽게 */}
          <Skeleton
            className={`h-4 ${i % 3 === 0 ? "w-32" : i % 3 === 1 ? "w-24" : "w-28"}`}
          />
          {/* 수량 */}
          <Skeleton className="h-4 w-8 ml-auto" />
          {/* 단가 */}
          <Skeleton className="h-4 w-16 ml-auto" />
          {/* 금액 */}
          <Skeleton className="h-4 w-16 ml-auto" />
        </div>
      ))}
    </div>
  );
}

/**
 * 견적서 합계 요약 스켈레톤
 * - 소계, 세금, 구분선, 합계 구조
 */
export function QuoteSummarySkeleton() {
  return (
    <div className="flex justify-end">
      <div className="w-full max-w-xs space-y-3">
        {/* 소계 행 */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-24" />
        </div>
        {/* 세금 행 */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>

        <Separator />

        {/* 합계 행 */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-10" />
          <Skeleton className="h-7 w-28" />
        </div>
      </div>
    </div>
  );
}
