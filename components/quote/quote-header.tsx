import { CalendarDays, Building2, Hash, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Quote } from "@/lib/types/quote";
import { QuoteStatusBadge } from "./quote-status-badge";

interface QuoteHeaderProps {
  quote: Quote;
}

/**
 * 견적서 상세 페이지 헤더 컴포넌트
 * - CSS 변수 기반 배경색으로 다크모드 자동 지원
 * - 발행일, 유효기간, 클라이언트명, 상태 표시
 * - 유효기간이 오늘 이전이면 만료 경고 표시
 */
export function QuoteHeader({ quote }: QuoteHeaderProps) {
  /* 유효기간 만료 여부 계산 */
  const isExpired = new Date(quote.validUntil) < new Date();

  return (
    <div className="rounded-xl border border-border bg-card p-6 md:p-8">
      {/* 만료된 견적서 경고 배너 */}
      {isExpired && (
        <div className="flex items-center gap-2 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 px-4 py-3 mb-6">
          <AlertTriangle
            className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400"
            aria-hidden="true"
          />
          <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">
            이 견적서는 유효기간이 만료되었습니다.
          </p>
        </div>
      )}

      {/* 견적서 번호 및 상태 */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Hash className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">견적서 번호</p>
            <h2 className="text-2xl font-bold tracking-tight">{quote.title}</h2>
          </div>
        </div>
        <QuoteStatusBadge status={quote.status} />
      </div>

      <Separator className="mb-6" />

      {/* 발행 정보 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* 클라이언트 */}
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
            <Building2
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">클라이언트</p>
            <p className="font-semibold text-base">{quote.clientName}</p>
          </div>
        </div>

        {/* 발행일 */}
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
            <CalendarDays
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">발행일</p>
            <p className="font-semibold text-base">
              {new Date(quote.issuedDate).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* 유효기간 - 만료 시 경고 색상 적용 */}
        <div className="flex items-start gap-3">
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
              isExpired ? "bg-amber-50 dark:bg-amber-950/50" : "bg-muted"
            }`}
          >
            <CalendarDays
              className={`h-4 w-4 ${
                isExpired
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-muted-foreground"
              }`}
              aria-hidden="true"
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">유효기간</p>
            <p
              className={`font-semibold text-base ${
                isExpired ? "text-amber-700 dark:text-amber-400" : ""
              }`}
            >
              {new Date(quote.validUntil).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              까지
              {/* 만료 표시 */}
              {isExpired && (
                <span className="ml-2 text-xs font-medium text-amber-600 dark:text-amber-400">
                  (만료됨)
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
