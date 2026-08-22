/**
 * Recovery Code Constants Index
 * Export all recovery code constants and types for easy importing
 */

// Recovery Code
export {
  AUTH_RECOVERY_CODE,
  RECOVERY_CODE_TYPES_LIST,
  SINGLE_USE_RECOVERY_TYPES,
  MULTI_USE_RECOVERY_TYPES,
  TEMPORARY_RECOVERY_TYPES,
  PERMANENT_RECOVERY_TYPES,
  isRecoveryCodeType,
  isSingleUseRecoveryType,
  isMultiUseRecoveryType,
  isTemporaryRecoveryType,
  isPermanentRecoveryType,
  getRecoveryCodeTypeLabel,
  getRecoveryCodeTypeIcon,
  getRecoveryCodeTypePriority,
  getRecoveryCodeConfig,
  getRecoveryCodeLength,
  getRecoveryCodeCount,
  getRecoveryCodeExpiryDays,
  getRecoveryCodeMaxAttempts,
  getRecoveryCodeLockoutDuration,
  getRecoveryCodeResendCooldown,
  getRecoveryCodeMaxGenerations,
  generateRecoveryCode,
  generateRecoveryCodes,
  isRecoveryCodeValid,
  isRecoveryCodeExpired,
  getRecoveryCodeRemainingDays,
  getRecoveryCodeStatus,
  getRecoveryCodeStatusLabel,
  getRecoveryCodeStatusColor,
} from './auth-recovery-code.constants';

export type {
  AuthRecoveryCodeConfig,
  AuthRecoveryCodeType,
  AuthRecoveryCodeEvent,
  AuthRecoveryCodeDefaults,
  AuthRecoveryCodeValidation,
} from './auth-recovery-code.constants';

// Recovery Code Status
export {
  AUTH_RECOVERY_CODE_STATUS,
  ACTIVE_RECOVERY_STATUSES,
  INACTIVE_RECOVERY_STATUSES,
  USED_RECOVERY_STATUSES,
  FAILED_RECOVERY_STATUSES,
  SECURITY_RECOVERY_STATUSES,
  isRecoveryCodeActive,
  isRecoveryCodeInactive,
  isRecoveryCodeUsed,
  isRecoveryCodeFailed,
  isRecoveryCodeSecurityIssue,
  getRecoveryCodeStatusPriority,
  getRecoveryCodeStatusBadgeType,
} from './auth-recovery-code-status.constants';

export type { AuthRecoveryCodeStatus } from './auth-recovery-code-status.constants';

// Account Lock
export {
  AUTH_ACCOUNT_LOCK,
  LOCK_REASONS_LIST,
  LOCK_TYPES_LIST,
  TEMPORARY_LOCK_TYPES,
  PERMANENT_LOCK_TYPES,
  ADMIN_LOCK_TYPES,
  SYSTEM_LOCK_TYPES,
  SECURITY_LOCK_REASONS,
  POLICY_LOCK_REASONS,
  isLockReason,
  isLockType,
  isTemporaryLock,
  isPermanentLock,
  isAdminLock,
  isSystemLock,
  isSecurityLock,
  isPolicyLock,
  getLockReasonLabel,
  getLockTypeLabel,
  getLockTypeIcon,
  getLockLevel,
  getLockLevelLabel,
  getLockLevelColor,
  getLockDurationMinutes,
  getLockMaxAttempts,
  getLockFailedAttempts,
  isLockExpired,
  getLockRemainingMinutes,
  shouldAutoUnlock,
  getLockLevelFromAttempts,
} from './auth-account-lock.constants';

export type {
  AuthAccountLockConfig,
  AuthAccountLockReason,
  AuthAccountLockType,
  AuthAccountLockEvent,
  AuthAccountLockLevel,
  AuthAccountLockDefaults,
} from './auth-account-lock.constants';

// Account Lock Status
export {
  AUTH_ACCOUNT_LOCK_STATUS,
  LOCKED_STATUSES,
  UNLOCKED_STATUSES,
  PENDING_STATUSES,
  EXPIRED_STATUSES,
  SECURITY_STATUSES,
  RECOVERY_STATUSES,
  isAccountLocked,
  isAccountUnlocked,
  isAccountPending,
  isAccountExpired,
  isAccountSecurityIssue,
  isAccountRecovery,
  getAccountLockStatusLabel,
  getAccountLockStatusColor,
  getAccountLockStatusPriority,
  getAccountLockStatusBadgeType,
} from './auth-account-lock-status.constants';

export type { AuthAccountLockStatus } from './auth-account-lock-status.constants';
