import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { ArrowLeft, Download, StickyNote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { QuoteHeader } from '@/components/quote/quote-header';
import { QuoteItemsTable } from '@/components/quote/quote-items-table';
import { QuoteSummary } from '@/components/quote/quote-summary';
import { ShareLinkButton } from '@/components/quote/share-link-button';
import { QuoteDetailSkeleton } from '@/components/quote/quote-skeleton';
import { getQuoteByToken } from '@/lib/notion/queries';

interface QuotePageProps {
  params: Promise<{ token: string }>;
}

export async function generateMetadata({ params }: QuotePageProps): Promise<Metadata> {
  const { token } = await params;
  const quote = await getQuoteByToken(token);
  if (!quote) return { title: '견적서를 찾을 수 없습니다' };

  return {
    title: `견적서 ${quote.title}`,
    description: `${quote.clientName} 견적서`,
  };
}

/**
 * 견적서 상세 내용 비동기 컴포넌트
 * - Suspense boundary 내부에서 실제 데이터 로딩 담당
 * - 토큰이 유효하지 않으면 notFound() 호출
 */
async function QuoteContent({ token }: { token: string }) {
  const quote = await getQuoteByToken(token);

  if (!quote) notFound();

  return (
    <div className="space-y-6">
      {/* 견적서 헤더 (번호, 클라이언트, 발행일, 유효기간, 상태) */}
      <QuoteHeader quote={quote} />

      {/* 견적 항목 테이블 */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold text-base mb-4">견적 항목</h3>
        <QuoteItemsTable quote={quote} />
      </div>

      {/* 합계 요약 */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold text-base mb-4">금액 요약</h3>
        <QuoteSummary quote={quote} />
      </div>

      {/* 비고 (있을 경우에만 표시) */}
      {quote.notes && (
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <StickyNote className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold text-base">비고</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {quote.notes}
          </p>
        </div>
      )}

      <Separator />

      {/* 액션 버튼 영역 */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        {/* 안내 문구 */}
        <p className="text-xs text-muted-foreground text-center sm:text-left">
          이 견적서는 공유 링크를 통해 열람 가능합니다.
        </p>

        {/* CTA 버튼 그룹 */}
        <div className="flex flex-col sm:flex-row gap-2">
          {/* 공유 링크 복사 버튼 */}
          <ShareLinkButton token={quote.id} />

          {/* PDF 다운로드 버튼 */}
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            PDF 다운로드
            {/* TODO: PDF 생성 및 다운로드 로직 구현 (Task 008) */}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default async function QuotePage({ params }: QuotePageProps) {
  const { token } = await params;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">

        {/* 상단 네비게이션 */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 -ml-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              돌아가기
            </Button>
          </Link>
        </div>

        {/* 페이지 제목 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">견적서 조회</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            견적서의 상세 내용을 확인하실 수 있습니다.
          </p>
        </div>

        {/*
          Suspense로 감싸 노션 API 호출 전 스켈레톤 표시
          - fallback: QuoteDetailSkeleton (구조 동일한 로딩 플레이스홀더)
          - QuoteContent: 실제 데이터 로딩 및 렌더링
        */}
        <Suspense fallback={<QuoteDetailSkeleton />}>
          <QuoteContent token={token} />
        </Suspense>
      </div>
    </div>
  );
}
