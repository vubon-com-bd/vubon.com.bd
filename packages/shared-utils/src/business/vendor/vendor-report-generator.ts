export const generateId = (prefix: string, length: number): string => {
  const random = Math.random()
    .toString(36)
    .substring(2, 2 + length)
    .toUpperCase();
  return `${prefix}-${random}`;
};

export interface VendorReportData {
  reportId: string;
  vendorId: string;
  type: string;
  format: string;
  performance: unknown;
  activities: unknown[];
  summary: {
    totalSales: number;
    totalRevenue: number;
    totalOrders: number;
    averageRating: number;
    reviewCount: number;
    fulfillmentRate: number;
    customerSatisfaction: number;
  };
  insights: unknown[];
  recommendations: string[];
  generatedAt: Date;
  metadata: Record<string, unknown>;
}

export const generateVendorReport = (
  vendorId: string,
  type: string,
  data: unknown
): VendorReportData => {
  return {
    reportId: generateId('VRPT', 12),
    vendorId,
    type,
    format: 'pdf',
    performance: data,
    activities: [],
    summary: {
      totalSales: 0,
      totalRevenue: 0,
      totalOrders: 0,
      averageRating: 0,
      reviewCount: 0,
      fulfillmentRate: 0,
      customerSatisfaction: 0,
    },
    insights: [],
    recommendations: [],
    generatedAt: new Date(),
    metadata: {},
  };
};
