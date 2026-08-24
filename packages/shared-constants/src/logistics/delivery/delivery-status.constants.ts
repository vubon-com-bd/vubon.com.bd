/**
 * Delivery Status Constants
 * Status definitions for deliveries
 */

export const LOGISTICS_DELIVERY_STATUS = {
  // Status Types
  TYPES: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    ASSIGNED: 'assigned',
    PICKED_UP: 'picked_up',
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
    ASSIGNED: '#blue-500',
    PICKED_UP: '#purple-500',
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
    ASSIGNED: '📋',
    PICKED_UP: '📦',
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
    PROCESSING_TO_ASSIGNED: 'processing_to_assigned',
    ASSIGNED_TO_PICKED_UP: 'assigned_to_picked_up',
    PICKED_UP_TO_IN_TRANSIT: 'picked_up_to_in_transit',
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
export type LogisticsDeliveryStatusType =
  (typeof LOGISTICS_DELIVERY_STATUS.TYPES)[keyof typeof LOGISTICS_DELIVERY_STATUS.TYPES];

// Status Categories
export type LogisticsDeliveryStatusCategory =
  (typeof LOGISTICS_DELIVERY_STATUS.CATEGORIES)[keyof typeof LOGISTICS_DELIVERY_STATUS.CATEGORIES];

// Status Colors
export type LogisticsDeliveryStatusColor =
  (typeof LOGISTICS_DELIVERY_STATUS.COLORS)[keyof typeof LOGISTICS_DELIVERY_STATUS.COLORS];

// Status Icons
export type LogisticsDeliveryStatusIcon =
  (typeof LOGISTICS_DELIVERY_STATUS.ICONS)[keyof typeof LOGISTICS_DELIVERY_STATUS.ICONS];

// Status Transitions
export type LogisticsDeliveryStatusTransition =
  (typeof LOGISTICS_DELIVERY_STATUS.TRANSITIONS)[keyof typeof LOGISTICS_DELIVERY_STATUS.TRANSITIONS];

// Utility Functions
export function logisticsDeliveryStatusGetLabel(status: LogisticsDeliveryStatusType): string {
  const labels: Record<LogisticsDeliveryStatusType, string> = {
    [LOGISTICS_DELIVERY_STATUS.TYPES.PENDING]: 'Pending',
    [LOGISTICS_DELIVERY_STATUS.TYPES.PROCESSING]: 'Processing',
    [LOGISTICS_DELIVERY_STATUS.TYPES.ASSIGNED]: 'Assigned',
    [LOGISTICS_DELIVERY_STATUS.TYPES.PICKED_UP]: 'Picked Up',
    [LOGISTICS_DELIVERY_STATUS.TYPES.IN_TRANSIT]: 'In Transit',
    [LOGISTICS_DELIVERY_STATUS.TYPES.ARRIVED]: 'Arrived',
    [LOGISTICS_DELIVERY_STATUS.TYPES.OUT_FOR_DELIVERY]: 'Out for Delivery',
    [LOGISTICS_DELIVERY_STATUS.TYPES.DELIVERED]: 'Delivered',
    [LOGISTICS_DELIVERY_STATUS.TYPES.FAILED]: 'Failed',
    [LOGISTICS_DELIVERY_STATUS.TYPES.RETURNED]: 'Returned',
    [LOGISTICS_DELIVERY_STATUS.TYPES.CANCELLED]: 'Cancelled',
  };
  return labels[status] || 'Unknown';
}

export function logisticsDeliveryStatusGetCategory(
  status: LogisticsDeliveryStatusType
): LogisticsDeliveryStatusCategory {
  const categories: Record<LogisticsDeliveryStatusType, LogisticsDeliveryStatusCategory> = {
    [LOGISTICS_DELIVERY_STATUS.TYPES.PENDING]: LOGISTICS_DELIVERY_STATUS.CATEGORIES.PENDING,
    [LOGISTICS_DELIVERY_STATUS.TYPES.PROCESSING]: LOGISTICS_DELIVERY_STATUS.CATEGORIES.PENDING,
    [LOGISTICS_DELIVERY_STATUS.TYPES.ASSIGNED]: LOGISTICS_DELIVERY_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_DELIVERY_STATUS.TYPES.PICKED_UP]: LOGISTICS_DELIVERY_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_DELIVERY_STATUS.TYPES.IN_TRANSIT]: LOGISTICS_DELIVERY_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_DELIVERY_STATUS.TYPES.ARRIVED]: LOGISTICS_DELIVERY_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_DELIVERY_STATUS.TYPES.OUT_FOR_DELIVERY]: LOGISTICS_DELIVERY_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_DELIVERY_STATUS.TYPES.DELIVERED]: LOGISTICS_DELIVERY_STATUS.CATEGORIES.COMPLETED,
    [LOGISTICS_DELIVERY_STATUS.TYPES.FAILED]: LOGISTICS_DELIVERY_STATUS.CATEGORIES.FAILED,
    [LOGISTICS_DELIVERY_STATUS.TYPES.RETURNED]: LOGISTICS_DELIVERY_STATUS.CATEGORIES.FAILED,
    [LOGISTICS_DELIVERY_STATUS.TYPES.CANCELLED]: LOGISTICS_DELIVERY_STATUS.CATEGORIES.FAILED,
  };
  return categories[status] || LOGISTICS_DELIVERY_STATUS.CATEGORIES.PENDING;
}

export function logisticsDeliveryStatusIsActive(status: LogisticsDeliveryStatusType): boolean {
  const activeStatuses: LogisticsDeliveryStatusType[] = [
    LOGISTICS_DELIVERY_STATUS.TYPES.ASSIGNED,
    LOGISTICS_DELIVERY_STATUS.TYPES.PICKED_UP,
    LOGISTICS_DELIVERY_STATUS.TYPES.IN_TRANSIT,
    LOGISTICS_DELIVERY_STATUS.TYPES.ARRIVED,
    LOGISTICS_DELIVERY_STATUS.TYPES.OUT_FOR_DELIVERY,
  ];
  return activeStatuses.includes(status);
}

export function logisticsDeliveryStatusIsComplete(status: LogisticsDeliveryStatusType): boolean {
  const completeStatuses: LogisticsDeliveryStatusType[] = [
    LOGISTICS_DELIVERY_STATUS.TYPES.DELIVERED,
    LOGISTICS_DELIVERY_STATUS.TYPES.FAILED,
    LOGISTICS_DELIVERY_STATUS.TYPES.RETURNED,
    LOGISTICS_DELIVERY_STATUS.TYPES.CANCELLED,
  ];
  return completeStatuses.includes(status);
}

export function logisticsDeliveryStatusCanTransition(
  status: LogisticsDeliveryStatusType,
  transition: LogisticsDeliveryStatusTransition
): boolean {
  const allowedTransitions: Record<
    LogisticsDeliveryStatusType,
    LogisticsDeliveryStatusTransition[]
  > = {
    [LOGISTICS_DELIVERY_STATUS.TYPES.PENDING]: [
      LOGISTICS_DELIVERY_STATUS.TRANSITIONS.PENDING_TO_PROCESSING,
      LOGISTICS_DELIVERY_STATUS.TRANSITIONS.ANY_TO_CANCELLED,
    ],
    [LOGISTICS_DELIVERY_STATUS.TYPES.PROCESSING]: [
      LOGISTICS_DELIVERY_STATUS.TRANSITIONS.PROCESSING_TO_ASSIGNED,
      LOGISTICS_DELIVERY_STATUS.TRANSITIONS.ANY_TO_CANCELLED,
    ],
    [LOGISTICS_DELIVERY_STATUS.TYPES.ASSIGNED]: [
      LOGISTICS_DELIVERY_STATUS.TRANSITIONS.ASSIGNED_TO_PICKED_UP,
    ],
    [LOGISTICS_DELIVERY_STATUS.TYPES.PICKED_UP]: [
      LOGISTICS_DELIVERY_STATUS.TRANSITIONS.PICKED_UP_TO_IN_TRANSIT,
    ],
    [LOGISTICS_DELIVERY_STATUS.TYPES.IN_TRANSIT]: [
      LOGISTICS_DELIVERY_STATUS.TRANSITIONS.IN_TRANSIT_TO_ARRIVED,
      LOGISTICS_DELIVERY_STATUS.TRANSITIONS.IN_TRANSIT_TO_RETURNED,
    ],
    [LOGISTICS_DELIVERY_STATUS.TYPES.ARRIVED]: [
      LOGISTICS_DELIVERY_STATUS.TRANSITIONS.ARRIVED_TO_OUT_FOR_DELIVERY,
    ],
    [LOGISTICS_DELIVERY_STATUS.TYPES.OUT_FOR_DELIVERY]: [
      LOGISTICS_DELIVERY_STATUS.TRANSITIONS.OUT_FOR_DELIVERY_TO_DELIVERED,
      LOGISTICS_DELIVERY_STATUS.TRANSITIONS.OUT_FOR_DELIVERY_TO_FAILED,
    ],
    [LOGISTICS_DELIVERY_STATUS.TYPES.FAILED]: [
      LOGISTICS_DELIVERY_STATUS.TRANSITIONS.FAILED_TO_RETURNED,
    ],
    [LOGISTICS_DELIVERY_STATUS.TYPES.DELIVERED]: [],
    [LOGISTICS_DELIVERY_STATUS.TYPES.RETURNED]: [],
    [LOGISTICS_DELIVERY_STATUS.TYPES.CANCELLED]: [],
  };
  return allowedTransitions[status]?.includes(transition) || false;
}
