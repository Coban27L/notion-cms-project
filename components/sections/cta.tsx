import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 md:py-32 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="rounded-lg border border-primary/20 bg-linear-to-br from-primary/5 to-primary/10 p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            노션에 견적서를 등록하고 관리자로 로그인하여
            <br />
            클라이언트에게 공유 링크를 전달해보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg">관리자 로그인</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">
                대시보드 보기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
