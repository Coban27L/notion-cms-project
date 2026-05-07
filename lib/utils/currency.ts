/**
 * 통화 포맷 유틸리티
 * - 프로젝트 전역 통화 형식 통합 관리 (싱가포르 달러 기준)
 */

/**
 * 싱가포르 달러(S$) 형식으로 금액을 포맷합니다.
 * 소수점 2자리 고정 표시 (예: S$1,234.00)
 */
export function formatSGD(amount: number): string {
  return `S$${amount.toLocaleString("en-SG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * 한국 원화(원) 형식으로 금액을 포맷합니다.
 * 소수점 없이 정수 표시 (예: 1,234,000원)
 */
export function formatKRW(amount: number): string {
  return `${amount.toLocaleString("ko-KR")}원`;
}
