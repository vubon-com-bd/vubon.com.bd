/**
 * Tracking Status Constants
 * Status definitions for tracking
 */

export const LOGISTICS_TRACKING_STATUS = {
  // Status Types
  TYPES: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    DISPATCHED: 'dispatched',
    IN_TRANSIT: 'in_transit',
    ARRIVED: 'arrived',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    RETURNED: 'returned',
    CANCELLED: 'cancelled',
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
    PROCESSING: '#blue-400',
    DISPATCHED: '#blue-500',
    IN_TRANSIT: '#orange-500',
    ARRIVED: '#yellow-500',
    OUT_FOR_DELIVERY: '#green-400',
    DELIVERED: '#green-600',
    FAILED: '#red-500',
    RETURNED: '#red-400',
    CANCELLED: '#gray-500',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    PENDING: '⏳',
    PROCESSING: '⚙️',
    DISPATCHED: '📦',
    IN_TRANSIT: '🚚',
    ARRIVED: '📍',
    OUT_FOR_DELIVERY: '🚲',
    DELIVERED: '✅',
    FAILED: '❌',
    RETURNED: '↩️',
    CANCELLED: '🚫',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    PENDING_TO_PROCESSING: 'pending_to_processing',
    PROCESSING_TO_DISPATCHED: 'processing_to_dispatched',
    DISPATCHED_TO_IN_TRANSIT: 'dispatched_to_in_transit',
    IN_TRANSIT_TO_ARRIVED: 'in_transit_to_arrived',
    ARRIVED_TO_OUT_FOR_DELIVERY: 'arrived_to_out_for_delivery',
    OUT_FOR_DELIVERY_TO_DELIVERED: 'out_for_delivery_to_delivered',
    OUT_FOR_DELIVERY_TO_FAILED: 'out_for_delivery_to_failed',
    IN_TRANSIT_TO_RETURNED: 'in_transit_to_returned',
    ANY_TO_CANCELLED: 'any_to_cancelled',
    FAILED_TO_RETURNED: 'failed_to_returned',
  } as const,
} as const;

// Status Types
export type LogisticsTrackingStatusType =
  (typeof LOGISTICS_TRACKING_STATUS.TYPES)[keyof typeof LOGISTICS_TRACKING_STATUS.TYPES];

// Status Categories
export type LogisticsTrackingStatusCategory =
  (typeof LOGISTICS_TRACKING_STATUS.CATEGORIES)[keyof typeof LOGISTICS_TRACKING_STATUS.CATEGORIES];

// Status Colors
export type LogisticsTrackingStatusColor =
  (typeof LOGISTICS_TRACKING_STATUS.COLORS)[keyof typeof LOGISTICS_TRACKING_STATUS.COLORS];

// Status Icons
export type LogisticsTrackingStatusIcon =
  (typeof LOGISTICS_TRACKING_STATUS.ICONS)[keyof typeof LOGISTICS_TRACKING_STATUS.ICONS];

// Status Transitions
export type LogisticsTrackingStatusTransition =
  (typeof LOGISTICS_TRACKING_STATUS.TRANSITIONS)[keyof typeof LOGISTICS_TRACKING_STATUS.TRANSITIONS];

// Utility Functions
export function logisticsTrackingStatusGetLabel(status: LogisticsTrackingStatusType): string {
  const labels: Record<LogisticsTrackingStatusType, string> = {
    [LOGISTICS_TRACKING_STATUS.TYPES.PENDING]: 'Pending',
    [LOGISTICS_TRACKING_STATUS.TYPES.PROCESSING]: 'Processing',
    [LOGISTICS_TRACKING_STATUS.TYPES.DISPATCHED]: 'Dispatched',
    [LOGISTICS_TRACKING_STATUS.TYPES.IN_TRANSIT]: 'In Transit',
    [LOGISTICS_TRACKING_STATUS.TYPES.ARRIVED]: 'Arrived',
    [LOGISTICS_TRACKING_STATUS.TYPES.OUT_FOR_DELIVERY]: 'Out for Delivery',
    [LOGISTICS_TRACKING_STATUS.TYPES.DELIVERED]: 'Delivered',
    [LOGISTICS_TRACKING_STATUS.TYPES.FAILED]: 'Failed',
    [LOGISTICS_TRACKING_STATUS.TYPES.RETURNED]: 'Returned',
    [LOGISTICS_TRACKING_STATUS.TYPES.CANCELLED]: 'Cancelled',
  };
  return labels[status] || 'Unknown';
}

export function logisticsTrackingStatusGetCategory(
  status: LogisticsTrackingStatusType
): LogisticsTrackingStatusCategory {
  const categories: Record<LogisticsTrackingStatusType, LogisticsTrackingStatusCategory> = {
    [LOGISTICS_TRACKING_STATUS.TYPES.PENDING]: LOGISTICS_TRACKING_STATUS.CATEGORIES.PENDING,
    [LOGISTICS_TRACKING_STATUS.TYPES.PROCESSING]: LOGISTICS_TRACKING_STATUS.CATEGORIES.PENDING,
    [LOGISTICS_TRACKING_STATUS.TYPES.DISPATCHED]: LOGISTICS_TRACKING_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_TRACKING_STATUS.TYPES.IN_TRANSIT]: LOGISTICS_TRACKING_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_TRACKING_STATUS.TYPES.ARRIVED]: LOGISTICS_TRACKING_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_TRACKING_STATUS.TYPES.OUT_FOR_DELIVERY]: LOGISTICS_TRACKING_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_TRACKING_STATUS.TYPES.DELIVERED]: LOGISTICS_TRACKING_STATUS.CATEGORIES.COMPLETED,
    [LOGISTICS_TRACKING_STATUS.TYPES.FAILED]: LOGISTICS_TRACKING_STATUS.CATEGORIES.FAILED,
    [LOGISTICS_TRACKING_STATUS.TYPES.RETURNED]: LOGISTICS_TRACKING_STATUS.CATEGORIES.FAILED,
    [LOGISTICS_TRACKING_STATUS.TYPES.CANCELLED]: LOGISTICS_TRACKING_STATUS.CATEGORIES.FAILED,
  };
  return categories[status] || LOGISTICS_TRACKING_STATUS.CATEGORIES.PENDING;
}

export function logisticsTrackingStatusIsActive(status: LogisticsTrackingStatusType): boolean {
  const activeStatuses: LogisticsTrackingStatusType[] = [
    LOGISTICS_TRACKING_STATUS.TYPES.DISPATCHED,
    LOGISTICS_TRACKING_STATUS.TYPES.IN_TRANSIT,
    LOGISTICS_TRACKING_STATUS.TYPES.ARRIVED,
    LOGISTICS_TRACKING_STATUS.TYPES.OUT_FOR_DELIVERY,
  ];
  return activeStatuses.includes(status);
}

export function logisticsTrackingStatusIsComplete(status: LogisticsTrackingStatusType): boolean {
  const completeStatuses: LogisticsTrackingStatusType[] = [
    LOGISTICS_TRACKING_STATUS.TYPES.DELIVERED,
    LOGISTICS_TRACKING_STATUS.TYPES.FAILED,
    LOGISTICS_TRACKING_STATUS.TYPES.RETURNED,
    LOGISTICS_TRACKING_STATUS.TYPES.CANCELLED,
  ];
  return completeStatuses.includes(status);
}

export function logisticsTrackingStatusCanTransition(
  status: LogisticsTrackingStatusType,
  transition: LogisticsTrackingStatusTransition
): boolean {
  const allowedTransitions: Record<
    LogisticsTrackingStatusType,
    LogisticsTrackingStatusTransition[]
  > = {
    [LOGISTICS_TRACKING_STATUS.TYPES.PENDING]: [
      LOGISTICS_TRACKING_STATUS.TRANSITIONS.PENDING_TO_PROCESSING,
      LOGISTICS_TRACKING_STATUS.TRANSITIONS.ANY_TO_CANCELLED,
    ],
    [LOGISTICS_TRACKING_STATUS.TYPES.PROCESSING]: [
      LOGISTICS_TRACKING_STATUS.TRANSITIONS.PROCESSING_TO_DISPATCHED,
      LOGISTICS_TRACKING_STATUS.TRANSITIONS.ANY_TO_CANCELLED,
    ],
    [LOGISTICS_TRACKING_STATUS.TYPES.DISPATCHED]: [
      LOGISTICS_TRACKING_STATUS.TRANSITIONS.DISPATCHED_TO_IN_TRANSIT,
    ],
    [LOGISTICS_TRACKING_STATUS.TYPES.IN_TRANSIT]: [
      LOGISTICS_TRACKING_STATUS.TRANSITIONS.IN_TRANSIT_TO_ARRIVED,
      LOGISTICS_TRACKING_STATUS.TRANSITIONS.IN_TRANSIT_TO_RETURNED,
    ],
    [LOGISTICS_TRACKING_STATUS.TYPES.ARRIVED]: [
      LOGISTICS_TRACKING_STATUS.TRANSITIONS.ARRIVED_TO_OUT_FOR_DELIVERY,
    ],
    [LOGISTICS_TRACKING_STATUS.TYPES.OUT_FOR_DELIVERY]: [
      LOGISTICS_TRACKING_STATUS.TRANSITIONS.OUT_FOR_DELIVERY_TO_DELIVERED,
      LOGISTICS_TRACKING_STATUS.TRANSITIONS.OUT_FOR_DELIVERY_TO_FAILED,
    ],
    [LOGISTICS_TRACKING_STATUS.TYPES.FAILED]: [
      LOGISTICS_TRACKING_STATUS.TRANSITIONS.FAILED_TO_RETURNED,
    ],
    [LOGISTICS_TRACKING_STATUS.TYPES.DELIVERED]: [],
    [LOGISTICS_TRACKING_STATUS.TYPES.RETURNED]: [],
    [LOGISTICS_TRACKING_STATUS.TYPES.CANCELLED]: [],
  };
  return allowedTransitions[status]?.includes(transition) || false;
}
