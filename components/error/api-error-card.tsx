"use client";

import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ApiErrorCardProps {
  /** 표시할 에러 메시지 (기본값: 일반 에러 메시지) */
  message?: string;
  /** 에러 상세 정보 (개발 환경에서만 표시 권장) */
  detail?: string;
  /** 재시도 핸들러 (없으면 재시도 버튼 미표시) */
  onRetry?: () => void;
  /** 홈으로 이동 버튼 표시 여부 */
  showHomeButton?: boolean;
}

/**
 * API 호출 실패 시 표시되는 에러 카드 컴포넌트
 * - 에러 아이콘, 메시지, 재시도 버튼으로 구성
 * - 페이지 레벨 에러 핸들러(error.tsx)에서도 활용 가능
 * - 다크모드: CSS 변수 기반으로 자동 지원
 */
export function ApiErrorCard({
  message = "견적서를 불러올 수 없어요",
  detail,
  onRetry,
  showHomeButton = false,
}: ApiErrorCardProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 px-4 gap-4"
      role="alert"
      aria-live="assertive"
    >
      {/* 에러 아이콘 컨테이너 */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="h-8 w-8 text-destructive" aria-hidden="true" />
      </div>

      {/* 텍스트 영역 */}
      <div className="text-center max-w-sm">
        <p className="font-semibold text-base text-foreground">{message}</p>
        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
          잠시 후 다시 시도하거나, 문제가 지속되면 관리자에게 문의해주세요.
        </p>
        {/* 상세 에러 정보 - 개발 환경에서만 표시 권장 */}
        {detail && (
          <p className="text-xs text-muted-foreground/70 mt-2 font-mono bg-muted rounded-md px-3 py-2 text-left break-all">
            {detail}
          </p>
        )}
      </div>

      {/* 액션 버튼 그룹 */}
      <div className="flex flex-col sm:flex-row gap-2 mt-2">
        {/* 재시도 버튼 (핸들러가 있을 때만 표시) */}
        {onRetry && (
          <Button
            variant="default"
            size="sm"
            className="gap-2"
            onClick={onRetry}
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            다시 시도
          </Button>
        )}

        {/* 홈 이동 버튼 */}
        {showHomeButton && (
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2">
              <Home className="h-4 w-4" aria-hidden="true" />
              홈으로 이동
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

/**
 * 에러 상태를 카드 래퍼와 함께 표시하는 컴포넌트
 * - 페이지 레이아웃 내에서 자연스럽게 통합
 */
export function ApiErrorSection({
  message,
  detail,
  onRetry,
  showHomeButton,
}: ApiErrorCardProps) {
  return (
    <div className="rounded-xl border border-destructive/20 bg-card">
      <ApiErrorCard
        message={message}
        detail={detail}
        onRetry={onRetry}
        showHomeButton={showHomeButton}
      />
    </div>
  );
}
