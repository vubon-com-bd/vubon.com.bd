import { calculateAverage } from '../common/calculator/average-calculator';

export interface SEOAnalyticsData {
  metric: string;
  value: number;
}

export interface SEOMetrics {
  organicTraffic: number;
  organicConversions: number;
  bounceRate: number;
  pageViews: number;
  averageSessionDuration: number;
  keywordRankings: number;
  backlinkCount: number;
  domainAuthority: number;
}

export const calculateSEOMetrics = (analytics: SEOAnalyticsData[]): SEOMetrics => {
  const traffic = analytics.filter((a) => a.metric === 'organicTraffic');
  const conversions = analytics.filter((a) => a.metric === 'organicConversions');
  const bounces = analytics.filter((a) => a.metric === 'bounceRate');
  const views = analytics.filter((a) => a.metric === 'pageViews');
  const duration = analytics.filter((a) => a.metric === 'averageSessionDuration');
  const rankings = analytics.filter((a) => a.metric === 'keywordRankings');
  const backlinks = analytics.filter((a) => a.metric === 'backlinkCount');
  const authority = analytics.filter((a) => a.metric === 'domainAuthority');

  return {
    organicTraffic: traffic.reduce((sum, a) => sum + a.value, 0),
    organicConversions: conversions.reduce((sum, a) => sum + a.value, 0),
    bounceRate: calculateAverage(bounces.map((a) => a.value)),
    pageViews: views.reduce((sum, a) => sum + a.value, 0),
    averageSessionDuration: calculateAverage(duration.map((a) => a.value)),
    keywordRankings: rankings.reduce((sum, a) => sum + a.value, 0),
    backlinkCount: backlinks.reduce((sum, a) => sum + a.value, 0),
    domainAuthority: calculateAverage(authority.map((a) => a.value)),
  };
};
