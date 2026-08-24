/**
 * Vendor Status Constants
 * Status definitions for vendors
 */

export const VENDOR_STATUS = {
  // Status Types
  TYPES: {
    PENDING: 'pending',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
    BANNED: 'banned',
    CLOSED: 'closed',
  } as const,

  // Status Categories
  CATEGORIES: {
    PENDING: 'pending',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    RESTRICTED: 'restricted',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    PENDING: '#yellow-500',
    ACTIVE: '#green-500',
    INACTIVE: '#gray-500',
    SUSPENDED: '#orange-500',
    BANNED: '#red-600',
    CLOSED: '#gray-600',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    PENDING: '⏳',
    ACTIVE: '✅',
    INACTIVE: '⛔',
    SUSPENDED: '⚠️',
    BANNED: '🚫',
    CLOSED: '🔒',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    PENDING_TO_ACTIVE: 'pending_to_active',
    PENDING_TO_SUSPENDED: 'pending_to_suspended',
    PENDING_TO_BANNED: 'pending_to_banned',
    ACTIVE_TO_INACTIVE: 'active_to_inactive',
    ACTIVE_TO_SUSPENDED: 'active_to_suspended',
    ACTIVE_TO_BANNED: 'active_to_banned',
    INACTIVE_TO_ACTIVE: 'inactive_to_active',
    SUSPENDED_TO_ACTIVE: 'suspended_to_active',
    SUSPENDED_TO_INACTIVE: 'suspended_to_inactive',
    SUSPENDED_TO_BANNED: 'suspended_to_banned',
    ANY_TO_CLOSED: 'any_to_closed',
  } as const,
} as const;

// Status Types
export type VendorStatusType = (typeof VENDOR_STATUS.TYPES)[keyof typeof VENDOR_STATUS.TYPES];

// Status Categories
export type VendorStatusCategory =
  (typeof VENDOR_STATUS.CATEGORIES)[keyof typeof VENDOR_STATUS.CATEGORIES];

// Status Colors
export type VendorStatusColor = (typeof VENDOR_STATUS.COLORS)[keyof typeof VENDOR_STATUS.COLORS];

// Status Icons
export type VendorStatusIcon = (typeof VENDOR_STATUS.ICONS)[keyof typeof VENDOR_STATUS.ICONS];

// Status Transitions
export type VendorStatusTransition =
  (typeof VENDOR_STATUS.TRANSITIONS)[keyof typeof VENDOR_STATUS.TRANSITIONS];

// Utility Functions
export function vendorStatusGetLabel(status: VendorStatusType): string {
  const labels: Record<VendorStatusType, string> = {
    [VENDOR_STATUS.TYPES.PENDING]: 'Pending',
    [VENDOR_STATUS.TYPES.ACTIVE]: 'Active',
    [VENDOR_STATUS.TYPES.INACTIVE]: 'Inactive',
    [VENDOR_STATUS.TYPES.SUSPENDED]: 'Suspended',
    [VENDOR_STATUS.TYPES.BANNED]: 'Banned',
    [VENDOR_STATUS.TYPES.CLOSED]: 'Closed',
  };
  return labels[status] || 'Unknown';
}

export function vendorStatusIsActive(status: VendorStatusType): boolean {
  return status === VENDOR_STATUS.TYPES.ACTIVE;
}

export function vendorStatusIsRestricted(status: VendorStatusType): boolean {
  const restrictedStatuses: VendorStatusType[] = [
    VENDOR_STATUS.TYPES.SUSPENDED,
    VENDOR_STATUS.TYPES.BANNED,
  ];
  return restrictedStatuses.includes(status);
}

export function vendorStatusIsActiveOrInactive(status: VendorStatusType): boolean {
  return status === VENDOR_STATUS.TYPES.ACTIVE || status === VENDOR_STATUS.TYPES.INACTIVE;
}

export function vendorStatusGetCategory(status: VendorStatusType): VendorStatusCategory {
  const categories: Record<VendorStatusType, VendorStatusCategory> = {
    [VENDOR_STATUS.TYPES.PENDING]: VENDOR_STATUS.CATEGORIES.PENDING,
    [VENDOR_STATUS.TYPES.ACTIVE]: VENDOR_STATUS.CATEGORIES.ACTIVE,
    [VENDOR_STATUS.TYPES.INACTIVE]: VENDOR_STATUS.CATEGORIES.INACTIVE,
    [VENDOR_STATUS.TYPES.SUSPENDED]: VENDOR_STATUS.CATEGORIES.RESTRICTED,
    [VENDOR_STATUS.TYPES.BANNED]: VENDOR_STATUS.CATEGORIES.RESTRICTED,
    [VENDOR_STATUS.TYPES.CLOSED]: VENDOR_STATUS.CATEGORIES.INACTIVE,
  };
  return categories[status] || VENDOR_STATUS.CATEGORIES.PENDING;
}

export function vendorStatusCanTransition(
  status: VendorStatusType,
  transition: VendorStatusTransition
): boolean {
  const allowedTransitions: Record<VendorStatusType, VendorStatusTransition[]> = {
    [VENDOR_STATUS.TYPES.PENDING]: [
      VENDOR_STATUS.TRANSITIONS.PENDING_TO_ACTIVE,
      VENDOR_STATUS.TRANSITIONS.PENDING_TO_SUSPENDED,
      VENDOR_STATUS.TRANSITIONS.PENDING_TO_BANNED,
    ],
    [VENDOR_STATUS.TYPES.ACTIVE]: [
      VENDOR_STATUS.TRANSITIONS.ACTIVE_TO_INACTIVE,
      VENDOR_STATUS.TRANSITIONS.ACTIVE_TO_SUSPENDED,
      VENDOR_STATUS.TRANSITIONS.ACTIVE_TO_BANNED,
      VENDOR_STATUS.TRANSITIONS.ANY_TO_CLOSED,
    ],
    [VENDOR_STATUS.TYPES.INACTIVE]: [
      VENDOR_STATUS.TRANSITIONS.INACTIVE_TO_ACTIVE,
      VENDOR_STATUS.TRANSITIONS.ANY_TO_CLOSED,
    ],
    [VENDOR_STATUS.TYPES.SUSPENDED]: [
      VENDOR_STATUS.TRANSITIONS.SUSPENDED_TO_ACTIVE,
      VENDOR_STATUS.TRANSITIONS.SUSPENDED_TO_INACTIVE,
      VENDOR_STATUS.TRANSITIONS.SUSPENDED_TO_BANNED,
      VENDOR_STATUS.TRANSITIONS.ANY_TO_CLOSED,
    ],
    [VENDOR_STATUS.TYPES.BANNED]: [VENDOR_STATUS.TRANSITIONS.ANY_TO_CLOSED],
    [VENDOR_STATUS.TYPES.CLOSED]: [],
  };
  return allowedTransitions[status]?.includes(transition) || false;
}
