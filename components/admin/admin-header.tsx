"use client";

import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, Bell, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminHeaderProps {
  onMobileMenuToggle?: () => void;
}

export function AdminHeader({ onMobileMenuToggle }: AdminHeaderProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  // 페이지 제목 가져오기
  const getPageTitle = () => {
    if (pathname === "/dashboard") return "견적서 관리";
    if (pathname === "/dashboard/statistics") return "통계";
    if (pathname === "/dashboard/settings") return "설정";
    return "대시보드";
  };

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  return (
    <header
      className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-40 backdrop-blur-sm bg-white/80 dark:bg-slate-950/80"
      role="banner"
    >
      <div className="h-full px-6 flex items-center justify-between">
        {/* 좌측: 페이지 제목 + 모바일 햄버거 */}
        <div className="flex items-center gap-4">
          {/* 모바일 햄버거 버튼 */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            onClick={onMobileMenuToggle}
            aria-label="네비게이션 메뉴 열기"
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </Button>

          {/* 페이지 제목 */}
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
            {getPageTitle()}
          </h1>
        </div>

        {/* 우측: 테마 토글 + 알림 + 사용자 드롭다운 */}
        <div className="flex items-center gap-2">
          {/* 테마 토글 */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`${theme === "dark" ? "라이트" : "다크"} 모드로 전환`}
            title={`${theme === "dark" ? "라이트" : "다크"} 모드로 전환`}
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            {theme === "dark" ? (
              <Sun
                className="w-5 h-5 text-slate-600 dark:text-slate-300"
                aria-hidden="true"
              />
            ) : (
              <Moon
                className="w-5 h-5 text-slate-600 dark:text-slate-300"
                aria-hidden="true"
              />
            )}
          </Button>

          {/* 알림 버튼 (placeholder) */}
          <Button
            variant="ghost"
            size="icon"
            className="relative focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label="알림 (준비 중)"
            title="알림 (준비 중)"
            disabled
          >
            <Bell className="w-5 h-5 text-slate-400" aria-hidden="true" />
            {/* 알림 배지 (향후 구현) */}
            {/* <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" /> */}
          </Button>

          {/* 사용자 드롭다운 */}
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <button
                className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition-all"
                aria-label={`사용자 메뉴: ${session?.user?.email || "관리자"}`}
              >
                <span className="text-xs font-semibold text-white">
                  {session?.user?.email?.charAt(0).toUpperCase() || "A"}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {/* 사용자 정보 */}
              <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  관리자
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {session?.user?.email}
                </p>
              </div>

              {/* 메뉴 항목 */}
              <DropdownMenuItem
                disabled
                className="text-slate-500 cursor-not-allowed"
              >
                프로필 설정
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled
                className="text-slate-500 cursor-not-allowed"
              >
                계정 설정
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* 로그아웃 */}
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 dark:text-red-400"
                aria-label="로그아웃"
              >
                <LogOut className="w-4 h-4 mr-2" aria-hidden="true" />
                로그아웃
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
