'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { showCopySuccess, showCopyError } from '@/lib/utils/toast-notifications';
import { getShareLink } from '@/lib/utils/share-link';

interface ShareLinkButtonProps {
  token: string;
  /** 버튼 크기 variant */
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

/**
 * 공유 링크 복사 버튼 컴포넌트
 * - 복사 성공 시 체크마크 아이콘으로 전환 애니메이션
 * - 2초 후 자동으로 초기 상태로 복원
 * - 표준 토스트 유틸(toast-notifications.ts) 활용
 * - transition-all로 색상, 크기 부드럽게 전환
 */
export function ShareLinkButton({ token, size = 'default' }: ShareLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    /* 이미 복사된 상태면 중복 실행 방지 */
    if (copied) return;

    const url = getShareLink(token);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      /* 표준 토스트 유틸 사용 (toast-notifications.ts) */
      showCopySuccess();
      /* 2초 후 초기 상태로 복원 */
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showCopyError();
    }
  };

  return (
    <Button
      onClick={handleCopy}
      variant={copied ? 'outline' : 'default'}
      size={size}
      className={`
        w-full sm:w-auto gap-2
        transition-all duration-200 ease-in-out
        ${copied ? 'text-emerald-600 border-emerald-300 dark:text-emerald-400 dark:border-emerald-700' : ''}
      `}
      aria-label={copied ? '링크가 복사되었습니다' : '공유 링크 복사'}
      aria-pressed={copied}
    >
      {/* 아이콘: 복사 → 체크마크 전환 애니메이션 */}
      <span
        className={`
          inline-flex items-center justify-center
          transition-transform duration-200 ease-in-out
          ${copied ? 'scale-110' : 'scale-100'}
        `}
        aria-hidden="true"
      >
        {copied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </span>

      {/* 텍스트: 복사 → 복사됨! 전환 */}
      <span className="transition-opacity duration-150">
        {copied ? '복사됨!' : '링크 복사'}
      </span>
    </Button>
  );
}
