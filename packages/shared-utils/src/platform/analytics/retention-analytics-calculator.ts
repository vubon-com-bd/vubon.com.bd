export interface RetentionAnalyticsData {
  isRetained?: boolean;
  isChurned?: boolean;
}

export interface RetentionAnalyticsResult {
  retentionRate: number;
  churnRate: number;
  lifetimeValue: number;
  repeatPurchaseRate: number;
  timeToChurn: number;
}

export const calculateRetentionAnalytics = (
  data: RetentionAnalyticsData[]
): RetentionAnalyticsResult => {
  const totalUsers = data.length;
  const retained = data.filter((d) => d.isRetained).length;
  const churned = data.filter((d) => d.isChurned).length;
  return {
    retentionRate: totalUsers > 0 ? (retained / totalUsers) * 100 : 0,
    churnRate: totalUsers > 0 ? (churned / totalUsers) * 100 : 0,
    lifetimeValue: 0,
    repeatPurchaseRate: 0,
    timeToChurn: 0,
  };
};
