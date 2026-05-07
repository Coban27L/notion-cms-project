"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Core Web Vitals 측정 및 리포팅
 * - LCP (Largest Contentful Paint)
 * - FID/INP (First Input Delay / Interaction to Next Paint)
 * - CLS (Cumulative Layout Shift)
 */

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta?: number;
  id?: string;
}

/**
 * Core Web Vitals 기준값
 * https://web.dev/vitals/
 */
const THRESHOLDS = {
  LCP: { good: 2500, poorThreshold: 4000 },
  FID: { good: 100, poorThreshold: 300 },
  CLS: { good: 0.1, poorThreshold: 0.25 },
  INP: { good: 200, poorThreshold: 500 },
  TTFB: { good: 800, poorThreshold: 1800 },
};

/**
 * 메트릭 값에 따라 등급 판정
 */
function getRating(
  value: number,
  goodThreshold: number,
  poorThreshold: number,
): WebVitalsMetric["rating"] {
  if (value <= goodThreshold) return "good";
  if (value <= poorThreshold) return "needs-improvement";
  return "poor";
}

/**
 * Web Vitals 메트릭 콜렉트 (PerformanceObserver 사용)
 */
export function observeWebVitals(onMetric?: (metric: WebVitalsMetric) => void) {
  if (typeof window === "undefined") return;

  try {
    // PerformanceObserver 지원 확인
    if (!("PerformanceObserver" in window)) {
      console.warn("[Performance] PerformanceObserver는 지원되지 않습니다");
      return;
    }

    // LCP (Largest Contentful Paint)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;

        const metric: WebVitalsMetric = {
          name: "LCP",
          value: lastEntry.renderTime || lastEntry.loadTime,
          rating: getRating(
            lastEntry.renderTime || lastEntry.loadTime,
            THRESHOLDS.LCP.good,
            THRESHOLDS.LCP.poorThreshold,
          ),
          id: lastEntry.id || "lcp-" + Date.now(),
        };

        console.log(
          `[Core Web Vitals] ${metric.name}: ${metric.value.toFixed(0)}ms (${metric.rating})`,
        );
        onMetric?.(metric);
      });

      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
    } catch (e) {
      console.warn("[Performance] LCP 측정 불가:", e);
    }

    // CLS (Cumulative Layout Shift)
    try {
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }

        const metric: WebVitalsMetric = {
          name: "CLS",
          value: clsValue,
          rating: getRating(
            clsValue,
            THRESHOLDS.CLS.good,
            THRESHOLDS.CLS.poorThreshold,
          ),
          id: "cls-" + Date.now(),
        };

        console.log(
          `[Core Web Vitals] ${metric.name}: ${metric.value.toFixed(3)} (${metric.rating})`,
        );
        onMetric?.(metric);
      });

      clsObserver.observe({ entryTypes: ["layout-shift"] });
    } catch (e) {
      console.warn("[Performance] CLS 측정 불가:", e);
    }

    // INP (Interaction to Next Paint) / FID
    try {
      const inputObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const processingTime = (entry as any).processingDuration;
          const name = (entry as any).interactionId ? "INP" : "FID";

          const metric: WebVitalsMetric = {
            name,
            value: processingTime,
            rating: getRating(
              processingTime,
              name === "INP" ? THRESHOLDS.INP.good : THRESHOLDS.FID.good,
              name === "INP"
                ? THRESHOLDS.INP.poorThreshold
                : THRESHOLDS.FID.poorThreshold,
            ),
            id: `${name.toLowerCase()}-${Date.now()}`,
          };

          console.log(
            `[Core Web Vitals] ${metric.name}: ${metric.value.toFixed(0)}ms (${metric.rating})`,
          );
          onMetric?.(metric);
        }
      });

      inputObserver.observe({ entryTypes: ["first-input", "event"] });
    } catch (e) {
      console.warn("[Performance] INP/FID 측정 불가:", e);
    }
  } catch (error) {
    console.error("[Performance] Web Vitals 측정 초기화 실패:", error);
  }
}

/**
 * 성능 데이터 전송 (분석용)
 * @param metric Core Web Vitals 메트릭
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function sendMetricToAnalytics(metric: WebVitalsMetric) {
  // 프로덕션: Google Analytics, Sentry, DataDog 등으로 전송
  // 개발: 콘솔에만 출력

  if (process.env.NODE_ENV === "production") {
    // TODO: Sentry 또는 Google Analytics 통합
    // Example:
    // if (window.gtag) {
    //   window.gtag('event', 'web_vitals', {
    //     metric_id: metric.id,
    //     value: Math.round(metric.value),
    //     event_category: 'Web Vitals',
    //     event_label: metric.name,
    //   });
    // }
  }
}

/**
 * API 성능 측정 (fetch 래퍼)
 */
export async function fetchWithMetrics(
  url: string,
  options?: RequestInit,
): Promise<Response> {
  const startTime = performance.now();
  const response = await fetch(url, options);
  const duration = performance.now() - startTime;

  console.log(
    `[API Performance] ${options?.method || "GET"} ${url}: ${duration.toFixed(0)}ms`,
  );

  return response;
}
