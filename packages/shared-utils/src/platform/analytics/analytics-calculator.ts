export const calculateAnalyticsAverage = (values: number[]): number => {
  if (values.length === 0) return 0;
  const sum = values.reduce((a, b) => a + b, 0);
  return sum / values.length;
};

export interface AnalyticsCalculationResult {
  sum: number;
  avg: number;
  min: number;
  max: number;
  count: number;
}

export const calculateAnalytics = (data: number[]): AnalyticsCalculationResult => {
  if (data.length === 0) {
    return { sum: 0, avg: 0, min: 0, max: 0, count: 0 };
  }
  const sum = data.reduce((a, b) => a + b, 0);
  const avg = calculateAnalyticsAverage(data);
  const min = Math.min(...data);
  const max = Math.max(...data);
  return { sum, avg, min, max, count: data.length };
};
