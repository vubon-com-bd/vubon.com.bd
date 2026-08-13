/**
 * @fileoverview Performance analytics exports
 * @package @vubun/shared-constants
 */

// External libraries - none needed for exports

// Shared packages - none needed for exports

// Project files
export {
  // Enums
  PerformanceAnalyticsMetric,
  PerformanceAnalyticsMetricType,
  PerformanceAnalyticsMetricFormat,
  // Constants
  PERFORMANCE_ANALYTICS_METRIC_CATEGORY_MAP,
  PERFORMANCE_ANALYTICS_METRIC_CONFIG,
  PERFORMANCE_DASHBOARD_METRICS,
  WEB_PERFORMANCE_METRICS,
  SERVER_PERFORMANCE_METRICS,
  INFRASTRUCTURE_PERFORMANCE_METRICS,
  // Functions
  getPerformanceMetricCategory,
  getPerformanceMetricLabel,
  getPerformanceMetricDescription,
  getPerformanceMetricFormat,
  isPerformanceMetricReversed,
  getPerformanceMetricsByCategory,
  formatPerformanceMetricValue,
  getPerformanceMetricPriority,
  getHighPriorityPerformanceMetrics,
  getPerformanceMetricThreshold,
  evaluatePerformanceMetricPerformance,
} from './performance-analytics-metric.constants';

// Re-export from performance-analytics-type.constants
export {
  // Enums
  PerformanceAnalyticsType,
  PerformanceAnalyticsCategory,
  PerformanceAnalyticsTypeStatus,
  PerformanceAnalyticsSubCategory,
  // Constants
  PERFORMANCE_ANALYTICS_TYPE_CATEGORY_MAP,
  PERFORMANCE_ANALYTICS_TYPE_CONFIG,
  PERFORMANCE_ANALYTICS_TYPE_DEFAULT_STATUS,
  PERFORMANCE_ANALYTICS_PRIORITY_LEVELS,
  PERFORMANCE_ANALYTICS_TYPE_SUB_CATEGORY_MAP,
  // Functions
  getPerformanceAnalyticsTypeLabel,
  getPerformanceAnalyticsTypeDescription,
  getPerformanceAnalyticsTypeCategory,
  getPerformanceAnalyticsTypesByCategory,
  performanceAnalyticsTypeRequiresServiceId,
  isPerformanceAnalyticsTypeRealtime,
  getPerformanceAnalyticsTypePriority,
  getPerformanceAnalyticsTypeStatus,
  setPerformanceAnalyticsTypeStatus,
  getPerformanceAnalyticsTypesByPriority,
  getCriticalPerformanceAnalyticsTypes,
  getPerformanceAnalyticsTypeSubCategory,
  getPerformanceAnalyticsTypesBySubCategory,
} from './performance-analytics-type.constants';

// Re-export from performance-analytics.constants
export {
  // Enums
  PerformanceEventType,
  // Constants
  DEFAULT_PERFORMANCE_THRESHOLDS,
  DEFAULT_RESPONSE_TIME_ALERT_SETTINGS,
  DEFAULT_SYSTEM_UPTIME_TARGETS,
  DEFAULT_ERROR_RATE_THRESHOLDS,
  DEFAULT_RESOURCE_UTILIZATION_LIMITS,
  DEFAULT_CACHE_HIT_RATE_TARGETS,
  DEFAULT_DATABASE_QUERY_TIMEOUT_SETTINGS,
  DEFAULT_API_RATE_LIMIT_SETTINGS,
  DEFAULT_SERVER_CAPACITY_PLANNING_SETTINGS,
  DEFAULT_LOAD_BALANCING_SETTINGS,
  PERFORMANCE_ANALYTICS_CONFIG,
  PERFORMANCE_EVENT_CONFIG,
  // Functions
  getPerformanceEventLabel,
  isPerformanceEventCritical,
} from './performance-analytics.constants';

// Types - Import from performance-analytics.constants
export type {
  PerformanceThresholds,
  ResponseTimeAlertSettings,
  SystemUptimeTargets,
  ErrorRateThresholds,
  ResourceUtilizationLimits,
  CacheHitRateTargets,
  DatabaseQueryTimeoutSettings,
  APIRateLimitSettings,
  ServerCapacityPlanningSettings,
  LoadBalancingSettings,
} from './performance-analytics.constants';

// Import PerformanceAnalyticsTypeConfig from performance-analytics-type.constants
export type { PerformanceAnalyticsTypeConfig } from './performance-analytics-type.constants';

// Import PerformanceAnalyticsMetricConfig from performance-analytics-metric.constants
export type { PerformanceAnalyticsMetricConfig } from './performance-analytics-metric.constants';
