/**
 * Marketing Analytics Constants
 * Configuration for marketing campaign performance analytics and tracking
 */

export const MARKETING_ANALYTICS = {
  // Marketing Analytics Types
  TYPES: {
    // Campaign Analytics
    CAMPAIGN: 'campaign',
    CHANNEL: 'channel',
    PERFORMANCE: 'performance',
    ROI: 'roi',
    ENGAGEMENT: 'engagement',

    // Digital Marketing
    SEO: 'seo',
    SEM: 'sem',
    SOCIAL: 'social',
    EMAIL: 'email',
    CONTENT: 'content',

    // Traditional Marketing
    PRINT: 'print',
    TV: 'tv',
    RADIO: 'radio',
    OUTDOOR: 'outdoor',

    // Brand Analytics
    BRAND: 'brand',
    AWARENESS: 'awareness',
    SENTIMENT: 'sentiment',
    REACH: 'reach',

    // Customer Marketing
    ACQUISITION: 'acquisition',
    RETENTION: 'retention',
    LOYALTY: 'loyalty',
    REFERRAL: 'referral',

    // Time Analytics
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,

  // Marketing Analytics Status
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

  // Marketing Analytics Scopes
  SCOPES: {
    INDIVIDUAL: 'individual',
    CAMPAIGN: 'campaign',
    CHANNEL: 'channel',
    REGION: 'region',
    ALL_MARKETING: 'all_marketing',
    ACTIVE_CAMPAIGNS: 'active_campaigns',
    COMPLETED_CAMPAIGNS: 'completed_campaigns',
    COMPARATIVE: 'comparative',
  } as const,

  // Marketing Analytics Events
  EVENTS: {
    // Campaign Events
    CAMPAIGN_CREATED: 'campaign_created',
    CAMPAIGN_LAUNCHED: 'campaign_launched',
    CAMPAIGN_PAUSED: 'campaign_paused',
    CAMPAIGN_RESUMED: 'campaign_resumed',
    CAMPAIGN_COMPLETED: 'campaign_completed',
    CAMPAIGN_CANCELLED: 'campaign_cancelled',

    // Campaign Performance Events
    CAMPAIGN_IMPRESSION: 'campaign_impression',
    CAMPAIGN_CLICK: 'campaign_click',
    CAMPAIGN_CONVERSION: 'campaign_conversion',
    CAMPAIGN_ENGAGEMENT: 'campaign_engagement',

    // Channel Events
    CHANNEL_ACTIVATED: 'channel_activated',
    CHANNEL_DEACTIVATED: 'channel_deactivated',
    CHANNEL_PERFORMANCE: 'channel_performance',

    // Digital Marketing Events
    SEO_RANKING_CHANGE: 'seo_ranking_change',
    SEO_KEYWORD_RANKING: 'seo_keyword_ranking',
    AD_IMPRESSION: 'ad_impression',
    AD_CLICK: 'ad_click',
    AD_CONVERSION: 'ad_conversion',

    // Social Media Events
    SOCIAL_POST: 'social_post',
    SOCIAL_SHARE: 'social_share',
    SOCIAL_LIKE: 'social_like',
    SOCIAL_COMMENT: 'social_comment',
    SOCIAL_FOLLOW: 'social_follow',

    // Email Marketing Events
    EMAIL_SENT: 'email_sent',
    EMAIL_OPENED: 'email_opened',
    EMAIL_CLICKED: 'email_clicked',
    EMAIL_REPLIED: 'email_replied',
    EMAIL_UNSUBSCRIBED: 'email_unsubscribed',
    EMAIL_BOUNCED: 'email_bounced',

    // Brand Events
    BRAND_MENTION: 'brand_mention',
    BRAND_SENTIMENT: 'brand_sentiment',
    BRAND_REACH: 'brand_reach',

    // Customer Events
    LEAD_GENERATED: 'lead_generated',
    LEAD_CONVERTED: 'lead_converted',
    CUSTOMER_ACQUIRED: 'customer_acquired',
    CUSTOMER_RETAINED: 'customer_retained',
    CUSTOMER_CHURNED: 'customer_churned',
    REFERRAL_MADE: 'referral_made',
  } as const,

  // Marketing Analytics Dimensions
  DIMENSIONS: {
    // Campaign Attributes
    CAMPAIGN_ID: 'campaign_id',
    CAMPAIGN_NAME: 'campaign_name',
    CAMPAIGN_TYPE: 'campaign_type',
    CAMPAIGN_STATUS: 'campaign_status',
    CAMPAIGN_OBJECTIVE: 'campaign_objective',

    // Channel Attributes
    CHANNEL: 'channel',
    CHANNEL_TYPE: 'channel_type',
    SOURCE: 'source',
    MEDIUM: 'medium',
    PLATFORM: 'platform',

    // Audience Attributes
    AUDIENCE: 'audience',
    SEGMENT: 'segment',
    TARGET_AUDIENCE: 'target_audience',
    DEMOGRAPHIC: 'demographic',

    // Location Attributes
    COUNTRY: 'country',
    REGION: 'region',
    CITY: 'city',
    LOCATION: 'location',

    // Time Attributes
    DATE: 'date',
    MONTH: 'month',
    QUARTER: 'quarter',
    YEAR: 'year',
    DAY_OF_WEEK: 'day_of_week',
    HOUR: 'hour',

    // Content Attributes
    CONTENT: 'content',
    CONTENT_TYPE: 'content_type',
    CONTENT_CATEGORY: 'content_category',
    CREATIVE: 'creative',
    AD_COPY: 'ad_copy',

    // Financial Attributes
    BUDGET: 'budget',
    SPEND: 'spend',
    COST: 'cost',
    REVENUE: 'revenue',
    ROI: 'roi',
  } as const,

  // Marketing Analytics Metrics
  METRICS: {
    // Campaign Metrics
    TOTAL_CAMPAIGNS: 'total_campaigns',
    ACTIVE_CAMPAIGNS: 'active_campaigns',
    COMPLETED_CAMPAIGNS: 'completed_campaigns',
    CAMPAIGN_SUCCESS_RATE: 'campaign_success_rate',

    // Reach Metrics
    TOTAL_REACH: 'total_reach',
    IMPRESSIONS: 'impressions',
    UNIQUE_IMPRESSIONS: 'unique_impressions',
    FREQUENCY: 'frequency',

    // Engagement Metrics
    ENGAGEMENT_RATE: 'engagement_rate',
    CLICKS: 'clicks',
    CLICK_THROUGH_RATE: 'click_through_rate',
    SOCIAL_SHARES: 'social_shares',
    LIKES: 'likes',
    COMMENTS: 'comments',

    // Conversion Metrics
    CONVERSIONS: 'conversions',
    CONVERSION_RATE: 'conversion_rate',
    COST_PER_CONVERSION: 'cost_per_conversion',
    CONVERSION_VALUE: 'conversion_value',

    // ROI Metrics
    ROI: 'roi',
    ROAS: 'roas',
    ROMI: 'romi',
    COST_PER_ACQUISITION: 'cost_per_acquisition',
    LIFETIME_VALUE: 'lifetime_value',

    // Brand Metrics
    BRAND_AWARENESS: 'brand_awareness',
    BRAND_SENTIMENT: 'brand_sentiment',
    BRAND_REACH: 'brand_reach',
    BRAND_LOYALTY: 'brand_loyalty',

    // Customer Metrics
    LEADS: 'leads',
    LEAD_CONVERSION_RATE: 'lead_conversion_rate',
    CUSTOMER_ACQUISITION_COST: 'customer_acquisition_cost',
    CUSTOMER_RETENTION_RATE: 'customer_retention_rate',
    CHURN_RATE: 'churn_rate',

    // Channel Metrics
    CHANNEL_REACH: 'channel_reach',
    CHANNEL_ENGAGEMENT: 'channel_engagement',
    CHANNEL_CONVERSION: 'channel_conversion',
    CHANNEL_ROI: 'channel_roi',

    // Time Metrics
    DAILY_REACH: 'daily_reach',
    WEEKLY_REACH: 'weekly_reach',
    MONTHLY_REACH: 'monthly_reach',
    DAILY_ENGAGEMENT: 'daily_engagement',
    WEEKLY_ENGAGEMENT: 'weekly_engagement',
    MONTHLY_ENGAGEMENT: 'monthly_engagement',

    // Comparison Metrics
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    PERIOD_COMPARISON: 'period_comparison',
  } as const,

  // Marketing Analytics Segments
  SEGMENTS: {
    // Channel Segments
    DIGITAL: 'digital',
    TRADITIONAL: 'traditional',
    SOCIAL: 'social',
    SEARCH: 'search',
    DISPLAY: 'display',
    EMAIL: 'email',
    CONTENT: 'content',
    PRINT: 'print',
    TV: 'tv',
    RADIO: 'radio',
    OUTDOOR: 'outdoor',

    // Audience Segments
    NEW_CUSTOMERS: 'new_customers',
    RETURNING_CUSTOMERS: 'returning_customers',
    LOYAL_CUSTOMERS: 'loyal_customers',
    HIGH_VALUE: 'high_value',

    // Performance Segments
    HIGH_PERFORMING: 'high_performing',
    MEDIUM_PERFORMING: 'medium_performing',
    LOW_PERFORMING: 'low_performing',
    OPTIMIZED: 'optimized',

    // Campaign Segments
    LAUNCHED: 'launched',
    IN_PROGRESS: 'in_progress',
    PAUSED: 'paused',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
  } as const,

  // Marketing Analytics Cohorts
  COHORTS: {
    CAMPAIGN_START_DATE: 'campaign_start_date',
    CAMPAIGN_END_DATE: 'campaign_end_date',
    CHANNEL: 'channel',
    AUDIENCE: 'audience',
    REGION: 'region',
    FIRST_ACQUISITION: 'first_acquisition',
  } as const,

  // Marketing Analytics Granularity
  GRANULARITY: {
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,
} as const;

// Marketing Analytics Types
export type MarketingAnalyticsType =
  (typeof MARKETING_ANALYTICS.TYPES)[keyof typeof MARKETING_ANALYTICS.TYPES];

// Marketing Analytics Status
export type MarketingAnalyticsStatus =
  (typeof MARKETING_ANALYTICS.STATUS)[keyof typeof MARKETING_ANALYTICS.STATUS];

// Marketing Analytics Scopes
export type MarketingAnalyticsScope =
  (typeof MARKETING_ANALYTICS.SCOPES)[keyof typeof MARKETING_ANALYTICS.SCOPES];

// Marketing Analytics Events
export type MarketingAnalyticsEvent =
  (typeof MARKETING_ANALYTICS.EVENTS)[keyof typeof MARKETING_ANALYTICS.EVENTS];

// Marketing Analytics Dimensions
export type MarketingAnalyticsDimension =
  (typeof MARKETING_ANALYTICS.DIMENSIONS)[keyof typeof MARKETING_ANALYTICS.DIMENSIONS];

// Marketing Analytics Metrics
export type MarketingAnalyticsMetric =
  (typeof MARKETING_ANALYTICS.METRICS)[keyof typeof MARKETING_ANALYTICS.METRICS];

// Marketing Analytics Segments
export type MarketingAnalyticsSegment =
  (typeof MARKETING_ANALYTICS.SEGMENTS)[keyof typeof MARKETING_ANALYTICS.SEGMENTS];

// Marketing Analytics Cohorts
export type MarketingAnalyticsCohort =
  (typeof MARKETING_ANALYTICS.COHORTS)[keyof typeof MARKETING_ANALYTICS.COHORTS];

// Marketing Analytics Granularity
export type MarketingAnalyticsGranularity =
  (typeof MARKETING_ANALYTICS.GRANULARITY)[keyof typeof MARKETING_ANALYTICS.GRANULARITY];

// Marketing Analytics Status Labels
export function getMarketingAnalyticsStatusLabel(status: MarketingAnalyticsStatus): string {
  const labels: Record<MarketingAnalyticsStatus, string> = {
    [MARKETING_ANALYTICS.STATUS.TRACKING]: 'Tracking',
    [MARKETING_ANALYTICS.STATUS.PROCESSING]: 'Processing',
    [MARKETING_ANALYTICS.STATUS.ANALYZING]: 'Analyzing',
    [MARKETING_ANALYTICS.STATUS.COMPLETED]: 'Completed',
    [MARKETING_ANALYTICS.STATUS.FAILED]: 'Failed',
    [MARKETING_ANALYTICS.STATUS.PAUSED]: 'Paused',
    [MARKETING_ANALYTICS.STATUS.STOPPED]: 'Stopped',
    [MARKETING_ANALYTICS.STATUS.UPDATING]: 'Updating',
    [MARKETING_ANALYTICS.STATUS.REFRESHING]: 'Refreshing',
  };
  return labels[status] || 'Unknown';
}

// Marketing Analytics Event Labels
export function getMarketingAnalyticsEventLabel(event: MarketingAnalyticsEvent): string {
  const labels: Record<MarketingAnalyticsEvent, string> = {
    [MARKETING_ANALYTICS.EVENTS.CAMPAIGN_CREATED]: 'Campaign Created',
    [MARKETING_ANALYTICS.EVENTS.CAMPAIGN_LAUNCHED]: 'Campaign Launched',
    [MARKETING_ANALYTICS.EVENTS.CAMPAIGN_PAUSED]: 'Campaign Paused',
    [MARKETING_ANALYTICS.EVENTS.CAMPAIGN_RESUMED]: 'Campaign Resumed',
    [MARKETING_ANALYTICS.EVENTS.CAMPAIGN_COMPLETED]: 'Campaign Completed',
    [MARKETING_ANALYTICS.EVENTS.CAMPAIGN_CANCELLED]: 'Campaign Cancelled',
    [MARKETING_ANALYTICS.EVENTS.CAMPAIGN_IMPRESSION]: 'Campaign Impression',
    [MARKETING_ANALYTICS.EVENTS.CAMPAIGN_CLICK]: 'Campaign Click',
    [MARKETING_ANALYTICS.EVENTS.CAMPAIGN_CONVERSION]: 'Campaign Conversion',
    [MARKETING_ANALYTICS.EVENTS.CAMPAIGN_ENGAGEMENT]: 'Campaign Engagement',
    [MARKETING_ANALYTICS.EVENTS.CHANNEL_ACTIVATED]: 'Channel Activated',
    [MARKETING_ANALYTICS.EVENTS.CHANNEL_DEACTIVATED]: 'Channel Deactivated',
    [MARKETING_ANALYTICS.EVENTS.CHANNEL_PERFORMANCE]: 'Channel Performance',
    [MARKETING_ANALYTICS.EVENTS.SEO_RANKING_CHANGE]: 'SEO Ranking Change',
    [MARKETING_ANALYTICS.EVENTS.SEO_KEYWORD_RANKING]: 'SEO Keyword Ranking',
    [MARKETING_ANALYTICS.EVENTS.AD_IMPRESSION]: 'Ad Impression',
    [MARKETING_ANALYTICS.EVENTS.AD_CLICK]: 'Ad Click',
    [MARKETING_ANALYTICS.EVENTS.AD_CONVERSION]: 'Ad Conversion',
    [MARKETING_ANALYTICS.EVENTS.SOCIAL_POST]: 'Social Post',
    [MARKETING_ANALYTICS.EVENTS.SOCIAL_SHARE]: 'Social Share',
    [MARKETING_ANALYTICS.EVENTS.SOCIAL_LIKE]: 'Social Like',
    [MARKETING_ANALYTICS.EVENTS.SOCIAL_COMMENT]: 'Social Comment',
    [MARKETING_ANALYTICS.EVENTS.SOCIAL_FOLLOW]: 'Social Follow',
    [MARKETING_ANALYTICS.EVENTS.EMAIL_SENT]: 'Email Sent',
    [MARKETING_ANALYTICS.EVENTS.EMAIL_OPENED]: 'Email Opened',
    [MARKETING_ANALYTICS.EVENTS.EMAIL_CLICKED]: 'Email Clicked',
    [MARKETING_ANALYTICS.EVENTS.EMAIL_REPLIED]: 'Email Replied',
    [MARKETING_ANALYTICS.EVENTS.EMAIL_UNSUBSCRIBED]: 'Email Unsubscribed',
    [MARKETING_ANALYTICS.EVENTS.EMAIL_BOUNCED]: 'Email Bounced',
    [MARKETING_ANALYTICS.EVENTS.BRAND_MENTION]: 'Brand Mention',
    [MARKETING_ANALYTICS.EVENTS.BRAND_SENTIMENT]: 'Brand Sentiment',
    [MARKETING_ANALYTICS.EVENTS.BRAND_REACH]: 'Brand Reach',
    [MARKETING_ANALYTICS.EVENTS.LEAD_GENERATED]: 'Lead Generated',
    [MARKETING_ANALYTICS.EVENTS.LEAD_CONVERTED]: 'Lead Converted',
    [MARKETING_ANALYTICS.EVENTS.CUSTOMER_ACQUIRED]: 'Customer Acquired',
    [MARKETING_ANALYTICS.EVENTS.CUSTOMER_RETAINED]: 'Customer Retained',
    [MARKETING_ANALYTICS.EVENTS.CUSTOMER_CHURNED]: 'Customer Churned',
    [MARKETING_ANALYTICS.EVENTS.REFERRAL_MADE]: 'Referral Made',
  };
  return labels[event] || 'Unknown';
}

// Marketing Analytics Dimension Labels
export function getMarketingAnalyticsDimensionLabel(
  dimension: MarketingAnalyticsDimension
): string {
  const labels: Record<MarketingAnalyticsDimension, string> = {
    [MARKETING_ANALYTICS.DIMENSIONS.CAMPAIGN_ID]: 'Campaign ID',
    [MARKETING_ANALYTICS.DIMENSIONS.CAMPAIGN_NAME]: 'Campaign Name',
    [MARKETING_ANALYTICS.DIMENSIONS.CAMPAIGN_TYPE]: 'Campaign Type',
    [MARKETING_ANALYTICS.DIMENSIONS.CAMPAIGN_STATUS]: 'Campaign Status',
    [MARKETING_ANALYTICS.DIMENSIONS.CAMPAIGN_OBJECTIVE]: 'Campaign Objective',
    [MARKETING_ANALYTICS.DIMENSIONS.CHANNEL]: 'Channel',
    [MARKETING_ANALYTICS.DIMENSIONS.CHANNEL_TYPE]: 'Channel Type',
    [MARKETING_ANALYTICS.DIMENSIONS.SOURCE]: 'Source',
    [MARKETING_ANALYTICS.DIMENSIONS.MEDIUM]: 'Medium',
    [MARKETING_ANALYTICS.DIMENSIONS.PLATFORM]: 'Platform',
    [MARKETING_ANALYTICS.DIMENSIONS.AUDIENCE]: 'Audience',
    [MARKETING_ANALYTICS.DIMENSIONS.SEGMENT]: 'Segment',
    [MARKETING_ANALYTICS.DIMENSIONS.TARGET_AUDIENCE]: 'Target Audience',
    [MARKETING_ANALYTICS.DIMENSIONS.DEMOGRAPHIC]: 'Demographic',
    [MARKETING_ANALYTICS.DIMENSIONS.COUNTRY]: 'Country',
    [MARKETING_ANALYTICS.DIMENSIONS.REGION]: 'Region',
    [MARKETING_ANALYTICS.DIMENSIONS.CITY]: 'City',
    [MARKETING_ANALYTICS.DIMENSIONS.LOCATION]: 'Location',
    [MARKETING_ANALYTICS.DIMENSIONS.DATE]: 'Date',
    [MARKETING_ANALYTICS.DIMENSIONS.MONTH]: 'Month',
    [MARKETING_ANALYTICS.DIMENSIONS.QUARTER]: 'Quarter',
    [MARKETING_ANALYTICS.DIMENSIONS.YEAR]: 'Year',
    [MARKETING_ANALYTICS.DIMENSIONS.DAY_OF_WEEK]: 'Day of Week',
    [MARKETING_ANALYTICS.DIMENSIONS.HOUR]: 'Hour',
    [MARKETING_ANALYTICS.DIMENSIONS.CONTENT]: 'Content',
    [MARKETING_ANALYTICS.DIMENSIONS.CONTENT_TYPE]: 'Content Type',
    [MARKETING_ANALYTICS.DIMENSIONS.CONTENT_CATEGORY]: 'Content Category',
    [MARKETING_ANALYTICS.DIMENSIONS.CREATIVE]: 'Creative',
    [MARKETING_ANALYTICS.DIMENSIONS.AD_COPY]: 'Ad Copy',
    [MARKETING_ANALYTICS.DIMENSIONS.BUDGET]: 'Budget',
    [MARKETING_ANALYTICS.DIMENSIONS.SPEND]: 'Spend',
    [MARKETING_ANALYTICS.DIMENSIONS.COST]: 'Cost',
    [MARKETING_ANALYTICS.DIMENSIONS.REVENUE]: 'Revenue',
    [MARKETING_ANALYTICS.DIMENSIONS.ROI]: 'ROI',
  };
  return labels[dimension] || 'Unknown';
}

// Marketing Analytics Segment Labels
export function getMarketingAnalyticsSegmentLabel(segment: MarketingAnalyticsSegment): string {
  const labels: Record<MarketingAnalyticsSegment, string> = {
    [MARKETING_ANALYTICS.SEGMENTS.DIGITAL]: 'Digital',
    [MARKETING_ANALYTICS.SEGMENTS.TRADITIONAL]: 'Traditional',
    [MARKETING_ANALYTICS.SEGMENTS.SOCIAL]: 'Social',
    [MARKETING_ANALYTICS.SEGMENTS.SEARCH]: 'Search',
    [MARKETING_ANALYTICS.SEGMENTS.DISPLAY]: 'Display',
    [MARKETING_ANALYTICS.SEGMENTS.EMAIL]: 'Email',
    [MARKETING_ANALYTICS.SEGMENTS.CONTENT]: 'Content',
    [MARKETING_ANALYTICS.SEGMENTS.PRINT]: 'Print',
    [MARKETING_ANALYTICS.SEGMENTS.TV]: 'TV',
    [MARKETING_ANALYTICS.SEGMENTS.RADIO]: 'Radio',
    [MARKETING_ANALYTICS.SEGMENTS.OUTDOOR]: 'Outdoor',
    [MARKETING_ANALYTICS.SEGMENTS.NEW_CUSTOMERS]: 'New Customers',
    [MARKETING_ANALYTICS.SEGMENTS.RETURNING_CUSTOMERS]: 'Returning Customers',
    [MARKETING_ANALYTICS.SEGMENTS.LOYAL_CUSTOMERS]: 'Loyal Customers',
    [MARKETING_ANALYTICS.SEGMENTS.HIGH_VALUE]: 'High Value',
    [MARKETING_ANALYTICS.SEGMENTS.HIGH_PERFORMING]: 'High Performing',
    [MARKETING_ANALYTICS.SEGMENTS.MEDIUM_PERFORMING]: 'Medium Performing',
    [MARKETING_ANALYTICS.SEGMENTS.LOW_PERFORMING]: 'Low Performing',
    [MARKETING_ANALYTICS.SEGMENTS.OPTIMIZED]: 'Optimized',
    [MARKETING_ANALYTICS.SEGMENTS.LAUNCHED]: 'Launched',
    [MARKETING_ANALYTICS.SEGMENTS.IN_PROGRESS]: 'In Progress',
    [MARKETING_ANALYTICS.SEGMENTS.PAUSED]: 'Paused',
    [MARKETING_ANALYTICS.SEGMENTS.COMPLETED]: 'Completed',
    [MARKETING_ANALYTICS.SEGMENTS.CANCELLED]: 'Cancelled',
  };
  return labels[segment] || 'Unknown';
}

// Marketing Analytics Cohort Labels
export function getMarketingAnalyticsCohortLabel(cohort: MarketingAnalyticsCohort): string {
  const labels: Record<MarketingAnalyticsCohort, string> = {
    [MARKETING_ANALYTICS.COHORTS.CAMPAIGN_START_DATE]: 'Campaign Start Date',
    [MARKETING_ANALYTICS.COHORTS.CAMPAIGN_END_DATE]: 'Campaign End Date',
    [MARKETING_ANALYTICS.COHORTS.CHANNEL]: 'Channel',
    [MARKETING_ANALYTICS.COHORTS.AUDIENCE]: 'Audience',
    [MARKETING_ANALYTICS.COHORTS.REGION]: 'Region',
    [MARKETING_ANALYTICS.COHORTS.FIRST_ACQUISITION]: 'First Acquisition',
  };
  return labels[cohort] || 'Unknown';
}

// Marketing Analytics Granularity Labels
export function getMarketingAnalyticsGranularityLabel(
  granularity: MarketingAnalyticsGranularity
): string {
  const labels: Record<MarketingAnalyticsGranularity, string> = {
    [MARKETING_ANALYTICS.GRANULARITY.HOURLY]: 'Hourly',
    [MARKETING_ANALYTICS.GRANULARITY.DAILY]: 'Daily',
    [MARKETING_ANALYTICS.GRANULARITY.WEEKLY]: 'Weekly',
    [MARKETING_ANALYTICS.GRANULARITY.MONTHLY]: 'Monthly',
    [MARKETING_ANALYTICS.GRANULARITY.QUARTERLY]: 'Quarterly',
    [MARKETING_ANALYTICS.GRANULARITY.YEARLY]: 'Yearly',
  };
  return labels[granularity] || 'Unknown';
}

// Check if marketing analytics is active
export function isMarketingAnalyticsActive(status: MarketingAnalyticsStatus): boolean {
  const activeStatuses: MarketingAnalyticsStatus[] = [
    MARKETING_ANALYTICS.STATUS.TRACKING,
    MARKETING_ANALYTICS.STATUS.PROCESSING,
    MARKETING_ANALYTICS.STATUS.ANALYZING,
    MARKETING_ANALYTICS.STATUS.UPDATING,
    MARKETING_ANALYTICS.STATUS.REFRESHING,
  ];
  return activeStatuses.includes(status);
}

// Check if marketing analytics is completed
export function isMarketingAnalyticsCompleted(status: MarketingAnalyticsStatus): boolean {
  return status === MARKETING_ANALYTICS.STATUS.COMPLETED;
}

// Check if marketing analytics has failed
export function isMarketingAnalyticsFailed(status: MarketingAnalyticsStatus): boolean {
  return status === MARKETING_ANALYTICS.STATUS.FAILED;
}

// Check if event is campaign event
export function isMarketingAnalyticsCampaignEvent(event: MarketingAnalyticsEvent): boolean {
  const campaignEvents: MarketingAnalyticsEvent[] = [
    MARKETING_ANALYTICS.EVENTS.CAMPAIGN_CREATED,
    MARKETING_ANALYTICS.EVENTS.CAMPAIGN_LAUNCHED,
    MARKETING_ANALYTICS.EVENTS.CAMPAIGN_PAUSED,
    MARKETING_ANALYTICS.EVENTS.CAMPAIGN_RESUMED,
    MARKETING_ANALYTICS.EVENTS.CAMPAIGN_COMPLETED,
    MARKETING_ANALYTICS.EVENTS.CAMPAIGN_CANCELLED,
    MARKETING_ANALYTICS.EVENTS.CAMPAIGN_IMPRESSION,
    MARKETING_ANALYTICS.EVENTS.CAMPAIGN_CLICK,
    MARKETING_ANALYTICS.EVENTS.CAMPAIGN_CONVERSION,
    MARKETING_ANALYTICS.EVENTS.CAMPAIGN_ENGAGEMENT,
  ];
  return campaignEvents.includes(event);
}

// Check if event is email event
export function isMarketingAnalyticsEmailEvent(event: MarketingAnalyticsEvent): boolean {
  const emailEvents: MarketingAnalyticsEvent[] = [
    MARKETING_ANALYTICS.EVENTS.EMAIL_SENT,
    MARKETING_ANALYTICS.EVENTS.EMAIL_OPENED,
    MARKETING_ANALYTICS.EVENTS.EMAIL_CLICKED,
    MARKETING_ANALYTICS.EVENTS.EMAIL_REPLIED,
    MARKETING_ANALYTICS.EVENTS.EMAIL_UNSUBSCRIBED,
    MARKETING_ANALYTICS.EVENTS.EMAIL_BOUNCED,
  ];
  return emailEvents.includes(event);
}

// Check if event is social media event
export function isMarketingAnalyticsSocialEvent(event: MarketingAnalyticsEvent): boolean {
  const socialEvents: MarketingAnalyticsEvent[] = [
    MARKETING_ANALYTICS.EVENTS.SOCIAL_POST,
    MARKETING_ANALYTICS.EVENTS.SOCIAL_SHARE,
    MARKETING_ANALYTICS.EVENTS.SOCIAL_LIKE,
    MARKETING_ANALYTICS.EVENTS.SOCIAL_COMMENT,
    MARKETING_ANALYTICS.EVENTS.SOCIAL_FOLLOW,
  ];
  return socialEvents.includes(event);
}

// Check if event is customer event
export function isMarketingAnalyticsCustomerEvent(event: MarketingAnalyticsEvent): boolean {
  const customerEvents: MarketingAnalyticsEvent[] = [
    MARKETING_ANALYTICS.EVENTS.LEAD_GENERATED,
    MARKETING_ANALYTICS.EVENTS.LEAD_CONVERTED,
    MARKETING_ANALYTICS.EVENTS.CUSTOMER_ACQUIRED,
    MARKETING_ANALYTICS.EVENTS.CUSTOMER_RETAINED,
    MARKETING_ANALYTICS.EVENTS.CUSTOMER_CHURNED,
    MARKETING_ANALYTICS.EVENTS.REFERRAL_MADE,
  ];
  return customerEvents.includes(event);
}
