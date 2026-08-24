/**
 * Dispatch Constants
 * Configuration for dispatch operations - Bangladesh based
 */

export const LOGISTICS_DISPATCH = {
  // Dispatch Types
  TYPES: {
    REGULAR: 'regular',
    EXPRESS: 'express',
    URGENT: 'urgent',
    SCHEDULED: 'scheduled',
    BULK: 'bulk',
  } as const,

  // Dispatch Statuses
  STATUS: {
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

  // Dispatch Methods
  METHODS: {
    OWN_FLEET: 'own_fleet',
    THIRD_PARTY: 'third_party',
    COURIER: 'courier',
    AIR: 'air',
    SEA: 'sea',
  } as const,

  // Dispatch Priorities
  PRIORITIES: {
    CRITICAL: 5,
    HIGH: 4,
    MEDIUM: 3,
    LOW: 2,
    BACKGROUND: 1,
  } as const,

  // Dispatch Time Estimates (in hours)
  TIME_ESTIMATES: {
    REGULAR: 24,
    EXPRESS: 12,
    URGENT: 4,
    SCHEDULED: 24,
    BULK: 48,
  } as const,

  // Dispatch Limits
  LIMITS: {
    MAX_VEHICLES_PER_DISPATCH: 10,
    MAX_ITEMS_PER_DISPATCH: 1000,
    MAX_WEIGHT_KG: 5000,
    MAX_ROUTE_STOPS: 50,
  } as const,

  // Dispatch Windows (Bangladesh time - GMT+6)
  WINDOWS: {
    MORNING: 'morning',
    AFTERNOON: 'afternoon',
    EVENING: 'evening',
    NIGHT: 'night',
    ANY: 'any',
  } as const,

  // Window Hours
  WINDOW_HOURS: {
    MORNING: { start: 6, end: 12 },
    AFTERNOON: { start: 12, end: 18 },
    EVENING: { start: 18, end: 22 },
    NIGHT: { start: 22, end: 6 },
    ANY: { start: 0, end: 24 },
  } as const,
} as const;

// Dispatch Types
export type LogisticsDispatchType =
  (typeof LOGISTICS_DISPATCH.TYPES)[keyof typeof LOGISTICS_DISPATCH.TYPES];

// Dispatch Statuses
export type LogisticsDispatchStatus =
  (typeof LOGISTICS_DISPATCH.STATUS)[keyof typeof LOGISTICS_DISPATCH.STATUS];

// Dispatch Methods
export type LogisticsDispatchMethod =
  (typeof LOGISTICS_DISPATCH.METHODS)[keyof typeof LOGISTICS_DISPATCH.METHODS];

// Dispatch Priorities
export type LogisticsDispatchPriority =
  (typeof LOGISTICS_DISPATCH.PRIORITIES)[keyof typeof LOGISTICS_DISPATCH.PRIORITIES];

// Dispatch Windows
export type LogisticsDispatchWindow =
  (typeof LOGISTICS_DISPATCH.WINDOWS)[keyof typeof LOGISTICS_DISPATCH.WINDOWS];

// Utility Functions
export function logisticsDispatchGetTypeLabel(type: LogisticsDispatchType): string {
  const labels: Record<LogisticsDispatchType, string> = {
    [LOGISTICS_DISPATCH.TYPES.REGULAR]: 'Regular',
    [LOGISTICS_DISPATCH.TYPES.EXPRESS]: 'Express',
    [LOGISTICS_DISPATCH.TYPES.URGENT]: 'Urgent',
    [LOGISTICS_DISPATCH.TYPES.SCHEDULED]: 'Scheduled',
    [LOGISTICS_DISPATCH.TYPES.BULK]: 'Bulk',
  };
  return labels[type] || 'Unknown';
}

export function logisticsDispatchGetStatusLabel(status: LogisticsDispatchStatus): string {
  const labels: Record<LogisticsDispatchStatus, string> = {
    [LOGISTICS_DISPATCH.STATUS.PENDING]: 'Pending',
    [LOGISTICS_DISPATCH.STATUS.ASSIGNED]: 'Assigned',
    [LOGISTICS_DISPATCH.STATUS.LOADING]: 'Loading',
    [LOGISTICS_DISPATCH.STATUS.DEPARTED]: 'Departed',
    [LOGISTICS_DISPATCH.STATUS.IN_TRANSIT]: 'In Transit',
    [LOGISTICS_DISPATCH.STATUS.ARRIVED]: 'Arrived',
    [LOGISTICS_DISPATCH.STATUS.COMPLETED]: 'Completed',
    [LOGISTICS_DISPATCH.STATUS.CANCELLED]: 'Cancelled',
    [LOGISTICS_DISPATCH.STATUS.DELAYED]: 'Delayed',
  };
  return labels[status] || 'Unknown';
}

export function logisticsDispatchGetMethodLabel(method: LogisticsDispatchMethod): string {
  const labels: Record<LogisticsDispatchMethod, string> = {
    [LOGISTICS_DISPATCH.METHODS.OWN_FLEET]: 'Own Fleet',
    [LOGISTICS_DISPATCH.METHODS.THIRD_PARTY]: 'Third Party',
    [LOGISTICS_DISPATCH.METHODS.COURIER]: 'Courier',
    [LOGISTICS_DISPATCH.METHODS.AIR]: 'Air',
    [LOGISTICS_DISPATCH.METHODS.SEA]: 'Sea',
  };
  return labels[method] || 'Unknown';
}

export function logisticsDispatchGetPriorityLabel(priority: LogisticsDispatchPriority): string {
  const labels: Record<LogisticsDispatchPriority, string> = {
    [LOGISTICS_DISPATCH.PRIORITIES.CRITICAL]: 'Critical',
    [LOGISTICS_DISPATCH.PRIORITIES.HIGH]: 'High',
    [LOGISTICS_DISPATCH.PRIORITIES.MEDIUM]: 'Medium',
    [LOGISTICS_DISPATCH.PRIORITIES.LOW]: 'Low',
    [LOGISTICS_DISPATCH.PRIORITIES.BACKGROUND]: 'Background',
  };
  return labels[priority] || 'Unknown';
}

export function logisticsDispatchGetTimeEstimate(type: LogisticsDispatchType): number {
  const estimates: Record<LogisticsDispatchType, number> = {
    [LOGISTICS_DISPATCH.TYPES.REGULAR]: LOGISTICS_DISPATCH.TIME_ESTIMATES.REGULAR,
    [LOGISTICS_DISPATCH.TYPES.EXPRESS]: LOGISTICS_DISPATCH.TIME_ESTIMATES.EXPRESS,
    [LOGISTICS_DISPATCH.TYPES.URGENT]: LOGISTICS_DISPATCH.TIME_ESTIMATES.URGENT,
    [LOGISTICS_DISPATCH.TYPES.SCHEDULED]: LOGISTICS_DISPATCH.TIME_ESTIMATES.SCHEDULED,
    [LOGISTICS_DISPATCH.TYPES.BULK]: LOGISTICS_DISPATCH.TIME_ESTIMATES.BULK,
  };
  return estimates[type] || LOGISTICS_DISPATCH.TIME_ESTIMATES.REGULAR;
}

export function logisticsDispatchIsComplete(status: LogisticsDispatchStatus): boolean {
  return (
    status === LOGISTICS_DISPATCH.STATUS.COMPLETED || status === LOGISTICS_DISPATCH.STATUS.CANCELLED
  );
}

export function logisticsDispatchIsInTransit(status: LogisticsDispatchStatus): boolean {
  const transitStatuses: LogisticsDispatchStatus[] = [
    LOGISTICS_DISPATCH.STATUS.DEPARTED,
    LOGISTICS_DISPATCH.STATUS.IN_TRANSIT,
    LOGISTICS_DISPATCH.STATUS.ARRIVED,
  ];
  return transitStatuses.includes(status);
}

export function logisticsDispatchGetWindowLabel(window: LogisticsDispatchWindow): string {
  const labels: Record<LogisticsDispatchWindow, string> = {
    [LOGISTICS_DISPATCH.WINDOWS.MORNING]: 'Morning (6AM - 12PM)',
    [LOGISTICS_DISPATCH.WINDOWS.AFTERNOON]: 'Afternoon (12PM - 6PM)',
    [LOGISTICS_DISPATCH.WINDOWS.EVENING]: 'Evening (6PM - 10PM)',
    [LOGISTICS_DISPATCH.WINDOWS.NIGHT]: 'Night (10PM - 6AM)',
    [LOGISTICS_DISPATCH.WINDOWS.ANY]: 'Any Time',
  };
  return labels[window] || 'Unknown';
}

export function logisticsDispatchGetWindowHours(window: LogisticsDispatchWindow): {
  start: number;
  end: number;
} {
  const hours: Record<LogisticsDispatchWindow, { start: number; end: number }> = {
    [LOGISTICS_DISPATCH.WINDOWS.MORNING]: LOGISTICS_DISPATCH.WINDOW_HOURS.MORNING,
    [LOGISTICS_DISPATCH.WINDOWS.AFTERNOON]: LOGISTICS_DISPATCH.WINDOW_HOURS.AFTERNOON,
    [LOGISTICS_DISPATCH.WINDOWS.EVENING]: LOGISTICS_DISPATCH.WINDOW_HOURS.EVENING,
    [LOGISTICS_DISPATCH.WINDOWS.NIGHT]: LOGISTICS_DISPATCH.WINDOW_HOURS.NIGHT,
    [LOGISTICS_DISPATCH.WINDOWS.ANY]: LOGISTICS_DISPATCH.WINDOW_HOURS.ANY,
  };
  return hours[window] || LOGISTICS_DISPATCH.WINDOW_HOURS.ANY;
}
