'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ErrorPageProps {
  /** Next.js가 전달하는 에러 객체 */
  error: Error & { digest?: string };
  /** Next.js가 제공하는 페이지 재시도 함수 */
  reset: () => void;
}

/**
 * 페이지 레벨 에러 핸들러 (app/error.tsx)
 * - Next.js App Router의 에러 바운더리
 * - 예상치 못한 런타임 에러를 잡아 사용자 친화적 UI 표시
 * - 'use client' 필수: Next.js 에러 컴포넌트 요구사항
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  /* 에러 로깅 - 프로덕션에서 Sentry 등으로 교체 권장 */
  useEffect(() => {
    console.error('[ErrorBoundary] 페이지 에러 발생:', error);
    /* TODO: Sentry 에러 보고 연동 (Task 014) */
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* 에러 아이콘 */}
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle
              className="h-10 w-10 text-destructive"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* 에러 메시지 */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            오류가 발생했습니다
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            예상치 못한 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
          </p>
          {/* 에러 digest - 지원팀 문의용 */}
          {error.digest && (
            <p className="text-xs text-muted-foreground/60 font-mono mt-3">
              오류 코드: {error.digest}
            </p>
          )}
        </div>

        {/* 액션 버튼 그룹 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* 재시도 버튼 */}
          <Button
            variant="default"
            className="gap-2 w-full sm:w-auto"
            onClick={reset}
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            다시 시도
          </Button>

          {/* 홈으로 이동 버튼 */}
          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="gap-2 w-full"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              홈으로 이동
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
