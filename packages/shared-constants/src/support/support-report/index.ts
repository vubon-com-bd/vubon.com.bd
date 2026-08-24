/**
 * Support Report Constants Index
 * Export all support report constants and types for easy importing
 */

// Support Report Constants
export {
  SUPPORT_REPORT,
  supportReportGetTypeLabel,
  supportReportGetFormatLabel,
  supportReportGetStatusLabel,
  supportReportGetFrequencyLabel,
  supportReportGetPriorityLabel,
  supportReportGetDeliveryMethodLabel,
  supportReportIsCompleted,
  supportReportIsFailed,
  supportReportIsPending,
} from './support-report.constants';

export type {
  SupportReportType,
  SupportReportFormat,
  SupportReportStatus,
  SupportReportFrequency,
  SupportReportPriority,
  SupportReportDeliveryMethod,
} from './support-report.constants';

// Support Report Type Constants
export {
  SUPPORT_REPORT_TYPE,
  supportReportTypeGetCategoryLabel,
  supportReportTypeGetScopeLabel,
  supportReportTypeGetDataSourceLabel,
  supportReportTypeGetLayoutLabel,
  supportReportTypeGetTimeRangeLabel,
  supportReportTypeGetGroupingLabel,
} from './support-report-type.constants';

export type {
  SupportReportCategory,
  SupportReportScope,
  SupportReportDataSource,
  SupportReportLayout,
  SupportReportTimeRange,
  SupportReportGrouping,
} from './support-report-type.constants';
