/**
 * Support SLA Status Constants
 * Status definitions for Service Level Agreements
 */

export const SUPPORT_SLA_STATUS = {
  // Status Types
  TYPES: {
    ACTIVE: 'active',
    PAUSED: 'paused',
    EXPIRED: 'expired',
    VIOLATED: 'violated',
    MET: 'met',
    PARTIALLY_MET: 'partially_met',
  } as const,

  // Status Categories
  CATEGORIES: {
    ACTIVE: 'active',
    PAUSED: 'paused',
    COMPLETED: 'completed',
    VIOLATED: 'violated',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    ACTIVE: '#green-500',
    PAUSED: '#yellow-500',
    EXPIRED: '#gray-500',
    VIOLATED: '#red-500',
    MET: '#green-600',
    PARTIALLY_MET: '#orange-500',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    ACTIVE: '✅',
    PAUSED: '⏸️',
    EXPIRED: '⌛',
    VIOLATED: '❌',
    MET: '🎯',
    PARTIALLY_MET: '⚠️',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    ACTIVE_TO_PAUSED: 'active_to_paused',
    PAUSED_TO_ACTIVE: 'paused_to_active',
    ACTIVE_TO_VIOLATED: 'active_to_violated',
    ACTIVE_TO_MET: 'active_to_met',
    ACTIVE_TO_PARTIALLY_MET: 'active_to_partially_met',
    VIOLATED_TO_ACTIVE: 'violated_to_active',
    MET_TO_EXPIRED: 'met_to_expired',
    PARTIALLY_MET_TO_EXPIRED: 'partially_met_to_expired',
    ANY_TO_EXPIRED: 'any_to_expired',
  } as const,
} as const;

// Status Types
export type SupportSLAStatusType =
  (typeof SUPPORT_SLA_STATUS.TYPES)[keyof typeof SUPPORT_SLA_STATUS.TYPES];

// Status Categories
export type SupportSLAStatusCategory =
  (typeof SUPPORT_SLA_STATUS.CATEGORIES)[keyof typeof SUPPORT_SLA_STATUS.CATEGORIES];

// Status Colors
export type SupportSLAStatusColor =
  (typeof SUPPORT_SLA_STATUS.COLORS)[keyof typeof SUPPORT_SLA_STATUS.COLORS];

// Status Icons
export type SupportSLAStatusIcon =
  (typeof SUPPORT_SLA_STATUS.ICONS)[keyof typeof SUPPORT_SLA_STATUS.ICONS];

// Status Transitions
export type SupportSLAStatusTransition =
  (typeof SUPPORT_SLA_STATUS.TRANSITIONS)[keyof typeof SUPPORT_SLA_STATUS.TRANSITIONS];

// Utility Functions
export function supportSLAStatusGetLabel(status: SupportSLAStatusType): string {
  const labels: Record<SupportSLAStatusType, string> = {
    [SUPPORT_SLA_STATUS.TYPES.ACTIVE]: 'Active',
    [SUPPORT_SLA_STATUS.TYPES.PAUSED]: 'Paused',
    [SUPPORT_SLA_STATUS.TYPES.EXPIRED]: 'Expired',
    [SUPPORT_SLA_STATUS.TYPES.VIOLATED]: 'Violated',
    [SUPPORT_SLA_STATUS.TYPES.MET]: 'Met',
    [SUPPORT_SLA_STATUS.TYPES.PARTIALLY_MET]: 'Partially Met',
  };
  return labels[status] || 'Unknown';
}

export function supportSLAStatusIsActive(status: SupportSLAStatusType): boolean {
  return status === SUPPORT_SLA_STATUS.TYPES.ACTIVE;
}

export function supportSLAStatusIsViolated(status: SupportSLAStatusType): boolean {
  return status === SUPPORT_SLA_STATUS.TYPES.VIOLATED;
}

export function supportSLAStatusIsCompleted(status: SupportSLAStatusType): boolean {
  return status === SUPPORT_SLA_STATUS.TYPES.MET || status === SUPPORT_SLA_STATUS.TYPES.EXPIRED;
}

export function supportSLAStatusGetCategory(
  status: SupportSLAStatusType
): SupportSLAStatusCategory {
  const categories: Record<SupportSLAStatusType, SupportSLAStatusCategory> = {
    [SUPPORT_SLA_STATUS.TYPES.ACTIVE]: SUPPORT_SLA_STATUS.CATEGORIES.ACTIVE,
    [SUPPORT_SLA_STATUS.TYPES.PAUSED]: SUPPORT_SLA_STATUS.CATEGORIES.PAUSED,
    [SUPPORT_SLA_STATUS.TYPES.EXPIRED]: SUPPORT_SLA_STATUS.CATEGORIES.COMPLETED,
    [SUPPORT_SLA_STATUS.TYPES.VIOLATED]: SUPPORT_SLA_STATUS.CATEGORIES.VIOLATED,
    [SUPPORT_SLA_STATUS.TYPES.MET]: SUPPORT_SLA_STATUS.CATEGORIES.COMPLETED,
    [SUPPORT_SLA_STATUS.TYPES.PARTIALLY_MET]: SUPPORT_SLA_STATUS.CATEGORIES.COMPLETED,
  };
  return categories[status] || SUPPORT_SLA_STATUS.CATEGORIES.ACTIVE;
}

export function supportSLAStatusCanTransition(
  status: SupportSLAStatusType,
  transition: SupportSLAStatusTransition
): boolean {
  const allowedTransitions: Record<SupportSLAStatusType, SupportSLAStatusTransition[]> = {
    [SUPPORT_SLA_STATUS.TYPES.ACTIVE]: [
      SUPPORT_SLA_STATUS.TRANSITIONS.ACTIVE_TO_PAUSED,
      SUPPORT_SLA_STATUS.TRANSITIONS.ACTIVE_TO_VIOLATED,
      SUPPORT_SLA_STATUS.TRANSITIONS.ACTIVE_TO_MET,
      SUPPORT_SLA_STATUS.TRANSITIONS.ACTIVE_TO_PARTIALLY_MET,
    ],
    [SUPPORT_SLA_STATUS.TYPES.PAUSED]: [SUPPORT_SLA_STATUS.TRANSITIONS.PAUSED_TO_ACTIVE],
    [SUPPORT_SLA_STATUS.TYPES.VIOLATED]: [
      SUPPORT_SLA_STATUS.TRANSITIONS.VIOLATED_TO_ACTIVE,
      SUPPORT_SLA_STATUS.TRANSITIONS.ANY_TO_EXPIRED,
    ],
    [SUPPORT_SLA_STATUS.TYPES.MET]: [SUPPORT_SLA_STATUS.TRANSITIONS.MET_TO_EXPIRED],
    [SUPPORT_SLA_STATUS.TYPES.PARTIALLY_MET]: [
      SUPPORT_SLA_STATUS.TRANSITIONS.PARTIALLY_MET_TO_EXPIRED,
    ],
    [SUPPORT_SLA_STATUS.TYPES.EXPIRED]: [],
  };
  return allowedTransitions[status]?.includes(transition) || false;
}
