/**
 * User Preferences Status Constants
 * Defines all possible user preferences statuses
 */

export const USER_PREFERENCES_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  SUSPENDED: 'suspended',
  ARCHIVED: 'archived',
} as const;

export type UserPreferencesStatus =
  (typeof USER_PREFERENCES_STATUS)[keyof typeof USER_PREFERENCES_STATUS];

export const USER_PREFERENCES_STATUS_LABELS: Record<UserPreferencesStatus, string> = {
  [USER_PREFERENCES_STATUS.ACTIVE]: 'Active',
  [USER_PREFERENCES_STATUS.INACTIVE]: 'Inactive',
  [USER_PREFERENCES_STATUS.PENDING]: 'Pending',
  [USER_PREFERENCES_STATUS.SUSPENDED]: 'Suspended',
  [USER_PREFERENCES_STATUS.ARCHIVED]: 'Archived',
};

export const USER_PREFERENCES_STATUS_COLORS: Record<UserPreferencesStatus, string> = {
  [USER_PREFERENCES_STATUS.ACTIVE]: 'success',
  [USER_PREFERENCES_STATUS.INACTIVE]: 'secondary',
  [USER_PREFERENCES_STATUS.PENDING]: 'warning',
  [USER_PREFERENCES_STATUS.SUSPENDED]: 'danger',
  [USER_PREFERENCES_STATUS.ARCHIVED]: 'dark',
};

export const ACTIVE_PREFERENCES_STATUSES: UserPreferencesStatus[] = [
  USER_PREFERENCES_STATUS.ACTIVE,
];

export const INACTIVE_PREFERENCES_STATUSES: UserPreferencesStatus[] = [
  USER_PREFERENCES_STATUS.INACTIVE,
  USER_PREFERENCES_STATUS.SUSPENDED,
  USER_PREFERENCES_STATUS.ARCHIVED,
];

export const RESTRICTED_PREFERENCES_STATUSES: UserPreferencesStatus[] = [
  USER_PREFERENCES_STATUS.SUSPENDED,
  USER_PREFERENCES_STATUS.ARCHIVED,
];

export function isPreferencesActive(status: UserPreferencesStatus): boolean {
  return status === USER_PREFERENCES_STATUS.ACTIVE;
}

export function isPreferencesRestricted(status: UserPreferencesStatus): boolean {
  return RESTRICTED_PREFERENCES_STATUSES.includes(status);
}

export function canModifyPreferences(status: UserPreferencesStatus): boolean {
  return status === USER_PREFERENCES_STATUS.ACTIVE || status === USER_PREFERENCES_STATUS.PENDING;
}

export function getPreferencesStatusLabel(status: UserPreferencesStatus): string {
  return USER_PREFERENCES_STATUS_LABELS[status] || 'Unknown';
}

export function getPreferencesStatusColor(status: UserPreferencesStatus): string {
  return USER_PREFERENCES_STATUS_COLORS[status] || 'secondary';
}
