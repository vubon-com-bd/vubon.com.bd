/**
 * @fileoverview Customer analytics exports
 * @package @vubun/shared-constants
 */

// External libraries - none needed for exports

// Shared packages - none needed for exports

// Project files
export {
  // Enums
  CustomerAnalyticsMetric,
  CustomerAnalyticsMetricType,
  CustomerAnalyticsMetricFormat,
  // Constants
  CUSTOMER_ANALYTICS_METRIC_CATEGORY_MAP,
  CUSTOMER_ANALYTICS_METRIC_CONFIG,
  CUSTOMER_DASHBOARD_METRICS,
  CUSTOMER_VALUE_METRICS,
  CUSTOMER_SATISFACTION_METRICS,
  CUSTOMER_ENGAGEMENT_METRICS,
  CUSTOMER_DISTRIBUTION_METRICS,
  // Functions
  getCustomerMetricCategory,
  getCustomerMetricLabel,
  getCustomerMetricDescription,
  getCustomerMetricFormat,
  isCustomerMetricReversed,
  getCustomerMetricsByCategory,
  formatCustomerMetricValue,
  getCustomerMetricPriority,
  getHighPriorityCustomerMetrics,
  getCustomerMetricThreshold,
  evaluateCustomerMetricPerformance,
} from './customer-analytics-metric.constants';

// Re-export from customer-analytics-type.constants
export {
  // Enums
  CustomerAnalyticsType,
  CustomerAnalyticsCategory,
  CustomerAnalyticsTypeStatus,
  CustomerAnalyticsSubCategory,
  // Constants
  CUSTOMER_ANALYTICS_TYPE_CATEGORY_MAP,
  CUSTOMER_ANALYTICS_TYPE_CONFIG,
  CUSTOMER_ANALYTICS_TYPE_DEFAULT_STATUS,
  CUSTOMER_ANALYTICS_PRIORITY_LEVELS,
  CUSTOMER_ANALYTICS_TYPE_SUB_CATEGORY_MAP,
  // Functions
  getCustomerAnalyticsTypeLabel,
  getCustomerAnalyticsTypeDescription,
  getCustomerAnalyticsTypeCategory,
  getCustomerAnalyticsTypesByCategory,
  customerAnalyticsTypeRequiresCustomerId,
  isCustomerAnalyticsTypeRealtime,
  getCustomerAnalyticsTypePriority,
  getCustomerAnalyticsTypeStatus,
  setCustomerAnalyticsTypeStatus,
  getCustomerAnalyticsTypesByPriority,
  getCriticalCustomerAnalyticsTypes,
  getCustomerAnalyticsTypeSubCategory,
  getCustomerAnalyticsTypesBySubCategory,
} from './customer-analytics-type.constants';

// Re-export from customer-analytics.constants
export {
  // Enums
  CustomerStatus,
  // Constants
  DEFAULT_CUSTOMER_SEGMENTATION_THRESHOLDS,
  DEFAULT_CLV_CALCULATION_SETTINGS,
  DEFAULT_CUSTOMER_CHURN_ALERT_SETTINGS,
  DEFAULT_CUSTOMER_SATISFACTION_SURVEY_SETTINGS,
  DEFAULT_CUSTOMER_LOYALTY_PROGRAM_SETTINGS,
  DEFAULT_CUSTOMER_CAMPAIGN_TARGETING_SETTINGS,
  DEFAULT_CUSTOMER_DATA_PRIVACY_SETTINGS,
  DEFAULT_CUSTOMER_PREFERENCE_TRACKING_SETTINGS,
  DEFAULT_CUSTOMER_SUPPORT_TIER_SETTINGS,
  DEFAULT_CUSTOMER_ONBOARDING_MILESTONES,
  CUSTOMER_ANALYTICS_CONFIG,
  // Functions
  getCustomerStatusLabel,
} from './customer-analytics.constants';

// Types - Import from customer-analytics.constants
export type {
  CustomerSegmentationThresholds,
  CLVCalculationSettings,
  CustomerChurnAlertSettings,
  CustomerSatisfactionSurveySettings,
  CustomerLoyaltyProgramSettings,
  CustomerCampaignTargetingSettings,
  CustomerDataPrivacySettings,
  CustomerPreferenceTrackingSettings,
  CustomerSupportTierSettings,
  CustomerOnboardingMilestones,
} from './customer-analytics.constants';

// Import CustomerAnalyticsTypeConfig from customer-analytics-type.constants
export type { CustomerAnalyticsTypeConfig } from './customer-analytics-type.constants';

// Import CustomerAnalyticsMetricConfig from customer-analytics-metric.constants
export type { CustomerAnalyticsMetricConfig } from './customer-analytics-metric.constants';
