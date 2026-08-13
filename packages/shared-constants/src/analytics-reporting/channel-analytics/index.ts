/**
 * @fileoverview Channel analytics exports
 * @package @vubun/shared-constants
 */

// External libraries - none needed for exports

// Shared packages - none needed for exports

// Project files
export {
  // Enums
  ChannelAnalyticsMetric,
  ChannelAnalyticsMetricType,
  ChannelAnalyticsMetricFormat,
  // Constants
  CHANNEL_ANALYTICS_METRIC_CATEGORY_MAP,
  CHANNEL_ANALYTICS_METRIC_CONFIG,
  CHANNEL_DASHBOARD_METRICS,
  CHANNEL_REVENUE_METRICS,
  CHANNEL_CUSTOMER_METRICS,
  CHANNEL_ENGAGEMENT_METRICS,
  CHANNEL_PERFORMANCE_METRICS,
  // Functions
  getChannelMetricCategory,
  getChannelMetricLabel,
  getChannelMetricDescription,
  getChannelMetricFormat,
  isChannelMetricReversed,
  getChannelMetricsByCategory,
  formatChannelMetricValue,
  getChannelMetricPriority,
  getHighPriorityChannelMetrics,
  getChannelMetricThreshold,
  evaluateChannelMetricPerformance,
} from './channel-analytics-metric.constants';

// Re-export from channel-analytics-type.constants
export {
  // Enums
  ChannelAnalyticsType,
  ChannelAnalyticsCategory,
  ChannelAnalyticsTypeStatus,
  ChannelAnalyticsSubCategory,
  // Constants
  CHANNEL_ANALYTICS_TYPE_CATEGORY_MAP,
  CHANNEL_ANALYTICS_TYPE_CONFIG,
  CHANNEL_ANALYTICS_TYPE_DEFAULT_STATUS,
  CHANNEL_ANALYTICS_PRIORITY_LEVELS,
  CHANNEL_ANALYTICS_TYPE_SUB_CATEGORY_MAP,
  // Functions
  getChannelAnalyticsTypeLabel,
  getChannelAnalyticsTypeDescription,
  getChannelAnalyticsTypeCategory,
  getChannelAnalyticsTypesByCategory,
  channelAnalyticsTypeRequiresChannelId,
  isChannelAnalyticsTypeRealtime,
  getChannelAnalyticsTypePriority,
  getChannelAnalyticsTypeStatus,
  setChannelAnalyticsTypeStatus,
  getChannelAnalyticsTypesByPriority,
  getCriticalChannelAnalyticsTypes,
  getChannelAnalyticsTypeSubCategory,
  getChannelAnalyticsTypesBySubCategory,
} from './channel-analytics-type.constants';

// Re-export from channel-analytics.constants
export {
  // Enums
  ChannelCategory,
  // Constants
  DEFAULT_CHANNEL_PERFORMANCE_BENCHMARK,
  DEFAULT_CHANNEL_ATTRIBUTION_MODEL_SETTINGS,
  DEFAULT_CHANNEL_COST_ALLOCATION_SETTINGS,
  DEFAULT_CHANNEL_CONVERSION_THRESHOLDS,
  DEFAULT_CHANNEL_ROI_CALCULATION_SETTINGS,
  DEFAULT_CHANNEL_SYNERGY_SETTINGS,
  DEFAULT_CHANNEL_COMPETITION_SETTINGS,
  DEFAULT_CHANNEL_CUSTOMER_PREFERENCE_TRACKING,
  DEFAULT_CHANNEL_TREND_DETECTION_SETTINGS,
  CHANNEL_ANALYTICS_CONFIG,
  // Functions
  getChannelCategoryLabel,
} from './channel-analytics.constants';

// Types - Import from channel-analytics.constants
export type {
  ChannelPerformanceBenchmark,
  ChannelAttributionModelSettings,
  ChannelCostAllocationSettings,
  ChannelConversionThresholds,
  ChannelROICalculationSettings,
  ChannelSynergySettings,
  ChannelCompetitionSettings,
  ChannelCustomerPreferenceTracking,
  ChannelTrendDetectionSettings,
} from './channel-analytics.constants';

// Import ChannelAnalyticsTypeConfig from channel-analytics-type.constants
export type { ChannelAnalyticsTypeConfig } from './channel-analytics-type.constants';

// Import ChannelAnalyticsMetricConfig from channel-analytics-metric.constants
export type { ChannelAnalyticsMetricConfig } from './channel-analytics-metric.constants';
