# Task 001: 프로젝트 구조 및 라우팅 설정

## 명세

Next.js 16 App Router 기반으로 애플리케이션의 기본 라우트 구조를 완성합니다. 필수 페이지(로그인, 견적서 공유 링크, 404), 레이아웃 컴포넌트 조정, 환경 변수 템플릿을 구현합니다.

## 구현 단계

### 1단계: 필수 라우트 페이지 생성

- [ ] `app/login/page.tsx` 생성
  - 로그인 페이지 UI 골격 (제목, 이메일/비밀번호 입력 필드 placeholder)
  - 폼 구조는 Task 004에서 완성
  - 서버 컴포넌트 기본

- [ ] `app/quotes/[token]/page.tsx` 생성
  - 동적 라우트 [token] 파라미터 처리
  - 견적서 상세 페이지 제목 및 기본 구조
  - 토큰 검증은 Task 007에서 구현

- [ ] `app/not-found.tsx` 생성
  - 404 에러 페이지 ("찾을 수 없습니다" 메시지, 홈 버튼)
  - `notFound()` 호출로 자동 렌더링

### 2단계: 환경 변수 템플릿

- [ ] `.env.example` 파일 생성
  - `NOTION_API_KEY=your_notion_api_key_here`
  - `NOTION_DATABASE_ID=your_database_id_here`
  - `ADMIN_EMAIL=admin@example.com`
  - `ADMIN_PASSWORD=your_password_here`
  - `NEXTAUTH_SECRET=your_secret_key_here`
  - `NEXTAUTH_URL=http://localhost:3000`

### 3단계: Header 컴포넌트 조정

- [ ] `components/layout/header.tsx` 수정
  - 로그인/비로그인 조건부 렌더링 JSX 구조 추가
  - 비로그인: "로그인" 링크 추가
  - 로그인: "대시보드", "로그아웃" 링크 (실제 기능은 Task 006)
  - 기존 네비게이션 (About, Privacy, Terms) 유지

## 진행 상황

- [x] 1단계 완료: app/login/page.tsx, app/quotes/[token]/page.tsx, app/not-found.tsx 생성
- [x] 2단계 완료: .env.example 파일 생성
- [x] 3단계 완료: components/layout/header.tsx에 로그인/비로그인 조건부 렌더링 추가

## 관련 파일

| 파일                         | 타입      | 설명                    |
| ---------------------------- | --------- | ----------------------- |
| app/login/page.tsx           | CREATE    | 로그인 페이지           |
| app/quotes/[token]/page.tsx  | CREATE    | 공유 링크 견적서 페이지 |
| app/not-found.tsx            | CREATE    | 404 에러 페이지         |
| .env.example                 | CREATE    | 환경 변수 템플릿        |
| components/layout/header.tsx | TO_MODIFY | 조건부 렌더링 추가      |

## 수락 기준

1. 모든 필수 파일 생성 완료
2. TypeScript 컴파일 성공 (`npm run build`)
3. ESLint 검사 통과 (`npm run lint`)
4. 페이지 렌더링 확인 (`npm run dev`에서 각 라우트 접근 가능)
5. .env.example이 .gitignore에 포함되지 않음 (버전 관리 O)

## 변경 사항 요약

### 생성된 파일

- **app/login/page.tsx** (57줄): 로그인 페이지 UI 골격 (이메일/비밀번호 입력 필드)
- **app/quotes/[token]/page.tsx** (90줄): 동적 라우트 기반 견적서 상세 페이지 (토큰 파라미터 처리)
- **app/not-found.tsx** (22줄): 404 에러 페이지 (홈 이동 버튼 포함)
- **.env.example** (9줄): 환경 변수 템플릿 (NOTION_API_KEY, ADMIN_CREDENTIALS, NEXTAUTH 설정)

### 수정된 파일

- **components/layout/header.tsx**: 로그인/비로그인 조건부 렌더링 구조 추가
  - 비로그인: "로그인" 링크 표시
  - 로그인: "대시보드", "로그아웃" 버튼 표시
  - 모바일 메뉴에도 동일한 조건부 렌더링 추가
  - 실제 인증 로직은 Task 006에서 next-auth 통합 시 구현

### 검증 결과

✅ TypeScript 컴파일 성공 (1377ms)
✅ Next.js 빌드 성공 (10개 라우트 생성)
✅ ESLint 검사 통과
✅ 모든 라우트 렌더링 가능

---

**예상 소요 시간**: 30분
**의존성**: 없음 (Phase 1 시작 작업)
**다음 단계**: Task 002 (타입 정의)
