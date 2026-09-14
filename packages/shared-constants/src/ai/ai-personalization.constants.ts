export const AI_PERSONALIZATION_TYPE = {
  BEHAVIORAL: 'behavioral',
  CONTENT_BASED: 'content_based',
  COLLABORATIVE: 'collaborative',
  HYBRID: 'hybrid',
  CONTEXTUAL: 'contextual',
  DEMOGRAPHIC: 'demographic',
  SESSION_BASED: 'session_based',
  REAL_TIME: 'real_time',
} as const;

export const AI_PERSONALIZATION_SIGNAL = {
  CLICKS: 'clicks',
  VIEWS: 'views',
  PURCHASES: 'purchases',
  WISHLIST: 'wishlist',
  CART_ADDS: 'cart_adds',
  SEARCHES: 'searches',
  RATINGS: 'ratings',
  REVIEWS: 'reviews',
  TIME_SPENT: 'time_spent',
  SCROLL_DEPTH: 'scroll_depth',
} as const;

export const AI_PERSONALIZATION = {
  TYPE: AI_PERSONALIZATION_TYPE,
  SIGNAL: AI_PERSONALIZATION_SIGNAL,
  DEFAULT_TYPE: AI_PERSONALIZATION_TYPE.HYBRID,
  MIN_INTERACTIONS: 5,
  MAX_INTERESTS: 50,
  HISTORY_DAYS: 90,
  SESSION_WINDOW_HOURS: 24,
  CACHE_TTL_SECONDS: 300,
  REFRESH_INTERVAL_SECONDS: 3600,
  ANONYMIZE_DATA: true,
  CONSENT_REQUIRED: true,
  RETENTION_DAYS: 365,
} as const;

export type AiPersonalizationType = typeof AI_PERSONALIZATION;
