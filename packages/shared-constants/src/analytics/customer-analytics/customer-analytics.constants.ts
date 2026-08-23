/**
 * Customer Analytics Constants
 * Configuration for customer behavior and performance analytics
 */

export const CUSTOMER_ANALYTICS = {
  // Customer Analytics Types
  TYPES: {
    // Behavior Analytics
    BEHAVIOR: 'behavior',
    ENGAGEMENT: 'engagement',
    LOYALTY: 'loyalty',
    RETENTION: 'retention',
    CHURN: 'churn',

    // Demographic Analytics
    DEMOGRAPHIC: 'demographic',
    GEOGRAPHIC: 'geographic',
    PSYCHOGRAPHIC: 'psychographic',

    // Value Analytics
    VALUE: 'value',
    LIFETIME_VALUE: 'lifetime_value',
    ACQUISITION: 'acquisition',
    SATISFACTION: 'satisfaction',

    // Segment Analytics
    SEGMENT: 'segment',
    COHORT: 'cohort',
    PERSONA: 'persona',

    // Time Analytics
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,

  // Customer Analytics Status
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

  // Customer Analytics Scopes
  SCOPES: {
    INDIVIDUAL: 'individual',
    SEGMENT: 'segment',
    COHORT: 'cohort',
    REGION: 'region',
    ALL_CUSTOMERS: 'all_customers',
    ACTIVE_CUSTOMERS: 'active_customers',
    COMPARATIVE: 'comparative',
  } as const,

  // Customer Analytics Events
  EVENTS: {
    // Customer Lifecycle Events
    CUSTOMER_REGISTERED: 'customer_registered',
    CUSTOMER_VERIFIED: 'customer_verified',
    CUSTOMER_PROFILE_UPDATED: 'customer_profile_updated',
    CUSTOMER_ACTIVATED: 'customer_activated',
    CUSTOMER_DEACTIVATED: 'customer_deactivated',
    CUSTOMER_ARCHIVED: 'customer_archived',

    // Customer Behavior Events
    CUSTOMER_LOGIN: 'customer_login',
    CUSTOMER_LOGOUT: 'customer_logout',
    CUSTOMER_SEARCH: 'customer_search',
    CUSTOMER_VIEW: 'customer_view',
    CUSTOMER_CLICK: 'customer_click',

    // Customer Engagement Events
    CUSTOMER_ENGAGED: 'customer_engaged',
    CUSTOMER_DISENGAGED: 'customer_disengaged',
    CUSTOMER_RETURNED: 'customer_returned',
    CUSTOMER_CHURNED: 'customer_churned',
    CUSTOMER_REACTIVATED: 'customer_reactivated',

    // Customer Purchase Events
    CUSTOMER_PURCHASED: 'customer_purchased',
    CUSTOMER_REPEAT_PURCHASE: 'customer_repeat_purchase',
    CUSTOMER_FIRST_PURCHASE: 'customer_first_purchase',
    CUSTOMER_AVERAGE_ORDER: 'customer_average_order',

    // Customer Satisfaction Events
    CUSTOMER_SATISFIED: 'customer_satisfied',
    CUSTOMER_UNSATISFIED: 'customer_unsatisfied',
    CUSTOMER_REVIEWED: 'customer_reviewed',
    CUSTOMER_RATED: 'customer_rated',
    CUSTOMER_COMPLAINED: 'customer_complained',

    // Customer Loyalty Events
    CUSTOMER_LOYAL: 'customer_loyal',
    CUSTOMER_VIP: 'customer_vip',
    CUSTOMER_REFERRED: 'customer_referred',
    CUSTOMER_REFERRAL: 'customer_referral',

    // Customer Value Events
    CUSTOMER_VALUE_INCREASED: 'customer_value_increased',
    CUSTOMER_VALUE_DECREASED: 'customer_value_decreased',
    CUSTOMER_LTV_UPDATED: 'customer_ltv_updated',
  } as const,

  // Customer Analytics Dimensions
  DIMENSIONS: {
    // Customer Attributes
    CUSTOMER_ID: 'customer_id',
    CUSTOMER_NAME: 'customer_name',
    CUSTOMER_EMAIL: 'customer_email',
    CUSTOMER_TYPE: 'customer_type',
    CUSTOMER_STATUS: 'customer_status',
    CUSTOMER_SEGMENT: 'customer_segment',
    CUSTOMER_PERSONA: 'customer_persona',
    CUSTOMER_TIER: 'customer_tier',

    // Demographic Attributes
    AGE: 'age',
    AGE_GROUP: 'age_group',
    GENDER: 'gender',
    INCOME: 'income',
    INCOME_GROUP: 'income_group',
    EDUCATION: 'education',
    OCCUPATION: 'occupation',

    // Geographic Attributes
    COUNTRY: 'country',
    REGION: 'region',
    CITY: 'city',
    POSTAL_CODE: 'postal_code',
    TIMEZONE: 'timezone',
    LANGUAGE: 'language',

    // Behavioral Attributes
    DEVICE_TYPE: 'device_type',
    BROWSER: 'browser',
    OS: 'os',
    SOURCE: 'source',
    MEDIUM: 'medium',
    CHANNEL: 'channel',

    // Value Attributes
    LIFETIME_VALUE: 'lifetime_value',
    TOTAL_SPENT: 'total_spent',
    AVERAGE_ORDER_VALUE: 'average_order_value',
    PURCHASE_FREQUENCY: 'purchase_frequency',

    // Time Attributes
    REGISTRATION_DATE: 'registration_date',
    FIRST_PURCHASE_DATE: 'first_purchase_date',
    LAST_PURCHASE_DATE: 'last_purchase_date',
    LAST_ACTIVE_DATE: 'last_active_date',
    CHURN_DATE: 'churn_date',

    // Engagement Attributes
    ENGAGEMENT_SCORE: 'engagement_score',
    LOYALTY_SCORE: 'loyalty_score',
    SATISFACTION_SCORE: 'satisfaction_score',
    NPS_SCORE: 'nps_score',
  } as const,

  // Customer Analytics Metrics
  METRICS: {
    // Customer Count Metrics
    TOTAL_CUSTOMERS: 'total_customers',
    ACTIVE_CUSTOMERS: 'active_customers',
    INACTIVE_CUSTOMERS: 'inactive_customers',
    NEW_CUSTOMERS: 'new_customers',
    RETURNING_CUSTOMERS: 'returning_customers',
    LOYAL_CUSTOMERS: 'loyal_customers',
    VIP_CUSTOMERS: 'vip_customers',
    CHURNED_CUSTOMERS: 'churned_customers',

    // Customer Acquisition Metrics
    ACQUISITION_RATE: 'acquisition_rate',
    ACQUISITION_COST: 'acquisition_cost',
    CUSTOMER_ACQUISITION_COST: 'customer_acquisition_cost',
    COST_PER_ACQUISITION: 'cost_per_acquisition',

    // Customer Retention Metrics
    RETENTION_RATE: 'retention_rate',
    CHURN_RATE: 'churn_rate',
    REACTIVATION_RATE: 'reactivation_rate',
    CUSTOMER_LIFETIME: 'customer_lifetime',

    // Customer Value Metrics
    LIFETIME_VALUE: 'lifetime_value',
    AVERAGE_LIFETIME_VALUE: 'average_lifetime_value',
    TOTAL_SPENT: 'total_spent',
    AVERAGE_ORDER_VALUE: 'average_order_value',
    PURCHASE_FREQUENCY: 'purchase_frequency',
    REPEAT_PURCHASE_RATE: 'repeat_purchase_rate',

    // Customer Engagement Metrics
    ENGAGEMENT_SCORE: 'engagement_score',
    LOYALTY_SCORE: 'loyalty_score',
    SATISFACTION_SCORE: 'satisfaction_score',
    NPS: 'nps',
    CSAT: 'csat',
    CES: 'ces',

    // Customer Growth Metrics
    CUSTOMER_GROWTH: 'customer_growth',
    CUSTOMER_GROWTH_RATE: 'customer_growth_rate',
    REVENUE_GROWTH: 'revenue_growth',
    PROFIT_GROWTH: 'profit_growth',

    // Comparison Metrics
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    PERIOD_COMPARISON: 'period_comparison',
  } as const,

  // Customer Analytics Segments
  SEGMENTS: {
    // Value Segments
    HIGH_VALUE: 'high_value',
    MEDIUM_VALUE: 'medium_value',
    LOW_VALUE: 'low_value',

    // Loyalty Segments
    LOYAL: 'loyal',
    REGULAR: 'regular',
    AT_RISK: 'at_risk',
    CHURNED: 'churned',

    // Engagement Segments
    HIGHLY_ENGAGED: 'highly_engaged',
    ENGAGED: 'engaged',
    DISENGAGED: 'disengaged',
    INACTIVE: 'inactive',

    // Demographic Segments
    BY_AGE: 'by_age',
    BY_GENDER: 'by_gender',
    BY_INCOME: 'by_income',
    BY_LOCATION: 'by_location',

    // Behavioral Segments
    FREQUENT_BUYERS: 'frequent_buyers',
    OCCASIONAL_BUYERS: 'occasional_buyers',
    FIRST_TIME_BUYERS: 'first_time_buyers',
    REPEAT_BUYERS: 'repeat_buyers',

    // Satisfaction Segments
    SATISFIED: 'satisfied',
    NEUTRAL: 'neutral',
    UNSATISFIED: 'unsatisfied',
    PROMOTERS: 'promoters',
    PASSIVES: 'passives',
    DETRACTORS: 'detractors',
  } as const,

  // Customer Analytics Cohorts
  COHORTS: {
    REGISTRATION_DATE: 'registration_date',
    FIRST_PURCHASE_DATE: 'first_purchase_date',
    ACQUISITION_CHANNEL: 'acquisition_channel',
    CUSTOMER_TYPE: 'customer_type',
    LOCATION: 'location',
    AGE_GROUP: 'age_group',
  } as const,

  // Customer Analytics Granularity
  GRANULARITY: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,
} as const;

// Customer Analytics Types
export type CustomerAnalyticsType =
  (typeof CUSTOMER_ANALYTICS.TYPES)[keyof typeof CUSTOMER_ANALYTICS.TYPES];

// Customer Analytics Status
export type CustomerAnalyticsStatus =
  (typeof CUSTOMER_ANALYTICS.STATUS)[keyof typeof CUSTOMER_ANALYTICS.STATUS];

// Customer Analytics Scopes
export type CustomerAnalyticsScope =
  (typeof CUSTOMER_ANALYTICS.SCOPES)[keyof typeof CUSTOMER_ANALYTICS.SCOPES];

// Customer Analytics Events
export type CustomerAnalyticsEvent =
  (typeof CUSTOMER_ANALYTICS.EVENTS)[keyof typeof CUSTOMER_ANALYTICS.EVENTS];

// Customer Analytics Dimensions
export type CustomerAnalyticsDimension =
  (typeof CUSTOMER_ANALYTICS.DIMENSIONS)[keyof typeof CUSTOMER_ANALYTICS.DIMENSIONS];

// Customer Analytics Metrics
export type CustomerAnalyticsMetric =
  (typeof CUSTOMER_ANALYTICS.METRICS)[keyof typeof CUSTOMER_ANALYTICS.METRICS];

// Customer Analytics Segments
export type CustomerAnalyticsSegment =
  (typeof CUSTOMER_ANALYTICS.SEGMENTS)[keyof typeof CUSTOMER_ANALYTICS.SEGMENTS];

// Customer Analytics Cohorts
export type CustomerAnalyticsCohort =
  (typeof CUSTOMER_ANALYTICS.COHORTS)[keyof typeof CUSTOMER_ANALYTICS.COHORTS];

// Customer Analytics Granularity
export type CustomerAnalyticsGranularity =
  (typeof CUSTOMER_ANALYTICS.GRANULARITY)[keyof typeof CUSTOMER_ANALYTICS.GRANULARITY];

// Customer Analytics Status Labels
export function getCustomerAnalyticsStatusLabel(status: CustomerAnalyticsStatus): string {
  const labels: Record<CustomerAnalyticsStatus, string> = {
    [CUSTOMER_ANALYTICS.STATUS.TRACKING]: 'Tracking',
    [CUSTOMER_ANALYTICS.STATUS.PROCESSING]: 'Processing',
    [CUSTOMER_ANALYTICS.STATUS.ANALYZING]: 'Analyzing',
    [CUSTOMER_ANALYTICS.STATUS.COMPLETED]: 'Completed',
    [CUSTOMER_ANALYTICS.STATUS.FAILED]: 'Failed',
    [CUSTOMER_ANALYTICS.STATUS.PAUSED]: 'Paused',
    [CUSTOMER_ANALYTICS.STATUS.STOPPED]: 'Stopped',
    [CUSTOMER_ANALYTICS.STATUS.UPDATING]: 'Updating',
    [CUSTOMER_ANALYTICS.STATUS.REFRESHING]: 'Refreshing',
  };
  return labels[status] || 'Unknown';
}

// Customer Analytics Event Labels
export function getCustomerAnalyticsEventLabel(event: CustomerAnalyticsEvent): string {
  const labels: Record<CustomerAnalyticsEvent, string> = {
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_REGISTERED]: 'Customer Registered',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_VERIFIED]: 'Customer Verified',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_PROFILE_UPDATED]: 'Customer Profile Updated',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_ACTIVATED]: 'Customer Activated',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_DEACTIVATED]: 'Customer Deactivated',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_ARCHIVED]: 'Customer Archived',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_LOGIN]: 'Customer Login',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_LOGOUT]: 'Customer Logout',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_SEARCH]: 'Customer Search',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_VIEW]: 'Customer View',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_CLICK]: 'Customer Click',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_ENGAGED]: 'Customer Engaged',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_DISENGAGED]: 'Customer Disengaged',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_RETURNED]: 'Customer Returned',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_CHURNED]: 'Customer Churned',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_REACTIVATED]: 'Customer Reactivated',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_PURCHASED]: 'Customer Purchased',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_REPEAT_PURCHASE]: 'Customer Repeat Purchase',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_FIRST_PURCHASE]: 'Customer First Purchase',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_AVERAGE_ORDER]: 'Customer Average Order',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_SATISFIED]: 'Customer Satisfied',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_UNSATISFIED]: 'Customer Unsatisfied',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_REVIEWED]: 'Customer Reviewed',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_RATED]: 'Customer Rated',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_COMPLAINED]: 'Customer Complained',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_LOYAL]: 'Customer Loyal',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_VIP]: 'Customer VIP',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_REFERRED]: 'Customer Referred',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_REFERRAL]: 'Customer Referral',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_VALUE_INCREASED]: 'Customer Value Increased',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_VALUE_DECREASED]: 'Customer Value Decreased',
    [CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_LTV_UPDATED]: 'Customer LTV Updated',
  };
  return labels[event] || 'Unknown';
}

// Customer Analytics Dimension Labels
export function getCustomerAnalyticsDimensionLabel(dimension: CustomerAnalyticsDimension): string {
  const labels: Record<CustomerAnalyticsDimension, string> = {
    [CUSTOMER_ANALYTICS.DIMENSIONS.CUSTOMER_ID]: 'Customer ID',
    [CUSTOMER_ANALYTICS.DIMENSIONS.CUSTOMER_NAME]: 'Customer Name',
    [CUSTOMER_ANALYTICS.DIMENSIONS.CUSTOMER_EMAIL]: 'Customer Email',
    [CUSTOMER_ANALYTICS.DIMENSIONS.CUSTOMER_TYPE]: 'Customer Type',
    [CUSTOMER_ANALYTICS.DIMENSIONS.CUSTOMER_STATUS]: 'Customer Status',
    [CUSTOMER_ANALYTICS.DIMENSIONS.CUSTOMER_SEGMENT]: 'Customer Segment',
    [CUSTOMER_ANALYTICS.DIMENSIONS.CUSTOMER_PERSONA]: 'Customer Persona',
    [CUSTOMER_ANALYTICS.DIMENSIONS.CUSTOMER_TIER]: 'Customer Tier',
    [CUSTOMER_ANALYTICS.DIMENSIONS.AGE]: 'Age',
    [CUSTOMER_ANALYTICS.DIMENSIONS.AGE_GROUP]: 'Age Group',
    [CUSTOMER_ANALYTICS.DIMENSIONS.GENDER]: 'Gender',
    [CUSTOMER_ANALYTICS.DIMENSIONS.INCOME]: 'Income',
    [CUSTOMER_ANALYTICS.DIMENSIONS.INCOME_GROUP]: 'Income Group',
    [CUSTOMER_ANALYTICS.DIMENSIONS.EDUCATION]: 'Education',
    [CUSTOMER_ANALYTICS.DIMENSIONS.OCCUPATION]: 'Occupation',
    [CUSTOMER_ANALYTICS.DIMENSIONS.COUNTRY]: 'Country',
    [CUSTOMER_ANALYTICS.DIMENSIONS.REGION]: 'Region',
    [CUSTOMER_ANALYTICS.DIMENSIONS.CITY]: 'City',
    [CUSTOMER_ANALYTICS.DIMENSIONS.POSTAL_CODE]: 'Postal Code',
    [CUSTOMER_ANALYTICS.DIMENSIONS.TIMEZONE]: 'Timezone',
    [CUSTOMER_ANALYTICS.DIMENSIONS.LANGUAGE]: 'Language',
    [CUSTOMER_ANALYTICS.DIMENSIONS.DEVICE_TYPE]: 'Device Type',
    [CUSTOMER_ANALYTICS.DIMENSIONS.BROWSER]: 'Browser',
    [CUSTOMER_ANALYTICS.DIMENSIONS.OS]: 'OS',
    [CUSTOMER_ANALYTICS.DIMENSIONS.SOURCE]: 'Source',
    [CUSTOMER_ANALYTICS.DIMENSIONS.MEDIUM]: 'Medium',
    [CUSTOMER_ANALYTICS.DIMENSIONS.CHANNEL]: 'Channel',
    [CUSTOMER_ANALYTICS.DIMENSIONS.LIFETIME_VALUE]: 'Lifetime Value',
    [CUSTOMER_ANALYTICS.DIMENSIONS.TOTAL_SPENT]: 'Total Spent',
    [CUSTOMER_ANALYTICS.DIMENSIONS.AVERAGE_ORDER_VALUE]: 'Average Order Value',
    [CUSTOMER_ANALYTICS.DIMENSIONS.PURCHASE_FREQUENCY]: 'Purchase Frequency',
    [CUSTOMER_ANALYTICS.DIMENSIONS.REGISTRATION_DATE]: 'Registration Date',
    [CUSTOMER_ANALYTICS.DIMENSIONS.FIRST_PURCHASE_DATE]: 'First Purchase Date',
    [CUSTOMER_ANALYTICS.DIMENSIONS.LAST_PURCHASE_DATE]: 'Last Purchase Date',
    [CUSTOMER_ANALYTICS.DIMENSIONS.LAST_ACTIVE_DATE]: 'Last Active Date',
    [CUSTOMER_ANALYTICS.DIMENSIONS.CHURN_DATE]: 'Churn Date',
    [CUSTOMER_ANALYTICS.DIMENSIONS.ENGAGEMENT_SCORE]: 'Engagement Score',
    [CUSTOMER_ANALYTICS.DIMENSIONS.LOYALTY_SCORE]: 'Loyalty Score',
    [CUSTOMER_ANALYTICS.DIMENSIONS.SATISFACTION_SCORE]: 'Satisfaction Score',
    [CUSTOMER_ANALYTICS.DIMENSIONS.NPS_SCORE]: 'NPS Score',
  };
  return labels[dimension] || 'Unknown';
}

// Customer Analytics Segment Labels
export function getCustomerAnalyticsSegmentLabel(segment: CustomerAnalyticsSegment): string {
  const labels: Record<CustomerAnalyticsSegment, string> = {
    [CUSTOMER_ANALYTICS.SEGMENTS.HIGH_VALUE]: 'High Value',
    [CUSTOMER_ANALYTICS.SEGMENTS.MEDIUM_VALUE]: 'Medium Value',
    [CUSTOMER_ANALYTICS.SEGMENTS.LOW_VALUE]: 'Low Value',
    [CUSTOMER_ANALYTICS.SEGMENTS.LOYAL]: 'Loyal',
    [CUSTOMER_ANALYTICS.SEGMENTS.REGULAR]: 'Regular',
    [CUSTOMER_ANALYTICS.SEGMENTS.AT_RISK]: 'At Risk',
    [CUSTOMER_ANALYTICS.SEGMENTS.CHURNED]: 'Churned',
    [CUSTOMER_ANALYTICS.SEGMENTS.HIGHLY_ENGAGED]: 'Highly Engaged',
    [CUSTOMER_ANALYTICS.SEGMENTS.ENGAGED]: 'Engaged',
    [CUSTOMER_ANALYTICS.SEGMENTS.DISENGAGED]: 'Disengaged',
    [CUSTOMER_ANALYTICS.SEGMENTS.INACTIVE]: 'Inactive',
    [CUSTOMER_ANALYTICS.SEGMENTS.BY_AGE]: 'By Age',
    [CUSTOMER_ANALYTICS.SEGMENTS.BY_GENDER]: 'By Gender',
    [CUSTOMER_ANALYTICS.SEGMENTS.BY_INCOME]: 'By Income',
    [CUSTOMER_ANALYTICS.SEGMENTS.BY_LOCATION]: 'By Location',
    [CUSTOMER_ANALYTICS.SEGMENTS.FREQUENT_BUYERS]: 'Frequent Buyers',
    [CUSTOMER_ANALYTICS.SEGMENTS.OCCASIONAL_BUYERS]: 'Occasional Buyers',
    [CUSTOMER_ANALYTICS.SEGMENTS.FIRST_TIME_BUYERS]: 'First-time Buyers',
    [CUSTOMER_ANALYTICS.SEGMENTS.REPEAT_BUYERS]: 'Repeat Buyers',
    [CUSTOMER_ANALYTICS.SEGMENTS.SATISFIED]: 'Satisfied',
    [CUSTOMER_ANALYTICS.SEGMENTS.NEUTRAL]: 'Neutral',
    [CUSTOMER_ANALYTICS.SEGMENTS.UNSATISFIED]: 'Unsatisfied',
    [CUSTOMER_ANALYTICS.SEGMENTS.PROMOTERS]: 'Promoters',
    [CUSTOMER_ANALYTICS.SEGMENTS.PASSIVES]: 'Passives',
    [CUSTOMER_ANALYTICS.SEGMENTS.DETRACTORS]: 'Detractors',
  };
  return labels[segment] || 'Unknown';
}

// Customer Analytics Cohort Labels
export function getCustomerAnalyticsCohortLabel(cohort: CustomerAnalyticsCohort): string {
  const labels: Record<CustomerAnalyticsCohort, string> = {
    [CUSTOMER_ANALYTICS.COHORTS.REGISTRATION_DATE]: 'Registration Date',
    [CUSTOMER_ANALYTICS.COHORTS.FIRST_PURCHASE_DATE]: 'First Purchase Date',
    [CUSTOMER_ANALYTICS.COHORTS.ACQUISITION_CHANNEL]: 'Acquisition Channel',
    [CUSTOMER_ANALYTICS.COHORTS.CUSTOMER_TYPE]: 'Customer Type',
    [CUSTOMER_ANALYTICS.COHORTS.LOCATION]: 'Location',
    [CUSTOMER_ANALYTICS.COHORTS.AGE_GROUP]: 'Age Group',
  };
  return labels[cohort] || 'Unknown';
}

// Customer Analytics Granularity Labels
export function getCustomerAnalyticsGranularityLabel(
  granularity: CustomerAnalyticsGranularity
): string {
  const labels: Record<CustomerAnalyticsGranularity, string> = {
    [CUSTOMER_ANALYTICS.GRANULARITY.DAILY]: 'Daily',
    [CUSTOMER_ANALYTICS.GRANULARITY.WEEKLY]: 'Weekly',
    [CUSTOMER_ANALYTICS.GRANULARITY.MONTHLY]: 'Monthly',
    [CUSTOMER_ANALYTICS.GRANULARITY.QUARTERLY]: 'Quarterly',
    [CUSTOMER_ANALYTICS.GRANULARITY.YEARLY]: 'Yearly',
  };
  return labels[granularity] || 'Unknown';
}

// Check if customer analytics is active
export function isCustomerAnalyticsActive(status: CustomerAnalyticsStatus): boolean {
  const activeStatuses: CustomerAnalyticsStatus[] = [
    CUSTOMER_ANALYTICS.STATUS.TRACKING,
    CUSTOMER_ANALYTICS.STATUS.PROCESSING,
    CUSTOMER_ANALYTICS.STATUS.ANALYZING,
    CUSTOMER_ANALYTICS.STATUS.UPDATING,
    CUSTOMER_ANALYTICS.STATUS.REFRESHING,
  ];
  return activeStatuses.includes(status);
}

// Check if customer analytics is completed
export function isCustomerAnalyticsCompleted(status: CustomerAnalyticsStatus): boolean {
  return status === CUSTOMER_ANALYTICS.STATUS.COMPLETED;
}

// Check if customer analytics has failed
export function isCustomerAnalyticsFailed(status: CustomerAnalyticsStatus): boolean {
  return status === CUSTOMER_ANALYTICS.STATUS.FAILED;
}

// Check if event is lifecycle event
export function isCustomerAnalyticsLifecycleEvent(event: CustomerAnalyticsEvent): boolean {
  const lifecycleEvents: CustomerAnalyticsEvent[] = [
    CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_REGISTERED,
    CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_VERIFIED,
    CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_PROFILE_UPDATED,
    CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_ACTIVATED,
    CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_DEACTIVATED,
    CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_ARCHIVED,
  ];
  return lifecycleEvents.includes(event);
}

// Check if event is behavior event
export function isCustomerAnalyticsBehaviorEvent(event: CustomerAnalyticsEvent): boolean {
  const behaviorEvents: CustomerAnalyticsEvent[] = [
    CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_LOGIN,
    CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_LOGOUT,
    CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_SEARCH,
    CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_VIEW,
    CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_CLICK,
  ];
  return behaviorEvents.includes(event);
}

// Check if event is purchase event
export function isCustomerAnalyticsPurchaseEvent(event: CustomerAnalyticsEvent): boolean {
  const purchaseEvents: CustomerAnalyticsEvent[] = [
    CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_PURCHASED,
    CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_REPEAT_PURCHASE,
    CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_FIRST_PURCHASE,
    CUSTOMER_ANALYTICS.EVENTS.CUSTOMER_AVERAGE_ORDER,
  ];
  return purchaseEvents.includes(event);
}
