import { toast } from "sonner";

/**
 * 토스트 알림 통합 유틸리티
 * - 프로젝트 전역 토스트 메시지 일관성 유지
 * - sonner 라이브러리 래퍼로 메시지/스타일 중앙 관리
 * - 모든 사용자 액션 피드백에 이 유틸 사용
 */

/**
 * 공유 링크 복사 성공 토스트
 * - ShareLinkButton 컴포넌트에서 사용
 */
export function showCopySuccess() {
  toast.success("공유 링크가 복사되었습니다", {
    description: "클라이언트에게 링크를 전달해보세요.",
    duration: 3000,
  });
}

/**
 * 공유 링크 복사 실패 토스트
 * - 클립보드 API 오류 시 사용
 */
export function showCopyError() {
  toast.error("링크 복사에 실패했습니다", {
    description: "브라우저 클립보드 권한을 확인해주세요.",
    duration: 4000,
  });
}

/**
 * PDF 다운로드 시작 토스트
 * - PDF 생성 트리거 시 즉시 표시
 */
export function showDownloadStart() {
  toast.info("PDF 다운로드를 시작합니다", {
    description: "잠시만 기다려주세요.",
    duration: 3000,
  });
}

/**
 * PDF 다운로드 완료 토스트
 */
export function showDownloadSuccess(filename?: string) {
  toast.success("PDF 다운로드 완료", {
    description: filename ? `${filename} 파일이 저장되었습니다.` : undefined,
    duration: 4000,
  });
}

/**
 * PDF 다운로드 실패 토스트
 * - PDF 생성 API 오류 시 사용
 */
export function showDownloadError(detail?: string) {
  toast.error("PDF 다운로드에 실패했습니다", {
    description: detail ?? "잠시 후 다시 시도해주세요.",
    duration: 5000,
  });
}

/**
 * API 에러 토스트
 * - 노션 API 호출 실패 등 일반 API 에러에 사용
 * @param message - 에러 메시지 (기본값 제공)
 */
export function showApiError(message?: string) {
  toast.error(message ?? "서버에서 데이터를 가져오는 데 실패했습니다", {
    description: "네트워크 연결을 확인하거나 잠시 후 다시 시도해주세요.",
    duration: 5000,
  });
}

/**
 * 로딩 인디케이터 토스트
 * - 비동기 작업 시작 시 표시, 완료 후 dismiss 필요
 * @returns toast ID (dismiss 시 사용)
 */
export function showLoadingToast(message = "처리 중입니다...") {
  return toast.loading(message);
}

/**
 * 특정 토스트 닫기
 * - showLoadingToast로 표시한 토스트 완료 후 닫을 때 사용
 * @param toastId - showLoadingToast의 반환값
 */
export function dismissToast(toastId: string | number) {
  toast.dismiss(toastId);
}

/**
 * 일반 성공 토스트 (범용)
 */
export function showSuccess(message: string, description?: string) {
  toast.success(message, {
    description,
    duration: 3000,
  });
}

/**
 * 일반 에러 토스트 (범용)
 */
export function showError(message: string, description?: string) {
  toast.error(message, {
    description,
    duration: 5000,
  });
}
