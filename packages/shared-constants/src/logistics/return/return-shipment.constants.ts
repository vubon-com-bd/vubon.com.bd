/**
 * Return Shipment Constants
 * Configuration for return shipments - Bangladesh based
 */

export const LOGISTICS_RETURN_SHIPMENT = {
  // Return Types
  TYPES: {
    CUSTOMER_INITIATED: 'customer_initiated',
    VENDOR_INITIATED: 'vendor_initiated',
    SYSTEM_INITIATED: 'system_initiated',
    DELIVERY_FAILED: 'delivery_failed',
    DAMAGED: 'damaged',
    WRONG_ITEM: 'wrong_item',
    QUALITY_ISSUE: 'quality_issue',
    EXCHANGE: 'exchange',
    WARRANTY: 'warranty',
  } as const,

  // Return Statuses
  STATUS: {
    REQUESTED: 'requested',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PENDING_PICKUP: 'pending_pickup',
    PICKED_UP: 'picked_up',
    IN_TRANSIT: 'in_transit',
    RECEIVED: 'received',
    INSPECTING: 'inspecting',
    PROCESSING: 'processing',
    REFUNDED: 'refunded',
    EXCHANGED: 'exchanged',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
  } as const,

  // Return Priorities
  PRIORITIES: {
    CRITICAL: 5,
    HIGH: 4,
    MEDIUM: 3,
    LOW: 2,
    BACKGROUND: 1,
  } as const,

  // Return Methods
  METHODS: {
    PICKUP: 'pickup',
    DROP_OFF: 'drop_off',
    COURIER: 'courier',
    POSTAL: 'postal',
    STORE: 'store',
  } as const,

  // Return Time Windows (in days)
  TIME_WINDOWS: {
    STANDARD: 7,
    EXTENDED: 14,
    PREMIUM: 30,
    INTERNATIONAL: 45,
  } as const,

  // Return Limits
  LIMITS: {
    MAX_ITEMS: 50,
    MAX_WEIGHT_KG: 20,
    MAX_VALUE_BDT: 500000,
    MAX_RETURNS_PER_YEAR: 10,
    MAX_RETURNS_PER_MONTH: 3,
  } as const,
} as const;

// Return Types
export type LogisticsReturnShipmentType =
  (typeof LOGISTICS_RETURN_SHIPMENT.TYPES)[keyof typeof LOGISTICS_RETURN_SHIPMENT.TYPES];

// Return Statuses
export type LogisticsReturnShipmentStatus =
  (typeof LOGISTICS_RETURN_SHIPMENT.STATUS)[keyof typeof LOGISTICS_RETURN_SHIPMENT.STATUS];

// Return Priorities
export type LogisticsReturnShipmentPriority =
  (typeof LOGISTICS_RETURN_SHIPMENT.PRIORITIES)[keyof typeof LOGISTICS_RETURN_SHIPMENT.PRIORITIES];

// Return Methods
export type LogisticsReturnShipmentMethod =
  (typeof LOGISTICS_RETURN_SHIPMENT.METHODS)[keyof typeof LOGISTICS_RETURN_SHIPMENT.METHODS];

// Utility Functions
export function logisticsReturnShipmentGetTypeLabel(type: LogisticsReturnShipmentType): string {
  const labels: Record<LogisticsReturnShipmentType, string> = {
    [LOGISTICS_RETURN_SHIPMENT.TYPES.CUSTOMER_INITIATED]: 'Customer Initiated',
    [LOGISTICS_RETURN_SHIPMENT.TYPES.VENDOR_INITIATED]: 'Vendor Initiated',
    [LOGISTICS_RETURN_SHIPMENT.TYPES.SYSTEM_INITIATED]: 'System Initiated',
    [LOGISTICS_RETURN_SHIPMENT.TYPES.DELIVERY_FAILED]: 'Delivery Failed',
    [LOGISTICS_RETURN_SHIPMENT.TYPES.DAMAGED]: 'Damaged',
    [LOGISTICS_RETURN_SHIPMENT.TYPES.WRONG_ITEM]: 'Wrong Item',
    [LOGISTICS_RETURN_SHIPMENT.TYPES.QUALITY_ISSUE]: 'Quality Issue',
    [LOGISTICS_RETURN_SHIPMENT.TYPES.EXCHANGE]: 'Exchange',
    [LOGISTICS_RETURN_SHIPMENT.TYPES.WARRANTY]: 'Warranty',
  };
  return labels[type] || 'Unknown';
}

export function logisticsReturnShipmentGetStatusLabel(
  status: LogisticsReturnShipmentStatus
): string {
  const labels: Record<LogisticsReturnShipmentStatus, string> = {
    [LOGISTICS_RETURN_SHIPMENT.STATUS.REQUESTED]: 'Requested',
    [LOGISTICS_RETURN_SHIPMENT.STATUS.APPROVED]: 'Approved',
    [LOGISTICS_RETURN_SHIPMENT.STATUS.REJECTED]: 'Rejected',
    [LOGISTICS_RETURN_SHIPMENT.STATUS.PENDING_PICKUP]: 'Pending Pickup',
    [LOGISTICS_RETURN_SHIPMENT.STATUS.PICKED_UP]: 'Picked Up',
    [LOGISTICS_RETURN_SHIPMENT.STATUS.IN_TRANSIT]: 'In Transit',
    [LOGISTICS_RETURN_SHIPMENT.STATUS.RECEIVED]: 'Received',
    [LOGISTICS_RETURN_SHIPMENT.STATUS.INSPECTING]: 'Inspecting',
    [LOGISTICS_RETURN_SHIPMENT.STATUS.PROCESSING]: 'Processing',
    [LOGISTICS_RETURN_SHIPMENT.STATUS.REFUNDED]: 'Refunded',
    [LOGISTICS_RETURN_SHIPMENT.STATUS.EXCHANGED]: 'Exchanged',
    [LOGISTICS_RETURN_SHIPMENT.STATUS.COMPLETED]: 'Completed',
    [LOGISTICS_RETURN_SHIPMENT.STATUS.CANCELLED]: 'Cancelled',
  };
  return labels[status] || 'Unknown';
}

export function logisticsReturnShipmentGetPriorityLabel(
  priority: LogisticsReturnShipmentPriority
): string {
  const labels: Record<LogisticsReturnShipmentPriority, string> = {
    [LOGISTICS_RETURN_SHIPMENT.PRIORITIES.CRITICAL]: 'Critical',
    [LOGISTICS_RETURN_SHIPMENT.PRIORITIES.HIGH]: 'High',
    [LOGISTICS_RETURN_SHIPMENT.PRIORITIES.MEDIUM]: 'Medium',
    [LOGISTICS_RETURN_SHIPMENT.PRIORITIES.LOW]: 'Low',
    [LOGISTICS_RETURN_SHIPMENT.PRIORITIES.BACKGROUND]: 'Background',
  };
  return labels[priority] || 'Unknown';
}

export function logisticsReturnShipmentGetMethodLabel(
  method: LogisticsReturnShipmentMethod
): string {
  const labels: Record<LogisticsReturnShipmentMethod, string> = {
    [LOGISTICS_RETURN_SHIPMENT.METHODS.PICKUP]: 'Pickup',
    [LOGISTICS_RETURN_SHIPMENT.METHODS.DROP_OFF]: 'Drop Off',
    [LOGISTICS_RETURN_SHIPMENT.METHODS.COURIER]: 'Courier',
    [LOGISTICS_RETURN_SHIPMENT.METHODS.POSTAL]: 'Postal',
    [LOGISTICS_RETURN_SHIPMENT.METHODS.STORE]: 'Store Return',
  };
  return labels[method] || 'Unknown';
}

export function logisticsReturnShipmentIsCompleted(status: LogisticsReturnShipmentStatus): boolean {
  const completedStatuses: LogisticsReturnShipmentStatus[] = [
    LOGISTICS_RETURN_SHIPMENT.STATUS.REFUNDED,
    LOGISTICS_RETURN_SHIPMENT.STATUS.EXCHANGED,
    LOGISTICS_RETURN_SHIPMENT.STATUS.COMPLETED,
    LOGISTICS_RETURN_SHIPMENT.STATUS.CANCELLED,
  ];
  return completedStatuses.includes(status);
}

export function logisticsReturnShipmentIsInProgress(
  status: LogisticsReturnShipmentStatus
): boolean {
  const inProgressStatuses: LogisticsReturnShipmentStatus[] = [
    LOGISTICS_RETURN_SHIPMENT.STATUS.REQUESTED,
    LOGISTICS_RETURN_SHIPMENT.STATUS.APPROVED,
    LOGISTICS_RETURN_SHIPMENT.STATUS.PENDING_PICKUP,
    LOGISTICS_RETURN_SHIPMENT.STATUS.PICKED_UP,
    LOGISTICS_RETURN_SHIPMENT.STATUS.IN_TRANSIT,
    LOGISTICS_RETURN_SHIPMENT.STATUS.RECEIVED,
    LOGISTICS_RETURN_SHIPMENT.STATUS.INSPECTING,
    LOGISTICS_RETURN_SHIPMENT.STATUS.PROCESSING,
  ];
  return inProgressStatuses.includes(status);
}

export function logisticsReturnShipmentIsRejected(status: LogisticsReturnShipmentStatus): boolean {
  return status === LOGISTICS_RETURN_SHIPMENT.STATUS.REJECTED;
}

export function logisticsReturnShipmentGetTimeWindow(type: LogisticsReturnShipmentType): number {
  const windows: Record<LogisticsReturnShipmentType, number> = {
    [LOGISTICS_RETURN_SHIPMENT.TYPES.CUSTOMER_INITIATED]:
      LOGISTICS_RETURN_SHIPMENT.TIME_WINDOWS.STANDARD,
    [LOGISTICS_RETURN_SHIPMENT.TYPES.VENDOR_INITIATED]:
      LOGISTICS_RETURN_SHIPMENT.TIME_WINDOWS.STANDARD,
    [LOGISTICS_RETURN_SHIPMENT.TYPES.SYSTEM_INITIATED]:
      LOGISTICS_RETURN_SHIPMENT.TIME_WINDOWS.STANDARD,
    [LOGISTICS_RETURN_SHIPMENT.TYPES.DELIVERY_FAILED]:
      LOGISTICS_RETURN_SHIPMENT.TIME_WINDOWS.STANDARD,
    [LOGISTICS_RETURN_SHIPMENT.TYPES.DAMAGED]: LOGISTICS_RETURN_SHIPMENT.TIME_WINDOWS.EXTENDED,
    [LOGISTICS_RETURN_SHIPMENT.TYPES.WRONG_ITEM]: LOGISTICS_RETURN_SHIPMENT.TIME_WINDOWS.EXTENDED,
    [LOGISTICS_RETURN_SHIPMENT.TYPES.QUALITY_ISSUE]:
      LOGISTICS_RETURN_SHIPMENT.TIME_WINDOWS.EXTENDED,
    [LOGISTICS_RETURN_SHIPMENT.TYPES.EXCHANGE]: LOGISTICS_RETURN_SHIPMENT.TIME_WINDOWS.PREMIUM,
    [LOGISTICS_RETURN_SHIPMENT.TYPES.WARRANTY]: LOGISTICS_RETURN_SHIPMENT.TIME_WINDOWS.PREMIUM,
  };
  return windows[type] || LOGISTICS_RETURN_SHIPMENT.TIME_WINDOWS.STANDARD;
}
