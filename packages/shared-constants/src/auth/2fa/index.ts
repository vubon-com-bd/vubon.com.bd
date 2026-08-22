/**
 * 2FA Constants Index
 * Export all 2FA constants and types for easy importing
 */

// 2FA
export {
  AUTH_2FA,
  AUTH_2FA_TYPES,
  AUTH_2FA_CONFIG,
  AUTH_2FA_EVENTS,
  get2FATypeLabel,
  get2FATypeIcon,
  get2FATypeSecurityLevel,
  getTOTPConfig,
  getSMSConfig,
  getEmailConfig,
  getAuthenticatorConfig,
  getBackupCodeConfig,
  getRecoveryCodeConfig,
  get2FACodeExpiry,
  get2FAMaxAttempts,
  get2FALockoutDuration,
  get2FARateLimitWindow,
  get2FAMaxRateLimitAttempts,
  get2FATrustDuration,
  get2FAMaxTrustedDevices,
  generate2FACode,
  generateBackupCodes,
  generateRecoveryCodes,
  is2FACodeValid,
  is2FACodeExpired,
  get2FACodeRemainingTime,
} from './auth-2fa.constants';

export type {
  Auth2FAConfig,
  Auth2FAType,
  Auth2FAEvent,
  Auth2FADefaults,
} from './auth-2fa.constants';

// 2FA Types
export {
  AUTH_2FA_TYPE,
  PRIMARY_2FA_TYPES,
  CODE_BASED_2FA_TYPES,
  DEVICE_BASED_2FA_TYPES,
  BIOMETRIC_2FA_TYPES,
  HARDWARE_2FA_TYPES,
  PUSH_2FA_TYPES,
  isPrimary2FAType,
  isCodeBased2FAType,
  isDeviceBased2FAType,
  isBiometric2FAType,
  isHardware2FAType,
  isPush2FAType,
  get2FATypeLabel as get2FATypeLabelType,
  get2FATypeIcon as get2FATypeIconType,
  get2FATypeCategory,
  get2FATypeSecurityLevel as get2FATypeSecurityLevelType,
} from './auth-2fa-type.constants';

export type { Auth2FAType as Auth2FATypeType } from './auth-2fa-type.constants';

// 2FA Status
export {
  AUTH_2FA_STATUS,
  ACTIVE_2FA_STATUSES,
  PENDING_2FA_STATUSES,
  INACTIVE_2FA_STATUSES,
  FAILED_2FA_STATUSES,
  SECURITY_2FA_STATUSES,
  BACKUP_CODE_STATUSES,
  RECOVERY_STATUSES,
  is2FAActive,
  is2FAPending,
  is2FAInactive,
  is2FAFailed,
  is2FASecurityIssue,
  isBackupCodeStatus,
  isRecoveryStatus,
  get2FAStatusLabel,
  get2FAStatusColor,
  get2FAStatusPriority,
  get2FAStatusBadgeType,
} from './auth-2fa-status.constants';

export type { Auth2FAStatus } from './auth-2fa-status.constants';
