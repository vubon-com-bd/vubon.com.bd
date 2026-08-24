/**
 * Shipment Constants
 * Configuration for shipments - Bangladesh based
 */

export const LOGISTICS_SHIPMENT = {
  // Shipment Types
  TYPES: {
    DOCUMENT: 'document',
    PACKAGE: 'package',
    CARGO: 'cargo',
    PALLET: 'pallet',
    CONTAINER: 'container',
    FRAGILE: 'fragile',
    LIQUID: 'liquid',
    PERISHABLE: 'perishable',
    HAZARDOUS: 'hazardous',
  } as const,

  // Shipment Statuses
  STATUS: {
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

  // Shipment Priorities
  PRIORITIES: {
    STANDARD: 'standard',
    EXPRESS: 'express',
    URGENT: 'urgent',
    SAME_DAY: 'same_day',
    OVERNIGHT: 'overnight',
  } as const,

  // Shipment Methods
  METHODS: {
    AIR: 'air',
    SEA: 'sea',
    ROAD: 'road',
    RAIL: 'rail',
    COURIER: 'courier',
  } as const,

  // Packaging Types
  PACKAGING: {
    BOX: 'box',
    ENVELOPE: 'envelope',
    PALLET: 'pallet',
    CRATE: 'crate',
    BAG: 'bag',
    TUBE: 'tube',
    CUSTOM: 'custom',
  } as const,

  // Shipment Limits (Bangladesh)
  LIMITS: {
    // Document
    DOCUMENT_WEIGHT: 0.5, // kg
    DOCUMENT_LENGTH: 35, // cm
    DOCUMENT_WIDTH: 25, // cm
    DOCUMENT_HEIGHT: 5, // cm

    // Package
    PACKAGE_WEIGHT: 50, // kg
    PACKAGE_LENGTH: 100, // cm
    PACKAGE_WIDTH: 100, // cm
    PACKAGE_HEIGHT: 100, // cm

    // Cargo
    CARGO_WEIGHT: 500, // kg
    CARGO_LENGTH: 300, // cm
    CARGO_WIDTH: 300, // cm
    CARGO_HEIGHT: 300, // cm
  } as const,

  // Delivery Time Estimates (in days)
  DELIVERY_TIME: {
    DHAKA_SAME: 1,
    DHAKA_NEXT: 1,
    DIVISION_SAME: 2,
    DIVISION_NEXT: 3,
    REMOTE: 5,
    INTERNATIONAL: 7,
  } as const,

  // COD (Cash on Delivery) Limits
  COD_LIMITS: {
    MAX_AMOUNT: 500000, // BDT
    MIN_AMOUNT: 50, // BDT
    DEFAULT_CHARGE: 50, // BDT
    PERCENTAGE: 0.01, // 1%
  } as const,

  // Return Reasons
  RETURN_REASONS: {
    WRONG_ADDRESS: 'wrong_address',
    RECIPIENT_NOT_AVAILABLE: 'recipient_not_available',
    REFUSED: 'refused',
    DAMAGED: 'damaged',
    WRONG_PRODUCT: 'wrong_product',
    CUSTOMER_REQUEST: 'customer_request',
    OTHER: 'other',
  } as const,
} as const;

// Shipment Types
export type LogisticsShipmentType =
  (typeof LOGISTICS_SHIPMENT.TYPES)[keyof typeof LOGISTICS_SHIPMENT.TYPES];

// Shipment Statuses
export type LogisticsShipmentStatus =
  (typeof LOGISTICS_SHIPMENT.STATUS)[keyof typeof LOGISTICS_SHIPMENT.STATUS];

// Shipment Priorities
export type LogisticsShipmentPriority =
  (typeof LOGISTICS_SHIPMENT.PRIORITIES)[keyof typeof LOGISTICS_SHIPMENT.PRIORITIES];

// Shipment Methods
export type LogisticsShipmentMethod =
  (typeof LOGISTICS_SHIPMENT.METHODS)[keyof typeof LOGISTICS_SHIPMENT.METHODS];

// Packaging Types
export type LogisticsShipmentPackaging =
  (typeof LOGISTICS_SHIPMENT.PACKAGING)[keyof typeof LOGISTICS_SHIPMENT.PACKAGING];

// Return Reasons
export type LogisticsShipmentReturnReason =
  (typeof LOGISTICS_SHIPMENT.RETURN_REASONS)[keyof typeof LOGISTICS_SHIPMENT.RETURN_REASONS];

// Utility Functions
export function logisticsShipmentGetTypeLabel(type: LogisticsShipmentType): string {
  const labels: Record<LogisticsShipmentType, string> = {
    [LOGISTICS_SHIPMENT.TYPES.DOCUMENT]: 'Document',
    [LOGISTICS_SHIPMENT.TYPES.PACKAGE]: 'Package',
    [LOGISTICS_SHIPMENT.TYPES.CARGO]: 'Cargo',
    [LOGISTICS_SHIPMENT.TYPES.PALLET]: 'Pallet',
    [LOGISTICS_SHIPMENT.TYPES.CONTAINER]: 'Container',
    [LOGISTICS_SHIPMENT.TYPES.FRAGILE]: 'Fragile',
    [LOGISTICS_SHIPMENT.TYPES.LIQUID]: 'Liquid',
    [LOGISTICS_SHIPMENT.TYPES.PERISHABLE]: 'Perishable',
    [LOGISTICS_SHIPMENT.TYPES.HAZARDOUS]: 'Hazardous',
  };
  return labels[type] || 'Unknown';
}

export function logisticsShipmentGetStatusLabel(status: LogisticsShipmentStatus): string {
  const labels: Record<LogisticsShipmentStatus, string> = {
    [LOGISTICS_SHIPMENT.STATUS.CREATED]: 'Created',
    [LOGISTICS_SHIPMENT.STATUS.BOOKED]: 'Booked',
    [LOGISTICS_SHIPMENT.STATUS.PICKED_UP]: 'Picked Up',
    [LOGISTICS_SHIPMENT.STATUS.PROCESSED]: 'Processed',
    [LOGISTICS_SHIPMENT.STATUS.IN_TRANSIT]: 'In Transit',
    [LOGISTICS_SHIPMENT.STATUS.ARRIVED]: 'Arrived',
    [LOGISTICS_SHIPMENT.STATUS.OUT_FOR_DELIVERY]: 'Out for Delivery',
    [LOGISTICS_SHIPMENT.STATUS.DELIVERED]: 'Delivered',
    [LOGISTICS_SHIPMENT.STATUS.FAILED]: 'Failed',
    [LOGISTICS_SHIPMENT.STATUS.RETURNED]: 'Returned',
    [LOGISTICS_SHIPMENT.STATUS.CANCELLED]: 'Cancelled',
  };
  return labels[status] || 'Unknown';
}

export function logisticsShipmentGetPriorityLabel(priority: LogisticsShipmentPriority): string {
  const labels: Record<LogisticsShipmentPriority, string> = {
    [LOGISTICS_SHIPMENT.PRIORITIES.STANDARD]: 'Standard (2-3 days)',
    [LOGISTICS_SHIPMENT.PRIORITIES.EXPRESS]: 'Express (1-2 days)',
    [LOGISTICS_SHIPMENT.PRIORITIES.URGENT]: 'Urgent (24 hours)',
    [LOGISTICS_SHIPMENT.PRIORITIES.SAME_DAY]: 'Same Day',
    [LOGISTICS_SHIPMENT.PRIORITIES.OVERNIGHT]: 'Overnight',
  };
  return labels[priority] || 'Unknown';
}

export function logisticsShipmentGetMethodLabel(method: LogisticsShipmentMethod): string {
  const labels: Record<LogisticsShipmentMethod, string> = {
    [LOGISTICS_SHIPMENT.METHODS.AIR]: 'Air',
    [LOGISTICS_SHIPMENT.METHODS.SEA]: 'Sea',
    [LOGISTICS_SHIPMENT.METHODS.ROAD]: 'Road',
    [LOGISTICS_SHIPMENT.METHODS.RAIL]: 'Rail',
    [LOGISTICS_SHIPMENT.METHODS.COURIER]: 'Courier',
  };
  return labels[method] || 'Unknown';
}

export function logisticsShipmentGetPackagingLabel(packaging: LogisticsShipmentPackaging): string {
  const labels: Record<LogisticsShipmentPackaging, string> = {
    [LOGISTICS_SHIPMENT.PACKAGING.BOX]: 'Box',
    [LOGISTICS_SHIPMENT.PACKAGING.ENVELOPE]: 'Envelope',
    [LOGISTICS_SHIPMENT.PACKAGING.PALLET]: 'Pallet',
    [LOGISTICS_SHIPMENT.PACKAGING.CRATE]: 'Crate',
    [LOGISTICS_SHIPMENT.PACKAGING.BAG]: 'Bag',
    [LOGISTICS_SHIPMENT.PACKAGING.TUBE]: 'Tube',
    [LOGISTICS_SHIPMENT.PACKAGING.CUSTOM]: 'Custom',
  };
  return labels[packaging] || 'Unknown';
}

export function logisticsShipmentIsDelivered(status: LogisticsShipmentStatus): boolean {
  return status === LOGISTICS_SHIPMENT.STATUS.DELIVERED;
}

export function logisticsShipmentIsInTransit(status: LogisticsShipmentStatus): boolean {
  const transitStatuses: LogisticsShipmentStatus[] = [
    LOGISTICS_SHIPMENT.STATUS.PICKED_UP,
    LOGISTICS_SHIPMENT.STATUS.IN_TRANSIT,
    LOGISTICS_SHIPMENT.STATUS.OUT_FOR_DELIVERY,
  ];
  return transitStatuses.includes(status);
}

export function logisticsShipmentIsFailed(status: LogisticsShipmentStatus): boolean {
  return (
    status === LOGISTICS_SHIPMENT.STATUS.FAILED ||
    status === LOGISTICS_SHIPMENT.STATUS.RETURNED ||
    status === LOGISTICS_SHIPMENT.STATUS.CANCELLED
  );
}

export function logisticsShipmentGetReturnReasonLabel(
  reason: LogisticsShipmentReturnReason
): string {
  const labels: Record<LogisticsShipmentReturnReason, string> = {
    [LOGISTICS_SHIPMENT.RETURN_REASONS.WRONG_ADDRESS]: 'Wrong Address',
    [LOGISTICS_SHIPMENT.RETURN_REASONS.RECIPIENT_NOT_AVAILABLE]: 'Recipient Not Available',
    [LOGISTICS_SHIPMENT.RETURN_REASONS.REFUSED]: 'Refused by Recipient',
    [LOGISTICS_SHIPMENT.RETURN_REASONS.DAMAGED]: 'Damaged',
    [LOGISTICS_SHIPMENT.RETURN_REASONS.WRONG_PRODUCT]: 'Wrong Product',
    [LOGISTICS_SHIPMENT.RETURN_REASONS.CUSTOMER_REQUEST]: 'Customer Request',
    [LOGISTICS_SHIPMENT.RETURN_REASONS.OTHER]: 'Other',
  };
  return labels[reason] || 'Unknown';
}

export function logisticsShipmentGetMaxWeight(type: LogisticsShipmentType): number {
  const weights: Record<LogisticsShipmentType, number> = {
    [LOGISTICS_SHIPMENT.TYPES.DOCUMENT]: LOGISTICS_SHIPMENT.LIMITS.DOCUMENT_WEIGHT,
    [LOGISTICS_SHIPMENT.TYPES.PACKAGE]: LOGISTICS_SHIPMENT.LIMITS.PACKAGE_WEIGHT,
    [LOGISTICS_SHIPMENT.TYPES.CARGO]: LOGISTICS_SHIPMENT.LIMITS.CARGO_WEIGHT,
    [LOGISTICS_SHIPMENT.TYPES.PALLET]: LOGISTICS_SHIPMENT.LIMITS.CARGO_WEIGHT,
    [LOGISTICS_SHIPMENT.TYPES.CONTAINER]: LOGISTICS_SHIPMENT.LIMITS.CARGO_WEIGHT,
    [LOGISTICS_SHIPMENT.TYPES.FRAGILE]: LOGISTICS_SHIPMENT.LIMITS.PACKAGE_WEIGHT,
    [LOGISTICS_SHIPMENT.TYPES.LIQUID]: LOGISTICS_SHIPMENT.LIMITS.PACKAGE_WEIGHT,
    [LOGISTICS_SHIPMENT.TYPES.PERISHABLE]: LOGISTICS_SHIPMENT.LIMITS.PACKAGE_WEIGHT,
    [LOGISTICS_SHIPMENT.TYPES.HAZARDOUS]: LOGISTICS_SHIPMENT.LIMITS.PACKAGE_WEIGHT,
  };
  return weights[type] || LOGISTICS_SHIPMENT.LIMITS.PACKAGE_WEIGHT;
}
