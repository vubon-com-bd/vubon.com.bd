/**
 * Courier Status Constants
 * Status definitions for courier services
 */

export const LOGISTICS_COURIER_STATUS = {
  // Status Types
  TYPES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
    MAINTENANCE: 'maintenance',
    OFFLINE: 'offline',
  } as const,

  // Status Categories
  CATEGORIES: {
    OPERATIONAL: 'operational',
    UNAVAILABLE: 'unavailable',
    LIMITED: 'limited',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    ACTIVE: '#green-500',
    INACTIVE: '#gray-400',
    SUSPENDED: '#red-500',
    MAINTENANCE: '#orange-500',
    OFFLINE: '#gray-500',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    ACTIVE: '🟢',
    INACTIVE: '⚪',
    SUSPENDED: '🔴',
    MAINTENANCE: '🟠',
    OFFLINE: '⚫',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    ACTIVE_TO_INACTIVE: 'active_to_inactive',
    ACTIVE_TO_MAINTENANCE: 'active_to_maintenance',
    ACTIVE_TO_SUSPENDED: 'active_to_suspended',
    INACTIVE_TO_ACTIVE: 'inactive_to_active',
    MAINTENANCE_TO_ACTIVE: 'maintenance_to_active',
    MAINTENANCE_TO_INACTIVE: 'maintenance_to_inactive',
    SUSPENDED_TO_ACTIVE: 'suspended_to_active',
    SUSPENDED_TO_INACTIVE: 'suspended_to_inactive',
    ANY_TO_OFFLINE: 'any_to_offline',
  } as const,
} as const;

// Status Types
export type LogisticsCourierStatusType =
  (typeof LOGISTICS_COURIER_STATUS.TYPES)[keyof typeof LOGISTICS_COURIER_STATUS.TYPES];

// Status Categories
export type LogisticsCourierStatusCategory =
  (typeof LOGISTICS_COURIER_STATUS.CATEGORIES)[keyof typeof LOGISTICS_COURIER_STATUS.CATEGORIES];

// Status Colors
export type LogisticsCourierStatusColor =
  (typeof LOGISTICS_COURIER_STATUS.COLORS)[keyof typeof LOGISTICS_COURIER_STATUS.COLORS];

// Status Icons
export type LogisticsCourierStatusIcon =
  (typeof LOGISTICS_COURIER_STATUS.ICONS)[keyof typeof LOGISTICS_COURIER_STATUS.ICONS];

// Status Transitions
export type LogisticsCourierStatusTransition =
  (typeof LOGISTICS_COURIER_STATUS.TRANSITIONS)[keyof typeof LOGISTICS_COURIER_STATUS.TRANSITIONS];

// Utility Functions
export function logisticsCourierStatusGetLabel(status: LogisticsCourierStatusType): string {
  const labels: Record<LogisticsCourierStatusType, string> = {
    [LOGISTICS_COURIER_STATUS.TYPES.ACTIVE]: 'Active',
    [LOGISTICS_COURIER_STATUS.TYPES.INACTIVE]: 'Inactive',
    [LOGISTICS_COURIER_STATUS.TYPES.SUSPENDED]: 'Suspended',
    [LOGISTICS_COURIER_STATUS.TYPES.MAINTENANCE]: 'Under Maintenance',
    [LOGISTICS_COURIER_STATUS.TYPES.OFFLINE]: 'Offline',
  };
  return labels[status] || 'Unknown';
}

export function logisticsCourierStatusGetCategory(
  status: LogisticsCourierStatusType
): LogisticsCourierStatusCategory {
  const categories: Record<LogisticsCourierStatusType, LogisticsCourierStatusCategory> = {
    [LOGISTICS_COURIER_STATUS.TYPES.ACTIVE]: LOGISTICS_COURIER_STATUS.CATEGORIES.OPERATIONAL,
    [LOGISTICS_COURIER_STATUS.TYPES.INACTIVE]: LOGISTICS_COURIER_STATUS.CATEGORIES.UNAVAILABLE,
    [LOGISTICS_COURIER_STATUS.TYPES.SUSPENDED]: LOGISTICS_COURIER_STATUS.CATEGORIES.UNAVAILABLE,
    [LOGISTICS_COURIER_STATUS.TYPES.MAINTENANCE]: LOGISTICS_COURIER_STATUS.CATEGORIES.LIMITED,
    [LOGISTICS_COURIER_STATUS.TYPES.OFFLINE]: LOGISTICS_COURIER_STATUS.CATEGORIES.UNAVAILABLE,
  };
  return categories[status] || LOGISTICS_COURIER_STATUS.CATEGORIES.UNAVAILABLE;
}

export function logisticsCourierStatusIsOperational(status: LogisticsCourierStatusType): boolean {
  return status === LOGISTICS_COURIER_STATUS.TYPES.ACTIVE;
}

export function logisticsCourierStatusIsAvailable(status: LogisticsCourierStatusType): boolean {
  const availableStatuses: LogisticsCourierStatusType[] = [
    LOGISTICS_COURIER_STATUS.TYPES.ACTIVE,
    LOGISTICS_COURIER_STATUS.TYPES.MAINTENANCE,
  ];
  return availableStatuses.includes(status);
}

export function logisticsCourierStatusCanTransition(
  status: LogisticsCourierStatusType,
  transition: LogisticsCourierStatusTransition
): boolean {
  const allowedTransitions: Record<LogisticsCourierStatusType, LogisticsCourierStatusTransition[]> =
    {
      [LOGISTICS_COURIER_STATUS.TYPES.ACTIVE]: [
        LOGISTICS_COURIER_STATUS.TRANSITIONS.ACTIVE_TO_INACTIVE,
        LOGISTICS_COURIER_STATUS.TRANSITIONS.ACTIVE_TO_MAINTENANCE,
        LOGISTICS_COURIER_STATUS.TRANSITIONS.ACTIVE_TO_SUSPENDED,
        LOGISTICS_COURIER_STATUS.TRANSITIONS.ANY_TO_OFFLINE,
      ],
      [LOGISTICS_COURIER_STATUS.TYPES.INACTIVE]: [
        LOGISTICS_COURIER_STATUS.TRANSITIONS.INACTIVE_TO_ACTIVE,
        LOGISTICS_COURIER_STATUS.TRANSITIONS.ANY_TO_OFFLINE,
      ],
      [LOGISTICS_COURIER_STATUS.TYPES.MAINTENANCE]: [
        LOGISTICS_COURIER_STATUS.TRANSITIONS.MAINTENANCE_TO_ACTIVE,
        LOGISTICS_COURIER_STATUS.TRANSITIONS.MAINTENANCE_TO_INACTIVE,
        LOGISTICS_COURIER_STATUS.TRANSITIONS.ANY_TO_OFFLINE,
      ],
      [LOGISTICS_COURIER_STATUS.TYPES.SUSPENDED]: [
        LOGISTICS_COURIER_STATUS.TRANSITIONS.SUSPENDED_TO_ACTIVE,
        LOGISTICS_COURIER_STATUS.TRANSITIONS.SUSPENDED_TO_INACTIVE,
        LOGISTICS_COURIER_STATUS.TRANSITIONS.ANY_TO_OFFLINE,
      ],
      [LOGISTICS_COURIER_STATUS.TYPES.OFFLINE]: [
        LOGISTICS_COURIER_STATUS.TRANSITIONS.INACTIVE_TO_ACTIVE,
      ],
    };
  return allowedTransitions[status]?.includes(transition) || false;
}
