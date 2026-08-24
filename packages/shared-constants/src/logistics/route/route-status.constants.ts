/**
 * Route Status Constants
 * Status definitions for routes
 */

export const LOGISTICS_ROUTE_STATUS = {
  // Status Types
  TYPES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    MAINTENANCE: 'maintenance',
    CLOSED: 'closed',
    RESTRICTED: 'restricted',
    PLANNED: 'planned',
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
    CLOSED: '#red-500',
    RESTRICTED: '#yellow-500',
    PLANNED: '#blue-400',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    ACTIVE: '🟢',
    INACTIVE: '⚪',
    MAINTENANCE: '🟠',
    CLOSED: '🔴',
    RESTRICTED: '🟡',
    PLANNED: '🔵',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    PLANNED_TO_ACTIVE: 'planned_to_active',
    ACTIVE_TO_INACTIVE: 'active_to_inactive',
    ACTIVE_TO_MAINTENANCE: 'active_to_maintenance',
    ACTIVE_TO_RESTRICTED: 'active_to_restricted',
    MAINTENANCE_TO_ACTIVE: 'maintenance_to_active',
    MAINTENANCE_TO_INACTIVE: 'maintenance_to_inactive',
    INACTIVE_TO_ACTIVE: 'inactive_to_active',
    INACTIVE_TO_PLANNED: 'inactive_to_planned',
    RESTRICTED_TO_ACTIVE: 'restricted_to_active',
    RESTRICTED_TO_INACTIVE: 'restricted_to_inactive',
    ANY_TO_CLOSED: 'any_to_closed',
    CLOSED_TO_ACTIVE: 'closed_to_active',
  } as const,
} as const;

// Status Types
export type LogisticsRouteStatusType =
  (typeof LOGISTICS_ROUTE_STATUS.TYPES)[keyof typeof LOGISTICS_ROUTE_STATUS.TYPES];

// Status Categories
export type LogisticsRouteStatusCategory =
  (typeof LOGISTICS_ROUTE_STATUS.CATEGORIES)[keyof typeof LOGISTICS_ROUTE_STATUS.CATEGORIES];

// Status Colors
export type LogisticsRouteStatusColor =
  (typeof LOGISTICS_ROUTE_STATUS.COLORS)[keyof typeof LOGISTICS_ROUTE_STATUS.COLORS];

// Status Icons
export type LogisticsRouteStatusIcon =
  (typeof LOGISTICS_ROUTE_STATUS.ICONS)[keyof typeof LOGISTICS_ROUTE_STATUS.ICONS];

// Status Transitions
export type LogisticsRouteStatusTransition =
  (typeof LOGISTICS_ROUTE_STATUS.TRANSITIONS)[keyof typeof LOGISTICS_ROUTE_STATUS.TRANSITIONS];

// Utility Functions
export function logisticsRouteStatusGetLabel(status: LogisticsRouteStatusType): string {
  const labels: Record<LogisticsRouteStatusType, string> = {
    [LOGISTICS_ROUTE_STATUS.TYPES.ACTIVE]: 'Active',
    [LOGISTICS_ROUTE_STATUS.TYPES.INACTIVE]: 'Inactive',
    [LOGISTICS_ROUTE_STATUS.TYPES.MAINTENANCE]: 'Under Maintenance',
    [LOGISTICS_ROUTE_STATUS.TYPES.CLOSED]: 'Closed',
    [LOGISTICS_ROUTE_STATUS.TYPES.RESTRICTED]: 'Restricted',
    [LOGISTICS_ROUTE_STATUS.TYPES.PLANNED]: 'Planned',
  };
  return labels[status] || 'Unknown';
}

export function logisticsRouteStatusGetCategory(
  status: LogisticsRouteStatusType
): LogisticsRouteStatusCategory {
  const categories: Record<LogisticsRouteStatusType, LogisticsRouteStatusCategory> = {
    [LOGISTICS_ROUTE_STATUS.TYPES.ACTIVE]: LOGISTICS_ROUTE_STATUS.CATEGORIES.OPERATIONAL,
    [LOGISTICS_ROUTE_STATUS.TYPES.MAINTENANCE]: LOGISTICS_ROUTE_STATUS.CATEGORIES.LIMITED,
    [LOGISTICS_ROUTE_STATUS.TYPES.RESTRICTED]: LOGISTICS_ROUTE_STATUS.CATEGORIES.LIMITED,
    [LOGISTICS_ROUTE_STATUS.TYPES.INACTIVE]: LOGISTICS_ROUTE_STATUS.CATEGORIES.UNAVAILABLE,
    [LOGISTICS_ROUTE_STATUS.TYPES.CLOSED]: LOGISTICS_ROUTE_STATUS.CATEGORIES.UNAVAILABLE,
    [LOGISTICS_ROUTE_STATUS.TYPES.PLANNED]: LOGISTICS_ROUTE_STATUS.CATEGORIES.UNAVAILABLE,
  };
  return categories[status] || LOGISTICS_ROUTE_STATUS.CATEGORIES.UNAVAILABLE;
}

export function logisticsRouteStatusIsOperational(status: LogisticsRouteStatusType): boolean {
  return status === LOGISTICS_ROUTE_STATUS.TYPES.ACTIVE;
}

export function logisticsRouteStatusIsAvailable(status: LogisticsRouteStatusType): boolean {
  const availableStatuses: LogisticsRouteStatusType[] = [
    LOGISTICS_ROUTE_STATUS.TYPES.ACTIVE,
    LOGISTICS_ROUTE_STATUS.TYPES.MAINTENANCE,
    LOGISTICS_ROUTE_STATUS.TYPES.RESTRICTED,
  ];
  return availableStatuses.includes(status);
}

export function logisticsRouteStatusCanTransition(
  status: LogisticsRouteStatusType,
  transition: LogisticsRouteStatusTransition
): boolean {
  const allowedTransitions: Record<LogisticsRouteStatusType, LogisticsRouteStatusTransition[]> = {
    [LOGISTICS_ROUTE_STATUS.TYPES.PLANNED]: [LOGISTICS_ROUTE_STATUS.TRANSITIONS.PLANNED_TO_ACTIVE],
    [LOGISTICS_ROUTE_STATUS.TYPES.ACTIVE]: [
      LOGISTICS_ROUTE_STATUS.TRANSITIONS.ACTIVE_TO_INACTIVE,
      LOGISTICS_ROUTE_STATUS.TRANSITIONS.ACTIVE_TO_MAINTENANCE,
      LOGISTICS_ROUTE_STATUS.TRANSITIONS.ACTIVE_TO_RESTRICTED,
      LOGISTICS_ROUTE_STATUS.TRANSITIONS.ANY_TO_CLOSED,
    ],
    [LOGISTICS_ROUTE_STATUS.TYPES.MAINTENANCE]: [
      LOGISTICS_ROUTE_STATUS.TRANSITIONS.MAINTENANCE_TO_ACTIVE,
      LOGISTICS_ROUTE_STATUS.TRANSITIONS.MAINTENANCE_TO_INACTIVE,
      LOGISTICS_ROUTE_STATUS.TRANSITIONS.ANY_TO_CLOSED,
    ],
    [LOGISTICS_ROUTE_STATUS.TYPES.RESTRICTED]: [
      LOGISTICS_ROUTE_STATUS.TRANSITIONS.RESTRICTED_TO_ACTIVE,
      LOGISTICS_ROUTE_STATUS.TRANSITIONS.RESTRICTED_TO_INACTIVE,
      LOGISTICS_ROUTE_STATUS.TRANSITIONS.ANY_TO_CLOSED,
    ],
    [LOGISTICS_ROUTE_STATUS.TYPES.INACTIVE]: [
      LOGISTICS_ROUTE_STATUS.TRANSITIONS.INACTIVE_TO_ACTIVE,
      LOGISTICS_ROUTE_STATUS.TRANSITIONS.INACTIVE_TO_PLANNED,
      LOGISTICS_ROUTE_STATUS.TRANSITIONS.ANY_TO_CLOSED,
    ],
    [LOGISTICS_ROUTE_STATUS.TYPES.CLOSED]: [LOGISTICS_ROUTE_STATUS.TRANSITIONS.CLOSED_TO_ACTIVE],
  };
  return allowedTransitions[status]?.includes(transition) || false;
}
