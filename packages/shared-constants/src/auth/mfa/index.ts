/**
 * MFA Constants Index
 * Export all MFA constants and types for easy importing
 */

// Core MFA
export {
  AUTH_MFA,
  MFA_METHODS_LIST,
  REQUIRED_MFA_METHODS,
  OPTIONAL_MFA_METHODS,
  isMFAMethod,
  isRequiredMFAMethod,
  isOptionalMFAMethod,
  getMFAMethodLabel,
  getMFAMethodSecurityLevel,
  getMFALevelLabel,
  getMFAMethodIcon,
  getTOTPConfig,
  getSMSConfig,
  getEmailConfig,
  getBackupCodeConfig,
  getBiometricConfig,
  getBackupCodesCount,
  getBackupCodeLength,
  getTOTPPeriod,
  getTOTPDigits,
  getTOTPWindow,
  getMFACodeExpiry,
  getMFAMaxAttempts,
} from './auth-mfa.constants';

export type {
  AuthMFAConfig,
  AuthMFAMethod,
  AuthMFALevel,
  AuthMFAEvent,
  AuthMFADefaults,
} from './auth-mfa.constants';

// MFA Types
export {
  AUTH_MFA_TYPE,
  PRIMARY_MFA_TYPES,
  BIOMETRIC_MFA_TYPES,
  HARDWARE_MFA_TYPES,
  PUSH_MFA_TYPES,
  CODE_BASED_MFA_TYPES,
  DEVICE_BASED_MFA_TYPES,
  isPrimaryMFAType,
  isBiometricMFAType,
  isHardwareMFAType,
  isPushMFAType,
  isCodeBasedMFAType,
  isDeviceBasedMFAType,
  getMFATypeLabel,
  getMFATypeCategory,
  getMFATypeIcon,
} from './auth-mfa-type.constants';

export type { AuthMFAType } from './auth-mfa-type.constants';

// MFA Status
export {
  AUTH_MFA_STATUS,
  ACTIVE_MFA_STATUSES,
  INACTIVE_MFA_STATUSES,
  PENDING_MFA_STATUSES,
  FAILED_MFA_STATUSES,
  BLOCKED_MFA_STATUSES,
  BACKUP_CODE_STATUSES,
  isMFAActive,
  isMFAInactive,
  isMFAPending,
  isMFAFailed,
  isMFABlocked,
  isBackupCodeStatus,
  getMFAStatusLabel,
  getMFAStatusColor,
  getMFAStatusPriority,
} from './auth-mfa-status.constants';

export type { AuthMFAStatus } from './auth-mfa-status.constants';
