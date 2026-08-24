/**
 * Notification Analytics Constants Index
 * Export all notification analytics constants and types for easy importing
 */

// Notification Analytics Constants
export {
  NOTIFICATIONANALYTICS,
  notificationanalyticsGetTypeLabel,
  notificationanalyticsGetCategoryLabel,
  notificationanalyticsGetMetricLabel,
  notificationanalyticsGetDimensionLabel,
  notificationanalyticsGetGranularityLabel,
  notificationanalyticsGetErrorLabel,
  notificationanalyticsGetDefaultMetrics,
  notificationanalyticsIsDeliveryMetric,
  notificationanalyticsIsEngagementMetric,
  notificationanalyticsIsConversionMetric,
  notificationanalyticsGetDefaultDataRetentionDays,
  notificationanalyticsGetDefaultPageSize,
} from './notification-analytics.constants';

export type {
  NotificationAnalyticsType,
  NotificationAnalyticsCategory,
  NotificationAnalyticsMetric,
  NotificationAnalyticsDimension,
  NotificationAnalyticsGranularity,
  NotificationAnalyticsDefault,
  NotificationAnalyticsLimit,
  NotificationAnalyticsError,
} from './notification-analytics.constants';

// Notification Analytics Type Constants
export {
  NOTIFICATIONANALYTICS_TYPE,
  notificationanalyticsGetCategoryLabel as notificationAnalyticsTypeGetCategoryLabel,
  notificationanalyticsGetSubTypeLabel,
  notificationanalyticsGetMethodLabel,
  notificationanalyticsGetVisualizationLabel,
  notificationanalyticsGetComplexityLabel,
  notificationanalyticsIsDeliveryCategory,
  notificationanalyticsIsEngagementCategory,
  notificationanalyticsIsConversionCategory,
  notificationanalyticsIsPerformanceCategory,
} from './notification-analytics-type.constants';

export type {
  NotificationAnalyticsCategoryType,
  NotificationAnalyticsSubType,
  NotificationAnalyticsMethod,
  NotificationAnalyticsVisualization,
  NotificationAnalyticsComplexity,
} from './notification-analytics-type.constants';
