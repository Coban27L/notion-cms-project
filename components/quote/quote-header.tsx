import { Quote } from '@/lib/types/quote';

interface QuoteHeaderProps {
  quote: Quote;
}

export function QuoteHeader({ quote }: QuoteHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-sm text-gray-600 mb-1">견적서 번호</p>
          <h1 className="text-3xl font-bold">{quote.title}</h1>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">발행일</p>
            <p className="font-medium">
              {new Date(quote.issuedDate).toLocaleDateString('ko-KR')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">유효기간</p>
            <p className="font-medium">
              {new Date(quote.validUntil).toLocaleDateString('ko-KR')}까지
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t">
        <p className="text-sm text-gray-600 mb-1">클라이언트</p>
        <p className="text-2xl font-semibold">{quote.clientName}</p>
      </div>
    </div>
  );
}
