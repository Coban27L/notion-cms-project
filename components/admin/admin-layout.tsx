"use client";

import { useState } from "react";
import { AdminSidebar } from "./admin-sidebar";
import { AdminHeader } from "./admin-header";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSkipToMain = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.querySelector("main");
    if (mainContent) {
      mainContent.setAttribute("tabindex", "-1");
      mainContent.focus();
      mainContent.addEventListener(
        "blur",
        () => {
          mainContent.removeAttribute("tabindex");
        },
        { once: true },
      );
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Skip to main content link */}
      <a
        href="#main-content"
        onClick={handleSkipToMain}
        className="absolute top-0 left-0 z-50 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-br -translate-y-full focus:translate-y-0 transition-transform"
      >
        주 콘텐츠로 이동
      </a>
      {/* 사이드바 */}
      <AdminSidebar />

      {/* 메인 콘텐츠 */}
      <main id="main-content" className="flex-1 flex flex-col overflow-hidden">
        {/* 헤더 */}
        <AdminHeader onMobileMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        {/* 콘텐츠 영역 */}
        <div
          className="flex-1 overflow-auto"
          role="region"
          aria-label="메인 콘텐츠"
        >
          <div className="container mx-auto px-4 py-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
