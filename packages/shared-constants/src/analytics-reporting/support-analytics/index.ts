/**
 * @fileoverview Support analytics exports
 * @package @vubun/shared-constants
 */

// External libraries - none needed for exports

// Shared packages - none needed for exports

// Project files
export {
  // Enums
  SupportAnalyticsMetric,
  SupportAnalyticsMetricType,
  SupportAnalyticsMetricFormat,
  // Constants
  SUPPORT_ANALYTICS_METRIC_CATEGORY_MAP,
  SUPPORT_ANALYTICS_METRIC_CONFIG,
  SUPPORT_DASHBOARD_METRICS,
  SUPPORT_PERFORMANCE_METRICS,
  SUPPORT_QUALITY_METRICS,
  SUPPORT_VOLUME_METRICS,
  SUPPORT_DISTRIBUTION_METRICS,
  // Functions
  getSupportMetricCategory,
  getSupportMetricLabel,
  getSupportMetricDescription,
  getSupportMetricFormat,
  isSupportMetricReversed,
  getSupportMetricsByCategory,
  formatSupportMetricValue,
  getSupportMetricPriority,
  getHighPrioritySupportMetrics,
  getSupportMetricThreshold,
  evaluateSupportMetricPerformance,
} from './support-analytics-metric.constants';

// Re-export from support-analytics-type.constants
export {
  // Enums
  SupportAnalyticsType,
  SupportAnalyticsCategory,
  SupportAnalyticsTypeStatus,
  SupportAnalyticsSubCategory,
  // Constants
  SUPPORT_ANALYTICS_TYPE_CATEGORY_MAP,
  SUPPORT_ANALYTICS_TYPE_CONFIG,
  SUPPORT_ANALYTICS_TYPE_DEFAULT_STATUS,
  SUPPORT_ANALYTICS_PRIORITY_LEVELS,
  SUPPORT_ANALYTICS_TYPE_SUB_CATEGORY_MAP,
  // Functions
  getSupportAnalyticsTypeLabel,
  getSupportAnalyticsTypeDescription,
  getSupportAnalyticsTypeCategory,
  getSupportAnalyticsTypesByCategory,
  supportAnalyticsTypeRequiresTicketId,
  isSupportAnalyticsTypeRealtime,
  getSupportAnalyticsTypePriority,
  getSupportAnalyticsTypeStatus,
  setSupportAnalyticsTypeStatus,
  getSupportAnalyticsTypesByPriority,
  getCriticalSupportAnalyticsTypes,
  getSupportAnalyticsTypeSubCategory,
  getSupportAnalyticsTypesBySubCategory,
} from './support-analytics-type.constants';

// Re-export from support-analytics.constants
export {
  // Enums
  SupportTicketPriority,
  SupportCategory,
  SupportTicketStatus,
  // Constants
  DEFAULT_SLA_TIMELINE_SETTINGS,
  DEFAULT_SUPPORT_CHANNEL_SETTINGS,
  DEFAULT_SUPPORT_AGENT_PERFORMANCE_BENCHMARK,
  DEFAULT_TICKET_ESCALATION_RULES,
  DEFAULT_SUPPORT_KNOWLEDGE_BASE_SETTINGS,
  DEFAULT_CUSTOMER_SATISFACTION_SURVEY_SETTINGS,
  DEFAULT_SUPPORT_AUTOMATION_SETTINGS,
  DEFAULT_SUPPORT_REPORTING_THRESHOLDS,
  SUPPORT_CATEGORY_CONFIG,
  SUPPORT_ANALYTICS_CONFIG,
  // Functions
  getSupportCategoryLabel,
  getSupportCategoryColor,
  getSupportCategoryAvgResolutionTime,
  getSupportTicketStatusLabel,
  getSupportTicketPriorityLabel,
} from './support-analytics.constants';

// Types - Import from support-analytics.constants
export type {
  SLATimelineSettings,
  SupportChannelSettings,
  SupportAgentPerformanceBenchmark,
  TicketEscalationRules,
  SupportKnowledgeBaseSettings,
  CustomerSatisfactionSurveySettings,
  SupportAutomationSettings,
  SupportReportingThresholds,
} from './support-analytics.constants';

// Import SupportAnalyticsTypeConfig from support-analytics-type.constants
export type { SupportAnalyticsTypeConfig } from './support-analytics-type.constants';

// Import SupportAnalyticsMetricConfig from support-analytics-metric.constants
export type { SupportAnalyticsMetricConfig } from './support-analytics-metric.constants';
