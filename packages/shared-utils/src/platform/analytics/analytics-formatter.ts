export const formatAnalyticsNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

export const formatAnalyticsPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const formatAnalytics = (value: number, type: string): string => {
  if (type === 'percentage') return formatAnalyticsPercentage(value);
  if (type === 'currency') return `BDT ${formatAnalyticsNumber(value)}`;
  return formatAnalyticsNumber(value);
};
