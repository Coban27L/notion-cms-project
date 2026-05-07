'use client';

import { useState } from 'react';
import { AdminSidebar } from './admin-sidebar';
import { AdminHeader } from './admin-header';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* 사이드바 */}
      <AdminSidebar />

      {/* 메인 콘텐츠 */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* 헤더 */}
        <AdminHeader onMobileMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        {/* 콘텐츠 영역 */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
