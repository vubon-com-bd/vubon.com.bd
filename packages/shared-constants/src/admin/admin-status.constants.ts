/**
 * Admin Status Constants
 * @module shared-constants/admin/admin-status
 *
 * Note: Deliberately does NOT spread COMMON_STATUS — nested objects
 * (ORDER, PAYMENT, ...) would leak into Object.values().
 * Team statuses are exported separately to keep this enum flat.
 */

export const ADMIN_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  BLOCKED: 'blocked',
  SUSPENDED: 'suspended',
  ON_LEAVE: 'on_leave',
  TERMINATED: 'terminated',
} as const;

export type AdminStatusValue = (typeof ADMIN_STATUS)[keyof typeof ADMIN_STATUS];

/**
 * Admin Team statuses (separate, flat enum).
 */
export const ADMIN_TEAM_STATUS = {
  FORMING: 'forming',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DISBANDED: 'disbanded',
  ARCHIVED: 'archived',
} as const;

export type AdminTeamStatus = (typeof ADMIN_TEAM_STATUS)[keyof typeof ADMIN_TEAM_STATUS];
