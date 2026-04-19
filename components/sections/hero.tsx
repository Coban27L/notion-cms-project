import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileTextIcon } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-20 md:py-32">
      <div className="max-w-2xl text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-2xl bg-primary/10">
            <FileTextIcon className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          노션으로 관리하는<br />견적서 시스템
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          노션 DB에 견적서를 작성하면 자동으로 웹에서 확인 가능합니다.
          <br />
          고유 링크로 클라이언트에게 공유하고 PDF로 다운받으세요.
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
    </section>
  );
}
