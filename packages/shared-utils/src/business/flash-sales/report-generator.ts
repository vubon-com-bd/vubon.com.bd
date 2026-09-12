export const generateFlashSaleId = (prefix: string, length: number): string => {
  const random = Math.random()
    .toString(36)
    .substring(2, 2 + length)
    .toUpperCase();
  return `${prefix}-${random}`;
};

export interface FlashSaleReportData {
  reportId: string;
  flashSaleId: string;
  type: string;
  format: string;
  data: unknown;
  summary: {
    totalSales: number;
    totalRevenue: number;
    totalParticipants: number;
    conversionRate: number;
    averageOrderValue: number;
    topProducts: unknown[];
  };
  insights: unknown[];
  recommendations: string[];
  generatedAt: Date;
  metadata: Record<string, unknown>;
}

export const generateFlashSaleReport = (
  saleId: string,
  type: string,
  data: unknown
): FlashSaleReportData => {
  return {
    reportId: generateFlashSaleId('RPT', 12),
    flashSaleId: saleId,
    type,
    format: 'pdf',
    data,
    summary: {
      totalSales: 0,
      totalRevenue: 0,
      totalParticipants: 0,
      conversionRate: 0,
      averageOrderValue: 0,
      topProducts: [],
    },
    insights: [],
    recommendations: [],
    generatedAt: new Date(),
    metadata: {},
  };
};
