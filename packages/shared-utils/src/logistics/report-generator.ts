export const generateReportId = (prefix: string, length: number): string => {
  const random = Math.random()
    .toString(36)
    .substring(2, 2 + length)
    .toUpperCase();
  return `${prefix}-${random}`;
};

export interface LogisticsReportData {
  reportId: string;
  logisticsId: string;
  type: string;
  format: string;
  analytics: unknown[];
  summary: {
    totalShipments: number;
    totalDeliveries: number;
    onTimeDelivery: number;
    averageDeliveryTime: number;
    totalCost: number;
    courierPerformance: Record<string, number>;
    zonePerformance: Record<string, number>;
  };
  insights: unknown[];
  recommendations: string[];
  generatedAt: Date;
  metadata: Record<string, unknown>;
}

export const generateLogisticsReport = (
  logisticsId: string,
  type: string,
  data: unknown
): LogisticsReportData => {
  return {
    reportId: generateReportId('LRPT', 12),
    logisticsId,
    type,
    format: 'pdf',
    analytics: [],
    summary: {
      totalShipments: 0,
      totalDeliveries: 0,
      onTimeDelivery: 0,
      averageDeliveryTime: 0,
      totalCost: 0,
      courierPerformance: {},
      zonePerformance: {},
    },
    insights: [],
    recommendations: [],
    generatedAt: new Date(),
    metadata: { data },
  };
};
