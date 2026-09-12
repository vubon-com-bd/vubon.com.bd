export interface AnalyticsData {
  value: number;
}

export const calculateAverage = (values: number[]): number => {
  if (values.length === 0) return 0;
  const sum = values.reduce((a, b) => a + b, 0);
  return sum / values.length;
};

export const calculateVendorAnalytics = (
  analytics: AnalyticsData[]
): {
  average: number;
  total: number;
  trend: number;
} => {
  const values = analytics.map((a) => a.value);
  const average = calculateAverage(values);
  const total = values.reduce((sum, v) => sum + v, 0);
  const trend = values.length > 1 ? ((values[values.length - 1] - values[0]) / values[0]) * 100 : 0;
  return { average, total, trend };
};
