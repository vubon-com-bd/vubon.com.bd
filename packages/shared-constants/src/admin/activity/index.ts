/**
 * Admin Activity Constants Index
 * Export all admin activity constants for easy importing
 */

// Admin Activity Core Constants
export {
  ADMIN_ACTIVITY,
  ADMIN_ACTIVITY_TYPE_LABELS,
  ADMIN_ACTIVITY_STATUS_LABELS,
  ADMIN_ACTIVITY_SEVERITY_COLORS,
  getAdminActivityTypeLabel,
  getAdminActivityStatusLabel,
  getAdminActivitySeverityColor,
  isSuccessfulActivity,
  isFailedActivity,
  isPendingActivity,
  isTerminalActivity,
} from './admin-activity.constants';

export type {
  AdminActivityType,
  AdminActivityStatus,
  AdminActivitySeverity,
  AdminActivityCategory,
  AdminActivitySource,
  AdminActivityAction,
} from './admin-activity.constants';

// Admin Activity Type Constants
export {
  ADMIN_ACTIVITY_TYPE,
  ADMIN_ACTIVITY_TYPE_CATEGORIES,
  ADMIN_ACTIVITY_TYPE_LABELS_DETAIL,
  getAdminActivityTypeCategory,
  getAdminActivityTypeLabel as getAdminActivityTypeLabelDetail,
  isAuthActivity,
  isUserManagementActivity,
  isSystemActivity,
  isSecurityActivity,
} from './admin-activity-type.constants';

export type { AdminActivityTypeDetail } from './admin-activity-type.constants';

// Admin Activity Status Constants
export {
  ADMIN_ACTIVITY_STATUS,
  ADMIN_ACTIVITY_STATUS_LABELS_DETAIL,
  ADMIN_ACTIVITY_STATUS_COLORS_DETAIL,
  ADMIN_ACTIVITY_STATUS_GROUPS,
  getAdminActivityStatusLabel as getAdminActivityStatusLabelDetail,
  getAdminActivityStatusColor,
  isSuccessStatus,
  isFailureStatus,
  isPendingStatus,
  isIntermediateStatus,
  isTerminalStatus,
  isActiveStatus,
  getStatusPriority,
  getAdminActivityStatuses,
  getSuccessStatuses,
  getFailureStatuses,
  getPendingStatuses,
  getIntermediateStatuses,
} from './admin-activity-status.constants';

export type { AdminActivityStatusDetail } from './admin-activity-status.constants';
