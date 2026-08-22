/**
 * User Contact Status Constants
 * Defines all possible user contact statuses
 */

export const USER_CONTACT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
  BLOCKED: 'blocked',
  DELETED: 'deleted',
} as const;

export type UserContactStatus = (typeof USER_CONTACT_STATUS)[keyof typeof USER_CONTACT_STATUS];

export const USER_CONTACT_STATUS_LABELS: Record<UserContactStatus, string> = {
  [USER_CONTACT_STATUS.ACTIVE]: 'Active',
  [USER_CONTACT_STATUS.INACTIVE]: 'Inactive',
  [USER_CONTACT_STATUS.PENDING]: 'Pending Verification',
  [USER_CONTACT_STATUS.VERIFIED]: 'Verified',
  [USER_CONTACT_STATUS.REJECTED]: 'Rejected',
  [USER_CONTACT_STATUS.BLOCKED]: 'Blocked',
  [USER_CONTACT_STATUS.DELETED]: 'Deleted',
};

export const USER_CONTACT_STATUS_COLORS: Record<UserContactStatus, string> = {
  [USER_CONTACT_STATUS.ACTIVE]: 'success',
  [USER_CONTACT_STATUS.INACTIVE]: 'secondary',
  [USER_CONTACT_STATUS.PENDING]: 'warning',
  [USER_CONTACT_STATUS.VERIFIED]: 'info',
  [USER_CONTACT_STATUS.REJECTED]: 'danger',
  [USER_CONTACT_STATUS.BLOCKED]: 'danger',
  [USER_CONTACT_STATUS.DELETED]: 'dark',
};

export const ACTIVE_CONTACT_STATUSES: UserContactStatus[] = [
  USER_CONTACT_STATUS.ACTIVE,
  USER_CONTACT_STATUS.VERIFIED,
];

export const INACTIVE_CONTACT_STATUSES: UserContactStatus[] = [
  USER_CONTACT_STATUS.INACTIVE,
  USER_CONTACT_STATUS.REJECTED,
  USER_CONTACT_STATUS.BLOCKED,
  USER_CONTACT_STATUS.DELETED,
];

export const RESTRICTED_CONTACT_STATUSES: UserContactStatus[] = [
  USER_CONTACT_STATUS.BLOCKED,
  USER_CONTACT_STATUS.DELETED,
];

export const VERIFICATION_REQUIRED_CONTACT_STATUSES: UserContactStatus[] = [
  USER_CONTACT_STATUS.PENDING,
];

export const VERIFIED_CONTACT_STATUSES: UserContactStatus[] = [USER_CONTACT_STATUS.VERIFIED];

export function isContactActive(status: UserContactStatus): boolean {
  return status === USER_CONTACT_STATUS.ACTIVE || status === USER_CONTACT_STATUS.VERIFIED;
}

export function isContactRestricted(status: UserContactStatus): boolean {
  return RESTRICTED_CONTACT_STATUSES.includes(status);
}

export function isContactVerified(status: UserContactStatus): boolean {
  return status === USER_CONTACT_STATUS.VERIFIED;
}

export function isContactPending(status: UserContactStatus): boolean {
  return status === USER_CONTACT_STATUS.PENDING;
}

export function canUseContact(status: UserContactStatus): boolean {
  return (
    status === USER_CONTACT_STATUS.ACTIVE ||
    status === USER_CONTACT_STATUS.VERIFIED ||
    status === USER_CONTACT_STATUS.PENDING
  );
}

export function getContactStatusLabel(status: UserContactStatus): string {
  return USER_CONTACT_STATUS_LABELS[status] || 'Unknown';
}

export function getContactStatusColor(status: UserContactStatus): string {
  return USER_CONTACT_STATUS_COLORS[status] || 'secondary';
}
