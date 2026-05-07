import { Badge } from "@/components/ui/badge";
import { QuoteStatus } from "@/lib/types/quote";

interface QuoteStatusBadgeProps {
  status: QuoteStatus;
}

/**
 * 견적서 상태 배지 컴포넌트
 * - 상태별 색상 설정: 다크모드 호환 Tailwind 커스텀 색상 클래스
 * - transition-colors로 다크/라이트 모드 전환 시 부드러운 색상 트랜지션
 * - 상태별 인디케이터 dot으로 시각적 구분 강화
 */
const STATUS_CONFIG: Record<string, { className: string; dotColor: string }> = {
  대기: {
    className:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700",
    dotColor: "bg-slate-500 dark:bg-slate-400",
  },
  발행: {
    className:
      "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    dotColor: "bg-amber-500 dark:bg-amber-400",
  },
  승인: {
    className:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    dotColor: "bg-emerald-500 dark:bg-emerald-400",
  },
  취소: {
    className:
      "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 border-red-200 dark:border-red-800",
    dotColor: "bg-red-500 dark:bg-red-400",
  },
};

export function QuoteStatusBadge({ status }: QuoteStatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <Badge
      variant="outline"
      className={`
        gap-1.5 transition-colors duration-200
        ${config?.className ?? "bg-muted text-muted-foreground border-border"}
      `}
    >
      {/* 상태 인디케이터 dot */}
      <span
        className={`h-1.5 w-1.5 rounded-full shrink-0 ${config?.dotColor ?? "bg-muted-foreground"}`}
        aria-hidden="true"
      />
      {status || "알 수 없음"}
    </Badge>
  );
}
