/**
 * Insurance Status Constants
 * Status definitions for insurance
 */

export const LOGISTICS_INSURANCE_STATUS = {
  // Status Types
  TYPES: {
    PENDING: 'pending',
    ACTIVE: 'active',
    EXPIRED: 'expired',
    CLAIMED: 'claimed',
    CANCELLED: 'cancelled',
    UNDER_REVIEW: 'under_review',
  } as const,

  // Status Categories
  CATEGORIES: {
    PENDING: 'pending',
    ACTIVE: 'active',
    COMPLETED: 'completed',
    FAILED: 'failed',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    PENDING: '#yellow-500',
    ACTIVE: '#green-500',
    EXPIRED: '#gray-500',
    CLAIMED: '#purple-500',
    CANCELLED: '#red-500',
    UNDER_REVIEW: '#orange-500',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    PENDING: '⏳',
    ACTIVE: '✅',
    EXPIRED: '⌛',
    CLAIMED: '💰',
    CANCELLED: '🚫',
    UNDER_REVIEW: '🔍',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    PENDING_TO_ACTIVE: 'pending_to_active',
    PENDING_TO_UNDER_REVIEW: 'pending_to_under_review',
    PENDING_TO_CANCELLED: 'pending_to_cancelled',
    UNDER_REVIEW_TO_ACTIVE: 'under_review_to_active',
    UNDER_REVIEW_TO_CANCELLED: 'under_review_to_cancelled',
    ACTIVE_TO_EXPIRED: 'active_to_expired',
    ACTIVE_TO_CLAIMED: 'active_to_claimed',
    ACTIVE_TO_CANCELLED: 'active_to_cancelled',
    EXPIRED_TO_CANCELLED: 'expired_to_cancelled',
    CLAIMED_TO_EXPIRED: 'claimed_to_expired',
  } as const,
} as const;

// Status Types
export type LogisticsInsuranceStatusType =
  (typeof LOGISTICS_INSURANCE_STATUS.TYPES)[keyof typeof LOGISTICS_INSURANCE_STATUS.TYPES];

// Status Categories
export type LogisticsInsuranceStatusCategory =
  (typeof LOGISTICS_INSURANCE_STATUS.CATEGORIES)[keyof typeof LOGISTICS_INSURANCE_STATUS.CATEGORIES];

// Status Colors
export type LogisticsInsuranceStatusColor =
  (typeof LOGISTICS_INSURANCE_STATUS.COLORS)[keyof typeof LOGISTICS_INSURANCE_STATUS.COLORS];

// Status Icons
export type LogisticsInsuranceStatusIcon =
  (typeof LOGISTICS_INSURANCE_STATUS.ICONS)[keyof typeof LOGISTICS_INSURANCE_STATUS.ICONS];

// Status Transitions
export type LogisticsInsuranceStatusTransition =
  (typeof LOGISTICS_INSURANCE_STATUS.TRANSITIONS)[keyof typeof LOGISTICS_INSURANCE_STATUS.TRANSITIONS];

// Utility Functions
export function logisticsInsuranceStatusGetLabel(status: LogisticsInsuranceStatusType): string {
  const labels: Record<LogisticsInsuranceStatusType, string> = {
    [LOGISTICS_INSURANCE_STATUS.TYPES.PENDING]: 'Pending',
    [LOGISTICS_INSURANCE_STATUS.TYPES.ACTIVE]: 'Active',
    [LOGISTICS_INSURANCE_STATUS.TYPES.EXPIRED]: 'Expired',
    [LOGISTICS_INSURANCE_STATUS.TYPES.CLAIMED]: 'Claimed',
    [LOGISTICS_INSURANCE_STATUS.TYPES.CANCELLED]: 'Cancelled',
    [LOGISTICS_INSURANCE_STATUS.TYPES.UNDER_REVIEW]: 'Under Review',
  };
  return labels[status] || 'Unknown';
}

export function logisticsInsuranceStatusGetCategory(
  status: LogisticsInsuranceStatusType
): LogisticsInsuranceStatusCategory {
  const categories: Record<LogisticsInsuranceStatusType, LogisticsInsuranceStatusCategory> = {
    [LOGISTICS_INSURANCE_STATUS.TYPES.PENDING]: LOGISTICS_INSURANCE_STATUS.CATEGORIES.PENDING,
    [LOGISTICS_INSURANCE_STATUS.TYPES.UNDER_REVIEW]: LOGISTICS_INSURANCE_STATUS.CATEGORIES.PENDING,
    [LOGISTICS_INSURANCE_STATUS.TYPES.ACTIVE]: LOGISTICS_INSURANCE_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_INSURANCE_STATUS.TYPES.EXPIRED]: LOGISTICS_INSURANCE_STATUS.CATEGORIES.COMPLETED,
    [LOGISTICS_INSURANCE_STATUS.TYPES.CLAIMED]: LOGISTICS_INSURANCE_STATUS.CATEGORIES.COMPLETED,
    [LOGISTICS_INSURANCE_STATUS.TYPES.CANCELLED]: LOGISTICS_INSURANCE_STATUS.CATEGORIES.FAILED,
  };
  return categories[status] || LOGISTICS_INSURANCE_STATUS.CATEGORIES.PENDING;
}

export function logisticsInsuranceStatusIsActive(status: LogisticsInsuranceStatusType): boolean {
  return status === LOGISTICS_INSURANCE_STATUS.TYPES.ACTIVE;
}

export function logisticsInsuranceStatusIsActiveOrPending(
  status: LogisticsInsuranceStatusType
): boolean {
  const activeStatuses: LogisticsInsuranceStatusType[] = [
    LOGISTICS_INSURANCE_STATUS.TYPES.ACTIVE,
    LOGISTICS_INSURANCE_STATUS.TYPES.PENDING,
    LOGISTICS_INSURANCE_STATUS.TYPES.UNDER_REVIEW,
  ];
  return activeStatuses.includes(status);
}

export function logisticsInsuranceStatusCanTransition(
  status: LogisticsInsuranceStatusType,
  transition: LogisticsInsuranceStatusTransition
): boolean {
  const allowedTransitions: Record<
    LogisticsInsuranceStatusType,
    LogisticsInsuranceStatusTransition[]
  > = {
    [LOGISTICS_INSURANCE_STATUS.TYPES.PENDING]: [
      LOGISTICS_INSURANCE_STATUS.TRANSITIONS.PENDING_TO_ACTIVE,
      LOGISTICS_INSURANCE_STATUS.TRANSITIONS.PENDING_TO_UNDER_REVIEW,
      LOGISTICS_INSURANCE_STATUS.TRANSITIONS.PENDING_TO_CANCELLED,
    ],
    [LOGISTICS_INSURANCE_STATUS.TYPES.UNDER_REVIEW]: [
      LOGISTICS_INSURANCE_STATUS.TRANSITIONS.UNDER_REVIEW_TO_ACTIVE,
      LOGISTICS_INSURANCE_STATUS.TRANSITIONS.UNDER_REVIEW_TO_CANCELLED,
    ],
    [LOGISTICS_INSURANCE_STATUS.TYPES.ACTIVE]: [
      LOGISTICS_INSURANCE_STATUS.TRANSITIONS.ACTIVE_TO_EXPIRED,
      LOGISTICS_INSURANCE_STATUS.TRANSITIONS.ACTIVE_TO_CLAIMED,
      LOGISTICS_INSURANCE_STATUS.TRANSITIONS.ACTIVE_TO_CANCELLED,
    ],
    [LOGISTICS_INSURANCE_STATUS.TYPES.EXPIRED]: [
      LOGISTICS_INSURANCE_STATUS.TRANSITIONS.EXPIRED_TO_CANCELLED,
    ],
    [LOGISTICS_INSURANCE_STATUS.TYPES.CLAIMED]: [
      LOGISTICS_INSURANCE_STATUS.TRANSITIONS.CLAIMED_TO_EXPIRED,
    ],
    [LOGISTICS_INSURANCE_STATUS.TYPES.CANCELLED]: [],
  };
  return allowedTransitions[status]?.includes(transition) || false;
}
