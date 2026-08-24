/**
 * Admin 2FA Status Constants
 * Detailed 2FA status definitions
 */

export const ADMIN_2FA_STATUS = {
  // Basic statuses
  ENABLED: 'enabled',
  DISABLED: 'disabled',
  PENDING: 'pending',
  VERIFIED: 'verified',
  UNVERIFIED: 'unverified',

  // Security statuses
  LOCKED: 'locked',
  BLOCKED: 'blocked',
  SUSPENDED: 'suspended',
  COMPROMISED: 'compromised',

  // Time-based statuses
  EXPIRED: 'expired',
  TIMEOUT: 'timeout',
  STALE: 'stale',

  // State statuses
  CONFIGURED: 'configured',
  NOT_CONFIGURED: 'not_configured',
  PARTIALLY_CONFIGURED: 'partially_configured',
  CONFIGURATION_PENDING: 'configuration_pending',

  // Verification statuses
  VERIFICATION_PENDING: 'verification_pending',
  VERIFICATION_FAILED: 'verification_failed',
  VERIFICATION_EXPIRED: 'verification_expired',

  // Backup statuses
  BACKUP_USED: 'backup_used',
  BACKUP_AVAILABLE: 'backup_available',
  BACKUP_EXHAUSTED: 'backup_exhausted',
  BACKUP_GENERATED: 'backup_generated',

  // Device statuses
  DEVICE_REGISTERED: 'device_registered',
  DEVICE_UNREGISTERED: 'device_unregistered',
  DEVICE_LOCKED: 'device_locked',

  // Final statuses
  REVOKED: 'revoked',
  CANCELLED: 'cancelled',
  DELETED: 'deleted',
  ARCHIVED: 'archived',

  // Recovery statuses
  RECOVERY_INITIATED: 'recovery_initiated',
  RECOVERY_COMPLETED: 'recovery_completed',
  RECOVERY_FAILED: 'recovery_failed',
  RECOVERY_EXPIRED: 'recovery_expired',
} as const;

export type Admin2FAStatusDetail = (typeof ADMIN_2FA_STATUS)[keyof typeof ADMIN_2FA_STATUS];

export const ADMIN_2FA_STATUS_LABELS_DETAIL: Record<Admin2FAStatusDetail, string> = {
  // Basic statuses
  [ADMIN_2FA_STATUS.ENABLED]: 'Enabled',
  [ADMIN_2FA_STATUS.DISABLED]: 'Disabled',
  [ADMIN_2FA_STATUS.PENDING]: 'Pending',
  [ADMIN_2FA_STATUS.VERIFIED]: 'Verified',
  [ADMIN_2FA_STATUS.UNVERIFIED]: 'Unverified',

  // Security statuses
  [ADMIN_2FA_STATUS.LOCKED]: 'Locked',
  [ADMIN_2FA_STATUS.BLOCKED]: 'Blocked',
  [ADMIN_2FA_STATUS.SUSPENDED]: 'Suspended',
  [ADMIN_2FA_STATUS.COMPROMISED]: 'Compromised',

  // Time-based statuses
  [ADMIN_2FA_STATUS.EXPIRED]: 'Expired',
  [ADMIN_2FA_STATUS.TIMEOUT]: 'Timeout',
  [ADMIN_2FA_STATUS.STALE]: 'Stale',

  // State statuses
  [ADMIN_2FA_STATUS.CONFIGURED]: 'Configured',
  [ADMIN_2FA_STATUS.NOT_CONFIGURED]: 'Not Configured',
  [ADMIN_2FA_STATUS.PARTIALLY_CONFIGURED]: 'Partially Configured',
  [ADMIN_2FA_STATUS.CONFIGURATION_PENDING]: 'Configuration Pending',

  // Verification statuses
  [ADMIN_2FA_STATUS.VERIFICATION_PENDING]: 'Verification Pending',
  [ADMIN_2FA_STATUS.VERIFICATION_FAILED]: 'Verification Failed',
  [ADMIN_2FA_STATUS.VERIFICATION_EXPIRED]: 'Verification Expired',

  // Backup statuses
  [ADMIN_2FA_STATUS.BACKUP_USED]: 'Backup Used',
  [ADMIN_2FA_STATUS.BACKUP_AVAILABLE]: 'Backup Available',
  [ADMIN_2FA_STATUS.BACKUP_EXHAUSTED]: 'Backup Exhausted',
  [ADMIN_2FA_STATUS.BACKUP_GENERATED]: 'Backup Generated',

  // Device statuses
  [ADMIN_2FA_STATUS.DEVICE_REGISTERED]: 'Device Registered',
  [ADMIN_2FA_STATUS.DEVICE_UNREGISTERED]: 'Device Unregistered',
  [ADMIN_2FA_STATUS.DEVICE_LOCKED]: 'Device Locked',

  // Final statuses
  [ADMIN_2FA_STATUS.REVOKED]: 'Revoked',
  [ADMIN_2FA_STATUS.CANCELLED]: 'Cancelled',
  [ADMIN_2FA_STATUS.DELETED]: 'Deleted',
  [ADMIN_2FA_STATUS.ARCHIVED]: 'Archived',

  // Recovery statuses
  [ADMIN_2FA_STATUS.RECOVERY_INITIATED]: 'Recovery Initiated',
  [ADMIN_2FA_STATUS.RECOVERY_COMPLETED]: 'Recovery Completed',
  [ADMIN_2FA_STATUS.RECOVERY_FAILED]: 'Recovery Failed',
  [ADMIN_2FA_STATUS.RECOVERY_EXPIRED]: 'Recovery Expired',
};

export const ADMIN_2FA_STATUS_COLORS_DETAIL: Record<Admin2FAStatusDetail, string> = {
  // Basic statuses
  [ADMIN_2FA_STATUS.ENABLED]: '#10B981',
  [ADMIN_2FA_STATUS.DISABLED]: '#6B7280',
  [ADMIN_2FA_STATUS.PENDING]: '#F59E0B',
  [ADMIN_2FA_STATUS.VERIFIED]: '#34D399',
  [ADMIN_2FA_STATUS.UNVERIFIED]: '#F59E0B',

  // Security statuses
  [ADMIN_2FA_STATUS.LOCKED]: '#DC2626',
  [ADMIN_2FA_STATUS.BLOCKED]: '#EF4444',
  [ADMIN_2FA_STATUS.SUSPENDED]: '#F97316',
  [ADMIN_2FA_STATUS.COMPROMISED]: '#DC2626',

  // Time-based statuses
  [ADMIN_2FA_STATUS.EXPIRED]: '#9CA3AF',
  [ADMIN_2FA_STATUS.TIMEOUT]: '#F97316',
  [ADMIN_2FA_STATUS.STALE]: '#9CA3AF',

  // State statuses
  [ADMIN_2FA_STATUS.CONFIGURED]: '#3B82F6',
  [ADMIN_2FA_STATUS.NOT_CONFIGURED]: '#9CA3AF',
  [ADMIN_2FA_STATUS.PARTIALLY_CONFIGURED]: '#F59E0B',
  [ADMIN_2FA_STATUS.CONFIGURATION_PENDING]: '#FCD34D',

  // Verification statuses
  [ADMIN_2FA_STATUS.VERIFICATION_PENDING]: '#FCD34D',
  [ADMIN_2FA_STATUS.VERIFICATION_FAILED]: '#EF4444',
  [ADMIN_2FA_STATUS.VERIFICATION_EXPIRED]: '#9CA3AF',

  // Backup statuses
  [ADMIN_2FA_STATUS.BACKUP_USED]: '#8B5CF6',
  [ADMIN_2FA_STATUS.BACKUP_AVAILABLE]: '#34D399',
  [ADMIN_2FA_STATUS.BACKUP_EXHAUSTED]: '#EF4444',
  [ADMIN_2FA_STATUS.BACKUP_GENERATED]: '#3B82F6',

  // Device statuses
  [ADMIN_2FA_STATUS.DEVICE_REGISTERED]: '#3B82F6',
  [ADMIN_2FA_STATUS.DEVICE_UNREGISTERED]: '#9CA3AF',
  [ADMIN_2FA_STATUS.DEVICE_LOCKED]: '#DC2626',

  // Final statuses
  [ADMIN_2FA_STATUS.REVOKED]: '#EF4444',
  [ADMIN_2FA_STATUS.CANCELLED]: '#6B7280',
  [ADMIN_2FA_STATUS.DELETED]: '#6B7280',
  [ADMIN_2FA_STATUS.ARCHIVED]: '#9CA3AF',

  // Recovery statuses
  [ADMIN_2FA_STATUS.RECOVERY_INITIATED]: '#FCD34D',
  [ADMIN_2FA_STATUS.RECOVERY_COMPLETED]: '#10B981',
  [ADMIN_2FA_STATUS.RECOVERY_FAILED]: '#EF4444',
  [ADMIN_2FA_STATUS.RECOVERY_EXPIRED]: '#9CA3AF',
};

export const ADMIN_2FA_STATUS_GROUPS = {
  ACTIVE: [
    ADMIN_2FA_STATUS.ENABLED,
    ADMIN_2FA_STATUS.VERIFIED,
    ADMIN_2FA_STATUS.CONFIGURED,
    ADMIN_2FA_STATUS.DEVICE_REGISTERED,
    ADMIN_2FA_STATUS.BACKUP_AVAILABLE,
  ] as Admin2FAStatusDetail[],
  INACTIVE: [
    ADMIN_2FA_STATUS.DISABLED,
    ADMIN_2FA_STATUS.UNVERIFIED,
    ADMIN_2FA_STATUS.NOT_CONFIGURED,
    ADMIN_2FA_STATUS.DEVICE_UNREGISTERED,
  ] as Admin2FAStatusDetail[],
  PENDING: [
    ADMIN_2FA_STATUS.PENDING,
    ADMIN_2FA_STATUS.CONFIGURATION_PENDING,
    ADMIN_2FA_STATUS.VERIFICATION_PENDING,
    ADMIN_2FA_STATUS.RECOVERY_INITIATED,
  ] as Admin2FAStatusDetail[],
  SECURITY: [
    ADMIN_2FA_STATUS.LOCKED,
    ADMIN_2FA_STATUS.BLOCKED,
    ADMIN_2FA_STATUS.SUSPENDED,
    ADMIN_2FA_STATUS.COMPROMISED,
    ADMIN_2FA_STATUS.DEVICE_LOCKED,
  ] as Admin2FAStatusDetail[],
  EXPIRED: [
    ADMIN_2FA_STATUS.EXPIRED,
    ADMIN_2FA_STATUS.TIMEOUT,
    ADMIN_2FA_STATUS.STALE,
    ADMIN_2FA_STATUS.VERIFICATION_EXPIRED,
    ADMIN_2FA_STATUS.RECOVERY_EXPIRED,
  ] as Admin2FAStatusDetail[],
  BACKUP: [
    ADMIN_2FA_STATUS.BACKUP_USED,
    ADMIN_2FA_STATUS.BACKUP_EXHAUSTED,
  ] as Admin2FAStatusDetail[],
  FINAL: [
    ADMIN_2FA_STATUS.REVOKED,
    ADMIN_2FA_STATUS.CANCELLED,
    ADMIN_2FA_STATUS.DELETED,
    ADMIN_2FA_STATUS.ARCHIVED,
  ] as Admin2FAStatusDetail[],
  RECOVERY: [
    ADMIN_2FA_STATUS.RECOVERY_COMPLETED,
    ADMIN_2FA_STATUS.RECOVERY_FAILED,
  ] as Admin2FAStatusDetail[],
};

export function get2faAdminStatusLabel(status: Admin2FAStatusDetail): string {
  return ADMIN_2FA_STATUS_LABELS_DETAIL[status] || 'Unknown Status';
}

export function get2faAdminStatusColor(status: Admin2FAStatusDetail): string {
  return ADMIN_2FA_STATUS_COLORS_DETAIL[status] || '#6B7280';
}

export function is2faAdminActiveStatus(status: Admin2FAStatusDetail): boolean {
  return ADMIN_2FA_STATUS_GROUPS.ACTIVE.includes(status);
}

export function is2faAdminInactiveStatus(status: Admin2FAStatusDetail): boolean {
  return ADMIN_2FA_STATUS_GROUPS.INACTIVE.includes(status);
}

export function is2faAdminPendingStatus(status: Admin2FAStatusDetail): boolean {
  return ADMIN_2FA_STATUS_GROUPS.PENDING.includes(status);
}

export function is2faAdminSecurityStatus(status: Admin2FAStatusDetail): boolean {
  return ADMIN_2FA_STATUS_GROUPS.SECURITY.includes(status);
}

export function is2faAdminExpiredStatus(status: Admin2FAStatusDetail): boolean {
  return ADMIN_2FA_STATUS_GROUPS.EXPIRED.includes(status);
}

export function is2faAdminBackupStatus(status: Admin2FAStatusDetail): boolean {
  return ADMIN_2FA_STATUS_GROUPS.BACKUP.includes(status);
}

export function is2faAdminFinalStatus(status: Admin2FAStatusDetail): boolean {
  return ADMIN_2FA_STATUS_GROUPS.FINAL.includes(status);
}

export function is2faAdminRecoveryStatus(status: Admin2FAStatusDetail): boolean {
  return ADMIN_2FA_STATUS_GROUPS.RECOVERY.includes(status);
}

export function is2faAdminTerminalStatus(status: Admin2FAStatusDetail): boolean {
  return is2faAdminFinalStatus(status) || is2faAdminExpiredStatus(status);
}

export function is2faAdminUsableStatus(status: Admin2FAStatusDetail): boolean {
  return is2faAdminActiveStatus(status) || is2faAdminBackupStatus(status);
}

export function is2faAdminRequiringAction(status: Admin2FAStatusDetail): boolean {
  return (
    is2faAdminPendingStatus(status) ||
    is2faAdminSecurityStatus(status) ||
    is2faAdminRecoveryStatus(status)
  );
}

export function get2faAdminStatusPriority(status: Admin2FAStatusDetail): number {
  const priorityMap: Record<Admin2FAStatusDetail, number> = {
    [ADMIN_2FA_STATUS.ENABLED]: 1,
    [ADMIN_2FA_STATUS.VERIFIED]: 1,
    [ADMIN_2FA_STATUS.CONFIGURED]: 1,
    [ADMIN_2FA_STATUS.DEVICE_REGISTERED]: 1,
    [ADMIN_2FA_STATUS.BACKUP_AVAILABLE]: 1,
    [ADMIN_2FA_STATUS.DISABLED]: 2,
    [ADMIN_2FA_STATUS.UNVERIFIED]: 2,
    [ADMIN_2FA_STATUS.NOT_CONFIGURED]: 2,
    [ADMIN_2FA_STATUS.DEVICE_UNREGISTERED]: 2,
    [ADMIN_2FA_STATUS.PENDING]: 3,
    [ADMIN_2FA_STATUS.CONFIGURATION_PENDING]: 3,
    [ADMIN_2FA_STATUS.VERIFICATION_PENDING]: 3,
    [ADMIN_2FA_STATUS.RECOVERY_INITIATED]: 3,
    [ADMIN_2FA_STATUS.LOCKED]: 4,
    [ADMIN_2FA_STATUS.BLOCKED]: 4,
    [ADMIN_2FA_STATUS.SUSPENDED]: 4,
    [ADMIN_2FA_STATUS.COMPROMISED]: 5,
    [ADMIN_2FA_STATUS.DEVICE_LOCKED]: 4,
    [ADMIN_2FA_STATUS.EXPIRED]: 6,
    [ADMIN_2FA_STATUS.TIMEOUT]: 6,
    [ADMIN_2FA_STATUS.STALE]: 6,
    [ADMIN_2FA_STATUS.VERIFICATION_EXPIRED]: 6,
    [ADMIN_2FA_STATUS.RECOVERY_EXPIRED]: 6,
    [ADMIN_2FA_STATUS.BACKUP_USED]: 3,
    [ADMIN_2FA_STATUS.BACKUP_EXHAUSTED]: 4,
    [ADMIN_2FA_STATUS.REVOKED]: 7,
    [ADMIN_2FA_STATUS.CANCELLED]: 7,
    [ADMIN_2FA_STATUS.DELETED]: 7,
    [ADMIN_2FA_STATUS.ARCHIVED]: 7,
    [ADMIN_2FA_STATUS.RECOVERY_COMPLETED]: 1,
    [ADMIN_2FA_STATUS.RECOVERY_FAILED]: 5,
    [ADMIN_2FA_STATUS.PARTIALLY_CONFIGURED]: 3,
    [ADMIN_2FA_STATUS.BACKUP_GENERATED]: 1,
    [ADMIN_2FA_STATUS.VERIFICATION_FAILED]: 5,
  };
  return priorityMap[status] || 3;
}

export function get2faAdminStatuses(): Admin2FAStatusDetail[] {
  return Object.values(ADMIN_2FA_STATUS);
}

export function get2faAdminActiveStatuses(): Admin2FAStatusDetail[] {
  return ADMIN_2FA_STATUS_GROUPS.ACTIVE;
}

export function get2faAdminInactiveStatuses(): Admin2FAStatusDetail[] {
  return ADMIN_2FA_STATUS_GROUPS.INACTIVE;
}

export function get2faAdminPendingStatuses(): Admin2FAStatusDetail[] {
  return ADMIN_2FA_STATUS_GROUPS.PENDING;
}

export function get2faAdminSecurityStatuses(): Admin2FAStatusDetail[] {
  return ADMIN_2FA_STATUS_GROUPS.SECURITY;
}

export function get2faAdminExpiredStatuses(): Admin2FAStatusDetail[] {
  return ADMIN_2FA_STATUS_GROUPS.EXPIRED;
}

export function get2faAdminBackupStatuses(): Admin2FAStatusDetail[] {
  return ADMIN_2FA_STATUS_GROUPS.BACKUP;
}

export function get2faAdminFinalStatuses(): Admin2FAStatusDetail[] {
  return ADMIN_2FA_STATUS_GROUPS.FINAL;
}

export function get2faAdminRecoveryStatuses(): Admin2FAStatusDetail[] {
  return ADMIN_2FA_STATUS_GROUPS.RECOVERY;
}
