/**
 * Admin Audit Constants Index
 * Export all admin audit constants for easy importing
 */

// Admin Audit Core Constants
export {
  ADMIN_AUDIT,
  ADMIN_AUDIT_ACTION_LABELS,
  ADMIN_AUDIT_SEVERITY_LABELS,
  ADMIN_AUDIT_SEVERITY_COLORS,
  ADMIN_AUDIT_SEVERITY_PRIORITY,
  ADMIN_AUDIT_CATEGORY_LABELS,
  ADMIN_AUDIT_STATUS_LABELS,
  ADMIN_AUDIT_STATUS_COLORS,
  ADMIN_AUDIT_SOURCE_LABELS,
  getAdminAuditActionLabel,
  getAdminAuditSeverityLabel,
  getAdminAuditSeverityColor,
  getAdminAuditSeverityPriority,
  getAdminAuditCategoryLabel,
  getAdminAuditStatusLabel,
  getAdminAuditStatusColor,
  getAdminAuditSourceLabel,
  isHighSeverity,
  isSuccessStatus as isCoreSuccessStatus,
  isFailureStatus as isCoreFailureStatus,
  isPendingStatus as isCorePendingStatus,
  getAuditRetentionDays,
} from './admin-audit.constants';

export type {
  AdminAuditAction,
  AdminAuditSeverity,
  AdminAuditCategory,
  AdminAuditStatus,
  AdminAuditSource,
  AdminAuditRetention,
} from './admin-audit.constants';

// Admin Audit Type Constants
export {
  ADMIN_AUDIT_TYPE,
  ADMIN_AUDIT_TYPE_CATEGORIES,
  ADMIN_AUDIT_TYPE_LABELS_DETAIL,
  getAdminAuditTypeCategory,
  getAdminAuditTypeLabel,
  isSecurityAudit,
  isComplianceAudit,
  isFinancialAudit,
  isUserAudit,
  isSystemAudit,
} from './admin-audit-type.constants';

export type { AdminAuditTypeDetail } from './admin-audit-type.constants';

// Admin Audit Status Constants
export {
  ADMIN_AUDIT_STATUS,
  ADMIN_AUDIT_STATUS_LABELS_DETAIL,
  ADMIN_AUDIT_STATUS_COLORS_DETAIL,
  ADMIN_AUDIT_STATUS_GROUPS,
  getAdminAuditStatusLabel as getAdminAuditStatusLabelDetail,
  getAdminAuditStatusColor as getAdminAuditStatusColorDetail,
  isSuccessStatus,
  isFailureStatus,
  isPendingStatus,
  isIntermediateStatus,
  isTerminalStatus,
  isActiveStatus,
  isCompliantStatus,
  isNonCompliantStatus,
  getStatusPriority,
  getAdminAuditStatuses,
  getSuccessStatuses,
  getFailureStatuses,
  getPendingStatuses,
  getIntermediateStatuses,
} from './admin-audit-status.constants';

export type { AdminAuditStatusDetail } from './admin-audit-status.constants';
