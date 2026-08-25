/**
 * Reporting Constants Index
 * Export all reporting constants and types for easy importing
 */
export {
  REPORTING,
  getReportingCategoryLabel,
  getReportingScheduleTypeLabel,
  getReportingTimePeriodLabel,
  getReportingChartTypeLabel,
  getReportingAggregationLabel,
  getReportingDeliveryMethodLabel,
  isValidScheduleType,
  isValidTimePeriod,
  isValidChartType,
  getDefaultTimezone,
  getDefaultLanguage,
  getMaxPageSize,
  getDefaultPageSize,
} from './reporting.constants';

export type {
  ReportingCategory,
  ReportingDeliveryMethod,
  ReportingScheduleType,
  ReportingTimePeriod,
  ReportingGrouping,
  ReportingAggregation,
  ReportingChartType,
  ReportingDataSource,
  ReportingTimezone,
  ReportingLanguage,
  ReportingDefault,
  ReportingLimit,
} from './reporting.constants';

// Report Type Constants
export {
  REPORT_TYPE,
  getReportTypeLabel,
  getReportSubTypeLabel,
  getReportScopeLabel,
  getReportAccessLevelLabel,
  isSalesReport,
  isFinancialReport,
  isCustomerReport,
} from './report-type.constants';

export type {
  ReportTypeType,
  ReportSubType,
  ReportScope,
  ReportAccessLevel,
} from './report-type.constants';

// Report Format Constants
export {
  REPORT_FORMAT,
  getReportFormatExtension,
  getReportFormatMimeType,
  getReportFormatLabel,
  getReportPageSizeLabel,
  getReportOrientationLabel,
  isImageFormat,
  isSpreadsheetFormat,
  isDocumentFormat,
} from './report-format.constants';

export type {
  ReportFormatType,
  ReportFileExtension,
  ReportMimeType,
  ReportPrintQuality,
  ReportPageSize,
  ReportOrientation,
  ReportCompression,
  ReportFontSize,
  ReportFontFamily,
  ReportColor,
} from './report-format.constants';

// Report Status Constants
export {
  REPORT_STATUS,
  getReportGenerationStatusLabel,
  getReportDeliveryStatusLabel,
  getReportProcessingStatusLabel,
  getReportScheduleStatusLabel,
  getReportStatusColor,
  isReportComplete,
  isReportPending,
  isReportInProgress,
  isReportDelivered,
  isScheduleActive,
} from './report-status.constants';

export type {
  ReportGenerationStatus,
  ReportDeliveryStatus,
  ReportProcessingStatus,
  ReportScheduleStatus,
  ReportValidationStatus,
  ReportStatusColor,
} from './report-status.constants';

// Report Priority Constants
export {
  REPORT_PRIORITY,
  getReportPriorityLabel,
  getReportPriorityScore,
  getReportPriorityColor,
  getReportSLATarget,
  getReportEscalationLevel,
  getEscalationLevelLabel,
  isPriorityAboveThreshold,
  shouldEscalateReport,
  getPriorityFromScore,
} from './report-priority.constants';

export type {
  ReportPriorityLevel,
  ReportPriorityScore,
  ReportPriorityColor,
  ReportSLATarget,
  ReportEscalationLevel,
} from './report-priority.constants';

// Report Permission Constants
export {
  REPORT_PERMISSION_ACTIONS,
  REPORT_PERMISSION_ROLES,
  REPORT_PERMISSION_CATEGORIES,
  REPORT_PERMISSION_LEVELS,
  REPORT_PERMISSION_SCOPES,
  REPORT_PERMISSION_RESOURCES,
  REPORT_PERMISSION_DEFAULTS,
  REPORT_PERMISSION_MESSAGES,
  reportPermissionGetCategoryLabel,
  reportPermissionGetLevelLabel,
  reportPermissionGetScopeLabel,
  reportPermissionGetResourceLabel,
  reportPermissionGetRoleLabel,
  reportPermissionGetDefaultPermissions,
  reportPermissionGetDefaultLevel,
  reportPermissionIsValidRole,
  reportPermissionIsValidAction,
  reportPermissionIsValidResource,
  reportPermissionHasAction,
  reportPermissionHasAnyAction,
  reportPermissionHasAllActions,
  reportPermissionGetRoleFromLevel,
  reportPermissionGetLevelFromRole,
  reportPermissionGetMessage,
  reportPermissionIsAdmin,
  reportPermissionCanManageUsers,
  reportPermissionCanManageSettings,
} from './report-permission.constants';

export type {
  ReportPermissionAction,
  ReportPermissionRole,
  ReportPermissionCategory,
  ReportPermissionLevel,
  ReportPermissionScope,
  ReportPermissionResource,
} from './report-permission.constants';

// Report Error Constants
export {
  REPORT_ERROR,
  reportErrorGetCategoryLabel,
  reportErrorGetSeverityLabel,
  reportErrorGetMessage,
  reportErrorGetCategory,
  reportErrorGetSeverity,
  reportErrorShouldRetry,
  reportErrorGetRecoveryAction,
  reportErrorGetMaxRetries,
  reportErrorGetRetryDelay,
  reportErrorIsValidCode,
  reportErrorIsValidSeverity,
  reportErrorGetRecoveryActionLabel,
  reportErrorIsFatal,
} from './report-error.constants';

export type {
  ReportErrorCategory,
  ReportErrorCode,
  ReportErrorSeverity,
  ReportRecoveryAction,
} from './report-error.constants';

// report-logistics Constants
export * from './report-logistics';

// report-admin Constants
export * from './report-admin';

// report-dashboard Constants
export * from './report-dashboard';

// report-email Constants
export * from './report-email';

// report-export Constants
export * from './report-export';

// report-filter Constants
export * from './report-filter';

// report-notification Constants
export * from './report-notification';

// report-schedule Constants
export * from './report-schedule';

// report-seo Constants
export * from './report-seo';

// report-support Constants
export * from './report-support';

// report-template Constants
export * from './report-template';

// report-vendor Constants
export * from './report-vendor';

// report-widget Constants
export * from './report-widget';
