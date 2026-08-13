/**
 * @fileoverview Acquisition analytics exports
 * @package @vubun/shared-constants
 */

// External libraries - none needed for exports

// Shared packages - none needed for exports

// Project files
export {
  // Enums
  AcquisitionAnalyticsMetric,
  AcquisitionAnalyticsMetricType,
  AcquisitionAnalyticsMetricFormat,
  // Constants
  ACQUISITION_ANALYTICS_METRIC_CATEGORY_MAP,
  ACQUISITION_ANALYTICS_METRIC_CONFIG,
  ACQUISITION_DASHBOARD_METRICS,
  ACQUISITION_LEAD_METRICS,
  ACQUISITION_CONVERSION_METRICS,
  ACQUISITION_EFFICIENCY_METRICS,
  // Functions
  getAcquisitionMetricCategory,
  getAcquisitionMetricLabel,
  getAcquisitionMetricDescription,
  getAcquisitionMetricFormat,
  isAcquisitionMetricReversed,
  getAcquisitionMetricsByCategory,
  formatAcquisitionMetricValue,
  getAcquisitionMetricPriority,
  getHighPriorityAcquisitionMetrics,
  getAcquisitionMetricThreshold,
  evaluateAcquisitionMetricPerformance,
} from './acquisition-analytics-metric.constants';

// Re-export from acquisition-analytics-type.constants
export {
  // Enums
  AcquisitionAnalyticsType,
  AcquisitionAnalyticsCategory,
  AcquisitionAnalyticsTypeStatus,
  AcquisitionAnalyticsSubCategory,
  // Constants
  ACQUISITION_ANALYTICS_TYPE_CATEGORY_MAP,
  ACQUISITION_ANALYTICS_TYPE_CONFIG,
  ACQUISITION_ANALYTICS_TYPE_DEFAULT_STATUS,
  ACQUISITION_ANALYTICS_PRIORITY_LEVELS,
  ACQUISITION_ANALYTICS_TYPE_SUB_CATEGORY_MAP,
  // Functions
  getAcquisitionAnalyticsTypeLabel,
  getAcquisitionAnalyticsTypeDescription,
  getAcquisitionAnalyticsTypeCategory,
  getAcquisitionAnalyticsTypesByCategory,
  acquisitionAnalyticsTypeRequiresCampaignId,
  isAcquisitionAnalyticsTypeRealtime,
  getAcquisitionAnalyticsTypePriority,
  getAcquisitionAnalyticsTypeStatus,
  setAcquisitionAnalyticsTypeStatus,
  getAcquisitionAnalyticsTypesByPriority,
  getCriticalAcquisitionAnalyticsTypes,
  getAcquisitionAnalyticsTypeSubCategory,
  getAcquisitionAnalyticsTypesBySubCategory,
} from './acquisition-analytics-type.constants';

// Re-export from acquisition-analytics.constants
export {
  // Enums
  AcquisitionChannelPriority,
  AcquisitionChannel,
  // Constants
  ACQUISITION_CHANNEL_CONFIG,
  DEFAULT_CONVERSION_FUNNEL_THRESHOLDS,
  DEFAULT_LEAD_QUALIFICATION_SETTINGS,
  DEFAULT_ACQUISITION_COST_BUDGET_SETTINGS,
  DEFAULT_TRACKING_COOKIE_LIFETIME_SETTINGS,
  DEFAULT_CONVERSION_TRACKING_WINDOW_SETTINGS,
  DEFAULT_ATTRIBUTION_MODEL_SETTINGS,
  DEFAULT_ACQUISITION_CAMPAIGN_SETTINGS,
  DEFAULT_LEAD_SCORING_SETTINGS,
  DEFAULT_ACQUISITION_ROI_THRESHOLDS,
  ACQUISITION_ANALYTICS_CONFIG,
  // Functions
  getAcquisitionChannelLabel,
  getAcquisitionChannelPriority,
  getAcquisitionChannelConversionRate,
  getAcquisitionChannelCAC,
} from './acquisition-analytics.constants';

// Types - Import from acquisition-analytics.constants
export type {
  ConversionFunnelThresholds,
  LeadQualificationSettings,
  AcquisitionCostBudgetSettings,
  TrackingCookieLifetimeSettings,
  ConversionTrackingWindowSettings,
  AttributionModelSettings,
  AcquisitionCampaignSettings,
  LeadScoringSettings,
  AcquisitionROIThresholds,
} from './acquisition-analytics.constants';

// Import AcquisitionAnalyticsTypeConfig from acquisition-analytics-type.constants
export type { AcquisitionAnalyticsTypeConfig } from './acquisition-analytics-type.constants';

// Import AcquisitionAnalyticsMetricConfig from acquisition-analytics-metric.constants
export type { AcquisitionAnalyticsMetricConfig } from './acquisition-analytics-metric.constants';
