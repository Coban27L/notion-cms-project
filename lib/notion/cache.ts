import { unstable_cache } from "next/cache";
import {
  getAllQuotes as _getAllQuotes,
  getQuoteByToken as _getQuoteByToken,
  getItemsByInvoice as _getItemsByInvoice,
} from "./queries";

/**
 * 캐싱된 getAllQuotes
 * - 1시간 동안 캐시
 * - 견적서 목록은 자주 변경되지 않음
 */
export const getAllQuotesWithCache = unstable_cache(
  async () => _getAllQuotes(),
  ["get-all-quotes"],
  {
    revalidate: 3600,
    tags: ["quotes-list"],
  },
);

/**
 * 캐싱된 getQuoteByToken
 * - 공유 링크는 고정된 데이터
 * - 24시간 캐시 (또는 요청 시간 기반 ISR)
 */
export const getQuoteByTokenWithCache = unstable_cache(
  async (shareToken: string) => _getQuoteByToken(shareToken),
  ["get-quote-by-token"],
  {
    revalidate: 86400,
    tags: ["quote-detail"],
  },
);

/**
 * 캐싱된 getItemsByInvoice
 * - 특정 견적서의 항목들
 * - 1시간 캐시
 */
export const getItemsByInvoiceWithCache = unstable_cache(
  async (invoiceId: string) => _getItemsByInvoice(invoiceId),
  ["get-items-by-invoice"],
  {
    revalidate: 3600,
    tags: ["quote-items"],
  },
);

/**
 * 캐시 재검증 (온디맨드)
 * - 새 견적서 생성 시 호출
 */
export async function revalidateQuotesCache() {
  // Next.js 13.5+ revalidateTag 사용
  // import { revalidateTag } from 'next/cache';
  // revalidateTag('quotes-list');
  // revalidateTag('quote-items');
}
