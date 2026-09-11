export const analyzePeriod = <T extends { timestamp: Date | string }>(
  data: T[],
  period: string
): T[] => {
  const now = new Date();
  const periods: Record<string, number> = {
    hourly: 60 * 60 * 1000,
    daily: 24 * 60 * 60 * 1000,
    weekly: 7 * 24 * 60 * 60 * 1000,
    monthly: 30 * 24 * 60 * 60 * 1000,
    yearly: 365 * 24 * 60 * 60 * 1000,
  };
  const periodMs = periods[period] || periods.daily;
  const startDate = new Date(now.getTime() - periodMs);
  return data.filter((item) => new Date(item.timestamp) >= startDate);
};
