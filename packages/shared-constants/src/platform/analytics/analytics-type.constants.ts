export const ANALYTICS_TYPE = {
  WEB: 'web',
  MOBILE: 'mobile',
  APP: 'app',
  API: 'api',
  ECOMMERCE: 'ecommerce',
  MARKETING: 'marketing',
  PRODUCT: 'product',
  USER: 'user',
  REVENUE: 'revenue',
  BEHAVIOR: 'behavior',
  REAL_TIME: 'real_time',
  CUSTOM: 'custom',
} as const;

export type AnalyticsTypeType = (typeof ANALYTICS_TYPE)[keyof typeof ANALYTICS_TYPE];
