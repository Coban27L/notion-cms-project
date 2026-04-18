# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

- PRD 문서: @docs/PRD.md
- 개발 로드맵: @docs/ROADMAP.md

## 프로젝트 개요

Next.js 16 기반 스타터 템플릿입니다. React 19, TypeScript, Tailwind CSS, 그리고 shadcn/ui를 사용하여 빠르게 웹 애플리케이션을 시작할 수 있도록 설계되었습니다.

## 개발 명령어

```bash
npm run dev      # 개발 서버 시작 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 시작
npm run lint     # ESLint 실행
```

## 프로젝트 구조

```
app/                          # Next.js App Router
├── layout.tsx               # 루트 레이아웃 (Header, Footer 포함)
├── page.tsx                 # 홈 페이지
├── dashboard/               # 대시보드 라우트
├── about/                   # 소개 페이지
├── privacy/                 # 개인정보 보호 정책
├── terms/                   # 이용약관
└── globals.css              # 전역 스타일

components/
├── ui/                      # shadcn/ui 컴포넌트들 (버튼, 다이얼로그, 폼 등)
├── layout/                  # Header, Footer 같은 레이아웃 컴포넌트
└── sections/                # 홈페이지 섹션들 (Hero, Features, CTA)

lib/
└── utils.ts                 # 유틸리티 함수 (cn() 등)

hooks/                       # 커스텀 React hooks (필요시)
```

## 주요 기술 스택

- **Framework**: Next.js 16.2.2 (App Router)
- **UI Library**: React 19.2.4
- **언어**: TypeScript 5
- **스타일**: Tailwind CSS 4 + shadcn/ui (base-nova)
- **폼 처리**: react-hook-form + zod (유효성 검사)
- **테마**: next-themes (다크/라이트 모드)
- **알림**: sonner (toast notifications)
- **아이콘**: lucide-react

## 주요 아키텍처

### 1. Next.js App Router
- `app/` 디렉토리 기반의 파일 시스템 라우팅
- `layout.tsx`로 공유 레이아웃 정의
- `page.tsx`로 각 라우트의 페이지 정의
- 서버 컴포넌트를 기본으로 사용 (필요시 `'use client'` 지시어 사용)

### 2. 컴포넌트 구조
- **UI 컴포넌트** (`components/ui/`): shadcn/ui에서 제공하는 저수준 컴포넌트들
  - Button, Card, Dialog, Input, Label, Select 등
  - 모두 TypeScript와 Tailwind CSS로 작성됨
- **레이아웃 컴포넌트** (`components/layout/`): Header, Footer 등 페이지 전체에서 사용되는 컴포넌트
- **섹션 컴포넌트** (`components/sections/`): 홈페이지 등에서 사용되는 큰 섹션

### 3. 스타일링
- Tailwind CSS 4를 기본 스타일링 방식으로 사용
- `lib/utils.ts`에 `cn()` 함수로 클래스명 병합 (clsx + tailwind-merge 사용)
- CSS 변수 기반의 테마 시스템 (Tailwind config에서 정의)

### 4. 테마 시스템
- `next-themes` 라이브러리로 다크/라이트 모드 지원
- `ThemeProvider`로 감싸서 전역에서 테마 사용 가능
- 기본값은 시스템 설정 따름

## TypeScript 설정

- Path alias: `@/*`로 시작하는 임포트는 프로젝트 루트 기준
  - `@/components` → `components`
  - `@/lib` → `lib`
- Strict 모드 활성화: 타입 안정성 최대화
- React JSX Transform 사용: `import React` 생략 가능

## ESLint 설정

- `eslint.config.mjs`에서 정의
- Next.js Core Web Vitals 규칙 포함
- TypeScript 지원
- 무시 대상: `.next/`, `out/`, `build/`, `next-env.d.ts`

## shadcn/ui 사용 방법

1. **컴포넌트 추가**: `npx shadcn-ui@latest add <component-name>`
2. **설정**: `components.json`에 정의된 별칭을 사용
   - 컴포넌트: `@/components/ui`
   - 유틸: `@/lib/utils`
3. **스타일**: base-nova 스타일 사용, CSS 변수 기반 커스터마이징 가능

## 폼 처리

react-hook-form + zod 조합:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, '이름을 입력하세요'),
});

export function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  // ...
}
```

## 주의사항

- **다국어 지원**: `layout.tsx`에서 `lang="ko"` 설정 (영문 전환 시 변경 필요)
- **이미지 최적화**: `next/image` 컴포넌트 사용 권장
- **API 라우트**: 필요시 `app/api/` 디렉토리에 추가
- **환경 변수**: `.env.local` 사용 (`.env.example` 제공 권장)

## Next.js 16 주의사항

프로젝트의 AGENTS.md에 명시된 대로, 이 버전의 Next.js는 트레이닝 데이터와 다를 수 있습니다:
- `node_modules/next/dist/docs/` 의 가이드를 확인하세요
- 변경된 API나 deprecated 기능에 주의하세요

## 자주 수정되는 파일들

- `app/layout.tsx`: 레이아웃, 메타데이터, 테마 설정
- `components/layout/header.tsx`: 네비게이션 메뉴
- `components/layout/footer.tsx`: 푸터 컨텐츠
- `app/globals.css`: 전역 스타일
