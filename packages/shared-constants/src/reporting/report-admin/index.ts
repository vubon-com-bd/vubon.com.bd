/**
 * Admin Report Constants Index
 * Export all admin report and error constants for easy importing
 */

// Admin Report Core Constants
export {
  ADMIN_REPORT,
  ADMIN_REPORT_TYPE_LABELS,
  ADMIN_REPORT_TYPE_ICONS,
  ADMIN_REPORT_FORMAT_LABELS,
  ADMIN_REPORT_STATUS_LABELS,
  ADMIN_REPORT_STATUS_COLORS,
  ADMIN_REPORT_PRIORITY_LABELS,
  ADMIN_REPORT_PRIORITY_LEVELS,
  ADMIN_REPORT_FREQUENCY_LABELS,
  ADMIN_REPORT_CATEGORY_LABELS,
  ADMIN_REPORT_SCOPE_LABELS,
  ADMIN_REPORT_DELIVERY_LABELS,
  ADMIN_REPORT_TIMEFRAME_LABELS,
  getAdminReportTypeLabel,
  getAdminReportTypeIcon,
  getAdminReportFormatLabel,
  getAdminReportStatusLabel,
  getAdminReportStatusColor,
  getAdminReportPriorityLabel,
  getAdminReportPriorityLevel,
  getAdminReportFrequencyLabel,
  getAdminReportCategoryLabel,
  getAdminReportScopeLabel,
  getAdminReportDeliveryLabel,
  getAdminReportTimeframeLabel,
  isReportGenerated,
  isReportProcessing,
  isReportFailed,
  isReportTerminal,
} from './admin-report.constants';

export type {
  AdminReportType,
  AdminReportFormat,
  AdminReportStatus,
  AdminReportPriority,
  AdminReportFrequency,
  AdminReportCategory,
  AdminReportScope,
  AdminReportDelivery,
  AdminReportTimeframe,
} from './admin-report.constants';

// Admin Report Type Constants
export {
  ADMIN_REPORT_TYPE,
  ADMIN_REPORT_TYPE_CATEGORIES,
  ADMIN_REPORT_TYPE_LABELS_DETAIL,
  getAdminReportTypeCategory,
  getAdminReportTypeLabel as getAdminReportTypeLabelDetail,
  isSummaryReport,
  isPerformanceReport,
  isFinancialReport,
  isSalesReport,
  isProductReport,
  isOrderReport,
  isPaymentReport,
  isUserReport,
  isSecurityReport,
  isMarketingReport,
  isSupportReport,
  isLogisticsReport,
  isAnalyticsReport,
  isCustomReport,
} from './admin-report-type.constants';

export type { AdminReportTypeDetail } from './admin-report-type.constants';

// Admin Report Status Constants
export {
  ADMIN_REPORT_STATUS,
  ADMIN_REPORT_STATUS_LABELS_DETAIL,
  ADMIN_REPORT_STATUS_COLORS_DETAIL,
  ADMIN_REPORT_STATUS_GROUPS,
  getAdminReportStatusLabel as getAdminReportStatusLabelDetail,
  getAdminReportStatusColor as getAdminReportStatusColorDetail,
  isLifecycleStatus,
  isGenerationStatus,
  isDeliveryStatus,
  isViewStatus,
  isAdminReportErrorStatus,
  isFinalStatus,
  isReportReady,
  isReportProcessing as isReportProcessingDetail,
  isReportFailed as isReportFailedDetail,
  isReportTerminal as isReportTerminalDetail,
  getAdminReportStatusPriority,
  getAdminReportStatuses,
  getLifecycleStatuses,
  getGenerationStatuses,
  getDeliveryStatuses,
  getViewStatuses,
  getErrorStatuses,
  getFinalStatuses,
} from './admin-report-status.constants';

export type { AdminReportStatusDetail } from './admin-report-status.constants';
