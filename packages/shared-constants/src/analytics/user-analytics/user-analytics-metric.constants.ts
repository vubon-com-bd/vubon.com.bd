/**
 * User Analytics Metric Constants
 * Metrics for measuring user behavior and engagement
 */

export const USER_ANALYTICS_METRIC = {
  // User Count Metrics
  COUNT_METRICS: {
    // Basic Counts
    TOTAL_USERS: 'total_users',
    ACTIVE_USERS: 'active_users',
    INACTIVE_USERS: 'inactive_users',
    NEW_USERS: 'new_users',
    RETURNING_USERS: 'returning_users',
    UNIQUE_USERS: 'unique_users',

    // Segment Counts
    PREMIUM_USERS: 'premium_users',
    VIP_USERS: 'vip_users',
    LOYAL_USERS: 'loyal_users',
    AT_RISK_USERS: 'at_risk_users',
    CHURNED_USERS: 'churned_users',

    // Activity Counts
    LOGIN_COUNT: 'login_count',
    SESSION_COUNT: 'session_count',
    PAGE_VIEW_COUNT: 'page_view_count',
    INTERACTION_COUNT: 'interaction_count',
    TRANSACTION_COUNT: 'transaction_count',
  } as const,

  // User Rate Metrics
  RATE_METRICS: {
    // Growth Rates
    USER_GROWTH_RATE: 'user_growth_rate',
    ACQUISITION_RATE: 'acquisition_rate',
    ACTIVATION_RATE: 'activation_rate',

    // Retention Rates
    RETENTION_RATE: 'retention_rate',
    CHURN_RATE: 'churn_rate',
    REACTIVATION_RATE: 'reactivation_rate',

    // Engagement Rates
    ENGAGEMENT_RATE: 'engagement_rate',
    BOUNCE_RATE: 'bounce_rate',
    CLICK_THROUGH_RATE: 'click_through_rate',
    CONVERSION_RATE: 'conversion_rate',

    // Satisfaction Rates
    SATISFACTION_RATE: 'satisfaction_rate',
    NPS_RATE: 'nps_rate',
    CSAT_RATE: 'csat_rate',
    COMPLETION_RATE: 'completion_rate',
  } as const,

  // User Duration Metrics
  DURATION_METRICS: {
    // Session Duration
    AVG_SESSION_DURATION: 'avg_session_duration',
    TOTAL_SESSION_DURATION: 'total_session_duration',
    MAX_SESSION_DURATION: 'max_session_duration',
    MIN_SESSION_DURATION: 'min_session_duration',

    // User Lifetime
    AVG_LIFETIME: 'avg_lifetime',
    TOTAL_LIFETIME: 'total_lifetime',
    MAX_LIFETIME: 'max_lifetime',
    MIN_LIFETIME: 'min_lifetime',

    // Time Metrics
    TIME_TO_FIRST_ACTION: 'time_to_first_action',
    TIME_TO_PURCHASE: 'time_to_purchase',
    TIME_BETWEEN_VISITS: 'time_between_visits',
    TIME_ON_SITE: 'time_on_site',
  } as const,

  // User Value Metrics
  VALUE_METRICS: {
    // Lifetime Value
    LIFETIME_VALUE: 'lifetime_value',
    AVG_LIFETIME_VALUE: 'avg_lifetime_value',
    MAX_LIFETIME_VALUE: 'max_lifetime_value',
    MIN_LIFETIME_VALUE: 'min_lifetime_value',

    // Transaction Value
    TOTAL_SPENT: 'total_spent',
    AVG_TRANSACTION_VALUE: 'avg_transaction_value',
    MAX_TRANSACTION_VALUE: 'max_transaction_value',
    MIN_TRANSACTION_VALUE: 'min_transaction_value',

    // Customer Value
    CUSTOMER_VALUE: 'customer_value',
    AVERAGE_ORDER_VALUE: 'average_order_value',
    REPEAT_PURCHASE_VALUE: 'repeat_purchase_value',
    REFERRAL_VALUE: 'referral_value',
  } as const,

  // User Engagement Metrics
  ENGAGEMENT_METRICS: {
    // Activity Metrics
    TOTAL_ACTIVITIES: 'total_activities',
    AVG_ACTIVITIES_PER_USER: 'avg_activities_per_user',
    ACTIVITY_DENSITY: 'activity_density',

    // Interaction Metrics
    TOTAL_INTERACTIONS: 'total_interactions',
    AVG_INTERACTIONS_PER_SESSION: 'avg_interactions_per_session',
    INTERACTION_DEPTH: 'interaction_depth',

    // Content Metrics
    PAGES_PER_SESSION: 'pages_per_session',
    SCROLL_DEPTH: 'scroll_depth',
    CONTENT_CONSUMPTION: 'content_consumption',
    CONTENT_SHARING: 'content_sharing',
  } as const,

  // User Retention Metrics
  RETENTION_METRICS: {
    // Retention Rates
    DAY_1_RETENTION: 'day_1_retention',
    DAY_7_RETENTION: 'day_7_retention',
    DAY_30_RETENTION: 'day_30_retention',
    DAY_90_RETENTION: 'day_90_retention',
    DAY_365_RETENTION: 'day_365_retention',

    // Return Metrics
    RETURN_RATE: 'return_rate',
    REPEAT_RATE: 'repeat_rate',
    RECURRENCE_RATE: 'recurrence_rate',

    // Churn Metrics
    CHURN_PREDICTION: 'churn_prediction',
    CHURN_RISK: 'churn_risk',
    CHURN_PROBABILITY: 'churn_probability',
  } as const,

  // User Satisfaction Metrics
  SATISFACTION_METRICS: {
    // Net Promoter Score
    NPS: 'nps',
    NPS_CATEGORY: 'nps_category',
    PROMOTER_SCORE: 'promoter_score',
    PASSIVE_SCORE: 'passive_score',
    DETRACTOR_SCORE: 'detractor_score',

    // Customer Satisfaction
    CSAT: 'csat',
    CSAT_AVERAGE: 'csat_average',
    CSAT_DISTRIBUTION: 'csat_distribution',

    // Customer Effort Score
    CES: 'ces',
    CES_AVERAGE: 'ces_average',
    CES_DISTRIBUTION: 'ces_distribution',

    // Overall Satisfaction
    SATISFACTION_SCORE: 'satisfaction_score',
    SATISFACTION_TREND: 'satisfaction_trend',
    SATISFACTION_BREAKDOWN: 'satisfaction_breakdown',
  } as const,

  // Metric Categories
  CATEGORIES: {
    COUNT: 'count',
    RATE: 'rate',
    DURATION: 'duration',
    VALUE: 'value',
    ENGAGEMENT: 'engagement',
    RETENTION: 'retention',
    SATISFACTION: 'satisfaction',
  } as const,

  // Metric Types
  TYPES: {
    ABSOLUTE: 'absolute',
    AVERAGE: 'average',
    PERCENTAGE: 'percentage',
    RATIO: 'ratio',
    INDEX: 'index',
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
} as const;

// User Analytics Count Metrics
export type UserAnalyticsCountMetric =
  (typeof USER_ANALYTICS_METRIC.COUNT_METRICS)[keyof typeof USER_ANALYTICS_METRIC.COUNT_METRICS];

// User Analytics Rate Metrics
export type UserAnalyticsRateMetric =
  (typeof USER_ANALYTICS_METRIC.RATE_METRICS)[keyof typeof USER_ANALYTICS_METRIC.RATE_METRICS];

// User Analytics Duration Metrics
export type UserAnalyticsDurationMetric =
  (typeof USER_ANALYTICS_METRIC.DURATION_METRICS)[keyof typeof USER_ANALYTICS_METRIC.DURATION_METRICS];

// User Analytics Value Metrics
export type UserAnalyticsValueMetric =
  (typeof USER_ANALYTICS_METRIC.VALUE_METRICS)[keyof typeof USER_ANALYTICS_METRIC.VALUE_METRICS];

// User Analytics Engagement Metrics
export type UserAnalyticsEngagementMetric =
  (typeof USER_ANALYTICS_METRIC.ENGAGEMENT_METRICS)[keyof typeof USER_ANALYTICS_METRIC.ENGAGEMENT_METRICS];

// User Analytics Retention Metrics
export type UserAnalyticsRetentionMetric =
  (typeof USER_ANALYTICS_METRIC.RETENTION_METRICS)[keyof typeof USER_ANALYTICS_METRIC.RETENTION_METRICS];

// User Analytics Satisfaction Metrics
export type UserAnalyticsSatisfactionMetric =
  (typeof USER_ANALYTICS_METRIC.SATISFACTION_METRICS)[keyof typeof USER_ANALYTICS_METRIC.SATISFACTION_METRICS];

// User Analytics Metric Categories
export type UserAnalyticsMetricCategory =
  (typeof USER_ANALYTICS_METRIC.CATEGORIES)[keyof typeof USER_ANALYTICS_METRIC.CATEGORIES];

// User Analytics Metric Types
export type UserAnalyticsMetricType =
  (typeof USER_ANALYTICS_METRIC.TYPES)[keyof typeof USER_ANALYTICS_METRIC.TYPES];

// User Analytics Metric Formats
export type UserAnalyticsMetricFormat =
  (typeof USER_ANALYTICS_METRIC.FORMATS)[keyof typeof USER_ANALYTICS_METRIC.FORMATS];

// User Analytics Metric Labels
export function getUserAnalyticsMetricLabel(metric: string): string {
  const labels: Record<string, string> = {
    // Count Metrics
    total_users: 'Total Users',
    active_users: 'Active Users',
    inactive_users: 'Inactive Users',
    new_users: 'New Users',
    returning_users: 'Returning Users',
    unique_users: 'Unique Users',
    premium_users: 'Premium Users',
    vip_users: 'VIP Users',
    loyal_users: 'Loyal Users',
    at_risk_users: 'At Risk Users',
    churned_users: 'Churned Users',
    login_count: 'Login Count',
    session_count: 'Session Count',
    page_view_count: 'Page View Count',
    interaction_count: 'Interaction Count',
    transaction_count: 'Transaction Count',

    // Rate Metrics
    user_growth_rate: 'User Growth Rate',
    acquisition_rate: 'Acquisition Rate',
    activation_rate: 'Activation Rate',
    retention_rate: 'Retention Rate',
    churn_rate: 'Churn Rate',
    reactivation_rate: 'Reactivation Rate',
    engagement_rate: 'Engagement Rate',
    bounce_rate: 'Bounce Rate',
    click_through_rate: 'Click-through Rate',
    conversion_rate: 'Conversion Rate',
    satisfaction_rate: 'Satisfaction Rate',
    nps_rate: 'NPS Rate',
    csat_rate: 'CSAT Rate',
    completion_rate: 'Completion Rate',

    // Duration Metrics
    avg_session_duration: 'Avg Session Duration',
    total_session_duration: 'Total Session Duration',
    max_session_duration: 'Max Session Duration',
    min_session_duration: 'Min Session Duration',
    avg_lifetime: 'Avg Lifetime',
    total_lifetime: 'Total Lifetime',
    max_lifetime: 'Max Lifetime',
    min_lifetime: 'Min Lifetime',
    time_to_first_action: 'Time to First Action',
    time_to_purchase: 'Time to Purchase',
    time_between_visits: 'Time Between Visits',
    time_on_site: 'Time on Site',

    // Value Metrics
    lifetime_value: 'Lifetime Value',
    avg_lifetime_value: 'Avg Lifetime Value',
    max_lifetime_value: 'Max Lifetime Value',
    min_lifetime_value: 'Min Lifetime Value',
    total_spent: 'Total Spent',
    avg_transaction_value: 'Avg Transaction Value',
    max_transaction_value: 'Max Transaction Value',
    min_transaction_value: 'Min Transaction Value',
    customer_value: 'Customer Value',
    average_order_value: 'Average Order Value',
    repeat_purchase_value: 'Repeat Purchase Value',
    referral_value: 'Referral Value',

    // Engagement Metrics
    total_activities: 'Total Activities',
    avg_activities_per_user: 'Avg Activities Per User',
    activity_density: 'Activity Density',
    total_interactions: 'Total Interactions',
    avg_interactions_per_session: 'Avg Interactions Per Session',
    interaction_depth: 'Interaction Depth',
    pages_per_session: 'Pages Per Session',
    scroll_depth: 'Scroll Depth',
    content_consumption: 'Content Consumption',
    content_sharing: 'Content Sharing',

    // Retention Metrics
    day_1_retention: 'Day 1 Retention',
    day_7_retention: 'Day 7 Retention',
    day_30_retention: 'Day 30 Retention',
    day_90_retention: 'Day 90 Retention',
    day_365_retention: 'Day 365 Retention',
    return_rate: 'Return Rate',
    repeat_rate: 'Repeat Rate',
    recurrence_rate: 'Recurrence Rate',
    churn_prediction: 'Churn Prediction',
    churn_risk: 'Churn Risk',
    churn_probability: 'Churn Probability',

    // Satisfaction Metrics
    nps: 'NPS',
    nps_category: 'NPS Category',
    promoter_score: 'Promoter Score',
    passive_score: 'Passive Score',
    detractor_score: 'Detractor Score',
    csat: 'CSAT',
    csat_average: 'CSAT Average',
    csat_distribution: 'CSAT Distribution',
    ces: 'CES',
    ces_average: 'CES Average',
    ces_distribution: 'CES Distribution',
    satisfaction_score: 'Satisfaction Score',
    satisfaction_trend: 'Satisfaction Trend',
    satisfaction_breakdown: 'Satisfaction Breakdown',
  };

  return (
    labels[metric] || metric.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
  );
}

// User Analytics Metric Category Labels
export function getUserAnalyticsMetricCategoryLabel(category: UserAnalyticsMetricCategory): string {
  const labels: Record<UserAnalyticsMetricCategory, string> = {
    [USER_ANALYTICS_METRIC.CATEGORIES.COUNT]: 'Count',
    [USER_ANALYTICS_METRIC.CATEGORIES.RATE]: 'Rate',
    [USER_ANALYTICS_METRIC.CATEGORIES.DURATION]: 'Duration',
    [USER_ANALYTICS_METRIC.CATEGORIES.VALUE]: 'Value',
    [USER_ANALYTICS_METRIC.CATEGORIES.ENGAGEMENT]: 'Engagement',
    [USER_ANALYTICS_METRIC.CATEGORIES.RETENTION]: 'Retention',
    [USER_ANALYTICS_METRIC.CATEGORIES.SATISFACTION]: 'Satisfaction',
  };
  return labels[category] || 'Unknown';
}

// User Analytics Metric Type Labels
export function getUserAnalyticsMetricTypeLabel(type: UserAnalyticsMetricType): string {
  const labels: Record<UserAnalyticsMetricType, string> = {
    [USER_ANALYTICS_METRIC.TYPES.ABSOLUTE]: 'Absolute',
    [USER_ANALYTICS_METRIC.TYPES.AVERAGE]: 'Average',
    [USER_ANALYTICS_METRIC.TYPES.PERCENTAGE]: 'Percentage',
    [USER_ANALYTICS_METRIC.TYPES.RATIO]: 'Ratio',
    [USER_ANALYTICS_METRIC.TYPES.INDEX]: 'Index',
  };
  return labels[type] || 'Unknown';
}

// User Analytics Metric Format Labels
export function getUserAnalyticsMetricFormatLabel(format: UserAnalyticsMetricFormat): string {
  const labels: Record<UserAnalyticsMetricFormat, string> = {
    [USER_ANALYTICS_METRIC.FORMATS.NUMBER]: 'Number',
    [USER_ANALYTICS_METRIC.FORMATS.DECIMAL]: 'Decimal',
    [USER_ANALYTICS_METRIC.FORMATS.PERCENTAGE]: 'Percentage',
    [USER_ANALYTICS_METRIC.FORMATS.CURRENCY]: 'Currency',
    [USER_ANALYTICS_METRIC.FORMATS.DURATION]: 'Duration',
    [USER_ANALYTICS_METRIC.FORMATS.RATING]: 'Rating',
  };
  return labels[format] || 'Unknown';
}

// Get metric category
export function getUserAnalyticsMetricCategory(metric: string): UserAnalyticsMetricCategory {
  const countMetrics: readonly string[] = Object.values(USER_ANALYTICS_METRIC.COUNT_METRICS);
  const rateMetrics: readonly string[] = Object.values(USER_ANALYTICS_METRIC.RATE_METRICS);
  const durationMetrics: readonly string[] = Object.values(USER_ANALYTICS_METRIC.DURATION_METRICS);
  const valueMetrics: readonly string[] = Object.values(USER_ANALYTICS_METRIC.VALUE_METRICS);
  const engagementMetrics: readonly string[] = Object.values(
    USER_ANALYTICS_METRIC.ENGAGEMENT_METRICS
  );
  const retentionMetrics: readonly string[] = Object.values(
    USER_ANALYTICS_METRIC.RETENTION_METRICS
  );
  const satisfactionMetrics: readonly string[] = Object.values(
    USER_ANALYTICS_METRIC.SATISFACTION_METRICS
  );

  if (countMetrics.includes(metric as UserAnalyticsCountMetric)) {
    return USER_ANALYTICS_METRIC.CATEGORIES.COUNT;
  }
  if (rateMetrics.includes(metric as UserAnalyticsRateMetric)) {
    return USER_ANALYTICS_METRIC.CATEGORIES.RATE;
  }
  if (durationMetrics.includes(metric as UserAnalyticsDurationMetric)) {
    return USER_ANALYTICS_METRIC.CATEGORIES.DURATION;
  }
  if (valueMetrics.includes(metric as UserAnalyticsValueMetric)) {
    return USER_ANALYTICS_METRIC.CATEGORIES.VALUE;
  }
  if (engagementMetrics.includes(metric as UserAnalyticsEngagementMetric)) {
    return USER_ANALYTICS_METRIC.CATEGORIES.ENGAGEMENT;
  }
  if (retentionMetrics.includes(metric as UserAnalyticsRetentionMetric)) {
    return USER_ANALYTICS_METRIC.CATEGORIES.RETENTION;
  }
  if (satisfactionMetrics.includes(metric as UserAnalyticsSatisfactionMetric)) {
    return USER_ANALYTICS_METRIC.CATEGORIES.SATISFACTION;
  }

  return USER_ANALYTICS_METRIC.CATEGORIES.COUNT;
}

// Get metric type
export function getUserAnalyticsMetricType(metric: string): UserAnalyticsMetricType {
  const percentageMetrics: string[] = [
    'rate',
    'percentage',
    'retention',
    'churn',
    'bounce',
    'conversion',
    'satisfaction',
    'completion',
    'engagement',
    'growth',
    'acquisition',
  ];

  const averageMetrics: string[] = ['avg', 'average', 'mean'];

  const ratioMetrics: string[] = ['ratio', 'index'];

  const lowerMetric = metric.toLowerCase();

  if (percentageMetrics.some((pm: string) => lowerMetric.includes(pm))) {
    return USER_ANALYTICS_METRIC.TYPES.PERCENTAGE;
  }

  if (averageMetrics.some((am: string) => lowerMetric.includes(am))) {
    return USER_ANALYTICS_METRIC.TYPES.AVERAGE;
  }

  if (ratioMetrics.some((rm: string) => lowerMetric.includes(rm))) {
    return USER_ANALYTICS_METRIC.TYPES.RATIO;
  }

  return USER_ANALYTICS_METRIC.TYPES.ABSOLUTE;
}

// Get metric format
export function getUserAnalyticsMetricFormat(metric: string): UserAnalyticsMetricFormat {
  const currencyMetrics: string[] = ['value', 'spent', 'revenue', 'price', 'cost', 'amount'];

  const durationMetrics: string[] = ['duration', 'time', 'lifetime', 'session'];

  const ratingMetrics: string[] = ['score', 'rating', 'nps', 'csat', 'ces'];

  const percentageMetrics: string[] = [
    'rate',
    'percentage',
    'retention',
    'churn',
    'bounce',
    'conversion',
    'satisfaction',
    'completion',
    'engagement',
    'growth',
    'acquisition',
  ];

  const lowerMetric = metric.toLowerCase();

  if (currencyMetrics.some((cm: string) => lowerMetric.includes(cm))) {
    return USER_ANALYTICS_METRIC.FORMATS.CURRENCY;
  }

  if (durationMetrics.some((dm: string) => lowerMetric.includes(dm))) {
    return USER_ANALYTICS_METRIC.FORMATS.DURATION;
  }

  if (ratingMetrics.some((rm: string) => lowerMetric.includes(rm))) {
    return USER_ANALYTICS_METRIC.FORMATS.RATING;
  }

  if (percentageMetrics.some((pm: string) => lowerMetric.includes(pm))) {
    return USER_ANALYTICS_METRIC.FORMATS.PERCENTAGE;
  }

  return USER_ANALYTICS_METRIC.FORMATS.NUMBER;
}

// Calculate retention rate
export function calculateUserAnalyticsRetentionRate(
  retainedUsers: number,
  totalUsers: number
): number {
  if (totalUsers === 0) return 0;
  return (retainedUsers / totalUsers) * 100;
}

// Calculate churn rate
export function calculateUserAnalyticsChurnRate(churnedUsers: number, totalUsers: number): number {
  if (totalUsers === 0) return 0;
  return (churnedUsers / totalUsers) * 100;
}

// Calculate engagement rate
export function calculateUserAnalyticsEngagementRate(
  engagedUsers: number,
  totalUsers: number
): number {
  if (totalUsers === 0) return 0;
  return (engagedUsers / totalUsers) * 100;
}

// Calculate NPS
export function calculateUserAnalyticsNPS(
  promoters: number,
  passives: number,
  detractors: number
): number {
  const total = promoters + passives + detractors;
  if (total === 0) return 0;
  return ((promoters - detractors) / total) * 100;
}
