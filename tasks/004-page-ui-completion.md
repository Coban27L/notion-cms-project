# Task 004: 모든 페이지 UI 완성 (더미 데이터 기반)

## 명세

Task 003에서 구축한 컴포넌트와 디자인 시스템을 활용하여 모든 페이지의 UI를 더미 데이터로 완성합니다. 각 페이지는 전체 기능이 동작하지 않지만 시각적으로 완성된 상태여야 합니다.

## 구현 단계

### 1단계: 랜딩 페이지 UI 완성 (app/page.tsx)

- [x] 페이지 레이아웃
  - [x] Hero 섹션 (서비스 설명, 핵심 기능 3개)
  - [x] CTA 섹션 (관리자 로그인 버튼)
  - [x] Features 섹션 (3개 카드)
- [x] 반응형 설계 (모바일: 1열, 태블릿: 2열, 데스크톱: 3열)

### 2단계: 로그인 페이지 UI 완성 (app/login/page.tsx)

- [x] 폼 UI 구현 (Email, Password 입력 필드, 로그인 버튼)
- [x] react-hook-form + zod 스키마 정의
  - 이메일 검증: 유효한 이메일 형식
  - 비밀번호 검증: 6자 이상
- [x] 폼 레이아웃 (중앙 정렬, 카드 스타일)
- [x] 에러 메시지 표시 (빨간색 텍스트)
- [x] 버튼 disabled 상태 (폼 유효하지 않을 때)

### 3단계: 대시보드 UI 완성 (app/dashboard/page.tsx)

- [x] 레이아웃 (제목, 상태 필터 탭, 견적서 카드 그리드)
- [x] 견적서 카드 그리드 (더미 데이터 5개 사용)
  - [x] 반응형: 모바일 1열, 태블릿 2열, 데스크톱 3열
  - [x] QuoteCard 컴포넌트 사용
- [x] 상태 필터 동작
  - [x] 필터 선택 시 해당 상태의 견적서만 표시
  - [x] "전체" 선택 시 모든 견적서 표시
- [x] 요약 통계 표시 (전체, 발행, 승인, 취소)
- [x] 공유 링크 복사 버튼 및 상세보기 버튼

### 4단계: 견적서 상세 페이지 UI 완성 (app/quotes/[token]/page.tsx)

- [x] 페이지 구조
  - [x] QuoteHeader 컴포넌트 (견적서 번호, 발행일, 클라이언트명, 유효기간)
  - [x] QuoteItemsTable 컴포넌트 (품목 테이블)
  - [x] QuoteSummary 컴포넌트 (합계)
  - [x] 추가 섹션: 클라이언트 정보, 비고(Notes)
- [x] 더미 데이터 사용 (첫 번째 견적서 데이터 표시)
- [x] 버튼 섹션
  - [x] "링크 복사" 버튼 (ShareLinkButton 컴포넌트)
  - [x] "PDF 다운로드" 버튼 (placeholder)
- [x] 반응형 설계

### 5단계: 404 페이지 UI 완성 (app/not-found.tsx)

- [x] 페이지 내용
  - [x] 404 아이콘
  - [x] "페이지를 찾을 수 없습니다" 메시지
  - [x] 설명: "존재하지 않거나 삭제된 견적서입니다"
  - [x] "홈으로 돌아가기" 버튼

### 6단계: 레이아웃 및 네비게이션

- [x] Header 컴포넌트 (components/layout/header.tsx)
  - [x] 로고 및 네비게이션 링크
  - [x] 테마 토글 버튼
  - [x] 로그인/로그아웃 버튼
- [x] Footer 컴포넌트 (components/layout/footer.tsx)
  - [x] 저작권, 링크들 (개인정보 보호, 이용약관)
- [x] app/layout.tsx
  - [x] Toaster 컴포넌트 (sonner)
  - [x] 메타데이터 설정
  - [x] 테마 설정 (next-themes)

### 7단계: 전체 네비게이션 검증

- [x] 모든 페이지가 header/footer로 감싸져 있음
- [x] 링크 navigation이 작동함
  - [x] 홈 → 로그인
  - [x] 홈 → 대시보드
  - [x] 로그인 폼 (유효성 검사 표시)
  - [x] 대시보드 → 견적서 상세
  - [x] 404 → 홈

## 관련 파일

- `app/page.tsx` (기존)
- `app/login/page.tsx` (수정)
- `app/dashboard/page.tsx` (수정)
- `app/quotes/[token]/page.tsx` (수정)
- `app/not-found.tsx` (생성)
- `components/layout/header.tsx` (기존)
- `components/layout/footer.tsx` (기존)
- `app/layout.tsx` (기존)
- `components/quote/quote-card.tsx` (생성)
- `components/quote/quote-status-badge.tsx` (생성)
- `components/quote/quote-header.tsx` (생성)
- `components/quote/quote-items-table.tsx` (생성)
- `components/quote/quote-summary.tsx` (생성)
- `components/quote/share-link-button.tsx` (생성)
- `lib/mock/quotes.ts` (생성)

## 수락 기준

- [x] 모든 5개 주요 페이지(홈, 로그인, 대시보드, 견적서 상세, 404)가 시각적으로 완성됨
- [x] 더미 데이터가 모든 페이지에서 정상 렌더링됨
- [x] 모든 링크 네비게이션이 작동함
- [x] 반응형 디자인이 모바일/태블릿/데스크톱에서 확인됨
- [x] `npm run dev` 실행 후 모든 페이지가 빌드 오류 없이 로드됨
- [x] 로그인 폼이 react-hook-form + zod로 구현되고 기본 검증 표시됨

## 변경 사항 요약

- 모든 주요 페이지 UI 완성 (홈, 로그인, 대시보드, 상세, 404)
- 상태 필터 UI 추가 (대시보드)
- 공유 링크 복사 기능 UI 추가
- 더미 데이터 활용한 모든 페이지 렌더링
- react-hook-form + zod 기반 로그인 폼 구현
- 견적서 도메인 컴포넌트 5개 생성 완료
- 반응형 디자인 적용
