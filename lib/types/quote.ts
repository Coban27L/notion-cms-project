/**
 * 견적 항목 인터페이스
 */
export interface QuoteItem {
  /** 항목명 (예: "웹사이트 개발") */
  name: string;
  /** 수량 */
  quantity: number;
  /** 단가 (원) */
  unitPrice: number;
  /** 금액 (quantity * unitPrice, 원) */
  amount: number;
}

/**
 * 견적 상태 타입
 */
export type QuoteStatus = '발행' | '승인' | '취소';

/**
 * 견적서 인터페이스
 */
export interface Quote {
  /** 노션 페이지 ID */
  id: string;
  /** 견적서 제목 (예: "QT-2024-001") */
  title: string;
  /** 클라이언트명 */
  clientName: string;
  /** 견적 상태 */
  status: QuoteStatus;
  /** 총액 (원) */
  totalAmount: number;
  /** 발행일 (ISO 8601 형식) */
  issuedDate: string;
  /** 유효 기간 (ISO 8601 형식) */
  validUntil: string;
  /** 공유 토큰 (UUID) */
  shareToken: string;
  /** 견적 항목 배열 */
  items: QuoteItem[];
  /** 비고 */
  notes: string;
}

/**
 * 견적서 목록 필터링 인터페이스
 */
export interface QuoteListFilters {
  /** 견적 상태로 필터링 */
  status?: QuoteStatus;
  /** 클라이언트명으로 필터링 */
  clientName?: string;
}
