/* eslint-disable @typescript-eslint/no-explicit-any */
import { notion, INVOICE_DB_ID, ITEMS_DB_ID, APIErrorCode, isNotionClientError } from './client';
import { resolveDataSourceId } from './data-source-resolver';
import { mapNotionPageToQuote, mapNotionItemToQuoteItem } from './mappers';
import { withRetry } from './retry';
import { getMockQuoteByToken } from '@/lib/mock/quotes';
import type { Quote, QuoteItem } from '@/lib/types/quote';
import type {
  NotionPageResponse,
  NotionInvoiceProperties,
  NotionItemProperties,
} from '@/lib/types/notion';

const SHARE_TOKEN_UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * 한 번의 쿼리로는 100개까지 가져올 수 있으므로,
 * has_more가 true이면 next_cursor를 사용해 페이지네이션을 반복합니다.
 * 재시도 로직이 적용되어 일시적 오류 자동 재시도
 */
async function queryAllPages<P>(
  dataSourceId: string,
  filter?: unknown,
  sorts?: Array<unknown>,
): Promise<Array<NotionPageResponse<P>>> {
  const collected: Array<NotionPageResponse<P>> = [];
  let cursor: string | undefined;

  do {
    const response = await withRetry(() =>
      notion.dataSources.query({
        data_source_id: dataSourceId,
        filter: filter as any,
        sorts: sorts as any,
        page_size: 100,
        start_cursor: cursor,
      }),
      { maxRetries: 3 }
    );

    // 응답의 results는 PageObjectResponse | PartialPageObjectResponse | DataSource* 합집합입니다.
    // 우리가 원하는 것은 'page' 객체이며 properties가 들어있는 형태입니다.
    for (const item of response.results) {
      if ((item as { object?: string }).object === 'page' && 'properties' in item) {
        collected.push(item as unknown as NotionPageResponse<P>);
      }
    }

    cursor = response.has_more && response.next_cursor ? response.next_cursor : undefined;
  } while (cursor);

  return collected;
}

/**
 * 견적서(Invoice) 전체 목록 조회
 * - 상태 '취소' 제외
 * - 발행일 내림차순
 */
export async function getAllQuotes(): Promise<Quote[]> {
  try {
    console.log('[Notion] 견적서 목록 조회 시작');
    const dataSourceId = await resolveDataSourceId(INVOICE_DB_ID);

    const pages = await queryAllPages<NotionInvoiceProperties>(
      dataSourceId,
      undefined,
      [{ property: '발행일', direction: 'descending' }],
    );

    console.log(`[Notion] ${pages.length}개의 견적서 조회 완료`);

    // 취소되지 않은 견적서만 필터링
    const filteredPages = pages.filter((p) => {
      const statusProp = p.properties['상태'] as any;
      return statusProp?.select?.name !== '취소';
    });

    // 각 견적서의 항목 병렬 로드
    const quotesWithItems = await Promise.all(
      filteredPages.map(async (p) => {
        const items = await getItemsByInvoice(p.id);
        return mapNotionPageToQuote(p, items);
      })
    );

    return quotesWithItems;
  } catch (error) {
    handleNotionError(error, '[Notion] 견적서 목록 조회 실패');
    return [];
  }
}

/**
 * 공유 토큰으로 단일 견적서 조회 (+ 항목 포함)
 * - 토큰 형식 검증으로 불필요한 API 호출 방지
 * - 상태 '취소' 제외
 */
export async function getQuoteByToken(shareToken: string): Promise<Quote | null> {
  if (!SHARE_TOKEN_UUID_REGEX.test(shareToken)) {
    console.warn(`[Notion] 유효하지 않은 shareToken 형식`);
    return null;
  }

  try {
    console.log(`[Notion] 공유 토큰으로 견적서 조회`);
    const dataSourceId = await resolveDataSourceId(INVOICE_DB_ID);

    const pages = await queryAllPages<NotionInvoiceProperties>(dataSourceId, {
      property: '공유토큰',
      rich_text: { equals: shareToken },
    });

    if (pages.length === 0) {
      console.warn(`[Notion] 토큰에 해당하는 견적서 없음, 모의 데이터 시도`);
      const mockQuote = getMockQuoteByToken(shareToken);
      if (mockQuote) {
        console.log(`[Notion] 모의 데이터 사용: ${mockQuote.title}`);
        return mockQuote;
      }
      return null;
    }

    const page = pages[0];
    const statusProp = page.properties['상태'] as any;
    if (statusProp?.select?.name === '취소') {
      console.warn(`[Notion] 취소된 견적서 접근 불가`);
      return null;
    }

    const items = await getItemsByInvoice(page.id);
    console.log(`[Notion] 견적서 조회 완료 (${items.length}개 항목)`);
    return mapNotionPageToQuote(page, items);
  } catch (error) {
    console.warn(`[Notion] 공유 토큰 조회 실패, 모의 데이터 시도`);
    const mockQuote = getMockQuoteByToken(shareToken);
    if (mockQuote) {
      console.log(`[Notion] 모의 데이터 사용 (오류 폴백): ${mockQuote.title}`);
      return mockQuote;
    }
    handleNotionError(error, `[Notion] 공유 토큰 조회 실패`);
    return null;
  }
}

/**
 * 견적서에 속한 항목 목록 조회
 * - Items DB의 'Invoice' relation 속성으로 필터
 */
export async function getItemsByInvoice(invoicePageId: string): Promise<QuoteItem[]> {
  try {
    const dataSourceId = await resolveDataSourceId(ITEMS_DB_ID);

    const pages = await queryAllPages<NotionItemProperties>(dataSourceId, {
      property: 'Invoice',
      relation: { contains: invoicePageId },
    });

    return pages.map((p) => mapNotionItemToQuoteItem(p));
  } catch (error) {
    handleNotionError(error, `[Notion] 항목 조회 실패 (invoiceId: ${invoicePageId})`);
    return [];
  }
}

/**
 * 페이지 ID로 견적서 단건 조회 (대시보드 상세 등)
 */
export async function getQuoteById(
  pageId: string,
  includeItems = false,
): Promise<Quote | null> {
  try {
    const page = (await notion.pages.retrieve({
      page_id: pageId,
    })) as unknown as NotionPageResponse<NotionInvoiceProperties>;

    const items = includeItems ? await getItemsByInvoice(pageId) : undefined;
    return mapNotionPageToQuote(page, items);
  } catch (error) {
    if (isNotionClientError(error) && error.code === APIErrorCode.ObjectNotFound) {
      return null;
    }
    handleNotionError(error, `[Notion] 페이지 조회 실패 (pageId: ${pageId})`);
    throw error;
  }
}

/**
 * Notion API 에러를 표준 형식으로 로깅합니다.
 * Rate limit / 인증 오류 등 코드별 메시지를 명확히 구분합니다.
 */
function handleNotionError(error: unknown, prefix: string): void {
  if (isNotionClientError(error)) {
    console.error(`${prefix} [${error.code}]`, error.message);
    return;
  }
  console.error(prefix, error);
}
