/**
 * 로그인 요청 인터페이스
 */
export interface LoginRequest {
  /** 관리자 이메일 */
  email: string;
  /** 관리자 비밀번호 */
  password: string;
}

/**
 * 세션 인터페이스
 */
export interface Session {
  /** 세션 ID */
  id: string;
  /** 관리자 이메일 */
  email: string;
  /** 세션 만료 시간 (ISO 8601 형식) */
  expiresAt: string;
}

/**
 * 인증 오류 타입
 */
export type AuthErrorCode =
  | "INVALID_CREDENTIALS"
  | "SESSION_EXPIRED"
  | "UNAUTHORIZED";

/**
 * 인증 오류 인터페이스
 */
export interface AuthError {
  /** 오류 코드 */
  code: AuthErrorCode;
  /** 오류 메시지 */
  message: string;
}
