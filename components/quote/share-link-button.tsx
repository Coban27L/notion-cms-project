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

  async function handleCopy() {
    const url = `${window.location.origin}/quotes/${token}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('공유 링크가 복사되었습니다');
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button variant="outline" size="sm" onClick={handleCopy}>
      {copied ? (
        <Check className="h-4 w-4 mr-1" />
      ) : (
        <Copy className="h-4 w-4 mr-1" />
      )}
      {copied ? '복사됨' : '링크 복사'}
    </Button>
  );
}
