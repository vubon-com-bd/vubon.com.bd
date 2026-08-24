/**
 * Dispatch Status Constants
 * Status definitions for dispatch
 */

export const LOGISTICS_DISPATCH_STATUS = {
  // Status Types
  TYPES: {
    PENDING: 'pending',
    ASSIGNED: 'assigned',
    LOADING: 'loading',
    DEPARTED: 'departed',
    IN_TRANSIT: 'in_transit',
    ARRIVED: 'arrived',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    DELAYED: 'delayed',
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
    PENDING: '#gray-400',
    ASSIGNED: '#blue-400',
    LOADING: '#blue-500',
    DEPARTED: '#orange-400',
    IN_TRANSIT: '#orange-500',
    ARRIVED: '#yellow-500',
    COMPLETED: '#green-600',
    CANCELLED: '#gray-500',
    DELAYED: '#red-400',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    PENDING: '⏳',
    ASSIGNED: '📋',
    LOADING: '📦',
    DEPARTED: '🚚',
    IN_TRANSIT: '🚛',
    ARRIVED: '📍',
    COMPLETED: '✅',
    CANCELLED: '🚫',
    DELAYED: '⏰',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    PENDING_TO_ASSIGNED: 'pending_to_assigned',
    ASSIGNED_TO_LOADING: 'assigned_to_loading',
    LOADING_TO_DEPARTED: 'loading_to_departed',
    DEPARTED_TO_IN_TRANSIT: 'departed_to_in_transit',
    IN_TRANSIT_TO_ARRIVED: 'in_transit_to_arrived',
    ARRIVED_TO_COMPLETED: 'arrived_to_completed',
    IN_TRANSIT_TO_DELAYED: 'in_transit_to_delayed',
    DELAYED_TO_IN_TRANSIT: 'delayed_to_in_transit',
    ANY_TO_CANCELLED: 'any_to_cancelled',
  } as const,
} as const;

// Status Types
export type LogisticsDispatchStatusType =
  (typeof LOGISTICS_DISPATCH_STATUS.TYPES)[keyof typeof LOGISTICS_DISPATCH_STATUS.TYPES];

// Status Categories
export type LogisticsDispatchStatusCategory =
  (typeof LOGISTICS_DISPATCH_STATUS.CATEGORIES)[keyof typeof LOGISTICS_DISPATCH_STATUS.CATEGORIES];

// Status Colors
export type LogisticsDispatchStatusColor =
  (typeof LOGISTICS_DISPATCH_STATUS.COLORS)[keyof typeof LOGISTICS_DISPATCH_STATUS.COLORS];

// Status Icons
export type LogisticsDispatchStatusIcon =
  (typeof LOGISTICS_DISPATCH_STATUS.ICONS)[keyof typeof LOGISTICS_DISPATCH_STATUS.ICONS];

// Status Transitions
export type LogisticsDispatchStatusTransition =
  (typeof LOGISTICS_DISPATCH_STATUS.TRANSITIONS)[keyof typeof LOGISTICS_DISPATCH_STATUS.TRANSITIONS];

// Utility Functions
export function logisticsDispatchStatusGetLabel(status: LogisticsDispatchStatusType): string {
  const labels: Record<LogisticsDispatchStatusType, string> = {
    [LOGISTICS_DISPATCH_STATUS.TYPES.PENDING]: 'Pending',
    [LOGISTICS_DISPATCH_STATUS.TYPES.ASSIGNED]: 'Assigned',
    [LOGISTICS_DISPATCH_STATUS.TYPES.LOADING]: 'Loading',
    [LOGISTICS_DISPATCH_STATUS.TYPES.DEPARTED]: 'Departed',
    [LOGISTICS_DISPATCH_STATUS.TYPES.IN_TRANSIT]: 'In Transit',
    [LOGISTICS_DISPATCH_STATUS.TYPES.ARRIVED]: 'Arrived',
    [LOGISTICS_DISPATCH_STATUS.TYPES.COMPLETED]: 'Completed',
    [LOGISTICS_DISPATCH_STATUS.TYPES.CANCELLED]: 'Cancelled',
    [LOGISTICS_DISPATCH_STATUS.TYPES.DELAYED]: 'Delayed',
  };
  return labels[status] || 'Unknown';
}

export function logisticsDispatchStatusGetCategory(
  status: LogisticsDispatchStatusType
): LogisticsDispatchStatusCategory {
  const categories: Record<LogisticsDispatchStatusType, LogisticsDispatchStatusCategory> = {
    [LOGISTICS_DISPATCH_STATUS.TYPES.PENDING]: LOGISTICS_DISPATCH_STATUS.CATEGORIES.PENDING,
    [LOGISTICS_DISPATCH_STATUS.TYPES.ASSIGNED]: LOGISTICS_DISPATCH_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_DISPATCH_STATUS.TYPES.LOADING]: LOGISTICS_DISPATCH_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_DISPATCH_STATUS.TYPES.DEPARTED]: LOGISTICS_DISPATCH_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_DISPATCH_STATUS.TYPES.IN_TRANSIT]: LOGISTICS_DISPATCH_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_DISPATCH_STATUS.TYPES.ARRIVED]: LOGISTICS_DISPATCH_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_DISPATCH_STATUS.TYPES.COMPLETED]: LOGISTICS_DISPATCH_STATUS.CATEGORIES.COMPLETED,
    [LOGISTICS_DISPATCH_STATUS.TYPES.CANCELLED]: LOGISTICS_DISPATCH_STATUS.CATEGORIES.FAILED,
    [LOGISTICS_DISPATCH_STATUS.TYPES.DELAYED]: LOGISTICS_DISPATCH_STATUS.CATEGORIES.FAILED,
  };
  return categories[status] || LOGISTICS_DISPATCH_STATUS.CATEGORIES.PENDING;
}

export function logisticsDispatchStatusIsActive(status: LogisticsDispatchStatusType): boolean {
  const activeStatuses: LogisticsDispatchStatusType[] = [
    LOGISTICS_DISPATCH_STATUS.TYPES.ASSIGNED,
    LOGISTICS_DISPATCH_STATUS.TYPES.LOADING,
    LOGISTICS_DISPATCH_STATUS.TYPES.DEPARTED,
    LOGISTICS_DISPATCH_STATUS.TYPES.IN_TRANSIT,
    LOGISTICS_DISPATCH_STATUS.TYPES.ARRIVED,
    LOGISTICS_DISPATCH_STATUS.TYPES.DELAYED,
  ];
  return activeStatuses.includes(status);
}

export function logisticsDispatchStatusIsComplete(status: LogisticsDispatchStatusType): boolean {
  return (
    status === LOGISTICS_DISPATCH_STATUS.TYPES.COMPLETED ||
    status === LOGISTICS_DISPATCH_STATUS.TYPES.CANCELLED
  );
}

export function logisticsDispatchStatusCanTransition(
  status: LogisticsDispatchStatusType,
  transition: LogisticsDispatchStatusTransition
): boolean {
  const allowedTransitions: Record<
    LogisticsDispatchStatusType,
    LogisticsDispatchStatusTransition[]
  > = {
    [LOGISTICS_DISPATCH_STATUS.TYPES.PENDING]: [
      LOGISTICS_DISPATCH_STATUS.TRANSITIONS.PENDING_TO_ASSIGNED,
      LOGISTICS_DISPATCH_STATUS.TRANSITIONS.ANY_TO_CANCELLED,
    ],
    [LOGISTICS_DISPATCH_STATUS.TYPES.ASSIGNED]: [
      LOGISTICS_DISPATCH_STATUS.TRANSITIONS.ASSIGNED_TO_LOADING,
      LOGISTICS_DISPATCH_STATUS.TRANSITIONS.ANY_TO_CANCELLED,
    ],
    [LOGISTICS_DISPATCH_STATUS.TYPES.LOADING]: [
      LOGISTICS_DISPATCH_STATUS.TRANSITIONS.LOADING_TO_DEPARTED,
    ],
    [LOGISTICS_DISPATCH_STATUS.TYPES.DEPARTED]: [
      LOGISTICS_DISPATCH_STATUS.TRANSITIONS.DEPARTED_TO_IN_TRANSIT,
    ],
    [LOGISTICS_DISPATCH_STATUS.TYPES.IN_TRANSIT]: [
      LOGISTICS_DISPATCH_STATUS.TRANSITIONS.IN_TRANSIT_TO_ARRIVED,
      LOGISTICS_DISPATCH_STATUS.TRANSITIONS.IN_TRANSIT_TO_DELAYED,
    ],
    [LOGISTICS_DISPATCH_STATUS.TYPES.ARRIVED]: [
      LOGISTICS_DISPATCH_STATUS.TRANSITIONS.ARRIVED_TO_COMPLETED,
    ],
    [LOGISTICS_DISPATCH_STATUS.TYPES.DELAYED]: [
      LOGISTICS_DISPATCH_STATUS.TRANSITIONS.DELAYED_TO_IN_TRANSIT,
    ],
    [LOGISTICS_DISPATCH_STATUS.TYPES.COMPLETED]: [],
    [LOGISTICS_DISPATCH_STATUS.TYPES.CANCELLED]: [],
  };
  return allowedTransitions[status]?.includes(transition) || false;
}
