/**
 * @fileoverview Analytics constants and types exports
 * @package @vubun/shared-constants
 */

// External libraries - none needed for exports

// Shared packages - none needed for exports

// Project files
export {
  // Enums
  AnalyticsPermission,
  AnalyticsPermissionCategory,
  AnalyticsPermissionLevel,
  // Constants
  ANALYTICS_PERMISSION_CATEGORY_MAP,
  ANALYTICS_PERMISSION_CONFIG,
  DEFAULT_ROLE_PERMISSIONS,
  // Functions
  getPermissionCategory,
  getPermissionLabel,
  getPermissionDescription,
  getPermissionDefaultLevel,
  permissionRequiresApproval,
  getPermissionsByCategory,
  getViewPermissions,
  getManagePermissions,
  getReportPermissions,
  getDashboardPermissions,
  getWidgetPermissions,
  getFilterPermissions,
  getMetricPermissions,
  getDimensionPermissions,
  getConfigPermissions,
  getUserPermissions,
  getSystemPermissions,
  getIntegrationPermissions,
  getAlertPermissions,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
} from './analytics-permission.constants';

// Re-export from analytics-error.constants
export {
  // Enums
  AnalyticsErrorCode,
  AnalyticsErrorSeverity,
  AnalyticsErrorCategory,
  // Constants
  ANALYTICS_ERROR_CONFIG,
  // Functions
  getErrorConfig,
  getErrorMessage,
  getErrorDescription,
  getErrorSeverity,
  getErrorCategory,
  isErrorRetryable,
  getUserFriendlyMessage,
  getSuggestedAction,
  getErrorHttpStatus,
  getErrorsByCategory,
  getErrorsBySeverity,
  getCriticalErrors,
  getRetryableErrors,
  createError,
} from './analytics-error.constants';

// Re-export from analytics-status.constants
export {
  // Enums
  AnalyticsDataStatus,
  AnalyticsStatusCategory,
  // Constants
  ANALYTICS_STATUS_CATEGORY_MAP,
  ANALYTICS_STATUS_CONFIG,
  // Functions
  getStatusCategory,
  getStatusLabel,
  getStatusDescription,
  getStatusColor,
  getStatusIcon,
  isStatusTerminal,
  isStatusError,
  isStatusSuccess,
  getStatusesByCategory,
  getProcessingStatuses,
  getSuccessStatuses,
  getErrorStatuses,
  getTerminalStatuses,
  canTransitionTo,
  getAllowedNextStatuses,
  validateStatusTransition,
  getDefaultDashboardStatuses,
  getActiveStatuses,
} from './analytics-status.constants';

// Re-export from analytics-trend.constants
export {
  // Enums
  AnalyticsTrendDirection,
  AnalyticsTrendMethod,
  AnalyticsTrendCategory,
  // Constants
  ANALYTICS_TREND_CONFIG,
  ANALYTICS_TREND_METHOD_CONFIG,
  TREND_INTERPRETATIONS,
  // Functions
  getTrendDirectionLabel,
  getTrendDirectionDescription,
  getTrendDirectionColor,
  getTrendDirectionIcon,
  getTrendMethodLabel,
  getTrendMethodDescription,
  isPositiveTrend,
  isNegativeTrend,
  isNeutralTrend,
  calculateTrendStrength,
  determineTrendDirection,
  getRecommendedTrendMethods,
  getTrendInterpretation,
} from './analytics-trend.constants';

// Re-export from analytics-comparison.constants
export {
  // Enums
  AnalyticsComparisonMethod,
  AnalyticsComparisonCategory,
  // Constants
  ANALYTICS_COMPARISON_CATEGORY_MAP,
  ANALYTICS_COMPARISON_CONFIG,
  // Functions
  getComparisonCategory,
  getComparisonLabel,
  getComparisonDescription,
  comparisonRequiresBasePeriod,
  comparisonRequiresTargetPeriod,
  getComparisonsByCategory,
  getTimeComparisons,
  getTargetComparisons,
  getBenchmarkComparisons,
  getRollingComparisons,
  getSequentialComparisons,
  getDefaultDashboardComparisons,
  compareValues,
  createComparisonResult,
  checkTargetReached,
  compareAgainstBenchmark,
  getComparisonOffset,
  getRecommendedComparison,
} from './analytics-comparison.constants';

// Re-export from analytics-aggregation.constants
export {
  // Enums
  AnalyticsAggregationMethod,
  AnalyticsAggregationCategory,
  AnalyticsAggregationDataType,
  // Constants
  ANALYTICS_AGGREGATION_CATEGORY_MAP,
  ANALYTICS_AGGREGATION_CONFIG,
  // Functions
  getAggregationCategory,
  getAggregationLabel,
  getAggregationDescription,
  getAggregationDataTypes,
  aggregationRequiresSorting,
  aggregationRequiresGrouping,
  getAggregationsByCategory,
  getBasicAggregations,
  getStatisticalAggregations,
  getDistributionAggregations,
  getUniqueAggregations,
  getCumulativeAggregations,
  getWeightedAggregations,
  getFinancialAggregations,
  aggregationSupportsDataType,
  getDefaultNumericAggregations,
  getDefaultStringAggregations,
  getDefaultDateAggregations,
  formatAggregationValue,
} from './analytics-aggregation.constants';

// Re-export from analytics-interval.constants
export {
  // Enums
  AnalyticsInterval,
  AnalyticsIntervalCategory,
  // Constants
  ANALYTICS_INTERVAL_CATEGORY_MAP,
  ANALYTICS_INTERVAL_CONFIG,
  // Functions
  getIntervalCategory,
  getIntervalLabel,
  getIntervalDescription,
  getIntervalMilliseconds,
  getIntervalSeconds,
  getIntervalMinutes,
  getIntervalHours,
  getIntervalDays,
  getIntervalsByCategory,
  getMinuteIntervals,
  getHourIntervals,
  getDayIntervals,
  getWeekIntervals,
  getMonthIntervals,
  getQuarterIntervals,
  getYearIntervals,
  getDefaultDashboardIntervals,
  getRealtimeIntervals,
  getLongTermIntervals,
  isMinuteInterval,
  isHourInterval,
  isDayInterval,
  isWeekInterval,
  isMonthInterval,
  isQuarterInterval,
  isYearInterval,
  getIntervalForDuration,
  getRecommendedInterval,
} from './analytics-interval.constants';

// Re-export from analytics-period.constants
export {
  // Enums
  AnalyticsPeriod,
  AnalyticsPeriodCategory,
  // Constants
  ANALYTICS_PERIOD_CATEGORY_MAP,
  ANALYTICS_PERIOD_CONFIG,
  // Functions
  getPeriodCategory,
  getPeriodLabel,
  getPeriodDescription,
  getPeriodDays,
  isPeriodRelative,
  getPeriodsByCategory,
  getDefaultDashboardPeriods,
  getComparisonPeriods,
  getRelativePeriods,
  getAbsolutePeriods,
  getPeriodForDays,
  calculateDateRange,
  formatDateRange,
} from './analytics-period.constants';

// Re-export from analytics-filter.constants
export {
  // Enums
  AnalyticsFilterOperator,
  AnalyticsFilterOperatorType,
  AnalyticsFilterConditionType,
  AnalyticsFilterDataType,
  // Constants
  ANALYTICS_FILTER_OPERATOR_CATEGORY,
  ANALYTICS_FILTER_OPERATOR_CONFIG,
  ANALYTICS_FILTER_CONDITION_CONFIG,
  FILTER_PRESETS,
  // Functions
  getOperatorCategory,
  getOperatorLabel,
  getOperatorDescription,
  getOperatorSymbol,
  getOperatorValueCount,
  operatorSupportsDataType,
  getOperatorsByCategory,
  getOperatorsForDataType,
  getStringOperators,
  getNumberOperators,
  getDateOperators,
  getBooleanOperators,
  getArrayOperators,
  operatorRequiresValues,
  operatorSupportsMultipleValues,
  createFilterCondition,
  validateFilterCondition,
} from './analytics-filter.constants';

// Re-export from analytics-dimension.constants
export {
  // Enums
  AnalyticsDimension,
  AnalyticsDimensionType,
  // Constants
  ANALYTICS_DIMENSION_CATEGORY_MAP,
  ANALYTICS_DIMENSION_CONFIG,
  DIMENSION_COMBINATIONS,
  // Functions
  getDimensionCategory,
  getDimensionLabel,
  getDimensionDescription,
  getDimensionsByCategory,
  isDimensionHierarchical,
  getTimeDimensions,
  getLocationDimensions,
  getUserDimensions,
  getTrafficDimensions,
  getProductDimensions,
  getTransactionDimensions,
  getMarketingDimensions,
  getSupportDimensions,
} from './analytics-dimension.constants';

// Re-export from analytics-metric.constants
export {
  // Enums
  AnalyticsMetric,
  AnalyticsMetricType,
  AnalyticsMetricFormat,
  // Constants
  ANALYTICS_METRIC_CATEGORY_MAP,
  ANALYTICS_METRIC_CONFIG,
  // Functions
  getMetricCategory,
  getMetricLabel,
  getMetricDescription,
  getMetricFormat,
  isMetricReversed,
  getMetricsByCategory,
  formatMetricValue,
  getMetricPriority,
  getHighPriorityMetrics,
  getMetricThreshold,
} from './analytics-metric.constants';

// Re-export from analytics-event.constants
export {
  // Enums
  AnalyticsEventName,
  AnalyticsEventCategory,
  AnalyticsEventPriority,
  // Constants
  ANALYTICS_EVENT_CATEGORY_MAP,
  ANALYTICS_EVENT_CONFIG,
  // Functions
  getEventCategory,
  getEventLabel,
  getEventDescription,
  isEventCritical,
  eventRequiresUser,
  getEventsByCategory,
  getCriticalEvents,
  getUserEvents,
  getEventPriority,
} from './analytics-event.constants';

// Re-export from analytics-campaign.constants
export {
  // Enums
  CampaignStatus,
  CampaignType,
  CampaignObjective,
  CampaignChannel,
  CampaignBudgetRange,
  AttributionModel,
  // Constants
  ANALYTICS_CAMPAIGN_CONFIG,
  CAMPAIGN_OBJECTIVE_TO_TYPES,
  CAMPAIGN_BUDGET_CONFIG,
  CAMPAIGN_DEFAULT_METRICS,
  CAMPAIGN_STATUS_LABELS,
  CAMPAIGN_STATUS_COLORS,
  CAMPAIGN_OBJECTIVE_LABELS,
  CAMPAIGN_CHANNEL_LABELS,
  ATTRIBUTION_MODEL_LABELS,
  // Functions
  getCampaignTypeLabel,
  getCampaignTypeDescription,
  getCampaignTypePriority,
  getCampaignTypesByObjective,
  isCampaignActive,
  canEditCampaign,
  getBudgetRange,
  getCampaignMetrics,
} from './analytics-campaign.constants';

// Re-export from analytics-medium.constants
export {
  // Enums
  AnalyticsMedium,
  AnalyticsMediumType,
  AnalyticsMediumStatus,
  AnalyticsMediumPriority,
  // Constants
  ANALYTICS_MEDIUM_TYPE_MAP,
  ANALYTICS_MEDIUM_CONFIG,
  ANALYTICS_MEDIUM_DEFAULT_METRICS,
  ANALYTICS_MEDIUM_DEFAULT_STATUS,
  // Functions
  getAnalyticsMediumLabel,
  getAnalyticsMediumDescription,
  getAnalyticsMediumType,
  getAnalyticsMediumMetrics,
  getAnalyticsMediumStatus,
  setAnalyticsMediumStatus,
  isMediumActive,
  getMediumsByType,
  getActiveMediums,
  getMediumPriority,
} from './analytics-medium.constants';

// Re-export from analytics-source.constants
export {
  // Enums
  AnalyticsDataSource,
  AnalyticsSourceType,
  AnalyticsSourceReliability,
  AnalyticsSourceStatus,
  AnalyticsSourcePriority,
  // Constants
  ANALYTICS_SOURCE_TYPE_MAP,
  ANALYTICS_SOURCE_CONFIG,
  ANALYTICS_SOURCE_RELIABILITY,
  ANALYTICS_SOURCE_DEFAULT_STATUS,
  // Functions
  getAnalyticsSourceLabel,
  getAnalyticsSourceDescription,
  getAnalyticsSourceType,
  getAnalyticsSourceReliability,
  getAnalyticsSourceStatus,
  setAnalyticsSourceStatus,
  isSourceActive,
  isSourceReliable,
  getSourcesByType,
  getSourcesByReliability,
  getActiveSources,
  getSourcePriority,
} from './analytics-source.constants';

// Re-export from analytics-category.constants
export {
  // Enums
  AnalyticsDataCategory,
  AnalyticsCategoryGroup,
  AnalyticsDataSensitivity,
  AnalyticsCategoryStatus,
  AnalyticsCategoryPriorityLevel,
  // Constants
  ANALYTICS_DATA_CATEGORY_CONFIG,
  ANALYTICS_CATEGORY_GROUP_CONFIG,
  ANALYTICS_CATEGORY_TO_GROUP,
  ANALYTICS_CATEGORY_SENSITIVITY,
  ANALYTICS_CATEGORY_RETENTION,
  ANALYTICS_CATEGORY_DEFAULT_STATUS,
  // Functions
  getAnalyticsCategoryLabel,
  getAnalyticsCategoryDescription,
  getAnalyticsCategoryPriority,
  getAnalyticsCategoryGroup,
  getAnalyticsCategorySensitivity,
  getAnalyticsCategoryRetention,
  getAnalyticsCategoryStatus,
  setAnalyticsCategoryStatus,
  getCategoriesByGroup,
  isCategoryActive,
  requiresCompliance,
  getPriorityLevel,
} from './analytics-category.constants';

// Re-export from analytics-type.constants
export {
  // Enums
  AnalyticsType,
  AnalyticsSubType,
  AnalyticsTypeStatus,
  // Constants
  ANALYTICS_TYPE_CONFIG,
  ANALYTICS_TYPE_CATEGORY_MAP,
  ANALYTICS_TYPE_PRIORITY,
  ANALYTICS_DEFAULT_ENABLED_TYPES,
  ANALYTICS_REAL_TIME_TYPES,
  ANALYTICS_HISTORICAL_TYPES,
  ANALYTICS_AGGREGATION_TYPES,
  ANALYTICS_TYPE_SUBTYPE_MAP,
  ANALYTICS_TYPE_DEFAULT_STATUS,
  // Functions
  getAnalyticsTypeLabel,
  getAnalyticsTypeDescription,
  getAnalyticsCategory as getAnalyticsTypeCategory,
  isAnalyticsTypeEnabledByDefault,
  isAnalyticsTypeRealTime,
  supportsHistoricalData,
  requiresAggregation,
  getAnalyticsTypesByCategory,
  getAnalyticsSubTypes,
  hasAnalyticsSubTypes,
  getAnalyticsTypeStatus,
  setAnalyticsTypeStatus,
} from './analytics-type.constants';

// Re-export from analytics.constants
export {
  // Enums
  AnalyticsTimePeriod,
  AnalyticsEventType,
  AnalyticsEventPriority as AnalyticsBaseEventPriority,
  AnalyticsAggregationType,
  AnalyticsChartType,
  AnalyticsReportFormat,
  AnalyticsStorageType,
  AnalyticsWidgetType,
  // Constants
  ANALYTICS_TIME_PERIOD_CONFIG,
  ANALYTICS_MAX_RECORDS,
  ANALYTICS_DEFAULT_PAGE_SIZE,
  ANALYTICS_MAX_PAGE_SIZE,
  ANALYTICS_SUPPORTED_TIMEZONES,
  ANALYTICS_DEFAULT_TIMEZONE,
  ANALYTICS_REFRESH_INTERVAL_MS,
  ANALYTICS_REFRESH_INTERVAL_SECONDS,
  ANALYTICS_DATA_RETENTION_DAYS,
  ANALYTICS_VERSION,
  ANALYTICS_API_VERSION,
  ANALYTICS_DEFAULT_EVENT_PRIORITY,
  ANALYTICS_DEFAULT_CHART_TYPE,
  ANALYTICS_DEFAULT_REPORT_FORMAT,
  ANALYTICS_CACHE_TTL_SECONDS,
  ANALYTICS_CACHE_TTL_MS,
  ANALYTICS_QUERY_TIMEOUT_SECONDS,
  ANALYTICS_BATCH_SIZE,
  ANALYTICS_RETRY_ATTEMPTS,
  ANALYTICS_RETRY_DELAY_MS,
  ANALYTICS_WEBHOOK_RETRY_ATTEMPTS,
  ANALYTICS_WEBHOOK_TIMEOUT_MS,
  ANALYTICS_DEFAULT_STORAGE_TYPE,
  ANALYTICS_EXPORT_FORMATS,
  ANALYTICS_DASHBOARD_REFRESH_INTERVALS,
  ANALYTICS_DATE_RANGE_PRESETS,
  ANALYTICS_DEFAULT_DATE_RANGE_PRESET,
} from './analytics.constants';

// Types
export type {
  AnalyticsTimezone,
  AnalyticsExportFormat,
  AnalyticsDateRangePreset,
  AnalyticsMediumMetrics,
  CampaignConfig,
  CampaignMetrics,
  AnalyticsEventConfig,
  AnalyticsMetricConfig,
  MetricThreshold,
  AnalyticsDimensionConfig,
  AnalyticsFilterOperatorConfig,
  FilterValue,
  FilterCondition,
  FilterGroup,
  AnalyticsPeriodConfig,
  DateRange,
  AnalyticsIntervalConfig,
  AnalyticsAggregationConfig,
  AggregationResult,
  AnalyticsComparisonConfig,
  ComparisonResult,
  ComparisonTarget,
  ComparisonBenchmark,
  AnalyticsTrendConfig,
  TrendAnalysisResult,
  AnalyticsStatusConfig,
  StatusTransitionResult,
  AnalyticsErrorConfig,
  AnalyticsError,
  AnalyticsPermissionConfig,
} from './analytics.constants';
