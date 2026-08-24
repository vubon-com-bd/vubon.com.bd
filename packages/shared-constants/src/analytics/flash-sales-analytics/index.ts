/**
 * Flash Sale Analytics & Report Constants Index
 * Export all analytics and report constants for easy importing
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

// Flash Sale Report Constants
export {
  FLASH_SALE_REPORT,
  flashsalesReportGetTypeLabel,
  flashsalesReportGetFormatLabel,
  flashsalesReportGetSectionLabel,
  flashsalesReportGetDeliveryLabel,
  flashsalesReportGetSchedulingLabel,
  flashsalesReportIsValidType,
  flashsalesReportIsValidFormat,
  flashsalesReportGetDefaultType,
  flashsalesReportGetDefaultFormat,
  flashsalesReportGetDefaultDelivery,
  flashsalesReportGetMaxRows,
  flashsalesReportGetMaxFileSizeMB,
  flashsalesReportGetFileExtension,
  flashsalesReportGetMimeType,
} from './flash-sale-report.constants';

export type {
  FlashSaleReportType,
  FlashSaleReportFormat,
  FlashSaleReportSection,
  FlashSaleReportDelivery,
  FlashSaleReportScheduling,
} from './flash-sale-report.constants';

// Flash Sale Report Type Constants
export {
  FLASH_SALE_REPORT_TYPE,
  flashsalesReportTypeGetCategoryLabel,
  flashsalesReportTypeGetComplexityLabel,
  flashsalesReportTypeGetScopeLabel,
  flashsalesReportTypeGetFrequencyLabel,
  flashsalesReportTypeGetPriorityLabel,
  flashsalesReportTypeGetStatusLabel,
  flashsalesReportTypeGetAudienceLabel,
  flashsalesReportTypeIsValidCategory,
  flashsalesReportTypeIsValidStatus,
  flashsalesReportTypeIsGenerated,
  flashsalesReportTypeIsFailed,
  flashsalesReportTypeIsComplete,
} from './flash-sale-report-type.constants';

export type {
  FlashSaleReportTypeCategory,
  FlashSaleReportTypeComplexity,
  FlashSaleReportTypeScope,
  FlashSaleReportTypeFrequency,
  FlashSaleReportTypePriority,
  FlashSaleReportTypeStatus,
  FlashSaleReportTypeAudience,
} from './flash-sale-report-type.constants';
