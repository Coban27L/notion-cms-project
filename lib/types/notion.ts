/**
 * 노션 페이지 프로퍼티 인터페이스
 * 노션 데이터베이스의 각 필드를 나타냄
 */
export interface NotionPageProperties {
  /** 제목 필드 */
  Title: {
    id: string;
    type: 'title';
    title: Array<{
      plain_text: string;
      [key: string]: unknown;
    }>;
  };
  /** 클라이언트명 필드 */
  ClientName: {
    id: string;
    type: 'rich_text';
    rich_text: Array<{
      plain_text: string;
      [key: string]: unknown;
    }>;
  };
  /** 상태 필드 */
  Status: {
    id: string;
    type: 'select';
    select: {
      name: string;
      [key: string]: unknown;
    } | null;
  };
  /** 총액 필드 */
  TotalAmount: {
    id: string;
    type: 'number';
    number: number | null;
  };
  /** 발행일 필드 */
  IssuedDate: {
    id: string;
    type: 'date';
    date: {
      start: string;
      [key: string]: unknown;
    } | null;
  };
  /** 유효 기간 필드 */
  ValidUntil: {
    id: string;
    type: 'date';
    date: {
      start: string;
      [key: string]: unknown;
    } | null;
  };
  /** 공유 토큰 필드 */
  ShareToken: {
    id: string;
    type: 'rich_text';
    rich_text: Array<{
      plain_text: string;
      [key: string]: unknown;
    }>;
  };
  /** 항목 JSON 필드 */
  Items: {
    id: string;
    type: 'rich_text';
    rich_text: Array<{
      plain_text: string;
      [key: string]: unknown;
    }>;
  };
  /** 비고 필드 */
  Notes: {
    id: string;
    type: 'rich_text';
    rich_text: Array<{
      plain_text: string;
      [key: string]: unknown;
    }>;
  };
  [key: string]: unknown;
}

/**
 * 노션 페이지 응답 인터페이스
 */
export interface NotionPageResponse {
  object: 'page';
  id: string;
  created_time: string;
  last_edited_time: string;
  properties: NotionPageProperties;
  [key: string]: unknown;
}

/**
 * 노션 데이터베이스 쿼리 응답 인터페이스
 */
export interface NotionQueryResponse {
  object: 'list';
  results: NotionPageResponse[];
  next_cursor: string | null;
  has_more: boolean;
  [key: string]: unknown;
}
