# Development Standards for Notion CMS Quote System

**Optimized for AI Agent Execution**

---

## 1. Project Overview

### Purpose

- 노션을 CMS로 활용하여 견적서를 발행하고, 클라이언트가 고유 링크로 웹에서 확인 및 PDF로 다운로드할 수 있는 1인 프리랜서 및 소규모 팀용 플랫폼

### Core Features

- 노션 DB 견적서 자동 렌더링
- UUID 토큰 기반 공유 링크 (인증 불필요)
- PDF 다운로드 (한글 폰트 지원)
- 관리자 대시보드 (환경 변수 인증)

### Technology Stack

- **Framework**: Next.js 16.2.2 (App Router) + React 19.2.4
- **Language**: TypeScript 5 (strict mode enabled)
- **Styling**: Tailwind CSS 4 + shadcn/ui (base-nova)
- **Forms**: react-hook-form + zod
- **Auth**: next-auth v5 (Credentials Provider)
- **CMS**: @notionhq/client
- **PDF**: @react-pdf/renderer
- **Theme**: next-themes (light/dark)
- **UI Components**: shadcn/ui
- **Alerts**: sonner (toast)
- **Icons**: lucide-react

---

## 2. Project Structure & Architecture

### Directory Structure

```
app/                          # Next.js App Router
├── api/
│   ├── quotes/route.ts       # GET /api/quotes (관리자 목록)
│   └── quotes/[token]/
│       ├── route.ts          # GET /api/quotes/[token] (공개 조회)
│       └── pdf/route.ts      # POST /api/quotes/[token]/pdf (PDF 생성)
├── layout.tsx                # 루트 레이아웃 (Header, Footer, 테마 설정)
├── page.tsx                  # 랜딩 페이지
├── login/page.tsx            # 로그인 페이지
├── dashboard/page.tsx        # 관리자 대시보드 (인증 필수)
├── quotes/[token]/page.tsx   # 공개 견적서 상세 (토큰 기반)
├── not-found.tsx             # 404 페이지
├── error.tsx                 # 에러 바운더리
├── globals.css               # 전역 스타일
└── middleware.ts             # 인증 미들웨어 (next-auth)

components/
├── ui/                       # shadcn/ui 컴포넌트 (Button, Card, Input, etc.)
├── layout/
│   ├── header.tsx            # 네비게이션 (로그인/비로그인 조건부 렌더링)
│   └── footer.tsx            # 푸터
├── quote/                    # 견적서 도메인 컴포넌트
│   ├── quote-card.tsx        # 대시보드 카드
│   ├── quote-header.tsx      # 발행일, 클라이언트명, 번호
│   ├── quote-items-table.tsx # 항목 테이블 (품목, 수량, 단가, 금액)
│   ├── quote-summary.tsx     # 소계, 세금, 합계
│   ├── quote-status-badge.tsx # 상태 배지
│   └── share-link-button.tsx # 공유 링크 복사 버튼
├── sections/                 # 랜딩 페이지 섹션 (Hero, Features, CTA)
└── pdf/
    └── quote-document.tsx    # PDF 문서 컴포넌트

lib/
├── types/
│   ├── quote.ts              # Quote, QuoteItem, QuoteStatus 인터페이스
│   ├── notion.ts             # 노션 API 응답 타입
│   └── api.ts                # API 응답 공통 타입 (Success/Error)
├── notion/
│   ├── client.ts             # @notionhq/client 초기화
│   ├── queries.ts            # getAllQuotes(), getQuoteByToken(), getQuoteById()
│   ├── mappers.ts            # 노션 properties → 도메인 타입 변환
│   └── validators.ts         # 노션 API 응답 유효성 검사
├── utils/
│   ├── utils.ts              # cn() (clsx + tailwind-merge)
│   ├── share-link.ts         # URL 생성 유틸리티 (공유 링크)
│   └── mock.ts               # 더미 데이터 (개발 중)
├── auth/
│   ├── config.ts             # next-auth 설정 (Credentials Provider)
│   └── middleware.ts         # next-auth 미들웨어
└── pdf/
    └── generator.ts          # PDF 생성 유틸리티 (한글 폰트 포함)

hooks/                        # 커스텀 React Hooks (필요시)
├── use-quotes.ts             # 견적서 데이터 조회 Hook
└── use-share-link.ts         # 공유 링크 복사 Hook

public/                       # 정적 자산
├── fonts/                    # Noto Sans KR 등 한글 폰트
└── images/                   # OG 이미지 등

.env.example                  # 환경 변수 템플릿
```

### Key File Interactions

```
types/quote.ts (도메인 타입 정의)
    ↓ 사용됨
    ├── components/quote/* (컴포넌트 구현)
    ├── lib/notion/mappers.ts (노션 데이터 매핑)
    └── lib/notion/queries.ts (쿼리 응답 타입)

lib/notion/queries.ts (API 호출)
    ↓ 사용됨
    ├── app/api/quotes/route.ts (관리자 목록)
    ├── app/api/quotes/[token]/route.ts (공개 조회)
    └── app/dashboard/page.tsx (대시보드 조회)

lib/auth/config.ts (인증 설정)
    ↓ 사용됨
    ├── middleware.ts (보호 라우트)
    └── app/login/page.tsx (로그인 양식)

app/layout.tsx (루트 레이아웃)
    ├── ThemeProvider (next-themes)
    ├── AuthProvider (next-auth)
    ├── components/layout/header.tsx
    └── components/layout/footer.tsx
```

---

## 3. Type Definitions & Interfaces

### Location: `lib/types/quote.ts`

```typescript
// 견적 상태 (고정값)
type QuoteStatus = "발행" | "승인" | "취소";

// 견적 항목
interface QuoteItem {
  name: string; // 품목명
  quantity: number; // 수량
  unitPrice: number; // 단가
  amount: number; // 금액 (quantity * unitPrice)
}

// 견적서 (노션 도메인)
interface Quote {
  id: string; // 노션 페이지 ID
  title: string; // 견적서 제목 (예: "QT-2024-001")
  clientName: string; // 클라이언트명
  status: QuoteStatus; // 상태
  totalAmount: number; // 총액
  issuedDate: string; // 발행일 (ISO 형식)
  validUntil: string; // 유효 기간 (ISO 형식)
  shareToken: string; // UUID 토큰 (공유 링크용)
  items: QuoteItem[]; // 항목 배열
  notes: string; // 비고
}

// 견적서 목록 필터링
interface QuoteListFilters {
  status?: QuoteStatus;
  clientName?: string;
}
```

### 규칙

- **타입 파일 위치**: 모든 도메인 타입은 `lib/types/[domain].ts` 파일에 정의
- **인터페이스 네이밍**: 도메인명 단수형 (Quote, QuoteItem) + 필요시 용도 명시 (QuoteListFilters)
- **필드 네이밍**: camelCase (JavaScript 표준)
- **날짜 형식**: ISO 8601 string 사용 (new Date().toISOString())
- **상태값**: 유니온 타입으로 정의, 고정값 사용 (enum 대신)

---

## 4. Component Structure

### shadcn/ui Components (`components/ui/*`)

shadcn 컴포넌트는 설치 시점에 프로젝트 내에 생성됨. 직접 수정 금지, 디자인 커스터마이즈는 CSS 변수 사용.

필수 컴포넌트 목록:

- Button, Card, Input, Label, Table, Badge, Select, Form, Dialog, Toast (Sonner)

### Domain Components (`components/quote/*`)

견적서 도메인의 재사용 가능한 컴포넌트:

```typescript
// components/quote/quote-card.tsx
interface QuoteCardProps {
  quote: Quote;
  onShare?: (token: string) => void;
  isAdmin?: boolean;
}

// components/quote/quote-header.tsx
interface QuoteHeaderProps {
  quote: Quote;
}

// components/quote/quote-items-table.tsx
interface QuoteItemsTableProps {
  items: QuoteItem[];
}

// components/quote/quote-summary.tsx
interface QuoteSummaryProps {
  totalAmount: number;
  tax?: number; // 옵션
  grandTotal: number;
}

// components/quote/quote-status-badge.tsx
interface QuoteStatusBadgeProps {
  status: QuoteStatus;
}

// components/quote/share-link-button.tsx
interface ShareLinkButtonProps {
  token: string;
  onCopy?: () => void;
}
```

### Layout Components (`components/layout/*`)

- **header.tsx**: 네비게이션, 로그인 상태 표시 (조건부 렌더링 필수)
- **footer.tsx**: 푸터 컨텐츠 (고정, 변경 최소화)

### 규칙

- **Props 인터페이스**: 각 컴포넌트별 `{ComponentName}Props` 정의 필수
- **선택적 Props**: `isAdmin?: boolean` 형식으로 명시
- **Props 전달**: 불필요한 Props 전달 금지
- **재사용성**: 한 곳 이상에서 사용될 컴포넌트만 `components/` 에 정의 (일회용은 페이지 내부)

---

## 5. API & Data Layer

### 노션 API 래퍼 (`lib/notion/`)

#### `lib/notion/client.ts`

```typescript
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export default notion;
```

#### `lib/notion/queries.ts`

```typescript
// 모든 견적서 조회 (관리자용)
export async function getAllQuotes(
  filters?: QuoteListFilters,
): Promise<Quote[]> {
  // 노션 DB 쿼리
}

// 공유 토큰으로 단건 조회
export async function getQuoteByToken(token: string): Promise<Quote | null> {
  // 토큰 검증 + 조회
}

// ID로 단건 조회
export async function getQuoteById(id: string): Promise<Quote | null> {
  // ID 검증 + 조회
}
```

#### `lib/notion/mappers.ts`

```typescript
// 노션 API 응답 → 도메인 타입 변환
export function mapNotionPageToQuote(page: PageObjectResponse): Quote {
  return {
    id: page.id,
    title: page.properties.Title.title[0]?.plain_text ?? "",
    clientName: page.properties.ClientName.rich_text[0]?.plain_text ?? "",
    // ...
  };
}
```

#### `lib/notion/validators.ts`

```typescript
// 노션 응답 유효성 검사
export function validateQuoteData(data: any): data is Quote {
  return (
    typeof data.id === 'string' &&
    typeof data.title === 'string' &&
    // ...
  );
}
```

### API Routes (`app/api/*`)

#### `app/api/quotes/route.ts` (GET)

```typescript
export async function GET(request: Request) {
  // 1. 관리자 인증 확인
  // 2. 필터 파라미터 파싱 (status, clientName)
  // 3. getAllQuotes() 호출
  // 4. JSON 응답 반환
  // 5. 에러 처리 (노션 API 장애, 인증 실패 등)
}
```

#### `app/api/quotes/[token]/route.ts` (GET)

```typescript
export async function GET(
  request: Request,
  { params }: { params: { token: string } },
) {
  // 1. 토큰 검증
  // 2. getQuoteByToken(token) 호출
  // 3. 존재하지 않으면 404 응답
  // 4. JSON 응답 반환
}
```

#### `app/api/quotes/[token]/pdf/route.ts` (POST)

```typescript
export async function POST(
  request: Request,
  { params }: { params: { token: string } },
) {
  // 1. 토큰으로 견적서 조회
  // 2. PDF 생성 (한글 폰트)
  // 3. Blob 형식으로 응답
  // 4. Content-Disposition: attachment 헤더 설정
}
```

### 에러 처리

```typescript
// API 응답 공통 형식
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

// 사용 예
export async function GET(request: Request): Promise<Response> {
  try {
    const data = await getAllQuotes();
    return Response.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return Response.json(
      {
        success: false,
        error: {
          code: "NOTION_API_ERROR",
          message: "노션 API 호출 실패",
        },
      },
      { status: 500 },
    );
  }
}
```

### 규칙

- **에러 메시지**: 항상 사용자 친화적 메시지 제공 (민감 정보 노출 금지)
- **로깅**: `console.error()` 사용, 프로덕션은 Sentry 연동 예정
- **타임아웃**: 노션 API 호출 시 5초 제한 권장
- **캐싱**: 개발 중 동적 렌더링 (나중에 ISR/SSG 검토)

---

## 6. Authentication & Security

### next-auth v5 설정 (`lib/auth/config.ts`)

```typescript
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const config = {
  providers: [
    Credentials({
      async authorize(credentials) {
        // 1. 환경 변수에서 ADMIN_EMAIL, ADMIN_PASSWORD 로드
        // 2. 입력값과 비교 (비밀번호는 bcrypt 해싱 후 비교)
        // 3. 일치하면 사용자 객체 반환, 아니면 null

        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (
          email === process.env.ADMIN_EMAIL &&
          // bcrypt.compare() 또는 직접 비교
          password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "1", email, name: "Admin" };
        }
        return null;
      },
    }),
  ],
  // ...
} satisfies NextAuthConfig;
```

### 환경 변수

```bash
# .env.local (로컬 개발)
NOTION_API_KEY=ntn_XXXXXX
NOTION_DATABASE_ID=XXXXXX
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_password_here
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

### 보호 라우트 (`middleware.ts`)

```typescript
import { auth } from "@/auth";

export const middleware = auth((req) => {
  // /dashboard 접근 시 로그인 확인
  if (req.nextUrl.pathname.startsWith("/dashboard") && !req.auth) {
    return Response.redirect(new URL("/login", req.nextUrl.origin));
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/api/quotes/:path*"],
};
```

### 토큰 기반 공개 접근

- **공유 링크**: `/quotes/[token]`
- **토큰 생성**: UUID v4 (crypto.randomUUID())
- **토큰 검증**: 노션 DB에서 shareToken 필드와 일치 확인
- **만료**: 현재 구현에서는 유효 기간(validUntil) 필드로 관리

### 규칙

- **민감 정보**: 환경 변수 사용, 코드에 하드코딩 금지
- **세션 쿠키**: Secure, HttpOnly, SameSite=Lax 설정 자동 적용
- **로그인 시도 제한**: 향후 rate limiting 추가 예정
- **XSS 방지**: `dangerouslySetInnerHTML` 절대 금지

---

## 7. Code Style & Formatting

### 언어 설정

- **기본 언어**: 한국어 (주석, 메시지)
- **코드 식별자**: 영어 (변수명, 함수명, 클래스명)
- **커밋 메시지**: 한국어

### 포맷팅

- **들여쓰기**: 2칸 (탭 금지)
- **라인 길이**: 권장 100 자 (강제 아님)
- **세미콜론**: 필수
- **따옴표**: 더블 쿠텐 (") 통일

### 주석

**원칙**: 최소한의 주석. WHY를 명확히 할 때만.

❌ **하지 마세요:**

```typescript
// 사용자를 가져옴
const user = await getUser();

// 이름을 출력함
console.log(name);
```

✅ **이렇게:**

```typescript
const user = await getUser();
console.log(name);

// 노션 API는 100ms 지연이 있어서 캐싱 필수
const cachedQuotes = useMemo(() => quotes, [quotes]);
```

### TypeScript

- **타입 안정성**: strict mode 활성화 (tsconfig.json)
- **암시적 any**: 금지 (`noImplicitAny: true`)
- **타입 정의**: 모든 함수 파라미터 + 반환값에 타입 명시
- **any 사용**: 절대 금지 (unknown 사용)

```typescript
// ❌ 나쁜 예
function processQuote(quote) {
  // ...
}

// ✅ 좋은 예
function processQuote(quote: Quote): QuoteItem[] {
  // ...
}
```

### 네이밍 컨벤션

| 항목              | 규칙             | 예시                                       |
| ----------------- | ---------------- | ------------------------------------------ |
| 변수              | camelCase        | `clientName`, `totalAmount`                |
| 상수              | UPPER_SNAKE_CASE | `API_KEY`, `DEFAULT_STATUS`                |
| 함수              | camelCase        | `getAllQuotes()`, `mapNotionPageToQuote()` |
| 클래스/인터페이스 | PascalCase       | `Quote`, `QuoteItem`, `QuoteCard`          |
| 파일명            | kebab-case       | `quote-card.tsx`, `notion-client.ts`       |
| 디렉토리명        | kebab-case       | `components/quote/`, `lib/utils/`          |

---

## 8. Form Handling & Validation

### react-hook-form + zod 패턴

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 1. Zod 스키마 정의
const loginSchema = z.object({
  email: z.string().email('유효한 이메일을 입력하세요'),
  password: z.string().min(6, '6자 이상 입력하세요'),
});

type LoginFormData = z.infer<typeof loginSchema>;

// 2. 컴포넌트에서 사용
export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">로그인</button>
    </form>
  );
}
```

### 규칙

- **검증은 Zod에서만**: 클라이언트/서버 양쪽에서 같은 스키마 사용
- **에러 메시지**: 사용자 친화적, 구체적 (에러 코드 노출 금지)
- **선택적 필드**: `z.string().optional()`
- **배열 검증**: `z.array(z.object({ ... }))`

---

## 9. Styling & Theme System

### Tailwind CSS + CSS Variables

CSS 변수는 `app/globals.css` 에서 정의됨:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.6%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.6%;
    /* ... 더 많은 변수 */
  }

  .dark {
    --background: 0 0% 3.6%;
    --foreground: 0 0% 98%;
    --card: 0 0% 10%;
    --card-foreground: 0 0% 98%;
    /* ... */
  }
}
```

Tailwind에서 사용:

```tsx
<div className="bg-background text-foreground">
  {/* 다크 모드에서 자동으로 변경됨 */}
</div>
```

### next-themes 설정

`app/layout.tsx`:

```typescript
import { ThemeProvider } from 'next-themes';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 규칙

- **컬러 사용**: Tailwind 클래스 또는 CSS 변수만 (hex 코드 금지)
- **반응형 디자인**: `sm:`, `md:`, `lg:` 프리픽스 필수
- **다크 모드**: `dark:` 클래스로 다크 모드 스타일 명시
- **커스텀 CSS**: 꼭 필요한 경우만 `app/globals.css` 추가

---

## 10. State Management

### React Context (권장)

간단한 상태는 Context API 사용:

```typescript
// lib/contexts/theme.tsx
import { createContext } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

// 사용
const { theme, setTheme } = useContext(ThemeContext);
```

### 규칙

- **Redux 금지**: 프로젝트 복잡도에 불필요
- **zustand/Pinia 금지**: Context API로 충분
- **전역 상태 최소화**: 페이지/컴포넌트 로컬 상태 우선
- **useCallback/useMemo**: 필요한 경우에만 (성능 최적화)

---

## 11. Documentation & Comments

### 최소한의 주석 원칙

**좋은 주석** (WHY를 설명):

```typescript
// 노션 API 응답이 항상 정렬된 순서로 반환되지 않으므로
// 발행일 기준 내림차순 정렬 필수
const sortedQuotes = quotes.sort(
  (a, b) => new Date(b.issuedDate).getTime() - new Date(a.issuedDate).getTime(),
);
```

**나쁜 주석** (WHAT을 설명, 코드가 이미 명확):

```typescript
// 배열 정렬
const sortedQuotes = quotes.sort(...);

// 사용자 이름 출력
console.log(user.name);
```

### 문서화

- **README.md**: 프로젝트 소개, 시작 가이드, 노션 DB 스키마 (향후)
- **docs/**: 상세 가이드 (SEO, 배포, 모니터링)
- **코드 예제**: 복잡한 로직에는 사용 예제 주석 추가
- **마크다운 주석**: 다중 라인 JSDoc 금지, 한 줄 주석만

```typescript
// ❌ 금지
/**
 * 견적서를 노션에서 조회한다
 * @param id - 견적서 ID
 * @returns Quote 객체
 */

// ✅ 권장
// 노션에서 견적서 조회 (ID 기반, 토큰 불일치 시 null 반환)
```

---

## 12. Testing Strategy

### E2E 테스트 (Playwright MCP)

모든 **API 구현** 및 **비즈니스 로직** 변경 시 필수.

#### 체크리스트 예시 (Task 005: 노션 API 연동)

```markdown
## 테스트 체크리스트

- [ ] 정상 토큰으로 API 호출 시 견적서 반환 검증
  - [ ] `/api/quotes/[token]` GET 호출
  - [ ] 응답 상태: 200
  - [ ] 응답 데이터: Quote 타입 일치
  - [ ] 필드 값 검증: title, clientName, items, totalAmount

- [ ] 잘못된 토큰 호출 시 404 반환 검증
  - [ ] 존재하지 않는 token으로 요청
  - [ ] 응답 상태: 404
  - [ ] 응답 메시지: "견적서를 찾을 수 없습니다"

- [ ] 목록 API (`/api/quotes`) 응답 구조 검증
  - [ ] 인증 헤더 포함 필수
  - [ ] 응답 상태: 200
  - [ ] 응답 데이터: Quote[] 배열
  - [ ] 필터 파라미터 (status) 동작 검증

- [ ] 에러 처리 검증
  - [ ] 노션 API 장애 시 500 + 에러 메시지
  - [ ] 네트워크 타임아웃 시 에러 처리
```

#### Playwright 테스트 작성 (예시)

```typescript
import { test, expect } from "@playwright/test";

test("견적서 공개 링크 접근", async ({ page }) => {
  // 1. 공개 링크 접근
  await page.goto("/quotes/550e8400-e29b-41d4-a716-446655440000");

  // 2. 견적서 데이터 렌더링 확인
  await expect(page.locator("h1")).toContainText("QT-2024-001");
  await expect(page.locator("text=클라이언트명")).toBeVisible();

  // 3. 항목 테이블 확인
  const rows = page.locator("table tbody tr");
  await expect(rows).toHaveCount(3);

  // 4. PDF 다운로드 버튼 확인
  const downloadBtn = page.locator('button:has-text("PDF 다운로드")');
  await expect(downloadBtn).toBeVisible();
});

test("잘못된 토큰 URL 접근 시 404", async ({ page }) => {
  await page.goto("/quotes/invalid-token", { waitUntil: "networkidle" });
  await expect(page.locator("text=찾을 수 없습니다")).toBeVisible();
});
```

### 규칙

- **테스트 작성**: Task 문서의 "## 테스트 체크리스트" 섹션 포함 필수 (API/비즈니스 로직)
- **테스트 위치**: `e2e/[task-name].spec.ts`
- **UI 테스트**: 페이지 렌더링 후 인터랙션 검증 필수
- **API 테스트**: 상태 코드, 응답 데이터 구조, 에러 메시지 검증
- **통합 테스트**: 관리자 로그인 → 대시보드 → 공유 링크 접근 플로우

---

## 13. File Interaction Standards

### 메타데이터 동적 생성 패턴

공개 페이지 (`/quotes/[token]`)에서 동적 메타데이터 생성:

```typescript
// app/quotes/[token]/page.tsx
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { token: string };
}): Promise<Metadata> {
  const quote = await getQuoteByToken(params.token);

  if (!quote) {
    return { title: "찾을 수 없습니다" };
  }

  return {
    title: `견적서: ${quote.title}`,
    description: `클라이언트: ${quote.clientName}, 금액: ₩${quote.totalAmount.toLocaleString()}`,
    openGraph: {
      title: `견적서 ${quote.title}`,
      description: quote.clientName,
      type: "website",
      // og:image는 향후 동적 생성 구현
    },
  };
}
```

### 타입 변환 흐름

```
노션 API 응답
  ↓
lib/notion/mappers.ts (mapNotionPageToQuote)
  ↓
lib/types/quote.ts (Quote 타입)
  ↓
components/quote/* (렌더링)
  ↓
app/api/quotes/[token]/route.ts (JSON 응답)
```

### 동시 수정 필수 파일

모든 타입 변경 시:

- `lib/types/quote.ts` (타입 정의)
- `lib/notion/mappers.ts` (매핑 로직)
- `components/quote/*` (컴포넌트)
- `app/api/quotes/[token]/route.ts` (API 응답)

---

## 14. Task Management Workflow

### 디렉토리 구조

```
/tasks/
├── 000-sample.md           # 샘플 (참고용)
├── 001-routing-setup.md    # 완료된 작업
├── 002-type-definitions.md # 진행 중
└── ...
```

### Task 파일 형식

```markdown
# Task 002: 타입 정의 및 인터페이스 설계

## 명세

(작업 설명)

## 구현 단계

- [ ] lib/types/quote.ts 파일 생성
- [ ] Quote 인터페이스 정의
- [ ] QuoteItem 인터페이스 정의
- [ ] QuoteStatus 유니온 타입 정의

## 진행 상황

- [x] 단계 1 완료
- [ ] 단계 2 진행 중

## 테스트 체크리스트

(API/비즈니스 로직인 경우)

- [ ] 테스트 항목 1
- [ ] 테스트 항목 2

## 변경 사항 요약

(완료 후 작성)

- File: lib/types/quote.ts - Quote, QuoteItem, QuoteStatus 인터페이스 정의
```

### ROADMAP.md 업데이트 규칙

작업 완료 후:

```markdown
- ✅ Task 001: 프로젝트 구조 및 라우팅 설정
- 🔄 Task 002: 타입 정의 및 인터페이스 설계
- ⏳ Task 003: 공통 컴포넌트 및 디자인 시스템 구축
```

---

## 15. Prohibited Actions

### ❌ 절대 금지

| 항목                                 | 이유                           | 대안                                             |
| ------------------------------------ | ------------------------------ | ------------------------------------------------ |
| **다중 주석 블록 (`/** ... \*/`)\*\* | 과도한 문서화, 유지보수 어려움 | 한 줄 주석 + 구체적 이름                         |
| **enum 사용**                        | 확장성 떨어짐                  | 유니온 타입 (`type Status = '...' \| '...'`)     |
| **dangerouslySetInnerHTML**          | XSS 취약점                     | 안전한 텍스트 렌더링만                           |
| **하드코딩된 API URL**               | 배포 환경별 차이 처리 불가     | 환경 변수 사용                                   |
| **any 타입**                         | 타입 안정성 상실               | unknown + 타입 가드                              |
| **console.log 남기기**               | 프로덕션에서 성능 저하         | 개발 시 사용 후 제거 또는 debug 라이브러리       |
| **전역 변수**                        | 상태 관리 혼란                 | Context API 또는 로컬 상태                       |
| **무한 루프**                        | 메모리 누수                    | 재귀 기저 조건 또는 무한 제너레이터 사용 시 주의 |
| **비밀번호 평문 저장**               | 보안 침해                      | bcrypt 해싱 (또는 환경 변수에 해시값 저장)       |
| **Props Drilling (3단계 이상)**      | 코드 복잡도 증가               | Context API 또는 컴포넌트 구조 재설계            |

### ❌ 피해야 할 패턴

```typescript
// ❌ 과도한 추상화
const createQuoteValidator = (rules: Rule[]) => (quote: Quote) =>
  validateQuoteByRules(quote, rules);

// ✅ 직관적
function validateQuote(quote: Quote): boolean {
  return quote.title && quote.clientName && quote.items.length > 0;
}

// ❌ 장기 대기
async function waitForNotionSync() {
  while (true) {
    await new Promise((r) => setTimeout(r, 1000));
  }
}

// ✅ 명시적 대기
await new Promise((r) => setTimeout(r, 5000)); // 노션 API 동기화 대기
```

### ❌ 문서화 금지

- 커밋 메시지에 PR/Issue 링크 (나중에 링크 깨짐)
- "Task 002 구현" 같은 태스크 참조 (로드맵 변경 시 오래됨)
- 일반적 프로그래밍 개념 설명 (모든 개발자가 알아야 함)

---

## 16. Decision Trees

### API 엔드포인트 추가 시

```
1. 공개 접근인가? (인증 불필요)
   ├─ YES → /api/quotes/[token]/route.ts 사용
   │         └─ shareToken 검증 필수
   └─ NO → /api/quotes/route.ts 사용
           └─ next-auth 미들웨어 보호

2. 데이터 소스는?
   ├─ 노션 DB → lib/notion/queries.ts 호출
   └─ 로컬 계산 → 유틸리티 함수 구현

3. 응답 형식
   └─ { success: boolean, data?: T, error?: ErrorInfo }
```

### 컴포넌트 위치 결정

```
1회 이상 재사용되는가?
├─ YES → components/quote/ 또는 components/layout/
└─ NO → 페이지 내부 또는 app/ 아래

shadcn/ui 기반인가?
├─ YES → components/ui/ (자동 생성, 수정 금지)
└─ NO → components/[domain]/
```

### 상태 관리 선택

```
전역으로 공유되어야 하는가?
├─ YES → React Context (useContext)
└─ NO → 로컬 상태 (useState)

업데이트 빈도?
├─ 높음 (초당 여러 번) → useMemo로 최적화
└─ 낮음 (사용자 인터랙션) → 기본 useState
```

---

## 17. Monitoring & Logging

### 구조화된 로깅 (예정)

```typescript
// 노션 API 호출 로깅
const requestId = crypto.randomUUID();
console.log(
  JSON.stringify({
    requestId,
    timestamp: new Date().toISOString(),
    action: "notion_query",
    database_id: process.env.NOTION_DATABASE_ID,
    duration_ms: Date.now() - startTime,
  }),
);
```

### 에러 추적 (Sentry 예정)

```typescript
try {
  await getQuoteByToken(token);
} catch (error) {
  Sentry.captureException(error, {
    tags: { action: "fetch_quote" },
    extra: { token },
  });
}
```

---

## 18. Performance Guidelines

### 이미지 최적화

```tsx
// ❌ HTML img
<img src="/image.jpg" alt="..." />;

// ✅ Next.js Image
import Image from "next/image";

<Image
  src="/image.jpg"
  alt="..."
  width={800}
  height={600}
  priority={isBelowFold}
/>;
```

### 번들 분할

```typescript
// 큰 라이브러리는 동적 import
const PDFDocument = dynamic(() => import("@react-pdf/renderer"), {
  ssr: false,
});
```

### 캐싱 전략 (향후)

```typescript
// revalidate 설정으로 ISR 구현
export const revalidate = 3600; // 1시간마다 재생성
```

---

## Summary

이 표준 문서는 **AI 에이전트의 자동 코드 생성 및 수정을 위한 가이드**입니다. 모든 개발은 다음 원칙을 따릅니다:

1. **타입 안정성**: TypeScript strict mode
2. **최소 주석**: WHY만 설명
3. **테스트 필수**: API/비즈니스 로직 변경 시 E2E 테스트
4. **환경 분리**: 환경 변수 사용
5. **인증 및 보안**: next-auth v5 + 토큰 기반 공개 접근
6. **노션 API**: 매퍼 패턴으로 타입 변환
7. **문서 동기화**: 타입 변경 시 다중 파일 동시 수정

---

**Last Updated**: 2026-04-19
