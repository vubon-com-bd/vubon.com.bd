/**
 * Authentication 2FA Status Constants
 * Status values for Two-Factor Authentication
 */

export const AUTH_2FA_STATUS = {
  // Primary status
  ENABLED: 'enabled',
  DISABLED: 'disabled',
  PENDING: 'pending',
  VERIFIED: 'verified',
  FAILED: 'failed',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
  LOCKED: 'locked',
  BLOCKED: 'blocked',

  // Verification status
  VERIFICATION_PENDING: 'verification_pending',
  VERIFICATION_SUCCESS: 'verification_success',
  VERIFICATION_FAILED: 'verification_failed',
  VERIFICATION_EXPIRED: 'verification_expired',

  // Recovery status
  RECOVERY_INITIATED: 'recovery_initiated',
  RECOVERY_COMPLETED: 'recovery_completed',
  RECOVERY_FAILED: 'recovery_failed',
  RECOVERY_EXPIRED: 'recovery_expired',

  // Backup code status
  BACKUP_CODE_ACTIVE: 'backup_code_active',
  BACKUP_CODE_USED: 'backup_code_used',
  BACKUP_CODE_EXPIRED: 'backup_code_expired',
  BACKUP_CODE_REVOKED: 'backup_code_revoked',

  // Device status
  DEVICE_TRUSTED: 'device_trusted',
  DEVICE_UNTRUSTED: 'device_untrusted',
  DEVICE_PENDING: 'device_pending',

  // Security status
  SECURE: 'secure',
  SUSPICIOUS: 'suspicious',
  COMPROMISED: 'compromised',
  INVESTIGATING: 'investigating',

  // Session status
  SESSION_ACTIVE: 'session_active',
  SESSION_EXPIRED: 'session_expired',
  SESSION_TERMINATED: 'session_terminated',
} as const;

export type Auth2FAStatus = (typeof AUTH_2FA_STATUS)[keyof typeof AUTH_2FA_STATUS];

export const ACTIVE_2FA_STATUSES: Auth2FAStatus[] = [
  AUTH_2FA_STATUS.ENABLED,
  AUTH_2FA_STATUS.VERIFIED,
  AUTH_2FA_STATUS.VERIFICATION_SUCCESS,
  AUTH_2FA_STATUS.SECURE,
  AUTH_2FA_STATUS.SESSION_ACTIVE,
  AUTH_2FA_STATUS.DEVICE_TRUSTED,
  AUTH_2FA_STATUS.BACKUP_CODE_ACTIVE,
];

export const PENDING_2FA_STATUSES: Auth2FAStatus[] = [
  AUTH_2FA_STATUS.PENDING,
  AUTH_2FA_STATUS.VERIFICATION_PENDING,
  AUTH_2FA_STATUS.RECOVERY_INITIATED,
  AUTH_2FA_STATUS.DEVICE_PENDING,
];

export const INACTIVE_2FA_STATUSES: Auth2FAStatus[] = [
  AUTH_2FA_STATUS.DISABLED,
  AUTH_2FA_STATUS.EXPIRED,
  AUTH_2FA_STATUS.REVOKED,
  AUTH_2FA_STATUS.VERIFICATION_EXPIRED,
  AUTH_2FA_STATUS.SESSION_EXPIRED,
  AUTH_2FA_STATUS.SESSION_TERMINATED,
  AUTH_2FA_STATUS.BACKUP_CODE_EXPIRED,
  AUTH_2FA_STATUS.BACKUP_CODE_REVOKED,
  AUTH_2FA_STATUS.DEVICE_UNTRUSTED,
];

export const FAILED_2FA_STATUSES: Auth2FAStatus[] = [
  AUTH_2FA_STATUS.FAILED,
  AUTH_2FA_STATUS.VERIFICATION_FAILED,
  AUTH_2FA_STATUS.RECOVERY_FAILED,
  AUTH_2FA_STATUS.LOCKED,
  AUTH_2FA_STATUS.BLOCKED,
];

export const SECURITY_2FA_STATUSES: Auth2FAStatus[] = [
  AUTH_2FA_STATUS.SUSPICIOUS,
  AUTH_2FA_STATUS.COMPROMISED,
  AUTH_2FA_STATUS.INVESTIGATING,
];

export const BACKUP_CODE_STATUSES: Auth2FAStatus[] = [
  AUTH_2FA_STATUS.BACKUP_CODE_ACTIVE,
  AUTH_2FA_STATUS.BACKUP_CODE_USED,
  AUTH_2FA_STATUS.BACKUP_CODE_EXPIRED,
  AUTH_2FA_STATUS.BACKUP_CODE_REVOKED,
];

export const RECOVERY_STATUSES: Auth2FAStatus[] = [
  AUTH_2FA_STATUS.RECOVERY_INITIATED,
  AUTH_2FA_STATUS.RECOVERY_COMPLETED,
  AUTH_2FA_STATUS.RECOVERY_FAILED,
  AUTH_2FA_STATUS.RECOVERY_EXPIRED,
];

export function is2FAActive(status: Auth2FAStatus): boolean {
  return ACTIVE_2FA_STATUSES.includes(status);
}

export function is2FAPending(status: Auth2FAStatus): boolean {
  return PENDING_2FA_STATUSES.includes(status);
}

export function is2FAInactive(status: Auth2FAStatus): boolean {
  return INACTIVE_2FA_STATUSES.includes(status);
}

export function is2FAFailed(status: Auth2FAStatus): boolean {
  return FAILED_2FA_STATUSES.includes(status);
}

export function is2FASecurityIssue(status: Auth2FAStatus): boolean {
  return SECURITY_2FA_STATUSES.includes(status);
}

export function isBackupCodeStatus(status: Auth2FAStatus): boolean {
  return BACKUP_CODE_STATUSES.includes(status);
}

export function isRecoveryStatus(status: Auth2FAStatus): boolean {
  return RECOVERY_STATUSES.includes(status);
}

export function get2FAStatusLabel(status: Auth2FAStatus): string {
  const labels: Record<Auth2FAStatus, string> = {
    [AUTH_2FA_STATUS.ENABLED]: 'Enabled',
    [AUTH_2FA_STATUS.DISABLED]: 'Disabled',
    [AUTH_2FA_STATUS.PENDING]: 'Pending',
    [AUTH_2FA_STATUS.VERIFIED]: 'Verified',
    [AUTH_2FA_STATUS.FAILED]: 'Failed',
    [AUTH_2FA_STATUS.EXPIRED]: 'Expired',
    [AUTH_2FA_STATUS.REVOKED]: 'Revoked',
    [AUTH_2FA_STATUS.LOCKED]: 'Locked',
    [AUTH_2FA_STATUS.BLOCKED]: 'Blocked',
    [AUTH_2FA_STATUS.VERIFICATION_PENDING]: 'Verification Pending',
    [AUTH_2FA_STATUS.VERIFICATION_SUCCESS]: 'Verification Success',
    [AUTH_2FA_STATUS.VERIFICATION_FAILED]: 'Verification Failed',
    [AUTH_2FA_STATUS.VERIFICATION_EXPIRED]: 'Verification Expired',
    [AUTH_2FA_STATUS.RECOVERY_INITIATED]: 'Recovery Initiated',
    [AUTH_2FA_STATUS.RECOVERY_COMPLETED]: 'Recovery Completed',
    [AUTH_2FA_STATUS.RECOVERY_FAILED]: 'Recovery Failed',
    [AUTH_2FA_STATUS.RECOVERY_EXPIRED]: 'Recovery Expired',
    [AUTH_2FA_STATUS.BACKUP_CODE_ACTIVE]: 'Backup Code Active',
    [AUTH_2FA_STATUS.BACKUP_CODE_USED]: 'Backup Code Used',
    [AUTH_2FA_STATUS.BACKUP_CODE_EXPIRED]: 'Backup Code Expired',
    [AUTH_2FA_STATUS.BACKUP_CODE_REVOKED]: 'Backup Code Revoked',
    [AUTH_2FA_STATUS.DEVICE_TRUSTED]: 'Device Trusted',
    [AUTH_2FA_STATUS.DEVICE_UNTRUSTED]: 'Device Untrusted',
    [AUTH_2FA_STATUS.DEVICE_PENDING]: 'Device Pending',
    [AUTH_2FA_STATUS.SECURE]: 'Secure',
    [AUTH_2FA_STATUS.SUSPICIOUS]: 'Suspicious',
    [AUTH_2FA_STATUS.COMPROMISED]: 'Compromised',
    [AUTH_2FA_STATUS.INVESTIGATING]: 'Investigating',
    [AUTH_2FA_STATUS.SESSION_ACTIVE]: 'Session Active',
    [AUTH_2FA_STATUS.SESSION_EXPIRED]: 'Session Expired',
    [AUTH_2FA_STATUS.SESSION_TERMINATED]: 'Session Terminated',
  };

  return labels[status] || 'Unknown Status';
}

export function get2FAStatusColor(status: Auth2FAStatus): string {
  const colors: Record<Auth2FAStatus, string> = {
    [AUTH_2FA_STATUS.ENABLED]: '#10B981',
    [AUTH_2FA_STATUS.DISABLED]: '#6B7280',
    [AUTH_2FA_STATUS.PENDING]: '#F59E0B',
    [AUTH_2FA_STATUS.VERIFIED]: '#10B981',
    [AUTH_2FA_STATUS.FAILED]: '#EF4444',
    [AUTH_2FA_STATUS.EXPIRED]: '#6B7280',
    [AUTH_2FA_STATUS.REVOKED]: '#6B7280',
    [AUTH_2FA_STATUS.LOCKED]: '#DC2626',
    [AUTH_2FA_STATUS.BLOCKED]: '#DC2626',
    [AUTH_2FA_STATUS.VERIFICATION_PENDING]: '#F59E0B',
    [AUTH_2FA_STATUS.VERIFICATION_SUCCESS]: '#10B981',
    [AUTH_2FA_STATUS.VERIFICATION_FAILED]: '#EF4444',
    [AUTH_2FA_STATUS.VERIFICATION_EXPIRED]: '#6B7280',
    [AUTH_2FA_STATUS.RECOVERY_INITIATED]: '#3B82F6',
    [AUTH_2FA_STATUS.RECOVERY_COMPLETED]: '#10B981',
    [AUTH_2FA_STATUS.RECOVERY_FAILED]: '#EF4444',
    [AUTH_2FA_STATUS.RECOVERY_EXPIRED]: '#6B7280',
    [AUTH_2FA_STATUS.BACKUP_CODE_ACTIVE]: '#10B981',
    [AUTH_2FA_STATUS.BACKUP_CODE_USED]: '#F59E0B',
    [AUTH_2FA_STATUS.BACKUP_CODE_EXPIRED]: '#6B7280',
    [AUTH_2FA_STATUS.BACKUP_CODE_REVOKED]: '#6B7280',
    [AUTH_2FA_STATUS.DEVICE_TRUSTED]: '#10B981',
    [AUTH_2FA_STATUS.DEVICE_UNTRUSTED]: '#EF4444',
    [AUTH_2FA_STATUS.DEVICE_PENDING]: '#F59E0B',
    [AUTH_2FA_STATUS.SECURE]: '#10B981',
    [AUTH_2FA_STATUS.SUSPICIOUS]: '#F59E0B',
    [AUTH_2FA_STATUS.COMPROMISED]: '#DC2626',
    [AUTH_2FA_STATUS.INVESTIGATING]: '#3B82F6',
    [AUTH_2FA_STATUS.SESSION_ACTIVE]: '#10B981',
    [AUTH_2FA_STATUS.SESSION_EXPIRED]: '#6B7280',
    [AUTH_2FA_STATUS.SESSION_TERMINATED]: '#6B7280',
  };

  return colors[status] || '#6B7280';
}

export function get2FAStatusPriority(status: Auth2FAStatus): number {
  const priorities: Record<Auth2FAStatus, number> = {
    [AUTH_2FA_STATUS.ENABLED]: 10,
    [AUTH_2FA_STATUS.DISABLED]: 5,
    [AUTH_2FA_STATUS.PENDING]: 7,
    [AUTH_2FA_STATUS.VERIFIED]: 10,
    [AUTH_2FA_STATUS.FAILED]: 3,
    [AUTH_2FA_STATUS.EXPIRED]: 4,
    [AUTH_2FA_STATUS.REVOKED]: 4,
    [AUTH_2FA_STATUS.LOCKED]: 1,
    [AUTH_2FA_STATUS.BLOCKED]: 1,
    [AUTH_2FA_STATUS.VERIFICATION_PENDING]: 7,
    [AUTH_2FA_STATUS.VERIFICATION_SUCCESS]: 9,
    [AUTH_2FA_STATUS.VERIFICATION_FAILED]: 3,
    [AUTH_2FA_STATUS.VERIFICATION_EXPIRED]: 4,
    [AUTH_2FA_STATUS.RECOVERY_INITIATED]: 6,
    [AUTH_2FA_STATUS.RECOVERY_COMPLETED]: 8,
    [AUTH_2FA_STATUS.RECOVERY_FAILED]: 3,
    [AUTH_2FA_STATUS.RECOVERY_EXPIRED]: 4,
    [AUTH_2FA_STATUS.BACKUP_CODE_ACTIVE]: 8,
    [AUTH_2FA_STATUS.BACKUP_CODE_USED]: 7,
    [AUTH_2FA_STATUS.BACKUP_CODE_EXPIRED]: 4,
    [AUTH_2FA_STATUS.BACKUP_CODE_REVOKED]: 4,
    [AUTH_2FA_STATUS.DEVICE_TRUSTED]: 9,
    [AUTH_2FA_STATUS.DEVICE_UNTRUSTED]: 2,
    [AUTH_2FA_STATUS.DEVICE_PENDING]: 5,
    [AUTH_2FA_STATUS.SECURE]: 10,
    [AUTH_2FA_STATUS.SUSPICIOUS]: 4,
    [AUTH_2FA_STATUS.COMPROMISED]: 1,
    [AUTH_2FA_STATUS.INVESTIGATING]: 5,
    [AUTH_2FA_STATUS.SESSION_ACTIVE]: 8,
    [AUTH_2FA_STATUS.SESSION_EXPIRED]: 3,
    [AUTH_2FA_STATUS.SESSION_TERMINATED]: 3,
  };

  return priorities[status] || 5;
}

export function get2FAStatusBadgeType(
  status: Auth2FAStatus
): 'success' | 'warning' | 'error' | 'info' | 'default' {
  const types: Record<Auth2FAStatus, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
    [AUTH_2FA_STATUS.ENABLED]: 'success',
    [AUTH_2FA_STATUS.DISABLED]: 'default',
    [AUTH_2FA_STATUS.PENDING]: 'warning',
    [AUTH_2FA_STATUS.VERIFIED]: 'success',
    [AUTH_2FA_STATUS.FAILED]: 'error',
    [AUTH_2FA_STATUS.EXPIRED]: 'default',
    [AUTH_2FA_STATUS.REVOKED]: 'default',
    [AUTH_2FA_STATUS.LOCKED]: 'error',
    [AUTH_2FA_STATUS.BLOCKED]: 'error',
    [AUTH_2FA_STATUS.VERIFICATION_PENDING]: 'warning',
    [AUTH_2FA_STATUS.VERIFICATION_SUCCESS]: 'success',
    [AUTH_2FA_STATUS.VERIFICATION_FAILED]: 'error',
    [AUTH_2FA_STATUS.VERIFICATION_EXPIRED]: 'default',
    [AUTH_2FA_STATUS.RECOVERY_INITIATED]: 'info',
    [AUTH_2FA_STATUS.RECOVERY_COMPLETED]: 'success',
    [AUTH_2FA_STATUS.RECOVERY_FAILED]: 'error',
    [AUTH_2FA_STATUS.RECOVERY_EXPIRED]: 'default',
    [AUTH_2FA_STATUS.BACKUP_CODE_ACTIVE]: 'success',
    [AUTH_2FA_STATUS.BACKUP_CODE_USED]: 'warning',
    [AUTH_2FA_STATUS.BACKUP_CODE_EXPIRED]: 'default',
    [AUTH_2FA_STATUS.BACKUP_CODE_REVOKED]: 'default',
    [AUTH_2FA_STATUS.DEVICE_TRUSTED]: 'success',
    [AUTH_2FA_STATUS.DEVICE_UNTRUSTED]: 'error',
    [AUTH_2FA_STATUS.DEVICE_PENDING]: 'warning',
    [AUTH_2FA_STATUS.SECURE]: 'success',
    [AUTH_2FA_STATUS.SUSPICIOUS]: 'warning',
    [AUTH_2FA_STATUS.COMPROMISED]: 'error',
    [AUTH_2FA_STATUS.INVESTIGATING]: 'info',
    [AUTH_2FA_STATUS.SESSION_ACTIVE]: 'success',
    [AUTH_2FA_STATUS.SESSION_EXPIRED]: 'default',
    [AUTH_2FA_STATUS.SESSION_TERMINATED]: 'default',
  };

  return types[status] || 'default';
}
