import Link from 'next/link';
import {
  FileText,
  Clock,
  SendHorizonal,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { QuoteStatusBadge } from '@/components/quote/quote-status-badge';
import { ShareLinkButton } from '@/components/quote/share-link-button';
import { DashboardEmptyState } from '@/components/dashboard/empty-state';
import { getAllQuotes } from '@/lib/notion/queries';
import { generateMockQuotes } from '@/lib/mock/quotes';
import { QuoteStatus } from '@/lib/types/quote';
import { formatSGD } from '@/lib/utils/currency';

interface DashboardPageProps {
  searchParams: Promise<{ status?: string }>;
}

/**
 * 날짜를 한국어 형식으로 포맷
 */
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * 상태 탭 설정
 */
const STATUS_TABS: { label: string; value: string }[] = [
  { label: '전체', value: 'all' },
  { label: '대기', value: '대기' },
  { label: '발행', value: '발행' },
  { label: '승인', value: '승인' },
  { label: '취소', value: '취소' },
];

/**
 * 통계 카드 설정 - 아이콘 및 색상 정의
 */
const STAT_CONFIG = [
  {
    label: '전체',
    icon: FileText,
    iconBg: 'bg-muted',
    iconColor: 'text-muted-foreground',
    valueColor: 'text-foreground',
    key: 'all',
  },
  {
    label: '대기',
    icon: Clock,
    iconBg: 'bg-slate-100 dark:bg-slate-800',
    iconColor: 'text-slate-600 dark:text-slate-400',
    valueColor: 'text-slate-700 dark:text-slate-300',
    key: '대기',
  },
  {
    label: '발행',
    icon: SendHorizonal,
    iconBg: 'bg-amber-50 dark:bg-amber-950',
    iconColor: 'text-amber-600 dark:text-amber-400',
    valueColor: 'text-amber-700 dark:text-amber-300',
    key: '발행',
  },
  {
    label: '승인',
    icon: CheckCircle2,
    iconBg: 'bg-emerald-50 dark:bg-emerald-950',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    valueColor: 'text-emerald-700 dark:text-emerald-300',
    key: '승인',
  },
  {
    label: '취소',
    icon: XCircle,
    iconBg: 'bg-red-50 dark:bg-red-950',
    iconColor: 'text-red-600 dark:text-red-400',
    valueColor: 'text-red-700 dark:text-red-300',
    key: '취소',
  },
];

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { status = 'all' } = await searchParams;

  let quotes;
  try {
    quotes = await getAllQuotes();
  } catch (error) {
    console.warn('[Dashboard] Notion API 오류, mock 데이터 사용:', error);
    quotes = generateMockQuotes();
  }

  /* 상태별 필터링 */
  const filtered =
    status === 'all'
      ? quotes
      : quotes.filter((q) => q.status === (status as QuoteStatus));

  /* 탭별 카운트 계산 */
  const countByStatus = (key: string) =>
    key === 'all'
      ? quotes.length
      : quotes.filter((q) => q.status === key).length;

  return (
    <div className="space-y-8">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">견적서 대시보드</h1>
        <p className="text-muted-foreground mt-1.5">
          노션 DB와 연동된 견적서를 관리합니다.
        </p>
      </div>

      {/* 요약 통계 카드 - 반응형 5열 그리드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {STAT_CONFIG.map((stat) => {
          const Icon = stat.icon;
          const count = countByStatus(stat.key);

          return (
            <Link
              key={stat.key}
              href={`/dashboard?status=${stat.key}`}
              className="group"
              aria-label={`${stat.label} 견적서 ${count}건`}
            >
              <div
                className={`rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:border-primary/40 hover:shadow-sm ${
                  status === stat.key ? 'border-primary/50 shadow-sm ring-1 ring-primary/20' : ''
                }`}
              >
                {/* 아이콘 + 레이블 */}
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                  <div className={`flex h-7 w-7 items-center justify-center rounded-md ${stat.iconBg}`}>
                    <Icon className={`h-3.5 w-3.5 ${stat.iconColor}`} />
                  </div>
                </div>
                {/* 카운트 */}
                <p className={`text-2xl font-bold tabular-nums ${stat.valueColor}`}>
                  {count}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">건의 견적서</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 상태 필터 탭 */}
      {/* 접근성: Link 안에 button 중첩은 HTML 표준 위반이므로 Link 자체에 스타일 적용 */}
      <div className="overflow-x-auto -mx-1 px-1">
        <nav aria-label="견적서 상태 필터" className="inline-flex items-center gap-1 bg-muted rounded-lg p-1 min-w-max">
          {STATUS_TABS.map((tab) => {
            const isActive = status === tab.value;
            const count = countByStatus(tab.value);

            return (
              <Link
                key={tab.value}
                href={`/dashboard?status=${tab.value}`}
                className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {tab.label}
                <Badge
                  variant="secondary"
                  className={`text-xs h-4 px-1.5 ${
                    isActive
                      ? 'bg-muted text-foreground'
                      : 'bg-muted/50 text-muted-foreground'
                  }`}
                >
                  {count}
                </Badge>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* 견적서 테이블 */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              {/* 견적서 번호 */}
              <TableHead className="pl-4 w-[160px]">견적서 번호</TableHead>
              {/* 클라이언트명 */}
              <TableHead>클라이언트</TableHead>
              {/* 발행일 - 작은 화면에서 숨김 */}
              <TableHead className="hidden sm:table-cell">발행일</TableHead>
              {/* 유효기간 - 중간 화면에서만 표시 */}
              <TableHead className="hidden md:table-cell">유효기간</TableHead>
              {/* 상태 */}
              <TableHead>상태</TableHead>
              {/* 총 금액 */}
              <TableHead className="text-right">금액</TableHead>
              {/* 액션 */}
              <TableHead className="text-right pr-4 w-[100px]">액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* 빈 상태 UI - DashboardEmptyState 컴포넌트 활용 */}
            {filtered.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={7} className="p-0">
                  <DashboardEmptyState activeFilter={status} />
                </TableCell>
              </TableRow>
            ) : (
              /* 견적서 목록 렌더링 */
              filtered.map((quote) => (
                <TableRow key={quote.id}>
                  {/* 견적서 번호 - shareToken 기반 URL로 이동 */}
                  <TableCell className="pl-4 font-medium">
                    <Link
                      href={`/quotes/${quote.shareToken}`}
                      className="hover:text-primary transition-colors"
                    >
                      {quote.title}
                    </Link>
                  </TableCell>
                  {/* 클라이언트명 */}
                  <TableCell className="text-muted-foreground">
                    {quote.clientName}
                  </TableCell>
                  {/* 발행일 */}
                  <TableCell className="hidden sm:table-cell text-muted-foreground text-xs">
                    {formatDate(quote.issuedDate)}
                  </TableCell>
                  {/* 유효기간 */}
                  <TableCell className="hidden md:table-cell text-muted-foreground text-xs">
                    {formatDate(quote.validUntil)}
                  </TableCell>
                  {/* 상태 배지 */}
                  <TableCell>
                    <QuoteStatusBadge status={quote.status} />
                  </TableCell>
                  {/* 총 금액 - lib/utils/currency.ts 공유 유틸 사용 */}
                  <TableCell className="text-right font-semibold tabular-nums">
                    {formatSGD(quote.totalAmount)}
                  </TableCell>
                  {/* 액션 버튼 그룹 - shareToken 기반 공유 링크 */}
                  <TableCell className="text-right pr-4">
                    <div className="flex items-center justify-end gap-1">
                      <ShareLinkButton token={quote.shareToken} />
                      <Link href={`/quotes/${quote.shareToken}`}>
                        <Button variant="ghost" size="sm" className="h-8 text-xs px-2">
                          상세보기
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* 테이블 푸터 - 총 건수 표시 */}
      {filtered.length > 0 && (
        <p className="text-xs text-muted-foreground text-right">
          총 <span className="font-medium text-foreground">{filtered.length}</span>건의 견적서
        </p>
      )}
    </div>
  );
}
