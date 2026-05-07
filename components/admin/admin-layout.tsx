'use client';

import { AdminSidebar } from './admin-sidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      {/* 사이드바 */}
      <AdminSidebar />

      {/* 메인 콘텐츠 */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* 헤더 공간 (Task 017에서 구현) */}
        <div className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex-shrink-0" />

        {/* 콘텐츠 영역 */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
