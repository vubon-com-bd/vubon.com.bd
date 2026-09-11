export interface TrafficAnalyticsData {
  visitorId: string;
  views?: number;
}

export interface TrafficAnalyticsResult {
  totalVisits: number;
  uniqueVisitors: number;
  pageViews: number;
  bounceRate: number;
  sessionDuration: number;
  pagesPerSession: number;
}

export const calculateTrafficAnalytics = (
  trafficData: TrafficAnalyticsData[]
): TrafficAnalyticsResult => {
  const totalVisits = trafficData.length;
  const uniqueVisitors = new Set(trafficData.map((t) => t.visitorId)).size;
  const pageViews = trafficData.reduce((sum, t) => sum + (t.views || 0), 0);
  return {
    totalVisits,
    uniqueVisitors,
    pageViews,
    bounceRate: 0,
    sessionDuration: 0,
    pagesPerSession: 0,
  };
};
