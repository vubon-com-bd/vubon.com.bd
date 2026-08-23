/**
 * Retention Analytics Constants
 * Configuration for customer retention analytics and tracking
 */

export const RETENTION_ANALYTICS = {
  // Retention Analytics Types
  TYPES: {
    // Customer Retention
    CUSTOMER: 'customer',
    USER: 'user',
    ACCOUNT: 'account',

    // Product Retention
    PRODUCT: 'product',
    SERVICE: 'service',
    SUBSCRIPTION: 'subscription',

    // Engagement Retention
    ENGAGEMENT: 'engagement',
    ACTIVITY: 'activity',
    INTERACTION: 'interaction',

    // Time Retention
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',

    // Cohort Retention
    COHORT: 'cohort',
    SEGMENT: 'segment',
    GROUP: 'group',
  } as const,

  // Retention Analytics Status
  STATUS: {
    TRACKING: 'tracking',
    PROCESSING: 'processing',
    ANALYZING: 'analyzing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    PAUSED: 'paused',
    STOPPED: 'stopped',
    UPDATING: 'updating',
    REFRESHING: 'refreshing',
  } as const,

  // Retention Analytics Scopes
  SCOPES: {
    INDIVIDUAL: 'individual',
    COHORT: 'cohort',
    SEGMENT: 'segment',
    PRODUCT: 'product',
    ALL_RETENTION: 'all_retention',
    COMPARATIVE: 'comparative',
  } as const,

  // Retention Analytics Events
  EVENTS: {
    // Customer Retention Events
    CUSTOMER_RETAINED: 'customer_retained',
    CUSTOMER_CHURNED: 'customer_churned',
    CUSTOMER_REACTIVATED: 'customer_reactivated',
    CUSTOMER_ACTIVE: 'customer_active',
    CUSTOMER_INACTIVE: 'customer_inactive',

    // Product Retention Events
    PRODUCT_RETAINED: 'product_retained',
    PRODUCT_CHURNED: 'product_churned',
    PRODUCT_REACTIVATED: 'product_reactivated',

    // Engagement Retention Events
    ENGAGEMENT_INCREASED: 'engagement_increased',
    ENGAGEMENT_DECREASED: 'engagement_decreased',
    ENGAGEMENT_STABLE: 'engagement_stable',

    // Subscription Retention Events
    SUBSCRIPTION_RENEWED: 'subscription_renewed',
    SUBSCRIPTION_CANCELLED: 'subscription_cancelled',
    SUBSCRIPTION_EXPIRED: 'subscription_expired',

    // Milestone Retention Events
    MILESTONE_ACHIEVED: 'milestone_achieved',
    RETENTION_GOAL_MET: 'retention_goal_met',
    RETENTION_GOAL_MISSED: 'retention_goal_missed',

    // Cohort Retention Events
    COHORT_RETAINED: 'cohort_retained',
    COHORT_CHURNED: 'cohort_churned',
    COHORT_ACTIVE: 'cohort_active',
  } as const,

  // Retention Analytics Dimensions
  DIMENSIONS: {
    // Customer Attributes
    CUSTOMER_ID: 'customer_id',
    CUSTOMER_NAME: 'customer_name',
    CUSTOMER_TYPE: 'customer_type',
    CUSTOMER_SEGMENT: 'customer_segment',
    CUSTOMER_TIER: 'customer_tier',

    // Product Attributes
    PRODUCT_ID: 'product_id',
    PRODUCT_NAME: 'product_name',
    PRODUCT_CATEGORY: 'product_category',
    PRODUCT_TYPE: 'product_type',

    // Time Attributes
    RETENTION_DATE: 'retention_date',
    RETENTION_WEEK: 'retention_week',
    RETENTION_MONTH: 'retention_month',
    RETENTION_QUARTER: 'retention_quarter',
    RETENTION_YEAR: 'retention_year',

    // Cohort Attributes
    COHORT_ID: 'cohort_id',
    COHORT_NAME: 'cohort_name',
    COHORT_TYPE: 'cohort_type',
    COHORT_SIZE: 'cohort_size',

    // Engagement Attributes
    ENGAGEMENT_SCORE: 'engagement_score',
    ACTIVITY_COUNT: 'activity_count',
    INTERACTION_COUNT: 'interaction_count',

    // Subscription Attributes
    SUBSCRIPTION_ID: 'subscription_id',
    SUBSCRIPTION_TYPE: 'subscription_type',
    SUBSCRIPTION_STATUS: 'subscription_status',

    // Channel Attributes
    CHANNEL: 'channel',
    SOURCE: 'source',
    MEDIUM: 'medium',
  } as const,

  // Retention Analytics Metrics
  METRICS: {
    // Retention Rate Metrics
    RETENTION_RATE: 'retention_rate',
    COHORT_RETENTION_RATE: 'cohort_retention_rate',
    SEGMENT_RETENTION_RATE: 'segment_retention_rate',
    PRODUCT_RETENTION_RATE: 'product_retention_rate',

    // Churn Rate Metrics
    CHURN_RATE: 'churn_rate',
    COHORT_CHURN_RATE: 'cohort_churn_rate',
    SEGMENT_CHURN_RATE: 'segment_churn_rate',
    PRODUCT_CHURN_RATE: 'product_churn_rate',

    // Reactivation Metrics
    REACTIVATION_RATE: 'reactivation_rate',
    REACTIVATION_COUNT: 'reactivation_count',

    // Engagement Metrics
    ENGAGEMENT_SCORE: 'engagement_score',
    ACTIVITY_RATE: 'activity_rate',
    INTERACTION_RATE: 'interaction_rate',

    // Subscription Metrics
    SUBSCRIPTION_RENEWAL_RATE: 'subscription_renewal_rate',
    SUBSCRIPTION_CANCELLATION_RATE: 'subscription_cancellation_rate',
    SUBSCRIPTION_EXPIRY_RATE: 'subscription_expiry_rate',

    // Customer Lifetime Metrics
    CUSTOMER_LIFETIME: 'customer_lifetime',
    AVERAGE_LIFETIME: 'average_lifetime',
    LIFETIME_VALUE: 'lifetime_value',

    // Cohort Metrics
    COHORT_SIZE: 'cohort_size',
    COHORT_RETENTION: 'cohort_retention',
    COHORT_CHURN: 'cohort_churn',

    // Comparison Metrics
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    PERIOD_COMPARISON: 'period_comparison',
  } as const,

  // Retention Analytics Segments
  SEGMENTS: {
    // Retention Segments
    HIGH_RETENTION: 'high_retention',
    MEDIUM_RETENTION: 'medium_retention',
    LOW_RETENTION: 'low_retention',

    // Churn Segments
    LOW_CHURN: 'low_churn',
    MEDIUM_CHURN: 'medium_churn',
    HIGH_CHURN: 'high_churn',

    // Customer Segments
    LOYAL: 'loyal',
    AT_RISK: 'at_risk',
    CHURNING: 'churning',
    CHURNED: 'churned',
    REACTIVATED: 'reactivated',

    // Value Segments
    HIGH_VALUE: 'high_value',
    MEDIUM_VALUE: 'medium_value',
    LOW_VALUE: 'low_value',

    // Engagement Segments
    HIGHLY_ENGAGED: 'highly_engaged',
    ENGAGED: 'engaged',
    DISENGAGED: 'disengaged',
    INACTIVE: 'inactive',

    // Product Segments
    HIGH_RETENTION_PRODUCT: 'high_retention_product',
    MEDIUM_RETENTION_PRODUCT: 'medium_retention_product',
    LOW_RETENTION_PRODUCT: 'low_retention_product',
  } as const,

  // Retention Analytics Cohorts
  COHORTS: {
    ACQUISITION_DATE: 'acquisition_date',
    ACQUISITION_CHANNEL: 'acquisition_channel',
    CUSTOMER_TYPE: 'customer_type',
    PRODUCT_TYPE: 'product_type',
    SEGMENT: 'segment',
    REGION: 'region',
  } as const,

  // Retention Analytics Granularity
  GRANULARITY: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,

  // Retention Periods
  PERIODS: {
    DAY_1: 'day_1',
    DAY_3: 'day_3',
    DAY_7: 'day_7',
    DAY_14: 'day_14',
    DAY_30: 'day_30',
    DAY_60: 'day_60',
    DAY_90: 'day_90',
    DAY_180: 'day_180',
    DAY_365: 'day_365',
  } as const,
} as const;

// Retention Analytics Types
export type RetentionAnalyticsType =
  (typeof RETENTION_ANALYTICS.TYPES)[keyof typeof RETENTION_ANALYTICS.TYPES];

// Retention Analytics Status
export type RetentionAnalyticsStatus =
  (typeof RETENTION_ANALYTICS.STATUS)[keyof typeof RETENTION_ANALYTICS.STATUS];

// Retention Analytics Scopes
export type RetentionAnalyticsScope =
  (typeof RETENTION_ANALYTICS.SCOPES)[keyof typeof RETENTION_ANALYTICS.SCOPES];

// Retention Analytics Events
export type RetentionAnalyticsEvent =
  (typeof RETENTION_ANALYTICS.EVENTS)[keyof typeof RETENTION_ANALYTICS.EVENTS];

// Retention Analytics Dimensions
export type RetentionAnalyticsDimension =
  (typeof RETENTION_ANALYTICS.DIMENSIONS)[keyof typeof RETENTION_ANALYTICS.DIMENSIONS];

// Retention Analytics Metrics
export type RetentionAnalyticsMetric =
  (typeof RETENTION_ANALYTICS.METRICS)[keyof typeof RETENTION_ANALYTICS.METRICS];

// Retention Analytics Segments
export type RetentionAnalyticsSegment =
  (typeof RETENTION_ANALYTICS.SEGMENTS)[keyof typeof RETENTION_ANALYTICS.SEGMENTS];

// Retention Analytics Cohorts
export type RetentionAnalyticsCohort =
  (typeof RETENTION_ANALYTICS.COHORTS)[keyof typeof RETENTION_ANALYTICS.COHORTS];

// Retention Analytics Granularity
export type RetentionAnalyticsGranularity =
  (typeof RETENTION_ANALYTICS.GRANULARITY)[keyof typeof RETENTION_ANALYTICS.GRANULARITY];

// Retention Analytics Periods
export type RetentionAnalyticsPeriod =
  (typeof RETENTION_ANALYTICS.PERIODS)[keyof typeof RETENTION_ANALYTICS.PERIODS];

// Retention Analytics Status Labels
export function getRetentionAnalyticsStatusLabel(status: RetentionAnalyticsStatus): string {
  const labels: Record<RetentionAnalyticsStatus, string> = {
    [RETENTION_ANALYTICS.STATUS.TRACKING]: 'Tracking',
    [RETENTION_ANALYTICS.STATUS.PROCESSING]: 'Processing',
    [RETENTION_ANALYTICS.STATUS.ANALYZING]: 'Analyzing',
    [RETENTION_ANALYTICS.STATUS.COMPLETED]: 'Completed',
    [RETENTION_ANALYTICS.STATUS.FAILED]: 'Failed',
    [RETENTION_ANALYTICS.STATUS.PAUSED]: 'Paused',
    [RETENTION_ANALYTICS.STATUS.STOPPED]: 'Stopped',
    [RETENTION_ANALYTICS.STATUS.UPDATING]: 'Updating',
    [RETENTION_ANALYTICS.STATUS.REFRESHING]: 'Refreshing',
  };
  return labels[status] || 'Unknown';
}

// Retention Analytics Event Labels
export function getRetentionAnalyticsEventLabel(event: RetentionAnalyticsEvent): string {
  const labels: Record<RetentionAnalyticsEvent, string> = {
    [RETENTION_ANALYTICS.EVENTS.CUSTOMER_RETAINED]: 'Customer Retained',
    [RETENTION_ANALYTICS.EVENTS.CUSTOMER_CHURNED]: 'Customer Churned',
    [RETENTION_ANALYTICS.EVENTS.CUSTOMER_REACTIVATED]: 'Customer Reactivated',
    [RETENTION_ANALYTICS.EVENTS.CUSTOMER_ACTIVE]: 'Customer Active',
    [RETENTION_ANALYTICS.EVENTS.CUSTOMER_INACTIVE]: 'Customer Inactive',
    [RETENTION_ANALYTICS.EVENTS.PRODUCT_RETAINED]: 'Product Retained',
    [RETENTION_ANALYTICS.EVENTS.PRODUCT_CHURNED]: 'Product Churned',
    [RETENTION_ANALYTICS.EVENTS.PRODUCT_REACTIVATED]: 'Product Reactivated',
    [RETENTION_ANALYTICS.EVENTS.ENGAGEMENT_INCREASED]: 'Engagement Increased',
    [RETENTION_ANALYTICS.EVENTS.ENGAGEMENT_DECREASED]: 'Engagement Decreased',
    [RETENTION_ANALYTICS.EVENTS.ENGAGEMENT_STABLE]: 'Engagement Stable',
    [RETENTION_ANALYTICS.EVENTS.SUBSCRIPTION_RENEWED]: 'Subscription Renewed',
    [RETENTION_ANALYTICS.EVENTS.SUBSCRIPTION_CANCELLED]: 'Subscription Cancelled',
    [RETENTION_ANALYTICS.EVENTS.SUBSCRIPTION_EXPIRED]: 'Subscription Expired',
    [RETENTION_ANALYTICS.EVENTS.MILESTONE_ACHIEVED]: 'Milestone Achieved',
    [RETENTION_ANALYTICS.EVENTS.RETENTION_GOAL_MET]: 'Retention Goal Met',
    [RETENTION_ANALYTICS.EVENTS.RETENTION_GOAL_MISSED]: 'Retention Goal Missed',
    [RETENTION_ANALYTICS.EVENTS.COHORT_RETAINED]: 'Cohort Retained',
    [RETENTION_ANALYTICS.EVENTS.COHORT_CHURNED]: 'Cohort Churned',
    [RETENTION_ANALYTICS.EVENTS.COHORT_ACTIVE]: 'Cohort Active',
  };
  return labels[event] || 'Unknown';
}

// Retention Analytics Dimension Labels
export function getRetentionAnalyticsDimensionLabel(
  dimension: RetentionAnalyticsDimension
): string {
  const labels: Record<RetentionAnalyticsDimension, string> = {
    [RETENTION_ANALYTICS.DIMENSIONS.CUSTOMER_ID]: 'Customer ID',
    [RETENTION_ANALYTICS.DIMENSIONS.CUSTOMER_NAME]: 'Customer Name',
    [RETENTION_ANALYTICS.DIMENSIONS.CUSTOMER_TYPE]: 'Customer Type',
    [RETENTION_ANALYTICS.DIMENSIONS.CUSTOMER_SEGMENT]: 'Customer Segment',
    [RETENTION_ANALYTICS.DIMENSIONS.CUSTOMER_TIER]: 'Customer Tier',
    [RETENTION_ANALYTICS.DIMENSIONS.PRODUCT_ID]: 'Product ID',
    [RETENTION_ANALYTICS.DIMENSIONS.PRODUCT_NAME]: 'Product Name',
    [RETENTION_ANALYTICS.DIMENSIONS.PRODUCT_CATEGORY]: 'Product Category',
    [RETENTION_ANALYTICS.DIMENSIONS.PRODUCT_TYPE]: 'Product Type',
    [RETENTION_ANALYTICS.DIMENSIONS.RETENTION_DATE]: 'Retention Date',
    [RETENTION_ANALYTICS.DIMENSIONS.RETENTION_WEEK]: 'Retention Week',
    [RETENTION_ANALYTICS.DIMENSIONS.RETENTION_MONTH]: 'Retention Month',
    [RETENTION_ANALYTICS.DIMENSIONS.RETENTION_QUARTER]: 'Retention Quarter',
    [RETENTION_ANALYTICS.DIMENSIONS.RETENTION_YEAR]: 'Retention Year',
    [RETENTION_ANALYTICS.DIMENSIONS.COHORT_ID]: 'Cohort ID',
    [RETENTION_ANALYTICS.DIMENSIONS.COHORT_NAME]: 'Cohort Name',
    [RETENTION_ANALYTICS.DIMENSIONS.COHORT_TYPE]: 'Cohort Type',
    [RETENTION_ANALYTICS.DIMENSIONS.COHORT_SIZE]: 'Cohort Size',
    [RETENTION_ANALYTICS.DIMENSIONS.ENGAGEMENT_SCORE]: 'Engagement Score',
    [RETENTION_ANALYTICS.DIMENSIONS.ACTIVITY_COUNT]: 'Activity Count',
    [RETENTION_ANALYTICS.DIMENSIONS.INTERACTION_COUNT]: 'Interaction Count',
    [RETENTION_ANALYTICS.DIMENSIONS.SUBSCRIPTION_ID]: 'Subscription ID',
    [RETENTION_ANALYTICS.DIMENSIONS.SUBSCRIPTION_TYPE]: 'Subscription Type',
    [RETENTION_ANALYTICS.DIMENSIONS.SUBSCRIPTION_STATUS]: 'Subscription Status',
    [RETENTION_ANALYTICS.DIMENSIONS.CHANNEL]: 'Channel',
    [RETENTION_ANALYTICS.DIMENSIONS.SOURCE]: 'Source',
    [RETENTION_ANALYTICS.DIMENSIONS.MEDIUM]: 'Medium',
  };
  return labels[dimension] || 'Unknown';
}

// Retention Analytics Segment Labels
export function getRetentionAnalyticsSegmentLabel(segment: RetentionAnalyticsSegment): string {
  const labels: Record<RetentionAnalyticsSegment, string> = {
    [RETENTION_ANALYTICS.SEGMENTS.HIGH_RETENTION]: 'High Retention',
    [RETENTION_ANALYTICS.SEGMENTS.MEDIUM_RETENTION]: 'Medium Retention',
    [RETENTION_ANALYTICS.SEGMENTS.LOW_RETENTION]: 'Low Retention',
    [RETENTION_ANALYTICS.SEGMENTS.LOW_CHURN]: 'Low Churn',
    [RETENTION_ANALYTICS.SEGMENTS.MEDIUM_CHURN]: 'Medium Churn',
    [RETENTION_ANALYTICS.SEGMENTS.HIGH_CHURN]: 'High Churn',
    [RETENTION_ANALYTICS.SEGMENTS.LOYAL]: 'Loyal',
    [RETENTION_ANALYTICS.SEGMENTS.AT_RISK]: 'At Risk',
    [RETENTION_ANALYTICS.SEGMENTS.CHURNING]: 'Churning',
    [RETENTION_ANALYTICS.SEGMENTS.CHURNED]: 'Churned',
    [RETENTION_ANALYTICS.SEGMENTS.REACTIVATED]: 'Reactivated',
    [RETENTION_ANALYTICS.SEGMENTS.HIGH_VALUE]: 'High Value',
    [RETENTION_ANALYTICS.SEGMENTS.MEDIUM_VALUE]: 'Medium Value',
    [RETENTION_ANALYTICS.SEGMENTS.LOW_VALUE]: 'Low Value',
    [RETENTION_ANALYTICS.SEGMENTS.HIGHLY_ENGAGED]: 'Highly Engaged',
    [RETENTION_ANALYTICS.SEGMENTS.ENGAGED]: 'Engaged',
    [RETENTION_ANALYTICS.SEGMENTS.DISENGAGED]: 'Disengaged',
    [RETENTION_ANALYTICS.SEGMENTS.INACTIVE]: 'Inactive',
    [RETENTION_ANALYTICS.SEGMENTS.HIGH_RETENTION_PRODUCT]: 'High Retention Product',
    [RETENTION_ANALYTICS.SEGMENTS.MEDIUM_RETENTION_PRODUCT]: 'Medium Retention Product',
    [RETENTION_ANALYTICS.SEGMENTS.LOW_RETENTION_PRODUCT]: 'Low Retention Product',
  };
  return labels[segment] || 'Unknown';
}

// Retention Analytics Cohort Labels
export function getRetentionAnalyticsCohortLabel(cohort: RetentionAnalyticsCohort): string {
  const labels: Record<RetentionAnalyticsCohort, string> = {
    [RETENTION_ANALYTICS.COHORTS.ACQUISITION_DATE]: 'Acquisition Date',
    [RETENTION_ANALYTICS.COHORTS.ACQUISITION_CHANNEL]: 'Acquisition Channel',
    [RETENTION_ANALYTICS.COHORTS.CUSTOMER_TYPE]: 'Customer Type',
    [RETENTION_ANALYTICS.COHORTS.PRODUCT_TYPE]: 'Product Type',
    [RETENTION_ANALYTICS.COHORTS.SEGMENT]: 'Segment',
    [RETENTION_ANALYTICS.COHORTS.REGION]: 'Region',
  };
  return labels[cohort] || 'Unknown';
}

// Retention Analytics Granularity Labels
export function getRetentionAnalyticsGranularityLabel(
  granularity: RetentionAnalyticsGranularity
): string {
  const labels: Record<RetentionAnalyticsGranularity, string> = {
    [RETENTION_ANALYTICS.GRANULARITY.DAILY]: 'Daily',
    [RETENTION_ANALYTICS.GRANULARITY.WEEKLY]: 'Weekly',
    [RETENTION_ANALYTICS.GRANULARITY.MONTHLY]: 'Monthly',
    [RETENTION_ANALYTICS.GRANULARITY.QUARTERLY]: 'Quarterly',
    [RETENTION_ANALYTICS.GRANULARITY.YEARLY]: 'Yearly',
  };
  return labels[granularity] || 'Unknown';
}

// Retention Analytics Period Labels
export function getRetentionAnalyticsPeriodLabel(period: RetentionAnalyticsPeriod): string {
  const labels: Record<RetentionAnalyticsPeriod, string> = {
    [RETENTION_ANALYTICS.PERIODS.DAY_1]: 'Day 1',
    [RETENTION_ANALYTICS.PERIODS.DAY_3]: 'Day 3',
    [RETENTION_ANALYTICS.PERIODS.DAY_7]: 'Day 7',
    [RETENTION_ANALYTICS.PERIODS.DAY_14]: 'Day 14',
    [RETENTION_ANALYTICS.PERIODS.DAY_30]: 'Day 30',
    [RETENTION_ANALYTICS.PERIODS.DAY_60]: 'Day 60',
    [RETENTION_ANALYTICS.PERIODS.DAY_90]: 'Day 90',
    [RETENTION_ANALYTICS.PERIODS.DAY_180]: 'Day 180',
    [RETENTION_ANALYTICS.PERIODS.DAY_365]: 'Day 365',
  };
  return labels[period] || 'Unknown';
}

// Check if retention analytics is active
export function isRetentionAnalyticsActive(status: RetentionAnalyticsStatus): boolean {
  const activeStatuses: RetentionAnalyticsStatus[] = [
    RETENTION_ANALYTICS.STATUS.TRACKING,
    RETENTION_ANALYTICS.STATUS.PROCESSING,
    RETENTION_ANALYTICS.STATUS.ANALYZING,
    RETENTION_ANALYTICS.STATUS.UPDATING,
    RETENTION_ANALYTICS.STATUS.REFRESHING,
  ];
  return activeStatuses.includes(status);
}

// Check if retention analytics is completed
export function isRetentionAnalyticsCompleted(status: RetentionAnalyticsStatus): boolean {
  return status === RETENTION_ANALYTICS.STATUS.COMPLETED;
}

// Check if retention analytics has failed
export function isRetentionAnalyticsFailed(status: RetentionAnalyticsStatus): boolean {
  return status === RETENTION_ANALYTICS.STATUS.FAILED;
}

// Check if event is retention event
export function isRetentionAnalyticsRetentionEvent(event: RetentionAnalyticsEvent): boolean {
  const retentionEvents: RetentionAnalyticsEvent[] = [
    RETENTION_ANALYTICS.EVENTS.CUSTOMER_RETAINED,
    RETENTION_ANALYTICS.EVENTS.PRODUCT_RETAINED,
    RETENTION_ANALYTICS.EVENTS.SUBSCRIPTION_RENEWED,
    RETENTION_ANALYTICS.EVENTS.COHORT_RETAINED,
  ];
  return retentionEvents.includes(event);
}

// Check if event is churn event
export function isRetentionAnalyticsChurnEvent(event: RetentionAnalyticsEvent): boolean {
  const churnEvents: RetentionAnalyticsEvent[] = [
    RETENTION_ANALYTICS.EVENTS.CUSTOMER_CHURNED,
    RETENTION_ANALYTICS.EVENTS.PRODUCT_CHURNED,
    RETENTION_ANALYTICS.EVENTS.SUBSCRIPTION_CANCELLED,
    RETENTION_ANALYTICS.EVENTS.SUBSCRIPTION_EXPIRED,
    RETENTION_ANALYTICS.EVENTS.COHORT_CHURNED,
  ];
  return churnEvents.includes(event);
}

// Check if event is reactivation event
export function isRetentionAnalyticsReactivationEvent(event: RetentionAnalyticsEvent): boolean {
  const reactivationEvents: RetentionAnalyticsEvent[] = [
    RETENTION_ANALYTICS.EVENTS.CUSTOMER_REACTIVATED,
    RETENTION_ANALYTICS.EVENTS.PRODUCT_REACTIVATED,
  ];
  return reactivationEvents.includes(event);
}

// Calculate retention rate
export function calculateRetentionAnalyticsRetentionRate(
  retainedCustomers: number,
  totalCustomers: number
): number {
  if (totalCustomers === 0) return 0;
  return (retainedCustomers / totalCustomers) * 100;
}

// Calculate churn rate
export function calculateRetentionAnalyticsChurnRate(
  churnedCustomers: number,
  totalCustomers: number
): number {
  if (totalCustomers === 0) return 0;
  return (churnedCustomers / totalCustomers) * 100;
}

// Calculate reactivation rate
export function calculateRetentionAnalyticsReactivationRate(
  reactivatedCustomers: number,
  churnedCustomers: number
): number {
  if (churnedCustomers === 0) return 0;
  return (reactivatedCustomers / churnedCustomers) * 100;
}

// Calculate cohort retention rate
export function calculateRetentionAnalyticsCohortRetention(
  retainedInCohort: number,
  totalInCohort: number
): number {
  if (totalInCohort === 0) return 0;
  return (retainedInCohort / totalInCohort) * 100;
}

// Calculate customer lifetime
export function calculateRetentionAnalyticsCustomerLifetime(
  totalActiveDays: number,
  totalCustomers: number
): number {
  if (totalCustomers === 0) return 0;
  return totalActiveDays / totalCustomers;
}

// Calculate subscription renewal rate
export function calculateRetentionAnalyticsSubscriptionRenewalRate(
  renewedSubscriptions: number,
  totalSubscriptions: number
): number {
  if (totalSubscriptions === 0) return 0;
  return (renewedSubscriptions / totalSubscriptions) * 100;
}
