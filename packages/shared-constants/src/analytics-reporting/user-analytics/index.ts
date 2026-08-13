/**
 * @fileoverview User analytics exports
 * @package @vubun/shared-constants
 */

// External libraries - none needed for exports

// Shared packages - none needed for exports

// Project files
export {
  // Enums
  UserAnalyticsMetric,
  UserAnalyticsMetricType,
  UserAnalyticsMetricFormat,
  // Constants
  USER_ANALYTICS_METRIC_CATEGORY_MAP,
  USER_ANALYTICS_METRIC_CONFIG,
  USER_DASHBOARD_METRICS,
  USER_ACQUISITION_METRICS,
  USER_ENGAGEMENT_METRICS,
  USER_RETENTION_METRICS,
  USER_FINANCIAL_METRICS,
  USER_SATISFACTION_METRICS,
  // Functions
  getUserMetricCategory,
  getUserMetricLabel,
  getUserMetricDescription,
  getUserMetricFormat,
  isUserMetricReversed,
  getUserMetricsByCategory,
  formatUserMetricValue,
  getUserMetricPriority,
  getHighPriorityUserMetrics,
  getUserMetricThreshold,
  evaluateUserMetricPerformance,
} from './user-analytics-metric.constants';

// Re-export from user-analytics-type.constants
export {
  // Enums
  UserAnalyticsType,
  UserAnalyticsCategory,
  UserAnalyticsTypeStatus,
  UserAnalyticsSubCategory,
  // Constants
  USER_ANALYTICS_TYPE_CATEGORY_MAP,
  USER_ANALYTICS_TYPE_CONFIG,
  USER_ANALYTICS_TYPE_DEFAULT_STATUS,
  USER_ANALYTICS_PRIORITY_LEVELS,
  USER_ANALYTICS_TYPE_SUB_CATEGORY_MAP,
  // Functions
  getUserAnalyticsTypeLabel,
  getUserAnalyticsTypeDescription,
  getUserAnalyticsTypeCategory,
  getUserAnalyticsTypesByCategory,
  getIdentityAnalyticsTypes,
  getActivityAnalyticsTypes,
  getEngagementAnalyticsTypes,
  getRetentionAnalyticsTypes,
  getRevenueAnalyticsTypes,
  getSentimentAnalyticsTypes,
  getSocialAnalyticsTypes,
  getTechnicalAnalyticsTypes,
  getGrowthAnalyticsTypes,
  userAnalyticsTypeRequiresConsent,
  isUserAnalyticsTypeRealtime,
  getUserAnalyticsTypePriority,
  getUserAnalyticsTypeStatus,
  setUserAnalyticsTypeStatus,
  getUserAnalyticsTypesByPriority,
  getCriticalUserAnalyticsTypes,
  getHighPriorityUserAnalyticsTypes,
  getUserAnalyticsTypeSubCategory,
  getUserAnalyticsTypesBySubCategory,
} from './user-analytics-type.constants';

// Re-export from user-analytics.constants
export {
  // Enums
  UserLifecycleStage,
  UserEngagementLevel,
  UserAnalyticsPeriod,
  UserActivityStatus,
  UserSegmentType,
  UserAnalyticsEventType,
  UserActionWeight,
  // Constants
  DEFAULT_USER_SEGMENTATION_THRESHOLDS,
  USER_ANALYTICS_PERIOD_CONFIG,
  DEFAULT_USER_DATA_RETENTION_POLICY,
  DEFAULT_USER_TRACKING_SETTINGS,
  DEFAULT_USER_ONBOARDING_METRICS,
  USER_ANALYTICS_CONFIG,
  USER_ENGAGEMENT_SCORE_THRESHOLDS,
  USER_LIFECYCLE_DURATION_THRESHOLDS,
  DEFAULT_USER_PROFILE_UPDATE_TRACKING,
  USER_SEGMENT_CONFIG,
  DEFAULT_USER_ANALYTICS_PERIOD,
  USER_ANALYTICS_EVENT_CONFIG,
  // Functions
  getUserLifecycleStage,
  getUserEngagementLevel,
  calculateUserEngagementScore,
} from './user-analytics.constants';

// Types - Import from specific type files
export type {
  UserSegmentationThresholds,
  UserDataRetentionPolicy,
  UserTrackingSettings,
  UserOnboardingMetrics,
  UserProfileUpdateTracking,
  UserSegmentConfig,
} from './user-analytics.constants';

// Import UserAnalyticsTypeConfig from user-analytics-type.constants
export type { UserAnalyticsTypeConfig } from './user-analytics-type.constants';

// Import UserAnalyticsMetricConfig from user-analytics-metric.constants
export type { UserAnalyticsMetricConfig } from './user-analytics-metric.constants';
