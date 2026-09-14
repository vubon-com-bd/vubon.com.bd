export const ANALYTICS_CATEGORY = {
  TRAFFIC: 'traffic',
  ENGAGEMENT: 'engagement',
  CONVERSION: 'conversion',
  RETENTION: 'retention',
  ACQUISITION: 'acquisition',
  REVENUE: 'revenue',
  PERFORMANCE: 'performance',
  AUDIENCE: 'audience',
  CONTENT: 'content',
  FUNNEL: 'funnel',
  COHORT: 'cohort',
  ATTRIBUTION: 'attribution',
} as const;

export type AnalyticsCategoryType = (typeof ANALYTICS_CATEGORY)[keyof typeof ANALYTICS_CATEGORY];
