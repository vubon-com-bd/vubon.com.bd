/**
 * Authentication Recovery Code Status Constants
 * Status values for recovery codes
 */

export const AUTH_RECOVERY_CODE_STATUS = {
  ACTIVE: 'active',
  USED: 'used',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
  LOCKED: 'locked',
  PENDING: 'pending',
  INACTIVE: 'inactive',

  ATTEMPTED: 'attempted',
  VERIFIED: 'verified',
  FAILED: 'failed',
  BLOCKED: 'blocked',

  GENERATED: 'generated',
  REGENERATED: 'regenerated',
  REPLACED: 'replaced',

  COMPROMISED: 'compromised',
  SUSPENDED: 'suspended',
  ARCHIVED: 'archived',
} as const;

export type AuthRecoveryCodeStatus =
  (typeof AUTH_RECOVERY_CODE_STATUS)[keyof typeof AUTH_RECOVERY_CODE_STATUS];

export const AUTHRECOVERY_ACTIVE_STATUSES: AuthRecoveryCodeStatus[] = [
  AUTH_RECOVERY_CODE_STATUS.ACTIVE,
  AUTH_RECOVERY_CODE_STATUS.PENDING,
  AUTH_RECOVERY_CODE_STATUS.GENERATED,
  AUTH_RECOVERY_CODE_STATUS.REGENERATED,
];

export const AUTHRECOVERY_INACTIVE_STATUSES: AuthRecoveryCodeStatus[] = [
  AUTH_RECOVERY_CODE_STATUS.INACTIVE,
  AUTH_RECOVERY_CODE_STATUS.EXPIRED,
  AUTH_RECOVERY_CODE_STATUS.REVOKED,
  AUTH_RECOVERY_CODE_STATUS.ARCHIVED,
  AUTH_RECOVERY_CODE_STATUS.SUSPENDED,
];

export const AUTHRECOVERY_USED_STATUSES: AuthRecoveryCodeStatus[] = [
  AUTH_RECOVERY_CODE_STATUS.USED,
  AUTH_RECOVERY_CODE_STATUS.VERIFIED,
  AUTH_RECOVERY_CODE_STATUS.REPLACED,
];

export const AUTHRECOVERY_FAILED_STATUSES: AuthRecoveryCodeStatus[] = [
  AUTH_RECOVERY_CODE_STATUS.FAILED,
  AUTH_RECOVERY_CODE_STATUS.LOCKED,
  AUTH_RECOVERY_CODE_STATUS.BLOCKED,
  AUTH_RECOVERY_CODE_STATUS.COMPROMISED,
];

export const AUTHRECOVERY_SECURITY_STATUSES: AuthRecoveryCodeStatus[] = [
  AUTH_RECOVERY_CODE_STATUS.COMPROMISED,
  AUTH_RECOVERY_CODE_STATUS.SUSPENDED,
  AUTH_RECOVERY_CODE_STATUS.BLOCKED,
  AUTH_RECOVERY_CODE_STATUS.LOCKED,
];

export function isAuthrecoveryCodeActive(status: AuthRecoveryCodeStatus): boolean {
  return AUTHRECOVERY_ACTIVE_STATUSES.includes(status);
}

export function isAuthrecoveryCodeInactive(status: AuthRecoveryCodeStatus): boolean {
  return AUTHRECOVERY_INACTIVE_STATUSES.includes(status);
}

export function isAuthrecoveryCodeUsed(status: AuthRecoveryCodeStatus): boolean {
  return AUTHRECOVERY_USED_STATUSES.includes(status);
}

export function isAuthrecoveryCodeFailed(status: AuthRecoveryCodeStatus): boolean {
  return AUTHRECOVERY_FAILED_STATUSES.includes(status);
}

export function isAuthrecoveryCodeSecurityIssue(status: AuthRecoveryCodeStatus): boolean {
  return AUTHRECOVERY_SECURITY_STATUSES.includes(status);
}

export function getAuthrecoveryCodeStatusPriority(status: AuthRecoveryCodeStatus): number {
  const priorities: Record<AuthRecoveryCodeStatus, number> = {
    [AUTH_RECOVERY_CODE_STATUS.ACTIVE]: 10,
    [AUTH_RECOVERY_CODE_STATUS.USED]: 5,
    [AUTH_RECOVERY_CODE_STATUS.EXPIRED]: 3,
    [AUTH_RECOVERY_CODE_STATUS.REVOKED]: 3,
    [AUTH_RECOVERY_CODE_STATUS.LOCKED]: 2,
    [AUTH_RECOVERY_CODE_STATUS.PENDING]: 7,
    [AUTH_RECOVERY_CODE_STATUS.INACTIVE]: 4,
    [AUTH_RECOVERY_CODE_STATUS.ATTEMPTED]: 6,
    [AUTH_RECOVERY_CODE_STATUS.VERIFIED]: 9,
    [AUTH_RECOVERY_CODE_STATUS.FAILED]: 3,
    [AUTH_RECOVERY_CODE_STATUS.BLOCKED]: 1,
    [AUTH_RECOVERY_CODE_STATUS.GENERATED]: 8,
    [AUTH_RECOVERY_CODE_STATUS.REGENERATED]: 8,
    [AUTH_RECOVERY_CODE_STATUS.REPLACED]: 6,
    [AUTH_RECOVERY_CODE_STATUS.COMPROMISED]: 1,
    [AUTH_RECOVERY_CODE_STATUS.SUSPENDED]: 2,
    [AUTH_RECOVERY_CODE_STATUS.ARCHIVED]: 3,
  };

  return priorities[status] || 5;
}

export function getAuthrecoveryCodeStatusBadgeType(
  status: AuthRecoveryCodeStatus
): 'success' | 'warning' | 'error' | 'info' | 'default' {
  const types: Record<
    AuthRecoveryCodeStatus,
    'success' | 'warning' | 'error' | 'info' | 'default'
  > = {
    [AUTH_RECOVERY_CODE_STATUS.ACTIVE]: 'success',
    [AUTH_RECOVERY_CODE_STATUS.USED]: 'default',
    [AUTH_RECOVERY_CODE_STATUS.EXPIRED]: 'error',
    [AUTH_RECOVERY_CODE_STATUS.REVOKED]: 'default',
    [AUTH_RECOVERY_CODE_STATUS.LOCKED]: 'error',
    [AUTH_RECOVERY_CODE_STATUS.PENDING]: 'warning',
    [AUTH_RECOVERY_CODE_STATUS.INACTIVE]: 'default',
    [AUTH_RECOVERY_CODE_STATUS.ATTEMPTED]: 'warning',
    [AUTH_RECOVERY_CODE_STATUS.VERIFIED]: 'success',
    [AUTH_RECOVERY_CODE_STATUS.FAILED]: 'error',
    [AUTH_RECOVERY_CODE_STATUS.BLOCKED]: 'error',
    [AUTH_RECOVERY_CODE_STATUS.GENERATED]: 'info',
    [AUTH_RECOVERY_CODE_STATUS.REGENERATED]: 'info',
    [AUTH_RECOVERY_CODE_STATUS.REPLACED]: 'info',
    [AUTH_RECOVERY_CODE_STATUS.COMPROMISED]: 'error',
    [AUTH_RECOVERY_CODE_STATUS.SUSPENDED]: 'warning',
    [AUTH_RECOVERY_CODE_STATUS.ARCHIVED]: 'default',
  };

  return types[status] || 'default';
}
