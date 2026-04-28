'use client';

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { Quote } from '@/lib/types/quote';

// jsDelivr CDN에서 Noto Sans KR 로드 (Google Fonts 대체)
try {
  Font.register({
    family: 'NotoSansKR',
    src: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-kr@5.0.8/files/noto-sans-kr-korean-400-normal.woff2',
    fontWeight: 'normal',
  });
  Font.register({
    family: 'NotoSansKR',
    src: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-kr@5.0.8/files/noto-sans-kr-korean-700-normal.woff2',
    fontWeight: 'bold',
  });
} catch (error) {
  // 폰트 로딩 실패 시 Helvetica로 폴백
  console.warn('한글 폰트 로딩 실패, Helvetica를 사용합니다:', error);
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'NotoSansKR',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a1a1a',
  },
  headerGrid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  headerItem: {
    flexDirection: 'column',
  },
  label: {
    fontSize: 10,
    color: '#999',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 12,
    color: '#1a1a1a',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 15,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    color: '#1a1a1a',
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#1a1a1a',
    backgroundColor: '#f5f5f5',
    padding: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    padding: 8,
  },
  tableCell: {
    fontSize: 11,
    color: '#1a1a1a',
    paddingHorizontal: 6,
  },
  nameCell: {
    flex: 3,
  },
  numberCell: {
    flex: 1,
    textAlign: 'right',
  },
  currencyCell: {
    flex: 1.5,
    textAlign: 'right',
  },
  summarySection: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  summaryTable: {
    width: '40%',
  },
  summaryRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    padding: 8,
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
  },
  summaryValue: {
    fontSize: 12,
    color: '#1a1a1a',
    fontWeight: '500',
    textAlign: 'right',
  },
  totalRow: {
    backgroundColor: '#f5f5f5',
    borderTopWidth: 2,
    borderTopColor: '#1a1a1a',
    padding: 10,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  totalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'right',
  },
  notesSection: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
  },
  notesTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  notesText: {
    fontSize: 11,
    color: '#666',
    lineHeight: 1.5,
    whiteSpace: 'pre-wrap',
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
  },
});

interface QuoteDocumentProps {
  quote: Quote;
}

export function QuoteDocument({ quote }: QuoteDocumentProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-SG', {
      style: 'currency',
      currency: 'SGD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (date: string | undefined) => {
    if (!date) return '-';
    try {
      return new Date(date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    } catch {
      return date;
    }
  };

  const items = quote.items || [];
  const subtotal = items.reduce((sum, item) => sum + (item.amount || 0), 0);
  const tax = quote.totalAmount && quote.totalAmount > subtotal ? quote.totalAmount - subtotal : 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.title}>견적서</Text>
          <View style={styles.headerGrid}>
            <View style={styles.headerItem}>
              <Text style={styles.label}>견적 번호</Text>
              <Text style={styles.value}>{quote.id}</Text>
            </View>
            <View style={styles.headerItem}>
              <Text style={styles.label}>발행일</Text>
              <Text style={styles.value}>{formatDate(quote.issuedDate)}</Text>
            </View>
            <View style={styles.headerItem}>
              <Text style={styles.label}>클라이언트</Text>
              <Text style={styles.value}>{quote.clientName}</Text>
            </View>
            {quote.validUntil && (
              <View style={styles.headerItem}>
                <Text style={styles.label}>유효기간</Text>
                <Text style={styles.value}>{formatDate(quote.validUntil)}</Text>
              </View>
            )}
          </View>
        </View>

        {/* 견적 항목 테이블 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>견적 항목</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, styles.nameCell]}>품목</Text>
              <Text style={[styles.tableCell, styles.numberCell]}>수량</Text>
              <Text style={[styles.tableCell, styles.currencyCell]}>단가</Text>
              <Text style={[styles.tableCell, styles.currencyCell]}>금액</Text>
            </View>
            {items.map((item, idx) => (
              <View key={idx} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.nameCell]}>{item.name}</Text>
                <Text style={[styles.tableCell, styles.numberCell]}>{item.quantity}</Text>
                <Text style={[styles.tableCell, styles.currencyCell]}>
                  {formatCurrency(item.unitPrice || 0)}
                </Text>
                <Text style={[styles.tableCell, styles.currencyCell]}>
                  {formatCurrency(item.amount || 0)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* 합계 영역 */}
        <View style={styles.summarySection}>
          <View style={styles.summaryTable}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>소계</Text>
              <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
            </View>
            {tax > 0 && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>세금</Text>
                <Text style={styles.summaryValue}>{formatCurrency(tax)}</Text>
              </View>
            )}
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>합계</Text>
              <Text style={styles.totalValue}>{formatCurrency(quote.totalAmount || subtotal)}</Text>
            </View>
          </View>
        </View>

        {/* 비고 */}
        {quote.notes && (
          <View style={styles.notesSection}>
            <Text style={styles.notesTitle}>비고</Text>
            <Text style={styles.notesText}>{quote.notes}</Text>
          </View>
        )}

        {/* 푸터 */}
        <View style={styles.footer}>
          <Text>이 견적서는 공유 링크를 통해 발행되었습니다.</Text>
        </View>
      </Page>
    </Document>
  );
}
