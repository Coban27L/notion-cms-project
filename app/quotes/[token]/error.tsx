"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface QuoteErrorPageProps {
  /** Next.js가 전달하는 에러 객체 */
  error: Error & { digest?: string };
  /** Next.js가 제공하는 페이지 재시도 함수 */
  reset: () => void;
}

/**
 * 견적서 상세 페이지 에러 바운더리 (app/quotes/[token]/error.tsx)
 * - 노션 API 실패, 네트워크 오류 등 처리
 * - 재시도 버튼으로 데이터 재로딩 가능
 * - 페이지 레이아웃(header/footer)은 유지된 채 에러 UI만 교체
 * - 'use client' 필수: Next.js 에러 컴포넌트 요구사항
 */
export default function QuoteErrorPage({ error, reset }: QuoteErrorPageProps) {
  /* 견적서 페이지 에러 로깅 */
  useEffect(() => {
    console.error("[QuoteErrorBoundary] 견적서 로딩 오류:", error);
    /* TODO: Sentry 에러 보고 연동 (Task 014) */
  }, [error]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* 상단 네비게이션 (에러 상태에서도 뒤로가기 제공) */}
        <div className="mb-6">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 -ml-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              돌아가기
            </Button>
          </Link>
        </div>

        {/* 에러 콘텐츠 */}
        <div className="flex flex-col items-center justify-center py-20 gap-5">
          {/* 에러 아이콘 */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle
              className="h-8 w-8 text-destructive"
              aria-hidden="true"
            />
          </div>

          {/* 에러 텍스트 */}
          <div className="text-center max-w-sm space-y-2">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              견적서를 불러올 수 없어요
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              노션 API 연결에 문제가 발생했습니다. 잠시 후 다시 시도하거나,
              관리자에게 문의해주세요.
            </p>
            {/* 에러 digest - 지원팀 문의용 */}
            {error.digest && (
              <p className="text-xs text-muted-foreground/60 font-mono mt-3">
                오류 코드: {error.digest}
              </p>
            )}
          </div>

          {/* 액션 버튼 */}
          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            {/* 재시도 버튼 */}
            <Button
              variant="default"
              size="sm"
              className="gap-2"
              onClick={reset}
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              다시 시도
            </Button>

            {/* 홈으로 이동 */}
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                홈으로 이동
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
