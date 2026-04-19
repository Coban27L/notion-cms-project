import { Quote } from '@/lib/types/quote';

export function generateMockQuotes(): Quote[] {
  return [
    {
      id: 'page-001',
      title: 'QT-2024-001',
      clientName: '홍길동',
      status: '발행',
      totalAmount: 1500000,
      issuedDate: '2024-03-15',
      validUntil: '2024-04-15',
      shareToken: 'abc123def456-7890',
      items: [
        {
          name: 'UI/UX 디자인',
          quantity: 1,
          unitPrice: 800000,
          amount: 800000,
        },
        {
          name: 'Frontend 개발',
          quantity: 1,
          unitPrice: 700000,
          amount: 700000,
        },
      ],
      notes: '결제는 50% 선금, 50% 완료 후 지급',
    },
    {
      id: 'page-002',
      title: 'QT-2024-002',
      clientName: '김영희',
      status: '승인',
      totalAmount: 2300000,
      issuedDate: '2024-03-10',
      validUntil: '2024-04-10',
      shareToken: 'ghi789jkl012-3456',
      items: [
        {
          name: 'API 개발',
          quantity: 5,
          unitPrice: 300000,
          amount: 1500000,
        },
        {
          name: 'DB 설계',
          quantity: 1,
          unitPrice: 400000,
          amount: 400000,
        },
        {
          name: '배포 및 셋업',
          quantity: 1,
          unitPrice: 400000,
          amount: 400000,
        },
      ],
      notes: '',
    },
    {
      id: 'page-003',
      title: 'QT-2024-003',
      clientName: '이순신',
      status: '취소',
      totalAmount: 900000,
      issuedDate: '2024-02-28',
      validUntil: '2024-03-28',
      shareToken: 'mno345pqr678-9012',
      items: [
        {
          name: '웹사이트 개선',
          quantity: 1,
          unitPrice: 900000,
          amount: 900000,
        },
      ],
      notes: '클라이언트 요청으로 취소',
    },
    {
      id: 'page-004',
      title: 'QT-2024-004',
      clientName: '박문수',
      status: '발행',
      totalAmount: 3000000,
      issuedDate: '2024-03-18',
      validUntil: '2024-04-18',
      shareToken: 'stu901vwx234-5678',
      items: [
        {
          name: 'Full Stack 개발',
          quantity: 2,
          unitPrice: 1200000,
          amount: 2400000,
        },
        {
          name: '문서 작성',
          quantity: 1,
          unitPrice: 300000,
          amount: 300000,
        },
        {
          name: '테스트',
          quantity: 1,
          unitPrice: 300000,
          amount: 300000,
        },
      ],
      notes: '분할 결제 가능',
    },
    {
      id: 'page-005',
      title: 'QT-2024-005',
      clientName: '정약용',
      status: '승인',
      totalAmount: 1200000,
      issuedDate: '2024-03-12',
      validUntil: '2024-04-12',
      shareToken: 'yza567bcd890-1234',
      items: [
        {
          name: 'WordPress 테마 커스터마이징',
          quantity: 1,
          unitPrice: 1200000,
          amount: 1200000,
        },
      ],
      notes: '호스팅 지원 포함',
    },
  ];
}

export function getMockQuoteByToken(token: string): Quote | undefined {
  const quotes = generateMockQuotes();
  return quotes.find((q) => q.shareToken === token);
}

export function getMockQuoteById(id: string): Quote | undefined {
  const quotes = generateMockQuotes();
  return quotes.find((q) => q.id === id);
}
