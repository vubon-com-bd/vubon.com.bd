/**
 * Shipment Status Constants
 * Status definitions for shipments
 */

export const LOGISTICS_SHIPMENT_STATUS = {
  // Status Types
  TYPES: {
    CREATED: 'created',
    BOOKED: 'booked',
    PICKED_UP: 'picked_up',
    PROCESSED: 'processed',
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
    CREATED: '#gray-400',
    BOOKED: '#blue-400',
    PICKED_UP: '#blue-500',
    PROCESSED: '#purple-500',
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
    CREATED: '📝',
    BOOKED: '📋',
    PICKED_UP: '📦',
    PROCESSED: '⚙️',
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
    CREATED_TO_BOOKED: 'created_to_booked',
    BOOKED_TO_PICKED_UP: 'booked_to_picked_up',
    PICKED_UP_TO_PROCESSED: 'picked_up_to_processed',
    PROCESSED_TO_IN_TRANSIT: 'processed_to_in_transit',
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
export type LogisticsShipmentStatusType =
  (typeof LOGISTICS_SHIPMENT_STATUS.TYPES)[keyof typeof LOGISTICS_SHIPMENT_STATUS.TYPES];

// Status Categories
export type LogisticsShipmentStatusCategory =
  (typeof LOGISTICS_SHIPMENT_STATUS.CATEGORIES)[keyof typeof LOGISTICS_SHIPMENT_STATUS.CATEGORIES];

// Status Colors
export type LogisticsShipmentStatusColor =
  (typeof LOGISTICS_SHIPMENT_STATUS.COLORS)[keyof typeof LOGISTICS_SHIPMENT_STATUS.COLORS];

// Status Icons
export type LogisticsShipmentStatusIcon =
  (typeof LOGISTICS_SHIPMENT_STATUS.ICONS)[keyof typeof LOGISTICS_SHIPMENT_STATUS.ICONS];

// Status Transitions
export type LogisticsShipmentStatusTransition =
  (typeof LOGISTICS_SHIPMENT_STATUS.TRANSITIONS)[keyof typeof LOGISTICS_SHIPMENT_STATUS.TRANSITIONS];

// Utility Functions
export function logisticsShipmentStatusGetLabel(status: LogisticsShipmentStatusType): string {
  const labels: Record<LogisticsShipmentStatusType, string> = {
    [LOGISTICS_SHIPMENT_STATUS.TYPES.CREATED]: 'Created',
    [LOGISTICS_SHIPMENT_STATUS.TYPES.BOOKED]: 'Booked',
    [LOGISTICS_SHIPMENT_STATUS.TYPES.PICKED_UP]: 'Picked Up',
    [LOGISTICS_SHIPMENT_STATUS.TYPES.PROCESSED]: 'Processed',
    [LOGISTICS_SHIPMENT_STATUS.TYPES.IN_TRANSIT]: 'In Transit',
    [LOGISTICS_SHIPMENT_STATUS.TYPES.ARRIVED]: 'Arrived',
    [LOGISTICS_SHIPMENT_STATUS.TYPES.OUT_FOR_DELIVERY]: 'Out for Delivery',
    [LOGISTICS_SHIPMENT_STATUS.TYPES.DELIVERED]: 'Delivered',
    [LOGISTICS_SHIPMENT_STATUS.TYPES.FAILED]: 'Failed',
    [LOGISTICS_SHIPMENT_STATUS.TYPES.RETURNED]: 'Returned',
    [LOGISTICS_SHIPMENT_STATUS.TYPES.CANCELLED]: 'Cancelled',
  };
  return labels[status] || 'Unknown';
}

export function logisticsShipmentStatusGetCategory(
  status: LogisticsShipmentStatusType
): LogisticsShipmentStatusCategory {
  const categories: Record<LogisticsShipmentStatusType, LogisticsShipmentStatusCategory> = {
    [LOGISTICS_SHIPMENT_STATUS.TYPES.CREATED]: LOGISTICS_SHIPMENT_STATUS.CATEGORIES.PENDING,
    [LOGISTICS_SHIPMENT_STATUS.TYPES.BOOKED]: LOGISTICS_SHIPMENT_STATUS.CATEGORIES.PENDING,
    [LOGISTICS_SHIPMENT_STATUS.TYPES.PICKED_UP]: LOGISTICS_SHIPMENT_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_SHIPMENT_STATUS.TYPES.PROCESSED]: LOGISTICS_SHIPMENT_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_SHIPMENT_STATUS.TYPES.IN_TRANSIT]: LOGISTICS_SHIPMENT_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_SHIPMENT_STATUS.TYPES.ARRIVED]: LOGISTICS_SHIPMENT_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_SHIPMENT_STATUS.TYPES.OUT_FOR_DELIVERY]: LOGISTICS_SHIPMENT_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_SHIPMENT_STATUS.TYPES.DELIVERED]: LOGISTICS_SHIPMENT_STATUS.CATEGORIES.COMPLETED,
    [LOGISTICS_SHIPMENT_STATUS.TYPES.FAILED]: LOGISTICS_SHIPMENT_STATUS.CATEGORIES.FAILED,
    [LOGISTICS_SHIPMENT_STATUS.TYPES.RETURNED]: LOGISTICS_SHIPMENT_STATUS.CATEGORIES.FAILED,
    [LOGISTICS_SHIPMENT_STATUS.TYPES.CANCELLED]: LOGISTICS_SHIPMENT_STATUS.CATEGORIES.FAILED,
  };
  return categories[status] || LOGISTICS_SHIPMENT_STATUS.CATEGORIES.PENDING;
}

export function logisticsShipmentStatusIsActive(status: LogisticsShipmentStatusType): boolean {
  const activeStatuses: LogisticsShipmentStatusType[] = [
    LOGISTICS_SHIPMENT_STATUS.TYPES.PICKED_UP,
    LOGISTICS_SHIPMENT_STATUS.TYPES.PROCESSED,
    LOGISTICS_SHIPMENT_STATUS.TYPES.IN_TRANSIT,
    LOGISTICS_SHIPMENT_STATUS.TYPES.ARRIVED,
    LOGISTICS_SHIPMENT_STATUS.TYPES.OUT_FOR_DELIVERY,
  ];
  return activeStatuses.includes(status);
}

export function logisticsShipmentStatusIsComplete(status: LogisticsShipmentStatusType): boolean {
  const completeStatuses: LogisticsShipmentStatusType[] = [
    LOGISTICS_SHIPMENT_STATUS.TYPES.DELIVERED,
    LOGISTICS_SHIPMENT_STATUS.TYPES.FAILED,
    LOGISTICS_SHIPMENT_STATUS.TYPES.RETURNED,
    LOGISTICS_SHIPMENT_STATUS.TYPES.CANCELLED,
  ];
  return completeStatuses.includes(status);
}

export function logisticsShipmentStatusCanTransition(
  status: LogisticsShipmentStatusType,
  transition: LogisticsShipmentStatusTransition
): boolean {
  const allowedTransitions: Record<
    LogisticsShipmentStatusType,
    LogisticsShipmentStatusTransition[]
  > = {
    [LOGISTICS_SHIPMENT_STATUS.TYPES.CREATED]: [
      LOGISTICS_SHIPMENT_STATUS.TRANSITIONS.CREATED_TO_BOOKED,
      LOGISTICS_SHIPMENT_STATUS.TRANSITIONS.ANY_TO_CANCELLED,
    ],
    [LOGISTICS_SHIPMENT_STATUS.TYPES.BOOKED]: [
      LOGISTICS_SHIPMENT_STATUS.TRANSITIONS.BOOKED_TO_PICKED_UP,
      LOGISTICS_SHIPMENT_STATUS.TRANSITIONS.ANY_TO_CANCELLED,
    ],
    [LOGISTICS_SHIPMENT_STATUS.TYPES.PICKED_UP]: [
      LOGISTICS_SHIPMENT_STATUS.TRANSITIONS.PICKED_UP_TO_PROCESSED,
    ],
    [LOGISTICS_SHIPMENT_STATUS.TYPES.PROCESSED]: [
      LOGISTICS_SHIPMENT_STATUS.TRANSITIONS.PROCESSED_TO_IN_TRANSIT,
    ],
    [LOGISTICS_SHIPMENT_STATUS.TYPES.IN_TRANSIT]: [
      LOGISTICS_SHIPMENT_STATUS.TRANSITIONS.IN_TRANSIT_TO_ARRIVED,
      LOGISTICS_SHIPMENT_STATUS.TRANSITIONS.IN_TRANSIT_TO_RETURNED,
    ],
    [LOGISTICS_SHIPMENT_STATUS.TYPES.ARRIVED]: [
      LOGISTICS_SHIPMENT_STATUS.TRANSITIONS.ARRIVED_TO_OUT_FOR_DELIVERY,
    ],
    [LOGISTICS_SHIPMENT_STATUS.TYPES.OUT_FOR_DELIVERY]: [
      LOGISTICS_SHIPMENT_STATUS.TRANSITIONS.OUT_FOR_DELIVERY_TO_DELIVERED,
      LOGISTICS_SHIPMENT_STATUS.TRANSITIONS.OUT_FOR_DELIVERY_TO_FAILED,
    ],
    [LOGISTICS_SHIPMENT_STATUS.TYPES.FAILED]: [
      LOGISTICS_SHIPMENT_STATUS.TRANSITIONS.FAILED_TO_RETURNED,
    ],
    [LOGISTICS_SHIPMENT_STATUS.TYPES.DELIVERED]: [],
    [LOGISTICS_SHIPMENT_STATUS.TYPES.RETURNED]: [],
    [LOGISTICS_SHIPMENT_STATUS.TYPES.CANCELLED]: [],
  };
  return allowedTransitions[status]?.includes(transition) || false;
}
