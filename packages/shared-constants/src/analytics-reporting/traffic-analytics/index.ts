/**
 * @fileoverview Traffic analytics exports
 * @package @vubun/shared-constants
 */

// External libraries - none needed for exports

// Shared packages - none needed for exports

// Project files
export {
  // Enums
  TrafficAnalyticsMetric,
  TrafficAnalyticsMetricType,
  TrafficAnalyticsMetricFormat,
  // Constants
  TRAFFIC_ANALYTICS_METRIC_CATEGORY_MAP,
  TRAFFIC_ANALYTICS_METRIC_CONFIG,
  TRAFFIC_DASHBOARD_METRICS,
  TRAFFIC_ENGAGEMENT_METRICS,
  TRAFFIC_DISTRIBUTION_METRICS,
  TRAFFIC_SOURCE_PERFORMANCE_METRICS,
  TRAFFIC_VISITOR_METRICS,
  // Functions
  getTrafficMetricCategory,
  getTrafficMetricLabel,
  getTrafficMetricDescription,
  getTrafficMetricFormat,
  isTrafficMetricReversed,
  getTrafficMetricsByCategory,
  formatTrafficMetricValue,
  getTrafficMetricPriority,
  getHighPriorityTrafficMetrics,
  getTrafficMetricThreshold,
  evaluateTrafficMetricPerformance,
} from './traffic-analytics-metric.constants';

// Re-export from traffic-analytics-type.constants
export {
  // Enums
  TrafficAnalyticsType,
  TrafficAnalyticsCategory,
  TrafficAnalyticsTypeStatus,
  TrafficAnalyticsSubCategory,
  // Constants
  TRAFFIC_ANALYTICS_TYPE_CATEGORY_MAP,
  TRAFFIC_ANALYTICS_TYPE_CONFIG,
  TRAFFIC_ANALYTICS_TYPE_DEFAULT_STATUS,
  TRAFFIC_ANALYTICS_PRIORITY_LEVELS,
  TRAFFIC_ANALYTICS_TYPE_SUB_CATEGORY_MAP,
  // Functions
  getTrafficAnalyticsTypeLabel,
  getTrafficAnalyticsTypeDescription,
  getTrafficAnalyticsTypeCategory,
  getTrafficAnalyticsTypesByCategory,
  trafficAnalyticsTypeRequiresSourceId,
  isTrafficAnalyticsTypeRealtime,
  getTrafficAnalyticsTypePriority,
  getTrafficAnalyticsTypeStatus,
  setTrafficAnalyticsTypeStatus,
  getTrafficAnalyticsTypesByPriority,
  getCriticalTrafficAnalyticsTypes,
  getTrafficAnalyticsTypeSubCategory,
  getTrafficAnalyticsTypesBySubCategory,
} from './traffic-analytics-type.constants';

// Re-export from traffic-analytics.constants
export {
  // Enums
  TrafficSourceCategory,
  TrafficEventType,
  // Constants
  TRAFFIC_SOURCE_CONFIG,
  DEFAULT_TRAFFIC_MONITORING_SETTINGS,
  DEFAULT_TRAFFIC_THRESHOLD_ALERTS,
  DEFAULT_TRAFFIC_PATTERN_DETECTION_SETTINGS,
  DEFAULT_BOUNCE_RATE_THRESHOLDS,
  DEFAULT_SESSION_TIMEOUT_SETTINGS,
  DEFAULT_REFERRAL_TRACKING_SETTINGS,
  DEFAULT_URL_PARAMETER_TRACKING_SETTINGS,
  DEFAULT_TRAFFIC_FILTERING_RULES,
  DEFAULT_BOT_TRAFFIC_DETECTION_SETTINGS,
  TRAFFIC_ANALYTICS_CONFIG,
  // Functions
  getTrafficSourceLabel,
  getTrafficSourceColor,
  getTrafficSourceConversionRate,
  getTrafficSourceDescription,
} from './traffic-analytics.constants';

// Types - Import from traffic-analytics.constants
export type {
  TrafficMonitoringSettings,
  TrafficThresholdAlerts,
  TrafficPatternDetectionSettings,
  BounceRateThresholds,
  SessionTimeoutSettings,
  ReferralTrackingSettings,
  URLParameterTrackingSettings,
  TrafficFilteringRules,
  BotTrafficDetectionSettings,
} from './traffic-analytics.constants';

// Import TrafficAnalyticsTypeConfig from traffic-analytics-type.constants
export type { TrafficAnalyticsTypeConfig } from './traffic-analytics-type.constants';

// Import TrafficAnalyticsMetricConfig from traffic-analytics-metric.constants
export type { TrafficAnalyticsMetricConfig } from './traffic-analytics-metric.constants';
