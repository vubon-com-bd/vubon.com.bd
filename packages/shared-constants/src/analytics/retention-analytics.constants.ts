/**
 * Retention Analytics Constants
 * Configuration for retention analytics, cohorts, and churn analysis
 */

export const RETENTION_ANALYTICS = {
  // Retention Types
  TYPES: {
    CUSTOMER_RETENTION: 'customer_retention',
    USER_RETENTION: 'user_retention',
    PRODUCT_RETENTION: 'product_retention',
    SUBSCRIPTION_RETENTION: 'subscription_retention',
    REVENUE_RETENTION: 'revenue_retention',
    ENGAGEMENT_RETENTION: 'engagement_retention',
  } as const,

  // Retention Status
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    CHURNED: 'churned',
    DORMANT: 'dormant',
    RESURRECTED: 'resurrected',
    AT_RISK: 'at_risk',
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

  // Retention Cohorts
  COHORTS: {
    MONTHLY: 'monthly',
    WEEKLY: 'weekly',
    DAILY: 'daily',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
    CUSTOM: 'custom',
  } as const,

  // Retention Metrics
  METRICS: {
    RETENTION_RATE: 'retention_rate',
    CHURN_RATE: 'churn_rate',
    REPEAT_PURCHASE_RATE: 'repeat_purchase_rate',
    NET_RETENTION_RATE: 'net_retention_rate',
    GROSS_RETENTION_RATE: 'gross_retention_rate',
    DOLAR_BASED_RETENTION: 'dolar_based_retention',
    CUSTOMER_LIFETIME: 'customer_lifetime',
    AVERAGE_REVENUE_PER_USER: 'average_revenue_per_user',
  } as const,

  // Retention Segments
  SEGMENTS: {
    HIGH_VALUE: 'high_value',
    MEDIUM_VALUE: 'medium_value',
    LOW_VALUE: 'low_value',
    HIGH_ENGAGEMENT: 'high_engagement',
    MEDIUM_ENGAGEMENT: 'medium_engagement',
    LOW_ENGAGEMENT: 'low_engagement',
    NEW_CUSTOMERS: 'new_customers',
    RETURNING_CUSTOMERS: 'returning_customers',
    LOYAL_CUSTOMERS: 'loyal_customers',
  } as const,

  // Retention Events
  EVENTS: {
    FIRST_PURCHASE: 'first_purchase',
    SECOND_PURCHASE: 'second_purchase',
    REPEAT_PURCHASE: 'repeat_purchase',
    SUBSCRIPTION_START: 'subscription_start',
    SUBSCRIPTION_RENEWAL: 'subscription_renewal',
    SUBSCRIPTION_CANCEL: 'subscription_cancel',
    ACCOUNT_CREATED: 'account_created',
    ACCOUNT_DEACTIVATED: 'account_deactivated',
    ENGAGEMENT_DAY_1: 'engagement_day_1',
    ENGAGEMENT_DAY_7: 'engagement_day_7',
    ENGAGEMENT_DAY_30: 'engagement_day_30',
  } as const,

  // Retention Analysis Types
  ANALYSIS_TYPES: {
    COHORT_ANALYSIS: 'cohort_analysis',
    SURVIVAL_ANALYSIS: 'survival_analysis',
    CHURN_ANALYSIS: 'churn_analysis',
    LTV_ANALYSIS: 'ltv_analysis',
    RFM_ANALYSIS: 'rfm_analysis',
  } as const,
} as const;

// Retention Analytics Types
export type RetentionAnalyticsType =
  (typeof RETENTION_ANALYTICS.TYPES)[keyof typeof RETENTION_ANALYTICS.TYPES];

// Retention Analytics Status
export type RetentionAnalyticsStatus =
  (typeof RETENTION_ANALYTICS.STATUS)[keyof typeof RETENTION_ANALYTICS.STATUS];

// Retention Analytics Periods
export type RetentionAnalyticsPeriod =
  (typeof RETENTION_ANALYTICS.PERIODS)[keyof typeof RETENTION_ANALYTICS.PERIODS];

// Retention Analytics Cohorts
export type RetentionAnalyticsCohort =
  (typeof RETENTION_ANALYTICS.COHORTS)[keyof typeof RETENTION_ANALYTICS.COHORTS];

// Retention Analytics Metrics
export type RetentionAnalyticsMetric =
  (typeof RETENTION_ANALYTICS.METRICS)[keyof typeof RETENTION_ANALYTICS.METRICS];

// Retention Analytics Segments
export type RetentionAnalyticsSegment =
  (typeof RETENTION_ANALYTICS.SEGMENTS)[keyof typeof RETENTION_ANALYTICS.SEGMENTS];

// Retention Analytics Events
export type RetentionAnalyticsEvent =
  (typeof RETENTION_ANALYTICS.EVENTS)[keyof typeof RETENTION_ANALYTICS.EVENTS];

// Retention Analytics Analysis Types
export type RetentionAnalyticsAnalysisType =
  (typeof RETENTION_ANALYTICS.ANALYSIS_TYPES)[keyof typeof RETENTION_ANALYTICS.ANALYSIS_TYPES];

// Retention Analytics Event Labels
export function getRetentionAnalyticsEventLabel(event: RetentionAnalyticsEvent): string {
  const labels: Record<RetentionAnalyticsEvent, string> = {
    [RETENTION_ANALYTICS.EVENTS.FIRST_PURCHASE]: 'First Purchase',
    [RETENTION_ANALYTICS.EVENTS.SECOND_PURCHASE]: 'Second Purchase',
    [RETENTION_ANALYTICS.EVENTS.REPEAT_PURCHASE]: 'Repeat Purchase',
    [RETENTION_ANALYTICS.EVENTS.SUBSCRIPTION_START]: 'Subscription Start',
    [RETENTION_ANALYTICS.EVENTS.SUBSCRIPTION_RENEWAL]: 'Subscription Renewal',
    [RETENTION_ANALYTICS.EVENTS.SUBSCRIPTION_CANCEL]: 'Subscription Cancel',
    [RETENTION_ANALYTICS.EVENTS.ACCOUNT_CREATED]: 'Account Created',
    [RETENTION_ANALYTICS.EVENTS.ACCOUNT_DEACTIVATED]: 'Account Deactivated',
    [RETENTION_ANALYTICS.EVENTS.ENGAGEMENT_DAY_1]: 'Day 1 Engagement',
    [RETENTION_ANALYTICS.EVENTS.ENGAGEMENT_DAY_7]: 'Day 7 Engagement',
    [RETENTION_ANALYTICS.EVENTS.ENGAGEMENT_DAY_30]: 'Day 30 Engagement',
  };
  return labels[event] || 'Unknown Event';
}

// Retention Analytics Status Labels
export function getRetentionAnalyticsStatusLabel(status: RetentionAnalyticsStatus): string {
  const labels: Record<RetentionAnalyticsStatus, string> = {
    [RETENTION_ANALYTICS.STATUS.ACTIVE]: 'Active',
    [RETENTION_ANALYTICS.STATUS.INACTIVE]: 'Inactive',
    [RETENTION_ANALYTICS.STATUS.CHURNED]: 'Churned',
    [RETENTION_ANALYTICS.STATUS.DORMANT]: 'Dormant',
    [RETENTION_ANALYTICS.STATUS.RESURRECTED]: 'Resurrected',
    [RETENTION_ANALYTICS.STATUS.AT_RISK]: 'At Risk',
  };
  return labels[status] || 'Unknown Status';
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
  return labels[period] || 'Unknown Period';
}

// Retention Analytics Cohort Labels
export function getRetentionAnalyticsCohortLabel(cohort: RetentionAnalyticsCohort): string {
  const labels: Record<RetentionAnalyticsCohort, string> = {
    [RETENTION_ANALYTICS.COHORTS.MONTHLY]: 'Monthly Cohort',
    [RETENTION_ANALYTICS.COHORTS.WEEKLY]: 'Weekly Cohort',
    [RETENTION_ANALYTICS.COHORTS.DAILY]: 'Daily Cohort',
    [RETENTION_ANALYTICS.COHORTS.QUARTERLY]: 'Quarterly Cohort',
    [RETENTION_ANALYTICS.COHORTS.YEARLY]: 'Yearly Cohort',
    [RETENTION_ANALYTICS.COHORTS.CUSTOM]: 'Custom Cohort',
  };
  return labels[cohort] || 'Unknown Cohort';
}

// Retention Analytics Segment Labels
export function getRetentionAnalyticsSegmentLabel(segment: RetentionAnalyticsSegment): string {
  const labels: Record<RetentionAnalyticsSegment, string> = {
    [RETENTION_ANALYTICS.SEGMENTS.HIGH_VALUE]: 'High Value Customers',
    [RETENTION_ANALYTICS.SEGMENTS.MEDIUM_VALUE]: 'Medium Value Customers',
    [RETENTION_ANALYTICS.SEGMENTS.LOW_VALUE]: 'Low Value Customers',
    [RETENTION_ANALYTICS.SEGMENTS.HIGH_ENGAGEMENT]: 'High Engagement Users',
    [RETENTION_ANALYTICS.SEGMENTS.MEDIUM_ENGAGEMENT]: 'Medium Engagement Users',
    [RETENTION_ANALYTICS.SEGMENTS.LOW_ENGAGEMENT]: 'Low Engagement Users',
    [RETENTION_ANALYTICS.SEGMENTS.NEW_CUSTOMERS]: 'New Customers',
    [RETENTION_ANALYTICS.SEGMENTS.RETURNING_CUSTOMERS]: 'Returning Customers',
    [RETENTION_ANALYTICS.SEGMENTS.LOYAL_CUSTOMERS]: 'Loyal Customers',
  };
  return labels[segment] || 'Unknown Segment';
}

// Retention Analytics Metric Labels
export function getRetentionAnalyticsMetricLabel(metric: RetentionAnalyticsMetric): string {
  const labels: Record<RetentionAnalyticsMetric, string> = {
    [RETENTION_ANALYTICS.METRICS.RETENTION_RATE]: 'Retention Rate',
    [RETENTION_ANALYTICS.METRICS.CHURN_RATE]: 'Churn Rate',
    [RETENTION_ANALYTICS.METRICS.REPEAT_PURCHASE_RATE]: 'Repeat Purchase Rate',
    [RETENTION_ANALYTICS.METRICS.NET_RETENTION_RATE]: 'Net Retention Rate',
    [RETENTION_ANALYTICS.METRICS.GROSS_RETENTION_RATE]: 'Gross Retention Rate',
    [RETENTION_ANALYTICS.METRICS.DOLAR_BASED_RETENTION]: 'Dollar-Based Retention',
    [RETENTION_ANALYTICS.METRICS.CUSTOMER_LIFETIME]: 'Customer Lifetime',
    [RETENTION_ANALYTICS.METRICS.AVERAGE_REVENUE_PER_USER]: 'Average Revenue Per User',
  };
  return labels[metric] || 'Unknown Metric';
}

// Check if retention is active
export function isRetentionAnalyticsActive(status: RetentionAnalyticsStatus): boolean {
  return status === RETENTION_ANALYTICS.STATUS.ACTIVE;
}

// Check if retention is completed
export function isRetentionAnalyticsCompleted(status: RetentionAnalyticsStatus): boolean {
  return status === RETENTION_ANALYTICS.STATUS.ACTIVE;
}

// Get retention rate based on period
export function getRetentionAnalyticsRate(
  period: RetentionAnalyticsPeriod,
  data: Record<string, number>
): number {
  return data[period] || 0;
}
