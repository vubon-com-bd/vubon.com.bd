/**
 * Marketing Analytics Type Constants
 * Types of marketing analytics data and analysis
 */

export const MARKETING_ANALYTICS_TYPE = {
  // Analysis Types
  ANALYSIS_TYPES: {
    // Campaign Analysis
    CAMPAIGN_ANALYSIS: 'campaign_analysis',
    CAMPAIGN_PERFORMANCE: 'campaign_performance',
    CAMPAIGN_ROI: 'campaign_roi',
    CAMPAIGN_ENGAGEMENT: 'campaign_engagement',

    // Channel Analysis
    CHANNEL_ANALYSIS: 'channel_analysis',
    CHANNEL_PERFORMANCE: 'channel_performance',
    CHANNEL_ATTRIBUTION: 'channel_attribution',
    MULTI_CHANNEL: 'multi_channel',

    // Digital Marketing Analysis
    SEO_ANALYSIS: 'seo_analysis',
    SEM_ANALYSIS: 'sem_analysis',
    SOCIAL_ANALYSIS: 'social_analysis',
    EMAIL_ANALYSIS: 'email_analysis',
    CONTENT_ANALYSIS: 'content_analysis',

    // Brand Analysis
    BRAND_ANALYSIS: 'brand_analysis',
    BRAND_AWARENESS: 'brand_awareness',
    BRAND_SENTIMENT: 'brand_sentiment',
    BRAND_PERCEPTION: 'brand_perception',

    // Customer Analysis
    ACQUISITION_ANALYSIS: 'acquisition_analysis',
    RETENTION_ANALYSIS: 'retention_analysis',
    LOYALTY_ANALYSIS: 'loyalty_analysis',
    LIFETIME_VALUE_ANALYSIS: 'lifetime_value_analysis',

    // Competitive Analysis
    COMPETITIVE_ANALYSIS: 'competitive_analysis',
    MARKET_SHARE: 'market_share',
    BENCHMARKING: 'benchmarking',

    // Predictive Analysis
    PREDICTIVE: 'predictive',
    FORECAST: 'forecast',
    TREND: 'trend',
  } as const,

  // Data Types
  DATA_TYPES: {
    CAMPAIGN_DATA: 'campaign_data',
    CHANNEL_DATA: 'channel_data',
    PERFORMANCE_DATA: 'performance_data',
    ENGAGEMENT_DATA: 'engagement_data',

    DIGITAL_MARKETING_DATA: 'digital_marketing_data',
    SEO_DATA: 'seo_data',
    SOCIAL_DATA: 'social_data',
    EMAIL_DATA: 'email_data',
    CONTENT_DATA: 'content_data',

    BRAND_DATA: 'brand_data',
    SENTIMENT_DATA: 'sentiment_data',

    CUSTOMER_DATA: 'customer_data',
    LEAD_DATA: 'lead_data',
    CONVERSION_DATA: 'conversion_data',

    COMPETITIVE_DATA: 'competitive_data',
    MARKET_DATA: 'market_data',

    TIME_SERIES: 'time_series',
    AGGREGATED: 'aggregated',
    RAW: 'raw',
  } as const,

  // Campaign Types
  CAMPAIGN_TYPES: {
    // Marketing Campaigns
    BRAND_AWARENESS: 'brand_awareness',
    PRODUCT_LAUNCH: 'product_launch',
    SEASONAL: 'seasonal',
    HOLIDAY: 'holiday',
    EVENT: 'event',

    // Promotional Campaigns
    DISCOUNT: 'discount',
    SALE: 'sale',
    FLASH_SALE: 'flash_sale',
    BUNDLE: 'bundle',

    // Digital Campaigns
    SEO: 'seo',
    SEM: 'sem',
    SOCIAL: 'social',
    EMAIL: 'email',
    CONTENT: 'content',
    DISPLAY: 'display',
    VIDEO: 'video',
    NATIVE: 'native',

    // Traditional Campaigns
    PRINT: 'print',
    TV: 'tv',
    RADIO: 'radio',
    OUTDOOR: 'outdoor',
    DIRECT_MAIL: 'direct_mail',

    // Performance Campaigns
    LEAD_GENERATION: 'lead_generation',
    CONVERSION: 'conversion',
    RETENTION: 'retention',
    LOYALTY: 'loyalty',
    REFERRAL: 'referral',
  } as const,

  // Marketing Channels
  MARKETING_CHANNELS: {
    // Digital Channels
    ORGANIC_SEARCH: 'organic_search',
    PAID_SEARCH: 'paid_search',
    SOCIAL_ORGANIC: 'social_organic',
    SOCIAL_PAID: 'social_paid',
    DISPLAY_ADS: 'display_ads',
    VIDEO_ADS: 'video_ads',
    EMAIL: 'email',
    SMS: 'sms',
    PUSH_NOTIFICATION: 'push_notification',

    // Traditional Channels
    TV: 'tv',
    RADIO: 'radio',
    PRINT: 'print',
    OUTDOOR: 'outdoor',
    DIRECT_MAIL: 'direct_mail',
    EVENT: 'event',

    // Other Channels
    REFERRAL: 'referral',
    AFFILIATE: 'affiliate',
    INFLUENCER: 'influencer',
    PARTNERSHIP: 'partnership',
  } as const,

  // Campaign Status
  CAMPAIGN_STATUS: {
    DRAFT: 'draft',
    SCHEDULED: 'scheduled',
    LIVE: 'live',
    PAUSED: 'paused',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    ARCHIVED: 'archived',
    FAILED: 'failed',
  } as const,

  // Campaign Objectives
  CAMPAIGN_OBJECTIVES: {
    AWARENESS: 'awareness',
    CONSIDERATION: 'consideration',
    CONVERSION: 'conversion',
    RETENTION: 'retention',
    LOYALTY: 'loyalty',
    ADVOCACY: 'advocacy',
  } as const,

  // Marketing Performance Levels
  PERFORMANCE_LEVELS: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    AVERAGE: 'average',
    BELOW_AVERAGE: 'below_average',
    POOR: 'poor',
    CRITICAL: 'critical',
  } as const,

  // Engagement Levels
  ENGAGEMENT_LEVELS: {
    VERY_HIGH: 'very_high',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    VERY_LOW: 'very_low',
    NONE: 'none',
  } as const,

  // Sentiment Types
  SENTIMENT_TYPES: {
    VERY_POSITIVE: 'very_positive',
    POSITIVE: 'positive',
    NEUTRAL: 'neutral',
    NEGATIVE: 'negative',
    VERY_NEGATIVE: 'very_negative',
  } as const,
} as const;

// Marketing Analytics Analysis Types
export type MarketingAnalyticsAnalysisType =
  (typeof MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES)[keyof typeof MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES];

// Marketing Analytics Data Types
export type MarketingAnalyticsDataType =
  (typeof MARKETING_ANALYTICS_TYPE.DATA_TYPES)[keyof typeof MARKETING_ANALYTICS_TYPE.DATA_TYPES];

// Marketing Analytics Campaign Types
export type MarketingAnalyticsCampaignType =
  (typeof MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES)[keyof typeof MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES];

// Marketing Analytics Marketing Channels
export type MarketingAnalyticsMarketingChannel =
  (typeof MARKETING_ANALYTICS_TYPE.MARKETING_CHANNELS)[keyof typeof MARKETING_ANALYTICS_TYPE.MARKETING_CHANNELS];

// Marketing Analytics Campaign Status
export type MarketingAnalyticsCampaignStatus =
  (typeof MARKETING_ANALYTICS_TYPE.CAMPAIGN_STATUS)[keyof typeof MARKETING_ANALYTICS_TYPE.CAMPAIGN_STATUS];

// Marketing Analytics Campaign Objectives
export type MarketingAnalyticsCampaignObjective =
  (typeof MARKETING_ANALYTICS_TYPE.CAMPAIGN_OBJECTIVES)[keyof typeof MARKETING_ANALYTICS_TYPE.CAMPAIGN_OBJECTIVES];

// Marketing Analytics Performance Levels
export type MarketingAnalyticsPerformanceLevel =
  (typeof MARKETING_ANALYTICS_TYPE.PERFORMANCE_LEVELS)[keyof typeof MARKETING_ANALYTICS_TYPE.PERFORMANCE_LEVELS];

// Marketing Analytics Engagement Levels
export type MarketingAnalyticsEngagementLevel =
  (typeof MARKETING_ANALYTICS_TYPE.ENGAGEMENT_LEVELS)[keyof typeof MARKETING_ANALYTICS_TYPE.ENGAGEMENT_LEVELS];

// Marketing Analytics Sentiment Types
export type MarketingAnalyticsSentimentType =
  (typeof MARKETING_ANALYTICS_TYPE.SENTIMENT_TYPES)[keyof typeof MARKETING_ANALYTICS_TYPE.SENTIMENT_TYPES];

// Marketing Analytics Analysis Type Labels
export function getMarketingAnalyticsAnalysisTypeLabel(
  type: MarketingAnalyticsAnalysisType
): string {
  const labels: Record<MarketingAnalyticsAnalysisType, string> = {
    [MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.CAMPAIGN_ANALYSIS]: 'Campaign Analysis',
    [MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.CAMPAIGN_PERFORMANCE]: 'Campaign Performance',
    [MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.CAMPAIGN_ROI]: 'Campaign ROI',
    [MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.CAMPAIGN_ENGAGEMENT]: 'Campaign Engagement',
    [MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.CHANNEL_ANALYSIS]: 'Channel Analysis',
    [MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.CHANNEL_PERFORMANCE]: 'Channel Performance',
    [MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.CHANNEL_ATTRIBUTION]: 'Channel Attribution',
    [MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.MULTI_CHANNEL]: 'Multi-Channel Analysis',
    [MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.SEO_ANALYSIS]: 'SEO Analysis',
    [MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.SEM_ANALYSIS]: 'SEM Analysis',
    [MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.SOCIAL_ANALYSIS]: 'Social Media Analysis',
    [MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.EMAIL_ANALYSIS]: 'Email Analysis',
    [MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.CONTENT_ANALYSIS]: 'Content Analysis',
    [MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.BRAND_ANALYSIS]: 'Brand Analysis',
    [MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.BRAND_AWARENESS]: 'Brand Awareness',
    [MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.BRAND_SENTIMENT]: 'Brand Sentiment',
    [MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.BRAND_PERCEPTION]: 'Brand Perception',
    [MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.ACQUISITION_ANALYSIS]: 'Acquisition Analysis',
    [MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.RETENTION_ANALYSIS]: 'Retention Analysis',
    [MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.LOYALTY_ANALYSIS]: 'Loyalty Analysis',
    [MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.LIFETIME_VALUE_ANALYSIS]: 'Lifetime Value Analysis',
    [MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPETITIVE_ANALYSIS]: 'Competitive Analysis',
    [MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.MARKET_SHARE]: 'Market Share Analysis',
    [MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.BENCHMARKING]: 'Benchmarking',
    [MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE]: 'Predictive Analysis',
    [MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST]: 'Forecast',
    [MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND]: 'Trend Analysis',
  };
  return labels[type] || 'Unknown';
}

// Marketing Analytics Data Type Labels
export function getMarketingAnalyticsDataTypeLabel(type: MarketingAnalyticsDataType): string {
  const labels: Record<MarketingAnalyticsDataType, string> = {
    [MARKETING_ANALYTICS_TYPE.DATA_TYPES.CAMPAIGN_DATA]: 'Campaign Data',
    [MARKETING_ANALYTICS_TYPE.DATA_TYPES.CHANNEL_DATA]: 'Channel Data',
    [MARKETING_ANALYTICS_TYPE.DATA_TYPES.PERFORMANCE_DATA]: 'Performance Data',
    [MARKETING_ANALYTICS_TYPE.DATA_TYPES.ENGAGEMENT_DATA]: 'Engagement Data',
    [MARKETING_ANALYTICS_TYPE.DATA_TYPES.DIGITAL_MARKETING_DATA]: 'Digital Marketing Data',
    [MARKETING_ANALYTICS_TYPE.DATA_TYPES.SEO_DATA]: 'SEO Data',
    [MARKETING_ANALYTICS_TYPE.DATA_TYPES.SOCIAL_DATA]: 'Social Data',
    [MARKETING_ANALYTICS_TYPE.DATA_TYPES.EMAIL_DATA]: 'Email Data',
    [MARKETING_ANALYTICS_TYPE.DATA_TYPES.CONTENT_DATA]: 'Content Data',
    [MARKETING_ANALYTICS_TYPE.DATA_TYPES.BRAND_DATA]: 'Brand Data',
    [MARKETING_ANALYTICS_TYPE.DATA_TYPES.SENTIMENT_DATA]: 'Sentiment Data',
    [MARKETING_ANALYTICS_TYPE.DATA_TYPES.CUSTOMER_DATA]: 'Customer Data',
    [MARKETING_ANALYTICS_TYPE.DATA_TYPES.LEAD_DATA]: 'Lead Data',
    [MARKETING_ANALYTICS_TYPE.DATA_TYPES.CONVERSION_DATA]: 'Conversion Data',
    [MARKETING_ANALYTICS_TYPE.DATA_TYPES.COMPETITIVE_DATA]: 'Competitive Data',
    [MARKETING_ANALYTICS_TYPE.DATA_TYPES.MARKET_DATA]: 'Market Data',
    [MARKETING_ANALYTICS_TYPE.DATA_TYPES.TIME_SERIES]: 'Time Series',
    [MARKETING_ANALYTICS_TYPE.DATA_TYPES.AGGREGATED]: 'Aggregated',
    [MARKETING_ANALYTICS_TYPE.DATA_TYPES.RAW]: 'Raw',
  };
  return labels[type] || 'Unknown';
}

// Marketing Analytics Campaign Type Labels
export function getMarketingAnalyticsCampaignTypeLabel(
  type: MarketingAnalyticsCampaignType
): string {
  const labels: Record<MarketingAnalyticsCampaignType, string> = {
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES.BRAND_AWARENESS]: 'Brand Awareness',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES.PRODUCT_LAUNCH]: 'Product Launch',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES.SEASONAL]: 'Seasonal',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES.HOLIDAY]: 'Holiday',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES.EVENT]: 'Event',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES.DISCOUNT]: 'Discount',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES.SALE]: 'Sale',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES.FLASH_SALE]: 'Flash Sale',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES.BUNDLE]: 'Bundle',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES.SEO]: 'SEO',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES.SEM]: 'SEM',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES.SOCIAL]: 'Social Media',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES.EMAIL]: 'Email',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES.CONTENT]: 'Content',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES.DISPLAY]: 'Display',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES.VIDEO]: 'Video',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES.NATIVE]: 'Native',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES.PRINT]: 'Print',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES.TV]: 'TV',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES.RADIO]: 'Radio',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES.OUTDOOR]: 'Outdoor',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES.DIRECT_MAIL]: 'Direct Mail',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES.LEAD_GENERATION]: 'Lead Generation',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES.CONVERSION]: 'Conversion',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES.RETENTION]: 'Retention',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES.LOYALTY]: 'Loyalty',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_TYPES.REFERRAL]: 'Referral',
  };
  return labels[type] || 'Unknown';
}

// Marketing Analytics Marketing Channel Labels
export function getMarketingAnalyticsMarketingChannelLabel(
  channel: MarketingAnalyticsMarketingChannel
): string {
  const labels: Record<MarketingAnalyticsMarketingChannel, string> = {
    [MARKETING_ANALYTICS_TYPE.MARKETING_CHANNELS.ORGANIC_SEARCH]: 'Organic Search',
    [MARKETING_ANALYTICS_TYPE.MARKETING_CHANNELS.PAID_SEARCH]: 'Paid Search',
    [MARKETING_ANALYTICS_TYPE.MARKETING_CHANNELS.SOCIAL_ORGANIC]: 'Social Organic',
    [MARKETING_ANALYTICS_TYPE.MARKETING_CHANNELS.SOCIAL_PAID]: 'Social Paid',
    [MARKETING_ANALYTICS_TYPE.MARKETING_CHANNELS.DISPLAY_ADS]: 'Display Ads',
    [MARKETING_ANALYTICS_TYPE.MARKETING_CHANNELS.VIDEO_ADS]: 'Video Ads',
    [MARKETING_ANALYTICS_TYPE.MARKETING_CHANNELS.EMAIL]: 'Email',
    [MARKETING_ANALYTICS_TYPE.MARKETING_CHANNELS.SMS]: 'SMS',
    [MARKETING_ANALYTICS_TYPE.MARKETING_CHANNELS.PUSH_NOTIFICATION]: 'Push Notification',
    [MARKETING_ANALYTICS_TYPE.MARKETING_CHANNELS.TV]: 'TV',
    [MARKETING_ANALYTICS_TYPE.MARKETING_CHANNELS.RADIO]: 'Radio',
    [MARKETING_ANALYTICS_TYPE.MARKETING_CHANNELS.PRINT]: 'Print',
    [MARKETING_ANALYTICS_TYPE.MARKETING_CHANNELS.OUTDOOR]: 'Outdoor',
    [MARKETING_ANALYTICS_TYPE.MARKETING_CHANNELS.DIRECT_MAIL]: 'Direct Mail',
    [MARKETING_ANALYTICS_TYPE.MARKETING_CHANNELS.EVENT]: 'Event',
    [MARKETING_ANALYTICS_TYPE.MARKETING_CHANNELS.REFERRAL]: 'Referral',
    [MARKETING_ANALYTICS_TYPE.MARKETING_CHANNELS.AFFILIATE]: 'Affiliate',
    [MARKETING_ANALYTICS_TYPE.MARKETING_CHANNELS.INFLUENCER]: 'Influencer',
    [MARKETING_ANALYTICS_TYPE.MARKETING_CHANNELS.PARTNERSHIP]: 'Partnership',
  };
  return labels[channel] || 'Unknown';
}

// Marketing Analytics Campaign Status Labels
export function getMarketingAnalyticsCampaignStatusLabel(
  status: MarketingAnalyticsCampaignStatus
): string {
  const labels: Record<MarketingAnalyticsCampaignStatus, string> = {
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_STATUS.DRAFT]: 'Draft',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_STATUS.SCHEDULED]: 'Scheduled',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_STATUS.LIVE]: 'Live',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_STATUS.PAUSED]: 'Paused',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_STATUS.COMPLETED]: 'Completed',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_STATUS.CANCELLED]: 'Cancelled',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_STATUS.ARCHIVED]: 'Archived',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_STATUS.FAILED]: 'Failed',
  };
  return labels[status] || 'Unknown';
}

// Marketing Analytics Campaign Objective Labels
export function getMarketingAnalyticsCampaignObjectiveLabel(
  objective: MarketingAnalyticsCampaignObjective
): string {
  const labels: Record<MarketingAnalyticsCampaignObjective, string> = {
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_OBJECTIVES.AWARENESS]: 'Awareness',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_OBJECTIVES.CONSIDERATION]: 'Consideration',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_OBJECTIVES.CONVERSION]: 'Conversion',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_OBJECTIVES.RETENTION]: 'Retention',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_OBJECTIVES.LOYALTY]: 'Loyalty',
    [MARKETING_ANALYTICS_TYPE.CAMPAIGN_OBJECTIVES.ADVOCACY]: 'Advocacy',
  };
  return labels[objective] || 'Unknown';
}

// Marketing Analytics Performance Level Labels
export function getMarketingAnalyticsPerformanceLevelLabel(
  level: MarketingAnalyticsPerformanceLevel
): string {
  const labels: Record<MarketingAnalyticsPerformanceLevel, string> = {
    [MARKETING_ANALYTICS_TYPE.PERFORMANCE_LEVELS.EXCELLENT]: 'Excellent',
    [MARKETING_ANALYTICS_TYPE.PERFORMANCE_LEVELS.GOOD]: 'Good',
    [MARKETING_ANALYTICS_TYPE.PERFORMANCE_LEVELS.AVERAGE]: 'Average',
    [MARKETING_ANALYTICS_TYPE.PERFORMANCE_LEVELS.BELOW_AVERAGE]: 'Below Average',
    [MARKETING_ANALYTICS_TYPE.PERFORMANCE_LEVELS.POOR]: 'Poor',
    [MARKETING_ANALYTICS_TYPE.PERFORMANCE_LEVELS.CRITICAL]: 'Critical',
  };
  return labels[level] || 'Unknown';
}

// Marketing Analytics Engagement Level Labels
export function getMarketingAnalyticsEngagementLevelLabel(
  level: MarketingAnalyticsEngagementLevel
): string {
  const labels: Record<MarketingAnalyticsEngagementLevel, string> = {
    [MARKETING_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.VERY_HIGH]: 'Very High',
    [MARKETING_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.HIGH]: 'High',
    [MARKETING_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.MEDIUM]: 'Medium',
    [MARKETING_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.LOW]: 'Low',
    [MARKETING_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.VERY_LOW]: 'Very Low',
    [MARKETING_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.NONE]: 'None',
  };
  return labels[level] || 'Unknown';
}

// Marketing Analytics Sentiment Type Labels
export function getMarketingAnalyticsSentimentTypeLabel(
  type: MarketingAnalyticsSentimentType
): string {
  const labels: Record<MarketingAnalyticsSentimentType, string> = {
    [MARKETING_ANALYTICS_TYPE.SENTIMENT_TYPES.VERY_POSITIVE]: 'Very Positive',
    [MARKETING_ANALYTICS_TYPE.SENTIMENT_TYPES.POSITIVE]: 'Positive',
    [MARKETING_ANALYTICS_TYPE.SENTIMENT_TYPES.NEUTRAL]: 'Neutral',
    [MARKETING_ANALYTICS_TYPE.SENTIMENT_TYPES.NEGATIVE]: 'Negative',
    [MARKETING_ANALYTICS_TYPE.SENTIMENT_TYPES.VERY_NEGATIVE]: 'Very Negative',
  };
  return labels[type] || 'Unknown';
}

// Check if analysis is campaign analysis
export function isMarketingAnalyticsCampaignAnalysis(
  type: MarketingAnalyticsAnalysisType
): boolean {
  const campaignTypes: MarketingAnalyticsAnalysisType[] = [
    MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.CAMPAIGN_ANALYSIS,
    MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.CAMPAIGN_PERFORMANCE,
    MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.CAMPAIGN_ROI,
    MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.CAMPAIGN_ENGAGEMENT,
  ];
  return campaignTypes.includes(type);
}

// Check if analysis is digital marketing
export function isMarketingAnalyticsDigitalMarketing(
  type: MarketingAnalyticsAnalysisType
): boolean {
  const digitalTypes: MarketingAnalyticsAnalysisType[] = [
    MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.SEO_ANALYSIS,
    MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.SEM_ANALYSIS,
    MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.SOCIAL_ANALYSIS,
    MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.EMAIL_ANALYSIS,
    MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.CONTENT_ANALYSIS,
  ];
  return digitalTypes.includes(type);
}

// Check if analysis is brand analysis
export function isMarketingAnalyticsBrandAnalysis(type: MarketingAnalyticsAnalysisType): boolean {
  const brandTypes: MarketingAnalyticsAnalysisType[] = [
    MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.BRAND_ANALYSIS,
    MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.BRAND_AWARENESS,
    MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.BRAND_SENTIMENT,
    MARKETING_ANALYTICS_TYPE.ANALYSIS_TYPES.BRAND_PERCEPTION,
  ];
  return brandTypes.includes(type);
}

// Get performance level from score
export function getMarketingAnalyticsPerformanceLevel(
  score: number
): MarketingAnalyticsPerformanceLevel {
  if (score >= 90) return MARKETING_ANALYTICS_TYPE.PERFORMANCE_LEVELS.EXCELLENT;
  if (score >= 70) return MARKETING_ANALYTICS_TYPE.PERFORMANCE_LEVELS.GOOD;
  if (score >= 50) return MARKETING_ANALYTICS_TYPE.PERFORMANCE_LEVELS.AVERAGE;
  if (score >= 30) return MARKETING_ANALYTICS_TYPE.PERFORMANCE_LEVELS.BELOW_AVERAGE;
  if (score >= 10) return MARKETING_ANALYTICS_TYPE.PERFORMANCE_LEVELS.POOR;
  return MARKETING_ANALYTICS_TYPE.PERFORMANCE_LEVELS.CRITICAL;
}

// Get engagement level from rate
export function getMarketingAnalyticsEngagementLevel(
  rate: number
): MarketingAnalyticsEngagementLevel {
  if (rate > 0.8) return MARKETING_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.VERY_HIGH;
  if (rate > 0.6) return MARKETING_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.HIGH;
  if (rate > 0.4) return MARKETING_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.MEDIUM;
  if (rate > 0.2) return MARKETING_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.LOW;
  if (rate > 0.01) return MARKETING_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.VERY_LOW;
  return MARKETING_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.NONE;
}

// Get sentiment type from score
export function getMarketingAnalyticsSentimentType(score: number): MarketingAnalyticsSentimentType {
  if (score > 0.8) return MARKETING_ANALYTICS_TYPE.SENTIMENT_TYPES.VERY_POSITIVE;
  if (score > 0.3) return MARKETING_ANALYTICS_TYPE.SENTIMENT_TYPES.POSITIVE;
  if (score > -0.3) return MARKETING_ANALYTICS_TYPE.SENTIMENT_TYPES.NEUTRAL;
  if (score > -0.8) return MARKETING_ANALYTICS_TYPE.SENTIMENT_TYPES.NEGATIVE;
  return MARKETING_ANALYTICS_TYPE.SENTIMENT_TYPES.VERY_NEGATIVE;
}
