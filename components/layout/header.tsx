'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { FileTextIcon, Menu } from 'lucide-react';

export function Header() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <FileTextIcon className="h-6 w-6 text-primary" />
          노션 CMS
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link href="/" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors">
            홈
          </Link>
          <Link href="/dashboard" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors">
            대시보드
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <div className="hidden md:flex md:items-center md:gap-2">
            {session ? (
              <>
                <Link href="/dashboard" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors">
                  대시보드
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button size="sm">로그인</Button>
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger className="p-2 hover:bg-accent rounded-lg transition-colors" aria-label="메뉴">
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex items-center gap-2 font-bold text-lg mb-8">
                  <FileTextIcon className="h-6 w-6 text-primary" />
                  노션 CMS
                </div>
                <nav className="flex flex-col gap-2">
                  <Link href="/" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    홈
                  </Link>
                  <Link href="/dashboard" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    대시보드
                  </Link>
                  <div className="border-t border-border my-2" />
                  {session ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        signOut({ callbackUrl: '/' });
                      }}
                    >
                      로그아웃
                    </Button>
                  ) : (
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button size="sm" className="w-full">로그인</Button>
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
