'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, BarChart3, Settings, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { signOut } from 'next-auth/react';

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('adminSidebarCollapsed');
    if (saved) setIsCollapsed(JSON.parse(saved));
  }, []);

  const handleToggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('adminSidebarCollapsed', JSON.stringify(newState));
  };

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' });
  };

  const menuItems = [
    {
      icon: Home,
      label: '대시보드',
      href: '/dashboard',
      active: pathname === '/dashboard',
    },
    {
      icon: BarChart3,
      label: '통계',
      href: '/dashboard/statistics',
      active: pathname === '/dashboard/statistics',
      disabled: true,
    },
    {
      icon: Settings,
      label: '설정',
      href: '/dashboard/settings',
      active: pathname === '/dashboard/settings',
      disabled: true,
    },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-900 text-white">
      {/* 로고 */}
      <div className="p-6 border-b border-slate-800">
        <h1 className={`font-bold text-lg ${isCollapsed ? 'hidden md:block text-center' : ''}`}>
          {isCollapsed ? '견' : '견적서 관리'}
        </h1>
      </div>

      {/* 메뉴 */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                item.active
                  ? 'bg-blue-600 text-white'
                  : item.disabled
                    ? 'text-slate-500 cursor-not-allowed opacity-50'
                    : 'hover:bg-slate-800 text-slate-300'
              } ${item.disabled ? 'pointer-events-none' : ''}`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm">{item.label}</span>}
              {item.disabled && !isCollapsed && <span className="text-xs ml-auto text-slate-500">(예정)</span>}
            </Link>
          );
        })}
      </nav>

      {/* 로그아웃 */}
      <div className="p-4 border-t border-slate-800 space-y-3">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start gap-3 text-slate-300 hover:text-white hover:bg-slate-800"
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span>로그아웃</span>}
        </Button>
      </div>

      {/* 접기/펼치기 버튼 (데스크톱) */}
      <div className="hidden md:flex p-4 border-t border-slate-800">
        <Button
          onClick={handleToggleCollapse}
          variant="ghost"
          size="sm"
          className="w-full text-xs text-slate-400 hover:text-slate-200"
        >
          {isCollapsed ? '펼치기' : '접기'}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* 모바일: Sheet/Drawer */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="md:hidden">
          <div className="fixed bottom-6 right-6 z-40">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* 데스크톱: 고정 사이드바 */}
      <aside
        className={`hidden md:flex flex-col border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
