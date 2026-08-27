// Export all constants from analytics.constants
export { ANALYTICS } from './analytics.constants';

// Export all types from analytics.constants
export type {
  AnalyticsType,
  AnalyticsStatus,
  AnalyticsTimeframe,
  AnalyticsInterval,
  AnalyticsAggregation,
  AnalyticsComparison,
  AnalyticsTrend,
  AnalyticsEvent,
  AnalyticsDimension,
  AnalyticsMetric,
  AnalyticsFilter,
  AnalyticsPermission,
  AnalyticsExportFormat,
} from './analytics.constants';

// Export all functions from analytics.constants with unique names
export {
  getAnalyticsStatusLabel as getAnalyticsMainStatusLabel,
  getAnalyticsTimeframeLabel,
  getAnalyticsIntervalLabel as getAnalyticsMainIntervalLabel,
  getAnalyticsTrendLabel as getAnalyticsMainTrendLabel,
  getAnalyticsEventLabel,
  getAnalyticsMetricLabel as getAnalyticsMainMetricLabel,
  getAnalyticsPermissionLabel as getAnalyticsMainPermissionLabel,
  isAnalyticsCompleted,
  isAnalyticsProcessing,
  isAnalyticsFailed,
  isAnalyticsFinal,
} from './analytics.constants';

// Export from analytics-aggregation.constants
export { ANALYTICS_AGGREGATION } from './analytics-aggregation.constants';

export type {
  AnalyticsAggregationType,
  AnalyticsAggregationCategory,
  AnalyticsAggregationLevel,
  AnalyticsAggregationScope,
  AnalyticsAggregationPrecision,
} from './analytics-aggregation.constants';

export {
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

// Export from analytics-campaign.constants
export { ANALYTICS_CAMPAIGN } from './analytics-campaign.constants';

export type {
  AnalyticsCampaignType,
  AnalyticsCampaignStatus,
  AnalyticsCampaignChannel,
  AnalyticsCampaignObjective,
  AnalyticsCampaignBudgetType,
  AnalyticsCampaignROIStatus,
  AnalyticsCampaignMetric,
  AnalyticsCampaignPriority,
  AnalyticsCampaignVisibility,
} from './analytics-campaign.constants';

export {
  getAnalyticsCampaignTypeLabel,
  getAnalyticsCampaignStatusLabel,
  getAnalyticsCampaignChannelLabel,
  getAnalyticsCampaignObjectiveLabel,
  getAnalyticsCampaignROIStatusLabel,
  getAnalyticsCampaignMetricLabel,
  getAnalyticsCampaignPriorityLabel,
  isAnalyticsCampaignActive,
  isAnalyticsCampaignScheduled,
  isAnalyticsCampaignCompleted,
  getAnalyticsCampaignObjective,
} from './analytics-campaign.constants';

// Export from analytics-category.constants
export { ANALYTICS_CATEGORY } from './analytics-category.constants';

export type {
  AnalyticsCategoryType,
  AnalyticsSubCategoryType,
  AnalyticsCategoryGroup,
  AnalyticsCategoryPriority,
  AnalyticsCategoryVisibility,
  AnalyticsCategoryStatus,
} from './analytics-category.constants';

export {
  getAnalyticsCategoryLabel,
  getAnalyticsSubCategoryLabel,
  getAnalyticsCategoryGroupLabel,
  getAnalyticsCategoryPriorityLabel,
  getAnalyticsCategoryStatusLabel,
  isAnalyticsCategoryActive,
  isAnalyticsCategoryArchived,
} from './analytics-category.constants';

// Export from analytics-comparison.constants
export { ANALYTICS_COMPARISON } from './analytics-comparison.constants';

export type {
  AnalyticsComparisonType,
  AnalyticsComparisonMethod,
  AnalyticsComparisonDirection,
  AnalyticsComparisonSignificance,
  AnalyticsComparisonUnit,
} from './analytics-comparison.constants';

export {
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

// Export from analytics-dimension.constants
export { ANALYTICS_DIMENSION } from './analytics-dimension.constants';

export type {
  AnalyticsUserDimension,
  AnalyticsSessionDimension,
  AnalyticsLocationDimension,
  AnalyticsDeviceDimension,
  AnalyticsTrafficDimension,
  AnalyticsProductDimension,
  AnalyticsOrderDimension,
  AnalyticsTimeDimension,
  AnalyticsPageDimension,
  AnalyticsEventDimension,
  AnalyticsMarketingDimension,
  AnalyticsSystemDimension,
  AnalyticsDimensionCategory,
  AnalyticsDimensionType,
  AnalyticsDimensionGranularity,
} from './analytics-dimension.constants';

export {
  getAnalyticsDimensionLabel,
  getAnalyticsDimensionCategoryLabel,
  getAnalyticsDimensionTypeLabel,
  getAnalyticsDimensionCategory,
} from './analytics-dimension.constants';

// Export from analytics-error.constants
export { ANALYTICS_ERROR } from './analytics-error.constants';

export type {
  AnalyticsErrorType,
  AnalyticsErrorCode,
  AnalyticsErrorSeverity,
  AnalyticsErrorCategory,
  AnalyticsErrorAction,
  AnalyticsErrorSource,
} from './analytics-error.constants';

export {
  getAnalyticsErrorLabel,
  getAnalyticsErrorCodeLabel,
  getAnalyticsErrorSeverityLabel,
  getAnalyticsErrorCategoryLabel,
  getAnalyticsErrorActionLabel,
  getAnalyticsErrorSourceLabel,
  getAnalyticsErrorCategory,
  getAnalyticsErrorSeverity,
} from './analytics-error.constants';

// Export from analytics-event.constants
export { ANALYTICS_EVENT } from './analytics-event.constants';

export type {
  AnalyticsEventCategory,
  AnalyticsEventAction,
  AnalyticsEventLabel,
  AnalyticsEventValue,
  AnalyticsEventPriority,
  AnalyticsEventStatus,
} from './analytics-event.constants';

export {
  getAnalyticsEventCategoryLabel,
  getAnalyticsEventActionLabel,
  getAnalyticsEventLabelName,
  getAnalyticsEventPriorityLabel,
  getAnalyticsEventStatusLabel,
  isAnalyticsEventCompleted,
  isAnalyticsEventProcessing,
  isAnalyticsEventFailed,
} from './analytics-event.constants';

// Export from analytics-filter.constants
export { ANALYTICS_FILTER } from './analytics-filter.constants';

export type {
  AnalyticsFilterOperator,
  AnalyticsFilterDataType,
  AnalyticsFilterCategory,
  AnalyticsFilterLogicType,
  AnalyticsFilterMatchType,
  AnalyticsFilterPriority,
  AnalyticsFilterScope,
} from './analytics-filter.constants';

export {
  getAnalyticsFilterOperatorLabel,
  getAnalyticsFilterDataTypeLabel,
  getAnalyticsFilterCategoryLabel,
  getAnalyticsFilterLogicTypeLabel,
  getAnalyticsFilterMatchTypeLabel,
  getAnalyticsFilterPriorityLabel,
  getAnalyticsFilterScopeLabel,
  isAnalyticsFilterComparisonOperator,
  isAnalyticsFilterStringOperator,
  isAnalyticsFilterSetOperator,
  isAnalyticsFilterNullOperator,
  isAnalyticsFilterLogicalOperator,
} from './analytics-filter.constants';

// Export from analytics-interval.constants
export { ANALYTICS_INTERVAL } from './analytics-interval.constants';

export type {
  AnalyticsIntervalType,
  AnalyticsIntervalCategory,
  AnalyticsIntervalUnit,
  AnalyticsIntervalFormat,
  AnalyticsIntervalGroupingType,
} from './analytics-interval.constants';

export {
  getAnalyticsIntervalLabel as getAnalyticsIntervalDetailLabel,
  getAnalyticsIntervalCategoryLabel,
  getAnalyticsIntervalUnitLabel,
  getAnalyticsIntervalFormatLabel,
  getAnalyticsIntervalCategory,
  getAnalyticsIntervalUnit,
  getAnalyticsIntervalSeconds,
} from './analytics-interval.constants';

// Export from analytics-medium.constants
export { ANALYTICS_MEDIUM } from './analytics-medium.constants';

export type {
  AnalyticsMediumType,
  AnalyticsMediumCategory,
  AnalyticsMediumTypeEnum,
  AnalyticsMediumChannel,
  AnalyticsMediumPriority,
} from './analytics-medium.constants';

export {
  getAnalyticsMediumLabel,
  getAnalyticsMediumCategoryLabel,
  getAnalyticsMediumTypeLabel,
  getAnalyticsMediumChannelLabel,
  getAnalyticsMediumPriorityLabel,
  isAnalyticsMediumOrganic,
  isAnalyticsMediumPaid,
  isAnalyticsMediumSocial,
  isAnalyticsMediumEmail,
  getAnalyticsMediumCategory,
  getAnalyticsChannelFromMedium,
} from './analytics-medium.constants';

// Export from analytics-metric.constants
export { ANALYTICS_METRIC } from './analytics-metric.constants';

export type {
  AnalyticsBusinessMetric,
  AnalyticsCustomerMetric,
  AnalyticsSalesMetric,
  AnalyticsMarketingMetric,
  AnalyticsProductMetric,
  AnalyticsWebsiteMetric,
  AnalyticsSupportMetric,
  AnalyticsSystemMetric,
  AnalyticsMetricCategory,
  AnalyticsMetricType,
  AnalyticsMetricAggregation,
  AnalyticsMetricFormat,
  AnalyticsMetricPriority,
} from './analytics-metric.constants';

export {
  getAnalyticsMetricLabel as getAnalyticsMetricDetailLabel,
  getAnalyticsMetricCategoryLabel,
  getAnalyticsMetricTypeLabel,
  getAnalyticsMetricFormatLabel,
  getAnalyticsMetricPriorityLabel,
  getAnalyticsMetricCategory,
} from './analytics-metric.constants';

// Export from analytics-period.constants
export { ANALYTICS_PERIOD } from './analytics-period.constants';

export type {
  AnalyticsPeriodType,
  AnalyticsPeriodTypeEnum,
  AnalyticsPeriodGranularity,
  AnalyticsPeriodComparisonType,
  AnalyticsPeriodFormat,
} from './analytics-period.constants';

export {
  getAnalyticsPeriodLabel,
  getAnalyticsPeriodTypeLabel,
  getAnalyticsPeriodGranularityLabel,
  getAnalyticsPeriodComparisonTypeLabel,
  isAnalyticsPeriodRolling,
  isAnalyticsPeriodFixed,
  isAnalyticsPeriodRelative,
  getAnalyticsPeriodDays,
} from './analytics-period.constants';

// Export from analytics-permission.constants
export { ANALYTICS_PERMISSION } from './analytics-permission.constants';

export type {
  AnalyticsPermissionType as AnalyticsPermissionDetailType,
  AnalyticsPermissionResource,
  AnalyticsPermissionLevel,
  AnalyticsPermissionScope,
  AnalyticsPermissionAction,
  AnalyticsPermissionEffect,
  AnalyticsPermissionCondition,
} from './analytics-permission.constants';

export {
  getAnalyticsPermissionLabel as getAnalyticsPermissionDetailLabel,
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

// Export from analytics-source.constants
export { ANALYTICS_SOURCE } from './analytics-source.constants';

export type {
  AnalyticsSourceType,
  AnalyticsSourceCategory,
  AnalyticsSourceSubCategory,
  AnalyticsSourceTypeEnum,
  AnalyticsSourceConfidence,
  AnalyticsSourceValidity,
} from './analytics-source.constants';

export {
  getAnalyticsSourceLabel,
  getAnalyticsSourceCategoryLabel,
  getAnalyticsSourceConfidenceLabel,
  getAnalyticsSourceValidityLabel,
  isAnalyticsSocialMedia,
  isAnalyticsSearchEngine,
  isAnalyticsOrganic,
  isAnalyticsPaid,
  getAnalyticsSourceCategory,
} from './analytics-source.constants';

// Export from analytics-status.constants
export { ANALYTICS_STATUS } from './analytics-status.constants';

export type {
  AnalyticsStatusCode,
  AnalyticsStatusCategory,
  AnalyticsStatusPriority,
  AnalyticsStatusVisibility,
  AnalyticsStatusAction,
} from './analytics-status.constants';

export {
  getAnalyticsStatusCodeLabel,
  getAnalyticsStatusCategoryLabel,
  getAnalyticsStatusPriorityLabel,
  getAnalyticsStatusVisibilityLabel,
  getAnalyticsStatusActionLabel,
  isAnalyticsStatusSuccess,
  isAnalyticsStatusProcessing,
  isAnalyticsStatusFailure,
  isAnalyticsStatusFinal as isAnalyticsStatusFinalState,
  getAnalyticsStatusCategory,
} from './analytics-status.constants';

// Export from analytics-trend.constants
export { ANALYTICS_TREND } from './analytics-trend.constants';

export type {
  AnalyticsTrendType,
  AnalyticsTrendStrength,
  AnalyticsTrendDirection,
  AnalyticsTrendPattern,
  AnalyticsTrendMethod,
  AnalyticsTrendConfidence,
  AnalyticsTrendHorizon,
} from './analytics-trend.constants';

export {
  getAnalyticsTrendLabel as getAnalyticsTrendDetailLabel,
  getAnalyticsTrendStrengthLabel,
  getAnalyticsTrendDirectionLabel,
  getAnalyticsTrendPatternLabel,
  getAnalyticsTrendMethodLabel,
  getAnalyticsTrendConfidenceLabel,
  getAnalyticsTrendHorizonLabel,
  isAnalyticsTrendUpward,
  isAnalyticsTrendDownward,
  isAnalyticsTrendStable,
  getAnalyticsTrendDirection as getAnalyticsTrendDirectionFromSlope,
  getAnalyticsTrendStrength as getAnalyticsTrendStrengthFromRSquared,
} from './analytics-trend.constants';

// Export from analytics-type.constants
export { ANALYTICS_TYPE } from './analytics-type.constants';

export type {
  AnalyticsDataType,
  AnalyticsReportType,
  AnalyticsDataSource,
  AnalyticsGranularity,
  AnalyticsQuality,
  AnalyticsAnalysisType,
  AnalyticsRefreshRate,
  AnalyticsRetention,
  AnalyticsSensitivity,
  AnalyticsUsage,
} from './analytics-type.constants';

export {
  getAnalyticsDataTypeLabel,
  getAnalyticsReportTypeLabel,
  getAnalyticsDataSourceLabel,
  getAnalyticsQualityLabel,
  getAnalyticsAnalysisTypeLabel,
  getAnalyticsSensitivityLabel,
  isAnalyticsRealtime,
  isAnalyticsHistorical,
  isAnalyticsPredictive,
} from './analytics-type.constants';

// Export from retention-analytics.constants
export { RETENTION_ANALYTICS } from './retention-analytics.constants';

export type {
  RetentionAnalyticsType,
  RetentionAnalyticsStatus,
  RetentionAnalyticsPeriod,
  RetentionAnalyticsCohort,
  RetentionAnalyticsMetric,
  RetentionAnalyticsSegment,
} from './retention-analytics.constants';

export {
  getRetentionAnalyticsEventLabel as getRetentionAnalyticsLabel,
  getRetentionAnalyticsStatusLabel,
  getRetentionAnalyticsPeriodLabel,
  getRetentionAnalyticsCohortLabel,
  getRetentionAnalyticsMetricLabel as getRetentionAnalyticsMetricDetailLabel,
  getRetentionAnalyticsSegmentLabel,
  isRetentionAnalyticsActive,
  isRetentionAnalyticsCompleted,
  getRetentionAnalyticsRate as getRetentionAnalyticsRateValue,
} from './retention-analytics.constants';

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

// admin-analytics Analytics
export * from './admin-analytics';
