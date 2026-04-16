import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

const technologies = [
  { name: "Next.js 16", description: "최신 프레임워크", category: "Framework" },
  { name: "React 19", description: "최신 라이브러리", category: "Library" },
  { name: "TypeScript", description: "타입 안전성", category: "Language" },
  { name: "Tailwind CSS v4", description: "스타일링", category: "Styling" },
  { name: "shadcn/ui", description: "UI 컴포넌트", category: "Components" },
  { name: "lucide-react", description: "아이콘", category: "Icons" },
  { name: "next-themes", description: "다크모드", category: "Utility" },
  { name: "usehooks-ts", description: "React 훅", category: "Utility" },
  { name: "react-hook-form", description: "폼 관리", category: "Forms" },
  { name: "zod", description: "스키마 검증", category: "Validation" },
  { name: "sonner", description: "토스트 알림", category: "Notifications" },
];

const benefits = [
  "바퀴를 재발명하지 않는 철학 — 검증된 라이브러리만 사용",
  "완전한 TypeScript 지원 — strict 모드로 런타임 오류 방지",
  "다크모드 완벽 지원 — next-themes로 구현",
  "반응형 디자인 — 모든 디바이스에 최적화",
  "shadcn/ui 컴포넌트 — 25개 이상의 UI 컴포넌트 포함",
  "SEO 최적화 — Next.js의 메타데이터 API 활용",
  "성능 최적화 — Turbopack으로 빠른 개발 경험",
  "확장 가능한 구조 — 계층화된 컴포넌트 아키텍처",
];

export const metadata: Metadata = {
  title: "소개",
  description: "Next.js 16 스타터킷 소개 페이지",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 space-y-12 py-8">
      {/* 소개 */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Next.js 16 스타터킷</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          이 스타터킷은 현대적인 웹 개발에 필요한 모든 것을 포함하고 있습니다.
          검증된 라이브러리만 사용하여 빠르고 안정적인 개발을 시작할 수 있습니다.
        </p>
      </section>

      {/* 기술 스택 */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">기술 스택</h2>
          <p className="text-muted-foreground">
            업계 표준 및 최신 기술로 구성되었습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {technologies.map((tech, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{tech.name}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {tech.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {tech.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 특징 */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">스타터킷의 특징</h2>
          <p className="text-muted-foreground">
            다음 항목들이 이미 준비되어 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((benefit, index) => (
            <Card key={index}>
              <CardContent className="pt-6 flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">{benefit}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 시작하기 */}
      <section className="space-y-4 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-8">
        <h2 className="text-2xl font-bold">지금 시작하세요</h2>
        <p className="text-muted-foreground">
          이 스타터킷을 기반으로 당신의 다음 프로젝트를 시작해보세요.
          모든 기초가 준비되어 있으니 비즈니스 로직에만 집중할 수 있습니다.
        </p>
        <ul className="space-y-2 text-sm">
          <li>✓ 25개+ shadcn/ui 컴포넌트 포함</li>
          <li>✓ 검증된 라이브러리 사용</li>
          <li>✓ TypeScript strict 모드 활성화</li>
          <li>✓ 다크모드 완벽 지원</li>
        </ul>
      </section>

      {/* 참고 자료 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">참고 자료</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold mb-2">Next.js 공식 문서</h3>
            <p className="text-sm text-muted-foreground">
              Next.js의 모든 기능과 API에 대해 배우세요.
            </p>
          </a>
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold mb-2">shadcn/ui 문서</h3>
            <p className="text-sm text-muted-foreground">
              UI 컴포넌트 라이브러리 문서를 확인하세요.
            </p>
          </a>
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold mb-2">Tailwind CSS</h3>
            <p className="text-sm text-muted-foreground">
              Utility-first CSS 프레임워크 문서입니다.
            </p>
          </a>
          <a
            href="https://www.typescriptlang.org"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold mb-2">TypeScript</h3>
            <p className="text-sm text-muted-foreground">
              타입 안전한 JavaScript 문서입니다.
            </p>
          </a>
        </div>
      </section>
    </div>
  );
}
