/**
 * Fulfillment Status Constants
 * Status definitions for fulfillment
 */

export const LOGISTICS_FULFILLMENT_STATUS = {
  // Status Types
  TYPES: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    PICKING: 'picking',
    PACKING: 'packing',
    READY: 'ready',
    DISPATCHED: 'dispatched',
    IN_TRANSIT: 'in_transit',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    RETURNED: 'returned',
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
    PICKING: '#blue-500',
    PACKING: '#purple-500',
    READY: '#green-400',
    DISPATCHED: '#orange-500',
    IN_TRANSIT: '#orange-400',
    DELIVERED: '#green-600',
    FAILED: '#red-500',
    CANCELLED: '#gray-500',
    RETURNED: '#red-400',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    PENDING: '⏳',
    PROCESSING: '⚙️',
    PICKING: '📋',
    PACKING: '📦',
    READY: '✅',
    DISPATCHED: '🚚',
    IN_TRANSIT: '🚛',
    DELIVERED: '🎯',
    FAILED: '❌',
    CANCELLED: '🚫',
    RETURNED: '↩️',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    PENDING_TO_PROCESSING: 'pending_to_processing',
    PROCESSING_TO_PICKING: 'processing_to_picking',
    PICKING_TO_PACKING: 'picking_to_packing',
    PACKING_TO_READY: 'packing_to_ready',
    READY_TO_DISPATCHED: 'ready_to_dispatched',
    DISPATCHED_TO_IN_TRANSIT: 'dispatched_to_in_transit',
    IN_TRANSIT_TO_DELIVERED: 'in_transit_to_delivered',
    IN_TRANSIT_TO_FAILED: 'in_transit_to_failed',
    ANY_TO_CANCELLED: 'any_to_cancelled',
    DELIVERED_TO_RETURNED: 'delivered_to_returned',
    FAILED_TO_RETURNED: 'failed_to_returned',
  } as const,
} as const;

// Status Types
export type LogisticsFulfillmentStatusType =
  (typeof LOGISTICS_FULFILLMENT_STATUS.TYPES)[keyof typeof LOGISTICS_FULFILLMENT_STATUS.TYPES];

// Status Categories
export type LogisticsFulfillmentStatusCategory =
  (typeof LOGISTICS_FULFILLMENT_STATUS.CATEGORIES)[keyof typeof LOGISTICS_FULFILLMENT_STATUS.CATEGORIES];

// Status Colors
export type LogisticsFulfillmentStatusColor =
  (typeof LOGISTICS_FULFILLMENT_STATUS.COLORS)[keyof typeof LOGISTICS_FULFILLMENT_STATUS.COLORS];

// Status Icons
export type LogisticsFulfillmentStatusIcon =
  (typeof LOGISTICS_FULFILLMENT_STATUS.ICONS)[keyof typeof LOGISTICS_FULFILLMENT_STATUS.ICONS];

// Status Transitions
export type LogisticsFulfillmentStatusTransition =
  (typeof LOGISTICS_FULFILLMENT_STATUS.TRANSITIONS)[keyof typeof LOGISTICS_FULFILLMENT_STATUS.TRANSITIONS];

// Utility Functions
export function logisticsFulfillmentStatusGetLabel(status: LogisticsFulfillmentStatusType): string {
  const labels: Record<LogisticsFulfillmentStatusType, string> = {
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.PENDING]: 'Pending',
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.PROCESSING]: 'Processing',
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.PICKING]: 'Picking',
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.PACKING]: 'Packing',
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.READY]: 'Ready',
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.DISPATCHED]: 'Dispatched',
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.IN_TRANSIT]: 'In Transit',
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.DELIVERED]: 'Delivered',
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.FAILED]: 'Failed',
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.CANCELLED]: 'Cancelled',
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.RETURNED]: 'Returned',
  };
  return labels[status] || 'Unknown';
}

export function logisticsFulfillmentStatusGetCategory(
  status: LogisticsFulfillmentStatusType
): LogisticsFulfillmentStatusCategory {
  const categories: Record<LogisticsFulfillmentStatusType, LogisticsFulfillmentStatusCategory> = {
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.PENDING]: LOGISTICS_FULFILLMENT_STATUS.CATEGORIES.PENDING,
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.PROCESSING]: LOGISTICS_FULFILLMENT_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.PICKING]: LOGISTICS_FULFILLMENT_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.PACKING]: LOGISTICS_FULFILLMENT_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.READY]: LOGISTICS_FULFILLMENT_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.DISPATCHED]: LOGISTICS_FULFILLMENT_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.IN_TRANSIT]: LOGISTICS_FULFILLMENT_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.DELIVERED]:
      LOGISTICS_FULFILLMENT_STATUS.CATEGORIES.COMPLETED,
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.FAILED]: LOGISTICS_FULFILLMENT_STATUS.CATEGORIES.FAILED,
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.CANCELLED]: LOGISTICS_FULFILLMENT_STATUS.CATEGORIES.FAILED,
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.RETURNED]: LOGISTICS_FULFILLMENT_STATUS.CATEGORIES.FAILED,
  };
  return categories[status] || LOGISTICS_FULFILLMENT_STATUS.CATEGORIES.PENDING;
}

export function logisticsFulfillmentStatusIsComplete(
  status: LogisticsFulfillmentStatusType
): boolean {
  const completeStatuses: LogisticsFulfillmentStatusType[] = [
    LOGISTICS_FULFILLMENT_STATUS.TYPES.DELIVERED,
    LOGISTICS_FULFILLMENT_STATUS.TYPES.FAILED,
    LOGISTICS_FULFILLMENT_STATUS.TYPES.CANCELLED,
    LOGISTICS_FULFILLMENT_STATUS.TYPES.RETURNED,
  ];
  return completeStatuses.includes(status);
}

export function logisticsFulfillmentStatusIsInProgress(
  status: LogisticsFulfillmentStatusType
): boolean {
  const inProgressStatuses: LogisticsFulfillmentStatusType[] = [
    LOGISTICS_FULFILLMENT_STATUS.TYPES.PROCESSING,
    LOGISTICS_FULFILLMENT_STATUS.TYPES.PICKING,
    LOGISTICS_FULFILLMENT_STATUS.TYPES.PACKING,
    LOGISTICS_FULFILLMENT_STATUS.TYPES.READY,
    LOGISTICS_FULFILLMENT_STATUS.TYPES.DISPATCHED,
    LOGISTICS_FULFILLMENT_STATUS.TYPES.IN_TRANSIT,
  ];
  return inProgressStatuses.includes(status);
}

export function logisticsFulfillmentStatusCanTransition(
  status: LogisticsFulfillmentStatusType,
  transition: LogisticsFulfillmentStatusTransition
): boolean {
  const allowedTransitions: Record<
    LogisticsFulfillmentStatusType,
    LogisticsFulfillmentStatusTransition[]
  > = {
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.PENDING]: [
      LOGISTICS_FULFILLMENT_STATUS.TRANSITIONS.PENDING_TO_PROCESSING,
      LOGISTICS_FULFILLMENT_STATUS.TRANSITIONS.ANY_TO_CANCELLED,
    ],
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.PROCESSING]: [
      LOGISTICS_FULFILLMENT_STATUS.TRANSITIONS.PROCESSING_TO_PICKING,
      LOGISTICS_FULFILLMENT_STATUS.TRANSITIONS.ANY_TO_CANCELLED,
    ],
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.PICKING]: [
      LOGISTICS_FULFILLMENT_STATUS.TRANSITIONS.PICKING_TO_PACKING,
    ],
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.PACKING]: [
      LOGISTICS_FULFILLMENT_STATUS.TRANSITIONS.PACKING_TO_READY,
    ],
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.READY]: [
      LOGISTICS_FULFILLMENT_STATUS.TRANSITIONS.READY_TO_DISPATCHED,
    ],
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.DISPATCHED]: [
      LOGISTICS_FULFILLMENT_STATUS.TRANSITIONS.DISPATCHED_TO_IN_TRANSIT,
    ],
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.IN_TRANSIT]: [
      LOGISTICS_FULFILLMENT_STATUS.TRANSITIONS.IN_TRANSIT_TO_DELIVERED,
      LOGISTICS_FULFILLMENT_STATUS.TRANSITIONS.IN_TRANSIT_TO_FAILED,
    ],
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.FAILED]: [
      LOGISTICS_FULFILLMENT_STATUS.TRANSITIONS.FAILED_TO_RETURNED,
    ],
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.DELIVERED]: [
      LOGISTICS_FULFILLMENT_STATUS.TRANSITIONS.DELIVERED_TO_RETURNED,
    ],
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.CANCELLED]: [],
    [LOGISTICS_FULFILLMENT_STATUS.TYPES.RETURNED]: [],
  };
  return allowedTransitions[status]?.includes(transition) || false;
}
