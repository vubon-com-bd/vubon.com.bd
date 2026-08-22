/**
 * Authentication Status Constants
 * Status values for authentication states
 */

export const AUTH_STATUS = {
  // Account status
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  SUSPENDED: 'suspended',
  BANNED: 'banned',
  DELETED: 'deleted',
  LOCKED: 'locked',
  EXPIRED: 'expired',

  // Session status
  SESSION_ACTIVE: 'session_active',
  SESSION_EXPIRED: 'session_expired',
  SESSION_TERMINATED: 'session_terminated',
  SESSION_REVOKED: 'session_revoked',

  // Verification status
  VERIFIED: 'verified',
  UNVERIFIED: 'unverified',
  VERIFICATION_PENDING: 'verification_pending',
  VERIFICATION_FAILED: 'verification_failed',
  VERIFICATION_EXPIRED: 'verification_expired',

  // MFA status
  MFA_ENABLED: 'mfa_enabled',
  MFA_DISABLED: 'mfa_disabled',
  MFA_PENDING: 'mfa_pending',
  MFA_FAILED: 'mfa_failed',

  // 2FA status
  TWO_FA_ENABLED: '2fa_enabled',
  TWO_FA_DISABLED: '2fa_disabled',
  TWO_FA_PENDING: '2fa_pending',
  TWO_FA_VERIFIED: '2fa_verified',

  // Account lock status
  ACCOUNT_LOCKED: 'account_locked',
  ACCOUNT_UNLOCKED: 'account_unlocked',
  ACCOUNT_LOCK_PENDING: 'account_lock_pending',

  // Login attempt status
  LOGIN_SUCCESS: 'login_success',
  LOGIN_FAILED: 'login_failed',
  LOGIN_BLOCKED: 'login_blocked',
  LOGIN_LOCKED: 'login_locked',

  // Password reset status
  PASSWORD_RESET_REQUESTED: 'password_reset_requested',
  PASSWORD_RESET_VERIFIED: 'password_reset_verified',
  PASSWORD_RESET_COMPLETED: 'password_reset_completed',
  PASSWORD_RESET_EXPIRED: 'password_reset_expired',
  PASSWORD_RESET_FAILED: 'password_reset_failed',

  // Token status
  TOKEN_VALID: 'token_valid',
  TOKEN_EXPIRED: 'token_expired',
  TOKEN_REVOKED: 'token_revoked',
  TOKEN_INVALID: 'token_invalid',
} as const;

export type AuthStatus = (typeof AUTH_STATUS)[keyof typeof AUTH_STATUS];

export const ACTIVE_AUTH_STATUSES: AuthStatus[] = [
  AUTH_STATUS.ACTIVE,
  AUTH_STATUS.VERIFIED,
  AUTH_STATUS.SESSION_ACTIVE,
];

export const INACTIVE_AUTH_STATUSES: AuthStatus[] = [
  AUTH_STATUS.INACTIVE,
  AUTH_STATUS.SUSPENDED,
  AUTH_STATUS.BANNED,
  AUTH_STATUS.DELETED,
];

export const LOCKED_AUTH_STATUSES: AuthStatus[] = [AUTH_STATUS.LOCKED, AUTH_STATUS.ACCOUNT_LOCKED];

export const PENDING_AUTH_STATUSES: AuthStatus[] = [
  AUTH_STATUS.PENDING,
  AUTH_STATUS.VERIFICATION_PENDING,
  AUTH_STATUS.MFA_PENDING,
  AUTH_STATUS.TWO_FA_PENDING,
  AUTH_STATUS.ACCOUNT_LOCK_PENDING,
];

export const VERIFIED_AUTH_STATUSES: AuthStatus[] = [
  AUTH_STATUS.VERIFIED,
  AUTH_STATUS.TWO_FA_VERIFIED,
];

export function isAuthActive(status: AuthStatus): boolean {
  return ACTIVE_AUTH_STATUSES.includes(status);
}

export function isAuthLocked(status: AuthStatus): boolean {
  return LOCKED_AUTH_STATUSES.includes(status);
}

export function isAuthPending(status: AuthStatus): boolean {
  return PENDING_AUTH_STATUSES.includes(status);
}

export function isAuthVerified(status: AuthStatus): boolean {
  return VERIFIED_AUTH_STATUSES.includes(status);
}

export function getAuthStatusLabel(status: AuthStatus): string {
  const labels: Record<AuthStatus, string> = {
    [AUTH_STATUS.ACTIVE]: 'Active',
    [AUTH_STATUS.INACTIVE]: 'Inactive',
    [AUTH_STATUS.PENDING]: 'Pending',
    [AUTH_STATUS.SUSPENDED]: 'Suspended',
    [AUTH_STATUS.BANNED]: 'Banned',
    [AUTH_STATUS.DELETED]: 'Deleted',
    [AUTH_STATUS.LOCKED]: 'Locked',
    [AUTH_STATUS.EXPIRED]: 'Expired',
    [AUTH_STATUS.SESSION_ACTIVE]: 'Session Active',
    [AUTH_STATUS.SESSION_EXPIRED]: 'Session Expired',
    [AUTH_STATUS.SESSION_TERMINATED]: 'Session Terminated',
    [AUTH_STATUS.SESSION_REVOKED]: 'Session Revoked',
    [AUTH_STATUS.VERIFIED]: 'Verified',
    [AUTH_STATUS.UNVERIFIED]: 'Unverified',
    [AUTH_STATUS.VERIFICATION_PENDING]: 'Verification Pending',
    [AUTH_STATUS.VERIFICATION_FAILED]: 'Verification Failed',
    [AUTH_STATUS.VERIFICATION_EXPIRED]: 'Verification Expired',
    [AUTH_STATUS.MFA_ENABLED]: 'MFA Enabled',
    [AUTH_STATUS.MFA_DISABLED]: 'MFA Disabled',
    [AUTH_STATUS.MFA_PENDING]: 'MFA Pending',
    [AUTH_STATUS.MFA_FAILED]: 'MFA Failed',
    [AUTH_STATUS.TWO_FA_ENABLED]: '2FA Enabled',
    [AUTH_STATUS.TWO_FA_DISABLED]: '2FA Disabled',
    [AUTH_STATUS.TWO_FA_PENDING]: '2FA Pending',
    [AUTH_STATUS.TWO_FA_VERIFIED]: '2FA Verified',
    [AUTH_STATUS.ACCOUNT_LOCKED]: 'Account Locked',
    [AUTH_STATUS.ACCOUNT_UNLOCKED]: 'Account Unlocked',
    [AUTH_STATUS.ACCOUNT_LOCK_PENDING]: 'Account Lock Pending',
    [AUTH_STATUS.LOGIN_SUCCESS]: 'Login Success',
    [AUTH_STATUS.LOGIN_FAILED]: 'Login Failed',
    [AUTH_STATUS.LOGIN_BLOCKED]: 'Login Blocked',
    [AUTH_STATUS.LOGIN_LOCKED]: 'Login Locked',
    [AUTH_STATUS.PASSWORD_RESET_REQUESTED]: 'Password Reset Requested',
    [AUTH_STATUS.PASSWORD_RESET_VERIFIED]: 'Password Reset Verified',
    [AUTH_STATUS.PASSWORD_RESET_COMPLETED]: 'Password Reset Completed',
    [AUTH_STATUS.PASSWORD_RESET_EXPIRED]: 'Password Reset Expired',
    [AUTH_STATUS.PASSWORD_RESET_FAILED]: 'Password Reset Failed',
    [AUTH_STATUS.TOKEN_VALID]: 'Token Valid',
    [AUTH_STATUS.TOKEN_EXPIRED]: 'Token Expired',
    [AUTH_STATUS.TOKEN_REVOKED]: 'Token Revoked',
    [AUTH_STATUS.TOKEN_INVALID]: 'Token Invalid',
  };

  return labels[status] || 'Unknown Status';
}
