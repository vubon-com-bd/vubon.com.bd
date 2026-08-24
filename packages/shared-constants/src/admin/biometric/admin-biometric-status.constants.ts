/**
 * Admin Biometric Status Constants
 * Detailed biometric status definitions
 */

export const ADMIN_BIOMETRIC_STATUS = {
  // Registration statuses
  REGISTERED: 'registered',
  UNREGISTERED: 'unregistered',
  REGISTRATION_PENDING: 'registration_pending',
  REGISTRATION_COMPLETED: 'registration_completed',
  REGISTRATION_FAILED: 'registration_failed',

  // Verification statuses
  VERIFIED: 'verified',
  UNVERIFIED: 'unverified',
  VERIFICATION_PENDING: 'verification_pending',
  VERIFICATION_COMPLETED: 'verification_completed',
  VERIFICATION_FAILED: 'verification_failed',
  VERIFICATION_EXPIRED: 'verification_expired',

  // Authentication statuses
  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated',
  AUTHENTICATION_PENDING: 'authentication_pending',
  AUTHENTICATION_FAILED: 'authentication_failed',
  AUTHENTICATION_TIMEOUT: 'authentication_timeout',

  // State statuses
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',

  // Security statuses
  LOCKED: 'locked',
  BLOCKED: 'blocked',
  SUSPENDED: 'suspended',
  COMPROMISED: 'compromised',
  REVOKED: 'revoked',

  // Time-based statuses
  EXPIRED: 'expired',
  TIMEOUT: 'timeout',
  STALE: 'stale',

  // Quality statuses
  POOR_QUALITY: 'poor_quality',
  FAIR_QUALITY: 'fair_quality',
  GOOD_QUALITY: 'good_quality',
  EXCELLENT_QUALITY: 'excellent_quality',

  // Error statuses
  ERROR: 'error',
  FAILED: 'failed',
  REJECTED: 'rejected',
  DECLINED: 'declined',

  // Final statuses
  DELETED: 'deleted',
  ARCHIVED: 'archived',
  CANCELLED: 'cancelled',
} as const;

export type AdminBiometricStatusDetail =
  (typeof ADMIN_BIOMETRIC_STATUS)[keyof typeof ADMIN_BIOMETRIC_STATUS];

export const ADMIN_BIOMETRIC_STATUS_LABELS_DETAIL: Record<AdminBiometricStatusDetail, string> = {
  // Registration statuses
  [ADMIN_BIOMETRIC_STATUS.REGISTERED]: 'Registered',
  [ADMIN_BIOMETRIC_STATUS.UNREGISTERED]: 'Unregistered',
  [ADMIN_BIOMETRIC_STATUS.REGISTRATION_PENDING]: 'Registration Pending',
  [ADMIN_BIOMETRIC_STATUS.REGISTRATION_COMPLETED]: 'Registration Completed',
  [ADMIN_BIOMETRIC_STATUS.REGISTRATION_FAILED]: 'Registration Failed',

  // Verification statuses
  [ADMIN_BIOMETRIC_STATUS.VERIFIED]: 'Verified',
  [ADMIN_BIOMETRIC_STATUS.UNVERIFIED]: 'Unverified',
  [ADMIN_BIOMETRIC_STATUS.VERIFICATION_PENDING]: 'Verification Pending',
  [ADMIN_BIOMETRIC_STATUS.VERIFICATION_COMPLETED]: 'Verification Completed',
  [ADMIN_BIOMETRIC_STATUS.VERIFICATION_FAILED]: 'Verification Failed',
  [ADMIN_BIOMETRIC_STATUS.VERIFICATION_EXPIRED]: 'Verification Expired',

  // Authentication statuses
  [ADMIN_BIOMETRIC_STATUS.AUTHENTICATED]: 'Authenticated',
  [ADMIN_BIOMETRIC_STATUS.UNAUTHENTICATED]: 'Unauthenticated',
  [ADMIN_BIOMETRIC_STATUS.AUTHENTICATION_PENDING]: 'Authentication Pending',
  [ADMIN_BIOMETRIC_STATUS.AUTHENTICATION_FAILED]: 'Authentication Failed',
  [ADMIN_BIOMETRIC_STATUS.AUTHENTICATION_TIMEOUT]: 'Authentication Timeout',

  // State statuses
  [ADMIN_BIOMETRIC_STATUS.ACTIVE]: 'Active',
  [ADMIN_BIOMETRIC_STATUS.INACTIVE]: 'Inactive',
  [ADMIN_BIOMETRIC_STATUS.PENDING]: 'Pending',
  [ADMIN_BIOMETRIC_STATUS.PROCESSING]: 'Processing',
  [ADMIN_BIOMETRIC_STATUS.COMPLETED]: 'Completed',

  // Security statuses
  [ADMIN_BIOMETRIC_STATUS.LOCKED]: 'Locked',
  [ADMIN_BIOMETRIC_STATUS.BLOCKED]: 'Blocked',
  [ADMIN_BIOMETRIC_STATUS.SUSPENDED]: 'Suspended',
  [ADMIN_BIOMETRIC_STATUS.COMPROMISED]: 'Compromised',
  [ADMIN_BIOMETRIC_STATUS.REVOKED]: 'Revoked',

  // Time-based statuses
  [ADMIN_BIOMETRIC_STATUS.EXPIRED]: 'Expired',
  [ADMIN_BIOMETRIC_STATUS.TIMEOUT]: 'Timeout',
  [ADMIN_BIOMETRIC_STATUS.STALE]: 'Stale',

  // Quality statuses
  [ADMIN_BIOMETRIC_STATUS.POOR_QUALITY]: 'Poor Quality',
  [ADMIN_BIOMETRIC_STATUS.FAIR_QUALITY]: 'Fair Quality',
  [ADMIN_BIOMETRIC_STATUS.GOOD_QUALITY]: 'Good Quality',
  [ADMIN_BIOMETRIC_STATUS.EXCELLENT_QUALITY]: 'Excellent Quality',

  // Error statuses
  [ADMIN_BIOMETRIC_STATUS.ERROR]: 'Error',
  [ADMIN_BIOMETRIC_STATUS.FAILED]: 'Failed',
  [ADMIN_BIOMETRIC_STATUS.REJECTED]: 'Rejected',
  [ADMIN_BIOMETRIC_STATUS.DECLINED]: 'Declined',

  // Final statuses
  [ADMIN_BIOMETRIC_STATUS.DELETED]: 'Deleted',
  [ADMIN_BIOMETRIC_STATUS.ARCHIVED]: 'Archived',
  [ADMIN_BIOMETRIC_STATUS.CANCELLED]: 'Cancelled',
};

export const ADMIN_BIOMETRIC_STATUS_COLORS_DETAIL: Record<AdminBiometricStatusDetail, string> = {
  // Registration statuses
  [ADMIN_BIOMETRIC_STATUS.REGISTERED]: '#3B82F6',
  [ADMIN_BIOMETRIC_STATUS.UNREGISTERED]: '#9CA3AF',
  [ADMIN_BIOMETRIC_STATUS.REGISTRATION_PENDING]: '#FCD34D',
  [ADMIN_BIOMETRIC_STATUS.REGISTRATION_COMPLETED]: '#10B981',
  [ADMIN_BIOMETRIC_STATUS.REGISTRATION_FAILED]: '#EF4444',

  // Verification statuses
  [ADMIN_BIOMETRIC_STATUS.VERIFIED]: '#10B981',
  [ADMIN_BIOMETRIC_STATUS.UNVERIFIED]: '#F59E0B',
  [ADMIN_BIOMETRIC_STATUS.VERIFICATION_PENDING]: '#FCD34D',
  [ADMIN_BIOMETRIC_STATUS.VERIFICATION_COMPLETED]: '#34D399',
  [ADMIN_BIOMETRIC_STATUS.VERIFICATION_FAILED]: '#EF4444',
  [ADMIN_BIOMETRIC_STATUS.VERIFICATION_EXPIRED]: '#9CA3AF',

  // Authentication statuses
  [ADMIN_BIOMETRIC_STATUS.AUTHENTICATED]: '#10B981',
  [ADMIN_BIOMETRIC_STATUS.UNAUTHENTICATED]: '#6B7280',
  [ADMIN_BIOMETRIC_STATUS.AUTHENTICATION_PENDING]: '#FCD34D',
  [ADMIN_BIOMETRIC_STATUS.AUTHENTICATION_FAILED]: '#EF4444',
  [ADMIN_BIOMETRIC_STATUS.AUTHENTICATION_TIMEOUT]: '#F97316',

  // State statuses
  [ADMIN_BIOMETRIC_STATUS.ACTIVE]: '#10B981',
  [ADMIN_BIOMETRIC_STATUS.INACTIVE]: '#6B7280',
  [ADMIN_BIOMETRIC_STATUS.PENDING]: '#F59E0B',
  [ADMIN_BIOMETRIC_STATUS.PROCESSING]: '#3B82F6',
  [ADMIN_BIOMETRIC_STATUS.COMPLETED]: '#34D399',

  // Security statuses
  [ADMIN_BIOMETRIC_STATUS.LOCKED]: '#DC2626',
  [ADMIN_BIOMETRIC_STATUS.BLOCKED]: '#EF4444',
  [ADMIN_BIOMETRIC_STATUS.SUSPENDED]: '#F97316',
  [ADMIN_BIOMETRIC_STATUS.COMPROMISED]: '#DC2626',
  [ADMIN_BIOMETRIC_STATUS.REVOKED]: '#EF4444',

  // Time-based statuses
  [ADMIN_BIOMETRIC_STATUS.EXPIRED]: '#9CA3AF',
  [ADMIN_BIOMETRIC_STATUS.TIMEOUT]: '#F97316',
  [ADMIN_BIOMETRIC_STATUS.STALE]: '#9CA3AF',

  // Quality statuses
  [ADMIN_BIOMETRIC_STATUS.POOR_QUALITY]: '#EF4444',
  [ADMIN_BIOMETRIC_STATUS.FAIR_QUALITY]: '#F59E0B',
  [ADMIN_BIOMETRIC_STATUS.GOOD_QUALITY]: '#3B82F6',
  [ADMIN_BIOMETRIC_STATUS.EXCELLENT_QUALITY]: '#10B981',

  // Error statuses
  [ADMIN_BIOMETRIC_STATUS.ERROR]: '#DC2626',
  [ADMIN_BIOMETRIC_STATUS.FAILED]: '#EF4444',
  [ADMIN_BIOMETRIC_STATUS.REJECTED]: '#EF4444',
  [ADMIN_BIOMETRIC_STATUS.DECLINED]: '#F87171',

  // Final statuses
  [ADMIN_BIOMETRIC_STATUS.DELETED]: '#6B7280',
  [ADMIN_BIOMETRIC_STATUS.ARCHIVED]: '#9CA3AF',
  [ADMIN_BIOMETRIC_STATUS.CANCELLED]: '#6B7280',
};

export const ADMIN_BIOMETRIC_STATUS_GROUPS = {
  REGISTERED: [
    ADMIN_BIOMETRIC_STATUS.REGISTERED,
    ADMIN_BIOMETRIC_STATUS.REGISTRATION_COMPLETED,
  ] as AdminBiometricStatusDetail[],
  UNREGISTERED: [ADMIN_BIOMETRIC_STATUS.UNREGISTERED] as AdminBiometricStatusDetail[],
  VERIFIED: [
    ADMIN_BIOMETRIC_STATUS.VERIFIED,
    ADMIN_BIOMETRIC_STATUS.VERIFICATION_COMPLETED,
    ADMIN_BIOMETRIC_STATUS.AUTHENTICATED,
  ] as AdminBiometricStatusDetail[],
  UNVERIFIED: [
    ADMIN_BIOMETRIC_STATUS.UNVERIFIED,
    ADMIN_BIOMETRIC_STATUS.UNAUTHENTICATED,
  ] as AdminBiometricStatusDetail[],
  PENDING: [
    ADMIN_BIOMETRIC_STATUS.REGISTRATION_PENDING,
    ADMIN_BIOMETRIC_STATUS.VERIFICATION_PENDING,
    ADMIN_BIOMETRIC_STATUS.AUTHENTICATION_PENDING,
    ADMIN_BIOMETRIC_STATUS.PENDING,
    ADMIN_BIOMETRIC_STATUS.PROCESSING,
  ] as AdminBiometricStatusDetail[],
  ACTIVE: [
    ADMIN_BIOMETRIC_STATUS.ACTIVE,
    ADMIN_BIOMETRIC_STATUS.COMPLETED,
  ] as AdminBiometricStatusDetail[],
  INACTIVE: [
    ADMIN_BIOMETRIC_STATUS.INACTIVE,
    ADMIN_BIOMETRIC_STATUS.STALE,
  ] as AdminBiometricStatusDetail[],
  SECURITY: [
    ADMIN_BIOMETRIC_STATUS.LOCKED,
    ADMIN_BIOMETRIC_STATUS.BLOCKED,
    ADMIN_BIOMETRIC_STATUS.SUSPENDED,
    ADMIN_BIOMETRIC_STATUS.COMPROMISED,
    ADMIN_BIOMETRIC_STATUS.REVOKED,
  ] as AdminBiometricStatusDetail[],
  EXPIRED: [
    ADMIN_BIOMETRIC_STATUS.EXPIRED,
    ADMIN_BIOMETRIC_STATUS.TIMEOUT,
    ADMIN_BIOMETRIC_STATUS.VERIFICATION_EXPIRED,
    ADMIN_BIOMETRIC_STATUS.AUTHENTICATION_TIMEOUT,
  ] as AdminBiometricStatusDetail[],
  QUALITY: [
    ADMIN_BIOMETRIC_STATUS.POOR_QUALITY,
    ADMIN_BIOMETRIC_STATUS.FAIR_QUALITY,
    ADMIN_BIOMETRIC_STATUS.GOOD_QUALITY,
    ADMIN_BIOMETRIC_STATUS.EXCELLENT_QUALITY,
  ] as AdminBiometricStatusDetail[],
  ERROR: [
    ADMIN_BIOMETRIC_STATUS.REGISTRATION_FAILED,
    ADMIN_BIOMETRIC_STATUS.VERIFICATION_FAILED,
    ADMIN_BIOMETRIC_STATUS.AUTHENTICATION_FAILED,
    ADMIN_BIOMETRIC_STATUS.ERROR,
    ADMIN_BIOMETRIC_STATUS.FAILED,
    ADMIN_BIOMETRIC_STATUS.REJECTED,
    ADMIN_BIOMETRIC_STATUS.DECLINED,
  ] as AdminBiometricStatusDetail[],
  FINAL: [
    ADMIN_BIOMETRIC_STATUS.DELETED,
    ADMIN_BIOMETRIC_STATUS.ARCHIVED,
    ADMIN_BIOMETRIC_STATUS.CANCELLED,
  ] as AdminBiometricStatusDetail[],
};

export function getAdminBiometricStatusLabel(status: AdminBiometricStatusDetail): string {
  return ADMIN_BIOMETRIC_STATUS_LABELS_DETAIL[status] || 'Unknown Status';
}

export function getAdminBiometricStatusColor(status: AdminBiometricStatusDetail): string {
  return ADMIN_BIOMETRIC_STATUS_COLORS_DETAIL[status] || '#6B7280';
}

export function isAdminBiometricRegisteredStatus(status: AdminBiometricStatusDetail): boolean {
  return ADMIN_BIOMETRIC_STATUS_GROUPS.REGISTERED.includes(status);
}

export function isAdminBiometricUnregisteredStatus(status: AdminBiometricStatusDetail): boolean {
  return ADMIN_BIOMETRIC_STATUS_GROUPS.UNREGISTERED.includes(status);
}

export function isAdminBiometricVerifiedStatus(status: AdminBiometricStatusDetail): boolean {
  return ADMIN_BIOMETRIC_STATUS_GROUPS.VERIFIED.includes(status);
}

export function isAdminBiometricUnverifiedStatus(status: AdminBiometricStatusDetail): boolean {
  return ADMIN_BIOMETRIC_STATUS_GROUPS.UNVERIFIED.includes(status);
}

export function isAdminBiometricPendingStatus(status: AdminBiometricStatusDetail): boolean {
  return ADMIN_BIOMETRIC_STATUS_GROUPS.PENDING.includes(status);
}

export function isAdminBiometricActiveStatus(status: AdminBiometricStatusDetail): boolean {
  return (
    ADMIN_BIOMETRIC_STATUS_GROUPS.ACTIVE.includes(status) ||
    isAdminBiometricRegisteredStatus(status) ||
    isAdminBiometricVerifiedStatus(status)
  );
}

export function isAdminBiometricInactiveStatus(status: AdminBiometricStatusDetail): boolean {
  return (
    ADMIN_BIOMETRIC_STATUS_GROUPS.INACTIVE.includes(status) ||
    isAdminBiometricUnregisteredStatus(status) ||
    isAdminBiometricUnverifiedStatus(status)
  );
}

export function isAdminBiometricSecurityStatus(status: AdminBiometricStatusDetail): boolean {
  return ADMIN_BIOMETRIC_STATUS_GROUPS.SECURITY.includes(status);
}

export function isAdminBiometricExpiredStatus(status: AdminBiometricStatusDetail): boolean {
  return ADMIN_BIOMETRIC_STATUS_GROUPS.EXPIRED.includes(status);
}

export function isAdminBiometricQualityStatus(status: AdminBiometricStatusDetail): boolean {
  return ADMIN_BIOMETRIC_STATUS_GROUPS.QUALITY.includes(status);
}

export function isAdminBiometricErrorStatus(status: AdminBiometricStatusDetail): boolean {
  return ADMIN_BIOMETRIC_STATUS_GROUPS.ERROR.includes(status);
}

export function isAdminBiometricFinalStatus(status: AdminBiometricStatusDetail): boolean {
  return ADMIN_BIOMETRIC_STATUS_GROUPS.FINAL.includes(status);
}

export function isAdminBiometricUsableStatus(status: AdminBiometricStatusDetail): boolean {
  return (
    isAdminBiometricActiveStatus(status) &&
    !isAdminBiometricSecurityStatus(status) &&
    !isAdminBiometricExpiredStatus(status)
  );
}

export function isAdminBiometricTerminalStatus(status: AdminBiometricStatusDetail): boolean {
  return (
    isAdminBiometricFinalStatus(status) ||
    isAdminBiometricExpiredStatus(status) ||
    isAdminBiometricErrorStatus(status)
  );
}

export function getAdminBiometricStatusPriority(status: AdminBiometricStatusDetail): number {
  const priorityMap: Record<AdminBiometricStatusDetail, number> = {
    [ADMIN_BIOMETRIC_STATUS.ACTIVE]: 1,
    [ADMIN_BIOMETRIC_STATUS.VERIFIED]: 1,
    [ADMIN_BIOMETRIC_STATUS.AUTHENTICATED]: 1,
    [ADMIN_BIOMETRIC_STATUS.REGISTERED]: 1,
    [ADMIN_BIOMETRIC_STATUS.REGISTRATION_COMPLETED]: 1,
    [ADMIN_BIOMETRIC_STATUS.VERIFICATION_COMPLETED]: 1,
    [ADMIN_BIOMETRIC_STATUS.COMPLETED]: 1,
    [ADMIN_BIOMETRIC_STATUS.EXCELLENT_QUALITY]: 1,
    [ADMIN_BIOMETRIC_STATUS.GOOD_QUALITY]: 2,
    [ADMIN_BIOMETRIC_STATUS.PENDING]: 3,
    [ADMIN_BIOMETRIC_STATUS.REGISTRATION_PENDING]: 3,
    [ADMIN_BIOMETRIC_STATUS.VERIFICATION_PENDING]: 3,
    [ADMIN_BIOMETRIC_STATUS.AUTHENTICATION_PENDING]: 3,
    [ADMIN_BIOMETRIC_STATUS.PROCESSING]: 3,
    [ADMIN_BIOMETRIC_STATUS.UNVERIFIED]: 4,
    [ADMIN_BIOMETRIC_STATUS.UNAUTHENTICATED]: 4,
    [ADMIN_BIOMETRIC_STATUS.UNREGISTERED]: 4,
    [ADMIN_BIOMETRIC_STATUS.INACTIVE]: 4,
    [ADMIN_BIOMETRIC_STATUS.FAIR_QUALITY]: 4,
    [ADMIN_BIOMETRIC_STATUS.POOR_QUALITY]: 5,
    [ADMIN_BIOMETRIC_STATUS.STALE]: 5,
    [ADMIN_BIOMETRIC_STATUS.EXPIRED]: 6,
    [ADMIN_BIOMETRIC_STATUS.TIMEOUT]: 6,
    [ADMIN_BIOMETRIC_STATUS.VERIFICATION_EXPIRED]: 6,
    [ADMIN_BIOMETRIC_STATUS.AUTHENTICATION_TIMEOUT]: 6,
    [ADMIN_BIOMETRIC_STATUS.LOCKED]: 7,
    [ADMIN_BIOMETRIC_STATUS.BLOCKED]: 7,
    [ADMIN_BIOMETRIC_STATUS.SUSPENDED]: 7,
    [ADMIN_BIOMETRIC_STATUS.REVOKED]: 7,
    [ADMIN_BIOMETRIC_STATUS.COMPROMISED]: 8,
    [ADMIN_BIOMETRIC_STATUS.REGISTRATION_FAILED]: 9,
    [ADMIN_BIOMETRIC_STATUS.VERIFICATION_FAILED]: 9,
    [ADMIN_BIOMETRIC_STATUS.AUTHENTICATION_FAILED]: 9,
    [ADMIN_BIOMETRIC_STATUS.ERROR]: 9,
    [ADMIN_BIOMETRIC_STATUS.FAILED]: 9,
    [ADMIN_BIOMETRIC_STATUS.REJECTED]: 9,
    [ADMIN_BIOMETRIC_STATUS.DECLINED]: 9,
    [ADMIN_BIOMETRIC_STATUS.DELETED]: 10,
    [ADMIN_BIOMETRIC_STATUS.ARCHIVED]: 10,
    [ADMIN_BIOMETRIC_STATUS.CANCELLED]: 10,
  };
  return priorityMap[status] || 3;
}

export function getAdminBiometricStatuses(): AdminBiometricStatusDetail[] {
  return Object.values(ADMIN_BIOMETRIC_STATUS);
}

export function getAdminBiometricRegisteredStatuses(): AdminBiometricStatusDetail[] {
  return ADMIN_BIOMETRIC_STATUS_GROUPS.REGISTERED;
}

export function getAdminBiometricUnregisteredStatuses(): AdminBiometricStatusDetail[] {
  return ADMIN_BIOMETRIC_STATUS_GROUPS.UNREGISTERED;
}

export function getAdminBiometricVerifiedStatuses(): AdminBiometricStatusDetail[] {
  return ADMIN_BIOMETRIC_STATUS_GROUPS.VERIFIED;
}

export function getAdminBiometricUnverifiedStatuses(): AdminBiometricStatusDetail[] {
  return ADMIN_BIOMETRIC_STATUS_GROUPS.UNVERIFIED;
}

export function getAdminBiometricPendingStatuses(): AdminBiometricStatusDetail[] {
  return ADMIN_BIOMETRIC_STATUS_GROUPS.PENDING;
}

export function getAdminBiometricActiveStatuses(): AdminBiometricStatusDetail[] {
  return ADMIN_BIOMETRIC_STATUS_GROUPS.ACTIVE;
}

export function getAdminBiometricInactiveStatuses(): AdminBiometricStatusDetail[] {
  return ADMIN_BIOMETRIC_STATUS_GROUPS.INACTIVE;
}

export function getAdminBiometricSecurityStatuses(): AdminBiometricStatusDetail[] {
  return ADMIN_BIOMETRIC_STATUS_GROUPS.SECURITY;
}

export function getAdminBiometricExpiredStatuses(): AdminBiometricStatusDetail[] {
  return ADMIN_BIOMETRIC_STATUS_GROUPS.EXPIRED;
}

export function getAdminBiometricQualityStatuses(): AdminBiometricStatusDetail[] {
  return ADMIN_BIOMETRIC_STATUS_GROUPS.QUALITY;
}

export function getAdminBiometricErrorStatuses(): AdminBiometricStatusDetail[] {
  return ADMIN_BIOMETRIC_STATUS_GROUPS.ERROR;
}

export function getAdminBiometricFinalStatuses(): AdminBiometricStatusDetail[] {
  return ADMIN_BIOMETRIC_STATUS_GROUPS.FINAL;
}
