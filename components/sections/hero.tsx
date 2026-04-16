import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-20 md:py-32">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Next.js 16으로 빠르게 시작하세요
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          shadcn/ui, Tailwind CSS, TypeScript로 구축한 모던 웹 스타터킷.
          <br />
          검증된 라이브러리만 사용하여 바퀴를 재발명하지 않습니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button size="lg">대시보드 보기</Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline">
              자세히 알아보기
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
