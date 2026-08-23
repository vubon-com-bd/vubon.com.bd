/**
 * Delivery Status Constants
 * Status definitions for deliveries
 */

export const DELIVERY_STATUS = {
  // Delivery Statuses
  STATUSES: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    PREPARING: 'preparing',
    DISPATCHED: 'dispatched',
    IN_TRANSIT: 'in_transit',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    RETURNED: 'returned',
    CANCELLED: 'cancelled',
    DELAYED: 'delayed',
    ON_HOLD: 'on_hold',
    PICKUP_READY: 'pickup_ready',
    PICKED_UP: 'picked_up',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    PENDING: '#F59E0B',
    PROCESSING: '#3B82F6',
    PREPARING: '#8B5CF6',
    DISPATCHED: '#3B82F6',
    IN_TRANSIT: '#3B82F6',
    OUT_FOR_DELIVERY: '#10B981',
    DELIVERED: '#10B981',
    FAILED: '#EF4444',
    RETURNED: '#6B7280',
    CANCELLED: '#6B7280',
    DELAYED: '#F59E0B',
    ON_HOLD: '#F59E0B',
    PICKUP_READY: '#10B981',
    PICKED_UP: '#10B981',
  } as const,

  // Status Categories
  CATEGORIES: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    IN_TRANSIT: 'in_transit',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  } as const,

  // Status Priority Order
  ORDER: {
    PENDING: 0,
    PROCESSING: 1,
    PREPARING: 2,
    DISPATCHED: 3,
    IN_TRANSIT: 4,
    OUT_FOR_DELIVERY: 5,
    DELIVERED: 6,
    PICKUP_READY: 7,
    PICKED_UP: 8,
    DELAYED: 9,
    ON_HOLD: 10,
    FAILED: 11,
    RETURNED: 12,
    CANCELLED: 13,
  } as const,

  // Status Transitions
  TRANSITIONS: {
    PENDING_TO_PROCESSING: 'pending_to_processing',
    PENDING_TO_CANCELLED: 'pending_to_cancelled',
    PROCESSING_TO_PREPARING: 'processing_to_preparing',
    PROCESSING_TO_DELAYED: 'processing_to_delayed',
    PROCESSING_TO_ON_HOLD: 'processing_to_on_hold',
    PROCESSING_TO_CANCELLED: 'processing_to_cancelled',
    PREPARING_TO_DISPATCHED: 'preparing_to_dispatched',
    PREPARING_TO_CANCELLED: 'preparing_to_cancelled',
    DISPATCHED_TO_IN_TRANSIT: 'dispatched_to_in_transit',
    DISPATCHED_TO_DELAYED: 'dispatched_to_delayed',
    DISPATCHED_TO_CANCELLED: 'dispatched_to_cancelled',
    IN_TRANSIT_TO_OUT_FOR_DELIVERY: 'in_transit_to_out_for_delivery',
    IN_TRANSIT_TO_DELAYED: 'in_transit_to_delayed',
    IN_TRANSIT_TO_CANCELLED: 'in_transit_to_cancelled',
    OUT_FOR_DELIVERY_TO_DELIVERED: 'out_for_delivery_to_delivered',
    OUT_FOR_DELIVERY_TO_FAILED: 'out_for_delivery_to_failed',
    OUT_FOR_DELIVERY_TO_RETURNED: 'out_for_delivery_to_returned',
    DELIVERED_TO_RETURNED: 'delivered_to_returned',
    DELAYED_TO_IN_TRANSIT: 'delayed_to_in_transit',
    DELAYED_TO_OUT_FOR_DELIVERY: 'delayed_to_out_for_delivery',
    ON_HOLD_TO_PROCESSING: 'on_hold_to_processing',
    ON_HOLD_TO_CANCELLED: 'on_hold_to_cancelled',
    FAILED_TO_RETURNED: 'failed_to_returned',
    PICKUP_READY_TO_PICKED_UP: 'pickup_ready_to_picked_up',
    PICKUP_READY_TO_CANCELLED: 'pickup_ready_to_cancelled',
    PICKED_UP_TO_DELIVERED: 'picked_up_to_delivered',
    RETURNED_TO_CANCELLED: 'returned_to_cancelled',
    CANCELLED_TO_ARCHIVED: 'cancelled_to_archived',
  } as const,
} as const;

// Delivery Statuses
export type DeliveryStatusType =
  (typeof DELIVERY_STATUS.STATUSES)[keyof typeof DELIVERY_STATUS.STATUSES];

// Status Colors
export type DeliveryStatusColor =
  (typeof DELIVERY_STATUS.COLORS)[keyof typeof DELIVERY_STATUS.COLORS];

// Status Categories
export type DeliveryStatusCategory =
  (typeof DELIVERY_STATUS.CATEGORIES)[keyof typeof DELIVERY_STATUS.CATEGORIES];

// Status Priority Order
export type DeliveryStatusOrder =
  (typeof DELIVERY_STATUS.ORDER)[keyof typeof DELIVERY_STATUS.ORDER];

// Status Transitions
export type DeliveryStatusTransition =
  (typeof DELIVERY_STATUS.TRANSITIONS)[keyof typeof DELIVERY_STATUS.TRANSITIONS];

// Utility Functions
export function deliverystatusGetStatusLabel(status: DeliveryStatusType): string {
  const labels: Record<DeliveryStatusType, string> = {
    [DELIVERY_STATUS.STATUSES.PENDING]: 'Pending',
    [DELIVERY_STATUS.STATUSES.PROCESSING]: 'Processing',
    [DELIVERY_STATUS.STATUSES.PREPARING]: 'Preparing',
    [DELIVERY_STATUS.STATUSES.DISPATCHED]: 'Dispatched',
    [DELIVERY_STATUS.STATUSES.IN_TRANSIT]: 'In Transit',
    [DELIVERY_STATUS.STATUSES.OUT_FOR_DELIVERY]: 'Out for Delivery',
    [DELIVERY_STATUS.STATUSES.DELIVERED]: 'Delivered',
    [DELIVERY_STATUS.STATUSES.FAILED]: 'Failed',
    [DELIVERY_STATUS.STATUSES.RETURNED]: 'Returned',
    [DELIVERY_STATUS.STATUSES.CANCELLED]: 'Cancelled',
    [DELIVERY_STATUS.STATUSES.DELAYED]: 'Delayed',
    [DELIVERY_STATUS.STATUSES.ON_HOLD]: 'On Hold',
    [DELIVERY_STATUS.STATUSES.PICKUP_READY]: 'Pickup Ready',
    [DELIVERY_STATUS.STATUSES.PICKED_UP]: 'Picked Up',
  };
  return labels[status] || 'Unknown Status';
}

export function deliverystatusGetStatusColor(status: DeliveryStatusType): DeliveryStatusColor {
  const colors: Record<DeliveryStatusType, DeliveryStatusColor> = {
    [DELIVERY_STATUS.STATUSES.PENDING]: DELIVERY_STATUS.COLORS.PENDING,
    [DELIVERY_STATUS.STATUSES.PROCESSING]: DELIVERY_STATUS.COLORS.PROCESSING,
    [DELIVERY_STATUS.STATUSES.PREPARING]: DELIVERY_STATUS.COLORS.PREPARING,
    [DELIVERY_STATUS.STATUSES.DISPATCHED]: DELIVERY_STATUS.COLORS.DISPATCHED,
    [DELIVERY_STATUS.STATUSES.IN_TRANSIT]: DELIVERY_STATUS.COLORS.IN_TRANSIT,
    [DELIVERY_STATUS.STATUSES.OUT_FOR_DELIVERY]: DELIVERY_STATUS.COLORS.OUT_FOR_DELIVERY,
    [DELIVERY_STATUS.STATUSES.DELIVERED]: DELIVERY_STATUS.COLORS.DELIVERED,
    [DELIVERY_STATUS.STATUSES.FAILED]: DELIVERY_STATUS.COLORS.FAILED,
    [DELIVERY_STATUS.STATUSES.RETURNED]: DELIVERY_STATUS.COLORS.RETURNED,
    [DELIVERY_STATUS.STATUSES.CANCELLED]: DELIVERY_STATUS.COLORS.CANCELLED,
    [DELIVERY_STATUS.STATUSES.DELAYED]: DELIVERY_STATUS.COLORS.DELAYED,
    [DELIVERY_STATUS.STATUSES.ON_HOLD]: DELIVERY_STATUS.COLORS.ON_HOLD,
    [DELIVERY_STATUS.STATUSES.PICKUP_READY]: DELIVERY_STATUS.COLORS.PICKUP_READY,
    [DELIVERY_STATUS.STATUSES.PICKED_UP]: DELIVERY_STATUS.COLORS.PICKED_UP,
  };
  return colors[status] || DELIVERY_STATUS.COLORS.PENDING;
}

export function deliverystatusGetStatusCategory(
  status: DeliveryStatusType
): DeliveryStatusCategory {
  const categories: Record<DeliveryStatusType, DeliveryStatusCategory> = {
    [DELIVERY_STATUS.STATUSES.PENDING]: DELIVERY_STATUS.CATEGORIES.PENDING,
    [DELIVERY_STATUS.STATUSES.PROCESSING]: DELIVERY_STATUS.CATEGORIES.PROCESSING,
    [DELIVERY_STATUS.STATUSES.PREPARING]: DELIVERY_STATUS.CATEGORIES.PROCESSING,
    [DELIVERY_STATUS.STATUSES.DISPATCHED]: DELIVERY_STATUS.CATEGORIES.IN_TRANSIT,
    [DELIVERY_STATUS.STATUSES.IN_TRANSIT]: DELIVERY_STATUS.CATEGORIES.IN_TRANSIT,
    [DELIVERY_STATUS.STATUSES.OUT_FOR_DELIVERY]: DELIVERY_STATUS.CATEGORIES.IN_TRANSIT,
    [DELIVERY_STATUS.STATUSES.DELAYED]: DELIVERY_STATUS.CATEGORIES.IN_TRANSIT,
    [DELIVERY_STATUS.STATUSES.ON_HOLD]: DELIVERY_STATUS.CATEGORIES.PENDING,
    [DELIVERY_STATUS.STATUSES.DELIVERED]: DELIVERY_STATUS.CATEGORIES.DELIVERED,
    [DELIVERY_STATUS.STATUSES.PICKUP_READY]: DELIVERY_STATUS.CATEGORIES.DELIVERED,
    [DELIVERY_STATUS.STATUSES.PICKED_UP]: DELIVERY_STATUS.CATEGORIES.DELIVERED,
    [DELIVERY_STATUS.STATUSES.FAILED]: DELIVERY_STATUS.CATEGORIES.FAILED,
    [DELIVERY_STATUS.STATUSES.RETURNED]: DELIVERY_STATUS.CATEGORIES.FAILED,
    [DELIVERY_STATUS.STATUSES.CANCELLED]: DELIVERY_STATUS.CATEGORIES.CANCELLED,
  };
  return categories[status] || DELIVERY_STATUS.CATEGORIES.PENDING;
}

export function deliverystatusIsDelivered(status: DeliveryStatusType): boolean {
  const deliveredStatuses: DeliveryStatusType[] = [
    DELIVERY_STATUS.STATUSES.DELIVERED,
    DELIVERY_STATUS.STATUSES.PICKUP_READY,
    DELIVERY_STATUS.STATUSES.PICKED_UP,
  ];
  return deliveredStatuses.includes(status);
}

export function deliverystatusIsInTransit(status: DeliveryStatusType): boolean {
  const inTransitStatuses: DeliveryStatusType[] = [
    DELIVERY_STATUS.STATUSES.DISPATCHED,
    DELIVERY_STATUS.STATUSES.IN_TRANSIT,
    DELIVERY_STATUS.STATUSES.OUT_FOR_DELIVERY,
  ];
  return inTransitStatuses.includes(status);
}

export function deliverystatusIsFailed(status: DeliveryStatusType): boolean {
  const failedStatuses: DeliveryStatusType[] = [
    DELIVERY_STATUS.STATUSES.FAILED,
    DELIVERY_STATUS.STATUSES.RETURNED,
  ];
  return failedStatuses.includes(status);
}

export function deliverystatusIsPending(status: DeliveryStatusType): boolean {
  const pendingStatuses: DeliveryStatusType[] = [
    DELIVERY_STATUS.STATUSES.PENDING,
    DELIVERY_STATUS.STATUSES.PROCESSING,
    DELIVERY_STATUS.STATUSES.PREPARING,
  ];
  return pendingStatuses.includes(status);
}

export function deliverystatusCanTransition(
  currentStatus: DeliveryStatusType,
  targetStatus: DeliveryStatusType
): boolean {
  const validTransitions: Record<DeliveryStatusType, DeliveryStatusType[]> = {
    [DELIVERY_STATUS.STATUSES.PENDING]: [
      DELIVERY_STATUS.STATUSES.PROCESSING,
      DELIVERY_STATUS.STATUSES.CANCELLED,
    ],
    [DELIVERY_STATUS.STATUSES.PROCESSING]: [
      DELIVERY_STATUS.STATUSES.PREPARING,
      DELIVERY_STATUS.STATUSES.DELAYED,
      DELIVERY_STATUS.STATUSES.ON_HOLD,
      DELIVERY_STATUS.STATUSES.CANCELLED,
    ],
    [DELIVERY_STATUS.STATUSES.PREPARING]: [
      DELIVERY_STATUS.STATUSES.DISPATCHED,
      DELIVERY_STATUS.STATUSES.CANCELLED,
    ],
    [DELIVERY_STATUS.STATUSES.DISPATCHED]: [
      DELIVERY_STATUS.STATUSES.IN_TRANSIT,
      DELIVERY_STATUS.STATUSES.DELAYED,
      DELIVERY_STATUS.STATUSES.CANCELLED,
    ],
    [DELIVERY_STATUS.STATUSES.IN_TRANSIT]: [
      DELIVERY_STATUS.STATUSES.OUT_FOR_DELIVERY,
      DELIVERY_STATUS.STATUSES.DELAYED,
      DELIVERY_STATUS.STATUSES.CANCELLED,
    ],
    [DELIVERY_STATUS.STATUSES.OUT_FOR_DELIVERY]: [
      DELIVERY_STATUS.STATUSES.DELIVERED,
      DELIVERY_STATUS.STATUSES.FAILED,
      DELIVERY_STATUS.STATUSES.RETURNED,
    ],
    [DELIVERY_STATUS.STATUSES.DELAYED]: [
      DELIVERY_STATUS.STATUSES.IN_TRANSIT,
      DELIVERY_STATUS.STATUSES.OUT_FOR_DELIVERY,
    ],
    [DELIVERY_STATUS.STATUSES.ON_HOLD]: [
      DELIVERY_STATUS.STATUSES.PROCESSING,
      DELIVERY_STATUS.STATUSES.CANCELLED,
    ],
    [DELIVERY_STATUS.STATUSES.DELIVERED]: [DELIVERY_STATUS.STATUSES.RETURNED],
    [DELIVERY_STATUS.STATUSES.PICKUP_READY]: [
      DELIVERY_STATUS.STATUSES.PICKED_UP,
      DELIVERY_STATUS.STATUSES.CANCELLED,
    ],
    [DELIVERY_STATUS.STATUSES.PICKED_UP]: [DELIVERY_STATUS.STATUSES.DELIVERED],
    [DELIVERY_STATUS.STATUSES.FAILED]: [DELIVERY_STATUS.STATUSES.RETURNED],
    [DELIVERY_STATUS.STATUSES.RETURNED]: [DELIVERY_STATUS.STATUSES.CANCELLED],
    [DELIVERY_STATUS.STATUSES.CANCELLED]: [],
  };

  return validTransitions[currentStatus]?.includes(targetStatus) || false;
}
