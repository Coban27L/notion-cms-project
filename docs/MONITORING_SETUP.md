# 프로덕션 모니터링 및 에러 추적 설정

## 1. Sentry 설정 (에러 추적)

### 설치 및 기본 설정

Sentry를 통해 프로덕션 환경에서 발생하는 에러를 실시간으로 추적할 수 있습니다.

#### Step 1: Sentry 계정 생성

1. [Sentry.io](https://sentry.io) 접속
2. "Sign Up" 클릭
3. GitHub로 로그인 (권장)
4. 새로운 Organization 생성

#### Step 2: Next.js 프로젝트 생성

1. Sentry 대시보드에서 "Create Project"
2. Platform: **Next.js**
3. Alert me on every new issue 체크
4. Create Project

#### Step 3: 프로젝트 설정 획득

Projects → 프로젝트 선택 → Settings에서:
- **DSN 복사**: `https://<key>@<org>.ingest.sentry.io/<project>`
- **Auth Token**: (나중에 필요시)

### 코드 설정

#### next.config.ts에 Sentry 래퍼 추가

```bash
npm install @sentry/nextjs
```

```typescript
// next.config.ts
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = {
  // ... 기존 설정
  reactStrictMode: true,
  serverExternalPackages: ['@react-pdf/renderer'],
  headers: async () => {
    // ... 보안 헤더
  },
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG_SLUG,
  project: process.env.SENTRY_PROJECT_SLUG,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: false,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
```

#### 환경 변수 설정 (.env.production)

```
NEXT_PUBLIC_SENTRY_DSN=https://<key>@<org>.ingest.sentry.io/<project>
SENTRY_ORG_SLUG=<your-org-slug>
SENTRY_PROJECT_SLUG=<your-project-slug>
SENTRY_AUTH_TOKEN=<your-auth-token>
SENTRY_ENVIRONMENT=production
```

#### Sentry 초기화 (app/layout.tsx)

```typescript
import { useEffect } from 'react';

// Sentry 초기화는 자동으로 처리됨 (@sentry/nextjs)
// 추가 설정이 필요한 경우만 수동 추가

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ... 기존 코드
  );
}
```

### Sentry 설정 확인

배포 후 테스트:

```javascript
// 브라우저 콘솔에서 테스트
Sentry.captureException(new Error("Test error from console"));
```

Sentry 대시보드에서 에러가 나타나면 성공!

---

## 2. Vercel Analytics 설정

### Web Analytics

Vercel은 자동으로 Web Analytics를 수집합니다.

#### 활성화 확인

1. Vercel 프로젝트 → Analytics 탭
2. "Web Analytics" 섹션 확인
3. 자동 활성화됨 (별도 설정 불필요)

#### 모니터링 항목

- **Page Views**: 페이지 조회수
- **Unique Visitors**: 방문자 수
- **Page Load Time**: 페이지 로드 시간
- **Core Web Vitals**:
  - LCP (Largest Contentful Paint)
  - FID (First Input Delay)
  - CLS (Cumulative Layout Shift)

### Speed Insights

프로덕션 성능을 실시간으로 모니터링합니다.

#### 활성화 확인

1. Vercel 프로젝트 → Analytics 탭
2. "Speed Insights" 섹션 확인
3. 자동 활성화됨 (별도 설정 불필요)

#### 모니터링 항목

- **LCP**: 주요 콘텐츠 로드 시간 (목표 < 2.5s)
- **CLS**: 레이아웃 이동 (목표 < 0.1)
- **INP**: 상호작용 응답 시간 (목표 < 200ms)

---

## 3. API 응답 로깅

### 서버 사이드 로그 설정

#### lib/utils/logging.ts 생성

```typescript
// 구조화된 로깅
export function logApiCall(
  method: string,
  path: string,
  status: number,
  duration: number,
  errorMessage?: string
) {
  const timestamp = new Date().toISOString();
  const log = {
    timestamp,
    method,
    path,
    status,
    duration,
    ...(errorMessage && { error: errorMessage }),
  };

  console.log(JSON.stringify(log));
}

export function logNotionApiCall(
  operation: string,
  duration: number,
  success: boolean,
  errorMessage?: string
) {
  const timestamp = new Date().toISOString();
  const log = {
    timestamp,
    source: 'notion-api',
    operation,
    duration,
    success,
    ...(errorMessage && { error: errorMessage }),
  };

  console.log(JSON.stringify(log));
}
```

#### API 라우트에서 사용

```typescript
// app/api/quotes/route.ts
import { logApiCall } from '@/lib/utils/logging';

export async function GET(request: Request) {
  const startTime = Date.now();

  try {
    const quotes = await getAllQuotesWithCache();
    const duration = Date.now() - startTime;

    logApiCall('GET', '/api/quotes', 200, duration);
    return Response.json(quotes);
  } catch (error) {
    const duration = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    logApiCall('GET', '/api/quotes', 500, duration, errorMessage);
    return Response.json(
      { error: 'Failed to fetch quotes' },
      { status: 500 }
    );
  }
}
```

---

## 4. 성능 모니터링 전략

### 주요 사용자 플로우 추적

#### 1️⃣ 로그인 플로우
```
로그인 페이지 접근 → 자격증명 입력 → 제출 → 대시보드 리다이렉트
```

#### 2️⃣ 견적서 조회 플로우
```
대시보드 로드 → 목록 렌더링 → 상세 페이지 접근 → 콘텐츠 로드
```

#### 3️⃣ PDF 다운로드 플로우
```
다운로드 버튼 클릭 → API 요청 → PDF 생성 → 파일 다운로드
```

### Vercel Speed Insights 활용

```javascript
// 선택사항: 커스텀 메트릭 추가
import { sendWebVitals } from 'web-vitals';

sendWebVitals(metric => {
  console.log(metric);
  // Vercel로 자동 전송됨
});
```

---

## 5. 알림 규칙 설정

### Sentry 알림

#### 프로젝트 설정
1. Sentry 대시보드 → Alerts
2. "Create Alert Rule" 클릭
3. 설정:
   - **조건**: Error rate > 5% 또는 Error count > 10
   - **작업**: 이메일 알림 또는 Slack 연동

#### Slack 연동 (선택사항)
1. Sentry Integrations에서 Slack 추가
2. Slack 채널 선택
3. 에러 발생 시 Slack으로 알림 수신

### Vercel 알림

Vercel은 기본적으로 배포 실패 시 이메일 알림을 보냅니다.

---

## 6. 정기 점검 일정

### 📅 일일 점검 (자동화 권장)

```bash
# Vercel Function Logs 확인
# - 에러 발생 여부
# - API 응답 시간 이상

# Sentry 대시보드 확인
# - 새로운 에러 발생 여부
# - 에러 빈도 추이
```

### 📅 주간 점검 (자동화 + 수동)

```bash
# 성능 지표 확인
# - Core Web Vitals 평균값
# - 페이지 로드 시간 추이
# - 에러율 통계

# 노션 API 호출 분석
# - 일일 요청 수
# - 평균 응답 시간
# - 에러 빈도
```

### 📅 월간 점검 (보안 + 성능)

```bash
# 보안 업데이트 확인
npm audit

# 의존성 업데이트 확인
npm outdated

# 성능 리뷰
# - Lighthouse 점수 변화
# - Core Web Vitals 누적 통계
# - 사용자 피드백
```

---

## 7. 트러블슈팅

### Sentry 연동 안 됨

**증상**: Sentry 대시보드에 에러가 표시되지 않음

**해결책**:
1. `NEXT_PUBLIC_SENTRY_DSN` 환경 변수 확인
2. 프로덕션 빌드에서만 동작하는지 확인: `npm run build && npm run start`
3. 브라우저 콘솔에서 에러 메시지 확인
4. Sentry 대시보드에서 프로젝트 DSN 재확인

### 성능 지표 수집 안 됨

**증상**: Vercel Analytics에 Core Web Vitals가 표시되지 않음

**해결책**:
1. 배포 후 최소 24시간 대기
2. 충분한 트래픽 확보 필요 (최소 100 visits/day)
3. Vercel Analytics 탭에서 활성화 상태 확인

### API 로그 너무 많음

**해결책**:
1. 프로덕션에서만 상세 로그 기록
2. 일부 경로는 로깅 제외 (예: `/api/health`)
3. 로그 레벨 조정 (info, warn, error 구분)

---

## 8. 비용 추정

### Sentry
- **Free**: 5,000 이벤트/월
- **Professional**: $29/월부터 (100,000 이벤트/월)

### Vercel Analytics
- **Free**: 기본 분석 포함
- **Analytics Pro**: $12/월 (Advanced Analytics)

### 예상 월간 이벤트 (소규모 프로젝트)
- API 요청: ~1,000/월
- 에러: ~50/월
- 페이지 조회: ~5,000/월

**총합**: ~6,000 이벤트/월 → Sentry Free 플랜으로 충분

---

## 9. 모니터링 대시보드 구성

### Sentry 대시보드 (추천 보기)
1. **Issues**: 발생한 에러 목록
2. **Releases**: 배포 버전별 안정성
3. **Performance**: 느린 트랜잭션 분석
4. **Alerts**: 알림 규칙 관리

### Vercel 대시보드 (추천 보기)
1. **Analytics** → **Web Analytics**: 사용자 흐름
2. **Analytics** → **Speed Insights**: Core Web Vitals
3. **Deployments**: 배포 이력 및 상태
4. **Function Logs**: 서버 에러 로그

---

## 🎯 프로덕션 모니터링 완료 체크리스트

- [ ] Sentry 계정 생성
- [ ] Sentry Next.js 프로젝트 설정
- [ ] DSN 환경 변수 등록
- [ ] Sentry 초기화 코드 추가
- [ ] 에러 모니터링 테스트 완료
- [ ] Vercel Analytics 활성화 확인
- [ ] API 로깅 구현
- [ ] Slack 알림 연동 (선택)
- [ ] 일일 모니터링 프로세스 구축
- [ ] 주간/월간 리뷰 일정 수립

**이제 프로덕션 환경에서 안전하게 서비스를 운영할 수 있습니다! 🚀**
