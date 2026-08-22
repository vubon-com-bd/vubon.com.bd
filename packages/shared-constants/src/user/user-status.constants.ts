/**
 * User Status Constants
 * Defines all possible user account statuses
 */

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  BLOCKED: 'blocked',
  PENDING: 'pending',
  DELETED: 'deleted',
} as const;

export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];

export const USER_STATUS_LABELS: Record<UserStatus, string> = {
  [USER_STATUS.ACTIVE]: 'Active',
  [USER_STATUS.INACTIVE]: 'Inactive',
  [USER_STATUS.SUSPENDED]: 'Suspended',
  [USER_STATUS.BLOCKED]: 'Blocked',
  [USER_STATUS.PENDING]: 'Pending Verification',
  [USER_STATUS.DELETED]: 'Deleted',
};

export const USER_STATUS_COLORS: Record<UserStatus, string> = {
  [USER_STATUS.ACTIVE]: 'success',
  [USER_STATUS.INACTIVE]: 'secondary',
  [USER_STATUS.SUSPENDED]: 'warning',
  [USER_STATUS.BLOCKED]: 'danger',
  [USER_STATUS.PENDING]: 'info',
  [USER_STATUS.DELETED]: 'dark',
};

export const ACTIVE_USER_STATUSES: UserStatus[] = [USER_STATUS.ACTIVE];

export const INACTIVE_USER_STATUSES: UserStatus[] = [
  USER_STATUS.INACTIVE,
  USER_STATUS.SUSPENDED,
  USER_STATUS.BLOCKED,
];

export const RESTRICTED_USER_STATUSES: UserStatus[] = [
  USER_STATUS.SUSPENDED,
  USER_STATUS.BLOCKED,
  USER_STATUS.DELETED,
];

export const VERIFICATION_REQUIRED_STATUSES: UserStatus[] = [USER_STATUS.PENDING];

export function isUserActive(status: UserStatus): boolean {
  return status === USER_STATUS.ACTIVE;
}

export function isUserRestricted(status: UserStatus): boolean {
  return RESTRICTED_USER_STATUSES.includes(status);
}

export function canUserLogin(status: UserStatus): boolean {
  return status === USER_STATUS.ACTIVE || status === USER_STATUS.PENDING;
}

export function getUserStatusLabel(status: UserStatus): string {
  return USER_STATUS_LABELS[status] || 'Unknown';
}

export function getUserStatusColor(status: UserStatus): string {
  return USER_STATUS_COLORS[status] || 'secondary';
}
