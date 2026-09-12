export interface PerformanceAnalyticsData {
  responseTime?: number;
  isError?: boolean;
}

export interface PerformanceAnalyticsResult {
  responseTime: number;
  throughput: number;
  errorRate: number;
  availability: number;
  cpuUsage: number;
  memoryUsage: number;
}

export const calculatePerformanceAnalytics = (
  metrics: PerformanceAnalyticsData[]
): PerformanceAnalyticsResult => {
  const responseTime =
    metrics.length > 0
      ? metrics.reduce((sum, m) => sum + (m.responseTime || 0), 0) / metrics.length
      : 0;
  const errorRate =
    metrics.length > 0 ? metrics.filter((m) => m.isError).length / metrics.length : 0;
  return {
    responseTime,
    throughput: 0,
    errorRate: errorRate * 100,
    availability: 100 - errorRate * 100,
    cpuUsage: 0,
    memoryUsage: 0,
  };
};
