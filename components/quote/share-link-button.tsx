'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface ShareLinkButtonProps {
  token: string;
}

export function ShareLinkButton({ token }: ShareLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = `${window.location.origin}/quotes/${token}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('링크가 복사되었습니다');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('복사 실패');
    }
  };

  return (
    <Button
      onClick={handleCopy}
      variant={copied ? 'outline' : 'default'}
      className="w-full md:w-auto"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          복사됨!
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 mr-2" />
          링크 복사
        </>
      )}
    </Button>
  );
}
