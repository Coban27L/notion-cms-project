# 보안 및 성능 감사 보고서

## 개요

이 문서는 노션 CMS 견적서 시스템의 보안 및 성능 감사 결과를 정리합니다.

## 1. 보안 감사 (OWASP Top 10)

### A01: 접근 제어 결함 (Access Control Broken)

- ✅ **미들웨어 기반 라우트 보호**: `/dashboard`는 next-auth 미들웨어로 보호
  - 비로그인 사용자는 `/login`으로 자동 리디렉션
  - 세션 검증 통과 후에만 접근 가능
- ✅ **공개 페이지**: `/`, `/about`, `/privacy`, `/terms`, `/quotes/[token]` 공개 접근
- ✅ **토큰 기반 접근**: 공유 토큰으로 인증 없이 견적서 조회 가능

### A02: 암호화 실패 (Cryptographic Failures)

- ✅ **세션 보안**:
  - `NEXTAUTH_SECRET`: 환경 변수로 안전하게 관리
  - 세션 쿠키: HttpOnly, Secure, SameSite=Lax 자동 설정
  - 프로덕션에서 HTTPS 필수 (NEXTAUTH_URL는 https://)
- ✅ **환경 변수**: 민감한 정보 (.env.local, .env.production) Git 제외
  - `NOTION_API_KEY`, `ADMIN_PASSWORD`, `NEXTAUTH_SECRET` 등

### A03: 인젝션 (Injection)

- ✅ **XSS 방지**:
  - 사용자 입력 검증: react-hook-form + zod 스키마 검증
  - 렌더링: 자동 이스케이프 처리 (React의 기본 동작)
  - `dangerouslySetInnerHTML` 사용 금지
- ✅ **NoSQL 인젝션**: 노션 API 요청은 공식 클라이언트 라이브러리 사용
- ✅ **API 입력 검증**: `app/api/quotes/[token]/route.ts`에서 토큰 검증

### A05: 보안 설정 오류 (Security Misconfiguration)

- ✅ **개발/프로덕션 분리**:
  - `NODE_ENV` 환경 변수로 모드 구분
  - 프로덕션에서 디버그 모드 비활성화
  - 프로덕션 빌드: 소스맵 미포함
- ✅ **오류 메시지**: 내부 구현 세부정보 노출 금지
  - API 에러는 제네릭 메시지만 반환
  - 상세 로그는 서버 로그에만 기록

### A07: 인증 실패 (Authentication Failure)

- ✅ **로그인 시도 제한**:
  - 클라이언트 사이드: 폼 제출 중 버튼 비활성화
  - 서버 사이드: rate limiting (Vercel Edge Functions 사용 권장)
- ✅ **세션 만료**:
  - 기본 세션 유효 기간: 30일 (auth.ts 설정 가능)
  - 로그아웃: 세션 즉시 무효화

### A09: 로깅 및 모니터링 실패 (Logging & Monitoring Failures)

- ✅ **API 호출 로깅**:
  - 노션 API 호출 시 요청/응답 로그 기록
  - 에러 발생 시 에러 코드 및 메시지 로그
- ✅ **모니터링**: Sentry 통합 권장 (Task 014에서 구현)

## 2. 보안 헤더

### 구현된 보안 헤더

```typescript
// next.config.ts에서 설정
{
  'X-Content-Type-Options': 'nosniff',      // MIME 타입 스니핑 방지
  'X-Frame-Options': 'DENY',                // 클릭재킹 방지
  'X-XSS-Protection': '1; mode=block',      // 구형 브라우저 XSS 방지
  'Referrer-Policy': 'strict-origin-when-cross-origin', // Referer 정보 제어
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()', // 권한 제한
}
```

### 추가 권장 헤더 (프로덕션)

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Content-Security-Policy: default-src 'self'; script-src 'self'; img-src 'self' https:; connect-src 'self' https://api.notion.com
```

## 3. CORS 정책

- ✅ **API 라우트**: Same-origin only (CORS 헤더 미설정)
  - 클라이언트 사이드에서만 API 호출 가능
- ✅ **노션 API**: 서버 사이드에서만 호출
  - API 키는 클라이언트에 노출되지 않음

## 4. 환경 변수 관리

### 필수 환경 변수

| 변수명               | 용도            | 노출 범위         |
| -------------------- | --------------- | ----------------- |
| `NOTION_API_KEY`     | 노션 API 인증   | 서버 전용         |
| `NOTION_DATABASE_ID` | 견적서 DB ID    | 서버 전용         |
| `ADMIN_EMAIL`        | 관리자 이메일   | 서버 전용         |
| `ADMIN_PASSWORD`     | 관리자 비밀번호 | 서버 전용         |
| `NEXTAUTH_SECRET`    | 세션 암호화     | 서버 전용         |
| `NEXTAUTH_URL`       | 인증 URL        | 서버 + 클라이언트 |

### 검증 규칙

- `NEXT_PUBLIC_*` 변수에는 민감 정보 포함 금지
- 프로덕션에서 `NEXTAUTH_SECRET`은 안전한 난수값 필수
- `.env.local`과 `.env.production`은 Git에서 제외

## 5. SSL/TLS 설정

- ✅ **Vercel**: 자동 SSL 인증서 발급 및 갱신
- ✅ **HSTS**: Strict-Transport-Security 헤더 추가 권장
- ✅ **프로토콜**: 모든 HTTP 요청은 HTTPS로 자동 리다이렉트

## 6. Core Web Vitals 측정

### 타겟 점수

| 지표                                                    | 타겟    | 의미                   |
| ------------------------------------------------------- | ------- | ---------------------- |
| LCP (Largest Contentful Paint)                          | < 2.5s  | 주요 콘텐츠 로드 시간  |
| FID/INP (First Input Delay / Interaction to Next Paint) | < 200ms | 사용자 상호작용 응답성 |
| CLS (Cumulative Layout Shift)                           | < 0.1   | 레이아웃 안정성        |

### 최적화 항목

- ✅ **폰트**: @fontsource/noto-sans-kr 서브셋 적용
- ✅ **이미지**: next/image 자동 최적화 활성화 (Task 012에서 준비)
- ✅ **번들 분석**: 필요시 `@next/bundle-analyzer` 사용
- ✅ **캐싱**:
  - 노션 API 응답: 1시간 캐시 (getAllQuotesWithCache)
  - 견적서 상세: 24시간 ISR (generateStaticParams)

## 7. 컨텐츠 보안 정책 (CSP)

### 프로덕션에서 권장 설정

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://cdn.vercel-insights.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' https: data:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://api.notion.com https://vitals.vercel-analytics.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self'
```

## 8. 보안 체크리스트

### 개발 단계

- [x] 환경 변수 검증 스크립트 작성
- [x] 보안 헤더 설정 (X-Frame-Options, X-Content-Type-Options 등)
- [x] 미들웨어 기반 라우트 보호 설정
- [x] API 입력 검증 (zod)
- [x] HTTPS 리다이렉트 설정

### 배포 전

- [ ] `NEXTAUTH_SECRET` 생성: `openssl rand -base64 32`
- [ ] `NEXTAUTH_URL` 설정: 프로덕션 도메인 확인
- [ ] 환경 변수 Vercel에 등록 (절대 Git에 커밋하지 않기)
- [ ] Lighthouse 보안 점수 검증 (90점 이상)
- [ ] SSL Labs 점수 확인 (A 등급 이상)
- [ ] OWASP ZAP 또는 Burp Suite 취약점 스캔

### 배포 후

- [ ] Sentry 모니터링 활성화
- [ ] 에러 로그 확인
- [ ] 성능 지표 (Core Web Vitals) 모니터링
- [ ] 월별 보안 업데이트 확인

## 9. 참고 문서

- [Next.js 16 보안 모범 사례](https://nextjs.org/docs/security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web Fundamentals - Security](https://web.dev/security/)
- [next-auth 보안 고려사항](https://next-auth.js.org/getting-started/example)
