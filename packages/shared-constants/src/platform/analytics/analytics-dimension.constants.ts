export const ANALYTICS_DIMENSION = {
  DATE: 'date',
  HOUR: 'hour',
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  QUARTER: 'quarter',
  YEAR: 'year',
  COUNTRY: 'country',
  CITY: 'city',
  REGION: 'region',
  DEVICE: 'device',
  BROWSER: 'browser',
  OS: 'os',
  LANGUAGE: 'language',
  SOURCE: 'source',
  MEDIUM: 'medium',
  CAMPAIGN: 'campaign',
  PAGE: 'page',
  LANDING_PAGE: 'landing_page',
  USER_TYPE: 'user_type',
  USER_ROLE: 'user_role',
  PRODUCT: 'product',
  CATEGORY: 'category',
  BRAND: 'brand',
  VENDOR: 'vendor',
  PAYMENT_METHOD: 'payment_method',
} as const;

export const ANALYTICS_DIMENSION_TYPE = {
  STRING: 'string',
  NUMBER: 'number',
  DATE: 'date',
  BOOLEAN: 'boolean',
  ARRAY: 'array',
} as const;

export type AnalyticsDimensionType = (typeof ANALYTICS_DIMENSION)[keyof typeof ANALYTICS_DIMENSION];
export type AnalyticsDimensionDataType =
  (typeof ANALYTICS_DIMENSION_TYPE)[keyof typeof ANALYTICS_DIMENSION_TYPE];
