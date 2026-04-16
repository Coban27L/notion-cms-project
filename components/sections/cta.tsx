import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 md:py-32 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            이 스타터킷을 기반으로 당신의 다음 프로젝트를 시작해보세요.
            <br />
            모든 기초가 준비되어 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg">프로젝트 시작</Button>
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline">
                GitHub에서 보기
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
