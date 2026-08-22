/**
 * Admin Verification Constants Index
 * Export all admin verification constants for easy importing
 */

// Admin Verification Core Constants
export {
  ADMIN_VERIFICATION,
  ADMIN_VERIFICATION_TYPE_LABELS,
  ADMIN_VERIFICATION_TYPE_ICONS,
  ADMIN_VERIFICATION_STATUS_LABELS,
  ADMIN_VERIFICATION_STATUS_COLORS,
  ADMIN_VERIFICATION_METHOD_LABELS,
  ADMIN_VERIFICATION_LEVEL_LABELS,
  ADMIN_VERIFICATION_LEVEL_PRIORITY,
  ADMIN_VERIFICATION_PURPOSE_LABELS,
  ADMIN_VERIFICATION_CHANNEL_LABELS,
  getAdminVerificationTypeLabel,
  getAdminVerificationTypeIcon,
  getAdminVerificationStatusLabel,
  getAdminVerificationStatusColor,
  getAdminVerificationMethodLabel,
  getAdminVerificationLevelLabel,
  getAdminVerificationLevelPriority,
  getAdminVerificationPurposeLabel,
  getAdminVerificationChannelLabel,
  isVerificationComplete,
  isVerificationFailed,
  isVerificationPending,
  isVerificationExpired,
  isVerificationTerminal,
  getVerificationLevelForType,
  getVerificationMethodsForType,
} from './admin-verification.constants';

export type {
  AdminVerificationType,
  AdminVerificationStatus,
  AdminVerificationMethod,
  AdminVerificationLevel,
  AdminVerificationPurpose,
  AdminVerificationChannel,
} from './admin-verification.constants';

// Admin Verification Type Constants
export {
  ADMIN_VERIFICATION_TYPE,
  ADMIN_VERIFICATION_TYPE_CATEGORIES,
  ADMIN_VERIFICATION_TYPE_LABELS_DETAIL,
  getAdminVerificationTypeCategory,
  getAdminVerificationTypeLabel as getAdminVerificationTypeLabelDetail,
  isBiometricType,
  isIdentityType,
  isSecurityType,
  isFinancialType,
  isDocumentType,
  isSocialType,
  isGovernmentType,
  getVerificationTypeCategory,
} from './admin-verification-type.constants';

export type { AdminVerificationTypeDetail } from './admin-verification-type.constants';

// Admin Verification Status Constants
export {
  ADMIN_VERIFICATION_STATUS,
  ADMIN_VERIFICATION_STATUS_LABELS_DETAIL,
  ADMIN_VERIFICATION_STATUS_COLORS_DETAIL,
  ADMIN_VERIFICATION_STATUS_GROUPS,
  getAdminVerificationStatusLabel as getAdminVerificationStatusLabelDetail,
  getAdminVerificationStatusColor as getAdminVerificationStatusColorDetail,
  isInitialStatus,
  isPendingStatus,
  isProcessingStatus,
  isReviewStatus,
  isSuccessStatus,
  isFailureStatus,
  isExpiredStatus,
  isCancelledStatus,
  isProblemStatus,
  isSpecialStatus,
  isFinalStatus,
  isActiveStatus,
  isTerminalStatus,
  isResolvableStatus,
  getStatusPriority,
  getAdminVerificationStatuses,
  getInitialStatuses,
  getPendingStatuses,
  getProcessingStatuses,
  getReviewStatuses,
  getSuccessStatuses,
  getFailureStatuses,
  getExpiredStatuses,
  getCancelledStatuses,
  getProblemStatuses,
  getSpecialStatuses,
  getFinalStatuses,
} from './admin-verification-status.constants';

export type { AdminVerificationStatusDetail } from './admin-verification-status.constants';
