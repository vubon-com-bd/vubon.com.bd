/**
 * SEO Analytics Type Constants
 * Types and classifications for SEO analytics
 */

export const SEO_ANALYTICS_TYPE = {
  // Analytics Categories
  CATEGORIES: {
    ACQUISITION: 'acquisition',
    BEHAVIOR: 'behavior',
    CONVERSION: 'conversion',
    PERFORMANCE: 'performance',
    TECHNICAL: 'technical',
    SOCIAL: 'social',
    REVENUE: 'revenue',
  } as const,

  // Analytics Sub-types
  SUB_TYPES: {
    // Acquisition
    ORGANIC: 'organic',
    PAID: 'paid',
    SOCIAL: 'social',
    REFERRAL: 'referral',
    DIRECT: 'direct',
    EMAIL: 'email',

    // Behavior
    PAGE_VIEWS: 'page_views',
    SESSIONS: 'sessions',
    BOUNCE_RATE: 'bounce_rate',
    EXIT_RATE: 'exit_rate',
    TIME_ON_PAGE: 'time_on_page',
    PAGES_PER_SESSION: 'pages_per_session',

    // Conversion
    GOAL: 'goal',
    EVENT: 'event',
    ECOMMERCE: 'ecommerce',
    MICRO_CONVERSION: 'micro_conversion',
    MACRO_CONVERSION: 'macro_conversion',

    // Performance
    PAGE_SPEED: 'page_speed',
    LOAD_TIME: 'load_time',
    TTFB: 'ttfb',
    FCP: 'fcp',
    LCP: 'lcp',
    CLS: 'cls',
    FID: 'fid',
  } as const,

  // Analytics Scopes
  SCOPES: {
    SITE_LEVEL: 'site_level',
    PAGE_LEVEL: 'page_level',
    SECTION_LEVEL: 'section_level',
    USER_LEVEL: 'user_level',
    SESSION_LEVEL: 'session_level',
  } as const,

  // Analytics Granularity
  GRANULARITY: {
    SECOND: 'second',
    MINUTE: 'minute',
    HOUR: 'hour',
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    QUARTER: 'quarter',
    YEAR: 'year',
  } as const,

  // Analytics Contexts
  CONTEXTS: {
    WEB: 'web',
    MOBILE: 'mobile',
    APP: 'app',
    SOCIAL: 'social',
    SEARCH: 'search',
    EMAIL: 'email',
  } as const,

  // Analytics Purposes
  PURPOSES: {
    REPORTING: 'reporting',
    ANALYSIS: 'analysis',
    MONITORING: 'monitoring',
    OPTIMIZATION: 'optimization',
    PREDICTION: 'prediction',
    BENCHMARKING: 'benchmarking',
  } as const,
} as const;

// Analytics Categories
export type SEOAnalyticsTypeCategory =
  (typeof SEO_ANALYTICS_TYPE.CATEGORIES)[keyof typeof SEO_ANALYTICS_TYPE.CATEGORIES];

// Analytics Sub-types
export type SEOAnalyticsTypeSubType =
  (typeof SEO_ANALYTICS_TYPE.SUB_TYPES)[keyof typeof SEO_ANALYTICS_TYPE.SUB_TYPES];

// Analytics Scopes
export type SEOAnalyticsTypeScope =
  (typeof SEO_ANALYTICS_TYPE.SCOPES)[keyof typeof SEO_ANALYTICS_TYPE.SCOPES];

// Analytics Granularity
export type SEOAnalyticsTypeGranularity =
  (typeof SEO_ANALYTICS_TYPE.GRANULARITY)[keyof typeof SEO_ANALYTICS_TYPE.GRANULARITY];

// Analytics Contexts
export type SEOAnalyticsTypeContext =
  (typeof SEO_ANALYTICS_TYPE.CONTEXTS)[keyof typeof SEO_ANALYTICS_TYPE.CONTEXTS];

// Analytics Purposes
export type SEOAnalyticsTypePurpose =
  (typeof SEO_ANALYTICS_TYPE.PURPOSES)[keyof typeof SEO_ANALYTICS_TYPE.PURPOSES];

// Utility Functions
export function getSEOAnalyticsCategoryLabel(category: SEOAnalyticsTypeCategory): string {
  const labels: Record<SEOAnalyticsTypeCategory, string> = {
    [SEO_ANALYTICS_TYPE.CATEGORIES.ACQUISITION]: 'Acquisition Analytics',
    [SEO_ANALYTICS_TYPE.CATEGORIES.BEHAVIOR]: 'Behavior Analytics',
    [SEO_ANALYTICS_TYPE.CATEGORIES.CONVERSION]: 'Conversion Analytics',
    [SEO_ANALYTICS_TYPE.CATEGORIES.PERFORMANCE]: 'Performance Analytics',
    [SEO_ANALYTICS_TYPE.CATEGORIES.TECHNICAL]: 'Technical Analytics',
    [SEO_ANALYTICS_TYPE.CATEGORIES.SOCIAL]: 'Social Analytics',
    [SEO_ANALYTICS_TYPE.CATEGORIES.REVENUE]: 'Revenue Analytics',
  };
  return labels[category] || 'Unknown Category';
}

export function getSEOAnalyticsSubTypeLabel(subType: SEOAnalyticsTypeSubType): string {
  const labels: Record<SEOAnalyticsTypeSubType, string> = {
    // Acquisition
    [SEO_ANALYTICS_TYPE.SUB_TYPES.ORGANIC]: 'Organic Traffic',
    [SEO_ANALYTICS_TYPE.SUB_TYPES.PAID]: 'Paid Traffic',
    [SEO_ANALYTICS_TYPE.SUB_TYPES.SOCIAL]: 'Social Traffic',
    [SEO_ANALYTICS_TYPE.SUB_TYPES.REFERRAL]: 'Referral Traffic',
    [SEO_ANALYTICS_TYPE.SUB_TYPES.DIRECT]: 'Direct Traffic',
    [SEO_ANALYTICS_TYPE.SUB_TYPES.EMAIL]: 'Email Traffic',

    // Behavior
    [SEO_ANALYTICS_TYPE.SUB_TYPES.PAGE_VIEWS]: 'Page Views',
    [SEO_ANALYTICS_TYPE.SUB_TYPES.SESSIONS]: 'Sessions',
    [SEO_ANALYTICS_TYPE.SUB_TYPES.BOUNCE_RATE]: 'Bounce Rate',
    [SEO_ANALYTICS_TYPE.SUB_TYPES.EXIT_RATE]: 'Exit Rate',
    [SEO_ANALYTICS_TYPE.SUB_TYPES.TIME_ON_PAGE]: 'Time on Page',
    [SEO_ANALYTICS_TYPE.SUB_TYPES.PAGES_PER_SESSION]: 'Pages per Session',

    // Conversion
    [SEO_ANALYTICS_TYPE.SUB_TYPES.GOAL]: 'Goal Completion',
    [SEO_ANALYTICS_TYPE.SUB_TYPES.EVENT]: 'Event Tracking',
    [SEO_ANALYTICS_TYPE.SUB_TYPES.ECOMMERCE]: 'E-commerce',
    [SEO_ANALYTICS_TYPE.SUB_TYPES.MICRO_CONVERSION]: 'Micro-conversion',
    [SEO_ANALYTICS_TYPE.SUB_TYPES.MACRO_CONVERSION]: 'Macro-conversion',

    // Performance
    [SEO_ANALYTICS_TYPE.SUB_TYPES.PAGE_SPEED]: 'Page Speed',
    [SEO_ANALYTICS_TYPE.SUB_TYPES.LOAD_TIME]: 'Load Time',
    [SEO_ANALYTICS_TYPE.SUB_TYPES.TTFB]: 'Time to First Byte',
    [SEO_ANALYTICS_TYPE.SUB_TYPES.FCP]: 'First Contentful Paint',
    [SEO_ANALYTICS_TYPE.SUB_TYPES.LCP]: 'Largest Contentful Paint',
    [SEO_ANALYTICS_TYPE.SUB_TYPES.CLS]: 'Cumulative Layout Shift',
    [SEO_ANALYTICS_TYPE.SUB_TYPES.FID]: 'First Input Delay',
  };
  return labels[subType] || 'Unknown Sub-type';
}

export function getSEOAnalyticsScopeLabel(scope: SEOAnalyticsTypeScope): string {
  const labels: Record<SEOAnalyticsTypeScope, string> = {
    [SEO_ANALYTICS_TYPE.SCOPES.SITE_LEVEL]: 'Site Level',
    [SEO_ANALYTICS_TYPE.SCOPES.PAGE_LEVEL]: 'Page Level',
    [SEO_ANALYTICS_TYPE.SCOPES.SECTION_LEVEL]: 'Section Level',
    [SEO_ANALYTICS_TYPE.SCOPES.USER_LEVEL]: 'User Level',
    [SEO_ANALYTICS_TYPE.SCOPES.SESSION_LEVEL]: 'Session Level',
  };
  return labels[scope] || 'Unknown Scope';
}

export function getSEOAnalyticsGranularityLabel(granularity: SEOAnalyticsTypeGranularity): string {
  const labels: Record<SEOAnalyticsTypeGranularity, string> = {
    [SEO_ANALYTICS_TYPE.GRANULARITY.SECOND]: 'Second',
    [SEO_ANALYTICS_TYPE.GRANULARITY.MINUTE]: 'Minute',
    [SEO_ANALYTICS_TYPE.GRANULARITY.HOUR]: 'Hour',
    [SEO_ANALYTICS_TYPE.GRANULARITY.DAY]: 'Day',
    [SEO_ANALYTICS_TYPE.GRANULARITY.WEEK]: 'Week',
    [SEO_ANALYTICS_TYPE.GRANULARITY.MONTH]: 'Month',
    [SEO_ANALYTICS_TYPE.GRANULARITY.QUARTER]: 'Quarter',
    [SEO_ANALYTICS_TYPE.GRANULARITY.YEAR]: 'Year',
  };
  return labels[granularity] || 'Unknown Granularity';
}

export function getSEOAnalyticsContextLabel(context: SEOAnalyticsTypeContext): string {
  const labels: Record<SEOAnalyticsTypeContext, string> = {
    [SEO_ANALYTICS_TYPE.CONTEXTS.WEB]: 'Web',
    [SEO_ANALYTICS_TYPE.CONTEXTS.MOBILE]: 'Mobile',
    [SEO_ANALYTICS_TYPE.CONTEXTS.APP]: 'App',
    [SEO_ANALYTICS_TYPE.CONTEXTS.SOCIAL]: 'Social',
    [SEO_ANALYTICS_TYPE.CONTEXTS.SEARCH]: 'Search',
    [SEO_ANALYTICS_TYPE.CONTEXTS.EMAIL]: 'Email',
  };
  return labels[context] || 'Unknown Context';
}

export function getSEOAnalyticsPurposeLabel(purpose: SEOAnalyticsTypePurpose): string {
  const labels: Record<SEOAnalyticsTypePurpose, string> = {
    [SEO_ANALYTICS_TYPE.PURPOSES.REPORTING]: 'Reporting',
    [SEO_ANALYTICS_TYPE.PURPOSES.ANALYSIS]: 'Analysis',
    [SEO_ANALYTICS_TYPE.PURPOSES.MONITORING]: 'Monitoring',
    [SEO_ANALYTICS_TYPE.PURPOSES.OPTIMIZATION]: 'Optimization',
    [SEO_ANALYTICS_TYPE.PURPOSES.PREDICTION]: 'Prediction',
    [SEO_ANALYTICS_TYPE.PURPOSES.BENCHMARKING]: 'Benchmarking',
  };
  return labels[purpose] || 'Unknown Purpose';
}
