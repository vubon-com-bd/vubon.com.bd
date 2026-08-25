// Export all constants from auth-biometric.constants
export {
  AUTH_BIOMETRIC,
  AUTH_BIOMETRIC_CONFIG,
  AUTH_BIOMETRIC_TYPES,
  AUTH_BIOMETRIC_EVENTS,
} from './auth-biometric.constants';

// Export all types from auth-biometric.constants
export type {
  AuthBiometricConfig,
  AuthBiometricType,
  AuthBiometricEvent,
  AuthBiometricDefaults,
  AuthBiometricStatusType,
} from './auth-biometric.constants';

// Export all functions from auth-biometric.constants
export {
  getAuthbiometricTypeLabel,
  getAuthbiometricTypeIcon,
  getAuthbiometricTypeSecurityLevel,
  getAuthbiometricTypeAccuracy,
  getAuthbiometricMaxDevices,
  getAuthbiometricMaxAttempts,
  getAuthbiometricLockoutDuration,
  getAuthbiometricSessionTimeout,
  getAuthbiometricReauthInterval,
  getAuthbiometricMinConfidence,
  getAuthbiometricMaxRetries,
  isAuthbiometricTypeSupported,
  getAuthbiometricSupportedTypes,
  isAuthbiometricEnabled,
  isAuthbiometricLocked,
  getAuthbiometricTypeCategory,
} from './auth-biometric.constants';

// Export all constants from auth-biometric-type.constants
export {
  AUTH_BIOMETRIC_TYPE,
  AUTHBIOMETRIC_PHYSICAL_TYPES,
  AUTHBIOMETRIC_BEHAVIORAL_TYPES,
  AUTHBIOMETRIC_PHYSIOLOGICAL_TYPES,
  AUTHBIOMETRIC_MOBILE_TYPES,
  AUTHBIOMETRIC_PLATFORM_TYPES,
  AUTHBIOMETRIC_COMMON_TYPES,
  AUTHBIOMETRIC_TYPES_LIST,
} from './auth-biometric-type.constants';

// Export all types from auth-biometric-type.constants
export type { AuthBiometricType as AuthBiometricTypeFromType } from './auth-biometric-type.constants';

// Export all functions from auth-biometric-type.constants
export {
  isAuthbiometricPhysical,
  isAuthbiometricBehavioral,
  isAuthbiometricPhysiological,
  isAuthbiometricMobile,
  isAuthbiometricPlatform,
  isAuthbiometricCommon,
  getAuthbiometricTypeLabel as getAuthbiometricTypeLabelFromType,
  getAuthbiometricTypeIcon as getAuthbiometricTypeIconFromType,
  getAuthbiometricTypeSecurityLevel as getAuthbiometricTypeSecurityLevelFromType,
  getAuthbiometricTypeCategory as getAuthbiometricTypeCategoryFromType,
} from './auth-biometric-type.constants';

// Export all constants from auth-biometric-status.constants
export {
  AUTH_BIOMETRIC_STATUS,
  AUTHBIOMETRIC_ACTIVE_STATUSES,
  AUTHBIOMETRIC_PENDING_STATUSES,
  AUTHBIOMETRIC_INACTIVE_STATUSES,
  AUTHBIOMETRIC_FAILED_STATUSES,
  AUTHBIOMETRIC_SECURITY_STATUSES,
  AUTHBIOMETRIC_TRUSTED_STATUSES,
  AUTHBIOMETRIC_UNTRUSTED_STATUSES,
} from './auth-biometric-status.constants';

// Export all types from auth-biometric-status.constants
export type { AuthBiometricStatus } from './auth-biometric-status.constants';

// Export all functions from auth-biometric-status.constants
export {
  isAuthbiometricActive,
  isAuthbiometricPending,
  isAuthbiometricInactive,
  isAuthbiometricFailed,
  isAuthbiometricSecurityIssue,
  isAuthbiometricTrusted,
  isAuthbiometricUntrusted,
  getAuthbiometricStatusLabel,
  getAuthbiometricStatusColor,
  getAuthbiometricStatusPriority,
  getAuthbiometricStatusBadgeType,
} from './auth-biometric-status.constants';
