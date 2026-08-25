// Export all constants from auth-2fa.constants
export { AUTH_2FA, AUTH_2FA_CONFIG, AUTH_2FA_TYPES, AUTH_2FA_EVENTS } from './auth-2fa.constants';

// Export all types from auth-2fa.constants
export type {
  Auth2FAConfig,
  Auth2FAType,
  Auth2FAEvent,
  Auth2FADefaults,
} from './auth-2fa.constants';

// Export all functions from auth-2fa.constants
export {
  getAuth2faTypeLabel,
  getAuth2faTypeIcon,
  getAuth2faTypeSecurityLevel,
  getAuth2faTOTPConfig,
  getAuth2faSMSConfig,
  getAuth2faEmailConfig,
  getAuth2faAuthenticatorConfig,
  getAuth2faBackupCodeConfig,
  getAuth2faRecoveryCodeConfig,
  getAuth2faCodeExpiry,
  getAuth2faMaxAttempts,
  getAuth2faLockoutDuration,
  getAuth2faRateLimitWindow,
  getAuth2faMaxRateLimitAttempts,
  getAuth2faTrustDuration,
  getAuth2faMaxTrustedDevices,
  generateAuth2faCode,
  generateAuth2faBackupCodes,
  generateAuth2faRecoveryCodes,
  isAuth2faCodeValid,
  isAuth2faCodeExpired,
  getAuth2faCodeRemainingTime,
} from './auth-2fa.constants';

// Export all constants from auth-2fa-type.constants
export {
  AUTH_2FA_TYPE,
  AUTH2FA_PRIMARY_TYPES,
  AUTH2FA_CODE_BASED_TYPES,
  AUTH2FA_DEVICE_BASED_TYPES,
  AUTH2FA_BIOMETRIC_TYPES,
  AUTH2FA_HARDWARE_TYPES,
  AUTH2FA_PUSH_TYPES,
} from './auth-2fa-type.constants';

// Export all types from auth-2fa-type.constants
export type { Auth2FAType as Auth2FATypeFromType } from './auth-2fa-type.constants';

// Export all functions from auth-2fa-type.constants
export {
  isAuth2faPrimaryType,
  isAuth2faCodeBasedType,
  isAuth2faDeviceBasedType,
  isAuth2faBiometricType,
  isAuth2faHardwareType,
  isAuth2faPushType,
  getAuth2faTypeLabel as getAuth2faTypeLabelFromType,
  getAuth2faTypeIcon as getAuth2faTypeIconFromType,
  getAuth2faTypeCategory,
  getAuth2faTypeSecurityLevel as getAuth2faTypeSecurityLevelFromType,
} from './auth-2fa-type.constants';

// Export all constants from auth-2fa-status.constants
export {
  AUTH_2FA_STATUS,
  AUTH2FA_ACTIVE_STATUSES,
  AUTH2FA_PENDING_STATUSES,
  AUTH2FA_INACTIVE_STATUSES,
  AUTH2FA_FAILED_STATUSES,
  AUTH2FA_SECURITY_STATUSES,
  AUTH2FA_BACKUP_CODE_STATUSES,
  AUTH2FA_RECOVERY_STATUSES,
} from './auth-2fa-status.constants';

// Export all types from auth-2fa-status.constants
export type { Auth2FAStatus } from './auth-2fa-status.constants';

// Export all functions from auth-2fa-status.constants
export {
  isAuth2faActive,
  isAuth2faPending,
  isAuth2faInactive,
  isAuth2faFailed,
  isAuth2faSecurityIssue,
  isAuth2faBackupCodeStatus,
  isAuth2faRecoveryStatus,
  getAuth2faStatusLabel,
  getAuth2faStatusColor,
  getAuth2faStatusPriority,
  getAuth2faStatusBadgeType,
} from './auth-2fa-status.constants';
