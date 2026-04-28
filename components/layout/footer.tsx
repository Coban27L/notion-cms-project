import Link from 'next/link';
import { FileTextIcon } from 'lucide-react';
import { FooterYear } from './footer-year';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-bold">
              <FileTextIcon className="h-5 w-5 text-primary" />
              노션 CMS
            </div>
            <p className="text-sm text-muted-foreground">
              노션 기반 견적서 발행 및 공유 플랫폼
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-sm">서비스</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  홈
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  대시보드
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                  관리자 로그인
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-sm">법률</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  개인정보 보호
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  이용약관
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © <FooterYear /> 노션 CMS. 모든 권리 보유.
          </p>
        </div>
      </div>
    </footer>
  );
}
