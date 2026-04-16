import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Zap,
  PaletteIcon,
  Code2,
  Lock,
  Smartphone,
  Workflow,
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "빠른 성능",
    description: "Next.js 16의 Turbopack으로 초고속 빌드와 개발 서버",
    icon: Zap,
  },
  {
    id: 2,
    title: "아름다운 UI",
    description: "shadcn/ui와 Tailwind CSS로 만든 세련된 컴포넌트",
    icon: PaletteIcon,
  },
  {
    id: 3,
    title: "완전한 타입 안전성",
    description: "TypeScript strict 모드로 런타임 오류 방지",
    icon: Code2,
  },
  {
    id: 4,
    title: "다크모드 지원",
    description: "next-themes로 구현한 완벽한 다크모드 토글",
    icon: Lock,
  },
  {
    id: 5,
    title: "반응형 디자인",
    description: "모바일부터 데스크탑까지 최적화된 레이아웃",
    icon: Smartphone,
  },
  {
    id: 6,
    title: "검증된 라이브러리",
    description: "직접 구현 대신 업계 표준 라이브러리만 사용",
    icon: Workflow,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">핵심 기능</h2>
          <p className="text-lg text-muted-foreground">
            현대적인 웹 개발에 필요한 모든 것을 준비했습니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.id} className="hover:border-primary transition-colors">
                <CardHeader>
                  <div className="mb-3 p-2 w-fit rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
