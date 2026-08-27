/**
 * Flash Sale Analytics Constants Index
 * Export all flash sale analytics constants for easy importing
 */

// Flash Sale Analytics Constants
export {
  FLASH_SALE_ANALYTICS,
  flashsalesAnalyticsGetTypeLabel,
  flashsalesAnalyticsGetMetricLabel,
  flashsalesAnalyticsGetPeriodLabel,
  flashsalesAnalyticsGetIntervalLabel,
  flashsalesAnalyticsGetAggregationLabel,
  flashsalesAnalyticsGetDimensionLabel,
  flashsalesAnalyticsIsValidType,
  flashsalesAnalyticsIsValidMetric,
  flashsalesAnalyticsIsValidPeriod,
  flashsalesAnalyticsGetDefaultPeriod,
  flashsalesAnalyticsGetDefaultInterval,
  flashsalesAnalyticsGetDefaultAggregation,
  flashsalesAnalyticsGetMaxResults,
  flashsalesAnalyticsGetPeriodInDays,
} from './flash-sale-analytics.constants';

export type {
  FlashSaleAnalyticsType,
  FlashSaleAnalyticsMetric,
  FlashSaleAnalyticsPeriod,
  FlashSaleAnalyticsInterval,
  FlashSaleAnalyticsAggregation,
  FlashSaleAnalyticsDimension,
} from './flash-sale-analytics.constants';

// Flash Sale Analytics Type Constants
export {
  FLASH_SALE_ANALYTICS_TYPE,
  flashsalesAnalyticsTypeGetCategoryLabel,
  flashsalesAnalyticsTypeGetComplexityLabel,
  flashsalesAnalyticsTypeGetScopeLabel,
  flashsalesAnalyticsTypeGetFrequencyLabel,
  flashsalesAnalyticsTypeGetMethodLabel,
  flashsalesAnalyticsTypeGetPriorityLabel,
  flashsalesAnalyticsTypeGetStatusLabel,
  flashsalesAnalyticsTypeIsValidCategory,
  flashsalesAnalyticsTypeIsValidMethod,
  flashsalesAnalyticsTypeIsCompleted,
  flashsalesAnalyticsTypeIsProcessing,
  flashsalesAnalyticsTypeIsFailed,
} from './flash-sale-analytics-type.constants';

export type {
  FlashSaleAnalyticsTypeCategory,
  FlashSaleAnalyticsTypeComplexity,
  FlashSaleAnalyticsTypeScope,
  FlashSaleAnalyticsTypeFrequency,
  FlashSaleAnalyticsTypeMethod,
  FlashSaleAnalyticsTypePriority,
  FlashSaleAnalyticsTypeStatus,
} from './flash-sale-analytics-type.constants';
