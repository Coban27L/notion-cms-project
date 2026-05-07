/**
 * 공유 링크 생성 유틸리티
 */

export function getShareLink(shareToken: string): string {
  const baseURL =
    process.env.NEXTAUTH_URL ||
    (typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.host}`
      : "http://localhost:3000");

  return `${baseURL}/quotes/${shareToken}`;
}

export async function copyShareLinkToClipboard(
  shareToken: string,
): Promise<boolean> {
  try {
    const link = getShareLink(shareToken);
    await navigator.clipboard.writeText(link);
    return true;
  } catch (error) {
    console.error("클립보드 복사 실패:", error);
    return false;
  }
}
