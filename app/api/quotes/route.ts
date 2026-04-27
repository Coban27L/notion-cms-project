import { NextResponse } from 'next/server';
import { getAllQuotes } from '@/lib/notion/queries';
import { generateMockQuotes } from '@/lib/mock/quotes';
import { createApiResponse } from '@/lib/types/api';

export async function GET() {
  try {
    const quotes = await getAllQuotes();
    return NextResponse.json(createApiResponse.success(quotes));
  } catch (error) {
    console.warn('[GET /api/quotes] Notion API 오류, mock 데이터 사용:', error);
    const mockQuotes = generateMockQuotes();
    return NextResponse.json(createApiResponse.success(mockQuotes));
  }
}
