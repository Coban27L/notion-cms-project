/**
 * 디자인 토큰 상수
 * - Tailwind CSS 유틸리티 클래스 기반 중앙 집중식 관리
 * - 컴포넌트 전반에서 일관된 스타일 적용을 위해 사용
 * - CSS 변수 기반 색상(text-foreground 등)으로 다크모드 자동 지원
 */

/**
 * 간격(Gap) 토큰
 * - Flexbox/Grid 레이아웃의 gap 값
 */
export const SPACING = {
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
} as const;

/**
 * 패딩 토큰
 * - 컴포넌트 내부 여백
 */
export const PADDING = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
} as const;

/**
 * 테두리 반경(Border Radius) 토큰
 */
export const RADIUS = {
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  full: 'rounded-full',
} as const;

/**
 * 그림자(Shadow) 토큰
 */
export const SHADOWS = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  none: 'shadow-none',
} as const;

/**
 * 트랜지션 토큰
 * - 호버, 상태 변화 애니메이션
 */
export const TRANSITIONS = {
  fast: 'transition-all duration-150 ease-in-out',
  normal: 'transition-all duration-200 ease-in-out',
  slow: 'transition-all duration-300 ease-in-out',
} as const;

/**
 * 견적서 상태별 색상 맵핑
 * - QuoteStatus 유니온 타입과 동기화
 * - 배지, 통계 카드, 필터 등 전반에서 사용
 */
export const STATUS_COLORS = {
  대기: {
    badge: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    iconBg: 'bg-slate-100 dark:bg-slate-800',
    iconColor: 'text-slate-600 dark:text-slate-400',
    valueColor: 'text-slate-700 dark:text-slate-300',
    dot: 'bg-slate-500',
  },
  발행: {
    badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
    iconBg: 'bg-amber-50 dark:bg-amber-950',
    iconColor: 'text-amber-600 dark:text-amber-400',
    valueColor: 'text-amber-700 dark:text-amber-300',
    dot: 'bg-amber-500',
  },
  승인: {
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
    iconBg: 'bg-emerald-50 dark:bg-emerald-950',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    valueColor: 'text-emerald-700 dark:text-emerald-300',
    dot: 'bg-emerald-500',
  },
  취소: {
    badge: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800',
    iconBg: 'bg-red-50 dark:bg-red-950',
    iconColor: 'text-red-600 dark:text-red-400',
    valueColor: 'text-red-700 dark:text-red-300',
    dot: 'bg-red-500',
  },
} as const;

/**
 * 카드 레이아웃 토큰
 * - 공통 카드 스타일 조합
 */
export const CARD_STYLES = {
  base: 'rounded-xl border border-border bg-card',
  interactive: 'rounded-xl border border-border bg-card hover:shadow-md transition-shadow duration-200 cursor-pointer',
  section: 'rounded-xl border border-border bg-card p-6',
} as const;

/**
 * 텍스트 크기 토큰
 * - 계층적 타이포그래피
 */
export const TEXT = {
  pageTitle: 'text-3xl font-bold tracking-tight',
  sectionTitle: 'text-xl font-semibold tracking-tight',
  cardTitle: 'text-lg font-semibold',
  label: 'text-sm font-medium text-muted-foreground',
  body: 'text-sm text-foreground',
  caption: 'text-xs text-muted-foreground',
  amount: 'text-2xl font-bold tabular-nums text-primary',
} as const;

/**
 * 아이콘 컨테이너 토큰
 * - 아이콘 래퍼 박스 스타일
 */
export const ICON_CONTAINER = {
  sm: 'flex h-7 w-7 items-center justify-center rounded-md bg-muted',
  md: 'flex h-8 w-8 items-center justify-center rounded-md bg-muted',
  lg: 'flex h-10 w-10 items-center justify-center rounded-lg bg-muted',
  xl: 'flex h-12 w-12 items-center justify-center rounded-full bg-muted',
  '2xl': 'flex h-16 w-16 items-center justify-center rounded-full bg-muted',
} as const;

/**
 * 반응형 그리드 토큰
 * - 자주 사용되는 그리드 레이아웃
 */
export const GRID = {
  /** 1 → 2 → 3열 그리드 */
  responsive3: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
  /** 1 → 2열 그리드 */
  responsive2: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
  /** 2 → 3 → 5열 그리드 (통계 카드용) */
  stats: 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4',
  /** 발행 정보 그리드 (1 → 3열) */
  info: 'grid grid-cols-1 sm:grid-cols-3 gap-6',
} as const;
