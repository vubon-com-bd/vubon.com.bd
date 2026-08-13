/**
 * @fileoverview Marketing analytics exports
 * @package @vubun/shared-constants
 */

// External libraries - none needed for exports

// Shared packages - none needed for exports

// Project files
export {
  // Enums
  MarketingAnalyticsMetric,
  MarketingAnalyticsMetricType,
  MarketingAnalyticsMetricFormat,
  // Constants
  MARKETING_ANALYTICS_METRIC_CATEGORY_MAP,
  MARKETING_ANALYTICS_METRIC_CONFIG,
  MARKETING_DASHBOARD_METRICS,
  MARKETING_CAMPAIGN_METRICS,
  MARKETING_FINANCIAL_METRICS,
  MARKETING_ENGAGEMENT_METRICS,
  MARKETING_LEAD_METRICS,
  MARKETING_BRAND_METRICS,
  // Functions
  getMarketingMetricCategory,
  getMarketingMetricLabel,
  getMarketingMetricDescription,
  getMarketingMetricFormat,
  isMarketingMetricReversed,
  getMarketingMetricsByCategory,
  formatMarketingMetricValue,
  getMarketingMetricPriority,
  getHighPriorityMarketingMetrics,
  getMarketingMetricThreshold,
  evaluateMarketingMetricPerformance,
} from './marketing-analytics-metric.constants';

// Re-export from marketing-analytics-type.constants
export {
  // Enums
  MarketingAnalyticsType,
  MarketingAnalyticsCategory,
  MarketingAnalyticsTypeStatus,
  MarketingAnalyticsSubCategory,
  // Constants
  MARKETING_ANALYTICS_TYPE_CATEGORY_MAP,
  MARKETING_ANALYTICS_TYPE_CONFIG,
  MARKETING_ANALYTICS_TYPE_DEFAULT_STATUS,
  MARKETING_ANALYTICS_PRIORITY_LEVELS,
  MARKETING_ANALYTICS_TYPE_SUB_CATEGORY_MAP,
  // Functions
  getMarketingAnalyticsTypeLabel,
  getMarketingAnalyticsTypeDescription,
  getMarketingAnalyticsTypeCategory,
  getMarketingAnalyticsTypesByCategory,
  marketingAnalyticsTypeRequiresCampaignId,
  isMarketingAnalyticsTypeRealtime,
  getMarketingAnalyticsTypePriority,
  getMarketingAnalyticsTypeStatus,
  setMarketingAnalyticsTypeStatus,
  getMarketingAnalyticsTypesByPriority,
  getCriticalMarketingAnalyticsTypes,
  getMarketingAnalyticsTypeSubCategory,
  getMarketingAnalyticsTypesBySubCategory,
} from './marketing-analytics-type.constants';

// Re-export from marketing-analytics.constants
export {
  // Enums
  MarketingChannelPriority,
  MarketingChannel,
  ConversionFunnelStage,
  // Constants
  MARKETING_CHANNEL_CONFIG,
  DEFAULT_CAMPAIGN_BUDGET_THRESHOLDS,
  CONVERSION_FUNNEL_STAGE_CONFIG,
  DEFAULT_MARKETING_AUTOMATION_SETTINGS,
  DEFAULT_SOCIAL_MEDIA_TRACKING_SETTINGS,
  DEFAULT_EMAIL_MARKETING_SETTINGS,
  DEFAULT_SEO_PARAMETERS,
  DEFAULT_PAID_ADVERTISING_SETTINGS,
  DEFAULT_MARKETING_ROI_THRESHOLDS,
  DEFAULT_BRAND_AWARENESS_METRICS,
  MARKETING_ANALYTICS_CONFIG,
  // Functions
  getMarketingChannelLabel,
  getMarketingChannelPriority,
  getMarketingChannelROI,
  getMarketingChannelColor,
  getFunnelStageLabel,
  getFunnelStageConversionRate,
} from './marketing-analytics.constants';

// Types - Import from marketing-analytics.constants
export type {
  CampaignBudgetThresholds,
  MarketingAutomationSettings,
  SocialMediaTrackingSettings,
  EmailMarketingSettings,
  SEOParameters,
  PaidAdvertisingSettings,
  MarketingROIThresholds,
  BrandAwarenessMetrics,
} from './marketing-analytics.constants';

// Import MarketingAnalyticsTypeConfig from marketing-analytics-type.constants
export type { MarketingAnalyticsTypeConfig } from './marketing-analytics-type.constants';

// Import MarketingAnalyticsMetricConfig from marketing-analytics-metric.constants
export type { MarketingAnalyticsMetricConfig } from './marketing-analytics-metric.constants';
