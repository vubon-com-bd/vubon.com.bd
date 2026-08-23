/**
 * Traffic Analytics Metric Constants
 * Metrics for measuring website traffic and visitor behavior
 */

export const TRAFFIC_ANALYTICS_METRIC = {
  // Visitor Metrics
  VISITOR_METRICS: {
    TOTAL_VISITORS: 'total_visitors',
    UNIQUE_VISITORS: 'unique_visitors',
    RETURNING_VISITORS: 'returning_visitors',
    NEW_VISITORS: 'new_visitors',
    ACTIVE_VISITORS: 'active_visitors',
    VISITOR_GROWTH: 'visitor_growth',
    VISITOR_RETENTION: 'visitor_retention',
    VISITOR_CHURN: 'visitor_churn',
    VISITOR_LOYALTY: 'visitor_loyalty',
  } as const,

  // Session Metrics
  SESSION_METRICS: {
    TOTAL_SESSIONS: 'total_sessions',
    AVG_SESSION_DURATION: 'avg_session_duration',
    TOTAL_SESSION_DURATION: 'total_session_duration',
    SESSIONS_PER_VISITOR: 'sessions_per_visitor',
    SESSION_DEPTH: 'session_depth',
    SESSION_QUALITY: 'session_quality',
    SESSION_RETENTION: 'session_retention',
    SESSION_RECURRENCE: 'session_recurrence',
  } as const,

  // Page View Metrics
  PAGE_VIEW_METRICS: {
    TOTAL_PAGE_VIEWS: 'total_page_views',
    AVG_PAGE_VIEWS_PER_SESSION: 'avg_page_views_per_session',
    AVG_PAGE_VIEWS_PER_VISITOR: 'avg_page_views_per_visitor',
    UNIQUE_PAGE_VIEWS: 'unique_page_views',
    PAGE_VIEWS_PER_HOUR: 'page_views_per_hour',
    PAGE_VIEWS_PER_DAY: 'page_views_per_day',
    PAGE_VIEWS_PER_WEEK: 'page_views_per_week',
    PAGE_VIEWS_PER_MONTH: 'page_views_per_month',
  } as const,

  // Bounce Metrics
  BOUNCE_METRICS: {
    BOUNCE_RATE: 'bounce_rate',
    BOUNCE_COUNT: 'bounce_count',
    EXIT_RATE: 'exit_rate',
    EXIT_COUNT: 'exit_count',
    BOUNCE_PER_SOURCE: 'bounce_per_source',
    BOUNCE_PER_PAGE: 'bounce_per_page',
    BOUNCE_PER_DEVICE: 'bounce_per_device',
  } as const,

  // Traffic Source Metrics
  SOURCE_METRICS: {
    ORGANIC_TRAFFIC: 'organic_traffic',
    ORGANIC_SHARE: 'organic_share',
    DIRECT_TRAFFIC: 'direct_traffic',
    DIRECT_SHARE: 'direct_share',
    REFERRAL_TRAFFIC: 'referral_traffic',
    REFERRAL_SHARE: 'referral_share',
    SOCIAL_TRAFFIC: 'social_traffic',
    SOCIAL_SHARE: 'social_share',
    PAID_TRAFFIC: 'paid_traffic',
    PAID_SHARE: 'paid_share',
    EMAIL_TRAFFIC: 'email_traffic',
    EMAIL_SHARE: 'email_share',
    OTHER_TRAFFIC: 'other_traffic',
    OTHER_SHARE: 'other_share',
    TRAFFIC_DIVERSITY: 'traffic_diversity',
  } as const,

  // Device Metrics
  DEVICE_METRICS: {
    DESKTOP_TRAFFIC: 'desktop_traffic',
    DESKTOP_SHARE: 'desktop_share',
    MOBILE_TRAFFIC: 'mobile_traffic',
    MOBILE_SHARE: 'mobile_share',
    TABLET_TRAFFIC: 'tablet_traffic',
    TABLET_SHARE: 'tablet_share',
    DEVICE_DIVERSITY: 'device_diversity',
    DEVICE_ENGAGEMENT: 'device_engagement',
    DEVICE_CONVERSION: 'device_conversion',
  } as const,

  // Browser Metrics
  BROWSER_METRICS: {
    CHROME_TRAFFIC: 'chrome_traffic',
    CHROME_SHARE: 'chrome_share',
    FIREFOX_TRAFFIC: 'firefox_traffic',
    FIREFOX_SHARE: 'firefox_share',
    SAFARI_TRAFFIC: 'safari_traffic',
    SAFARI_SHARE: 'safari_share',
    EDGE_TRAFFIC: 'edge_traffic',
    EDGE_SHARE: 'edge_share',
    BROWSER_DIVERSITY: 'browser_diversity',
    BROWSER_ENGAGEMENT: 'browser_engagement',
  } as const,

  // Location Metrics
  LOCATION_METRICS: {
    TOP_COUNTRIES: 'top_countries',
    TOP_REGIONS: 'top_regions',
    TOP_CITIES: 'top_cities',
    LOCATION_SHARE: 'location_share',
    DOMESTIC_TRAFFIC: 'domestic_traffic',
    INTERNATIONAL_TRAFFIC: 'international_traffic',
    LOCAL_TRAFFIC: 'local_traffic',
    LOCATION_DIVERSITY: 'location_diversity',
    LOCATION_ENGAGEMENT: 'location_engagement',
  } as const,

  // Time Metrics
  TIME_METRICS: {
    DAILY_TRAFFIC: 'daily_traffic',
    WEEKLY_TRAFFIC: 'weekly_traffic',
    MONTHLY_TRAFFIC: 'monthly_traffic',
    QUARTERLY_TRAFFIC: 'quarterly_traffic',
    YEARLY_TRAFFIC: 'yearly_traffic',
    PEAK_HOURS: 'peak_hours',
    PEAK_DAYS: 'peak_days',
    BEST_DAYS: 'best_days',
    BEST_HOURS: 'best_hours',
    DAY_OF_WEEK_AVG: 'day_of_week_avg',
    HOUR_OF_DAY_AVG: 'hour_of_day_avg',
    SEASONAL_TRAFFIC: 'seasonal_traffic',
  } as const,

  // Performance Metrics
  PERFORMANCE_METRICS: {
    AVG_LOAD_TIME: 'avg_load_time',
    AVG_DOM_LOAD_TIME: 'avg_dom_load_time',
    AVG_PAGE_SIZE: 'avg_page_size',
    AVG_REQUEST_COUNT: 'avg_request_count',
    ERROR_RATE: 'error_rate',
    ERROR_COUNT: 'error_count',
    PAGE_SPEED_SCORE: 'page_speed_score',
    PERFORMANCE_SCORE: 'performance_score',
    RESPONSE_TIME: 'response_time',
    AVAILABILITY: 'availability',
    UPTIME: 'uptime',
  } as const,

  // Conversion Metrics
  CONVERSION_METRICS: {
    CONVERSION_RATE: 'conversion_rate',
    GOAL_COMPLETIONS: 'goal_completions',
    GOAL_VALUE: 'goal_value',
    FUNNEL_COMPLETION_RATE: 'funnel_completion_rate',
    FUNNEL_DROPOFF_RATE: 'funnel_dropoff_rate',
    CONVERSION_PER_SOURCE: 'conversion_per_source',
    CONVERSION_PER_DEVICE: 'conversion_per_device',
    CONVERSION_PER_LOCATION: 'conversion_per_location',
    MICRO_CONVERSION_RATE: 'micro_conversion_rate',
    MACRO_CONVERSION_RATE: 'macro_conversion_rate',
  } as const,

  // Comparison Metrics
  COMPARISON_METRICS: {
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    WEEK_OVER_WEEK: 'week_over_week',
    PERIOD_COMPARISON: 'period_comparison',
    SOURCE_COMPARISON: 'source_comparison',
    DEVICE_COMPARISON: 'device_comparison',
    LOCATION_COMPARISON: 'location_comparison',
    BENCHMARK_COMPARISON: 'benchmark_comparison',
  } as const,

  // Metric Categories
  CATEGORIES: {
    VISITOR: 'visitor',
    SESSION: 'session',
    PAGE_VIEW: 'page_view',
    BOUNCE: 'bounce',
    SOURCE: 'source',
    DEVICE: 'device',
    BROWSER: 'browser',
    LOCATION: 'location',
    TIME: 'time',
    PERFORMANCE: 'performance',
    CONVERSION: 'conversion',
    COMPARISON: 'comparison',
  } as const,

  // Metric Types
  TYPES: {
    ABSOLUTE: 'absolute',
    AVERAGE: 'average',
    PERCENTAGE: 'percentage',
    RATIO: 'ratio',
    RATE: 'rate',
    SCORE: 'score',
    DURATION: 'duration',
  } as const,

  // Metric Formats
  FORMATS: {
    NUMBER: 'number',
    DECIMAL: 'decimal',
    PERCENTAGE: 'percentage',
    CURRENCY: 'currency',
    DURATION: 'duration',
    RATING: 'rating',
  } as const,

  // Metric Priority
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,
} as const;

// Traffic Analytics Visitor Metrics
export type TrafficAnalyticsVisitorMetric =
  (typeof TRAFFIC_ANALYTICS_METRIC.VISITOR_METRICS)[keyof typeof TRAFFIC_ANALYTICS_METRIC.VISITOR_METRICS];

// Traffic Analytics Session Metrics
export type TrafficAnalyticsSessionMetric =
  (typeof TRAFFIC_ANALYTICS_METRIC.SESSION_METRICS)[keyof typeof TRAFFIC_ANALYTICS_METRIC.SESSION_METRICS];

// Traffic Analytics Page View Metrics
export type TrafficAnalyticsPageViewMetric =
  (typeof TRAFFIC_ANALYTICS_METRIC.PAGE_VIEW_METRICS)[keyof typeof TRAFFIC_ANALYTICS_METRIC.PAGE_VIEW_METRICS];

// Traffic Analytics Bounce Metrics
export type TrafficAnalyticsBounceMetric =
  (typeof TRAFFIC_ANALYTICS_METRIC.BOUNCE_METRICS)[keyof typeof TRAFFIC_ANALYTICS_METRIC.BOUNCE_METRICS];

// Traffic Analytics Source Metrics
export type TrafficAnalyticsSourceMetric =
  (typeof TRAFFIC_ANALYTICS_METRIC.SOURCE_METRICS)[keyof typeof TRAFFIC_ANALYTICS_METRIC.SOURCE_METRICS];

// Traffic Analytics Device Metrics
export type TrafficAnalyticsDeviceMetric =
  (typeof TRAFFIC_ANALYTICS_METRIC.DEVICE_METRICS)[keyof typeof TRAFFIC_ANALYTICS_METRIC.DEVICE_METRICS];

// Traffic Analytics Browser Metrics
export type TrafficAnalyticsBrowserMetric =
  (typeof TRAFFIC_ANALYTICS_METRIC.BROWSER_METRICS)[keyof typeof TRAFFIC_ANALYTICS_METRIC.BROWSER_METRICS];

// Traffic Analytics Location Metrics
export type TrafficAnalyticsLocationMetric =
  (typeof TRAFFIC_ANALYTICS_METRIC.LOCATION_METRICS)[keyof typeof TRAFFIC_ANALYTICS_METRIC.LOCATION_METRICS];

// Traffic Analytics Time Metrics
export type TrafficAnalyticsTimeMetric =
  (typeof TRAFFIC_ANALYTICS_METRIC.TIME_METRICS)[keyof typeof TRAFFIC_ANALYTICS_METRIC.TIME_METRICS];

// Traffic Analytics Performance Metrics
export type TrafficAnalyticsPerformanceMetric =
  (typeof TRAFFIC_ANALYTICS_METRIC.PERFORMANCE_METRICS)[keyof typeof TRAFFIC_ANALYTICS_METRIC.PERFORMANCE_METRICS];

// Traffic Analytics Conversion Metrics
export type TrafficAnalyticsConversionMetric =
  (typeof TRAFFIC_ANALYTICS_METRIC.CONVERSION_METRICS)[keyof typeof TRAFFIC_ANALYTICS_METRIC.CONVERSION_METRICS];

// Traffic Analytics Comparison Metrics
export type TrafficAnalyticsComparisonMetric =
  (typeof TRAFFIC_ANALYTICS_METRIC.COMPARISON_METRICS)[keyof typeof TRAFFIC_ANALYTICS_METRIC.COMPARISON_METRICS];

// Traffic Analytics Metric Categories
export type TrafficAnalyticsMetricCategory =
  (typeof TRAFFIC_ANALYTICS_METRIC.CATEGORIES)[keyof typeof TRAFFIC_ANALYTICS_METRIC.CATEGORIES];

// Traffic Analytics Metric Types
export type TrafficAnalyticsMetricType =
  (typeof TRAFFIC_ANALYTICS_METRIC.TYPES)[keyof typeof TRAFFIC_ANALYTICS_METRIC.TYPES];

// Traffic Analytics Metric Formats
export type TrafficAnalyticsMetricFormat =
  (typeof TRAFFIC_ANALYTICS_METRIC.FORMATS)[keyof typeof TRAFFIC_ANALYTICS_METRIC.FORMATS];

// Traffic Analytics Metric Priority
export type TrafficAnalyticsMetricPriority =
  (typeof TRAFFIC_ANALYTICS_METRIC.PRIORITY)[keyof typeof TRAFFIC_ANALYTICS_METRIC.PRIORITY];

// Traffic Analytics Metric Labels
export function getTrafficAnalyticsMetricLabel(metric: string): string {
  const labels: Record<string, string> = {
    // Visitor Metrics
    total_visitors: 'Total Visitors',
    unique_visitors: 'Unique Visitors',
    returning_visitors: 'Returning Visitors',
    new_visitors: 'New Visitors',
    active_visitors: 'Active Visitors',
    visitor_growth: 'Visitor Growth',
    visitor_retention: 'Visitor Retention',
    visitor_churn: 'Visitor Churn',
    visitor_loyalty: 'Visitor Loyalty',

    // Session Metrics
    total_sessions: 'Total Sessions',
    avg_session_duration: 'Avg Session Duration',
    total_session_duration: 'Total Session Duration',
    sessions_per_visitor: 'Sessions Per Visitor',
    session_depth: 'Session Depth',
    session_quality: 'Session Quality',
    session_retention: 'Session Retention',
    session_recurrence: 'Session Recurrence',

    // Page View Metrics
    total_page_views: 'Total Page Views',
    avg_page_views_per_session: 'Avg Page Views Per Session',
    avg_page_views_per_visitor: 'Avg Page Views Per Visitor',
    unique_page_views: 'Unique Page Views',
    page_views_per_hour: 'Page Views Per Hour',
    page_views_per_day: 'Page Views Per Day',
    page_views_per_week: 'Page Views Per Week',
    page_views_per_month: 'Page Views Per Month',

    // Bounce Metrics
    bounce_rate: 'Bounce Rate',
    bounce_count: 'Bounce Count',
    exit_rate: 'Exit Rate',
    exit_count: 'Exit Count',
    bounce_per_source: 'Bounce Per Source',
    bounce_per_page: 'Bounce Per Page',
    bounce_per_device: 'Bounce Per Device',

    // Source Metrics
    organic_traffic: 'Organic Traffic',
    organic_share: 'Organic Share',
    direct_traffic: 'Direct Traffic',
    direct_share: 'Direct Share',
    referral_traffic: 'Referral Traffic',
    referral_share: 'Referral Share',
    social_traffic: 'Social Traffic',
    social_share: 'Social Share',
    paid_traffic: 'Paid Traffic',
    paid_share: 'Paid Share',
    email_traffic: 'Email Traffic',
    email_share: 'Email Share',
    other_traffic: 'Other Traffic',
    other_share: 'Other Share',
    traffic_diversity: 'Traffic Diversity',

    // Device Metrics
    desktop_traffic: 'Desktop Traffic',
    desktop_share: 'Desktop Share',
    mobile_traffic: 'Mobile Traffic',
    mobile_share: 'Mobile Share',
    tablet_traffic: 'Tablet Traffic',
    tablet_share: 'Tablet Share',
    device_diversity: 'Device Diversity',
    device_engagement: 'Device Engagement',
    device_conversion: 'Device Conversion',

    // Browser Metrics
    chrome_traffic: 'Chrome Traffic',
    chrome_share: 'Chrome Share',
    firefox_traffic: 'Firefox Traffic',
    firefox_share: 'Firefox Share',
    safari_traffic: 'Safari Traffic',
    safari_share: 'Safari Share',
    edge_traffic: 'Edge Traffic',
    edge_share: 'Edge Share',
    browser_diversity: 'Browser Diversity',
    browser_engagement: 'Browser Engagement',

    // Location Metrics
    top_countries: 'Top Countries',
    top_regions: 'Top Regions',
    top_cities: 'Top Cities',
    location_share: 'Location Share',
    domestic_traffic: 'Domestic Traffic',
    international_traffic: 'International Traffic',
    local_traffic: 'Local Traffic',
    location_diversity: 'Location Diversity',
    location_engagement: 'Location Engagement',

    // Time Metrics
    daily_traffic: 'Daily Traffic',
    weekly_traffic: 'Weekly Traffic',
    monthly_traffic: 'Monthly Traffic',
    quarterly_traffic: 'Quarterly Traffic',
    yearly_traffic: 'Yearly Traffic',
    peak_hours: 'Peak Hours',
    peak_days: 'Peak Days',
    best_days: 'Best Days',
    best_hours: 'Best Hours',
    day_of_week_avg: 'Day of Week Average',
    hour_of_day_avg: 'Hour of Day Average',
    seasonal_traffic: 'Seasonal Traffic',

    // Performance Metrics
    avg_load_time: 'Avg Load Time',
    avg_dom_load_time: 'Avg DOM Load Time',
    avg_page_size: 'Avg Page Size',
    avg_request_count: 'Avg Request Count',
    error_rate: 'Error Rate',
    error_count: 'Error Count',
    page_speed_score: 'Page Speed Score',
    performance_score: 'Performance Score',
    response_time: 'Response Time',
    availability: 'Availability',
    uptime: 'Uptime',

    // Conversion Metrics
    conversion_rate: 'Conversion Rate',
    goal_completions: 'Goal Completions',
    goal_value: 'Goal Value',
    funnel_completion_rate: 'Funnel Completion Rate',
    funnel_dropoff_rate: 'Funnel Dropoff Rate',
    conversion_per_source: 'Conversion Per Source',
    conversion_per_device: 'Conversion Per Device',
    conversion_per_location: 'Conversion Per Location',
    micro_conversion_rate: 'Micro Conversion Rate',
    macro_conversion_rate: 'Macro Conversion Rate',

    // Comparison Metrics
    year_over_year: 'Year Over Year',
    quarter_over_quarter: 'Quarter Over Quarter',
    month_over_month: 'Month Over Month',
    week_over_week: 'Week Over Week',
    period_comparison: 'Period Comparison',
    source_comparison: 'Source Comparison',
    device_comparison: 'Device Comparison',
    location_comparison: 'Location Comparison',
    benchmark_comparison: 'Benchmark Comparison',
  };

  return (
    labels[metric] || metric.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
  );
}

// Traffic Analytics Metric Category Labels
export function getTrafficAnalyticsMetricCategoryLabel(
  category: TrafficAnalyticsMetricCategory
): string {
  const labels: Record<TrafficAnalyticsMetricCategory, string> = {
    [TRAFFIC_ANALYTICS_METRIC.CATEGORIES.VISITOR]: 'Visitor',
    [TRAFFIC_ANALYTICS_METRIC.CATEGORIES.SESSION]: 'Session',
    [TRAFFIC_ANALYTICS_METRIC.CATEGORIES.PAGE_VIEW]: 'Page View',
    [TRAFFIC_ANALYTICS_METRIC.CATEGORIES.BOUNCE]: 'Bounce',
    [TRAFFIC_ANALYTICS_METRIC.CATEGORIES.SOURCE]: 'Source',
    [TRAFFIC_ANALYTICS_METRIC.CATEGORIES.DEVICE]: 'Device',
    [TRAFFIC_ANALYTICS_METRIC.CATEGORIES.BROWSER]: 'Browser',
    [TRAFFIC_ANALYTICS_METRIC.CATEGORIES.LOCATION]: 'Location',
    [TRAFFIC_ANALYTICS_METRIC.CATEGORIES.TIME]: 'Time',
    [TRAFFIC_ANALYTICS_METRIC.CATEGORIES.PERFORMANCE]: 'Performance',
    [TRAFFIC_ANALYTICS_METRIC.CATEGORIES.CONVERSION]: 'Conversion',
    [TRAFFIC_ANALYTICS_METRIC.CATEGORIES.COMPARISON]: 'Comparison',
  };
  return labels[category] || 'Unknown';
}

// Traffic Analytics Metric Type Labels
export function getTrafficAnalyticsMetricTypeLabel(type: TrafficAnalyticsMetricType): string {
  const labels: Record<TrafficAnalyticsMetricType, string> = {
    [TRAFFIC_ANALYTICS_METRIC.TYPES.ABSOLUTE]: 'Absolute',
    [TRAFFIC_ANALYTICS_METRIC.TYPES.AVERAGE]: 'Average',
    [TRAFFIC_ANALYTICS_METRIC.TYPES.PERCENTAGE]: 'Percentage',
    [TRAFFIC_ANALYTICS_METRIC.TYPES.RATIO]: 'Ratio',
    [TRAFFIC_ANALYTICS_METRIC.TYPES.RATE]: 'Rate',
    [TRAFFIC_ANALYTICS_METRIC.TYPES.SCORE]: 'Score',
    [TRAFFIC_ANALYTICS_METRIC.TYPES.DURATION]: 'Duration',
  };
  return labels[type] || 'Unknown';
}

// Traffic Analytics Metric Format Labels
export function getTrafficAnalyticsMetricFormatLabel(format: TrafficAnalyticsMetricFormat): string {
  const labels: Record<TrafficAnalyticsMetricFormat, string> = {
    [TRAFFIC_ANALYTICS_METRIC.FORMATS.NUMBER]: 'Number',
    [TRAFFIC_ANALYTICS_METRIC.FORMATS.DECIMAL]: 'Decimal',
    [TRAFFIC_ANALYTICS_METRIC.FORMATS.PERCENTAGE]: 'Percentage',
    [TRAFFIC_ANALYTICS_METRIC.FORMATS.CURRENCY]: 'Currency',
    [TRAFFIC_ANALYTICS_METRIC.FORMATS.DURATION]: 'Duration',
    [TRAFFIC_ANALYTICS_METRIC.FORMATS.RATING]: 'Rating',
  };
  return labels[format] || 'Unknown';
}

// Traffic Analytics Metric Priority Labels
export function getTrafficAnalyticsMetricPriorityLabel(
  priority: TrafficAnalyticsMetricPriority
): string {
  const labels: Record<TrafficAnalyticsMetricPriority, string> = {
    [TRAFFIC_ANALYTICS_METRIC.PRIORITY.CRITICAL]: 'Critical',
    [TRAFFIC_ANALYTICS_METRIC.PRIORITY.HIGH]: 'High',
    [TRAFFIC_ANALYTICS_METRIC.PRIORITY.MEDIUM]: 'Medium',
    [TRAFFIC_ANALYTICS_METRIC.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

// Get metric category
export function getTrafficAnalyticsMetricCategory(metric: string): TrafficAnalyticsMetricCategory {
  const visitorMetrics: readonly string[] = Object.values(TRAFFIC_ANALYTICS_METRIC.VISITOR_METRICS);
  const sessionMetrics: readonly string[] = Object.values(TRAFFIC_ANALYTICS_METRIC.SESSION_METRICS);
  const pageViewMetrics: readonly string[] = Object.values(
    TRAFFIC_ANALYTICS_METRIC.PAGE_VIEW_METRICS
  );
  const bounceMetrics: readonly string[] = Object.values(TRAFFIC_ANALYTICS_METRIC.BOUNCE_METRICS);
  const sourceMetrics: readonly string[] = Object.values(TRAFFIC_ANALYTICS_METRIC.SOURCE_METRICS);
  const deviceMetrics: readonly string[] = Object.values(TRAFFIC_ANALYTICS_METRIC.DEVICE_METRICS);
  const browserMetrics: readonly string[] = Object.values(TRAFFIC_ANALYTICS_METRIC.BROWSER_METRICS);
  const locationMetrics: readonly string[] = Object.values(
    TRAFFIC_ANALYTICS_METRIC.LOCATION_METRICS
  );
  const timeMetrics: readonly string[] = Object.values(TRAFFIC_ANALYTICS_METRIC.TIME_METRICS);
  const performanceMetrics: readonly string[] = Object.values(
    TRAFFIC_ANALYTICS_METRIC.PERFORMANCE_METRICS
  );
  const conversionMetrics: readonly string[] = Object.values(
    TRAFFIC_ANALYTICS_METRIC.CONVERSION_METRICS
  );
  const comparisonMetrics: readonly string[] = Object.values(
    TRAFFIC_ANALYTICS_METRIC.COMPARISON_METRICS
  );

  if (visitorMetrics.includes(metric)) return TRAFFIC_ANALYTICS_METRIC.CATEGORIES.VISITOR;
  if (sessionMetrics.includes(metric)) return TRAFFIC_ANALYTICS_METRIC.CATEGORIES.SESSION;
  if (pageViewMetrics.includes(metric)) return TRAFFIC_ANALYTICS_METRIC.CATEGORIES.PAGE_VIEW;
  if (bounceMetrics.includes(metric)) return TRAFFIC_ANALYTICS_METRIC.CATEGORIES.BOUNCE;
  if (sourceMetrics.includes(metric)) return TRAFFIC_ANALYTICS_METRIC.CATEGORIES.SOURCE;
  if (deviceMetrics.includes(metric)) return TRAFFIC_ANALYTICS_METRIC.CATEGORIES.DEVICE;
  if (browserMetrics.includes(metric)) return TRAFFIC_ANALYTICS_METRIC.CATEGORIES.BROWSER;
  if (locationMetrics.includes(metric)) return TRAFFIC_ANALYTICS_METRIC.CATEGORIES.LOCATION;
  if (timeMetrics.includes(metric)) return TRAFFIC_ANALYTICS_METRIC.CATEGORIES.TIME;
  if (performanceMetrics.includes(metric)) return TRAFFIC_ANALYTICS_METRIC.CATEGORIES.PERFORMANCE;
  if (conversionMetrics.includes(metric)) return TRAFFIC_ANALYTICS_METRIC.CATEGORIES.CONVERSION;
  if (comparisonMetrics.includes(metric)) return TRAFFIC_ANALYTICS_METRIC.CATEGORIES.COMPARISON;

  return TRAFFIC_ANALYTICS_METRIC.CATEGORIES.VISITOR;
}

// Get metric type
export function getTrafficAnalyticsMetricType(metric: string): TrafficAnalyticsMetricType {
  const percentageMetrics: readonly string[] = [
    'rate',
    'percentage',
    'share',
    'growth',
    'retention',
    'churn',
    'loyalty',
    'diversity',
    'engagement',
    'conversion',
    'completion',
    'dropoff',
    'availability',
    'uptime',
  ];

  const averageMetrics: readonly string[] = ['avg', 'average', 'mean', 'median'];

  const durationMetrics: readonly string[] = ['duration', 'time', 'session', 'load', 'response'];

  const scoreMetrics: readonly string[] = ['score', 'quality', 'loyalty'];

  const lowerMetric = metric.toLowerCase();

  if (durationMetrics.some((dm: string) => lowerMetric.includes(dm))) {
    return TRAFFIC_ANALYTICS_METRIC.TYPES.DURATION;
  }

  if (percentageMetrics.some((pm: string) => lowerMetric.includes(pm))) {
    return TRAFFIC_ANALYTICS_METRIC.TYPES.PERCENTAGE;
  }

  if (averageMetrics.some((am: string) => lowerMetric.includes(am))) {
    return TRAFFIC_ANALYTICS_METRIC.TYPES.AVERAGE;
  }

  if (scoreMetrics.some((sm: string) => lowerMetric.includes(sm))) {
    return TRAFFIC_ANALYTICS_METRIC.TYPES.SCORE;
  }

  return TRAFFIC_ANALYTICS_METRIC.TYPES.ABSOLUTE;
}

// Get metric format
export function getTrafficAnalyticsMetricFormat(metric: string): TrafficAnalyticsMetricFormat {
  const durationMetrics: readonly string[] = ['duration', 'time', 'session', 'load', 'response'];

  const percentageMetrics: readonly string[] = [
    'rate',
    'percentage',
    'share',
    'growth',
    'retention',
    'churn',
    'loyalty',
    'diversity',
    'engagement',
    'conversion',
    'completion',
    'dropoff',
    'availability',
    'uptime',
  ];

  const ratingMetrics: readonly string[] = ['score', 'quality', 'loyalty'];

  const lowerMetric = metric.toLowerCase();

  if (durationMetrics.some((dm: string) => lowerMetric.includes(dm))) {
    return TRAFFIC_ANALYTICS_METRIC.FORMATS.DURATION;
  }

  if (ratingMetrics.some((rm: string) => lowerMetric.includes(rm))) {
    return TRAFFIC_ANALYTICS_METRIC.FORMATS.RATING;
  }

  if (percentageMetrics.some((pm: string) => lowerMetric.includes(pm))) {
    return TRAFFIC_ANALYTICS_METRIC.FORMATS.PERCENTAGE;
  }

  return TRAFFIC_ANALYTICS_METRIC.FORMATS.NUMBER;
}

// Calculate bounce rate
export function calculateTrafficAnalyticsBounceRate(bounces: number, sessions: number): number {
  if (sessions === 0) return 0;
  return (bounces / sessions) * 100;
}

// Calculate exit rate
export function calculateTrafficAnalyticsExitRate(exits: number, pageViews: number): number {
  if (pageViews === 0) return 0;
  return (exits / pageViews) * 100;
}

// Calculate conversion rate
export function calculateTrafficAnalyticsConversionRate(
  conversions: number,
  visitors: number
): number {
  if (visitors === 0) return 0;
  return (conversions / visitors) * 100;
}

// Calculate visitor growth rate
export function calculateTrafficAnalyticsVisitorGrowth(
  currentVisitors: number,
  previousVisitors: number
): number {
  if (previousVisitors === 0) return 0;
  return ((currentVisitors - previousVisitors) / previousVisitors) * 100;
}

// Calculate engagement rate
export function calculateTrafficAnalyticsEngagementRate(
  engagedVisitors: number,
  totalVisitors: number
): number {
  if (totalVisitors === 0) return 0;
  return (engagedVisitors / totalVisitors) * 100;
}

// Calculate average session duration
export function calculateTrafficAnalyticsAvgSessionDuration(
  totalDuration: number,
  sessions: number
): number {
  if (sessions === 0) return 0;
  return totalDuration / sessions;
}

// Calculate page views per session
export function calculateTrafficAnalyticsPageViewsPerSession(
  pageViews: number,
  sessions: number
): number {
  if (sessions === 0) return 0;
  return pageViews / sessions;
}

// Calculate traffic diversity
export function calculateTrafficAnalyticsTrafficDiversity(sources: Record<string, number>): number {
  const values = Object.values(sources);
  const total = values.reduce((sum: number, val: number) => sum + val, 0);
  if (total === 0) return 0;

  let diversity = 0;
  for (const value of values) {
    const proportion = value / total;
    diversity -= proportion * Math.log(proportion);
  }
  return diversity;
}
