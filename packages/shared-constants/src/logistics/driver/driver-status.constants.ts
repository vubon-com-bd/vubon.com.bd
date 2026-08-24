/**
 * Driver Status Constants
 * Status definitions for drivers
 */

export const LOGISTICS_DRIVER_STATUS = {
  // Status Types
  TYPES: {
    AVAILABLE: 'available',
    ACTIVE: 'active',
    ON_DUTY: 'on_duty',
    OFF_DUTY: 'off_duty',
    ON_BREAK: 'on_break',
    ON_LEAVE: 'on_leave',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
    TERMINATED: 'terminated',
  } as const,

  // Status Categories
  CATEGORIES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    UNAVAILABLE: 'unavailable',
    TERMINATED: 'terminated',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    AVAILABLE: '#green-500',
    ACTIVE: '#blue-500',
    ON_DUTY: '#green-400',
    OFF_DUTY: '#gray-400',
    ON_BREAK: '#yellow-500',
    ON_LEAVE: '#orange-500',
    INACTIVE: '#gray-500',
    SUSPENDED: '#red-500',
    TERMINATED: '#red-600',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    AVAILABLE: '🟢',
    ACTIVE: '🔵',
    ON_DUTY: '✅',
    OFF_DUTY: '⚪',
    ON_BREAK: '🟡',
    ON_LEAVE: '🟠',
    INACTIVE: '⚫',
    SUSPENDED: '🔴',
    TERMINATED: '⛔',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    AVAILABLE_TO_ACTIVE: 'available_to_active',
    AVAILABLE_TO_ON_DUTY: 'available_to_on_duty',
    ACTIVE_TO_AVAILABLE: 'active_to_available',
    ACTIVE_TO_ON_DUTY: 'active_to_on_duty',
    ON_DUTY_TO_AVAILABLE: 'on_duty_to_available',
    ON_DUTY_TO_ON_BREAK: 'on_duty_to_on_break',
    ON_DUTY_TO_OFF_DUTY: 'on_duty_to_off_duty',
    ON_BREAK_TO_ON_DUTY: 'on_break_to_on_duty',
    OFF_DUTY_TO_ON_DUTY: 'off_duty_to_on_duty',
    ON_DUTY_TO_ON_LEAVE: 'on_duty_to_on_leave',
    ON_LEAVE_TO_ON_DUTY: 'on_leave_to_on_duty',
    AVAILABLE_TO_INACTIVE: 'available_to_inactive',
    ACTIVE_TO_INACTIVE: 'active_to_inactive',
    INACTIVE_TO_AVAILABLE: 'inactive_to_available',
    ACTIVE_TO_SUSPENDED: 'active_to_suspended',
    SUSPENDED_TO_ACTIVE: 'suspended_to_active',
    SUSPENDED_TO_TERMINATED: 'suspended_to_terminated',
  } as const,
} as const;

// Status Types
export type LogisticsDriverStatusType =
  (typeof LOGISTICS_DRIVER_STATUS.TYPES)[keyof typeof LOGISTICS_DRIVER_STATUS.TYPES];

// Status Categories
export type LogisticsDriverStatusCategory =
  (typeof LOGISTICS_DRIVER_STATUS.CATEGORIES)[keyof typeof LOGISTICS_DRIVER_STATUS.CATEGORIES];

// Status Colors
export type LogisticsDriverStatusColor =
  (typeof LOGISTICS_DRIVER_STATUS.COLORS)[keyof typeof LOGISTICS_DRIVER_STATUS.COLORS];

// Status Icons
export type LogisticsDriverStatusIcon =
  (typeof LOGISTICS_DRIVER_STATUS.ICONS)[keyof typeof LOGISTICS_DRIVER_STATUS.ICONS];

// Status Transitions
export type LogisticsDriverStatusTransition =
  (typeof LOGISTICS_DRIVER_STATUS.TRANSITIONS)[keyof typeof LOGISTICS_DRIVER_STATUS.TRANSITIONS];

// Utility Functions
export function logisticsDriverStatusGetLabel(status: LogisticsDriverStatusType): string {
  const labels: Record<LogisticsDriverStatusType, string> = {
    [LOGISTICS_DRIVER_STATUS.TYPES.AVAILABLE]: 'Available',
    [LOGISTICS_DRIVER_STATUS.TYPES.ACTIVE]: 'Active',
    [LOGISTICS_DRIVER_STATUS.TYPES.ON_DUTY]: 'On Duty',
    [LOGISTICS_DRIVER_STATUS.TYPES.OFF_DUTY]: 'Off Duty',
    [LOGISTICS_DRIVER_STATUS.TYPES.ON_BREAK]: 'On Break',
    [LOGISTICS_DRIVER_STATUS.TYPES.ON_LEAVE]: 'On Leave',
    [LOGISTICS_DRIVER_STATUS.TYPES.INACTIVE]: 'Inactive',
    [LOGISTICS_DRIVER_STATUS.TYPES.SUSPENDED]: 'Suspended',
    [LOGISTICS_DRIVER_STATUS.TYPES.TERMINATED]: 'Terminated',
  };
  return labels[status] || 'Unknown';
}

export function logisticsDriverStatusGetCategory(
  status: LogisticsDriverStatusType
): LogisticsDriverStatusCategory {
  const categories: Record<LogisticsDriverStatusType, LogisticsDriverStatusCategory> = {
    [LOGISTICS_DRIVER_STATUS.TYPES.AVAILABLE]: LOGISTICS_DRIVER_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_DRIVER_STATUS.TYPES.ACTIVE]: LOGISTICS_DRIVER_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_DRIVER_STATUS.TYPES.ON_DUTY]: LOGISTICS_DRIVER_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_DRIVER_STATUS.TYPES.ON_BREAK]: LOGISTICS_DRIVER_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_DRIVER_STATUS.TYPES.OFF_DUTY]: LOGISTICS_DRIVER_STATUS.CATEGORIES.INACTIVE,
    [LOGISTICS_DRIVER_STATUS.TYPES.ON_LEAVE]: LOGISTICS_DRIVER_STATUS.CATEGORIES.UNAVAILABLE,
    [LOGISTICS_DRIVER_STATUS.TYPES.INACTIVE]: LOGISTICS_DRIVER_STATUS.CATEGORIES.INACTIVE,
    [LOGISTICS_DRIVER_STATUS.TYPES.SUSPENDED]: LOGISTICS_DRIVER_STATUS.CATEGORIES.UNAVAILABLE,
    [LOGISTICS_DRIVER_STATUS.TYPES.TERMINATED]: LOGISTICS_DRIVER_STATUS.CATEGORIES.TERMINATED,
  };
  return categories[status] || LOGISTICS_DRIVER_STATUS.CATEGORIES.INACTIVE;
}

export function logisticsDriverStatusIsAvailable(status: LogisticsDriverStatusType): boolean {
  return (
    status === LOGISTICS_DRIVER_STATUS.TYPES.AVAILABLE ||
    status === LOGISTICS_DRIVER_STATUS.TYPES.ACTIVE ||
    status === LOGISTICS_DRIVER_STATUS.TYPES.ON_DUTY
  );
}

export function logisticsDriverStatusIsActive(status: LogisticsDriverStatusType): boolean {
  const activeStatuses: LogisticsDriverStatusType[] = [
    LOGISTICS_DRIVER_STATUS.TYPES.AVAILABLE,
    LOGISTICS_DRIVER_STATUS.TYPES.ACTIVE,
    LOGISTICS_DRIVER_STATUS.TYPES.ON_DUTY,
    LOGISTICS_DRIVER_STATUS.TYPES.ON_BREAK,
  ];
  return activeStatuses.includes(status);
}

export function logisticsDriverStatusCanTransition(
  status: LogisticsDriverStatusType,
  transition: LogisticsDriverStatusTransition
): boolean {
  const allowedTransitions: Record<LogisticsDriverStatusType, LogisticsDriverStatusTransition[]> = {
    [LOGISTICS_DRIVER_STATUS.TYPES.AVAILABLE]: [
      LOGISTICS_DRIVER_STATUS.TRANSITIONS.AVAILABLE_TO_ACTIVE,
      LOGISTICS_DRIVER_STATUS.TRANSITIONS.AVAILABLE_TO_ON_DUTY,
      LOGISTICS_DRIVER_STATUS.TRANSITIONS.AVAILABLE_TO_INACTIVE,
    ],
    [LOGISTICS_DRIVER_STATUS.TYPES.ACTIVE]: [
      LOGISTICS_DRIVER_STATUS.TRANSITIONS.ACTIVE_TO_AVAILABLE,
      LOGISTICS_DRIVER_STATUS.TRANSITIONS.ACTIVE_TO_ON_DUTY,
      LOGISTICS_DRIVER_STATUS.TRANSITIONS.ACTIVE_TO_INACTIVE,
      LOGISTICS_DRIVER_STATUS.TRANSITIONS.ACTIVE_TO_SUSPENDED,
    ],
    [LOGISTICS_DRIVER_STATUS.TYPES.ON_DUTY]: [
      LOGISTICS_DRIVER_STATUS.TRANSITIONS.ON_DUTY_TO_AVAILABLE,
      LOGISTICS_DRIVER_STATUS.TRANSITIONS.ON_DUTY_TO_ON_BREAK,
      LOGISTICS_DRIVER_STATUS.TRANSITIONS.ON_DUTY_TO_OFF_DUTY,
      LOGISTICS_DRIVER_STATUS.TRANSITIONS.ON_DUTY_TO_ON_LEAVE,
    ],
    [LOGISTICS_DRIVER_STATUS.TYPES.ON_BREAK]: [
      LOGISTICS_DRIVER_STATUS.TRANSITIONS.ON_BREAK_TO_ON_DUTY,
    ],
    [LOGISTICS_DRIVER_STATUS.TYPES.OFF_DUTY]: [
      LOGISTICS_DRIVER_STATUS.TRANSITIONS.OFF_DUTY_TO_ON_DUTY,
    ],
    [LOGISTICS_DRIVER_STATUS.TYPES.ON_LEAVE]: [
      LOGISTICS_DRIVER_STATUS.TRANSITIONS.ON_LEAVE_TO_ON_DUTY,
    ],
    [LOGISTICS_DRIVER_STATUS.TYPES.INACTIVE]: [
      LOGISTICS_DRIVER_STATUS.TRANSITIONS.INACTIVE_TO_AVAILABLE,
    ],
    [LOGISTICS_DRIVER_STATUS.TYPES.SUSPENDED]: [
      LOGISTICS_DRIVER_STATUS.TRANSITIONS.SUSPENDED_TO_ACTIVE,
      LOGISTICS_DRIVER_STATUS.TRANSITIONS.SUSPENDED_TO_TERMINATED,
    ],
    [LOGISTICS_DRIVER_STATUS.TYPES.TERMINATED]: [],
  };
  return allowedTransitions[status]?.includes(transition) || false;
}
