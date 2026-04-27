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
 * 노션 select 값을 그대로 사용
 */
export type QuoteStatus = '대기' | '발행' | '승인' | '취소' | (string & {});

/**
 * 견적서 인터페이스
 */
export interface Quote {
  /** 노션 페이지 ID */
  id: string;
  /** 공유 토큰 (UUID 기반, 클라이언트 URL에 사용) */
  shareToken: string;
  /** 견적서 제목 (예: "INV-0225-001") */
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
  /** 견적 항목 배열 (목록에서는 optional) */
  items?: QuoteItem[];
  /** 비고 */
  notes?: string;
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
