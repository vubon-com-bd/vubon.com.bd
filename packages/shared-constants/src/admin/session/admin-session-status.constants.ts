/**
 * Admin Session Status Constants
 * Detailed session status definitions for admin sessions
 */

export const ADMIN_SESSION_STATUS = {
  // Active statuses
  ACTIVE: 'active',
  VERIFIED: 'verified',
  AUTHENTICATED: 'authenticated',
  AUTHORIZED: 'authorized',
  TRUSTED: 'trusted',

  // Inactive statuses
  INACTIVE: 'inactive',
  IDLE: 'idle',
  DORMANT: 'dormant',
  SLEEPING: 'sleeping',

  // Expired statuses
  EXPIRED: 'expired',
  TIMEOUT: 'timeout',
  STALE: 'stale',

  // Terminated statuses
  TERMINATED: 'terminated',
  REVOKED: 'revoked',
  BLOCKED: 'blocked',
  LOCKED: 'locked',
  SUSPENDED: 'suspended',
  BANNED: 'banned',
  DELETED: 'deleted',

  // Pending statuses
  PENDING: 'pending',
  INITIATED: 'initiated',
  CREATED: 'created',
  WAITING: 'waiting',

  // Verification statuses
  UNVERIFIED: 'unverified',
  PENDING_VERIFICATION: 'pending_verification',
  VERIFICATION_FAILED: 'verification_failed',

  // Security statuses
  COMPROMISED: 'compromised',
  HIJACKED: 'hijacked',
  SUSPICIOUS: 'suspicious',
  UNDER_REVIEW: 'under_review',
} as const;

export type AdminSessionStatusDetail =
  (typeof ADMIN_SESSION_STATUS)[keyof typeof ADMIN_SESSION_STATUS];

export const ADMIN_SESSION_STATUS_LABELS_DETAIL: Record<AdminSessionStatusDetail, string> = {
  [ADMIN_SESSION_STATUS.ACTIVE]: 'Active',
  [ADMIN_SESSION_STATUS.VERIFIED]: 'Verified',
  [ADMIN_SESSION_STATUS.AUTHENTICATED]: 'Authenticated',
  [ADMIN_SESSION_STATUS.AUTHORIZED]: 'Authorized',
  [ADMIN_SESSION_STATUS.TRUSTED]: 'Trusted',
  [ADMIN_SESSION_STATUS.INACTIVE]: 'Inactive',
  [ADMIN_SESSION_STATUS.IDLE]: 'Idle',
  [ADMIN_SESSION_STATUS.DORMANT]: 'Dormant',
  [ADMIN_SESSION_STATUS.SLEEPING]: 'Sleeping',
  [ADMIN_SESSION_STATUS.EXPIRED]: 'Expired',
  [ADMIN_SESSION_STATUS.TIMEOUT]: 'Timeout',
  [ADMIN_SESSION_STATUS.STALE]: 'Stale',
  [ADMIN_SESSION_STATUS.TERMINATED]: 'Terminated',
  [ADMIN_SESSION_STATUS.REVOKED]: 'Revoked',
  [ADMIN_SESSION_STATUS.BLOCKED]: 'Blocked',
  [ADMIN_SESSION_STATUS.LOCKED]: 'Locked',
  [ADMIN_SESSION_STATUS.SUSPENDED]: 'Suspended',
  [ADMIN_SESSION_STATUS.BANNED]: 'Banned',
  [ADMIN_SESSION_STATUS.DELETED]: 'Deleted',
  [ADMIN_SESSION_STATUS.PENDING]: 'Pending',
  [ADMIN_SESSION_STATUS.INITIATED]: 'Initiated',
  [ADMIN_SESSION_STATUS.CREATED]: 'Created',
  [ADMIN_SESSION_STATUS.WAITING]: 'Waiting',
  [ADMIN_SESSION_STATUS.UNVERIFIED]: 'Unverified',
  [ADMIN_SESSION_STATUS.PENDING_VERIFICATION]: 'Pending Verification',
  [ADMIN_SESSION_STATUS.VERIFICATION_FAILED]: 'Verification Failed',
  [ADMIN_SESSION_STATUS.COMPROMISED]: 'Compromised',
  [ADMIN_SESSION_STATUS.HIJACKED]: 'Hijacked',
  [ADMIN_SESSION_STATUS.SUSPICIOUS]: 'Suspicious',
  [ADMIN_SESSION_STATUS.UNDER_REVIEW]: 'Under Review',
};

export const ADMIN_SESSION_STATUS_COLORS_DETAIL: Record<AdminSessionStatusDetail, string> = {
  [ADMIN_SESSION_STATUS.ACTIVE]: '#10B981',
  [ADMIN_SESSION_STATUS.VERIFIED]: '#34D399',
  [ADMIN_SESSION_STATUS.AUTHENTICATED]: '#818CF8',
  [ADMIN_SESSION_STATUS.AUTHORIZED]: '#A78BFA',
  [ADMIN_SESSION_STATUS.TRUSTED]: '#6EE7B7',
  [ADMIN_SESSION_STATUS.INACTIVE]: '#6B7280',
  [ADMIN_SESSION_STATUS.IDLE]: '#9CA3AF',
  [ADMIN_SESSION_STATUS.DORMANT]: '#D1D5DB',
  [ADMIN_SESSION_STATUS.SLEEPING]: '#E5E7EB',
  [ADMIN_SESSION_STATUS.EXPIRED]: '#9CA3AF',
  [ADMIN_SESSION_STATUS.TIMEOUT]: '#F97316',
  [ADMIN_SESSION_STATUS.STALE]: '#9CA3AF',
  [ADMIN_SESSION_STATUS.TERMINATED]: '#DC2626',
  [ADMIN_SESSION_STATUS.REVOKED]: '#EF4444',
  [ADMIN_SESSION_STATUS.BLOCKED]: '#EF4444',
  [ADMIN_SESSION_STATUS.LOCKED]: '#DC2626',
  [ADMIN_SESSION_STATUS.SUSPENDED]: '#F97316',
  [ADMIN_SESSION_STATUS.BANNED]: '#EF4444',
  [ADMIN_SESSION_STATUS.DELETED]: '#6B7280',
  [ADMIN_SESSION_STATUS.PENDING]: '#F59E0B',
  [ADMIN_SESSION_STATUS.INITIATED]: '#93C5FD',
  [ADMIN_SESSION_STATUS.CREATED]: '#A7F3D0',
  [ADMIN_SESSION_STATUS.WAITING]: '#FCD34D',
  [ADMIN_SESSION_STATUS.UNVERIFIED]: '#F59E0B',
  [ADMIN_SESSION_STATUS.PENDING_VERIFICATION]: '#FCD34D',
  [ADMIN_SESSION_STATUS.VERIFICATION_FAILED]: '#EF4444',
  [ADMIN_SESSION_STATUS.COMPROMISED]: '#DC2626',
  [ADMIN_SESSION_STATUS.HIJACKED]: '#EF4444',
  [ADMIN_SESSION_STATUS.SUSPICIOUS]: '#F97316',
  [ADMIN_SESSION_STATUS.UNDER_REVIEW]: '#F59E0B',
};

export const ADMIN_SESSION_STATUS_GROUPS = {
  ACTIVE: [
    ADMIN_SESSION_STATUS.ACTIVE,
    ADMIN_SESSION_STATUS.VERIFIED,
    ADMIN_SESSION_STATUS.AUTHENTICATED,
    ADMIN_SESSION_STATUS.AUTHORIZED,
    ADMIN_SESSION_STATUS.TRUSTED,
  ] as AdminSessionStatusDetail[],
  INACTIVE: [
    ADMIN_SESSION_STATUS.INACTIVE,
    ADMIN_SESSION_STATUS.IDLE,
    ADMIN_SESSION_STATUS.DORMANT,
    ADMIN_SESSION_STATUS.SLEEPING,
  ] as AdminSessionStatusDetail[],
  EXPIRED: [
    ADMIN_SESSION_STATUS.EXPIRED,
    ADMIN_SESSION_STATUS.TIMEOUT,
    ADMIN_SESSION_STATUS.STALE,
  ] as AdminSessionStatusDetail[],
  TERMINATED: [
    ADMIN_SESSION_STATUS.TERMINATED,
    ADMIN_SESSION_STATUS.REVOKED,
    ADMIN_SESSION_STATUS.BLOCKED,
    ADMIN_SESSION_STATUS.LOCKED,
    ADMIN_SESSION_STATUS.SUSPENDED,
    ADMIN_SESSION_STATUS.BANNED,
    ADMIN_SESSION_STATUS.DELETED,
  ] as AdminSessionStatusDetail[],
  PENDING: [
    ADMIN_SESSION_STATUS.PENDING,
    ADMIN_SESSION_STATUS.INITIATED,
    ADMIN_SESSION_STATUS.CREATED,
    ADMIN_SESSION_STATUS.WAITING,
  ] as AdminSessionStatusDetail[],
  VERIFICATION: [
    ADMIN_SESSION_STATUS.UNVERIFIED,
    ADMIN_SESSION_STATUS.PENDING_VERIFICATION,
    ADMIN_SESSION_STATUS.VERIFICATION_FAILED,
  ] as AdminSessionStatusDetail[],
  SECURITY: [
    ADMIN_SESSION_STATUS.COMPROMISED,
    ADMIN_SESSION_STATUS.HIJACKED,
    ADMIN_SESSION_STATUS.SUSPICIOUS,
    ADMIN_SESSION_STATUS.UNDER_REVIEW,
  ] as AdminSessionStatusDetail[],
};

export function getAdminSessionStatusLabel(status: AdminSessionStatusDetail): string {
  return ADMIN_SESSION_STATUS_LABELS_DETAIL[status] || 'Unknown Status';
}

export function getAdminSessionStatusColor(status: AdminSessionStatusDetail): string {
  return ADMIN_SESSION_STATUS_COLORS_DETAIL[status] || '#6B7280';
}

export function isAdminSessionActiveStatus(status: AdminSessionStatusDetail): boolean {
  return ADMIN_SESSION_STATUS_GROUPS.ACTIVE.includes(status);
}

export function isAdminSessionInactiveStatus(status: AdminSessionStatusDetail): boolean {
  return ADMIN_SESSION_STATUS_GROUPS.INACTIVE.includes(status);
}

export function isAdminSessionExpiredStatus(status: AdminSessionStatusDetail): boolean {
  return ADMIN_SESSION_STATUS_GROUPS.EXPIRED.includes(status);
}

export function isAdminSessionTerminatedStatus(status: AdminSessionStatusDetail): boolean {
  return ADMIN_SESSION_STATUS_GROUPS.TERMINATED.includes(status);
}

export function isAdminSessionPendingStatus(status: AdminSessionStatusDetail): boolean {
  return ADMIN_SESSION_STATUS_GROUPS.PENDING.includes(status);
}

export function isAdminSessionVerificationStatus(status: AdminSessionStatusDetail): boolean {
  return ADMIN_SESSION_STATUS_GROUPS.VERIFICATION.includes(status);
}

export function isAdminSessionSecurityStatus(status: AdminSessionStatusDetail): boolean {
  return ADMIN_SESSION_STATUS_GROUPS.SECURITY.includes(status);
}

export function isAdminUsableSessionStatus(status: AdminSessionStatusDetail): boolean {
  return isAdminSessionActiveStatus(status) || isAdminSessionPendingStatus(status);
}

export function isAdminValidSessionStatus(status: AdminSessionStatusDetail): boolean {
  return (
    !isAdminSessionTerminatedStatus(status) &&
    !isAdminSessionExpiredStatus(status) &&
    !isAdminSessionSecurityStatus(status)
  );
}

export function isAdminCompromisedSession(status: AdminSessionStatusDetail): boolean {
  return status === ADMIN_SESSION_STATUS.COMPROMISED || status === ADMIN_SESSION_STATUS.HIJACKED;
}

export function isAdminSuspiciousSession(status: AdminSessionStatusDetail): boolean {
  return status === ADMIN_SESSION_STATUS.SUSPICIOUS || status === ADMIN_SESSION_STATUS.UNDER_REVIEW;
}

export function shouldAdminRevokeSession(status: AdminSessionStatusDetail): boolean {
  return (
    isAdminCompromisedSession(status) ||
    isAdminSuspiciousSession(status) ||
    status === ADMIN_SESSION_STATUS.BLOCKED ||
    status === ADMIN_SESSION_STATUS.BANNED
  );
}

export function getAdminSessionStatusPriority(status: AdminSessionStatusDetail): number {
  const priorityMap: Record<AdminSessionStatusDetail, number> = {
    [ADMIN_SESSION_STATUS.ACTIVE]: 1,
    [ADMIN_SESSION_STATUS.VERIFIED]: 1,
    [ADMIN_SESSION_STATUS.AUTHENTICATED]: 1,
    [ADMIN_SESSION_STATUS.AUTHORIZED]: 1,
    [ADMIN_SESSION_STATUS.TRUSTED]: 1,
    [ADMIN_SESSION_STATUS.INACTIVE]: 2,
    [ADMIN_SESSION_STATUS.IDLE]: 2,
    [ADMIN_SESSION_STATUS.DORMANT]: 2,
    [ADMIN_SESSION_STATUS.SLEEPING]: 2,
    [ADMIN_SESSION_STATUS.EXPIRED]: 3,
    [ADMIN_SESSION_STATUS.TIMEOUT]: 3,
    [ADMIN_SESSION_STATUS.STALE]: 3,
    [ADMIN_SESSION_STATUS.TERMINATED]: 4,
    [ADMIN_SESSION_STATUS.REVOKED]: 4,
    [ADMIN_SESSION_STATUS.BLOCKED]: 5,
    [ADMIN_SESSION_STATUS.LOCKED]: 5,
    [ADMIN_SESSION_STATUS.SUSPENDED]: 4,
    [ADMIN_SESSION_STATUS.BANNED]: 5,
    [ADMIN_SESSION_STATUS.DELETED]: 4,
    [ADMIN_SESSION_STATUS.PENDING]: 1,
    [ADMIN_SESSION_STATUS.INITIATED]: 1,
    [ADMIN_SESSION_STATUS.CREATED]: 1,
    [ADMIN_SESSION_STATUS.WAITING]: 1,
    [ADMIN_SESSION_STATUS.UNVERIFIED]: 2,
    [ADMIN_SESSION_STATUS.PENDING_VERIFICATION]: 2,
    [ADMIN_SESSION_STATUS.VERIFICATION_FAILED]: 3,
    [ADMIN_SESSION_STATUS.COMPROMISED]: 5,
    [ADMIN_SESSION_STATUS.HIJACKED]: 5,
    [ADMIN_SESSION_STATUS.SUSPICIOUS]: 4,
    [ADMIN_SESSION_STATUS.UNDER_REVIEW]: 3,
  };
  return priorityMap[status] || 3;
}

export function getAdminSessionStatuses(): AdminSessionStatusDetail[] {
  return Object.values(ADMIN_SESSION_STATUS);
}

export function getAdminActiveStatuses(): AdminSessionStatusDetail[] {
  return ADMIN_SESSION_STATUS_GROUPS.ACTIVE;
}

export function getAdminInactiveStatuses(): AdminSessionStatusDetail[] {
  return ADMIN_SESSION_STATUS_GROUPS.INACTIVE;
}

export function getAdminExpiredStatuses(): AdminSessionStatusDetail[] {
  return ADMIN_SESSION_STATUS_GROUPS.EXPIRED;
}

export function getAdminTerminatedStatuses(): AdminSessionStatusDetail[] {
  return ADMIN_SESSION_STATUS_GROUPS.TERMINATED;
}

export function getAdminPendingStatuses(): AdminSessionStatusDetail[] {
  return ADMIN_SESSION_STATUS_GROUPS.PENDING;
}

export function getAdminVerificationStatuses(): AdminSessionStatusDetail[] {
  return ADMIN_SESSION_STATUS_GROUPS.VERIFICATION;
}

export function getAdminSecurityStatuses(): AdminSessionStatusDetail[] {
  return ADMIN_SESSION_STATUS_GROUPS.SECURITY;
}
