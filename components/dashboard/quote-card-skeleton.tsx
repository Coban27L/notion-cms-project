import { Skeleton } from '@/components/ui/skeleton';

/**
 * 대시보드 통계 카드 스켈레톤 컴포넌트
 * - 5개 통계 카드(전체/대기/발행/승인/취소)에 대응
 * - 반응형: 2열(모바일) → 3열(sm) → 5열(lg)
 */
export function StatCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      {/* 아이콘 + 라벨 행 */}
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="h-3 w-8" />
        <Skeleton className="h-7 w-7 rounded-md" />
      </div>
      {/* 카운트 숫자 */}
      <Skeleton className="h-8 w-12 mb-1" />
      {/* "건의 견적서" 텍스트 */}
      <Skeleton className="h-3 w-16" />
    </div>
  );
}

/**
 * 대시보드 통계 카드 그리드 스켈레톤
 * - StatCardSkeleton 5개를 반응형 그리드로 배치
 */
export function StatCardGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * 대시보드 테이블 행 스켈레톤
 * - 견적서 목록 테이블의 단일 행 플레이스홀더
 */
export function TableRowSkeleton() {
  return (
    <tr className="border-b border-border last:border-0">
      {/* 견적서 번호 */}
      <td className="pl-4 py-4">
        <Skeleton className="h-4 w-24" />
      </td>
      {/* 클라이언트 */}
      <td className="py-4">
        <Skeleton className="h-4 w-20" />
      </td>
      {/* 발행일 - sm 이상에서만 표시 */}
      <td className="hidden sm:table-cell py-4">
        <Skeleton className="h-4 w-20" />
      </td>
      {/* 유효기간 - md 이상에서만 표시 */}
      <td className="hidden md:table-cell py-4">
        <Skeleton className="h-4 w-20" />
      </td>
      {/* 상태 배지 */}
      <td className="py-4">
        <Skeleton className="h-5 w-12 rounded-full" />
      </td>
      {/* 금액 */}
      <td className="py-4 text-right">
        <Skeleton className="h-4 w-20 ml-auto" />
      </td>
      {/* 액션 버튼 */}
      <td className="py-4 pr-4">
        <div className="flex items-center justify-end gap-1">
          <Skeleton className="h-8 w-16 rounded-md" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      </td>
    </tr>
  );
}

/**
 * 대시보드 테이블 전체 스켈레톤
 * - 헤더 + 기본 5행 로딩 플레이스홀더
 */
export function DashboardTableSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <table className="w-full">
        {/* 테이블 헤더 */}
        <thead>
          <tr className="bg-muted/50">
            <th className="pl-4 py-3 text-left w-[160px]">
              <Skeleton className="h-4 w-16" />
            </th>
            <th className="py-3 text-left">
              <Skeleton className="h-4 w-14" />
            </th>
            <th className="hidden sm:table-cell py-3 text-left">
              <Skeleton className="h-4 w-10" />
            </th>
            <th className="hidden md:table-cell py-3 text-left">
              <Skeleton className="h-4 w-12" />
            </th>
            <th className="py-3 text-left">
              <Skeleton className="h-4 w-8" />
            </th>
            <th className="py-3 text-right">
              <Skeleton className="h-4 w-10 ml-auto" />
            </th>
            <th className="py-3 pr-4 text-right">
              <Skeleton className="h-4 w-8 ml-auto" />
            </th>
          </tr>
        </thead>
        {/* 테이블 바디 - 5행 */}
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRowSkeleton key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * 대시보드 전체 페이지 스켈레톤
 * - 통계 카드 그리드 + 필터 탭 + 테이블
 */
export function DashboardPageSkeleton() {
  return (
    <div className="space-y-8">
      {/* 페이지 헤더 */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-5 w-64" />
      </div>

      {/* 통계 카드 그리드 */}
      <StatCardGridSkeleton />

      {/* 필터 탭 스켈레톤 */}
      <div className="bg-muted rounded-lg p-1 inline-flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-16 rounded-md" />
        ))}
      </div>

      {/* 테이블 스켈레톤 */}
      <DashboardTableSkeleton />
    </div>
  );
}
