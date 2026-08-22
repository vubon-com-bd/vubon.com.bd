/**
 * Admin Session Constants Index
 * Export all admin session constants for easy importing
 */

// Admin Session Core Constants
export {
  ADMIN_SESSION,
  ADMIN_SESSION_STATUS_LABELS,
  ADMIN_SESSION_STATUS_COLORS,
  ADMIN_SESSION_TYPE_LABELS,
  ADMIN_SESSION_TYPE_ICONS,
  ADMIN_SESSION_SECURITY_LABELS,
  ADMIN_SESSION_SECURITY_PRIORITY,
  getAdminSessionStatusLabel,
  getAdminSessionStatusColor,
  getAdminSessionTypeLabel,
  getAdminSessionTypeIcon,
  getAdminSessionSecurityLabel,
  getAdminSessionSecurityPriority,
  getAdminSessionTimeout,
  isActiveSession,
  isInactiveSession,
  isTerminatedSession,
  isValidSessionType,
  isHighSecurityLevel,
  shouldValidateIP,
  getSessionLifetime,
  getSessionTimeoutSeconds,
} from './admin-session.constants';

export type {
  AdminSessionStatus,
  AdminSessionType,
  AdminSessionSecurityLevel,
  AdminSessionTimeout,
  AdminSessionStorage,
  AdminSessionFlag,
} from './admin-session.constants';

// Admin Session Status Constants
export {
  ADMIN_SESSION_STATUS,
  ADMIN_SESSION_STATUS_LABELS_DETAIL,
  ADMIN_SESSION_STATUS_COLORS_DETAIL,
  ADMIN_SESSION_STATUS_GROUPS,
  getAdminSessionStatusLabel as getAdminSessionStatusLabelDetail,
  getAdminSessionStatusColor as getAdminSessionStatusColorDetail,
  isActiveStatus,
  isInactiveStatus,
  isExpiredStatus,
  isTerminatedStatus,
  isPendingStatus,
  isVerificationStatus,
  isSecurityStatus,
  isUsableSessionStatus,
  isValidSessionStatus,
  isCompromisedSession,
  isSuspiciousSession,
  shouldRevokeSession,
  getStatusPriority,
  getAdminSessionStatuses,
  getActiveStatuses,
  getInactiveStatuses,
  getExpiredStatuses,
  getTerminatedStatuses,
  getPendingStatuses,
  getVerificationStatuses,
  getSecurityStatuses,
} from './admin-session-status.constants';

export type { AdminSessionStatusDetail } from './admin-session-status.constants';
