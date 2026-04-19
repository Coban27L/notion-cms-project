import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { QuoteStatusBadge } from '@/components/quote/quote-status-badge';
import { ShareLinkButton } from '@/components/quote/share-link-button';
import { generateMockQuotes } from '@/lib/mock/quotes';
import { QuoteStatus } from '@/lib/types/quote';

interface DashboardPageProps {
  searchParams: Promise<{ status?: string }>;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatCurrency(amount: number) {
  return `₩${amount.toLocaleString('ko-KR')}`;
}

const STATUS_TABS: { label: string; value: string }[] = [
  { label: '전체', value: 'all' },
  { label: '발행', value: '발행' },
  { label: '승인', value: '승인' },
  { label: '취소', value: '취소' },
];

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { status = 'all' } = await searchParams;
  const mockQuotes = generateMockQuotes();

  const filtered = status === 'all'
    ? mockQuotes
    : mockQuotes.filter((q) => q.status === (status as QuoteStatus));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">견적서 대시보드</h1>
        <p className="text-muted-foreground mt-1">노션 DB와 연동된 견적서를 관리합니다.</p>
      </div>

      {/* 요약 통계 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: '전체', count: mockQuotes.length, color: 'text-foreground' },
          { label: '발행', count: mockQuotes.filter((q) => q.status === '발행').length, color: 'text-yellow-600' },
          { label: '승인', count: mockQuotes.filter((q) => q.status === '승인').length, color: 'text-green-600' },
          { label: '취소', count: mockQuotes.filter((q) => q.status === '취소').length, color: 'text-red-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
          </div>
        ))}
      </div>

      {/* 상태 필터 탭 */}
      <div className="flex gap-2 border-b border-border">
        {STATUS_TABS.map((tab) => (
          <Link key={tab.value} href={`/dashboard?status=${tab.value}`}>
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                status === tab.value
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
              <Badge variant="secondary" className="ml-2 text-xs">
                {tab.value === 'all'
                  ? mockQuotes.length
                  : mockQuotes.filter((q) => q.status === tab.value).length}
              </Badge>
            </button>
          </Link>
        ))}
      </div>

      {/* 견적서 테이블 */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">견적서 번호</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">클라이언트명</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">발행일</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">유효기간</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">상태</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">총 금액</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">액션</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-muted-foreground">
                    견적서가 없습니다.
                  </td>
                </tr>
              ) : (
                filtered.map((quote) => (
                  <tr key={quote.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4 font-medium">{quote.title}</td>
                    <td className="px-4 py-4 text-muted-foreground">{quote.clientName}</td>
                    <td className="px-4 py-4 text-muted-foreground">{formatDate(quote.issuedDate)}</td>
                    <td className="px-4 py-4 text-muted-foreground">{formatDate(quote.validUntil)}</td>
                    <td className="px-4 py-4">
                      <QuoteStatusBadge status={quote.status} />
                    </td>
                    <td className="px-4 py-4 text-right font-medium">{formatCurrency(quote.totalAmount)}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <ShareLinkButton token={quote.shareToken} />
                        <Link href={`/quotes/${quote.shareToken}`}>
                          <Button variant="ghost" size="sm">상세보기</Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
