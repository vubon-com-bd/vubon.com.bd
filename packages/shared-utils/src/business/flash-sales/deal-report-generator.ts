export const generateDealReportId = (prefix: string, length: number): string => {
  const random = Math.random()
    .toString(36)
    .substring(2, 2 + length)
    .toUpperCase();
  return `${prefix}-${random}`;
};

export interface DealReportData {
  reportId: string;
  dealId: string;
  type: string;
  format: string;
  data: unknown;
  summary: {
    totalSales: number;
    totalRevenue: number;
    totalDiscount: number;
    conversionRate: number;
    averageOrderValue: number;
    topProducts: unknown[];
  };
  insights: unknown[];
  recommendations: string[];
  generatedAt: Date;
  metadata: Record<string, unknown>;
}

export const generateDealReport = (dealId: string, type: string, data: unknown): DealReportData => {
  return {
    reportId: generateDealReportId('DRPT', 12),
    dealId,
    type,
    format: 'pdf',
    data,
    summary: {
      totalSales: 0,
      totalRevenue: 0,
      totalDiscount: 0,
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
