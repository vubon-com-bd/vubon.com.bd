/**
 * User Profile Status Constants
 * Defines all possible user profile statuses
 */

export const USER_PROFILE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  SUSPENDED: 'suspended',
  BLOCKED: 'blocked',
  DELETED: 'deleted',
} as const;

export type UserProfileStatus = (typeof USER_PROFILE_STATUS)[keyof typeof USER_PROFILE_STATUS];

export const USER_PROFILE_STATUS_LABELS: Record<UserProfileStatus, string> = {
  [USER_PROFILE_STATUS.ACTIVE]: 'Active',
  [USER_PROFILE_STATUS.INACTIVE]: 'Inactive',
  [USER_PROFILE_STATUS.PENDING]: 'Pending Verification',
  [USER_PROFILE_STATUS.SUSPENDED]: 'Suspended',
  [USER_PROFILE_STATUS.BLOCKED]: 'Blocked',
  [USER_PROFILE_STATUS.DELETED]: 'Deleted',
};

export const USER_PROFILE_STATUS_COLORS: Record<UserProfileStatus, string> = {
  [USER_PROFILE_STATUS.ACTIVE]: 'success',
  [USER_PROFILE_STATUS.INACTIVE]: 'secondary',
  [USER_PROFILE_STATUS.PENDING]: 'warning',
  [USER_PROFILE_STATUS.SUSPENDED]: 'warning',
  [USER_PROFILE_STATUS.BLOCKED]: 'danger',
  [USER_PROFILE_STATUS.DELETED]: 'dark',
};

export const ACTIVE_PROFILE_STATUSES: UserProfileStatus[] = [USER_PROFILE_STATUS.ACTIVE];

export const INACTIVE_PROFILE_STATUSES: UserProfileStatus[] = [
  USER_PROFILE_STATUS.INACTIVE,
  USER_PROFILE_STATUS.SUSPENDED,
  USER_PROFILE_STATUS.BLOCKED,
];

export const RESTRICTED_PROFILE_STATUSES: UserProfileStatus[] = [
  USER_PROFILE_STATUS.SUSPENDED,
  USER_PROFILE_STATUS.BLOCKED,
  USER_PROFILE_STATUS.DELETED,
];

export const VERIFICATION_REQUIRED_PROFILE_STATUSES: UserProfileStatus[] = [
  USER_PROFILE_STATUS.PENDING,
];

export function isProfileActive(status: UserProfileStatus): boolean {
  return status === USER_PROFILE_STATUS.ACTIVE;
}

export function isProfileRestricted(status: UserProfileStatus): boolean {
  return RESTRICTED_PROFILE_STATUSES.includes(status);
}

export function isProfileVisible(status: UserProfileStatus): boolean {
  return status === USER_PROFILE_STATUS.ACTIVE;
}

export function getProfileStatusLabel(status: UserProfileStatus): string {
  return USER_PROFILE_STATUS_LABELS[status] || 'Unknown';
}

export function getProfileStatusColor(status: UserProfileStatus): string {
  return USER_PROFILE_STATUS_COLORS[status] || 'secondary';
}
