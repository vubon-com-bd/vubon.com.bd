/**
 * Analytics Constants Index
 * Export all analytics constants and types for easy importing
 */

// flash-sales-analytics Constants
export * from './flash-sales-analytics';

// notification-analytics Constants
export * from './notification-analytics';

// seo-analytics Constants
export * from './seo-analytics';

// AI Analytics Constants - আপডেট করা অংশ
export {
  AI_ANALYTICS,
  AI_ANALYTICS_TYPE,
  AI_ANALYTICS_METRIC,
  AI_ANALYTICS_STATUS,
  // সব ফাংশনের নামে AI যোগ করা হয়েছে
  getAIAnalyticsTypeLabel,
  getAIAnalyticsStatusLabel,
  getAIAnalyticsCategoryLabel,
  getAIAnalyticsMetricLabel,
  getAIAnalyticsAggregationLabel,
  getAIAnalyticsPeriodLabel,
  getAIAnalyticsFormatLabel,
  getAIAnalyticsGranularityLabel,
  isAIAnalyticsActive,
  isAIAnalyticsComplete,
  isAIAnalyticsFailed,
  getAIDefaultAnalyticsLimit,
  getAIMaxAnalyticsLimit,
} from './ai';

// Logistics Analytics Constants
export {
  LOGISTICS_ANALYTICS,
  logisticsAnalyticsGetTypeLabel,
  logisticsAnalyticsGetStatusLabel,
  logisticsAnalyticsGetMetricLabel,
  logisticsAnalyticsGetPeriodLabel,
  logisticsAnalyticsGetDashboardTypeLabel,
  logisticsAnalyticsIsCompleted,
  logisticsAnalyticsIsProcessing,
} from './logistics/logistics-analytics.constants';

export type {
  LogisticsAnalyticsType,
  LogisticsAnalyticsStatus,
  LogisticsAnalyticsMetric,
  LogisticsAnalyticsPeriod,
  LogisticsAnalyticsAggregation,
  LogisticsAnalyticsDashboardType,
  LogisticsAnalyticsChartType,
} from './logistics/logistics-analytics.constants';

// Logistics Analytics Type Constants
export {
  LOGISTICS_ANALYTICS_TYPE,
  logisticsAnalyticsTypeGetCategoryLabel,
  logisticsAnalyticsTypeGetScopeLabel,
  logisticsAnalyticsTypeGetDimensionLabel,
  logisticsAnalyticsTypeGetFormatLabel,
  logisticsAnalyticsTypeGetDataSourceLabel,
  logisticsAnalyticsTypeGetExportFormatLabel,
} from './logistics/logistics-analytics-type.constants';

export type {
  LogisticsAnalyticsTypeCategory,
  LogisticsAnalyticsTypeScope,
  LogisticsAnalyticsTypeDimension,
  LogisticsAnalyticsTypeFilter,
  LogisticsAnalyticsTypeFormat,
  LogisticsAnalyticsTypeDataSource,
  LogisticsAnalyticsTypeExportFormat,
} from './logistics/logistics-analytics-type.constants';

// Analytics Main Constants
export {
  ANALYTICS,
  getAnalyticsStatusLabel,
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

// Analytics Type Constants
export {
  ANALYTICS_TYPE,
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

// Analytics Category Constants
export {
  ANALYTICS_CATEGORY,
  getAnalyticsCategoryLabel,
  getAnalyticsSubCategoryLabel,
  getAnalyticsCategoryGroupLabel,
  getAnalyticsCategoryPriorityLabel,
  getAnalyticsCategoryStatusLabel,
  isAnalyticsCategoryActive,
  isAnalyticsCategoryArchived,
} from './analytics-category.constants';

export type {
  AnalyticsCategoryType,
  AnalyticsSubCategoryType,
  AnalyticsCategoryGroup,
  AnalyticsCategoryPriority,
  AnalyticsCategoryVisibility,
  AnalyticsCategoryStatus,
} from './analytics-category.constants';

// Analytics Source Constants
export {
  ANALYTICS_SOURCE,
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

export type {
  AnalyticsSourceType,
  AnalyticsSourceCategory,
  AnalyticsSourceSubCategory,
  AnalyticsSourceTypeEnum,
  AnalyticsSourceConfidence,
  AnalyticsSourceValidity,
} from './analytics-source.constants';

// Analytics Medium Constants
export {
  ANALYTICS_MEDIUM,
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

export type {
  AnalyticsMediumType,
  AnalyticsMediumCategory,
  AnalyticsMediumTypeEnum,
  AnalyticsMediumChannel,
  AnalyticsMediumPriority,
} from './analytics-medium.constants';

// Analytics Campaign Constants
export {
  ANALYTICS_CAMPAIGN,
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

// Analytics Event Constants
export {
  ANALYTICS_EVENT,
  getAnalyticsEventCategoryLabel,
  getAnalyticsEventActionLabel,
  getAnalyticsEventLabelName,
  getAnalyticsEventPriorityLabel,
  getAnalyticsEventStatusLabel,
  isAnalyticsEventCompleted,
  isAnalyticsEventProcessing,
  isAnalyticsEventFailed,
} from './analytics-event.constants';

export type {
  AnalyticsEventCategory,
  AnalyticsEventAction,
  AnalyticsEventLabel,
  AnalyticsEventValue,
  AnalyticsEventPriority,
  AnalyticsEventStatus,
} from './analytics-event.constants';

// Analytics Metric Constants
export {
  ANALYTICS_METRIC,
  getAnalyticsMetricLabel as getAnalyticsMetricLabelName,
  getAnalyticsMetricCategoryLabel,
  getAnalyticsMetricTypeLabel,
  getAnalyticsMetricFormatLabel,
  getAnalyticsMetricPriorityLabel,
  getAnalyticsMetricCategory,
} from './analytics-metric.constants';

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

// Analytics Dimension Constants
export {
  ANALYTICS_DIMENSION,
  getAnalyticsDimensionLabel,
  getAnalyticsDimensionCategoryLabel,
  getAnalyticsDimensionTypeLabel,
  getAnalyticsDimensionCategory,
} from './analytics-dimension.constants';

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

// Analytics Filter Constants
export {
  ANALYTICS_FILTER,
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

export type {
  AnalyticsFilterOperator,
  AnalyticsFilterDataType,
  AnalyticsFilterCategory,
  AnalyticsFilterLogicType,
  AnalyticsFilterMatchType,
  AnalyticsFilterPriority,
  AnalyticsFilterScope,
} from './analytics-filter.constants';

// Analytics Period Constants
export {
  ANALYTICS_PERIOD,
  getAnalyticsPeriodLabel,
  getAnalyticsPeriodTypeLabel,
  getAnalyticsPeriodGranularityLabel,
  getAnalyticsPeriodComparisonTypeLabel,
  isAnalyticsPeriodRolling,
  isAnalyticsPeriodFixed,
  isAnalyticsPeriodRelative,
  getAnalyticsPeriodDays,
} from './analytics-period.constants';

export type {
  AnalyticsPeriodType,
  AnalyticsPeriodTypeEnum,
  AnalyticsPeriodGranularity,
  AnalyticsPeriodComparisonType,
  AnalyticsPeriodFormat,
} from './analytics-period.constants';

// Analytics Interval Constants
export {
  ANALYTICS_INTERVAL,
  getAnalyticsIntervalLabel as getAnalyticsIntervalLabelName,
  getAnalyticsIntervalCategoryLabel,
  getAnalyticsIntervalUnitLabel,
  getAnalyticsIntervalFormatLabel,
  getAnalyticsIntervalCategory,
  getAnalyticsIntervalUnit,
  getAnalyticsIntervalSeconds,
} from './analytics-interval.constants';

export type {
  AnalyticsIntervalType,
  AnalyticsIntervalCategory,
  AnalyticsIntervalUnit,
  AnalyticsIntervalFormat,
  AnalyticsIntervalGroupingType,
} from './analytics-interval.constants';

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

// User Analytics Constants
export {
  USER_ANALYTICS,
  getUserAnalyticsStatusLabel,
  getUserAnalyticsEventLabel,
  getUserAnalyticsDimensionLabel,
  getUserAnalyticsSegmentLabel,
  getUserAnalyticsCohortLabel,
  getUserAnalyticsGranularityLabel,
  isUserAnalyticsActive,
  isUserAnalyticsCompleted,
  isUserAnalyticsFailed,
  isUserAnalyticsLifecycleEvent,
  isUserAnalyticsEngagementEvent,
} from './user-analytics/user-analytics.constants';

export type {
  UserAnalyticsType,
  UserAnalyticsStatus,
  UserAnalyticsScope,
  UserAnalyticsEvent,
  UserAnalyticsDimension,
  UserAnalyticsMetric,
  UserAnalyticsSegment,
  UserAnalyticsCohort,
  UserAnalyticsGranularity,
} from './user-analytics/user-analytics.constants';

// User Analytics Type Constants
export {
  USER_ANALYTICS_TYPE,
  getUserAnalyticsAnalysisTypeLabel,
  getUserAnalyticsDataTypeLabel,
  getUserAnalyticsUserTypeLabel,
  getUserAnalyticsEngagementLevelLabel,
  getUserAnalyticsLifecycleStageLabel,
  getUserAnalyticsSatisfactionLevelLabel,
  getUserAnalyticsTrustLevelLabel,
  getUserAnalyticsPrivacyLevelLabel,
  isUserAnalyticsDescriptive,
  isUserAnalyticsPredictive,
  getUserAnalyticsEngagementLevel,
  getUserAnalyticsSatisfactionLevel,
  getUserAnalyticsLifecycleStage,
} from './user-analytics/user-analytics-type.constants';

export type {
  UserAnalyticsAnalysisType,
  UserAnalyticsDataType,
  UserAnalyticsUserType,
  UserAnalyticsEngagementLevel,
  UserAnalyticsLifecycleStage,
  UserAnalyticsSatisfactionLevel,
  UserAnalyticsTrustLevel,
  UserAnalyticsPrivacyLevel,
} from './user-analytics/user-analytics-type.constants';

// User Analytics Metric Constants
export {
  USER_ANALYTICS_METRIC,
  getUserAnalyticsMetricLabel,
  getUserAnalyticsMetricCategoryLabel,
  getUserAnalyticsMetricTypeLabel,
  getUserAnalyticsMetricFormatLabel,
  getUserAnalyticsMetricCategory,
  getUserAnalyticsMetricType,
  getUserAnalyticsMetricFormat,
  calculateUserAnalyticsRetentionRate,
  calculateUserAnalyticsChurnRate,
  calculateUserAnalyticsEngagementRate,
  calculateUserAnalyticsNPS,
} from './user-analytics/user-analytics-metric.constants';

export type {
  UserAnalyticsCountMetric,
  UserAnalyticsRateMetric,
  UserAnalyticsDurationMetric,
  UserAnalyticsValueMetric,
  UserAnalyticsEngagementMetric,
  UserAnalyticsRetentionMetric,
  UserAnalyticsSatisfactionMetric,
  UserAnalyticsMetricCategory,
  UserAnalyticsMetricType,
  UserAnalyticsMetricFormat,
} from './user-analytics/user-analytics-metric.constants';

// Product Analytics Constants
export {
  PRODUCT_ANALYTICS,
  getProductAnalyticsStatusLabel,
  getProductAnalyticsEventLabel,
  getProductAnalyticsDimensionLabel,
  getProductAnalyticsSegmentLabel,
  getProductAnalyticsCohortLabel,
  getProductAnalyticsGranularityLabel,
  isProductAnalyticsActive,
  isProductAnalyticsCompleted,
  isProductAnalyticsFailed,
  isProductAnalyticsLifecycleEvent,
  isProductAnalyticsViewEvent,
  isProductAnalyticsCartEvent,
  isProductAnalyticsPurchaseEvent,
} from './product-analytics/product-analytics.constants';

export type {
  ProductAnalyticsType,
  ProductAnalyticsStatus,
  ProductAnalyticsScope,
  ProductAnalyticsEvent,
  ProductAnalyticsDimension,
  ProductAnalyticsMetric,
  ProductAnalyticsSegment,
  ProductAnalyticsCohort,
  ProductAnalyticsGranularity,
} from './product-analytics/product-analytics.constants';

// Product Analytics Type Constants
export {
  PRODUCT_ANALYTICS_TYPE,
  getProductAnalyticsAnalysisTypeLabel,
  getProductAnalyticsDataTypeLabel,
  getProductAnalyticsProductCategoryLabel,
  getProductAnalyticsProductStatusLabel,
  getProductAnalyticsProductTypeLabel,
  getProductAnalyticsStockStatusLabel,
  getProductAnalyticsPricingTypeLabel,
  getProductAnalyticsPerformanceLevelLabel,
  getProductAnalyticsReviewTypeLabel,
  isProductAnalyticsPerformanceAnalysis,
  isProductAnalyticsCategoryAnalysis,
  isProductAnalyticsInventoryAnalysis,
  isProductAnalyticsPredictive,
  getProductAnalyticsPerformanceLevel,
} from './product-analytics/product-analytics-type.constants';

export type {
  ProductAnalyticsAnalysisType,
  ProductAnalyticsDataType,
  ProductAnalyticsProductCategory,
  ProductAnalyticsProductStatus,
  ProductAnalyticsProductType,
  ProductAnalyticsStockStatus,
  ProductAnalyticsPricingType,
  ProductAnalyticsPerformanceLevel,
  ProductAnalyticsReviewType,
} from './product-analytics/product-analytics-type.constants';

// Product Analytics Metric Constants
export {
  PRODUCT_ANALYTICS_METRIC,
  getProductAnalyticsMetricLabel,
  getProductAnalyticsMetricCategoryLabel,
  getProductAnalyticsMetricTypeLabel,
  getProductAnalyticsMetricFormatLabel,
  getProductAnalyticsMetricPriorityLabel,
  getProductAnalyticsMetricCategory,
  getProductAnalyticsMetricType,
  getProductAnalyticsMetricFormat,
  calculateProductAnalyticsConversionRate,
  calculateProductAnalyticsReturnRate,
  calculateProductAnalyticsProfitMargin,
  calculateProductAnalyticsTurnoverRate,
} from './product-analytics/product-analytics-metric.constants';

export type {
  ProductAnalyticsCountMetric,
  ProductAnalyticsViewMetric,
  ProductAnalyticsEngagementMetric,
  ProductAnalyticsSalesMetric,
  ProductAnalyticsRevenueMetric,
  ProductAnalyticsProfitMetric,
  ProductAnalyticsInventoryMetric,
  ProductAnalyticsPerformanceMetric,
  ProductAnalyticsReviewMetric,
  ProductAnalyticsMetricCategory,
  ProductAnalyticsMetricType,
  ProductAnalyticsMetricFormat,
  ProductAnalyticsMetricPriority,
} from './product-analytics/product-analytics-metric.constants';

// Sales Analytics Constants
export {
  SALES_ANALYTICS,
  getSalesAnalyticsStatusLabel,
  getSalesAnalyticsEventLabel,
  getSalesAnalyticsDimensionLabel,
  getSalesAnalyticsSegmentLabel,
  getSalesAnalyticsCohortLabel,
  getSalesAnalyticsGranularityLabel,
  isSalesAnalyticsActive,
  isSalesAnalyticsCompleted,
  isSalesAnalyticsFailed,
  isSalesAnalyticsTransactionEvent,
  isSalesAnalyticsOrderEvent,
  isSalesAnalyticsPaymentEvent,
  isSalesAnalyticsPromotionEvent,
} from './sales-analytics/sales-analytics.constants';

export type {
  SalesAnalyticsType,
  SalesAnalyticsStatus,
  SalesAnalyticsScope,
  SalesAnalyticsEvent,
  SalesAnalyticsDimension,
  SalesAnalyticsMetric,
  SalesAnalyticsSegment,
  SalesAnalyticsCohort,
  SalesAnalyticsGranularity,
} from './sales-analytics/sales-analytics.constants';

// Sales Analytics Type Constants
export {
  SALES_ANALYTICS_TYPE,
  getSalesAnalyticsAnalysisTypeLabel,
  getSalesAnalyticsDataTypeLabel,
  getSalesAnalyticsChannelLabel,
  getSalesAnalyticsOrderStatusLabel,
  getSalesAnalyticsPaymentStatusLabel,
  getSalesAnalyticsSalesTypeLabel,
  getSalesAnalyticsPerformanceLevelLabel,
  getSalesAnalyticsGrowthRateLabel,
  getSalesAnalyticsPeriodLabel,
  isSalesAnalyticsPerformanceAnalysis,
  isSalesAnalyticsComparative,
  isSalesAnalyticsPredictive,
  getSalesAnalyticsPerformanceLevel,
  getSalesAnalyticsGrowthRate,
} from './sales-analytics/sales-analytics-type.constants';

export type {
  SalesAnalyticsAnalysisType,
  SalesAnalyticsDataType,
  SalesAnalyticsChannel,
  SalesAnalyticsOrderStatus,
  SalesAnalyticsPaymentStatus,
  SalesAnalyticsSalesType,
  SalesAnalyticsPerformanceLevel,
  SalesAnalyticsGrowthRate,
  SalesAnalyticsPeriod,
} from './sales-analytics/sales-analytics-type.constants';

// Sales Analytics Metric Constants
export {
  SALES_ANALYTICS_METRIC,
  getSalesAnalyticsMetricLabel,
  getSalesAnalyticsMetricCategoryLabel,
  getSalesAnalyticsMetricTypeLabel,
  getSalesAnalyticsMetricFormatLabel,
  getSalesAnalyticsMetricPriorityLabel,
  getSalesAnalyticsMetricCategory,
  getSalesAnalyticsMetricType,
  getSalesAnalyticsMetricFormat,
  calculateSalesAnalyticsConversionRate,
  calculateSalesAnalyticsAverageOrderValue,
  calculateSalesAnalyticsGrowthRate,
  calculateSalesAnalyticsProfitMargin,
  calculateSalesAnalyticsRetentionRate,
  calculateSalesAnalyticsChurnRate,
  calculateSalesAnalyticsReturnRate,
  calculateSalesAnalyticsNPS,
} from './sales-analytics/sales-analytics-metric.constants';

export type {
  SalesAnalyticsCountMetric,
  SalesAnalyticsRevenueMetric,
  SalesAnalyticsProfitMetric,
  SalesAnalyticsGrowthMetric,
  SalesAnalyticsConversionMetric,
  SalesAnalyticsChannelMetric,
  SalesAnalyticsEfficiencyMetric,
  SalesAnalyticsQualityMetric,
  SalesAnalyticsMetricCategory,
  SalesAnalyticsMetricType,
  SalesAnalyticsMetricFormat,
  SalesAnalyticsMetricPriority,
} from './sales-analytics/sales-analytics-metric.constants';

// Order Analytics Constants
export {
  ORDER_ANALYTICS,
  getOrderAnalyticsStatusLabel,
  getOrderAnalyticsEventLabel,
  getOrderAnalyticsDimensionLabel,
  getOrderAnalyticsSegmentLabel,
  getOrderAnalyticsCohortLabel,
  getOrderAnalyticsGranularityLabel,
  isOrderAnalyticsActive,
  isOrderAnalyticsCompleted,
  isOrderAnalyticsFailed,
  isOrderAnalyticsLifecycleEvent,
  isOrderAnalyticsFulfillmentEvent,
  isOrderAnalyticsDeliveryEvent,
  isOrderAnalyticsReturnEvent,
} from './order-analytics/order-analytics.constants';

export type {
  OrderAnalyticsType,
  OrderAnalyticsStatus,
  OrderAnalyticsScope,
  OrderAnalyticsEvent,
  OrderAnalyticsDimension,
  OrderAnalyticsMetric,
  OrderAnalyticsSegment,
  OrderAnalyticsCohort,
  OrderAnalyticsGranularity,
} from './order-analytics/order-analytics.constants';

// Order Analytics Type Constants
export {
  ORDER_ANALYTICS_TYPE,
  getOrderAnalyticsAnalysisTypeLabel,
  getOrderAnalyticsDataTypeLabel,
  getOrderAnalyticsOrderStatusLabel,
  getOrderAnalyticsOrderTypeLabel,
  getOrderAnalyticsOrderPriorityLabel,
  getOrderAnalyticsFulfillmentStatusLabel,
  getOrderAnalyticsDeliveryStatusLabel,
  getOrderAnalyticsReturnStatusLabel,
  getOrderAnalyticsDeliveryMethodLabel,
  getOrderAnalyticsOrderChannelLabel,
  getOrderAnalyticsPerformanceLevelLabel,
  getOrderAnalyticsCompletionRateLabel,
  isOrderAnalyticsPerformanceAnalysis,
  isOrderAnalyticsComparative,
  isOrderAnalyticsPredictive,
  getOrderAnalyticsPerformanceLevel,
  getOrderAnalyticsCompletionRate,
} from './order-analytics/order-analytics-type.constants';

export type {
  OrderAnalyticsAnalysisType,
  OrderAnalyticsDataType,
  OrderAnalyticsOrderStatus,
  OrderAnalyticsOrderType,
  OrderAnalyticsOrderPriority,
  OrderAnalyticsFulfillmentStatus,
  OrderAnalyticsDeliveryStatus,
  OrderAnalyticsReturnStatus,
  OrderAnalyticsDeliveryMethod,
  OrderAnalyticsOrderChannel,
  OrderAnalyticsPerformanceLevel,
  OrderAnalyticsCompletionRate,
} from './order-analytics/order-analytics-type.constants';

// Order Analytics Metric Constants
export {
  ORDER_ANALYTICS_METRIC,
  getOrderAnalyticsMetricLabel,
  getOrderAnalyticsMetricCategoryLabel,
  getOrderAnalyticsMetricTypeLabel,
  getOrderAnalyticsMetricFormatLabel,
  getOrderAnalyticsMetricPriorityLabel,
  getOrderAnalyticsMetricCategory,
  getOrderAnalyticsMetricType,
  getOrderAnalyticsMetricFormat,
  calculateOrderAnalyticsAverageOrderValue,
  calculateOrderAnalyticsCompletionRate,
  calculateOrderAnalyticsOnTimeDeliveryRate,
  calculateOrderAnalyticsReturnRate,
  calculateOrderAnalyticsCancellationRate,
  calculateOrderAnalyticsSuccessRate,
  calculateOrderAnalyticsAverageTime,
  calculateOrderAnalyticsAccuracyRate,
  calculateOrderAnalyticsSatisfactionScore,
} from './order-analytics/order-analytics-metric.constants';

export type {
  OrderAnalyticsCountMetric,
  OrderAnalyticsValueMetric,
  OrderAnalyticsVolumeMetric,
  OrderAnalyticsTimeMetric,
  OrderAnalyticsQualityMetric,
  OrderAnalyticsChannelMetric,
  OrderAnalyticsComparisonMetric,
  OrderAnalyticsMetricCategory,
  OrderAnalyticsMetricType,
  OrderAnalyticsMetricFormat,
  OrderAnalyticsMetricPriority,
} from './order-analytics/order-analytics-metric.constants';

// Vendor Analytics Constants
export {
  VENDOR_ANALYTICS,
  getVendorAnalyticsStatusLabel,
  getVendorAnalyticsEventLabel,
  getVendorAnalyticsDimensionLabel,
  getVendorAnalyticsSegmentLabel,
  getVendorAnalyticsCohortLabel,
  getVendorAnalyticsGranularityLabel,
  isVendorAnalyticsActive,
  isVendorAnalyticsCompleted,
  isVendorAnalyticsFailed,
  isVendorAnalyticsLifecycleEvent,
  isVendorAnalyticsFinancialEvent,
  isVendorAnalyticsQualityEvent,
  isVendorAnalyticsComplianceEvent,
} from './vendor-analytics/vendor-analytics.constants';

export type {
  VendorAnalyticsType,
  VendorAnalyticsStatus,
  VendorAnalyticsScope,
  VendorAnalyticsEvent,
  VendorAnalyticsDimension,
  VendorAnalyticsMetric,
  VendorAnalyticsSegment,
  VendorAnalyticsCohort,
  VendorAnalyticsGranularity,
} from './vendor-analytics/vendor-analytics.constants';

// Vendor Analytics Type Constants
export {
  VENDOR_ANALYTICS_TYPE,
  getVendorAnalyticsAnalysisTypeLabel,
  getVendorAnalyticsDataTypeLabel,
  getVendorAnalyticsVendorStatusLabel,
  getVendorAnalyticsVendorTypeLabel,
  getVendorAnalyticsVendorTierLabel,
  getVendorAnalyticsPerformanceLevelLabel,
  getVendorAnalyticsComplianceLevelLabel,
  getVendorAnalyticsRiskLevelLabel,
  getVendorAnalyticsSatisfactionLevelLabel,
  getVendorAnalyticsRelationshipStatusLabel,
  isVendorAnalyticsPerformanceAnalysis,
  isVendorAnalyticsComparative,
  isVendorAnalyticsPredictive,
  getVendorAnalyticsPerformanceLevel,
  getVendorAnalyticsComplianceLevel,
  getVendorAnalyticsRiskLevel,
} from './vendor-analytics/vendor-analytics-type.constants';

export type {
  VendorAnalyticsAnalysisType,
  VendorAnalyticsDataType,
  VendorAnalyticsVendorStatus,
  VendorAnalyticsVendorType,
  VendorAnalyticsVendorTier,
  VendorAnalyticsPerformanceLevel,
  VendorAnalyticsComplianceLevel,
  VendorAnalyticsRiskLevel,
  VendorAnalyticsSatisfactionLevel,
  VendorAnalyticsRelationshipStatus,
} from './vendor-analytics/vendor-analytics-type.constants';

// Vendor Analytics Metric Constants
export {
  VENDOR_ANALYTICS_METRIC,
  getVendorAnalyticsMetricLabel,
  getVendorAnalyticsMetricCategoryLabel,
  getVendorAnalyticsMetricTypeLabel,
  getVendorAnalyticsMetricFormatLabel,
  getVendorAnalyticsMetricPriorityLabel,
  getVendorAnalyticsMetricCategory,
  getVendorAnalyticsMetricType,
  getVendorAnalyticsMetricFormat,
  calculateVendorAnalyticsRetentionRate,
  calculateVendorAnalyticsChurnRate,
  calculateVendorAnalyticsConversionRate,
  calculateVendorAnalyticsComplianceRate,
  calculateVendorAnalyticsQualityScore,
  calculateVendorAnalyticsFulfillmentRate,
} from './vendor-analytics/vendor-analytics-metric.constants';

export type {
  VendorAnalyticsCountMetric,
  VendorAnalyticsRevenueMetric,
  VendorAnalyticsSalesMetric,
  VendorAnalyticsProfitMetric,
  VendorAnalyticsCommissionMetric,
  VendorAnalyticsQualityMetric,
  VendorAnalyticsComplianceMetric,
  VendorAnalyticsPerformanceMetric,
  VendorAnalyticsRelationshipMetric,
  VendorAnalyticsComparisonMetric,
  VendorAnalyticsMetricCategory,
  VendorAnalyticsMetricType,
  VendorAnalyticsMetricFormat,
  VendorAnalyticsMetricPriority,
} from './vendor-analytics/vendor-analytics-metric.constants';

// Marketing Analytics Constants
export {
  MARKETING_ANALYTICS,
  getMarketingAnalyticsStatusLabel,
  getMarketingAnalyticsEventLabel,
  getMarketingAnalyticsDimensionLabel,
  getMarketingAnalyticsSegmentLabel,
  getMarketingAnalyticsCohortLabel,
  getMarketingAnalyticsGranularityLabel,
  isMarketingAnalyticsActive,
  isMarketingAnalyticsCompleted,
  isMarketingAnalyticsFailed,
  isMarketingAnalyticsCampaignEvent,
  isMarketingAnalyticsEmailEvent,
  isMarketingAnalyticsSocialEvent,
  isMarketingAnalyticsCustomerEvent,
} from './marketing-analytics/marketing-analytics.constants';

export type {
  MarketingAnalyticsType,
  MarketingAnalyticsStatus,
  MarketingAnalyticsScope,
  MarketingAnalyticsEvent,
  MarketingAnalyticsDimension,
  MarketingAnalyticsMetric,
  MarketingAnalyticsSegment,
  MarketingAnalyticsCohort,
  MarketingAnalyticsGranularity,
} from './marketing-analytics/marketing-analytics.constants';

// Marketing Analytics Type Constants
export {
  MARKETING_ANALYTICS_TYPE,
  getMarketingAnalyticsAnalysisTypeLabel,
  getMarketingAnalyticsDataTypeLabel,
  getMarketingAnalyticsCampaignTypeLabel,
  getMarketingAnalyticsMarketingChannelLabel,
  getMarketingAnalyticsCampaignStatusLabel,
  getMarketingAnalyticsCampaignObjectiveLabel,
  getMarketingAnalyticsPerformanceLevelLabel,
  getMarketingAnalyticsEngagementLevelLabel,
  getMarketingAnalyticsSentimentTypeLabel,
  isMarketingAnalyticsCampaignAnalysis,
  isMarketingAnalyticsDigitalMarketing,
  isMarketingAnalyticsBrandAnalysis,
  getMarketingAnalyticsPerformanceLevel,
  getMarketingAnalyticsEngagementLevel,
  getMarketingAnalyticsSentimentType,
} from './marketing-analytics/marketing-analytics-type.constants';

export type {
  MarketingAnalyticsAnalysisType,
  MarketingAnalyticsDataType,
  MarketingAnalyticsCampaignType,
  MarketingAnalyticsMarketingChannel,
  MarketingAnalyticsCampaignStatus,
  MarketingAnalyticsCampaignObjective,
  MarketingAnalyticsPerformanceLevel,
  MarketingAnalyticsEngagementLevel,
  MarketingAnalyticsSentimentType,
} from './marketing-analytics/marketing-analytics-type.constants';

// Marketing Analytics Metric Constants
export {
  MARKETING_ANALYTICS_METRIC,
  getMarketingAnalyticsMetricLabel,
  getMarketingAnalyticsMetricCategoryLabel,
  getMarketingAnalyticsMetricTypeLabel,
  getMarketingAnalyticsMetricFormatLabel,
  getMarketingAnalyticsMetricPriorityLabel,
  getMarketingAnalyticsMetricCategory,
  getMarketingAnalyticsMetricType,
  getMarketingAnalyticsMetricFormat,
  calculateMarketingAnalyticsROI,
  calculateMarketingAnalyticsROAS,
  calculateMarketingAnalyticsConversionRate,
  calculateMarketingAnalyticsEngagementRate,
  calculateMarketingAnalyticsCTR,
  calculateMarketingAnalyticsRetentionRate,
  calculateMarketingAnalyticsChurnRate,
  calculateMarketingAnalyticsNPS,
} from './marketing-analytics/marketing-analytics-metric.constants';

export type {
  MarketingAnalyticsCountMetric,
  MarketingAnalyticsReachMetric,
  MarketingAnalyticsEngagementMetric,
  MarketingAnalyticsConversionMetric,
  MarketingAnalyticsROIMetric,
  MarketingAnalyticsBrandMetric,
  MarketingAnalyticsCustomerMetric,
  MarketingAnalyticsChannelMetric,
  MarketingAnalyticsTimeMetric,
  MarketingAnalyticsComparisonMetric,
  MarketingAnalyticsMetricCategory,
  MarketingAnalyticsMetricType,
  MarketingAnalyticsMetricFormat,
  MarketingAnalyticsMetricPriority,
} from './marketing-analytics/marketing-analytics-metric.constants';

// Traffic Analytics Constants
export {
  TRAFFIC_ANALYTICS,
  getTrafficAnalyticsStatusLabel,
  getTrafficAnalyticsEventLabel,
  getTrafficAnalyticsDimensionLabel,
  getTrafficAnalyticsSegmentLabel,
  getTrafficAnalyticsCohortLabel,
  getTrafficAnalyticsGranularityLabel,
  isTrafficAnalyticsActive,
  isTrafficAnalyticsCompleted,
  isTrafficAnalyticsFailed,
  isTrafficAnalyticsPageEvent,
  isTrafficAnalyticsVisitorEvent,
  isTrafficAnalyticsSessionEvent,
  isTrafficAnalyticsSourceEvent,
} from './traffic-analytics/traffic-analytics.constants';

export type {
  TrafficAnalyticsType,
  TrafficAnalyticsStatus,
  TrafficAnalyticsScope,
  TrafficAnalyticsEvent,
  TrafficAnalyticsDimension,
  TrafficAnalyticsMetric,
  TrafficAnalyticsSegment,
  TrafficAnalyticsCohort,
  TrafficAnalyticsGranularity,
} from './traffic-analytics/traffic-analytics.constants';

// Traffic Analytics Type Constants
export {
  TRAFFIC_ANALYTICS_TYPE,
  getTrafficAnalyticsAnalysisTypeLabel,
  getTrafficAnalyticsDataTypeLabel,
  getTrafficAnalyticsSourceTypeLabel,
  getTrafficAnalyticsDeviceTypeLabel,
  getTrafficAnalyticsBrowserTypeLabel,
  getTrafficAnalyticsOSTypeLabel,
  getTrafficAnalyticsVisitorTypeLabel,
  getTrafficAnalyticsSessionQualityLabel,
  getTrafficAnalyticsEngagementLevelLabel,
  getTrafficAnalyticsBounceTypeLabel,
  getTrafficAnalyticsConversionTypeLabel,
  getTrafficAnalyticsFunnelTypeLabel,
  isTrafficAnalyticsSourceAnalysis,
  isTrafficAnalyticsVisitorAnalysis,
  isTrafficAnalyticsDeviceAnalysis,
  isTrafficAnalyticsPredictive,
  getTrafficAnalyticsEngagementLevel,
  getTrafficAnalyticsSessionQuality,
} from './traffic-analytics/traffic-analytics-type.constants';

export type {
  TrafficAnalyticsAnalysisType,
  TrafficAnalyticsDataType,
  TrafficAnalyticsSourceType,
  TrafficAnalyticsDeviceType,
  TrafficAnalyticsBrowserType,
  TrafficAnalyticsOSType,
  TrafficAnalyticsVisitorType,
  TrafficAnalyticsSessionQuality,
  TrafficAnalyticsEngagementLevel,
  TrafficAnalyticsBounceType,
  TrafficAnalyticsConversionType,
  TrafficAnalyticsFunnelType,
} from './traffic-analytics/traffic-analytics-type.constants';

// Traffic Analytics Metric Constants
export {
  TRAFFIC_ANALYTICS_METRIC,
  getTrafficAnalyticsMetricLabel,
  getTrafficAnalyticsMetricCategoryLabel,
  getTrafficAnalyticsMetricTypeLabel,
  getTrafficAnalyticsMetricFormatLabel,
  getTrafficAnalyticsMetricPriorityLabel,
  getTrafficAnalyticsMetricCategory,
  getTrafficAnalyticsMetricType,
  getTrafficAnalyticsMetricFormat,
  calculateTrafficAnalyticsBounceRate,
  calculateTrafficAnalyticsExitRate,
  calculateTrafficAnalyticsConversionRate,
  calculateTrafficAnalyticsVisitorGrowth,
  calculateTrafficAnalyticsEngagementRate,
  calculateTrafficAnalyticsAvgSessionDuration,
  calculateTrafficAnalyticsPageViewsPerSession,
  calculateTrafficAnalyticsTrafficDiversity,
} from './traffic-analytics/traffic-analytics-metric.constants';

export type {
  TrafficAnalyticsVisitorMetric,
  TrafficAnalyticsSessionMetric,
  TrafficAnalyticsPageViewMetric,
  TrafficAnalyticsBounceMetric,
  TrafficAnalyticsSourceMetric,
  TrafficAnalyticsDeviceMetric,
  TrafficAnalyticsBrowserMetric,
  TrafficAnalyticsLocationMetric,
  TrafficAnalyticsTimeMetric,
  TrafficAnalyticsPerformanceMetric,
  TrafficAnalyticsConversionMetric,
  TrafficAnalyticsComparisonMetric,
  TrafficAnalyticsMetricCategory,
  TrafficAnalyticsMetricType,
  TrafficAnalyticsMetricFormat,
  TrafficAnalyticsMetricPriority,
} from './traffic-analytics/traffic-analytics-metric.constants';

// Performance Analytics Constants
export {
  PERFORMANCE_ANALYTICS,
  getPerformanceAnalyticsStatusLabel,
  getPerformanceAnalyticsEventLabel,
  getPerformanceAnalyticsDimensionLabel,
  getPerformanceAnalyticsSegmentLabel,
  getPerformanceAnalyticsCohortLabel,
  getPerformanceAnalyticsGranularityLabel,
  isPerformanceAnalyticsActive,
  isPerformanceAnalyticsCompleted,
  isPerformanceAnalyticsFailed,
  isPerformanceAnalyticsSystemEvent,
  isPerformanceAnalyticsResourceEvent,
  isPerformanceAnalyticsApplicationEvent,
  isPerformanceAnalyticsPerformanceEvent,
  getPerformanceAnalyticsThresholdStatus,
  getPerformanceAnalyticsResponseThreshold,
  getPerformanceAnalyticsLatencyThreshold,
  getPerformanceAnalyticsErrorThreshold,
} from './performance-analytics/performance-analytics.constants';

export type {
  PerformanceAnalyticsType,
  PerformanceAnalyticsStatus,
  PerformanceAnalyticsScope,
  PerformanceAnalyticsEvent,
  PerformanceAnalyticsDimension,
  PerformanceAnalyticsMetric,
  PerformanceAnalyticsSegment,
  PerformanceAnalyticsCohort,
  PerformanceAnalyticsGranularity,
  PerformanceAnalyticsThreshold,
} from './performance-analytics/performance-analytics.constants';

// Performance Analytics Type Constants
export {
  PERFORMANCE_ANALYTICS_TYPE,
  getPerformanceAnalyticsAnalysisTypeLabel,
  getPerformanceAnalyticsDataTypeLabel,
  getPerformanceAnalyticsSystemTypeLabel,
  getPerformanceAnalyticsEnvironmentTypeLabel,
  getPerformanceAnalyticsPerformanceLevelLabel,
  getPerformanceAnalyticsResponseCategoryLabel,
  getPerformanceAnalyticsLatencyCategoryLabel,
  getPerformanceAnalyticsThroughputCategoryLabel,
  getPerformanceAnalyticsErrorCategoryLabel,
  getPerformanceAnalyticsUXCategoryLabel,
  getPerformanceAnalyticsBusinessCategoryLabel,
  isPerformanceAnalyticsSystemAnalysis,
  isPerformanceAnalyticsApplicationAnalysis,
  isPerformanceAnalyticsComparative,
  isPerformanceAnalyticsPredictive,
  getPerformanceAnalyticsPerformanceLevel,
  getPerformanceAnalyticsResponseCategory,
  getPerformanceAnalyticsLatencyCategory,
  getPerformanceAnalyticsErrorCategory,
} from './performance-analytics/performance-analytics-type.constants';

export type {
  PerformanceAnalyticsAnalysisType,
  PerformanceAnalyticsDataType,
  PerformanceAnalyticsSystemType,
  PerformanceAnalyticsEnvironmentType,
  PerformanceAnalyticsPerformanceLevel,
  PerformanceAnalyticsResponseCategory,
  PerformanceAnalyticsLatencyCategory,
  PerformanceAnalyticsThroughputCategory,
  PerformanceAnalyticsErrorCategory,
  PerformanceAnalyticsUXCategory,
  PerformanceAnalyticsBusinessCategory,
} from './performance-analytics/performance-analytics-type.constants';

// Performance Analytics Metric Constants
export {
  PERFORMANCE_ANALYTICS_METRIC,
  getPerformanceAnalyticsMetricLabel,
  getPerformanceAnalyticsMetricCategoryLabel,
  getPerformanceAnalyticsMetricTypeLabel,
  getPerformanceAnalyticsMetricFormatLabel,
  getPerformanceAnalyticsMetricPriorityLabel,
  getPerformanceAnalyticsMetricCategory,
  getPerformanceAnalyticsMetricType,
  getPerformanceAnalyticsMetricFormat,
  calculatePerformanceAnalyticsAverage,
  calculatePerformanceAnalyticsPercentile,
  calculatePerformanceAnalyticsStdDev,
  calculatePerformanceAnalyticsErrorRate,
  calculatePerformanceAnalyticsGrowthRate,
  calculatePerformanceAnalyticsThroughput,
  calculatePerformanceAnalyticsCacheHitRate,
} from './performance-analytics/performance-analytics-metric.constants';

export type {
  PerformanceAnalyticsSystemMetric,
  PerformanceAnalyticsResponseMetric,
  PerformanceAnalyticsThroughputMetric,
  PerformanceAnalyticsLatencyMetric,
  PerformanceAnalyticsErrorMetric,
  PerformanceAnalyticsDatabaseMetric,
  PerformanceAnalyticsAPIMetric,
  PerformanceAnalyticsFrontendMetric,
  PerformanceAnalyticsUXMetric,
  PerformanceAnalyticsBusinessMetric,
  PerformanceAnalyticsComparisonMetric,
  PerformanceAnalyticsMetricCategory,
  PerformanceAnalyticsMetricType,
  PerformanceAnalyticsMetricFormat,
  PerformanceAnalyticsMetricPriority,
} from './performance-analytics/performance-analytics-metric.constants';

// Financial Analytics Constants
export {
  FINANCIAL_ANALYTICS,
  getFinancialAnalyticsStatusLabel,
  getFinancialAnalyticsEventLabel,
  getFinancialAnalyticsDimensionLabel,
  getFinancialAnalyticsSegmentLabel,
  getFinancialAnalyticsCohortLabel,
  getFinancialAnalyticsGranularityLabel,
  isFinancialAnalyticsActive,
  isFinancialAnalyticsCompleted,
  isFinancialAnalyticsFailed,
  isFinancialAnalyticsRevenueEvent,
  isFinancialAnalyticsExpenseEvent,
  isFinancialAnalyticsCashFlowEvent,
} from './financial-analytics/financial-analytics.constants';

export type {
  FinancialAnalyticsType,
  FinancialAnalyticsStatus,
  FinancialAnalyticsScope,
  FinancialAnalyticsEvent,
  FinancialAnalyticsDimension,
  FinancialAnalyticsMetric,
  FinancialAnalyticsSegment,
  FinancialAnalyticsCohort,
  FinancialAnalyticsGranularity,
} from './financial-analytics/financial-analytics.constants';

// Financial Analytics Type Constants
export {
  FINANCIAL_ANALYTICS_TYPE,
  getFinancialAnalyticsAnalysisTypeLabel,
  getFinancialAnalyticsDataTypeLabel,
  getFinancialAnalyticsRevenueTypeLabel,
  getFinancialAnalyticsExpenseTypeLabel,
  getFinancialAnalyticsCashFlowTypeLabel,
  getFinancialAnalyticsFinancialRatioLabel,
  getFinancialAnalyticsBudgetTypeLabel,
  getFinancialAnalyticsHealthLevelLabel,
  getFinancialAnalyticsRiskLevelLabel,
  getFinancialAnalyticsCurrencyTypeLabel,
  isFinancialAnalyticsRevenueAnalysis,
  isFinancialAnalyticsProfitAnalysis,
  isFinancialAnalyticsComparative,
  isFinancialAnalyticsPredictive,
  getFinancialAnalyticsHealthLevel,
  getFinancialAnalyticsRiskLevel,
} from './financial-analytics/financial-analytics-type.constants';

export type {
  FinancialAnalyticsAnalysisType,
  FinancialAnalyticsDataType,
  FinancialAnalyticsRevenueType,
  FinancialAnalyticsExpenseType,
  FinancialAnalyticsCashFlowType,
  FinancialAnalyticsFinancialRatio,
  FinancialAnalyticsBudgetType,
  FinancialAnalyticsHealthLevel,
  FinancialAnalyticsRiskLevel,
  FinancialAnalyticsCurrencyType,
} from './financial-analytics/financial-analytics-type.constants';

// Financial Analytics Metric Constants
export {
  FINANCIAL_ANALYTICS_METRIC,
  getFinancialAnalyticsMetricLabel,
  getFinancialAnalyticsMetricCategoryLabel,
  getFinancialAnalyticsMetricTypeLabel,
  getFinancialAnalyticsMetricFormatLabel,
  getFinancialAnalyticsMetricPriorityLabel,
  getFinancialAnalyticsMetricCategory,
  getFinancialAnalyticsMetricType,
  getFinancialAnalyticsMetricFormat,
  calculateFinancialAnalyticsGrowthRate,
  calculateFinancialAnalyticsMargin,
  calculateFinancialAnalyticsROI,
  calculateFinancialAnalyticsVariance,
  calculateFinancialAnalyticsBudgetUtilization,
  calculateFinancialAnalyticsForecastAccuracy,
  calculateFinancialAnalyticsCurrentRatio,
  calculateFinancialAnalyticsQuickRatio,
  calculateFinancialAnalyticsDebtToEquity,
  calculateFinancialAnalyticsInterestCoverage,
  calculateFinancialAnalyticsWorkingCapital,
} from './financial-analytics/financial-analytics-metric.constants';

export type {
  FinancialAnalyticsRevenueMetric,
  FinancialAnalyticsProfitMetric,
  FinancialAnalyticsMarginMetric,
  FinancialAnalyticsCostMetric,
  FinancialAnalyticsCashFlowMetric,
  FinancialAnalyticsInvestmentMetric,
  FinancialAnalyticsBudgetMetric,
  FinancialAnalyticsTaxMetric,
  FinancialAnalyticsHealthMetric,
  FinancialAnalyticsComparisonMetric,
  FinancialAnalyticsMetricCategory,
  FinancialAnalyticsMetricType,
  FinancialAnalyticsMetricFormat,
  FinancialAnalyticsMetricPriority,
} from './financial-analytics/financial-analytics-metric.constants';

// Inventory Analytics Constants
export {
  INVENTORY_ANALYTICS,
  getInventoryAnalyticsStatusLabel,
  getInventoryAnalyticsEventLabel,
  getInventoryAnalyticsDimensionLabel,
  getInventoryAnalyticsSegmentLabel,
  getInventoryAnalyticsCohortLabel,
  getInventoryAnalyticsGranularityLabel,
  isInventoryAnalyticsActive,
  isInventoryAnalyticsCompleted,
  isInventoryAnalyticsFailed,
  isInventoryAnalyticsStockEvent,
  isInventoryAnalyticsStockLevelEvent,
  isInventoryAnalyticsWarehouseEvent,
} from './inventory-analytics/inventory-analytics.constants';

export type {
  InventoryAnalyticsType,
  InventoryAnalyticsStatus,
  InventoryAnalyticsScope,
  InventoryAnalyticsEvent,
  InventoryAnalyticsDimension,
  InventoryAnalyticsMetric,
  InventoryAnalyticsSegment,
  InventoryAnalyticsCohort,
  InventoryAnalyticsGranularity,
} from './inventory-analytics/inventory-analytics.constants';

// Inventory Analytics Type Constants
export {
  INVENTORY_ANALYTICS_TYPE,
  getInventoryAnalyticsAnalysisTypeLabel,
  getInventoryAnalyticsDataTypeLabel,
  getInventoryAnalyticsStockStatusLabel,
  getInventoryAnalyticsStockTypeLabel,
  getInventoryAnalyticsWarehouseTypeLabel,
  getInventoryAnalyticsDemandPatternLabel,
  getInventoryAnalyticsFulfillmentStatusLabel,
  getInventoryAnalyticsMovementTypeLabel,
  getInventoryAnalyticsQualityStatusLabel,
  getInventoryAnalyticsCostCategoryLabel,
  getInventoryAnalyticsPerformanceLevelLabel,
  isInventoryAnalyticsStockAnalysis,
  isInventoryAnalyticsWarehouseAnalysis,
  isInventoryAnalyticsDemandAnalysis,
  isInventoryAnalyticsComparative,
  isInventoryAnalyticsPredictive,
  getInventoryAnalyticsPerformanceLevel,
  getInventoryAnalyticsStockStatus,
} from './inventory-analytics/inventory-analytics-type.constants';

export type {
  InventoryAnalyticsAnalysisType,
  InventoryAnalyticsDataType,
  InventoryAnalyticsStockStatus,
  InventoryAnalyticsStockType,
  InventoryAnalyticsWarehouseType,
  InventoryAnalyticsDemandPattern,
  InventoryAnalyticsFulfillmentStatus,
  InventoryAnalyticsMovementType,
  InventoryAnalyticsQualityStatus,
  InventoryAnalyticsCostCategory,
  InventoryAnalyticsPerformanceLevel,
} from './inventory-analytics/inventory-analytics-type.constants';

// Inventory Analytics Metric Constants
export {
  INVENTORY_ANALYTICS_METRIC,
  getInventoryAnalyticsMetricLabel,
  getInventoryAnalyticsMetricCategoryLabel,
  getInventoryAnalyticsMetricTypeLabel,
  getInventoryAnalyticsMetricFormatLabel,
  getInventoryAnalyticsMetricPriorityLabel,
  getInventoryAnalyticsMetricCategory,
  getInventoryAnalyticsMetricType,
  getInventoryAnalyticsMetricFormat,
  calculateInventoryAnalyticsTurnoverRate,
  calculateInventoryAnalyticsStockDays,
  calculateInventoryAnalyticsStockAvailability,
  calculateInventoryAnalyticsStockAccuracy,
  calculateInventoryAnalyticsWarehouseUtilization,
  calculateInventoryAnalyticsDemandAccuracy,
  calculateInventoryAnalyticsHoldingCostRatio,
  calculateInventoryAnalyticsFulfillmentRate,
} from './inventory-analytics/inventory-analytics-metric.constants';

export type {
  InventoryAnalyticsStockLevelMetric,
  InventoryAnalyticsMovementMetric,
  InventoryAnalyticsHealthMetric,
  InventoryAnalyticsWarehouseMetric,
  InventoryAnalyticsSupplyChainMetric,
  InventoryAnalyticsDemandMetric,
  InventoryAnalyticsCostMetric,
  InventoryAnalyticsFulfillmentMetric,
  InventoryAnalyticsComparisonMetric,
  InventoryAnalyticsMetricCategory,
  InventoryAnalyticsMetricType,
  InventoryAnalyticsMetricFormat,
  InventoryAnalyticsMetricPriority,
} from './inventory-analytics/inventory-analytics-metric.constants';

// Customer Analytics Constants
export {
  CUSTOMER_ANALYTICS,
  getCustomerAnalyticsStatusLabel,
  getCustomerAnalyticsEventLabel,
  getCustomerAnalyticsDimensionLabel,
  getCustomerAnalyticsSegmentLabel,
  getCustomerAnalyticsCohortLabel,
  getCustomerAnalyticsGranularityLabel,
  isCustomerAnalyticsActive,
  isCustomerAnalyticsCompleted,
  isCustomerAnalyticsFailed,
  isCustomerAnalyticsLifecycleEvent,
  isCustomerAnalyticsBehaviorEvent,
  isCustomerAnalyticsPurchaseEvent,
} from './customer-analytics/customer-analytics.constants';

export type {
  CustomerAnalyticsType,
  CustomerAnalyticsStatus,
  CustomerAnalyticsScope,
  CustomerAnalyticsEvent,
  CustomerAnalyticsDimension,
  CustomerAnalyticsMetric,
  CustomerAnalyticsSegment,
  CustomerAnalyticsCohort,
  CustomerAnalyticsGranularity,
} from './customer-analytics/customer-analytics.constants';

// Customer Analytics Type Constants
export {
  CUSTOMER_ANALYTICS_TYPE,
  getCustomerAnalyticsAnalysisTypeLabel,
  getCustomerAnalyticsDataTypeLabel,
  getCustomerAnalyticsCustomerStatusLabel,
  getCustomerAnalyticsCustomerTypeLabel,
  getCustomerAnalyticsCustomerTierLabel,
  getCustomerAnalyticsCustomerPersonaLabel,
  getCustomerAnalyticsEngagementLevelLabel,
  getCustomerAnalyticsLoyaltyLevelLabel,
  getCustomerAnalyticsSatisfactionLevelLabel,
  getCustomerAnalyticsNPSCategoryLabel,
  getCustomerAnalyticsLifecycleStageLabel,
  isCustomerAnalyticsBehavioralAnalysis,
  isCustomerAnalyticsValueAnalysis,
  isCustomerAnalyticsRetentionAnalysis,
  isCustomerAnalyticsComparative,
  isCustomerAnalyticsPredictive,
  getCustomerAnalyticsEngagementLevel,
  getCustomerAnalyticsLoyaltyLevel,
  getCustomerAnalyticsSatisfactionLevel,
  getCustomerAnalyticsNPSCategory,
} from './customer-analytics/customer-analytics-type.constants';

export type {
  CustomerAnalyticsAnalysisType,
  CustomerAnalyticsDataType,
  CustomerAnalyticsCustomerStatus,
  CustomerAnalyticsCustomerType,
  CustomerAnalyticsCustomerTier,
  CustomerAnalyticsCustomerPersona,
  CustomerAnalyticsEngagementLevel,
  CustomerAnalyticsLoyaltyLevel,
  CustomerAnalyticsSatisfactionLevel,
  CustomerAnalyticsNPSCategory,
  CustomerAnalyticsLifecycleStage,
} from './customer-analytics/customer-analytics-type.constants';

// Customer Analytics Metric Constants
export {
  CUSTOMER_ANALYTICS_METRIC,
  getCustomerAnalyticsMetricLabel,
  getCustomerAnalyticsMetricCategoryLabel,
  getCustomerAnalyticsMetricTypeLabel,
  getCustomerAnalyticsMetricFormatLabel,
  getCustomerAnalyticsMetricPriorityLabel,
  getCustomerAnalyticsMetricCategory,
  getCustomerAnalyticsMetricType,
  getCustomerAnalyticsMetricFormat,
  calculateCustomerAnalyticsRetentionRate,
  calculateCustomerAnalyticsChurnRate,
  calculateCustomerAnalyticsLifetimeValue,
  calculateCustomerAnalyticsAverageOrderValue,
  calculateCustomerAnalyticsPurchaseFrequency,
  calculateCustomerAnalyticsRepeatPurchaseRate,
  calculateCustomerAnalyticsNPS,
  calculateCustomerAnalyticsCAC,
} from './customer-analytics/customer-analytics-metric.constants';

export type {
  CustomerAnalyticsCountMetric,
  CustomerAnalyticsAcquisitionMetric,
  CustomerAnalyticsRetentionMetric,
  CustomerAnalyticsValueMetric,
  CustomerAnalyticsEngagementMetric,
  CustomerAnalyticsGrowthMetric,
  CustomerAnalyticsComparisonMetric,
  CustomerAnalyticsMetricCategory,
  CustomerAnalyticsMetricType,
  CustomerAnalyticsMetricFormat,
  CustomerAnalyticsMetricPriority,
} from './customer-analytics/customer-analytics-metric.constants';

// Support Analytics Constants
export {
  SUPPORT_ANALYTICS,
  getSupportAnalyticsStatusLabel,
  getSupportAnalyticsEventLabel,
  getSupportAnalyticsDimensionLabel,
  getSupportAnalyticsSegmentLabel,
  getSupportAnalyticsCohortLabel,
  getSupportAnalyticsGranularityLabel,
  isSupportAnalyticsActive,
  isSupportAnalyticsCompleted,
  isSupportAnalyticsFailed,
  isSupportAnalyticsTicketEvent,
  isSupportAnalyticsAgentEvent,
  isSupportAnalyticsSatisfactionEvent,
} from './support-analytics/support-analytics.constants';

export type {
  SupportAnalyticsType,
  SupportAnalyticsStatus,
  SupportAnalyticsScope,
  SupportAnalyticsEvent,
  SupportAnalyticsDimension,
  SupportAnalyticsMetric,
  SupportAnalyticsSegment,
  SupportAnalyticsCohort,
  SupportAnalyticsGranularity,
} from './support-analytics/support-analytics.constants';

// Support Analytics Type Constants
export {
  SUPPORT_ANALYTICS_TYPE,
  getSupportAnalyticsAnalysisTypeLabel,
  getSupportAnalyticsDataTypeLabel,
  getSupportAnalyticsTicketStatusLabel,
  getSupportAnalyticsTicketPriorityLabel,
  getSupportAnalyticsTicketTypeLabel,
  getSupportAnalyticsTicketCategoryLabel,
  getSupportAnalyticsSupportChannelLabel,
  getSupportAnalyticsAgentRoleLabel,
  getSupportAnalyticsResolutionTypeLabel,
  getSupportAnalyticsSatisfactionLevelLabel,
  getSupportAnalyticsQualityLevelLabel,
  isSupportAnalyticsTicketAnalysis,
  isSupportAnalyticsAgentAnalysis,
  isSupportAnalyticsComparative,
  isSupportAnalyticsPredictive,
  getSupportAnalyticsQualityLevel,
  getSupportAnalyticsSatisfactionLevel,
} from './support-analytics/support-analytics-type.constants';

export type {
  SupportAnalyticsAnalysisType,
  SupportAnalyticsDataType,
  SupportAnalyticsTicketStatus,
  SupportAnalyticsTicketPriority,
  SupportAnalyticsTicketType,
  SupportAnalyticsTicketCategory,
  SupportAnalyticsSupportChannel,
  SupportAnalyticsAgentRole,
  SupportAnalyticsResolutionType,
  SupportAnalyticsSatisfactionLevel,
  SupportAnalyticsQualityLevel,
} from './support-analytics/support-analytics-type.constants';

// Support Analytics Metric Constants
export {
  SUPPORT_ANALYTICS_METRIC,
  getSupportAnalyticsMetricLabel,
  getSupportAnalyticsMetricCategoryLabel,
  getSupportAnalyticsMetricTypeLabel,
  getSupportAnalyticsMetricFormatLabel,
  getSupportAnalyticsMetricPriorityLabel,
  getSupportAnalyticsMetricCategory,
  getSupportAnalyticsMetricType,
  getSupportAnalyticsMetricFormat,
  calculateSupportAnalyticsAvgResponseTime,
  calculateSupportAnalyticsResolutionRate,
  calculateSupportAnalyticsFirstContactResolution,
  calculateSupportAnalyticsCSAT,
  calculateSupportAnalyticsNPS,
  calculateSupportAnalyticsCES,
  calculateSupportAnalyticsAgentProductivity,
  calculateSupportAnalyticsAgentEfficiency,
} from './support-analytics/support-analytics-metric.constants';

export type {
  SupportAnalyticsCountMetric,
  SupportAnalyticsVolumeMetric,
  SupportAnalyticsResponseTimeMetric,
  SupportAnalyticsResolutionTimeMetric,
  SupportAnalyticsAgentMetric,
  SupportAnalyticsQualityMetric,
  SupportAnalyticsSatisfactionMetric,
  SupportAnalyticsComparisonMetric,
  SupportAnalyticsMetricCategory,
  SupportAnalyticsMetricType,
  SupportAnalyticsMetricFormat,
  SupportAnalyticsMetricPriority,
} from './support-analytics/support-analytics-metric.constants';

// Channel Analytics Constants
export {
  CHANNEL_ANALYTICS,
  getChannelAnalyticsStatusLabel,
  getChannelAnalyticsEventLabel,
  getChannelAnalyticsDimensionLabel,
  getChannelAnalyticsSegmentLabel,
  getChannelAnalyticsCohortLabel,
  getChannelAnalyticsGranularityLabel,
  isChannelAnalyticsActive,
  isChannelAnalyticsCompleted,
  isChannelAnalyticsFailed,
  isChannelAnalyticsLifecycleEvent,
  isChannelAnalyticsPerformanceEvent,
  isChannelAnalyticsHealthEvent,
} from './channel-analytics/channel-analytics.constants';

export type {
  ChannelAnalyticsType,
  ChannelAnalyticsStatus,
  ChannelAnalyticsScope,
  ChannelAnalyticsEvent,
  ChannelAnalyticsDimension,
  ChannelAnalyticsMetric,
  ChannelAnalyticsSegment,
  ChannelAnalyticsCohort,
  ChannelAnalyticsGranularity,
} from './channel-analytics/channel-analytics.constants';

// Channel Analytics Type Constants
export {
  CHANNEL_ANALYTICS_TYPE,
  getChannelAnalyticsAnalysisTypeLabel,
  getChannelAnalyticsDataTypeLabel,
  getChannelAnalyticsChannelTypeLabel,
  getChannelAnalyticsChannelCategoryLabel,
  getChannelAnalyticsChannelStatusLabel,
  getChannelAnalyticsPerformanceLevelLabel,
  getChannelAnalyticsHealthLevelLabel,
  getChannelAnalyticsROICategoryLabel,
  getChannelAnalyticsAttributionModelLabel,
  isChannelAnalyticsPerformanceAnalysis,
  isChannelAnalyticsRevenueAnalysis,
  isChannelAnalyticsComparative,
  isChannelAnalyticsPredictive,
  getChannelAnalyticsPerformanceLevel,
  getChannelAnalyticsHealthLevel,
  getChannelAnalyticsROICategory,
} from './channel-analytics/channel-analytics-type.constants';

export type {
  ChannelAnalyticsAnalysisType,
  ChannelAnalyticsDataType,
  ChannelAnalyticsChannelType,
  ChannelAnalyticsChannelCategory,
  ChannelAnalyticsChannelStatus,
  ChannelAnalyticsPerformanceLevel,
  ChannelAnalyticsHealthLevel,
  ChannelAnalyticsROICategory,
  ChannelAnalyticsAttributionModel,
} from './channel-analytics/channel-analytics-type.constants';

// Channel Analytics Metric Constants
export {
  CHANNEL_ANALYTICS_METRIC,
  getChannelAnalyticsMetricLabel,
  getChannelAnalyticsMetricCategoryLabel,
  getChannelAnalyticsMetricTypeLabel,
  getChannelAnalyticsMetricFormatLabel,
  getChannelAnalyticsMetricPriorityLabel,
  getChannelAnalyticsMetricCategory,
  getChannelAnalyticsMetricType,
  getChannelAnalyticsMetricFormat,
  calculateChannelAnalyticsEngagementRate,
  calculateChannelAnalyticsCTR,
  calculateChannelAnalyticsConversionRate,
  calculateChannelAnalyticsROI,
  calculateChannelAnalyticsROAS,
  calculateChannelAnalyticsProfitMargin,
  calculateChannelAnalyticsCAC,
  calculateChannelAnalyticsRetentionRate,
  calculateChannelAnalyticsCSAT,
} from './channel-analytics/channel-analytics-metric.constants';

export type {
  ChannelAnalyticsCountMetric,
  ChannelAnalyticsReachMetric,
  ChannelAnalyticsEngagementMetric,
  ChannelAnalyticsConversionMetric,
  ChannelAnalyticsRevenueMetric,
  ChannelAnalyticsCostMetric,
  ChannelAnalyticsProfitMetric,
  ChannelAnalyticsROIMetric,
  ChannelAnalyticsCustomerMetric,
  ChannelAnalyticsSatisfactionMetric,
  ChannelAnalyticsComparisonMetric,
  ChannelAnalyticsMetricCategory,
  ChannelAnalyticsMetricType,
  ChannelAnalyticsMetricFormat,
  ChannelAnalyticsMetricPriority,
} from './channel-analytics/channel-analytics-metric.constants';

// Acquisition Analytics Constants
export {
  ACQUISITION_ANALYTICS,
  getAcquisitionAnalyticsStatusLabel,
  getAcquisitionAnalyticsEventLabel,
  getAcquisitionAnalyticsDimensionLabel,
  getAcquisitionAnalyticsSegmentLabel,
  getAcquisitionAnalyticsCohortLabel,
  getAcquisitionAnalyticsGranularityLabel,
  isAcquisitionAnalyticsActive,
  isAcquisitionAnalyticsCompleted,
  isAcquisitionAnalyticsFailed,
  isAcquisitionAnalyticsLeadEvent,
  isAcquisitionAnalyticsCustomerEvent,
  isAcquisitionAnalyticsChannelEvent,
} from './acquisition-analytics/acquisition-analytics.constants';

export type {
  AcquisitionAnalyticsType,
  AcquisitionAnalyticsStatus,
  AcquisitionAnalyticsScope,
  AcquisitionAnalyticsEvent,
  AcquisitionAnalyticsDimension,
  AcquisitionAnalyticsMetric,
  AcquisitionAnalyticsSegment,
  AcquisitionAnalyticsCohort,
  AcquisitionAnalyticsGranularity,
} from './acquisition-analytics/acquisition-analytics.constants';

// Acquisition Analytics Type Constants
export {
  ACQUISITION_ANALYTICS_TYPE,
  getAcquisitionAnalyticsAnalysisTypeLabel,
  getAcquisitionAnalyticsDataTypeLabel,
  getAcquisitionAnalyticsLeadStatusLabel,
  getAcquisitionAnalyticsLeadTypeLabel,
  getAcquisitionAnalyticsAcquisitionChannelLabel,
  getAcquisitionAnalyticsAcquisitionSourceLabel,
  getAcquisitionAnalyticsAcquisitionMediumLabel,
  getAcquisitionAnalyticsFunnelStageLabel,
  getAcquisitionAnalyticsCACCategoryLabel,
  getAcquisitionAnalyticsROICategoryLabel,
  isAcquisitionAnalyticsChannelAnalysis,
  isAcquisitionAnalyticsCustomerAnalysis,
  isAcquisitionAnalyticsCostAnalysis,
  isAcquisitionAnalyticsFunnelAnalysis,
  isAcquisitionAnalyticsComparative,
  isAcquisitionAnalyticsPredictive,
  getAcquisitionAnalyticsCACCategory,
  getAcquisitionAnalyticsROICategory,
} from './acquisition-analytics/acquisition-analytics-type.constants';

export type {
  AcquisitionAnalyticsAnalysisType,
  AcquisitionAnalyticsDataType,
  AcquisitionAnalyticsLeadStatus,
  AcquisitionAnalyticsLeadType,
  AcquisitionAnalyticsAcquisitionChannel,
  AcquisitionAnalyticsAcquisitionSource,
  AcquisitionAnalyticsAcquisitionMedium,
  AcquisitionAnalyticsFunnelStage,
  AcquisitionAnalyticsCACCategory,
  AcquisitionAnalyticsROICategory,
} from './acquisition-analytics/acquisition-analytics-type.constants';

// Acquisition Analytics Metric Constants
export {
  ACQUISITION_ANALYTICS_METRIC,
  getAcquisitionAnalyticsMetricLabel,
  getAcquisitionAnalyticsMetricCategoryLabel,
  getAcquisitionAnalyticsMetricTypeLabel,
  getAcquisitionAnalyticsMetricFormatLabel,
  getAcquisitionAnalyticsMetricPriorityLabel,
  getAcquisitionAnalyticsMetricCategory,
  getAcquisitionAnalyticsMetricType,
  getAcquisitionAnalyticsMetricFormat,
  calculateAcquisitionAnalyticsLeadConversionRate,
  calculateAcquisitionAnalyticsCAC,
  calculateAcquisitionAnalyticsLTVToCACRatio,
  calculateAcquisitionAnalyticsROI,
  calculateAcquisitionAnalyticsROAS,
  calculateAcquisitionAnalyticsFunnelConversion,
  calculateAcquisitionAnalyticsFunnelDropoff,
  calculateAcquisitionAnalyticsCostPerLead,
} from './acquisition-analytics/acquisition-analytics-metric.constants';

export type {
  AcquisitionAnalyticsLeadMetric,
  AcquisitionAnalyticsCustomerMetric,
  AcquisitionAnalyticsChannelMetric,
  AcquisitionAnalyticsCampaignMetric,
  AcquisitionAnalyticsCostMetric,
  AcquisitionAnalyticsROIMetric,
  AcquisitionAnalyticsFunnelMetric,
  AcquisitionAnalyticsComparisonMetric,
  AcquisitionAnalyticsMetricCategory,
  AcquisitionAnalyticsMetricType,
  AcquisitionAnalyticsMetricFormat,
  AcquisitionAnalyticsMetricPriority,
} from './acquisition-analytics/acquisition-analytics-metric.constants';

// Engagement Analytics Constants
export {
  ENGAGEMENT_ANALYTICS,
  getEngagementAnalyticsStatusLabel,
  getEngagementAnalyticsEventLabel,
  getEngagementAnalyticsDimensionLabel,
  getEngagementAnalyticsSegmentLabel,
  getEngagementAnalyticsCohortLabel,
  getEngagementAnalyticsGranularityLabel,
  isEngagementAnalyticsActive,
  isEngagementAnalyticsCompleted,
  isEngagementAnalyticsFailed,
  isEngagementAnalyticsUserEvent,
  isEngagementAnalyticsSessionEvent,
  isEngagementAnalyticsContentEvent,
  isEngagementAnalyticsSocialEvent,
} from './engagement-analytics/engagement-analytics.constants';

export type {
  EngagementAnalyticsType,
  EngagementAnalyticsStatus,
  EngagementAnalyticsScope,
  EngagementAnalyticsEvent,
  EngagementAnalyticsDimension,
  EngagementAnalyticsMetric,
  EngagementAnalyticsSegment,
  EngagementAnalyticsCohort,
  EngagementAnalyticsGranularity,
} from './engagement-analytics/engagement-analytics.constants';

// Engagement Analytics Type Constants
export {
  ENGAGEMENT_ANALYTICS_TYPE,
  getEngagementAnalyticsAnalysisTypeLabel,
  getEngagementAnalyticsDataTypeLabel,
  getEngagementAnalyticsEngagementLevelLabel,
  getEngagementAnalyticsSessionQualityLabel,
  getEngagementAnalyticsContentTypeLabel,
  getEngagementAnalyticsInteractionTypeLabel,
  getEngagementAnalyticsSocialTypeLabel,
  getEngagementAnalyticsUserStateLabel,
  getEngagementAnalyticsConversionTypeLabel,
  getEngagementAnalyticsFunnelStageLabel,
  isEngagementAnalyticsUserAnalysis,
  isEngagementAnalyticsSessionAnalysis,
  isEngagementAnalyticsContentAnalysis,
  isEngagementAnalyticsComparative,
  isEngagementAnalyticsPredictive,
  getEngagementAnalyticsEngagementLevel,
  getEngagementAnalyticsSessionQuality,
} from './engagement-analytics/engagement-analytics-type.constants';

export type {
  EngagementAnalyticsAnalysisType,
  EngagementAnalyticsDataType,
  EngagementAnalyticsEngagementLevel,
  EngagementAnalyticsSessionQuality,
  EngagementAnalyticsContentType,
  EngagementAnalyticsInteractionType,
  EngagementAnalyticsSocialType,
  EngagementAnalyticsUserState,
  EngagementAnalyticsConversionType,
  EngagementAnalyticsFunnelStage,
} from './engagement-analytics/engagement-analytics-type.constants';

// Engagement Analytics Metric Constants
export {
  ENGAGEMENT_ANALYTICS_METRIC,
  getEngagementAnalyticsMetricLabel,
  getEngagementAnalyticsMetricCategoryLabel,
  getEngagementAnalyticsMetricTypeLabel,
  getEngagementAnalyticsMetricFormatLabel,
  getEngagementAnalyticsMetricPriorityLabel,
  getEngagementAnalyticsMetricCategory,
  getEngagementAnalyticsMetricType,
  getEngagementAnalyticsMetricFormat,
  calculateEngagementAnalyticsUserEngagementRate,
  calculateEngagementAnalyticsAvgSessionDuration,
  calculateEngagementAnalyticsViewCompletionRate,
  calculateEngagementAnalyticsInteractionRate,
  calculateEngagementAnalyticsSocialEngagementRate,
  calculateEngagementAnalyticsConversionRate,
  calculateEngagementAnalyticsSessionQualityScore,
  calculateEngagementAnalyticsContentPopularityScore,
} from './engagement-analytics/engagement-analytics-metric.constants';

export type {
  EngagementAnalyticsUserMetric,
  EngagementAnalyticsSessionMetric,
  EngagementAnalyticsContentMetric,
  EngagementAnalyticsInteractionMetric,
  EngagementAnalyticsSocialMetric,
  EngagementAnalyticsConversionMetric,
  EngagementAnalyticsMilestoneMetric,
  EngagementAnalyticsComparisonMetric,
  EngagementAnalyticsMetricCategory,
  EngagementAnalyticsMetricType,
  EngagementAnalyticsMetricFormat,
  EngagementAnalyticsMetricPriority,
} from './engagement-analytics/engagement-analytics-metric.constants';

// Retention Analytics Constants
export {
  RETENTION_ANALYTICS,
  getRetentionAnalyticsStatusLabel,
  getRetentionAnalyticsEventLabel,
  getRetentionAnalyticsDimensionLabel,
  getRetentionAnalyticsSegmentLabel,
  getRetentionAnalyticsCohortLabel,
  getRetentionAnalyticsGranularityLabel,
  getRetentionAnalyticsPeriodLabel,
  isRetentionAnalyticsActive,
  isRetentionAnalyticsCompleted,
  isRetentionAnalyticsFailed,
  isRetentionAnalyticsRetentionEvent,
  isRetentionAnalyticsChurnEvent,
  isRetentionAnalyticsReactivationEvent,
  calculateRetentionAnalyticsRetentionRate,
  calculateRetentionAnalyticsChurnRate,
  calculateRetentionAnalyticsReactivationRate,
  calculateRetentionAnalyticsCohortRetention,
  calculateRetentionAnalyticsCustomerLifetime,
  calculateRetentionAnalyticsSubscriptionRenewalRate,
} from './retention-analytics.constants';

export type {
  RetentionAnalyticsType,
  RetentionAnalyticsStatus,
  RetentionAnalyticsScope,
  RetentionAnalyticsEvent,
  RetentionAnalyticsDimension,
  RetentionAnalyticsMetric,
  RetentionAnalyticsSegment,
  RetentionAnalyticsCohort,
  RetentionAnalyticsGranularity,
  RetentionAnalyticsPeriod,
} from './retention-analytics.constants';
