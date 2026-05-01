# 노션 CMS 견적서 시스템 개발 로드맵

노션을 CMS로 활용하여 견적서를 발행하고, 클라이언트가 고유 링크로 웹에서 확인 및 PDF로 다운로드할 수 있는 시스템입니다.

## 개요

노션 CMS 견적서 시스템은 **1인 프리랜서 및 소규모 팀**을 위한 **노션 기반 견적서 발행 및 공유 플랫폼**으로 다음 기능을 제공합니다:

- **노션 기반 콘텐츠 관리**: 노션 DB에서 견적서를 작성하면 웹에서 자동 렌더링
- **고유 링크 공유**: UUID 토큰 기반 URL로 클라이언트가 인증 없이 견적서 열람
- **PDF 다운로드**: 견적서를 PDF로 변환하여 저장 및 인쇄 가능
- **관리자 대시보드**: 환경 변수 기반 인증으로 보호되는 견적서 목록 관리 허브

## 개발 워크플로우

1. **작업 계획**

- 기존 코드베이스를 학습하고 현재 상태를 파악
- 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
- 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**

- 기존 코드베이스를 학습하고 현재 상태를 파악
- `/tasks` 디렉토리에 새 작업 파일 생성
- 명명 형식: `XXX-description.md` (예: `001-setup.md`)
- 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
- **API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함 (Playwright MCP 테스트 시나리오 작성)**
- 예시를 위해 `/tasks` 디렉토리의 마지막 완료된 작업 참조. 예를 들어, 현재 작업이 `012`라면 `011`과 `010`을 예시로 참조.
- 이러한 예시들은 완료된 작업이므로 내용이 완료된 작업의 최종 상태를 반영함 (체크된 박스와 변경 사항 요약). 새 작업의 경우, 문서에는 빈 박스와 변경 사항 요약이 없어야 함. 초기 상태의 샘플로 `000-sample.md` 참조.

3. **작업 구현**

- 작업 파일의 명세서를 따름
- 기능과 기능성 구현
- **API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트 수행 필수**
- 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
- 구현 완료 후 Playwright MCP를 사용한 E2E 테스트 실행
- 테스트 통과 확인 후 다음 단계로 진행
- 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**

- 로드맵에서 완료된 작업을 완료 표시로 변경

## 개발 단계

### Phase 1: 애플리케이션 골격 구축

- ✅ **Task 001: 프로젝트 구조 및 라우팅 설정** (작업 파일: tasks/001-routing-setup.md)
  - Next.js 16 App Router 기반 전체 라우트 구조 생성 ✅
    - `/app/page.tsx` (랜딩 페이지 골격)
    - `/app/login/page.tsx` (로그인 페이지 골격)
    - `/app/dashboard/page.tsx` (대시보드 골격)
    - `/app/quotes/[token]/page.tsx` (견적서 상세 페이지 골격)
    - `/app/not-found.tsx` (404 페이지)
  - 공통 레이아웃 컴포넌트 골격 구현 ✅ (`components/layout/header.tsx`, `footer.tsx`)
  - 환경 변수 템플릿 파일 ✅ (`.env.example`)
    - `NOTION_API_KEY`, `NOTION_DATABASE_ID`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
  - 헤더 네비게이션 조건부 렌더링 구조 ✅ (로그인/비로그인)

- ✅ **Task 002: 타입 정의 및 인터페이스 설계** (작업 파일: tasks/002-type-definitions.md)
  - 견적서 도메인 타입 정의 ✅ (`lib/types/quote.ts`)
    - `Quote` 인터페이스 (title, client_name, status, total_amount, issued_date, valid_until, share_token, items, notes)
    - `QuoteItem` 인터페이스 (name, quantity, unit_price, amount)
    - `QuoteStatus` 유니온 타입 ('발행' | '승인' | '취소')
  - 노션 API 응답 매퍼 타입 ✅ (`lib/types/notion.ts`)
  - 인증 관련 타입 정의 ✅ (`lib/types/auth.ts`)
  - API 응답 공통 타입 ✅ (`lib/types/api.ts`) - 성공/실패 응답 표준 스키마

### Phase 2: UI/UX 완성 (더미 데이터 활용)

- ✅ **Task 003: 공통 컴포넌트 및 디자인 시스템 구축** (작업 파일: tasks/003-design-system.md)
  - shadcn/ui 필수 컴포넌트 추가 ✅ (Button, Card, Input, Label, Table, Badge, Select, Form, Dialog, Toast)
  - 견적서 도메인 컴포넌트 구현 ✅ (`components/quote/`)
    - `QuoteCard` (대시보드 목록용)
    - `QuoteHeader` (발행일, 번호, 클라이언트명, 유효기간)
    - `QuoteItemsTable` (품목, 수량, 단가, 금액)
    - `QuoteSummary` (소계, 세금, 합계)
    - `QuoteStatusBadge` (상태 배지)
  - 더미 데이터 생성 유틸리티 작성 ✅ (`lib/mock/quotes.ts`)
  - 공유 링크 복사 버튼 컴포넌트 ✅ (`components/quote/share-link-button.tsx`)
  - 반응형 스타일 가이드 및 디자인 토큰 확립 ✅ (`lib/constants/design-tokens.ts`)

- ✅ **Task 004: 모든 페이지 UI 완성 (더미 데이터 기반)** (작업 파일: tasks/004-page-ui-completion.md)
  - 랜딩 페이지 UI 완성 ✅ (서비스 설명, 관리자 로그인 버튼)
  - 로그인 페이지 UI 완성 ✅ (react-hook-form + zod 유효성 검사 스키마 정의, 에러 메시지 UI)
  - 대시보드 UI 완성 ✅ (견적서 카드 그리드, 상태 필터 전체/발행/승인/취소, 공유 링크 복사 버튼)
  - 견적서 상세 페이지 UI 완성 ✅ (헤더, 항목 테이블, 합계, PDF 다운로드 버튼 placeholder)
  - 404 페이지 UI 완성 ✅ ("견적서를 찾을 수 없습니다" 안내, 홈 이동 버튼)
  - 반응형 디자인 및 모바일 최적화 ✅ (모바일/태블릿/데스크톱)
  - 사용자 플로우 및 네비게이션 검증 ✅

- ✅ **Task 004 후속: UI/UX 컴포넌트 강화** (ui-markup-specialist 연속 구현)
  - 스켈레톤 UI ✅ (`components/quote/quote-skeleton.tsx`, `components/dashboard/quote-card-skeleton.tsx`)
    - 페이지 로딩 상태 `Suspense` + fallback 적용
  - Empty State UI 강화 ✅ (`components/dashboard/empty-state.tsx`, `components/quote/empty-items-state.tsx`)
    - 필터링 결과 없을 때도 대응
  - 에러 바운더리 ✅ (`components/error/api-error-card.tsx`, `app/error.tsx`, `app/quotes/[token]/error.tsx`)
    - 재시도 버튼, 홈 이동 버튼 포함
  - 토스트 알림 표준화 ✅ (`lib/utils/toast-notifications.ts`)
    - 8개 표준 함수 (복사, 다운로드, API 에러 등)
  - 모바일 반응형 최적화 ✅ (`components/quote/quote-item-card.tsx`)
    - 듀얼 뷰: 모바일 카드 ↔ 데스크톱 테이블 자동 전환
  - 마이크로 인터랙션 ✅ (아이콘 애니메이션, 색상 트랜지션, 호버 효과)
  - 버그 수정 ✅ (라우팅 버그, 접근성 위반, 다크모드 색상)
  - 코드 품질 개선 ✅ (통화 포맷 유틸 통합, 소계 이중 표시 제거)

### Phase 3: 핵심 기능 구현

- ✅ **Task 005: 노션 API 연동 및 데이터 계층 구현**
  - ✅ `@notionhq/client` 의존성 설치 및 초기화 (`lib/notion/client.ts`)
  - ✅ 노션 DB 스키마 검증 유틸리티 작성
  - ✅ 노션 API 래퍼 함수 구현 (`lib/notion/queries.ts`)
    - ✅ `getAllQuotes()` - 전체 견적서 목록 조회
    - ✅ `getQuoteByToken(token: string)` - 공유 토큰 기반 단건 조회
    - ✅ `getQuoteById(id: string)` - ID 기반 단건 조회
  - ✅ 노션 응답 데이터 매퍼 (`lib/notion/mappers.ts`) - 노션 properties를 도메인 타입으로 변환
  - ✅ 견적 항목 JSON 파서 (`items` Rich Text 필드 파싱)
  - ✅ 에러 핸들링 (노션 API 장애, 토큰 불일치, 네트워크 오류)
  - ✅ API Route 구현 (`app/api/quotes/route.ts`, `app/api/quotes/[token]/route.ts`)
  - ✅ 더미 데이터를 실제 노션 API 호출로 교체
  - ✅ Playwright MCP를 활용한 API 엔드포인트 통합 테스트
    - ✅ 정상 토큰 접근 시 견적서 반환 검증
    - ✅ 잘못된 토큰 접근 시 404 반환 검증
    - ✅ 목록 API 응답 구조 검증

- ✅ **Task 006: 관리자 인증 시스템 구현 (next-auth v5)**
  - ✅ `next-auth@beta` 의존성 설치 및 설정 (`auth.ts`, `middleware.ts`)
  - ✅ Credentials Provider 구성 (환경 변수 기반 이메일/비밀번호 검증)
  - ✅ `ADMIN_PASSWORD` 평문 저장 (개발 환경) - 프로덕션에서는 해싱 권장
  - ✅ 로그인 API Route 및 세션 생성 로직
  - ✅ 보호 라우트 미들웨어 (`/dashboard` 접근 시 비로그인은 `/login`으로 리디렉션)
  - ✅ 로그아웃 기능 구현
  - ✅ 헤더 네비게이션 로그인 상태 연동
  - ✅ Playwright MCP로 인증 플로우 E2E 테스트
    - ✅ 유효한 자격증명 로그인 성공 검증
    - ✅ 잘못된 자격증명 에러 메시지 검증
    - ✅ 비로그인 대시보드 접근 시 리디렉션 검증
    - ✅ 로그아웃 후 세션 만료 검증

- ✅ **Task 007: 고유 링크 및 토큰 기반 접근 제어 구현**
  - ✅ 공유 토큰 검증 로직 (`app/quotes/[token]/page.tsx`)
  - ✅ 존재하지 않거나 만료된 토큰 처리 (notFound() 호출)
  - ✅ 공유 링크 URL 생성 유틸리티 (`lib/utils/share-link.ts`)
  - ✅ 대시보드 견적서 카드에서 공유 링크 복사 기능 완성 (clipboard API + sonner 토스트)
  - ✅ SSR/SSG 전략 결정 (매 요청마다 최신 데이터 반영 위해 dynamic rendering)
  - ✅ Playwright MCP로 공유 링크 플로우 E2E 테스트
    - ✅ 복사된 링크로 비로그인 접근 시 정상 렌더링 검증
    - ✅ 잘못된 토큰 URL 접근 시 404 페이지 검증

- ✅ **Task 008: PDF 다운로드 기능 구현**
  - ✅ `@react-pdf/renderer` 의존성 설치
  - ✅ PDF 문서 컴포넌트 설계 (`components/pdf/quote-document.tsx`)
    - ✅ 헤더 (견적서 번호, 발행일, 클라이언트명)
    - ✅ 항목 테이블 (품목, 수량, 단가, 금액)
    - ✅ 합계 영역 (소계, 세금, 합계)
    - ✅ 비고 영역
  - ✅ 한글 폰트 임베딩 (Noto Sans KR)
  - ✅ PDF 생성 API Route (`app/api/quotes/[token]/pdf/route.tsx`)
  - ✅ 다운로드 버튼과 PDF 생성 로직 통합 (`components/quote/pdf-download-button.tsx`)
  - ✅ 파일명 규칙 ("QT-발행일-견적번호_클라이언트명.pdf")
  - 🔄 Playwright MCP로 PDF 다운로드 E2E 테스트 (진행 중)
    - 테스트 토큰 업데이트 완료
    - 일부 테스트 통과

- ✅ **Task 008-1: 핵심 기능 통합 테스트**
  - ✅ Playwright MCP를 사용한 전체 사용자 플로우 테스트 (17/17 통과)
    - ✅ 관리자 플로우: 로그인 → 대시보드 → 견적서 상세 → PDF 다운로드
    - ✅ 클라이언트 플로우: 고유 링크 접속 → 견적서 확인 → PDF 다운로드
  - ✅ 노션 API 연동과 UI 렌더링 통합 검증
  - ✅ 상태 필터링 (전체/발행/승인/취소) 동작 검증
  - ✅ 에러 핸들링 및 엣지 케이스 테스트
    - ✅ Mock data fallback (Notion API 실패 시)
    - ✅ 빈 견적서 목록 처리
    - ✅ 토큰 검증 및 404 페이지
    - ✅ 빠른 연속 클릭 처리

### Phase 4: 고급 기능 및 배포 준비

- ✅ **Task 009: 사용자 경험 향상 및 UI 개선**
  - ✅ 로딩 상태 및 스켈레톤 UI (QuoteDetailSkeleton, QuoteCardSkeleton)
  - ✅ 빈 상태(Empty State) UI (DashboardEmptyState, EmptyItemsState)
  - ✅ 에러 바운더리 구현 (app/error.tsx, ApiErrorCard)
  - ✅ 토스트 알림 표준화 (8개 표준 함수, 모든 액션 피드백)
  - ✅ 다크/라이트 모드 테마 완성 (next-themes)
  - ✅ 모바일 반응형 최적화 (모바일 카드/데스크톱 테이블 자동 전환)
  - ✅ E2E 테스트 검증 (17/17 통과)

- **Task 010: 성능 최적화 및 캐싱 전략**
  - 노션 API 응답 캐싱 전략 수립 (Next.js `revalidate`, `unstable_cache`)
  - 견적서 상세 페이지 SSG/ISR 검토 (공유 토큰별 정적 생성)
  - 이미지 최적화 및 폰트 서브셋 적용
  - Lighthouse 점수 측정 및 개선
  - 번들 사이즈 분석 및 코드 스플리팅

- **Task 011: 배포 준비 및 운영 환경 구성**
  - Vercel 배포 설정 및 환경 변수 구성
    - `NOTION_API_KEY`, `NOTION_DATABASE_ID`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
    - `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
  - 프로덕션 빌드 검증 (`npm run build`)
  - `robots.txt` 및 `sitemap.xml` 구성 (관리자 경로 및 공유 토큰 경로 제외)
  - 개인정보 보호 정책 및 이용약관 페이지 컨텐츠 업데이트
  - README.md 사용 가이드 작성 (노션 DB 스키마 셋업 방법 포함)
  - 보안 체크 (env 노출 방지, CSRF 대비, next-auth 세션 설정)
  - 모니터링 및 로깅 전략 (Vercel Analytics, 노션 API 호출 로깅)

### Phase 5: SEO 최적화 및 프로덕션 배포

- **Task 012: SEO 최적화**
  - 메타 태그 최적화
    - Open Graph 태그 구성 (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`)
    - Twitter Card 태그 구성 (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
    - Next.js 16 `generateMetadata` API를 활용한 동적 메타데이터 생성
  - 구조화된 데이터 (Schema.org JSON-LD) 구현
    - 랜딩 페이지에 `Organization` / `WebSite` 스키마 적용
    - 견적서 상세 페이지에 `Invoice` 또는 `Offer` 스키마 적용 (공유 페이지 한정)
    - `BreadcrumbList` 스키마로 네비게이션 경로 노출
  - 사이트맵 및 robots.txt 동적 생성
    - `app/sitemap.ts`로 공개 경로만 포함한 사이트맵 자동 생성
    - `app/robots.ts`로 `/dashboard`, `/api`, `/quotes/[token]` 크롤링 차단
    - 관리자/공유 토큰 경로는 `noindex, nofollow` 메타 태그 적용
  - 페이지별 메타 데이터 설정
    - 랜딩/로그인/대시보드/견적서 상세/404 페이지 각각 title 템플릿 및 description 정의
    - 언어 설정 (`lang="ko"`) 및 canonical URL 지정
  - 멀티미디어 최적화
    - `next/image` 기반 이미지 lazy loading 및 WebP/AVIF 변환
    - `next/font`로 Noto Sans KR 서브셋 적용 및 FOUT 방지
    - OG 이미지 동적 생성 (`app/opengraph-image.tsx`)
  - 모바일 친화성 검증
    - Google Mobile-Friendly Test 통과 확인
    - 뷰포트 메타 태그, 터치 타겟 크기(44px 이상), 폰트 크기 검증
    - Playwright MCP로 다양한 디바이스 뷰포트 렌더링 E2E 테스트

- **Task 013: 보안 및 성능 감사**
  - OWASP Top 10 보안 체크
    - A01 접근 제어 결함: 보호 라우트 미들웨어 재검증
    - A02 암호화 실패: 비밀번호 해싱, 세션 쿠키 Secure/HttpOnly/SameSite 검증
    - A03 인젝션: 노션 API 요청 파라미터 검증, XSS 방지 (`dangerouslySetInnerHTML` 사용 금지)
    - A05 보안 설정 오류: 프로덕션 환경에서 디버그 모드 비활성화
    - A07 인증 실패: 로그인 시도 제한(rate limiting), 세션 만료 정책
  - SSL/TLS 검증
    - Vercel 자동 발급 SSL 인증서 유효성 확인
    - HSTS 헤더 설정 (`Strict-Transport-Security: max-age=31536000; includeSubDomains`)
    - SSL Labs 스캔 A 등급 이상 확보
  - CORS 정책 검증
    - API Route `Access-Control-Allow-Origin` 화이트리스트 구성
    - Preflight 요청 처리 및 허용 메소드 최소화
  - 환경 변수 노출 방지
    - `NEXT_PUBLIC_` 접두사 미사용 민감 정보 클라이언트 번들 제외 검증
    - `.env.local`, `.env.production` Git ignore 확인
    - Vercel 환경 변수 대시보드에서 production/preview/development 분리
  - 콘텐츠 보안 정책(CSP) 설정
    - `Content-Security-Policy` 헤더 구성 (`default-src 'self'`, `script-src`, `img-src`, `connect-src`)
    - 노션 API 도메인 및 Vercel Analytics 도메인 허용 목록 추가
    - CSP Report-Only 모드 검증 후 enforce 전환
    - 추가 보안 헤더 (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`)
  - 성능 프로파일링 (Core Web Vitals)
    - LCP (Largest Contentful Paint) 2.5초 이하 달성
    - FID/INP (Interaction to Next Paint) 200ms 이하 달성
    - CLS (Cumulative Layout Shift) 0.1 이하 달성
    - Lighthouse CI로 배포 시마다 자동 측정
    - Playwright MCP로 주요 페이지 성능 지표 수집 및 회귀 테스트

- **Task 014: 프로덕션 배포**
  - Vercel 최종 설정 및 배포
    - 프로덕션 프로젝트 생성 및 GitHub 연동
    - 빌드 명령어 및 출력 디렉토리 설정 확인
    - Edge/Serverless 함수 리전 설정 (서울 `icn1` 권장)
    - 프리뷰 배포 환경 구성 및 브랜치 보호 규칙 설정
  - 도메인 연결 및 SSL 인증서
    - 커스텀 도메인 DNS (A/CNAME) 레코드 설정
    - Vercel 자동 SSL 인증서 발급 및 갱신 확인
    - `www` 및 루트 도메인 리디렉션 정책 결정
  - CI/CD 파이프라인 구성
    - GitHub Actions 워크플로우 작성 (`.github/workflows/ci.yml`)
    - 린트 (`npm run lint`), 타입체크 (`tsc --noEmit`), 빌드 (`npm run build`) 단계
    - Playwright MCP E2E 테스트 단계 (PR 머지 전 필수 통과)
    - main 브랜치 푸시 시 Vercel 자동 배포 트리거
  - 모니터링 및 로깅 설정
    - Sentry 통합 (`@sentry/nextjs`) 및 DSN 환경 변수 등록
    - Sentry source map 업로드 자동화
    - Vercel Analytics 활성화 (Web Analytics + Speed Insights)
    - 노션 API 호출 로그 구조화 (요청 ID, 응답 시간, 에러 코드)
  - 에러 추적 및 성능 모니터링
    - 클라이언트/서버 에러 Sentry 자동 캡처
    - 주요 사용자 플로우 (로그인, PDF 다운로드, 공유 링크 접근) 커스텀 트랜잭션 측정
    - 알림 규칙 구성 (에러율 임계값 초과 시 이메일/Slack 알림)
    - Playwright MCP로 프로덕션 스모크 테스트 시나리오 실행
  - 백업 및 복구 계획
    - 노션 DB 주기적 백업 전략 (노션 내장 내보내기 또는 별도 스크립트)
    - 환경 변수 백업 (1Password 등 비밀 관리 도구 활용)
    - 롤백 절차 문서화 (Vercel Deployment 이전 버전 승격)
    - 장애 대응 런북 (`docs/RUNBOOK.md`) 작성

## 참고: PRD 기능 ↔ Task 매핑

| PRD 기능 ID | 기능명 | 관련 Task |
|------------|-------|----------|
| F001 | 노션 견적서 조회 | Task 005 |
| F002 | 견적서 목록 조회 | Task 004 (UI), Task 005 (API) |
| F003 | 고유 링크 견적서 접근 | Task 007 |
| F004 | PDF 다운로드 | Task 008 |
| F005 | 관리자 인증 | Task 006 |

## 의존성 다이어그램

```
✅ Task 001 (라우팅 골격)
    └── ✅ Task 002 (타입 정의)
            └── ✅ Task 003 (컴포넌트 라이브러리)
                    └── ✅ Task 004 (페이지 UI + 후속 UI 강화)
                            ├── ✅ Task 005 (노션 API) ──┐
                            ├── ✅ Task 006 (인증) ──────┤
                            │       └── ✅ Task 007 (토큰 접근 제어)
                            │               └── ✅ Task 008 (PDF 다운로드)
                            │                       └── 🔄 Task 008-1 (통합 테스트)
                            │                               ├── Task 009 (UX 향상)
                            │                               ├── Task 010 (최적화)
                            │                               └── Task 011 (배포 준비)
                            │                                       └── Task 012 (SEO 최적화)
                            │                                               └── Task 013 (보안/성능 감사)
                            │                                                       └── Task 014 (프로덕션 배포)
```

### Phase 5 세부 의존성

```
Task 011 (배포 준비)
    ├── Task 012 (SEO 최적화)
    │       ├── 메타 태그 / OG / Twitter Card
    │       ├── JSON-LD 구조화 데이터
    │       ├── sitemap.ts / robots.ts
    │       └── 모바일 친화성 검증
    │
    ├── Task 013 (보안 및 성능 감사)  ← Task 012 완료 후 전체 감사
    │       ├── OWASP Top 10 체크
    │       ├── SSL/TLS, CORS, CSP 설정
    │       ├── 환경 변수 노출 방지
    │       └── Core Web Vitals 측정
    │
    └── Task 014 (프로덕션 배포)       ← Task 012, 013 완료 후 최종 배포
            ├── Vercel 프로덕션 배포 및 도메인 연결
            ├── CI/CD 파이프라인 (GitHub Actions)
            ├── Sentry / Vercel Analytics 연동
            └── 백업 및 장애 대응 런북
```
