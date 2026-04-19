import { Quote } from '@/lib/types/quote';

export const mockQuotes: Quote[] = [
  {
    id: 'page-001',
    title: 'INV-2025-001',
    clientName: 'ABC 회사',
    status: '발행',
    totalAmount: 5000000,
    issuedDate: '2025-10-01T00:00:00.000Z',
    validUntil: '2025-10-31T00:00:00.000Z',
    shareToken: '2866a10d-310b-805f-9807-f9268ed299db',
    items: [
      { name: '웹사이트 디자인', quantity: 1, unitPrice: 3000000, amount: 3000000 },
      { name: '로고 제작', quantity: 2, unitPrice: 500000, amount: 1000000 },
      { name: '명함 디자인', quantity: 100, unitPrice: 10000, amount: 1000000 },
    ],
    notes: '계약 후 30% 선금, 납품 후 잔금 지급',
  },
  {
    id: 'page-002',
    title: 'INV-2025-002',
    clientName: 'BBB 회사',
    status: '승인',
    totalAmount: 3200000,
    issuedDate: '2025-10-05T00:00:00.000Z',
    validUntil: '2025-11-05T00:00:00.000Z',
    shareToken: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    items: [
      { name: '앱 UI 디자인', quantity: 1, unitPrice: 2500000, amount: 2500000 },
      { name: '아이콘 세트', quantity: 1, unitPrice: 700000, amount: 700000 },
    ],
    notes: '',
  },
  {
    id: 'page-003',
    title: 'INV-2025-003',
    clientName: 'CCC 스타트업',
    status: '취소',
    totalAmount: 1500000,
    issuedDate: '2025-09-15T00:00:00.000Z',
    validUntil: '2025-10-15T00:00:00.000Z',
    shareToken: 'f1e2d3c4-b5a6-9870-fedc-ba9876543210',
    items: [
      { name: '랜딩 페이지 디자인', quantity: 1, unitPrice: 1500000, amount: 1500000 },
    ],
    notes: '클라이언트 사정으로 취소',
  },
];

export function getMockQuoteByToken(token: string): Quote | undefined {
  return mockQuotes.find((q) => q.shareToken === token);
}
