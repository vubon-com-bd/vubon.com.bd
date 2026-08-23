/**
 * Marketing Report Constants Index
 * Export all marketing report constants and types for easy importing
 */

// Marketing Report Constants
export {
  MARKETINGREPORT,
  marketingreportGetTypeLabel as marketingReportGetTypeLabel,
  marketingreportGetCategoryLabel as marketingReportGetCategoryLabel,
  marketingreportGetFrequencyLabel as marketingReportGetFrequencyLabel,
  marketingreportGetFormatLabel as marketingReportGetFormatLabel,
  marketingreportGetPriorityLabel as marketingReportGetPriorityLabel,
  marketingreportGetStatusLabel as marketingReportGetStatusLabel,
  marketingreportGetDeliveryMethodLabel as marketingReportGetDeliveryMethodLabel,
  marketingreportGetAggregationLabel as marketingReportGetAggregationLabel,
  marketingreportGetVisualizationLabel as marketingReportGetVisualizationLabel,
  marketingreportGetDefaultFormat as marketingReportGetDefaultFormat,
  marketingreportGetDefaultTimezone as marketingReportGetDefaultTimezone,
  marketingreportGetDefaultPageSize as marketingReportGetDefaultPageSize,
  marketingreportIsExecutiveReport as marketingReportIsExecutiveReport,
  marketingreportIsStrategicReport as marketingReportIsStrategicReport,
  marketingreportIsTacticalReport as marketingReportIsTacticalReport,
  marketingreportIsCompleted as marketingReportIsCompleted,
  marketingreportIsPending as marketingReportIsPending,
  marketingreportIsActive as marketingReportIsActive,
  marketingreportCanTransition as marketingReportCanTransition,
} from './marketing-report.constants';

export type {
  MarketingReportType,
  MarketingReportCategory,
  MarketingReportFrequency,
  MarketingReportFormat,
  MarketingReportPriority,
  MarketingReportStatus,
  MarketingReportDeliveryMethod,
  MarketingReportAggregation,
  MarketingReportVisualization,
  MarketingReportDefault,
  MarketingReportLimit,
} from './marketing-report.constants';

// Marketing Report Type Constants
export {
  MARKETINGREPORT_TYPE,
  marketingreportGetCategoryLabel as marketingReportTypeGetCategoryLabel,
  marketingreportGetSubTypeLabel as marketingReportGetSubTypeLabel,
  marketingreportGetScopeLabel as marketingReportGetScopeLabel,
  marketingreportGetLevelLabel as marketingReportGetLevelLabel,
  marketingreportGetAudienceLabel as marketingReportGetAudienceLabel,
  marketingreportGetPurposeLabel as marketingReportGetPurposeLabel,
  marketingreportGetComplexityLabel as marketingReportGetComplexityLabel,
  marketingreportIsExecutiveLevel as marketingReportIsExecutiveLevel,
  marketingreportIsStrategicLevel as marketingReportIsStrategicLevel,
  marketingreportIsTacticalLevel as marketingReportIsTacticalLevel,
  marketingreportIsAnalyticalLevel as marketingReportIsAnalyticalLevel,
  marketingreportIsOperationalLevel as marketingReportIsOperationalLevel,
} from './marketing-report-type.constants';

export type {
  MarketingReportCategoryType,
  MarketingReportSubType,
  MarketingReportScope,
  MarketingReportLevel,
  MarketingReportAudience,
  MarketingReportPurpose,
  MarketingReportComplexity,
} from './marketing-report-type.constants';
