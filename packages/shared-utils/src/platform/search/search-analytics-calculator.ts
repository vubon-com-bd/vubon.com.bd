export interface SearchAnalyticsData {
  metric: string;
  value: number;
  query?: string;
}

export interface SearchMetrics {
  totalSearches: number;
  uniqueSearches: number;
  zeroResults: number;
  clickThroughRate: number;
  conversionRate: number;
  averageClickPosition: number;
  averageSearchTime: number;
  popularQueries: { query: string; count: number }[];
}

const calculateAvg = (values: number[]): number => {
  if (values.length === 0) return 0;
  const sum = values.reduce((a, b) => a + b, 0);
  return sum / values.length;
};

export const calculateSearchMetrics = (analytics: SearchAnalyticsData[]): SearchMetrics => {
  const total = analytics.filter((a) => a.metric === 'totalSearches');
  const unique = analytics.filter((a) => a.metric === 'uniqueSearches');
  const zero = analytics.filter((a) => a.metric === 'zeroResults');
  const clicks = analytics.filter((a) => a.metric === 'clickThroughRate');
  const conversions = analytics.filter((a) => a.metric === 'conversionRate');
  const positions = analytics.filter((a) => a.metric === 'averageClickPosition');
  const times = analytics.filter((a) => a.metric === 'averageSearchTime');
  const popular = analytics.filter((a) => a.metric === 'popularQueries');

  return {
    totalSearches: total.reduce((sum, a) => sum + a.value, 0),
    uniqueSearches: unique.reduce((sum, a) => sum + a.value, 0),
    zeroResults: zero.reduce((sum, a) => sum + a.value, 0),
    clickThroughRate: calculateAvg(clicks.map((a) => a.value)),
    conversionRate: calculateAvg(conversions.map((a) => a.value)),
    averageClickPosition: calculateAvg(positions.map((a) => a.value)),
    averageSearchTime: calculateAvg(times.map((a) => a.value)),
    popularQueries: popular.map((a) => ({
      query: a.query || '',
      count: a.value,
    })),
  };
};
