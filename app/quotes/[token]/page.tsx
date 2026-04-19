import { Metadata } from 'next';

interface QuotePageProps {
  params: {
    token: string;
  };
}

export async function generateMetadata({
  params,
}: QuotePageProps): Promise<Metadata> {
  return {
    title: `견적서 - ${params.token}`,
    description: '공유된 견적서',
  };
}

export default function QuotePage({ params }: QuotePageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">견적서</h1>

      <div className="text-muted-foreground mb-8">
        <p>토큰: {params.token}</p>
      </div>

      <div className="bg-card rounded-lg border border-border p-8 space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">발행사 정보</h2>
          <p className="text-muted-foreground">발행사 정보가 표시됩니다</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">견적 항목</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left py-2 px-4">항목</th>
                  <th className="text-right py-2 px-4">수량</th>
                  <th className="text-right py-2 px-4">단가</th>
                  <th className="text-right py-2 px-4">금액</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-4 px-4">항목 1</td>
                  <td className="text-right py-4 px-4">1</td>
                  <td className="text-right py-4 px-4">0원</td>
                  <td className="text-right py-4 px-4">0원</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="flex justify-end">
          <div className="w-full max-w-xs space-y-2">
            <div className="flex justify-between py-2">
              <span>소계</span>
              <span>0원</span>
            </div>
            <div className="flex justify-between py-2 border-t border-border">
              <span className="font-semibold">합계</span>
              <span className="font-semibold">0원</span>
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-4">
          <button className="px-6 py-2 border border-input rounded-lg hover:bg-accent transition-colors">
            공유 링크 복사
          </button>
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            PDF 다운로드
          </button>
        </div>
      </div>
    </div>
  );
}
