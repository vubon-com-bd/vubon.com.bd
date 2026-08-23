/**
 * Marketing Analytics Constants Index
 * Export all marketing analytics constants and types for easy importing
 */

// Marketing Analytics Main Constants
export {
  MARKETING_ANALYTICS,
  getMarketingAnalyticsStatusLabel,
  getMarketingAnalyticsEventLabel,
  getMarketingAnalyticsDimensionLabel,
  getMarketingAnalyticsSegmentLabel,
  getMarketingAnalyticsCohortLabel,
  getMarketingAnalyticsGranularityLabel,
  isMarketingAnalyticsActive,
  isMarketingAnalyticsCompleted,
  isMarketingAnalyticsFailed,
  isMarketingAnalyticsCampaignEvent,
  isMarketingAnalyticsEmailEvent,
  isMarketingAnalyticsSocialEvent,
  isMarketingAnalyticsCustomerEvent,
} from './marketing-analytics.constants';

export type {
  MarketingAnalyticsType,
  MarketingAnalyticsStatus,
  MarketingAnalyticsScope,
  MarketingAnalyticsEvent,
  MarketingAnalyticsDimension,
  MarketingAnalyticsMetric,
  MarketingAnalyticsSegment,
  MarketingAnalyticsCohort,
  MarketingAnalyticsGranularity,
} from './marketing-analytics.constants';

// Marketing Analytics Type Constants
export {
  MARKETING_ANALYTICS_TYPE,
  getMarketingAnalyticsAnalysisTypeLabel,
  getMarketingAnalyticsDataTypeLabel,
  getMarketingAnalyticsCampaignTypeLabel,
  getMarketingAnalyticsMarketingChannelLabel,
  getMarketingAnalyticsCampaignStatusLabel,
  getMarketingAnalyticsCampaignObjectiveLabel,
  getMarketingAnalyticsPerformanceLevelLabel,
  getMarketingAnalyticsEngagementLevelLabel,
  getMarketingAnalyticsSentimentTypeLabel,
  isMarketingAnalyticsCampaignAnalysis,
  isMarketingAnalyticsDigitalMarketing,
  isMarketingAnalyticsBrandAnalysis,
  getMarketingAnalyticsPerformanceLevel,
  getMarketingAnalyticsEngagementLevel,
  getMarketingAnalyticsSentimentType,
} from './marketing-analytics-type.constants';

export type {
  MarketingAnalyticsAnalysisType,
  MarketingAnalyticsDataType,
  MarketingAnalyticsCampaignType,
  MarketingAnalyticsMarketingChannel,
  MarketingAnalyticsCampaignStatus,
  MarketingAnalyticsCampaignObjective,
  MarketingAnalyticsPerformanceLevel,
  MarketingAnalyticsEngagementLevel,
  MarketingAnalyticsSentimentType,
} from './marketing-analytics-type.constants';

// Marketing Analytics Metric Constants
export {
  MARKETING_ANALYTICS_METRIC,
  getMarketingAnalyticsMetricLabel,
  getMarketingAnalyticsMetricCategoryLabel,
  getMarketingAnalyticsMetricTypeLabel,
  getMarketingAnalyticsMetricFormatLabel,
  getMarketingAnalyticsMetricPriorityLabel,
  getMarketingAnalyticsMetricCategory,
  getMarketingAnalyticsMetricType,
  getMarketingAnalyticsMetricFormat,
  calculateMarketingAnalyticsROI,
  calculateMarketingAnalyticsROAS,
  calculateMarketingAnalyticsConversionRate,
  calculateMarketingAnalyticsEngagementRate,
  calculateMarketingAnalyticsCTR,
  calculateMarketingAnalyticsRetentionRate,
  calculateMarketingAnalyticsChurnRate,
  calculateMarketingAnalyticsNPS,
} from './marketing-analytics-metric.constants';

export type {
  MarketingAnalyticsCountMetric,
  MarketingAnalyticsReachMetric,
  MarketingAnalyticsEngagementMetric,
  MarketingAnalyticsConversionMetric,
  MarketingAnalyticsROIMetric,
  MarketingAnalyticsBrandMetric,
  MarketingAnalyticsCustomerMetric,
  MarketingAnalyticsChannelMetric,
  MarketingAnalyticsTimeMetric,
  MarketingAnalyticsComparisonMetric,
  MarketingAnalyticsMetricCategory,
  MarketingAnalyticsMetricType,
  MarketingAnalyticsMetricFormat,
  MarketingAnalyticsMetricPriority,
} from './marketing-analytics-metric.constants';
