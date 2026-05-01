import { Quote, QuoteItem, QuoteStatus } from '@/lib/types/quote';
import {
  NotionPageResponse,
  NotionInvoiceProperties,
  NotionItemProperties,
} from '@/lib/types/notion';

function safeReadText(prop: unknown): string {
  if (!prop || typeof prop !== 'object') return '';
  const p = prop as { rich_text?: Array<{ plain_text?: string }> };
  if (Array.isArray(p.rich_text)) {
    return p.rich_text.map((t) => t.plain_text ?? '').join('');
  }
  return '';
}

function safeReadTitle(prop: unknown): string {
  if (!prop || typeof prop !== 'object') return '';
  const p = prop as { title?: Array<{ plain_text?: string }> };
  return p.title?.map((t) => t.plain_text ?? '').join('') ?? '';
}

function safeReadNumber(prop: unknown): number {
  if (!prop || typeof prop !== 'object') return 0;
  const p = prop as { number?: number | null };
  return p.number ?? 0;
}

function safeReadSelect(prop: unknown): string {
  if (!prop || typeof prop !== 'object') return '';
  const p = prop as { select?: { name?: string } | null };
  return p.select?.name ?? '';
}

function safeReadDate(prop: unknown): string {
  if (!prop || typeof prop !== 'object') return '';
  const p = prop as { date?: { start?: string } | null };
  return p.date?.start ?? '';
}

function safeReadFormula(prop: unknown): number | null {
  if (!prop || typeof prop !== 'object') return null;
  const p = prop as { formula?: { number?: number | null } };
  return p.formula?.number ?? null;
}

function safeReadRollup(prop: unknown): number {
  if (!prop || typeof prop !== 'object') return 0;
  const p = prop as { rollup?: { number?: number | null } };
  return p.rollup?.number ?? 0;
}

const VALID_STATUSES: Record<string, QuoteStatus> = {
  대기: '대기',
  발행: '발행',
  승인: '승인',
  취소: '취소',
};

function normalizeStatus(status: string): QuoteStatus {
  if (status in VALID_STATUSES) return VALID_STATUSES[status];
  console.warn(`[Mappers] 유효하지 않은 상태 값: "${status}". 기본값 "발행" 사용.`);
  return '발행';
}

export function mapNotionItemToQuoteItem(
  page: NotionPageResponse<NotionItemProperties>
): QuoteItem {
  const props = page.properties;

  const name = safeReadTitle(props['항목명']) || '(항목명 없음)';

  const unitPrice = safeReadNumber(props['단가']);
  const quantity = safeReadNumber(props['수량']) || 1;
  const formulaAmount = safeReadFormula(props['금액']);
  const amount = formulaAmount !== null ? formulaAmount : unitPrice * quantity;

  return { name, quantity, unitPrice, amount };
}

export function mapNotionPageToQuote(
  page: NotionPageResponse<NotionInvoiceProperties>,
  items?: QuoteItem[]
): Quote {
  const props = page.properties;

  const title = safeReadTitle(props['견적서 번호']);
  const clientName = safeReadText(props['클라이언트명']);
  const rawStatus = safeReadSelect(props['상태']);
  const status = normalizeStatus(rawStatus);
  let totalAmount = safeReadRollup(props['총 금액']);

  // 만약 totalAmount가 0이거나 없으면 items 기반으로 계산
  if ((!totalAmount || totalAmount === 0) && items && items.length > 0) {
    const subtotal = items.reduce((sum, item) => sum + (item.amount || 0), 0);
    totalAmount = Math.round(subtotal * 1.09); // 9% GST 포함
  }

  const issuedDate = safeReadDate(props['발행일']);
  const validUntil = safeReadDate(props['유효기간']);
  const shareToken = safeReadText(props['공유토큰']);
  const notes = safeReadText(props['비고']) || '';

  return {
    id: page.id,
    shareToken,
    title,
    clientName,
    status,
    totalAmount,
    issuedDate,
    validUntil,
    items,
    notes,
  };
}
