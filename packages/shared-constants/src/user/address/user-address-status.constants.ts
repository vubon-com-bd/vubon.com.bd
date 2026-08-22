/**
 * User Address Status Constants
 * Defines all possible user address statuses
 */

export const USER_ADDRESS_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  SUSPENDED: 'suspended',
  BLOCKED: 'blocked',
  DELETED: 'deleted',
} as const;

export type UserAddressStatus = (typeof USER_ADDRESS_STATUS)[keyof typeof USER_ADDRESS_STATUS];

export const USER_ADDRESS_STATUS_LABELS: Record<UserAddressStatus, string> = {
  [USER_ADDRESS_STATUS.ACTIVE]: 'Active',
  [USER_ADDRESS_STATUS.INACTIVE]: 'Inactive',
  [USER_ADDRESS_STATUS.PENDING]: 'Pending Verification',
  [USER_ADDRESS_STATUS.SUSPENDED]: 'Suspended',
  [USER_ADDRESS_STATUS.BLOCKED]: 'Blocked',
  [USER_ADDRESS_STATUS.DELETED]: 'Deleted',
};

export const USER_ADDRESS_STATUS_COLORS: Record<UserAddressStatus, string> = {
  [USER_ADDRESS_STATUS.ACTIVE]: 'success',
  [USER_ADDRESS_STATUS.INACTIVE]: 'secondary',
  [USER_ADDRESS_STATUS.PENDING]: 'warning',
  [USER_ADDRESS_STATUS.SUSPENDED]: 'warning',
  [USER_ADDRESS_STATUS.BLOCKED]: 'danger',
  [USER_ADDRESS_STATUS.DELETED]: 'dark',
};

export const ACTIVE_ADDRESS_STATUSES: UserAddressStatus[] = [USER_ADDRESS_STATUS.ACTIVE];

export const INACTIVE_ADDRESS_STATUSES: UserAddressStatus[] = [
  USER_ADDRESS_STATUS.INACTIVE,
  USER_ADDRESS_STATUS.SUSPENDED,
  USER_ADDRESS_STATUS.BLOCKED,
];

export const RESTRICTED_ADDRESS_STATUSES: UserAddressStatus[] = [
  USER_ADDRESS_STATUS.SUSPENDED,
  USER_ADDRESS_STATUS.BLOCKED,
  USER_ADDRESS_STATUS.DELETED,
];

export const VERIFICATION_REQUIRED_ADDRESS_STATUSES: UserAddressStatus[] = [
  USER_ADDRESS_STATUS.PENDING,
];

export function isAddressActive(status: UserAddressStatus): boolean {
  return status === USER_ADDRESS_STATUS.ACTIVE;
}

export function isAddressRestricted(status: UserAddressStatus): boolean {
  return RESTRICTED_ADDRESS_STATUSES.includes(status);
}

export function canUseAddress(status: UserAddressStatus): boolean {
  return status === USER_ADDRESS_STATUS.ACTIVE || status === USER_ADDRESS_STATUS.PENDING;
}

export function getAddressStatusLabel(status: UserAddressStatus): string {
  return USER_ADDRESS_STATUS_LABELS[status] || 'Unknown';
}

export function getAddressStatusColor(status: UserAddressStatus): string {
  return USER_ADDRESS_STATUS_COLORS[status] || 'secondary';
}
