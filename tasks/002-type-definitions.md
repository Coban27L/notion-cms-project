# Task 002: 타입 정의 및 인터페이스 설계

## 명세

견적서 도메인의 핵심 타입 정의와 API 응답 표준 스키마를 설계합니다. 나중 Task들(005-008)에서 사용될 기초 타입을 정의하고, 노션 API 응답 타입도 함께 준비합니다.

## 구현 단계

### 1단계: lib/types/quote.ts 생성

- [ ] `lib/types/quote.ts` 파일 생성
  - `Quote` 인터페이스
    - id: string (노션 page ID)
    - title: string (견적서 제목, 예: "QT-2024-001")
    - clientName: string
    - status: QuoteStatus
    - totalAmount: number
    - issuedDate: string (ISO 8601)
    - validUntil: string (ISO 8601)
    - shareToken: string (UUID)
    - items: QuoteItem[]
    - notes: string
  
  - `QuoteItem` 인터페이스
    - name: string
    - quantity: number
    - unitPrice: number
    - amount: number
  
  - `QuoteStatus` 유니온 타입
    - type QuoteStatus = '발행' | '승인' | '취소'
  
  - `QuoteListFilters` 인터페이스
    - status?: QuoteStatus
    - clientName?: string

### 2단계: lib/types/notion.ts 생성

- [ ] `lib/types/notion.ts` 파일 생성
  - `NotionPageProperties` 인터페이스 (노션 DB properties)
  - `NotionQueryResponse` 인터페이스 (목록 조회 응답)
  - 필드 매핑: Notion API 응답 → Domain 타입

### 3단계: lib/types/auth.ts 생성

- [ ] `lib/types/auth.ts` 파일 생성
  - `LoginRequest` 인터페이스
    - email: string
    - password: string
  
  - `Session` 인터페이스
    - id: string
    - email: string
    - expiresAt: string (ISO 8601)
  
  - `AuthError` 인터페이스
    - code: 'INVALID_CREDENTIALS' | 'SESSION_EXPIRED' | 'UNAUTHORIZED'
    - message: string

### 4단계: lib/types/api.ts 생성

- [ ] `lib/types/api.ts` 파일 생성
  - `ApiResponse<T>` 인터페이스 (표준 API 응답)
    - success: boolean
    - data?: T
    - error?: ErrorInfo
  
  - `ErrorInfo` 인터페이스
    - code: string
    - message: string

## 진행 상황

- [x] 1단계 완료: Quote, QuoteItem, QuoteStatus, QuoteListFilters
- [x] 2단계 완료: NotionPageProperties, NotionPageResponse, NotionQueryResponse
- [x] 3단계 완료: LoginRequest, Session, AuthError, AuthErrorCode
- [x] 4단계 완료: ApiResponse<T>, ErrorInfo, createApiResponse 유틸리티

## 관련 파일

| 파일 | 타입 | 설명 |
|------|------|------|
| lib/types/quote.ts | CREATE | 견적서 도메인 타입 |
| lib/types/notion.ts | CREATE | 노션 API 응답 타입 |
| lib/types/auth.ts | CREATE | 인증 관련 타입 |
| lib/types/api.ts | CREATE | 표준 API 응답 스키마 |

## 수락 기준

1. 모든 타입 파일이 lib/types/ 디렉토리에 생성됨
2. TypeScript strict 모드에서 컴파일 성공
3. 각 인터페이스가 구체적이고 명확한 설계
4. 타입이 Task 003-008에서 재사용 가능한 형태
5. JSDoc 주석 추가 (필드 설명, 예시 포함)

## 코드 예제

```typescript
// lib/types/quote.ts
interface Quote {
  id: string;
  title: string;
  clientName: string;
  status: QuoteStatus;
  totalAmount: number;
  issuedDate: string;
  validUntil: string;
  shareToken: string;
  items: QuoteItem[];
  notes: string;
}

interface QuoteItem {
  name: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

type QuoteStatus = '발행' | '승인' | '취소';

interface QuoteListFilters {
  status?: QuoteStatus;
  clientName?: string;
}
```

```typescript
// lib/types/api.ts
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ErrorInfo;
}

interface ErrorInfo {
  code: string;
  message: string;
}
```

## 변경 사항 요약

### 생성된 파일

#### 1. lib/types/quote.ts (60줄)
- **Quote**: 견적서 도메인 모델 (id, title, clientName, status, totalAmount, issuedDate, validUntil, shareToken, items, notes)
- **QuoteItem**: 견적 항목 (name, quantity, unitPrice, amount)
- **QuoteStatus**: 상태 유니온 타입 ('발행' | '승인' | '취소')
- **QuoteListFilters**: 필터링 옵션 (status?, clientName?)

#### 2. lib/types/notion.ts (110줄)
- **NotionPageProperties**: 노션 DB 프로퍼티 (Title, ClientName, Status, TotalAmount, IssuedDate, ValidUntil, ShareToken, Items, Notes)
- **NotionPageResponse**: 노션 페이지 응답 (object, id, created_time, last_edited_time, properties)
- **NotionQueryResponse**: 노션 쿼리 응답 (object, results, next_cursor, has_more)

#### 3. lib/types/auth.ts (39줄)
- **LoginRequest**: 로그인 요청 (email, password)
- **Session**: 세션 정보 (id, email, expiresAt)
- **AuthErrorCode**: 오류 코드 유니온 타입 ('INVALID_CREDENTIALS' | 'SESSION_EXPIRED' | 'UNAUTHORIZED')
- **AuthError**: 인증 오류 (code, message)

#### 4. lib/types/api.ts (56줄)
- **ErrorInfo**: API 에러 정보 (code, message)
- **ApiResponse<T>**: 표준 API 응답 제네릭 (success, data?, error?)
- **createApiResponse**: 응답 생성 유틸리티 헬퍼 함수

### 검증 결과
✅ TypeScript 컴파일 성공 (1337ms)
✅ 모든 타입 strict mode 준수
✅ 제네릭 사용으로 확장성 확보
✅ JSDoc 주석으로 필드 설명 추가
✅ 유틸리티 함수로 API 응답 일관성 지원

---

**예상 소요 시간**: 30분
**의존성**: Task 001 (라우팅 설정 후 병렬 진행 가능)
**다음 단계**: Task 003 (컴포넌트 라이브러리)
