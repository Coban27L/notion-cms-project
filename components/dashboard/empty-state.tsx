import { ReceiptText, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface DashboardEmptyStateProps {
  /** 현재 활성 상태 필터 ('all' 또는 '발행', '승인' 등) */
  activeFilter?: string;
  /** 노션 DB로 이동할 URL (환경 변수에서 전달) */
  notionUrl?: string;
}

/**
 * 대시보드 전용 빈 상태(Empty State) 컴포넌트
 * - 전체 목록이 비어있을 때: 노션 DB 바로가기 버튼 표시
 * - 특정 상태 필터로 결과가 없을 때: "전체 보기" 버튼 표시
 * - 아이콘, 제목, 설명, 행동 유도 버튼(CTA) 포함
 */
export function DashboardEmptyState({
  activeFilter = 'all',
  notionUrl,
}: DashboardEmptyStateProps) {
  const isFilteredEmpty = activeFilter !== 'all';

  return (
    <div
      className="flex flex-col items-center justify-center py-20 gap-4"
      role="status"
      aria-label={
        isFilteredEmpty
          ? `${activeFilter} 상태의 견적서 없음`
          : '견적서 없음'
      }
    >
      {/* 아이콘 컨테이너 */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <ReceiptText
          className="h-8 w-8 text-muted-foreground"
          aria-hidden="true"
        />
      </div>

      {/* 텍스트 영역 */}
      <div className="text-center max-w-xs">
        <p className="font-semibold text-base text-foreground">
          {isFilteredEmpty
            ? `${activeFilter} 상태의 견적서가 없어요`
            : '아직 견적서가 없어요'}
        </p>
        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
          {isFilteredEmpty
            ? '다른 상태 필터를 선택하거나 전체 목록을 확인해보세요.'
            : '노션 DB에서 견적서를 작성하면 자동으로 여기에 표시됩니다.'}
        </p>
      </div>

      {/* CTA 버튼 */}
      <div className="flex flex-col sm:flex-row gap-2 mt-2">
        {isFilteredEmpty ? (
          /* 필터링된 빈 상태: 전체 보기 버튼 */
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              전체 보기
            </Button>
          </Link>
        ) : notionUrl ? (
          /* 노션 URL이 있을 때: 외부 링크로 이동 */
          <a
            href={notionUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm" className="gap-2">
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              노션에서 견적서 작성
            </Button>
          </a>
        ) : (
          /* 노션 URL이 없을 때: 비활성 버튼 표시 */
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            disabled
            aria-disabled="true"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            새 견적서 작성
            {/* TODO: NOTION_DB_URL 환경 변수 연동 후 활성화 */}
          </Button>
        )}
      </div>
    </div>
  );
}
