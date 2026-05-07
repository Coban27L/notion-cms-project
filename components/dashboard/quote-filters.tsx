"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuoteFiltersProps {
  viewType?: "card" | "table";
  onViewChange?: (view: "card" | "table") => void;
}

const SORT_OPTIONS = [
  { value: "date-desc", label: "최근 순" },
  { value: "date-asc", label: "오래된 순" },
  { value: "amount-desc", label: "높은 금액순" },
  { value: "amount-asc", label: "낮은 금액순" },
  { value: "client-asc", label: "클라이언트명 A-Z" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "전체" },
  { value: "대기", label: "대기" },
  { value: "발행", label: "발행" },
  { value: "승인", label: "승인" },
  { value: "취소", label: "취소" },
];

export function QuoteFilters({
  viewType = "card",
  onViewChange,
}: QuoteFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const currentSort = searchParams.get("sort") || "date-desc";
  const currentStatus = searchParams.get("status") || "all";

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    router.push(`/dashboard?${params.toString()}`);
  };

  const handleSort = (value: string | null) => {
    if (!value) return;
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    router.push(`/dashboard?${params.toString()}`);
  };

  const handleStatus = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("status", value);
    router.push(`/dashboard?${params.toString()}`);
  };

  const handleClearFilters = () => {
    router.push("/dashboard");
  };

  const hasActiveFilters =
    currentSearch || currentSort !== "date-desc" || currentStatus !== "all";

  return (
    <div className="space-y-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4">
      {/* 검색 + 정렬 */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        {/* 검색 입력 */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="클라이언트명, 견적서 번호로 검색..."
            value={currentSearch}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* 정렬 선택 */}
        <Select
          value={currentSort}
          onValueChange={(value) => handleSort(value || "")}
        >
          <SelectTrigger className="w-full md:w-48">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            <SelectValue placeholder="정렬" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* 뷰 전환 토글 */}
        {onViewChange && (
          <div className="flex gap-1 border border-slate-300 dark:border-slate-700 rounded-lg p-1 bg-white dark:bg-slate-950">
            <Button
              size="sm"
              variant={viewType === "card" ? "default" : "ghost"}
              onClick={() => onViewChange("card")}
              className="text-xs"
            >
              카드
            </Button>
            <Button
              size="sm"
              variant={viewType === "table" ? "default" : "ghost"}
              onClick={() => onViewChange("table")}
              className="text-xs"
            >
              테이블
            </Button>
          </div>
        )}
      </div>

      {/* 상태 필터 + 필터 초기화 */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* 상태 필터 칩 */}
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((option) => (
            <Button
              key={option.value}
              variant={currentStatus === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => handleStatus(option.value)}
              className={
                currentStatus === option.value
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : ""
              }
            >
              {option.label}
            </Button>
          ))}
        </div>

        {/* 필터 초기화 버튼 */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            필터 초기화
          </Button>
        )}
      </div>
    </div>
  );
}
