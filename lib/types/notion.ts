/**
 * Invoice DB 프로퍼티 인터페이스
 * 노션의 한글 컬럼명을 그대로 사용
 */
export interface NotionInvoiceProperties {
  "견적서 번호": {
    id: string;
    type: "title";
    title: Array<{
      plain_text: string;
      [key: string]: unknown;
    }>;
  };
  발행일: {
    id: string;
    type: "date";
    date: {
      start: string;
      end?: string | null;
      [key: string]: unknown;
    } | null;
  };
  상태: {
    id: string;
    type: "select";
    select: {
      id: string;
      name: string;
      color: string;
      [key: string]: unknown;
    } | null;
  };
  유효기간: {
    id: string;
    type: "date";
    date: {
      start: string;
      end?: string | null;
      [key: string]: unknown;
    } | null;
  };
  "총 금액": {
    id: string;
    type: "rollup";
    rollup: {
      type: "number";
      number: number | null;
      function: string;
      [key: string]: unknown;
    };
  };
  클라이언트명: {
    id: string;
    type: "rich_text";
    rich_text: Array<{
      plain_text: string;
      [key: string]: unknown;
    }>;
  };
  공유토큰: {
    id: string;
    type: "rich_text";
    rich_text: Array<{
      plain_text: string;
      [key: string]: unknown;
    }>;
  };
  항목: {
    id: string;
    type: "relation";
    relation: Array<{ id: string }>;
    has_more: boolean;
  };
  [key: string]: unknown;
}

/**
 * items DB 프로퍼티 인터페이스
 */
export interface NotionItemProperties {
  항목명: {
    id: string;
    type: "title";
    title: Array<{
      plain_text: string;
      [key: string]: unknown;
    }>;
  };
  Invoice: {
    id: string;
    type: "relation";
    relation: Array<{ id: string }>;
    has_more: boolean;
  };
  금액: {
    id: string;
    type: "formula";
    formula: {
      type: "number";
      number: number | null;
      [key: string]: unknown;
    };
  };
  단가: {
    id: string;
    type: "number";
    number: number | null;
  };
  수량: {
    id: string;
    type: "number";
    number: number | null;
  };
  [key: string]: unknown;
}

/**
 * 노션 페이지 응답 인터페이스 (제네릭)
 */
export interface NotionPageResponse<T = Record<string, unknown>> {
  object: "page";
  id: string;
  created_time: string;
  last_edited_time: string;
  properties: T;
  [key: string]: unknown;
}

/**
 * 노션 데이터베이스 쿼리 응답 인터페이스 (제네릭)
 */
export interface NotionQueryResponse<T = Record<string, unknown>> {
  object: "list";
  results: NotionPageResponse<T>[];
  next_cursor: string | null;
  has_more: boolean;
  [key: string]: unknown;
}
