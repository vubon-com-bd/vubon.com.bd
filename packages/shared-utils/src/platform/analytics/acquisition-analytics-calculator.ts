export interface AcquisitionAnalyticsData {
  cost?: number;
  ltv?: number;
}

export interface AcquisitionAnalyticsResult {
  newUsers: number;
  acquisitionCost: number;
  conversionRate: number;
  ltvToCacRatio: number;
}

export const calculateAcquisitionAnalytics = (
  data: AcquisitionAnalyticsData[]
): AcquisitionAnalyticsResult => {
  const newUsers = data.length;
  const acquisitionCost = data.reduce((sum, d) => sum + (d.cost || 0), 0);
  const ltv = data.reduce((sum, d) => sum + (d.ltv || 0), 0);
  return {
    newUsers,
    acquisitionCost,
    conversionRate: 0,
    ltvToCacRatio: acquisitionCost > 0 ? ltv / acquisitionCost : 0,
  };
};
