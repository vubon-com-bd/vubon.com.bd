/**
 * User Settings Status Constants
 * Defines all possible user settings statuses
 */

export const USER_SETTINGS_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  SUSPENDED: 'suspended',
  ARCHIVED: 'archived',
} as const;

export type UserSettingsStatus = (typeof USER_SETTINGS_STATUS)[keyof typeof USER_SETTINGS_STATUS];

export const USER_SETTINGS_STATUS_LABELS: Record<UserSettingsStatus, string> = {
  [USER_SETTINGS_STATUS.ACTIVE]: 'Active',
  [USER_SETTINGS_STATUS.INACTIVE]: 'Inactive',
  [USER_SETTINGS_STATUS.PENDING]: 'Pending',
  [USER_SETTINGS_STATUS.SUSPENDED]: 'Suspended',
  [USER_SETTINGS_STATUS.ARCHIVED]: 'Archived',
};

export const USER_SETTINGS_STATUS_COLORS: Record<UserSettingsStatus, string> = {
  [USER_SETTINGS_STATUS.ACTIVE]: 'success',
  [USER_SETTINGS_STATUS.INACTIVE]: 'secondary',
  [USER_SETTINGS_STATUS.PENDING]: 'warning',
  [USER_SETTINGS_STATUS.SUSPENDED]: 'danger',
  [USER_SETTINGS_STATUS.ARCHIVED]: 'dark',
};

export const ACTIVE_SETTINGS_STATUSES: UserSettingsStatus[] = [USER_SETTINGS_STATUS.ACTIVE];

export const INACTIVE_SETTINGS_STATUSES: UserSettingsStatus[] = [
  USER_SETTINGS_STATUS.INACTIVE,
  USER_SETTINGS_STATUS.SUSPENDED,
  USER_SETTINGS_STATUS.ARCHIVED,
];

export const RESTRICTED_SETTINGS_STATUSES: UserSettingsStatus[] = [
  USER_SETTINGS_STATUS.SUSPENDED,
  USER_SETTINGS_STATUS.ARCHIVED,
];

export function isSettingsActive(status: UserSettingsStatus): boolean {
  return status === USER_SETTINGS_STATUS.ACTIVE;
}

export function isSettingsRestricted(status: UserSettingsStatus): boolean {
  return RESTRICTED_SETTINGS_STATUSES.includes(status);
}

export function canModifySettings(status: UserSettingsStatus): boolean {
  return status === USER_SETTINGS_STATUS.ACTIVE || status === USER_SETTINGS_STATUS.PENDING;
}

export function getSettingsStatusLabel(status: UserSettingsStatus): string {
  return USER_SETTINGS_STATUS_LABELS[status] || 'Unknown';
}

export function getSettingsStatusColor(status: UserSettingsStatus): string {
  return USER_SETTINGS_STATUS_COLORS[status] || 'secondary';
}
