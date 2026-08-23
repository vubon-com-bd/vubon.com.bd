/**
 * Report Dashboard Constants Index
 * Export all report dashboard constants and types for easy importing
 */

// Report Dashboard Constants
export {
  REPORT_DASHBOARD,
  reportDashboardGetTypeLabel,
  reportDashboardGetLayoutLabel,
  reportDashboardGetWidgetTypeLabel,
  reportDashboardGetChartTypeLabel,
  reportDashboardGetWidgetSizeLabel,
  reportDashboardGetRefreshIntervalLabel,
  reportDashboardGetTimeRangeLabel,
  reportDashboardGetMetricLabel,
  reportDashboardGetThemeLabel,
  reportDashboardIsValidType,
  reportDashboardIsValidWidgetType,
  reportDashboardGetDefaultRefreshInterval,
  reportDashboardGetDefaultTimeRange,
  reportDashboardGetRefreshIntervalMs,
} from './report-dashboard.constants';

export type {
  ReportDashboardType,
  ReportDashboardLayout,
  ReportDashboardWidgetType,
  ReportDashboardChartType,
  ReportDashboardWidgetSize,
  ReportDashboardWidgetPosition,
  ReportDashboardRefreshInterval,
  ReportDashboardTimeRange,
  ReportDashboardMetric,
  ReportDashboardTheme,
} from './report-dashboard.constants';

// Report Dashboard Type Constants
export {
  REPORT_DASHBOARD_TYPE,
  reportDashboardTypeGetCategoryLabel,
  reportDashboardTypeGetComplexityLabel,
  reportDashboardTypeGetPurposeLabel,
  reportDashboardTypeGetAudienceLabel,
  reportDashboardTypeGetFrequencyLabel,
  reportDashboardTypeGetInteractionLabel,
  reportDashboardTypeGetPermissionLabel,
  reportDashboardTypeIsValidCategory,
  reportDashboardTypeIsValidPurpose,
} from './report-dashboard-type.constants';

export type {
  ReportDashboardTypeCategory,
  ReportDashboardTypeComplexity,
  ReportDashboardTypePurpose,
  ReportDashboardTypeAudience,
  ReportDashboardTypeFrequency,
  ReportDashboardTypeInteraction,
  ReportDashboardTypePermission,
} from './report-dashboard-type.constants';

// Report Dashboard Status Constants
export {
  REPORT_DASHBOARD_STATUS,
  reportDashboardStatusGetLabel,
  reportDashboardStatusGetCategory,
  reportDashboardStatusGetColor,
  reportDashboardStatusGetPriority,
  reportDashboardStatusIsActive,
  reportDashboardStatusIsPublished,
  reportDashboardStatusIsArchived,
  reportDashboardStatusCanTransitionTo,
  reportDashboardStatusGetAvailableTransitions,
  reportDashboardStatusGetSequence,
  reportDashboardStatusGetVisibilityLabel,
  reportDashboardStatusGetSharingLabel,
  reportDashboardStatusIsValid,
  reportDashboardStatusIsValidVisibility,
} from './report-dashboard-status.constants';

export type {
  ReportDashboardStatusType,
  ReportDashboardStatusCategory,
  ReportDashboardStatusColor,
  ReportDashboardStatusPriority,
  ReportDashboardVisibility,
  ReportDashboardSharing,
} from './report-dashboard-status.constants';
