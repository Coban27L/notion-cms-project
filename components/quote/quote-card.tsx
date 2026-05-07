import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Quote } from "@/lib/types/quote";
import { QuoteStatusBadge } from "./quote-status-badge";
import { formatSGD } from "@/lib/utils/currency";
import Link from "next/link";

interface QuoteCardProps {
  quote: Quote;
  interactive?: boolean;
}

/**
 * 견적서 카드 컴포넌트 (대시보드 그리드용)
 * - CSS 변수 기반 색상으로 다크모드 자동 지원
 * - shareToken 기반 URL로 클라이언트 공유 링크 생성
 */
export function QuoteCard({ quote, interactive = true }: QuoteCardProps) {
  const content = (
    <Card
      className={
        interactive
          ? "hover:shadow-md transition-shadow duration-200 cursor-pointer"
          : ""
      }
    >
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div>
            <CardTitle className="text-lg">{quote.title}</CardTitle>
            {/* 클라이언트명: CSS 변수 기반 색상으로 다크모드 지원 */}
            <p className="text-sm text-muted-foreground mt-2">
              {quote.clientName}
            </p>
          </div>
          <QuoteStatusBadge status={quote.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            {/* 레이블: muted-foreground로 다크모드 대응 */}
            <p className="text-muted-foreground">발행일</p>
            <p className="font-medium">
              {new Date(quote.issuedDate).toLocaleDateString("ko-KR")}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">유효기간</p>
            <p className="font-medium">
              {new Date(quote.validUntil).toLocaleDateString("ko-KR")}
            </p>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground text-sm mb-1">총액</p>
          {/* 금액: text-primary로 테마 색상 적용 */}
          <p className="text-2xl font-bold text-primary tabular-nums">
            {formatSGD(quote.totalAmount)}
          </p>
        </div>
      </CardContent>
    </Card>
  );

  if (interactive) {
    /* shareToken 기반 URL 사용 - 클라이언트 공유 링크 */
    return <Link href={`/quotes/${quote.shareToken}`}>{content}</Link>;
  }

  return content;
}
