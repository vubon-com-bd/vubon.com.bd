// Analytics Aggregation Constants
export {
  ANALYTICS_AGGREGATION,
  getAnalyticsAggregationLabel,
  getAnalyticsAggregationCategoryLabel,
  getAnalyticsAggregationLevelLabel,
  getAnalyticsAggregationScopeLabel,
  getAnalyticsAggregationPrecisionLabel,
  isAnalyticsAggregationStatistical,
  isAnalyticsAggregationMathematical,
  isAnalyticsAggregationTimeSeries,
  isAnalyticsAggregationApproximate,
  getAnalyticsAggregationCategory,
} from './analytics-aggregation.constants';

export type {
  AnalyticsAggregationType,
  AnalyticsAggregationCategory,
  AnalyticsAggregationLevel,
  AnalyticsAggregationScope,
  AnalyticsAggregationPrecision,
} from './analytics-aggregation.constants';

// Analytics Comparison Constants
export {
  ANALYTICS_COMPARISON,
  getAnalyticsComparisonLabel,
  getAnalyticsComparisonMethodLabel,
  getAnalyticsComparisonDirectionLabel,
  getAnalyticsComparisonSignificanceLabel,
  getAnalyticsComparisonUnitLabel,
  isAnalyticsComparisonPeriodBased,
  isAnalyticsComparisonBenchmarkBased,
  getAnalyticsComparisonDirection,
  getAnalyticsComparisonSignificance,
} from './analytics-comparison.constants';

export type {
  AnalyticsComparisonType,
  AnalyticsComparisonMethod,
  AnalyticsComparisonDirection,
  AnalyticsComparisonSignificance,
  AnalyticsComparisonUnit,
} from './analytics-comparison.constants';

// Analytics Trend Constants
export {
  ANALYTICS_TREND,
  getAnalyticsTrendLabel as getAnalyticsTrendLabelName,
  getAnalyticsTrendStrengthLabel,
  getAnalyticsTrendDirectionLabel,
  getAnalyticsTrendPatternLabel,
  getAnalyticsTrendMethodLabel,
  getAnalyticsTrendConfidenceLabel,
  getAnalyticsTrendHorizonLabel,
  isAnalyticsTrendUpward,
  isAnalyticsTrendDownward,
  isAnalyticsTrendStable,
  getAnalyticsTrendDirection,
  getAnalyticsTrendStrength,
} from './analytics-trend.constants';

export type {
  AnalyticsTrendType,
  AnalyticsTrendStrength,
  AnalyticsTrendDirection,
  AnalyticsTrendPattern,
  AnalyticsTrendMethod,
  AnalyticsTrendConfidence,
  AnalyticsTrendHorizon,
} from './analytics-trend.constants';

// Analytics Status Constants
export {
  ANALYTICS_STATUS,
  getAnalyticsStatusCodeLabel,
  getAnalyticsStatusCategoryLabel,
  getAnalyticsStatusPriorityLabel,
  getAnalyticsStatusVisibilityLabel,
  getAnalyticsStatusActionLabel,
  isAnalyticsStatusSuccess,
  isAnalyticsStatusProcessing,
  isAnalyticsStatusFailure,
  isAnalyticsStatusFinal,
  getAnalyticsStatusCategory,
} from './analytics-status.constants';

export type {
  AnalyticsStatusCode,
  AnalyticsStatusCategory,
  AnalyticsStatusPriority,
  AnalyticsStatusVisibility,
  AnalyticsStatusAction,
} from './analytics-status.constants';

// Analytics Error Constants
export {
  ANALYTICS_ERROR,
  getAnalyticsErrorLabel,
  getAnalyticsErrorCodeLabel,
  getAnalyticsErrorSeverityLabel,
  getAnalyticsErrorCategoryLabel,
  getAnalyticsErrorActionLabel,
  getAnalyticsErrorSourceLabel,
  getAnalyticsErrorCategory,
  getAnalyticsErrorSeverity,
} from './analytics-error.constants';

export type {
  AnalyticsErrorType,
  AnalyticsErrorCode,
  AnalyticsErrorSeverity,
  AnalyticsErrorCategory,
  AnalyticsErrorAction,
  AnalyticsErrorSource,
} from './analytics-error.constants';

// Analytics Permission Constants
export {
  ANALYTICS_PERMISSION,
  getAnalyticsPermissionLabel as getAnalyticsPermissionLabelName,
  getAnalyticsPermissionResourceLabel,
  getAnalyticsPermissionLevelLabel,
  getAnalyticsPermissionScopeLabel,
  getAnalyticsPermissionActionLabel,
  getAnalyticsPermissionEffectLabel,
  getAnalyticsPermissionConditionLabel,
  isAnalyticsPermissionAdmin,
  isAnalyticsPermissionManagement,
  isAnalyticsPermissionView,
  getAnalyticsPermissionLevel,
} from './analytics-permission.constants';

export type {
  AnalyticsPermissionType,
  AnalyticsPermissionResource,
  AnalyticsPermissionLevel,
  AnalyticsPermissionScope,
  AnalyticsPermissionAction,
  AnalyticsPermissionEffect,
  AnalyticsPermissionCondition,
} from './analytics-permission.constants';

// acquisition Analytics
export * from './acquisition-analytics';

// Ai Analytics
export * from './ai-analytics';

// channel Analytics
export * from './channel-analytics';

// customer-analytics Analytics
export * from './customer-analytics';

// engagement-analytics Analytics
export * from './engagement-analytics';

// financial-analytics Analytics
export * from './financial-analytics';

// flash-sales-analytics Analytics
export * from './flash-sales-analytics';

// Inventory Analytics
export * from './inventory-analytics';

// logistics Analytics
export * from './logistics-analytics';

// marketing-analytics Analytics
export * from './marketing-analytics';

// notification-analytics Analytics
export * from './notification-analytics';

// order-analytics Analytics
export * from './order-analytics';

// performance-analytics Analytics
export * from './performance-analytics';

// product-analytics Analytics
export * from './product-analytics';

// sales-analytics Analytics
export * from './sales-analytics';

// seo-analytics Analytics
export * from './seo-analytics';

// support-analytics Analytics
export * from './support-analytics';

// traffic-analytics Analytics
export * from './traffic-analytics';

// user-analytics Analytics
export * from './user-analytics';

// vendor-analytics Analytics
export * from './vendor-analytics';

// content-analytics Analytics
export * from './content-analytics';
