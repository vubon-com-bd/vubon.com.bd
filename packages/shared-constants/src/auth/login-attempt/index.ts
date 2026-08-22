/**
 * Login Attempt Constants Index
 * Export all login attempt constants and types for easy importing
 */

// Login Attempt
export {
  AUTH_LOGIN_ATTEMPT,
  ATTEMPT_TYPES,
  ATTEMPT_REASONS,
  ATTEMPT_EVENTS,
  ATTEMPT_LEVELS,
  ATTEMPT_CONFIG,
  ATTEMPT_DEFAULTS,
  ATTEMPT_TYPES_LIST,
  SUCCESS_ATTEMPT_TYPES,
  FAILED_ATTEMPT_TYPES,
  BLOCKED_ATTEMPT_TYPES,
  ATTEMPT_REASONS_LIST,
  SECURITY_ATTEMPT_REASONS,
  CREDENTIAL_ATTEMPT_REASONS,
  TOKEN_ATTEMPT_REASONS,
  MFA_ATTEMPT_REASONS,
  isAttemptType,
  isSuccessAttempt,
  isFailedAttempt,
  isBlockedAttempt,
  isAttemptReason,
  isSecurityAttempt,
  isCredentialAttempt,
  isTokenAttempt,
  isMFAAttempt,
  getAttemptTypeLabel,
  getAttemptTypeIcon,
  getAttemptReasonLabel,
  getAttemptLevel,
  getAttemptLevelLabel,
  getAttemptLevelColor,
  getMaxLoginAttempts,
  getMaxFailedAttempts,
  getResetAfterMinutes,
  getBlockDurationMinutes,
  getCaptchaAfterAttempts,
  shouldRequireCaptcha,
  getAttemptLevelFromAttempts,
  isAccountBlocked,
  getRemainingAttempts,
  shouldResetAttempts,
} from './auth-login-attempt.constants';

export type {
  AuthLoginAttemptConfig,
  AuthLoginAttemptType,
  AuthLoginAttemptReason,
  AuthLoginAttemptEvent,
  AuthLoginAttemptLevel,
  AuthLoginAttemptDefaults,
} from './auth-login-attempt.constants';

// Login Attempt Status
export {
  AUTH_LOGIN_ATTEMPT_STATUS,
  SUCCESS_STATUSES,
  FAILED_STATUSES,
  BLOCKED_STATUSES,
  PENDING_STATUSES,
  SECURITY_STATUSES,
  VERIFICATION_STATUSES,
  MFA_STATUSES,
  isLoginSuccess,
  isLoginFailed,
  isLoginBlocked,
  isLoginPending,
  isLoginSecurityIssue,
  isLoginVerification,
  isLoginMFA,
  getLoginAttemptStatusLabel,
  getLoginAttemptStatusColor,
  getLoginAttemptStatusPriority,
  getLoginAttemptStatusBadgeType,
} from './auth-login-attempt-status.constants';

export type { AuthLoginAttemptStatus } from './auth-login-attempt-status.constants';
