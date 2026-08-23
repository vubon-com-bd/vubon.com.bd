/**
 * Channel Analytics Constants
 * Configuration for channel performance analytics and tracking
 */

export const CHANNEL_ANALYTICS = {
  // Channel Analytics Types
  TYPES: {
    // Channel Performance
    PERFORMANCE: 'performance',
    EFFECTIVENESS: 'effectiveness',
    EFFICIENCY: 'efficiency',
    ENGAGEMENT: 'engagement',

    // Channel Metrics
    REACH: 'reach',
    CONVERSION: 'conversion',
    RETENTION: 'retention',
    SATISFACTION: 'satisfaction',

    // Digital Channels
    WEBSITE: 'website',
    MOBILE_APP: 'mobile_app',
    SOCIAL_MEDIA: 'social_media',
    EMAIL: 'email',
    SEARCH: 'search',
    DISPLAY: 'display',

    // Traditional Channels
    TV: 'tv',
    RADIO: 'radio',
    PRINT: 'print',
    OUTDOOR: 'outdoor',
    DIRECT_MAIL: 'direct_mail',

    // Time Analytics
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,

  // Channel Analytics Status
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

  // Channel Analytics Scopes
  SCOPES: {
    INDIVIDUAL: 'individual',
    CATEGORY: 'category',
    TYPE: 'type',
    REGION: 'region',
    ALL_CHANNELS: 'all_channels',
    COMPARATIVE: 'comparative',
  } as const,

  // Channel Analytics Events
  EVENTS: {
    // Channel Lifecycle Events
    CHANNEL_CREATED: 'channel_created',
    CHANNEL_UPDATED: 'channel_updated',
    CHANNEL_ACTIVATED: 'channel_activated',
    CHANNEL_DEACTIVATED: 'channel_deactivated',
    CHANNEL_ARCHIVED: 'channel_archived',

    // Channel Performance Events
    CHANNEL_IMPRESSION: 'channel_impression',
    CHANNEL_CLICK: 'channel_click',
    CHANNEL_CONVERSION: 'channel_conversion',
    CHANNEL_ENGAGEMENT: 'channel_engagement',
    CHANNEL_REACH: 'channel_reach',

    // Channel Health Events
    CHANNEL_HEALTHY: 'channel_healthy',
    CHANNEL_DEGRADED: 'channel_degraded',
    CHANNEL_UNHEALTHY: 'channel_unhealthy',
    CHANNEL_ERROR: 'channel_error',

    // Channel Revenue Events
    CHANNEL_REVENUE: 'channel_revenue',
    CHANNEL_PROFIT: 'channel_profit',
    CHANNEL_COST: 'channel_cost',

    // Channel Customer Events
    CHANNEL_CUSTOMER_ACQUIRED: 'channel_customer_acquired',
    CHANNEL_CUSTOMER_RETAINED: 'channel_customer_retained',
    CHANNEL_CUSTOMER_CHURNED: 'channel_customer_churned',

    // Channel Satisfaction Events
    CHANNEL_SATISFIED: 'channel_satisfied',
    CHANNEL_UNSATISFIED: 'channel_unsatisfied',
    CHANNEL_CSAT_UPDATED: 'channel_csat_updated',
    CHANNEL_NPS_UPDATED: 'channel_nps_updated',
  } as const,

  // Channel Analytics Dimensions
  DIMENSIONS: {
    // Channel Attributes
    CHANNEL_ID: 'channel_id',
    CHANNEL_NAME: 'channel_name',
    CHANNEL_TYPE: 'channel_type',
    CHANNEL_CATEGORY: 'channel_category',
    CHANNEL_STATUS: 'channel_status',

    // Channel Performance Attributes
    REACH: 'reach',
    ENGAGEMENT: 'engagement',
    CONVERSION_RATE: 'conversion_rate',
    BOUNCE_RATE: 'bounce_rate',
    CLICK_THROUGH_RATE: 'click_through_rate',

    // Channel Cost Attributes
    COST: 'cost',
    REVENUE: 'revenue',
    PROFIT: 'profit',
    ROI: 'roi',

    // Customer Attributes
    CUSTOMER_ID: 'customer_id',
    CUSTOMER_TYPE: 'customer_type',
    CUSTOMER_SEGMENT: 'customer_segment',

    // Time Attributes
    DATE: 'date',
    WEEK: 'week',
    MONTH: 'month',
    QUARTER: 'quarter',
    YEAR: 'year',
    HOUR: 'hour',

    // Location Attributes
    COUNTRY: 'country',
    REGION: 'region',
    CITY: 'city',

    // Device Attributes
    DEVICE_TYPE: 'device_type',
    BROWSER: 'browser',
    OS: 'os',
  } as const,

  // Channel Analytics Metrics
  METRICS: {
    // Channel Count Metrics
    TOTAL_CHANNELS: 'total_channels',
    ACTIVE_CHANNELS: 'active_channels',
    INACTIVE_CHANNELS: 'inactive_channels',
    NEW_CHANNELS: 'new_channels',

    // Channel Reach Metrics
    TOTAL_REACH: 'total_reach',
    UNIQUE_REACH: 'unique_reach',
    IMPRESSIONS: 'impressions',
    UNIQUE_IMPRESSIONS: 'unique_impressions',
    FREQUENCY: 'frequency',

    // Channel Engagement Metrics
    ENGAGEMENT_RATE: 'engagement_rate',
    TOTAL_ENGAGEMENTS: 'total_engagements',
    CLICKS: 'clicks',
    CLICK_THROUGH_RATE: 'click_through_rate',
    BOUNCE_RATE: 'bounce_rate',
    EXIT_RATE: 'exit_rate',

    // Channel Conversion Metrics
    CONVERSION_RATE: 'conversion_rate',
    TOTAL_CONVERSIONS: 'total_conversions',
    CONVERSION_VALUE: 'conversion_value',
    COST_PER_CONVERSION: 'cost_per_conversion',

    // Channel Revenue Metrics
    TOTAL_REVENUE: 'total_revenue',
    REVENUE_PER_CHANNEL: 'revenue_per_channel',
    REVENUE_GROWTH: 'revenue_growth',

    // Channel Cost Metrics
    TOTAL_COST: 'total_cost',
    COST_PER_CHANNEL: 'cost_per_channel',
    COST_PER_ENGAGEMENT: 'cost_per_engagement',

    // Channel Profit Metrics
    TOTAL_PROFIT: 'total_profit',
    PROFIT_PER_CHANNEL: 'profit_per_channel',
    PROFIT_MARGIN: 'profit_margin',

    // Channel ROI Metrics
    ROI: 'roi',
    ROAS: 'roas',
    ROMI: 'romi',

    // Channel Customer Metrics
    CUSTOMERS_ACQUIRED: 'customers_acquired',
    CUSTOMERS_RETAINED: 'customers_retained',
    CUSTOMERS_CHURNED: 'customers_churned',
    CUSTOMER_ACQUISITION_COST: 'customer_acquisition_cost',

    // Channel Satisfaction Metrics
    CSAT: 'csat',
    NPS: 'nps',
    CES: 'ces',
    SATISFACTION_RATE: 'satisfaction_rate',

    // Comparison Metrics
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    PERIOD_COMPARISON: 'period_comparison',
  } as const,

  // Channel Analytics Segments
  SEGMENTS: {
    // Channel Type Segments
    DIGITAL: 'digital',
    TRADITIONAL: 'traditional',
    SOCIAL: 'social',
    SEARCH: 'search',
    DISPLAY: 'display',
    EMAIL: 'email',

    // Performance Segments
    HIGH_PERFORMING: 'high_performing',
    MEDIUM_PERFORMING: 'medium_performing',
    LOW_PERFORMING: 'low_performing',

    // Cost Segments
    HIGH_COST: 'high_cost',
    MEDIUM_COST: 'medium_cost',
    LOW_COST: 'low_cost',

    // ROI Segments
    HIGH_ROI: 'high_roi',
    MEDIUM_ROI: 'medium_roi',
    LOW_ROI: 'low_roi',
    NEGATIVE_ROI: 'negative_roi',

    // Satisfaction Segments
    SATISFIED: 'satisfied',
    NEUTRAL: 'neutral',
    UNSATISFIED: 'unsatisfied',

    // Health Segments
    HEALTHY: 'healthy',
    DEGRADED: 'degraded',
    UNHEALTHY: 'unhealthy',
  } as const,

  // Channel Analytics Cohorts
  COHORTS: {
    CHANNEL_TYPE: 'channel_type',
    CHANNEL_CATEGORY: 'channel_category',
    ACQUISITION_DATE: 'acquisition_date',
    CUSTOMER_SEGMENT: 'customer_segment',
    REGION: 'region',
  } as const,

  // Channel Analytics Granularity
  GRANULARITY: {
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,
} as const;

// Channel Analytics Types
export type ChannelAnalyticsType =
  (typeof CHANNEL_ANALYTICS.TYPES)[keyof typeof CHANNEL_ANALYTICS.TYPES];

// Channel Analytics Status
export type ChannelAnalyticsStatus =
  (typeof CHANNEL_ANALYTICS.STATUS)[keyof typeof CHANNEL_ANALYTICS.STATUS];

// Channel Analytics Scopes
export type ChannelAnalyticsScope =
  (typeof CHANNEL_ANALYTICS.SCOPES)[keyof typeof CHANNEL_ANALYTICS.SCOPES];

// Channel Analytics Events
export type ChannelAnalyticsEvent =
  (typeof CHANNEL_ANALYTICS.EVENTS)[keyof typeof CHANNEL_ANALYTICS.EVENTS];

// Channel Analytics Dimensions
export type ChannelAnalyticsDimension =
  (typeof CHANNEL_ANALYTICS.DIMENSIONS)[keyof typeof CHANNEL_ANALYTICS.DIMENSIONS];

// Channel Analytics Metrics
export type ChannelAnalyticsMetric =
  (typeof CHANNEL_ANALYTICS.METRICS)[keyof typeof CHANNEL_ANALYTICS.METRICS];

// Channel Analytics Segments
export type ChannelAnalyticsSegment =
  (typeof CHANNEL_ANALYTICS.SEGMENTS)[keyof typeof CHANNEL_ANALYTICS.SEGMENTS];

// Channel Analytics Cohorts
export type ChannelAnalyticsCohort =
  (typeof CHANNEL_ANALYTICS.COHORTS)[keyof typeof CHANNEL_ANALYTICS.COHORTS];

// Channel Analytics Granularity
export type ChannelAnalyticsGranularity =
  (typeof CHANNEL_ANALYTICS.GRANULARITY)[keyof typeof CHANNEL_ANALYTICS.GRANULARITY];

// Channel Analytics Status Labels
export function getChannelAnalyticsStatusLabel(status: ChannelAnalyticsStatus): string {
  const labels: Record<ChannelAnalyticsStatus, string> = {
    [CHANNEL_ANALYTICS.STATUS.TRACKING]: 'Tracking',
    [CHANNEL_ANALYTICS.STATUS.PROCESSING]: 'Processing',
    [CHANNEL_ANALYTICS.STATUS.ANALYZING]: 'Analyzing',
    [CHANNEL_ANALYTICS.STATUS.COMPLETED]: 'Completed',
    [CHANNEL_ANALYTICS.STATUS.FAILED]: 'Failed',
    [CHANNEL_ANALYTICS.STATUS.PAUSED]: 'Paused',
    [CHANNEL_ANALYTICS.STATUS.STOPPED]: 'Stopped',
    [CHANNEL_ANALYTICS.STATUS.UPDATING]: 'Updating',
    [CHANNEL_ANALYTICS.STATUS.REFRESHING]: 'Refreshing',
  };
  return labels[status] || 'Unknown';
}

// Channel Analytics Event Labels
export function getChannelAnalyticsEventLabel(event: ChannelAnalyticsEvent): string {
  const labels: Record<ChannelAnalyticsEvent, string> = {
    [CHANNEL_ANALYTICS.EVENTS.CHANNEL_CREATED]: 'Channel Created',
    [CHANNEL_ANALYTICS.EVENTS.CHANNEL_UPDATED]: 'Channel Updated',
    [CHANNEL_ANALYTICS.EVENTS.CHANNEL_ACTIVATED]: 'Channel Activated',
    [CHANNEL_ANALYTICS.EVENTS.CHANNEL_DEACTIVATED]: 'Channel Deactivated',
    [CHANNEL_ANALYTICS.EVENTS.CHANNEL_ARCHIVED]: 'Channel Archived',
    [CHANNEL_ANALYTICS.EVENTS.CHANNEL_IMPRESSION]: 'Channel Impression',
    [CHANNEL_ANALYTICS.EVENTS.CHANNEL_CLICK]: 'Channel Click',
    [CHANNEL_ANALYTICS.EVENTS.CHANNEL_CONVERSION]: 'Channel Conversion',
    [CHANNEL_ANALYTICS.EVENTS.CHANNEL_ENGAGEMENT]: 'Channel Engagement',
    [CHANNEL_ANALYTICS.EVENTS.CHANNEL_REACH]: 'Channel Reach',
    [CHANNEL_ANALYTICS.EVENTS.CHANNEL_HEALTHY]: 'Channel Healthy',
    [CHANNEL_ANALYTICS.EVENTS.CHANNEL_DEGRADED]: 'Channel Degraded',
    [CHANNEL_ANALYTICS.EVENTS.CHANNEL_UNHEALTHY]: 'Channel Unhealthy',
    [CHANNEL_ANALYTICS.EVENTS.CHANNEL_ERROR]: 'Channel Error',
    [CHANNEL_ANALYTICS.EVENTS.CHANNEL_REVENUE]: 'Channel Revenue',
    [CHANNEL_ANALYTICS.EVENTS.CHANNEL_PROFIT]: 'Channel Profit',
    [CHANNEL_ANALYTICS.EVENTS.CHANNEL_COST]: 'Channel Cost',
    [CHANNEL_ANALYTICS.EVENTS.CHANNEL_CUSTOMER_ACQUIRED]: 'Channel Customer Acquired',
    [CHANNEL_ANALYTICS.EVENTS.CHANNEL_CUSTOMER_RETAINED]: 'Channel Customer Retained',
    [CHANNEL_ANALYTICS.EVENTS.CHANNEL_CUSTOMER_CHURNED]: 'Channel Customer Churned',
    [CHANNEL_ANALYTICS.EVENTS.CHANNEL_SATISFIED]: 'Channel Satisfied',
    [CHANNEL_ANALYTICS.EVENTS.CHANNEL_UNSATISFIED]: 'Channel Unsatisfied',
    [CHANNEL_ANALYTICS.EVENTS.CHANNEL_CSAT_UPDATED]: 'Channel CSAT Updated',
    [CHANNEL_ANALYTICS.EVENTS.CHANNEL_NPS_UPDATED]: 'Channel NPS Updated',
  };
  return labels[event] || 'Unknown';
}

// Channel Analytics Dimension Labels
export function getChannelAnalyticsDimensionLabel(dimension: ChannelAnalyticsDimension): string {
  const labels: Record<ChannelAnalyticsDimension, string> = {
    [CHANNEL_ANALYTICS.DIMENSIONS.CHANNEL_ID]: 'Channel ID',
    [CHANNEL_ANALYTICS.DIMENSIONS.CHANNEL_NAME]: 'Channel Name',
    [CHANNEL_ANALYTICS.DIMENSIONS.CHANNEL_TYPE]: 'Channel Type',
    [CHANNEL_ANALYTICS.DIMENSIONS.CHANNEL_CATEGORY]: 'Channel Category',
    [CHANNEL_ANALYTICS.DIMENSIONS.CHANNEL_STATUS]: 'Channel Status',
    [CHANNEL_ANALYTICS.DIMENSIONS.REACH]: 'Reach',
    [CHANNEL_ANALYTICS.DIMENSIONS.ENGAGEMENT]: 'Engagement',
    [CHANNEL_ANALYTICS.DIMENSIONS.CONVERSION_RATE]: 'Conversion Rate',
    [CHANNEL_ANALYTICS.DIMENSIONS.BOUNCE_RATE]: 'Bounce Rate',
    [CHANNEL_ANALYTICS.DIMENSIONS.CLICK_THROUGH_RATE]: 'Click-through Rate',
    [CHANNEL_ANALYTICS.DIMENSIONS.COST]: 'Cost',
    [CHANNEL_ANALYTICS.DIMENSIONS.REVENUE]: 'Revenue',
    [CHANNEL_ANALYTICS.DIMENSIONS.PROFIT]: 'Profit',
    [CHANNEL_ANALYTICS.DIMENSIONS.ROI]: 'ROI',
    [CHANNEL_ANALYTICS.DIMENSIONS.CUSTOMER_ID]: 'Customer ID',
    [CHANNEL_ANALYTICS.DIMENSIONS.CUSTOMER_TYPE]: 'Customer Type',
    [CHANNEL_ANALYTICS.DIMENSIONS.CUSTOMER_SEGMENT]: 'Customer Segment',
    [CHANNEL_ANALYTICS.DIMENSIONS.DATE]: 'Date',
    [CHANNEL_ANALYTICS.DIMENSIONS.WEEK]: 'Week',
    [CHANNEL_ANALYTICS.DIMENSIONS.MONTH]: 'Month',
    [CHANNEL_ANALYTICS.DIMENSIONS.QUARTER]: 'Quarter',
    [CHANNEL_ANALYTICS.DIMENSIONS.YEAR]: 'Year',
    [CHANNEL_ANALYTICS.DIMENSIONS.HOUR]: 'Hour',
    [CHANNEL_ANALYTICS.DIMENSIONS.COUNTRY]: 'Country',
    [CHANNEL_ANALYTICS.DIMENSIONS.REGION]: 'Region',
    [CHANNEL_ANALYTICS.DIMENSIONS.CITY]: 'City',
    [CHANNEL_ANALYTICS.DIMENSIONS.DEVICE_TYPE]: 'Device Type',
    [CHANNEL_ANALYTICS.DIMENSIONS.BROWSER]: 'Browser',
    [CHANNEL_ANALYTICS.DIMENSIONS.OS]: 'OS',
  };
  return labels[dimension] || 'Unknown';
}

// Channel Analytics Segment Labels
export function getChannelAnalyticsSegmentLabel(segment: ChannelAnalyticsSegment): string {
  const labels: Record<ChannelAnalyticsSegment, string> = {
    [CHANNEL_ANALYTICS.SEGMENTS.DIGITAL]: 'Digital',
    [CHANNEL_ANALYTICS.SEGMENTS.TRADITIONAL]: 'Traditional',
    [CHANNEL_ANALYTICS.SEGMENTS.SOCIAL]: 'Social',
    [CHANNEL_ANALYTICS.SEGMENTS.SEARCH]: 'Search',
    [CHANNEL_ANALYTICS.SEGMENTS.DISPLAY]: 'Display',
    [CHANNEL_ANALYTICS.SEGMENTS.EMAIL]: 'Email',
    [CHANNEL_ANALYTICS.SEGMENTS.HIGH_PERFORMING]: 'High Performing',
    [CHANNEL_ANALYTICS.SEGMENTS.MEDIUM_PERFORMING]: 'Medium Performing',
    [CHANNEL_ANALYTICS.SEGMENTS.LOW_PERFORMING]: 'Low Performing',
    [CHANNEL_ANALYTICS.SEGMENTS.HIGH_COST]: 'High Cost',
    [CHANNEL_ANALYTICS.SEGMENTS.MEDIUM_COST]: 'Medium Cost',
    [CHANNEL_ANALYTICS.SEGMENTS.LOW_COST]: 'Low Cost',
    [CHANNEL_ANALYTICS.SEGMENTS.HIGH_ROI]: 'High ROI',
    [CHANNEL_ANALYTICS.SEGMENTS.MEDIUM_ROI]: 'Medium ROI',
    [CHANNEL_ANALYTICS.SEGMENTS.LOW_ROI]: 'Low ROI',
    [CHANNEL_ANALYTICS.SEGMENTS.NEGATIVE_ROI]: 'Negative ROI',
    [CHANNEL_ANALYTICS.SEGMENTS.SATISFIED]: 'Satisfied',
    [CHANNEL_ANALYTICS.SEGMENTS.NEUTRAL]: 'Neutral',
    [CHANNEL_ANALYTICS.SEGMENTS.UNSATISFIED]: 'Unsatisfied',
    [CHANNEL_ANALYTICS.SEGMENTS.HEALTHY]: 'Healthy',
    [CHANNEL_ANALYTICS.SEGMENTS.DEGRADED]: 'Degraded',
    [CHANNEL_ANALYTICS.SEGMENTS.UNHEALTHY]: 'Unhealthy',
  };
  return labels[segment] || 'Unknown';
}

// Channel Analytics Cohort Labels
export function getChannelAnalyticsCohortLabel(cohort: ChannelAnalyticsCohort): string {
  const labels: Record<ChannelAnalyticsCohort, string> = {
    [CHANNEL_ANALYTICS.COHORTS.CHANNEL_TYPE]: 'Channel Type',
    [CHANNEL_ANALYTICS.COHORTS.CHANNEL_CATEGORY]: 'Channel Category',
    [CHANNEL_ANALYTICS.COHORTS.ACQUISITION_DATE]: 'Acquisition Date',
    [CHANNEL_ANALYTICS.COHORTS.CUSTOMER_SEGMENT]: 'Customer Segment',
    [CHANNEL_ANALYTICS.COHORTS.REGION]: 'Region',
  };
  return labels[cohort] || 'Unknown';
}

// Channel Analytics Granularity Labels
export function getChannelAnalyticsGranularityLabel(
  granularity: ChannelAnalyticsGranularity
): string {
  const labels: Record<ChannelAnalyticsGranularity, string> = {
    [CHANNEL_ANALYTICS.GRANULARITY.HOURLY]: 'Hourly',
    [CHANNEL_ANALYTICS.GRANULARITY.DAILY]: 'Daily',
    [CHANNEL_ANALYTICS.GRANULARITY.WEEKLY]: 'Weekly',
    [CHANNEL_ANALYTICS.GRANULARITY.MONTHLY]: 'Monthly',
    [CHANNEL_ANALYTICS.GRANULARITY.QUARTERLY]: 'Quarterly',
    [CHANNEL_ANALYTICS.GRANULARITY.YEARLY]: 'Yearly',
  };
  return labels[granularity] || 'Unknown';
}

// Check if channel analytics is active
export function isChannelAnalyticsActive(status: ChannelAnalyticsStatus): boolean {
  const activeStatuses: ChannelAnalyticsStatus[] = [
    CHANNEL_ANALYTICS.STATUS.TRACKING,
    CHANNEL_ANALYTICS.STATUS.PROCESSING,
    CHANNEL_ANALYTICS.STATUS.ANALYZING,
    CHANNEL_ANALYTICS.STATUS.UPDATING,
    CHANNEL_ANALYTICS.STATUS.REFRESHING,
  ];
  return activeStatuses.includes(status);
}

// Check if channel analytics is completed
export function isChannelAnalyticsCompleted(status: ChannelAnalyticsStatus): boolean {
  return status === CHANNEL_ANALYTICS.STATUS.COMPLETED;
}

// Check if channel analytics has failed
export function isChannelAnalyticsFailed(status: ChannelAnalyticsStatus): boolean {
  return status === CHANNEL_ANALYTICS.STATUS.FAILED;
}

// Check if event is channel lifecycle event
export function isChannelAnalyticsLifecycleEvent(event: ChannelAnalyticsEvent): boolean {
  const lifecycleEvents: ChannelAnalyticsEvent[] = [
    CHANNEL_ANALYTICS.EVENTS.CHANNEL_CREATED,
    CHANNEL_ANALYTICS.EVENTS.CHANNEL_UPDATED,
    CHANNEL_ANALYTICS.EVENTS.CHANNEL_ACTIVATED,
    CHANNEL_ANALYTICS.EVENTS.CHANNEL_DEACTIVATED,
    CHANNEL_ANALYTICS.EVENTS.CHANNEL_ARCHIVED,
  ];
  return lifecycleEvents.includes(event);
}

// Check if event is channel performance event
export function isChannelAnalyticsPerformanceEvent(event: ChannelAnalyticsEvent): boolean {
  const performanceEvents: ChannelAnalyticsEvent[] = [
    CHANNEL_ANALYTICS.EVENTS.CHANNEL_IMPRESSION,
    CHANNEL_ANALYTICS.EVENTS.CHANNEL_CLICK,
    CHANNEL_ANALYTICS.EVENTS.CHANNEL_CONVERSION,
    CHANNEL_ANALYTICS.EVENTS.CHANNEL_ENGAGEMENT,
    CHANNEL_ANALYTICS.EVENTS.CHANNEL_REACH,
  ];
  return performanceEvents.includes(event);
}

// Check if event is channel health event
export function isChannelAnalyticsHealthEvent(event: ChannelAnalyticsEvent): boolean {
  const healthEvents: ChannelAnalyticsEvent[] = [
    CHANNEL_ANALYTICS.EVENTS.CHANNEL_HEALTHY,
    CHANNEL_ANALYTICS.EVENTS.CHANNEL_DEGRADED,
    CHANNEL_ANALYTICS.EVENTS.CHANNEL_UNHEALTHY,
    CHANNEL_ANALYTICS.EVENTS.CHANNEL_ERROR,
  ];
  return healthEvents.includes(event);
}
