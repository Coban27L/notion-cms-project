import { Metadata } from 'next';
import { Suspense } from 'react';
import { AdminLayout } from '@/components/admin/admin-layout';

export const metadata: Metadata = {
  title: '견적서 대시보드',
  description: '견적서 목록을 관리하는 관리자 대시보드',
};

function DashboardSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-10 w-48 bg-muted rounded-lg animate-pulse" />
      <div className="h-10 w-full bg-muted rounded-lg animate-pulse" />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout>
      <Suspense fallback={<DashboardSkeleton />}>
        {children}
      </Suspense>
    </AdminLayout>
  );
}
