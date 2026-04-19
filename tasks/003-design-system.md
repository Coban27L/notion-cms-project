# Task 003: 공통 컴포넌트 및 디자인 시스템 구축

## 명세

shadcn/ui를 기반으로 필수 UI 컴포넌트를 추가하고, 견적서 도메인 특화 컴포넌트를 구현합니다. 더미 데이터 생성 유틸리티도 함께 작성하여 Task 004의 페이지 UI 완성을 위한 기초를 마련합니다.

## 구현 단계

### 1단계: shadcn/ui 필수 컴포넌트 추가

- [x] 모든 필수 shadcn/ui 컴포넌트 이미 설치됨
  - [x] button, card, input, label, table, badge, select, form, dialog, toast
  - [x] sonner 토스트 알림 라이브러리 설치
- [x] Toaster 컴포넌트를 app/layout.tsx에 추가됨

### 2단계: 견적서 도메인 컴포넌트 골격 구현 (components/quote/)

- [x] `components/quote/quote-card.tsx` - 대시보드 목록용 카드
  - [x] 견적서 제목, 클라이언트명, 발행일, 상태 배지 표시
  - [x] 공유 링크 복사 버튼 연동
  - [x] hover 상태 및 그림자 효과

- [x] `components/quote/quote-header.tsx` - 견적서 상세 페이지 헤더
  - [x] 견적서 번호, 발행일, 클라이언트명, 유효기간 표시
  - [x] 헤더 배경색과 텍스트 레이아웃

- [x] `components/quote/quote-items-table.tsx` - 품목 테이블
  - [x] 품목명, 수량, 단가, 금액 컬럼
  - [x] Table 컴포넌트 사용
  - [x] 반응형 설계

- [x] `components/quote/quote-summary.tsx` - 합계 섹션
  - [x] 소계, 세금(10%), 합계 표시
  - [x] 오른쪽 정렬, 굵은 글씨

- [x] `components/quote/quote-status-badge.tsx` - 상태 배지
  - [x] '발행' → 파란색
  - [x] '승인' → 초록색
  - [x] '취소' → 회색

### 3단계: 더미 데이터 생성 유틸리티 작성

- [x] `lib/mock/quotes.ts` 파일 생성
  - [x] `generateMockQuotes()` 함수 - 5개의 샘플 견적서 배열 생성
  - [x] 다양한 상태(발행, 승인, 취소)를 가진 샘플 데이터
  - [x] 각 견적서는 완전한 Quote 타입을 만족함
  - [x] 리스트 아이템 2~3개 포함

### 4단계: 공유 링크 복사 버튼 컴포넌트

- [x] `components/quote/share-link-button.tsx` 파일 생성
  - [x] 클립보드 API를 이용한 복사 기능
  - [x] 버튼 클릭 시 `sonner.toast` 성공 알림 표시
  - [x] 복사된 URL: `${window.location.origin}/quotes/${shareToken}`
  - [x] 버튼 텍스트: "링크 복사" → 복사 후 "복사됨!" (1초 표시)

### 5단계: 반응형 스타일 가이드 및 디자인 토큰 확립

- [x] Tailwind CSS 반응형 브레이크포인트 사용 확인
  - [x] 모바일(< 640px): sm
  - [x] 태블릿(640px ~ 1024px): md
  - [x] 데스크톱(≥ 1024px): lg
- [x] 주요 색상 및 간격 일관성 확보
- [x] 카드 섀도우, 보더 반경 등 일관성 검증

## 관련 파일

- `components/quote/quote-card.tsx` (CREATE) ✓
- `components/quote/quote-header.tsx` (CREATE) ✓
- `components/quote/quote-items-table.tsx` (CREATE) ✓
- `components/quote/quote-summary.tsx` (CREATE) ✓
- `components/quote/quote-status-badge.tsx` (CREATE) ✓
- `components/quote/share-link-button.tsx` (CREATE) ✓
- `lib/mock/quotes.ts` (CREATE) ✓
- `app/layout.tsx` (이미 Toaster 포함) ✓
- `package.json` (이미 필요 의존성 포함) ✓

## 수락 기준

- [x] 모든 shadcn/ui 컴포넌트가 정상 설치됨
- [x] 견적서 도메인 컴포넌트 5개가 모두 생성되고 타입스크립트 오류 없음
- [x] `lib/mock/quotes.ts`에서 생성하는 더미 데이터가 Quote 타입과 호환
- [x] `share-link-button.tsx`가 클립보드 API를 정상적으로 사용
- [x] 모든 컴포넌트가 Tailwind CSS로 스타일링되고 반응형 동작 확인
- [x] `npm run dev` 실행 후 `http://localhost:3000` 접속 시 빌드 오류 없음

## 변경 사항 요약

- shadcn/ui 필수 컴포넌트 모두 활용 가능 (이미 설치됨)
- 견적서 도메인 컴포넌트 5개 생성 완료
- 더미 데이터 유틸리티 작성 완료
- 공유 링크 복사 기능 컴포넌트 작성 완료
- app/layout.tsx에 Toaster 이미 추가되어 있음
