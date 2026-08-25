/**
 * Admin Analytics Constants Index
 * Export all admin analytics constants for easy importing
 */

// Core Analytics Constants
export {
  ADMIN_ANALYTICS,
  ADMIN_ANALYTICS_METRIC_LABELS,
  ADMIN_ANALYTICS_DIMENSION_LABELS,
  ADMIN_ANALYTICS_AGGREGATION_LABELS,
  ADMIN_ANALYTICS_PERIOD_LABELS,
  ADMIN_ANALYTICS_STATUS_LABELS,
  ADMIN_ANALYTICS_STATUS_COLORS,
  ADMIN_ANALYTICS_TYPE_LABELS,
  ADMIN_ANALYTICS_SOURCE_LABELS,
  ADMIN_ANALYTICS_CATEGORY_LABELS,
  AdminAnalyticsMetric,
  AdminAnalyticsDimension,
  AdminAnalyticsAggregation,
  AdminAnalyticsPeriod,
  AdminAnalyticsStatus,
  AdminAnalyticsType,
  AdminAnalyticsSource,
  AdminAnalyticsCategory,
  getAdminAnalyticsMetricLabel,
  getAdminAnalyticsDimensionLabel,
  getAdminAnalyticsAggregationLabel,
  getAdminAnalyticsPeriodLabel,
  getAdminAnalyticsStatusLabel,
  getAdminAnalyticsStatusColor,
  // getAdminAnalyticsTypeLabel সরানো হয়েছে (নিচে type থেকে নেওয়া হবে)
  getAdminAnalyticsSourceLabel,
  getAdminAnalyticsCategoryLabel,
  isAnalyticsCompleted,
  isAnalyticsProcessing,
  isAnalyticsFailed,
  isAnalyticsPending,
  getAdminAnalyticsTimeout,
  getAdminAnalyticsRetention,
} from './admin-analytics.constants';

// Analytics Type Constants
export {
  ADMIN_ANALYTICS_TYPE_CATEGORIES,
  ADMIN_ANALYTICS_TYPE_LABELS_DETAIL,
  ADMIN_ANALYTICS_TYPE_DESCRIPTIONS,
  ADMIN_ANALYTICS_TYPE_ICONS,
  AdminAnalyticsTypeDetail,
  getAdminAnalyticsTypeCategory,
  getAdminAnalyticsTypeLabel,
  getAdminAnalyticsTypeDescription,
  getAdminAnalyticsTypeIcon,
  isUserAnalytics,
  isOrderAnalytics,
  isRevenueAnalytics,
  isProductAnalytics,
  isInventoryAnalytics,
  isSupportAnalytics,
  isMarketingAnalytics,
  isSalesAnalytics,
  isPerformanceAnalytics,
} from './admin-analytics-type.constants';

// Analytics Status Constants
export {
  ADMIN_ANALYTICS_STATUS,
  ADMIN_ANALYTICS_STATUS_LABELS_DETAIL,
  ADMIN_ANALYTICS_STATUS_COLORS_DETAIL,
  ADMIN_ANALYTICS_STATUS_GROUPS,
  AdminAnalyticsStatusDetail,
  getAdminAnalyticsStatusLabel as getAdminAnalyticsStatusLabelDetail,
  getAdminAnalyticsStatusColor as getAdminAnalyticsStatusColorDetail,
  isAdminAnalyticsActiveStatus,
  isAdminAnalyticsCompletedStatus,
  isAdminAnalyticsFailedStatus,
  isAdminAnalyticsTerminalStatus,
  getAdminAnalyticsStatusPriority,
  getAdminAnalyticsStatuses,
  getAdminAnalyticsActiveStatuses,
  getAdminAnalyticsCompletedStatuses,
  getAdminAnalyticsFailedStatuses,
  getAdminAnalyticsTerminalStatuses,
} from './admin-analytics-status.constants';
