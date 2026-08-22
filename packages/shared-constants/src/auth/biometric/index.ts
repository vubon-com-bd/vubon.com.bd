/**
 * Biometric Constants Index
 * Export all biometric constants and types for easy importing
 */

// Biometric
export {
  AUTH_BIOMETRIC,
  AUTH_BIOMETRIC_TYPES,
  AUTH_BIOMETRIC_CONFIG,
  AUTH_BIOMETRIC_EVENTS,
  getBiometricTypeLabel,
  getBiometricTypeIcon,
  getBiometricTypeSecurityLevel,
  getBiometricTypeAccuracy,
  getBiometricMaxDevices,
  getBiometricMaxAttempts,
  getBiometricLockoutDuration,
  getBiometricSessionTimeout,
  getBiometricReauthInterval,
  getBiometricMinConfidence,
  getBiometricMaxRetries,
  isBiometricTypeSupported,
  getSupportedBiometricTypes,
  isBiometricEnabled,
  isBiometricLocked,
  getBiometricTypeCategory,
} from './auth-biometric.constants';

export type {
  AuthBiometricConfig,
  AuthBiometricType,
  AuthBiometricEvent,
  AuthBiometricDefaults,
} from './auth-biometric.constants';

// Biometric Types
export {
  AUTH_BIOMETRIC_TYPE,
  PHYSICAL_BIOMETRICS,
  BEHAVIORAL_BIOMETRICS,
  PHYSIOLOGICAL_BIOMETRICS,
  MOBILE_BIOMETRICS,
  PLATFORM_BIOMETRICS,
  COMMON_BIOMETRICS,
  BIOMETRIC_TYPES_LIST,
  isPhysicalBiometric,
  isBehavioralBiometric,
  isPhysiologicalBiometric,
  isMobileBiometric,
  isPlatformBiometric,
  isCommonBiometric,
  getBiometricTypeLabel as getBiometricTypeLabelType,
  getBiometricTypeIcon as getBiometricTypeIconType,
  getBiometricTypeSecurityLevel as getBiometricTypeSecurityLevelType,
  getBiometricTypeCategory as getBiometricTypeCategoryType,
} from './auth-biometric-type.constants';

export type { AuthBiometricType as AuthBiometricTypeType } from './auth-biometric-type.constants';

// Biometric Status
export {
  AUTH_BIOMETRIC_STATUS,
  ACTIVE_BIOMETRIC_STATUSES,
  PENDING_BIOMETRIC_STATUSES,
  INACTIVE_BIOMETRIC_STATUSES,
  FAILED_BIOMETRIC_STATUSES,
  SECURITY_BIOMETRIC_STATUSES,
  TRUSTED_BIOMETRIC_STATUSES,
  UNTRUSTED_BIOMETRIC_STATUSES,
  isBiometricActive,
  isBiometricPending,
  isBiometricInactive,
  isBiometricFailed,
  isBiometricSecurityIssue,
  isBiometricTrusted,
  isBiometricUntrusted,
  getBiometricStatusLabel,
  getBiometricStatusColor,
  getBiometricStatusPriority,
  getBiometricStatusBadgeType,
} from './auth-biometric-status.constants';

export type { AuthBiometricStatus } from './auth-biometric-status.constants';
