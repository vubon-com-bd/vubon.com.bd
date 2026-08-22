/**
 * Admin 2FA Constants Index
 * Export all admin 2FA constants for easy importing
 */

// Admin 2FA Core Constants
export {
  ADMIN_2FA,
  ADMIN_2FA_METHOD_LABELS,
  ADMIN_2FA_METHOD_ICONS,
  ADMIN_2FA_STATUS_LABELS,
  ADMIN_2FA_STATUS_COLORS,
  ADMIN_2FA_SECURITY_LEVEL_LABELS,
  ADMIN_2FA_SECURITY_LEVEL_PRIORITY,
  ADMIN_2FA_VERIFICATION_TYPE_LABELS,
  ADMIN_2FA_CHANNEL_LABELS,
  getAdmin2FAMethodLabel,
  getAdmin2FAMethodIcon,
  getAdmin2FAStatusLabel,
  getAdmin2FAStatusColor,
  getAdmin2FASecurityLevelLabel,
  getAdmin2FASecurityLevelPriority,
  getAdmin2FAVerificationTypeLabel,
  getAdmin2FAChannelLabel,
  is2FAEnabled,
  is2FADisabled,
  is2FAExpired,
  is2FALocked,
  get2FATimeout,
  get2FASecurityLevel,
  get2FAChannels,
} from './admin-2fa.constants';

export type {
  Admin2FAMethod,
  Admin2FAStatus,
  Admin2FASecurityLevel,
  Admin2FAVerificationType,
  Admin2FATimeout,
  Admin2FARecovery,
  Admin2FAChannel,
  Admin2FAAlgorithm,
  Admin2FATokenFormat,
} from './admin-2fa.constants';

// Admin 2FA Type Constants
export {
  ADMIN_2FA_TYPE,
  ADMIN_2FA_TYPE_CATEGORIES,
  ADMIN_2FA_TYPE_LABELS_DETAIL,
  getAdmin2FATypeCategory,
  getAdmin2FATypeLabel,
  isTOTPType,
  isHOTPType,
  isAuthenticatorType,
  isHardwareType,
  isBiometricType,
  isBackupType,
  isSMSBased,
  isEmailBased,
  isPushBased,
  isQRBased,
  get2FATypeCategory,
} from './admin-2fa-type.constants';

export type { Admin2FATypeDetail } from './admin-2fa-type.constants';

// Admin 2FA Status Constants
export {
  ADMIN_2FA_STATUS,
  ADMIN_2FA_STATUS_LABELS_DETAIL,
  ADMIN_2FA_STATUS_COLORS_DETAIL,
  ADMIN_2FA_STATUS_GROUPS,
  getAdmin2FAStatusLabel as getAdmin2FAStatusLabelDetail,
  getAdmin2FAStatusColor as getAdmin2FAStatusColorDetail,
  isActiveStatus,
  isInactiveStatus,
  isPendingStatus,
  isSecurityStatus,
  isExpiredStatus,
  isBackupStatus,
  isFinalStatus,
  isRecoveryStatus,
  isTerminalStatus,
  isUsableStatus,
  isRequiringAction,
  getStatusPriority,
  getAdmin2FAStatuses,
  getActiveStatuses,
  getInactiveStatuses,
  getPendingStatuses,
  getSecurityStatuses,
  getExpiredStatuses,
  getBackupStatuses,
  getFinalStatuses,
  getRecoveryStatuses,
} from './admin-2fa-status.constants';

export type { Admin2FAStatusDetail } from './admin-2fa-status.constants';
