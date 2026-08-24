/**
 * Vendor Team Status Constants
 * Status definitions for vendor teams
 */

export const VENDOR_TEAM_STATUS = {
  // Status Types
  TYPES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PAUSED: 'paused',
    ARCHIVED: 'archived',
  } as const,

  // Status Categories
  CATEGORIES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    ARCHIVED: 'archived',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    ACTIVE: '#green-500',
    INACTIVE: '#gray-500',
    PAUSED: '#yellow-500',
    ARCHIVED: '#gray-600',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    ACTIVE: '✅',
    INACTIVE: '⛔',
    PAUSED: '⏸️',
    ARCHIVED: '📦',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    ACTIVE_TO_INACTIVE: 'active_to_inactive',
    ACTIVE_TO_PAUSED: 'active_to_paused',
    ACTIVE_TO_ARCHIVED: 'active_to_archived',
    INACTIVE_TO_ACTIVE: 'inactive_to_active',
    INACTIVE_TO_ARCHIVED: 'inactive_to_archived',
    PAUSED_TO_ACTIVE: 'paused_to_active',
    PAUSED_TO_INACTIVE: 'paused_to_inactive',
    PAUSED_TO_ARCHIVED: 'paused_to_archived',
    ARCHIVED_TO_ACTIVE: 'archived_to_active',
  } as const,
} as const;

// Status Types
export type VendorTeamStatusType =
  (typeof VENDOR_TEAM_STATUS.TYPES)[keyof typeof VENDOR_TEAM_STATUS.TYPES];

// Status Categories
export type VendorTeamStatusCategory =
  (typeof VENDOR_TEAM_STATUS.CATEGORIES)[keyof typeof VENDOR_TEAM_STATUS.CATEGORIES];

// Status Colors
export type VendorTeamStatusColor =
  (typeof VENDOR_TEAM_STATUS.COLORS)[keyof typeof VENDOR_TEAM_STATUS.COLORS];

// Status Icons
export type VendorTeamStatusIcon =
  (typeof VENDOR_TEAM_STATUS.ICONS)[keyof typeof VENDOR_TEAM_STATUS.ICONS];

// Status Transitions
export type VendorTeamStatusTransition =
  (typeof VENDOR_TEAM_STATUS.TRANSITIONS)[keyof typeof VENDOR_TEAM_STATUS.TRANSITIONS];

// Utility Functions
export function vendorTeamStatusGetLabel(status: VendorTeamStatusType): string {
  const labels: Record<VendorTeamStatusType, string> = {
    [VENDOR_TEAM_STATUS.TYPES.ACTIVE]: 'Active',
    [VENDOR_TEAM_STATUS.TYPES.INACTIVE]: 'Inactive',
    [VENDOR_TEAM_STATUS.TYPES.PAUSED]: 'Paused',
    [VENDOR_TEAM_STATUS.TYPES.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown';
}

export function vendorTeamStatusIsActive(status: VendorTeamStatusType): boolean {
  return status === VENDOR_TEAM_STATUS.TYPES.ACTIVE;
}

export function vendorTeamStatusIsInactive(status: VendorTeamStatusType): boolean {
  return status === VENDOR_TEAM_STATUS.TYPES.INACTIVE || status === VENDOR_TEAM_STATUS.TYPES.PAUSED;
}

export function vendorTeamStatusIsArchived(status: VendorTeamStatusType): boolean {
  return status === VENDOR_TEAM_STATUS.TYPES.ARCHIVED;
}

export function vendorTeamStatusGetCategory(
  status: VendorTeamStatusType
): VendorTeamStatusCategory {
  const categories: Record<VendorTeamStatusType, VendorTeamStatusCategory> = {
    [VENDOR_TEAM_STATUS.TYPES.ACTIVE]: VENDOR_TEAM_STATUS.CATEGORIES.ACTIVE,
    [VENDOR_TEAM_STATUS.TYPES.INACTIVE]: VENDOR_TEAM_STATUS.CATEGORIES.INACTIVE,
    [VENDOR_TEAM_STATUS.TYPES.PAUSED]: VENDOR_TEAM_STATUS.CATEGORIES.INACTIVE,
    [VENDOR_TEAM_STATUS.TYPES.ARCHIVED]: VENDOR_TEAM_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || VENDOR_TEAM_STATUS.CATEGORIES.INACTIVE;
}

export function vendorTeamStatusCanTransition(
  status: VendorTeamStatusType,
  transition: VendorTeamStatusTransition
): boolean {
  const allowedTransitions: Record<VendorTeamStatusType, VendorTeamStatusTransition[]> = {
    [VENDOR_TEAM_STATUS.TYPES.ACTIVE]: [
      VENDOR_TEAM_STATUS.TRANSITIONS.ACTIVE_TO_INACTIVE,
      VENDOR_TEAM_STATUS.TRANSITIONS.ACTIVE_TO_PAUSED,
      VENDOR_TEAM_STATUS.TRANSITIONS.ACTIVE_TO_ARCHIVED,
    ],
    [VENDOR_TEAM_STATUS.TYPES.INACTIVE]: [
      VENDOR_TEAM_STATUS.TRANSITIONS.INACTIVE_TO_ACTIVE,
      VENDOR_TEAM_STATUS.TRANSITIONS.INACTIVE_TO_ARCHIVED,
    ],
    [VENDOR_TEAM_STATUS.TYPES.PAUSED]: [
      VENDOR_TEAM_STATUS.TRANSITIONS.PAUSED_TO_ACTIVE,
      VENDOR_TEAM_STATUS.TRANSITIONS.PAUSED_TO_INACTIVE,
      VENDOR_TEAM_STATUS.TRANSITIONS.PAUSED_TO_ARCHIVED,
    ],
    [VENDOR_TEAM_STATUS.TYPES.ARCHIVED]: [VENDOR_TEAM_STATUS.TRANSITIONS.ARCHIVED_TO_ACTIVE],
  };
  return allowedTransitions[status]?.includes(transition) || false;
}
