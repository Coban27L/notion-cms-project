import { NextResponse } from "next/server";
import { getQuoteByToken } from "@/lib/notion/queries";
import { getMockQuoteByToken } from "@/lib/mock/quotes";
import { createApiResponse } from "@/lib/types/api";

interface RouteContext {
  params: Promise<{ token: string }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { token } = await params;

  try {
    const quote = await getQuoteByToken(token);

    if (!quote) {
      const mockQuote = getMockQuoteByToken(token);
      if (mockQuote) {
        return NextResponse.json(createApiResponse.success(mockQuote));
      }

      return NextResponse.json(
        createApiResponse.error("NOT_FOUND", "견적서를 찾을 수 없습니다."),
        { status: 404 },
      );
    }

    return NextResponse.json(createApiResponse.success(quote));
  } catch (error) {
    console.warn(
      `[GET /api/quotes/${token}] Notion API 오류, mock 데이터 조회 시도:`,
      error,
    );

    const mockQuote = getMockQuoteByToken(token);
    if (mockQuote) {
      return NextResponse.json(createApiResponse.success(mockQuote));
    }

    return NextResponse.json(
      createApiResponse.error("NOT_FOUND", "견적서를 찾을 수 없습니다."),
      { status: 404 },
    );
  }
}
