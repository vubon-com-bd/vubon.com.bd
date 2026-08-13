/**
 * @fileoverview Engagement analytics exports
 * @package @vubun/shared-constants
 */

// External libraries - none needed for exports

// Shared packages - none needed for exports

// Project files
export {
  // Enums
  EngagementAnalyticsMetric,
  EngagementAnalyticsMetricType,
  EngagementAnalyticsMetricFormat,
  // Constants
  ENGAGEMENT_ANALYTICS_METRIC_CATEGORY_MAP,
  ENGAGEMENT_ANALYTICS_METRIC_CONFIG,
  ENGAGEMENT_DASHBOARD_METRICS,
  ENGAGEMENT_CHANNEL_METRICS,
  ENGAGEMENT_SOCIAL_METRICS,
  ENGAGEMENT_BEHAVIORAL_METRICS,
  // Functions
  getEngagementMetricCategory,
  getEngagementMetricLabel,
  getEngagementMetricDescription,
  getEngagementMetricFormat,
  isEngagementMetricReversed,
  getEngagementMetricsByCategory,
  formatEngagementMetricValue,
  getEngagementMetricPriority,
  getHighPriorityEngagementMetrics,
  getEngagementMetricThreshold,
  evaluateEngagementMetricPerformance,
} from './engagement-analytics-metric.constants';

// Re-export from engagement-analytics-type.constants
export {
  // Enums
  EngagementAnalyticsType,
  EngagementAnalyticsCategory,
  EngagementAnalyticsTypeStatus,
  EngagementAnalyticsSubCategory,
  // Constants
  ENGAGEMENT_ANALYTICS_TYPE_CATEGORY_MAP,
  ENGAGEMENT_ANALYTICS_TYPE_CONFIG,
  ENGAGEMENT_ANALYTICS_TYPE_DEFAULT_STATUS,
  ENGAGEMENT_ANALYTICS_PRIORITY_LEVELS,
  ENGAGEMENT_ANALYTICS_TYPE_SUB_CATEGORY_MAP,
  // Functions
  getEngagementAnalyticsTypeLabel,
  getEngagementAnalyticsTypeDescription,
  getEngagementAnalyticsTypeCategory,
  getEngagementAnalyticsTypesByCategory,
  engagementAnalyticsTypeRequiresUserId,
  isEngagementAnalyticsTypeRealtime,
  getEngagementAnalyticsTypePriority,
  getEngagementAnalyticsTypeStatus,
  setEngagementAnalyticsTypeStatus,
  getEngagementAnalyticsTypesByPriority,
  getCriticalEngagementAnalyticsTypes,
  getEngagementAnalyticsTypeSubCategory,
  getEngagementAnalyticsTypesBySubCategory,
} from './engagement-analytics-type.constants';

// Re-export from engagement-analytics.constants
export {
  // Constants
  DEFAULT_ENGAGEMENT_SCORE_SETTINGS,
  DEFAULT_INTERACTION_WEIGHT_SETTINGS,
  DEFAULT_SESSION_THRESHOLD_SETTINGS,
  DEFAULT_CONTENT_ENGAGEMENT_SETTINGS,
  DEFAULT_SOCIAL_ENGAGEMENT_SETTINGS,
  DEFAULT_EMAIL_ENGAGEMENT_SETTINGS,
  DEFAULT_NOTIFICATION_ENGAGEMENT_SETTINGS,
  DEFAULT_GAMIFICATION_SETTINGS,
  DEFAULT_LOYALTY_POINT_SYSTEM,
  DEFAULT_ENGAGEMENT_TRIGGER_SETTINGS,
  ENGAGEMENT_ANALYTICS_CONFIG,
  // Functions
  calculateEngagementScore,
} from './engagement-analytics.constants';

// Types - Import from engagement-analytics.constants
export type {
  EngagementScoreSettings,
  InteractionWeightSettings,
  SessionThresholdSettings,
  ContentEngagementSettings,
  SocialEngagementSettings,
  EmailEngagementSettings,
  NotificationEngagementSettings,
  GamificationSettings,
  LoyaltyPointSystem,
  EngagementTriggerSettings,
} from './engagement-analytics.constants';

// Import EngagementAnalyticsTypeConfig from engagement-analytics-type.constants
export type { EngagementAnalyticsTypeConfig } from './engagement-analytics-type.constants';

// Import EngagementAnalyticsMetricConfig from engagement-analytics-metric.constants
export type { EngagementAnalyticsMetricConfig } from './engagement-analytics-metric.constants';
