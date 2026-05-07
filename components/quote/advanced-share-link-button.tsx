"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Copy, Check, Link as LinkIcon } from "lucide-react";
import { showSuccess, showError } from "@/lib/utils/toast-notifications";
import { getShareLink } from "@/lib/utils/share-link";
import { Quote } from "@/lib/types/quote";

interface AdvancedShareLinkButtonProps {
  token: string;
  quote: Quote;
  size?: "default" | "sm" | "lg" | "icon";
}

export function AdvancedShareLinkButton({
  token,
  quote,
  size = "default",
}: AdvancedShareLinkButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [copyMode, setCopyMode] = useState<"link" | "message">("link");

  const shareUrl = getShareLink(token);

  // 메시지 템플릿: 클라이언트명 + 링크 + 만료일
  const messageTemplate = `
[${quote.clientName}] 견적서
링크: ${shareUrl}
유효기간: ${quote.validUntil}
`.trim();

  const handleCopyLink = async () => {
    if (copied) return;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      showSuccess("링크가 복사되었습니다");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      showError("복사 실패");
      // Fallback: 수동 복사를 위해 모달 표시
      setShowModal(true);
    }
  };

  const handleCopyMessage = async () => {
    if (copied) return;

    try {
      await navigator.clipboard.writeText(messageTemplate);
      setCopied(true);
      showSuccess("메시지가 복사되었습니다");
      setTimeout(() => setCopied(false), 1500);
      setShowModal(false);
    } catch {
      showError("복사 실패");
    }
  };

  const handleManualCopy = async () => {
    const textToCopy = copyMode === "link" ? shareUrl : messageTemplate;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      showSuccess("복사되었습니다");
      setTimeout(() => {
        setCopied(false);
        setShowModal(false);
      }, 1500);
    } catch {
      // 수동 선택 가능하도록 포커스
      const input = document.querySelector(
        "[data-manual-copy]",
      ) as HTMLInputElement;
      if (input) {
        input.select();
      }
    }
  };

  return (
    <>
      {/* 메인 버튼 */}
      <Button
        onClick={handleCopyLink}
        variant={copied ? "outline" : "default"}
        size={size}
        className={`gap-2 transition-all duration-200 ${
          copied
            ? "text-emerald-600 border-emerald-300 dark:text-emerald-400"
            : ""
        }`}
        aria-label={copied ? "링크가 복사되었습니다" : "공유 링크 복사"}
      >
        <span
          className={`inline-flex transition-transform duration-200 ${copied ? "scale-110" : ""}`}
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </span>
        {size !== "icon" && <span>{copied ? "복사됨!" : "링크 복사"}</span>}
      </Button>

      {/* 공유 모달 */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>공유 링크</DialogTitle>
            <DialogDescription>
              클라이언트와 공유할 링크를 선택하여 복사하세요.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* 탭: 링크 / 메시지 */}
            <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setCopyMode("link")}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  copyMode === "link"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400"
                }`}
              >
                <LinkIcon className="w-4 h-4 inline mr-2" />
                링크만
              </button>
              <button
                onClick={() => setCopyMode("message")}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  copyMode === "message"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400"
                }`}
              >
                메시지
              </button>
            </div>

            {/* 링크 표시 영역 */}
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {copyMode === "link"
                  ? "공유 링크를 복사하세요"
                  : "메시지 템플릿을 복사하세요"}
              </p>

              <div className="relative">
                <Input
                  readOnly
                  value={copyMode === "link" ? shareUrl : messageTemplate}
                  data-manual-copy
                  className="pr-12 font-mono text-xs min-h-24 align-top"
                  onClick={(e) => e.currentTarget.select()}
                />
                <button
                  onClick={handleManualCopy}
                  className="absolute top-2 right-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="복사"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  )}
                </button>
              </div>

              {/* 복사 버튼들 */}
              <div className="flex gap-2">
                {copyMode === "link" ? (
                  <Button
                    onClick={handleCopyLink}
                    variant="default"
                    className="flex-1"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    링크 복사
                  </Button>
                ) : (
                  <Button
                    onClick={handleCopyMessage}
                    variant="default"
                    className="flex-1"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    메시지 복사
                  </Button>
                )}
              </div>

              {/* 정보 */}
              {copyMode === "message" && (
                <div className="text-xs text-slate-500 dark:text-slate-500 space-y-1">
                  <p>✓ 클라이언트명: {quote.clientName}</p>
                  <p>✓ 유효기간: {quote.validUntil}</p>
                </div>
              )}
            </div>

            {/* QR 코드 (향후 구현) */}
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 text-center text-sm text-slate-500">
              QR 코드 (준비 중)
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
