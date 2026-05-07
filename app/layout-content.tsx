"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface RootLayoutContentProps {
  children: React.ReactNode;
}

export function RootLayoutContent({ children }: RootLayoutContentProps) {
  const pathname = usePathname();

  // 대시보드 경로에서는 Header/Footer 숨기기
  const isAdminRoute = pathname.startsWith("/dashboard");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
