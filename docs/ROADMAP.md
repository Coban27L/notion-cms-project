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

- **Task 001: 프로젝트 구조 및 라우팅 설정** - 우선순위
  - Next.js 16 App Router 기반 전체 라우트 구조 생성
    - `/app/page.tsx` (랜딩 페이지 골격)
    - `/app/login/page.tsx` (로그인 페이지 골격)
    - `/app/dashboard/page.tsx` (대시보드 골격)
    - `/app/quotes/[token]/page.tsx` (견적서 상세 페이지 골격)
    - `/app/not-found.tsx` (404 페이지)
  - 공통 레이아웃 컴포넌트 골격 구현 (`components/layout/header.tsx`, `footer.tsx`)
  - 환경 변수 템플릿 파일 (`.env.example`) 생성
    - `NOTION_API_KEY`, `NOTION_DATABASE_ID`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
  - 헤더 네비게이션 조건부 렌더링 구조 (로그인/비로그인)

- **Task 002: 타입 정의 및 인터페이스 설계**
  - 견적서 도메인 타입 정의 (`lib/types/quote.ts`)
    - `Quote` 인터페이스 (title, client_name, status, total_amount, issued_date, valid_until, share_token, items, notes)
    - `QuoteItem` 인터페이스 (name, quantity, unit_price, amount)
    - `QuoteStatus` 유니온 타입 ('발행' | '승인' | '취소')
  - 노션 API 응답 매퍼 타입 (`lib/types/notion.ts`)
  - 인증 관련 타입 정의 (`lib/types/auth.ts`)
  - API 응답 공통 타입 (`lib/types/api.ts`) - 성공/실패 응답 표준 스키마

### Phase 2: UI/UX 완성 (더미 데이터 활용)

- **Task 003: 공통 컴포넌트 및 디자인 시스템 구축**
  - shadcn/ui 필수 컴포넌트 추가 (Button, Card, Input, Label, Table, Badge, Select, Form, Dialog, Toast)
  - 견적서 도메인 컴포넌트 골격 (`components/quote/`)
    - `QuoteCard` (대시보드 목록용)
    - `QuoteHeader` (발행일, 번호, 클라이언트명, 유효기간)
    - `QuoteItemsTable` (품목, 수량, 단가, 금액)
    - `QuoteSummary` (소계, 세금, 합계)
    - `QuoteStatusBadge` (상태 배지)
  - 더미 데이터 생성 유틸리티 작성 (`lib/mock/quotes.ts`)
  - 공유 링크 복사 버튼 컴포넌트 (`components/quote/share-link-button.tsx`)
  - 반응형 스타일 가이드 및 디자인 토큰 확립

- **Task 004: 모든 페이지 UI 완성 (더미 데이터 기반)**
  - 랜딩 페이지 UI 완성 (서비스 설명, 관리자 로그인 버튼)
  - 로그인 페이지 UI 완성 (react-hook-form + zod 유효성 검사 스키마 정의, 에러 메시지 UI)
  - 대시보드 UI 완성 (견적서 카드 그리드, 상태 필터 전체/발행/승인/취소, 공유 링크 복사 버튼)
  - 견적서 상세 페이지 UI 완성 (헤더, 항목 테이블, 합계, PDF 다운로드 버튼 placeholder)
  - 404 페이지 UI 완성 ("견적서를 찾을 수 없습니다" 안내, 홈 이동 버튼)
  - 반응형 디자인 및 모바일 최적화 (모바일/태블릿/데스크톱)
  - 사용자 플로우 및 네비게이션 검증

### Phase 3: 핵심 기능 구현

- **Task 005: 노션 API 연동 및 데이터 계층 구현** - 우선순위
  - `@notionhq/client` 의존성 설치 및 초기화 (`lib/notion/client.ts`)
  - 노션 DB 스키마 검증 유틸리티 작성
  - 노션 API 래퍼 함수 구현 (`lib/notion/queries.ts`)
    - `getAllQuotes()` - 전체 견적서 목록 조회
    - `getQuoteByToken(token: string)` - 공유 토큰 기반 단건 조회
    - `getQuoteById(id: string)` - ID 기반 단건 조회
  - 노션 응답 데이터 매퍼 (`lib/notion/mappers.ts`) - 노션 properties를 도메인 타입으로 변환
  - 견적 항목 JSON 파서 (`items` Rich Text 필드 파싱)
  - 에러 핸들링 (노션 API 장애, 토큰 불일치, 네트워크 오류)
  - API Route 구현 (`app/api/quotes/route.ts`, `app/api/quotes/[token]/route.ts`)
  - 더미 데이터를 실제 노션 API 호출로 교체
  - Playwright MCP를 활용한 API 엔드포인트 통합 테스트
    - 정상 토큰 접근 시 견적서 반환 검증
    - 잘못된 토큰 접근 시 404 반환 검증
    - 목록 API 응답 구조 검증

- **Task 006: 관리자 인증 시스템 구현 (next-auth v5)**
  - `next-auth@beta` 의존성 설치 및 설정 (`auth.ts`, `middleware.ts`)
  - Credentials Provider 구성 (환경 변수 기반 이메일/비밀번호 검증)
  - `ADMIN_PASSWORD` 해싱 전략 결정 (bcrypt 또는 환경 변수에 해시값 저장)
  - 로그인 API Route 및 세션 생성 로직
  - 보호 라우트 미들웨어 (`/dashboard` 접근 시 비로그인은 `/login`으로 리디렉션)
  - 로그아웃 기능 구현
  - 헤더 네비게이션 로그인 상태 연동
  - Playwright MCP로 인증 플로우 E2E 테스트
    - 유효한 자격증명 로그인 성공 검증
    - 잘못된 자격증명 에러 메시지 검증
    - 비로그인 대시보드 접근 시 리디렉션 검증
    - 로그아웃 후 세션 만료 검증

- **Task 007: 고유 링크 및 토큰 기반 접근 제어 구현**
  - 공유 토큰 검증 로직 (`app/quotes/[token]/page.tsx`)
  - 존재하지 않거나 만료된 토큰 처리 (notFound() 호출)
  - 공유 링크 URL 생성 유틸리티 (`lib/utils/share-link.ts`)
  - 대시보드 견적서 카드에서 공유 링크 복사 기능 완성 (clipboard API + sonner 토스트)
  - SSR/SSG 전략 결정 (매 요청마다 최신 데이터 반영 위해 dynamic rendering)
  - Playwright MCP로 공유 링크 플로우 E2E 테스트
    - 복사된 링크로 비로그인 접근 시 정상 렌더링 검증
    - 잘못된 토큰 URL 접근 시 404 페이지 검증

- **Task 008: PDF 다운로드 기능 구현**
  - `@react-pdf/renderer` 의존성 설치
  - PDF 문서 컴포넌트 설계 (`components/pdf/quote-document.tsx`)
    - 헤더 (견적서 번호, 발행일, 클라이언트명)
    - 항목 테이블 (품목, 수량, 단가, 금액)
    - 합계 영역 (소계, 세금, 합계)
    - 비고 영역
  - 한글 폰트 임베딩 (Noto Sans KR 등)
  - PDF 생성 API Route (`app/api/quotes/[token]/pdf/route.ts`) 또는 클라이언트 측 BlobProvider 사용 전략 결정
  - 다운로드 버튼과 PDF 생성 로직 통합
  - 파일명 규칙 ("QT-2024-001_클라이언트명.pdf")
  - Playwright MCP로 PDF 다운로드 E2E 테스트
    - 다운로드 버튼 클릭 시 파일 다운로드 검증
    - PDF 파일명 및 파일 존재 여부 검증

- **Task 008-1: 핵심 기능 통합 테스트**
  - Playwright MCP를 사용한 전체 사용자 플로우 테스트
    - 관리자 플로우: 로그인 → 대시보드 → 견적서 상세 → PDF 다운로드
    - 클라이언트 플로우: 고유 링크 접속 → 견적서 확인 → PDF 다운로드
  - 노션 API 연동과 UI 렌더링 통합 검증
  - 상태 필터링 (전체/발행/승인/취소) 동작 검증
  - 에러 핸들링 및 엣지 케이스 테스트
    - 노션 API 응답 지연/실패
    - 빈 견적서 목록
    - 잘못된 JSON items 필드
    - 만료된 세션 상태에서 대시보드 접근

### Phase 4: 고급 기능 및 배포 준비

- **Task 009: 사용자 경험 향상 및 UI 개선**
  - 로딩 상태 및 스켈레톤 UI 적용 (대시보드, 견적서 상세)
  - 빈 상태(Empty State) UI 추가 (견적서 없음, 검색 결과 없음)
  - 에러 바운더리 및 에러 UI 개선 (`app/error.tsx`, `app/global-error.tsx`)
  - 토스트 알림 일관성 적용 (복사 성공, 다운로드 시작 등)
  - 다크/라이트 모드 테마 점검 및 PDF 인쇄 스타일 별도 관리

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
Task 001 (라우팅 골격)
    └── Task 002 (타입 정의)
            └── Task 003 (컴포넌트 라이브러리)
                    └── Task 004 (페이지 UI)
                            ├── Task 005 (노션 API) ──┐
                            ├── Task 006 (인증) ──────┤
                            │       └── Task 007 (토큰 접근 제어)
                            │               └── Task 008 (PDF 다운로드)
                            │                       └── Task 008-1 (통합 테스트)
                            │                               ├── Task 009 (UX 향상)
                            │                               ├── Task 010 (최적화)
                            │                               └── Task 011 (배포)
```
