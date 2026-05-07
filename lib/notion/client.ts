import "server-only";
import { Client, APIErrorCode, isNotionClientError } from "@notionhq/client";

const NOTION_API_KEY = process.env.NOTION_API_KEY;

if (!NOTION_API_KEY) {
  console.warn("[Notion] NOTION_API_KEY 환경변수가 비어있습니다.");
}

/**
 * Notion 공식 SDK v5 클라이언트
 * - notionVersion: 2025-09-03부터 dataSources API가 활성화됨
 * - 2026-03-11 등 최신 버전도 동일한 SDK 메서드(notion.dataSources.query)로 호출
 */
export const notion = new Client({
  auth: NOTION_API_KEY,
  notionVersion: "2025-09-03",
});

// ID 형식 정규화: 32자 hex → 8-4-4-4-12 UUID 포맷
export function toCanonicalId(rawId: string): string {
  const cleaned = rawId.replace(/-/g, "").trim();
  if (cleaned.length !== 32) return rawId;
  return cleaned.replace(
    /([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})/i,
    "$1-$2-$3-$4-$5",
  );
}

export const INVOICE_DB_ID = toCanonicalId(
  process.env.NOTION_DATABASE_ID ?? "",
);
export const ITEMS_DB_ID = toCanonicalId(
  process.env.NOTION_ITEMS_DATABASE_ID ?? "",
);

export function validateEnv(): void {
  if (!NOTION_API_KEY)
    throw new Error("NOTION_API_KEY 환경변수가 설정되지 않았습니다.");
  if (!INVOICE_DB_ID)
    throw new Error("NOTION_DATABASE_ID 환경변수가 설정되지 않았습니다.");
  if (!ITEMS_DB_ID)
    throw new Error("NOTION_ITEMS_DATABASE_ID 환경변수가 설정되지 않았습니다.");
}

export { APIErrorCode, isNotionClientError };
