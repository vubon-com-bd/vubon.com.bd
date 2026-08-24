/**
 * Warehouse Status Constants
 * Status definitions for warehouses
 */

export const LOGISTICS_WAREHOUSE_STATUS = {
  // Status Types
  TYPES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    MAINTENANCE: 'maintenance',
    FULL: 'full',
    CLOSED: 'closed',
  } as const,

  // Status Categories
  CATEGORIES: {
    OPERATIONAL: 'operational',
    LIMITED: 'limited',
    UNAVAILABLE: 'unavailable',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    ACTIVE: '#green-500',
    INACTIVE: '#gray-400',
    MAINTENANCE: '#orange-500',
    FULL: '#yellow-500',
    CLOSED: '#red-500',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    ACTIVE: '🟢',
    INACTIVE: '⚪',
    MAINTENANCE: '🟠',
    FULL: '🟡',
    CLOSED: '🔴',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    ACTIVE_TO_INACTIVE: 'active_to_inactive',
    ACTIVE_TO_MAINTENANCE: 'active_to_maintenance',
    ACTIVE_TO_FULL: 'active_to_full',
    INACTIVE_TO_ACTIVE: 'inactive_to_active',
    MAINTENANCE_TO_ACTIVE: 'maintenance_to_active',
    MAINTENANCE_TO_INACTIVE: 'maintenance_to_inactive',
    FULL_TO_ACTIVE: 'full_to_active',
    FULL_TO_INACTIVE: 'full_to_inactive',
    ANY_TO_CLOSED: 'any_to_closed',
    CLOSED_TO_ACTIVE: 'closed_to_active',
  } as const,
} as const;

// Status Types
export type LogisticsWarehouseStatusType =
  (typeof LOGISTICS_WAREHOUSE_STATUS.TYPES)[keyof typeof LOGISTICS_WAREHOUSE_STATUS.TYPES];

// Status Categories
export type LogisticsWarehouseStatusCategory =
  (typeof LOGISTICS_WAREHOUSE_STATUS.CATEGORIES)[keyof typeof LOGISTICS_WAREHOUSE_STATUS.CATEGORIES];

// Status Colors
export type LogisticsWarehouseStatusColor =
  (typeof LOGISTICS_WAREHOUSE_STATUS.COLORS)[keyof typeof LOGISTICS_WAREHOUSE_STATUS.COLORS];

// Status Icons
export type LogisticsWarehouseStatusIcon =
  (typeof LOGISTICS_WAREHOUSE_STATUS.ICONS)[keyof typeof LOGISTICS_WAREHOUSE_STATUS.ICONS];

// Status Transitions
export type LogisticsWarehouseStatusTransition =
  (typeof LOGISTICS_WAREHOUSE_STATUS.TRANSITIONS)[keyof typeof LOGISTICS_WAREHOUSE_STATUS.TRANSITIONS];

// Utility Functions
export function logisticsWarehouseStatusGetLabel(status: LogisticsWarehouseStatusType): string {
  const labels: Record<LogisticsWarehouseStatusType, string> = {
    [LOGISTICS_WAREHOUSE_STATUS.TYPES.ACTIVE]: 'Active',
    [LOGISTICS_WAREHOUSE_STATUS.TYPES.INACTIVE]: 'Inactive',
    [LOGISTICS_WAREHOUSE_STATUS.TYPES.MAINTENANCE]: 'Under Maintenance',
    [LOGISTICS_WAREHOUSE_STATUS.TYPES.FULL]: 'Full Capacity',
    [LOGISTICS_WAREHOUSE_STATUS.TYPES.CLOSED]: 'Closed',
  };
  return labels[status] || 'Unknown';
}

export function logisticsWarehouseStatusGetCategory(
  status: LogisticsWarehouseStatusType
): LogisticsWarehouseStatusCategory {
  const categories: Record<LogisticsWarehouseStatusType, LogisticsWarehouseStatusCategory> = {
    [LOGISTICS_WAREHOUSE_STATUS.TYPES.ACTIVE]: LOGISTICS_WAREHOUSE_STATUS.CATEGORIES.OPERATIONAL,
    [LOGISTICS_WAREHOUSE_STATUS.TYPES.INACTIVE]: LOGISTICS_WAREHOUSE_STATUS.CATEGORIES.UNAVAILABLE,
    [LOGISTICS_WAREHOUSE_STATUS.TYPES.MAINTENANCE]: LOGISTICS_WAREHOUSE_STATUS.CATEGORIES.LIMITED,
    [LOGISTICS_WAREHOUSE_STATUS.TYPES.FULL]: LOGISTICS_WAREHOUSE_STATUS.CATEGORIES.LIMITED,
    [LOGISTICS_WAREHOUSE_STATUS.TYPES.CLOSED]: LOGISTICS_WAREHOUSE_STATUS.CATEGORIES.UNAVAILABLE,
  };
  return categories[status] || LOGISTICS_WAREHOUSE_STATUS.CATEGORIES.OPERATIONAL;
}

export function logisticsWarehouseStatusIsOperational(
  status: LogisticsWarehouseStatusType
): boolean {
  return status === LOGISTICS_WAREHOUSE_STATUS.TYPES.ACTIVE;
}

export function logisticsWarehouseStatusIsAvailable(status: LogisticsWarehouseStatusType): boolean {
  const availableStatuses: LogisticsWarehouseStatusType[] = [
    LOGISTICS_WAREHOUSE_STATUS.TYPES.ACTIVE,
    LOGISTICS_WAREHOUSE_STATUS.TYPES.MAINTENANCE,
    LOGISTICS_WAREHOUSE_STATUS.TYPES.FULL,
  ];
  return availableStatuses.includes(status);
}

export function logisticsWarehouseStatusIsFull(status: LogisticsWarehouseStatusType): boolean {
  return status === LOGISTICS_WAREHOUSE_STATUS.TYPES.FULL;
}

export function logisticsWarehouseStatusCanTransition(
  status: LogisticsWarehouseStatusType,
  transition: LogisticsWarehouseStatusTransition
): boolean {
  const allowedTransitions: Record<
    LogisticsWarehouseStatusType,
    LogisticsWarehouseStatusTransition[]
  > = {
    [LOGISTICS_WAREHOUSE_STATUS.TYPES.ACTIVE]: [
      LOGISTICS_WAREHOUSE_STATUS.TRANSITIONS.ACTIVE_TO_INACTIVE,
      LOGISTICS_WAREHOUSE_STATUS.TRANSITIONS.ACTIVE_TO_MAINTENANCE,
      LOGISTICS_WAREHOUSE_STATUS.TRANSITIONS.ACTIVE_TO_FULL,
      LOGISTICS_WAREHOUSE_STATUS.TRANSITIONS.ANY_TO_CLOSED,
    ],
    [LOGISTICS_WAREHOUSE_STATUS.TYPES.INACTIVE]: [
      LOGISTICS_WAREHOUSE_STATUS.TRANSITIONS.INACTIVE_TO_ACTIVE,
      LOGISTICS_WAREHOUSE_STATUS.TRANSITIONS.ANY_TO_CLOSED,
    ],
    [LOGISTICS_WAREHOUSE_STATUS.TYPES.MAINTENANCE]: [
      LOGISTICS_WAREHOUSE_STATUS.TRANSITIONS.MAINTENANCE_TO_ACTIVE,
      LOGISTICS_WAREHOUSE_STATUS.TRANSITIONS.MAINTENANCE_TO_INACTIVE,
      LOGISTICS_WAREHOUSE_STATUS.TRANSITIONS.ANY_TO_CLOSED,
    ],
    [LOGISTICS_WAREHOUSE_STATUS.TYPES.FULL]: [
      LOGISTICS_WAREHOUSE_STATUS.TRANSITIONS.FULL_TO_ACTIVE,
      LOGISTICS_WAREHOUSE_STATUS.TRANSITIONS.FULL_TO_INACTIVE,
      LOGISTICS_WAREHOUSE_STATUS.TRANSITIONS.ANY_TO_CLOSED,
    ],
    [LOGISTICS_WAREHOUSE_STATUS.TYPES.CLOSED]: [
      LOGISTICS_WAREHOUSE_STATUS.TRANSITIONS.CLOSED_TO_ACTIVE,
    ],
  };
  return allowedTransitions[status]?.includes(transition) || false;
}
