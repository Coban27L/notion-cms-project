# 노션 CMS 견적서 시스템

노션(Notion)을 CMS로 활용하여 견적서를 작성하고, 클라이언트가 고유 링크를 통해 웹에서 확인 및 PDF로 다운로드할 수 있는 시스템입니다.

## 주요 기능

- **노션 기반 CMS**: 노션 API를 통해 견적서 데이터를 동적으로 조회
- **웹 대시보드**: 관리자용 견적서 목록 조회 및 관리
- **클라이언트 공유**: 토큰 기반 고유 링크로 클라이언트가 인증 없이 견적서 접근
- **PDF 다운로드**: 견적서를 PDF로 변환하여 다운로드 기능
- **반응형 디자인**: 모바일/태블릿/데스크톱 모두 지원

## 기술 스택

- **Framework**: [Next.js](https://nextjs.org) 16 (App Router)
- **UI Library**: [React](https://react.dev) 19
- **언어**: [TypeScript](https://www.typescriptlang.org) 5
- **스타일**: [Tailwind CSS](https://tailwindcss.com) 4 + [shadcn/ui](https://ui.shadcn.com)
- **폼 처리**: [react-hook-form](https://react-hook-form.com) + [zod](https://zod.dev)
- **API 클라이언트**: [@notionhq/client](https://developers.notion.com/reference/intro)
- **PDF 생성**: [@react-pdf/renderer](https://react-pdf.org)
- **인증**: [next-auth](https://next-auth.js.org) v5
- **아이콘**: [lucide-react](https://lucide.dev)
- **알림**: [sonner](https://sonner.emilkowal.ski)

## 프로젝트 구조

```
.
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 루트 레이아웃
│   ├── page.tsx             # 홈 페이지 (랜딩)
│   ├── login/               # 로그인 페이지
│   ├── dashboard/           # 관리자 대시보드
│   └── quote/[token]/       # 견적서 상세 페이지
├── components/
│   ├── ui/                  # shadcn/ui 컴포넌트
│   ├── layout/              # Header, Footer 등
│   └── sections/            # 페이지 섹션들
├── lib/
│   └── utils.ts             # 유틸리티 함수
├── public/                  # 정적 자산
└── PRD.md                   # 상세 명세서
```

## 시작하기

### 1. 저장소 클론

```bash
git clone https://github.com/your-username/notion-cms-quotation.git
cd notion-cms-quotation
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수들을 설정합니다:

```env
# 노션 API
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_notion_database_id

# 관리자 인증
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password

# next-auth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

## 사용 가능한 명령어

```bash
npm run dev      # 개발 서버 시작
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 시작
npm run lint     # ESLint 실행
```

## 노션 DB 설정

견적서 시스템을 사용하기 위해 노션에 다음 필드를 가진 데이터베이스를 생성해야 합니다:

| 필드명       | 타입      | 설명                          |
| ------------ | --------- | ----------------------------- |
| title        | Title     | 견적서 번호 (예: QT-2024-001) |
| client_name  | Text      | 클라이언트 이름/회사명        |
| status       | Select    | 상태 (발행/승인/취소)         |
| total_amount | Number    | 견적 총액                     |
| issued_date  | Date      | 발행일                        |
| valid_until  | Date      | 견적 유효기간                 |
| share_token  | Text      | 고유 공유 토큰 (UUID)         |
| items        | Rich Text | 항목 정보 (JSON 형식)         |
| notes        | Rich Text | 비고/특이사항                 |

## 배포

### Vercel 배포 (권장)

```bash
vercel deploy
```

### 기타 플랫폼

Next.js는 Node.js를 지원하는 모든 플랫폼에 배포 가능합니다.

자세한 정보: [Next.js 배포 가이드](https://nextjs.org/docs/app/building-your-application/deploying)

## 라이선스

MIT

## 문의

질문이나 피드백이 있으면 이슈를 생성해주세요.
