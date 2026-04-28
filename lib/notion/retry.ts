/**
 * 지수 백오프를 사용한 재시도 로직
 * - 일시적 오류 자동 재시도
 * - Rate Limit 회피
 * - 네트워크 불안정 대응
 */

interface RetryOptions {
  maxRetries?: number;
  initialDelayMs?: number;
  backoffMultiplier?: number;
}

const DEFAULT_RETRY_OPTIONS: Required<RetryOptions> = {
  maxRetries: 3,
  initialDelayMs: 1000,
  backoffMultiplier: 2,
};

/**
 * 재시도 가능한 에러인지 판단
 * - 429 (Rate Limit): 재시도 가능
 * - 5xx (Server Error): 재시도 가능
 * - 4xx (Client Error): 재시도 불가
 */
function isRetryableError(error: any): boolean {
  if (error?.response?.status) {
    const status = error.response.status;
    return status === 429 || (status >= 500 && status < 600);
  }
  if (error?.code) {
    return ['ECONNREFUSED', 'ECONNRESET', 'ETIMEDOUT'].includes(error.code);
  }
  return false;
}

/**
 * 지수 백오프로 대기
 * @param attemptNumber 현재 시도 번호 (0부터 시작)
 * @param initialDelayMs 초기 지연(ms)
 * @param multiplier 지수 배수
 */
function getDelayMs(
  attemptNumber: number,
  initialDelayMs: number,
  multiplier: number
): number {
  const baseDelay = initialDelayMs * Math.pow(multiplier, attemptNumber);
  // 지터(jitter) 추가: ±20%
  const jitter = baseDelay * (Math.random() * 0.4 - 0.2);
  return Math.max(0, Math.floor(baseDelay + jitter));
}

/**
 * 재시도 로직을 적용한 함수 래퍼
 * @param fn 실행할 함수
 * @param options 재시도 옵션
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const { maxRetries, initialDelayMs, backoffMultiplier } = {
    ...DEFAULT_RETRY_OPTIONS,
    ...options,
  };

  let lastError: any;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // 마지막 시도면 바로 throw
      if (attempt === maxRetries) {
        throw error;
      }

      // 재시도 불가능한 에러면 바로 throw
      if (!isRetryableError(error)) {
        throw error;
      }

      // 지수 백오프로 대기 후 재시도
      const delayMs = getDelayMs(attempt, initialDelayMs, backoffMultiplier);
      const errorMsg = (error as any)?.message || String(error);
      console.log(
        `[Retry] 시도 ${attempt + 1}/${maxRetries + 1} 실패, ${delayMs}ms 후 재시도: ${errorMsg}`
      );

      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  throw lastError;
}

/**
 * Notion API 응답에서 Rate Limit 정보 추출
 * @param response Notion API 응답
 * @returns 남은 요청 수
 */
export function getRateLimitRemaining(response: any): number | null {
  return response?.headers?.['x-ratelimit-remaining']
    ? parseInt(response.headers['x-ratelimit-remaining'], 10)
    : null;
}

/**
 * Rate Limit 여유가 부족하면 지연
 * @param remaining 남은 요청 수
 * @param threshold 임계값 (이 이상이면 지연)
 */
export async function handleRateLimitWarning(
  remaining: number | null,
  threshold: number = 5
): Promise<void> {
  if (remaining !== null && remaining < threshold) {
    const delayMs = 5000; // 5초 대기
    console.warn(
      `[RateLimit] 남은 요청: ${remaining}개, ${delayMs}ms 대기`
    );
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
}
