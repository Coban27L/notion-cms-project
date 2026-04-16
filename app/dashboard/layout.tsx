import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "대시보드",
  description: "스타터킷 대시보드",
};

function DashboardSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-10 w-32 bg-muted rounded-lg animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-0 md:gap-6">
      {/* 향후 사이드바 추가 */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <Suspense fallback={<DashboardSkeleton />}>
            {children}
          </Suspense>
        </div>
      </main>
    </div>
  );
}
