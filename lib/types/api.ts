/**
 * API 에러 정보 인터페이스
 */
export interface ErrorInfo {
  /** 에러 코드 (예: "NOTION_API_ERROR", "NOT_FOUND") */
  code: string;
  /** 사용자 친화적 에러 메시지 */
  message: string;
}

/**
 * 표준 API 응답 인터페이스
 * 모든 API 엔드포인트는 이 형식을 따름
 *
 * @template T 응답 데이터의 타입
 * @example
 * // 성공 응답
 * {
 *   success: true,
 *   data: { id: "123", title: "QT-2024-001", ... }
 * }
 *
 * // 실패 응답
 * {
 *   success: false,
 *   error: {
 *     code: "NOT_FOUND",
 *     message: "견적서를 찾을 수 없습니다"
 *   }
 * }
 */
export interface ApiResponse<T> {
  /** API 요청 성공 여부 */
  success: boolean;
  /** 응답 데이터 (성공 시에만 포함) */
  data?: T;
  /** 에러 정보 (실패 시에만 포함) */
  error?: ErrorInfo;
}

/**
 * API 응답 생성 유틸리티
 */
export const createApiResponse = {
  /**
   * 성공 응답 생성
   */
  success<T>(data: T): ApiResponse<T> {
    return { success: true, data };
  },

  /**
   * 실패 응답 생성
   */
  error(code: string, message: string): ApiResponse<never> {
    return { success: false, error: { code, message } };
  },
};
