/**
 * Vendor Subscription Status Constants
 * Status definitions for vendor subscriptions
 */

export const VENDOR_SUBSCRIPTION_STATUS = {
  // Status Types
  TYPES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
    SUSPENDED: 'suspended',
    TRIAL: 'trial',
  } as const,

  // Status Categories
  CATEGORIES: {
    ACTIVE: 'active',
    PENDING: 'pending',
    INACTIVE: 'inactive',
    TERMINATED: 'terminated',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    ACTIVE: '#green-500',
    INACTIVE: '#gray-500',
    PENDING: '#yellow-500',
    EXPIRED: '#red-500',
    CANCELLED: '#gray-600',
    SUSPENDED: '#orange-500',
    TRIAL: '#blue-500',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    ACTIVE: '✅',
    INACTIVE: '⛔',
    PENDING: '⏳',
    EXPIRED: '⌛',
    CANCELLED: '🚫',
    SUSPENDED: '⚠️',
    TRIAL: '🎯',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    PENDING_TO_ACTIVE: 'pending_to_active',
    PENDING_TO_TRIAL: 'pending_to_trial',
    PENDING_TO_CANCELLED: 'pending_to_cancelled',
    TRIAL_TO_ACTIVE: 'trial_to_active',
    TRIAL_TO_CANCELLED: 'trial_to_cancelled',
    TRIAL_TO_EXPIRED: 'trial_to_expired',
    ACTIVE_TO_INACTIVE: 'active_to_inactive',
    ACTIVE_TO_SUSPENDED: 'active_to_suspended',
    ACTIVE_TO_CANCELLED: 'active_to_cancelled',
    ACTIVE_TO_EXPIRED: 'active_to_expired',
    INACTIVE_TO_ACTIVE: 'inactive_to_active',
    SUSPENDED_TO_ACTIVE: 'suspended_to_active',
    SUSPENDED_TO_CANCELLED: 'suspended_to_cancelled',
    EXPIRED_TO_ACTIVE: 'expired_to_active',
    CANCELLED_TO_ACTIVE: 'cancelled_to_active',
  } as const,
} as const;

// Status Types
export type VendorSubscriptionStatusType =
  (typeof VENDOR_SUBSCRIPTION_STATUS.TYPES)[keyof typeof VENDOR_SUBSCRIPTION_STATUS.TYPES];

// Status Categories
export type VendorSubscriptionStatusCategory =
  (typeof VENDOR_SUBSCRIPTION_STATUS.CATEGORIES)[keyof typeof VENDOR_SUBSCRIPTION_STATUS.CATEGORIES];

// Status Colors
export type VendorSubscriptionStatusColor =
  (typeof VENDOR_SUBSCRIPTION_STATUS.COLORS)[keyof typeof VENDOR_SUBSCRIPTION_STATUS.COLORS];

// Status Icons
export type VendorSubscriptionStatusIcon =
  (typeof VENDOR_SUBSCRIPTION_STATUS.ICONS)[keyof typeof VENDOR_SUBSCRIPTION_STATUS.ICONS];

// Status Transitions
export type VendorSubscriptionStatusTransition =
  (typeof VENDOR_SUBSCRIPTION_STATUS.TRANSITIONS)[keyof typeof VENDOR_SUBSCRIPTION_STATUS.TRANSITIONS];

// Utility Functions
export function vendorSubscriptionStatusGetLabel(status: VendorSubscriptionStatusType): string {
  const labels: Record<VendorSubscriptionStatusType, string> = {
    [VENDOR_SUBSCRIPTION_STATUS.TYPES.ACTIVE]: 'Active',
    [VENDOR_SUBSCRIPTION_STATUS.TYPES.INACTIVE]: 'Inactive',
    [VENDOR_SUBSCRIPTION_STATUS.TYPES.PENDING]: 'Pending',
    [VENDOR_SUBSCRIPTION_STATUS.TYPES.EXPIRED]: 'Expired',
    [VENDOR_SUBSCRIPTION_STATUS.TYPES.CANCELLED]: 'Cancelled',
    [VENDOR_SUBSCRIPTION_STATUS.TYPES.SUSPENDED]: 'Suspended',
    [VENDOR_SUBSCRIPTION_STATUS.TYPES.TRIAL]: 'Trial',
  };
  return labels[status] || 'Unknown';
}

export function vendorSubscriptionStatusIsActive(status: VendorSubscriptionStatusType): boolean {
  return (
    status === VENDOR_SUBSCRIPTION_STATUS.TYPES.ACTIVE ||
    status === VENDOR_SUBSCRIPTION_STATUS.TYPES.TRIAL
  );
}

export function vendorSubscriptionStatusIsPending(status: VendorSubscriptionStatusType): boolean {
  return status === VENDOR_SUBSCRIPTION_STATUS.TYPES.PENDING;
}

export function vendorSubscriptionStatusIsTerminated(
  status: VendorSubscriptionStatusType
): boolean {
  const terminatedStatuses: VendorSubscriptionStatusType[] = [
    VENDOR_SUBSCRIPTION_STATUS.TYPES.CANCELLED,
    VENDOR_SUBSCRIPTION_STATUS.TYPES.EXPIRED,
  ];
  return terminatedStatuses.includes(status);
}

export function vendorSubscriptionStatusGetCategory(
  status: VendorSubscriptionStatusType
): VendorSubscriptionStatusCategory {
  const categories: Record<VendorSubscriptionStatusType, VendorSubscriptionStatusCategory> = {
    [VENDOR_SUBSCRIPTION_STATUS.TYPES.ACTIVE]: VENDOR_SUBSCRIPTION_STATUS.CATEGORIES.ACTIVE,
    [VENDOR_SUBSCRIPTION_STATUS.TYPES.INACTIVE]: VENDOR_SUBSCRIPTION_STATUS.CATEGORIES.INACTIVE,
    [VENDOR_SUBSCRIPTION_STATUS.TYPES.PENDING]: VENDOR_SUBSCRIPTION_STATUS.CATEGORIES.PENDING,
    [VENDOR_SUBSCRIPTION_STATUS.TYPES.EXPIRED]: VENDOR_SUBSCRIPTION_STATUS.CATEGORIES.TERMINATED,
    [VENDOR_SUBSCRIPTION_STATUS.TYPES.CANCELLED]: VENDOR_SUBSCRIPTION_STATUS.CATEGORIES.TERMINATED,
    [VENDOR_SUBSCRIPTION_STATUS.TYPES.SUSPENDED]: VENDOR_SUBSCRIPTION_STATUS.CATEGORIES.INACTIVE,
    [VENDOR_SUBSCRIPTION_STATUS.TYPES.TRIAL]: VENDOR_SUBSCRIPTION_STATUS.CATEGORIES.ACTIVE,
  };
  return categories[status] || VENDOR_SUBSCRIPTION_STATUS.CATEGORIES.PENDING;
}

export function vendorSubscriptionStatusCanTransition(
  status: VendorSubscriptionStatusType,
  transition: VendorSubscriptionStatusTransition
): boolean {
  const allowedTransitions: Record<
    VendorSubscriptionStatusType,
    VendorSubscriptionStatusTransition[]
  > = {
    [VENDOR_SUBSCRIPTION_STATUS.TYPES.PENDING]: [
      VENDOR_SUBSCRIPTION_STATUS.TRANSITIONS.PENDING_TO_ACTIVE,
      VENDOR_SUBSCRIPTION_STATUS.TRANSITIONS.PENDING_TO_TRIAL,
      VENDOR_SUBSCRIPTION_STATUS.TRANSITIONS.PENDING_TO_CANCELLED,
    ],
    [VENDOR_SUBSCRIPTION_STATUS.TYPES.TRIAL]: [
      VENDOR_SUBSCRIPTION_STATUS.TRANSITIONS.TRIAL_TO_ACTIVE,
      VENDOR_SUBSCRIPTION_STATUS.TRANSITIONS.TRIAL_TO_CANCELLED,
      VENDOR_SUBSCRIPTION_STATUS.TRANSITIONS.TRIAL_TO_EXPIRED,
    ],
    [VENDOR_SUBSCRIPTION_STATUS.TYPES.ACTIVE]: [
      VENDOR_SUBSCRIPTION_STATUS.TRANSITIONS.ACTIVE_TO_INACTIVE,
      VENDOR_SUBSCRIPTION_STATUS.TRANSITIONS.ACTIVE_TO_SUSPENDED,
      VENDOR_SUBSCRIPTION_STATUS.TRANSITIONS.ACTIVE_TO_CANCELLED,
      VENDOR_SUBSCRIPTION_STATUS.TRANSITIONS.ACTIVE_TO_EXPIRED,
    ],
    [VENDOR_SUBSCRIPTION_STATUS.TYPES.INACTIVE]: [
      VENDOR_SUBSCRIPTION_STATUS.TRANSITIONS.INACTIVE_TO_ACTIVE,
    ],
    [VENDOR_SUBSCRIPTION_STATUS.TYPES.SUSPENDED]: [
      VENDOR_SUBSCRIPTION_STATUS.TRANSITIONS.SUSPENDED_TO_ACTIVE,
      VENDOR_SUBSCRIPTION_STATUS.TRANSITIONS.SUSPENDED_TO_CANCELLED,
    ],
    [VENDOR_SUBSCRIPTION_STATUS.TYPES.EXPIRED]: [
      VENDOR_SUBSCRIPTION_STATUS.TRANSITIONS.EXPIRED_TO_ACTIVE,
    ],
    [VENDOR_SUBSCRIPTION_STATUS.TYPES.CANCELLED]: [
      VENDOR_SUBSCRIPTION_STATUS.TRANSITIONS.CANCELLED_TO_ACTIVE,
    ],
  };
  return allowedTransitions[status]?.includes(transition) || false;
}
