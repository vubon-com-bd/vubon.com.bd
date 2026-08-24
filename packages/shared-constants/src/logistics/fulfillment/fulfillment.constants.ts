/**
 * Fulfillment Constants
 * Configuration for order fulfillment - Bangladesh based
 */

export const LOGISTICS_FULFILLMENT = {
  // Fulfillment Types
  TYPES: {
    STANDARD: 'standard',
    EXPRESS: 'express',
    SAME_DAY: 'same_day',
    NEXT_DAY: 'next_day',
    SCHEDULED: 'scheduled',
    RUSH: 'rush',
  } as const,

  // Fulfillment Statuses
  STATUS: {
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

  // Fulfillment Methods
  METHODS: {
    MANUAL: 'manual',
    AUTOMATED: 'automated',
    HYBRID: 'hybrid',
  } as const,

  // Fulfillment Priorities
  PRIORITIES: {
    CRITICAL: 5,
    HIGH: 4,
    MEDIUM: 3,
    LOW: 2,
    BACKGROUND: 1,
  } as const,

  // Fulfillment Time Estimates (in hours)
  TIME_ESTIMATES: {
    STANDARD: 24,
    EXPRESS: 12,
    SAME_DAY: 4,
    NEXT_DAY: 8,
    SCHEDULED: 24,
    RUSH: 2,
  } as const,

  // Fulfillment Limits
  LIMITS: {
    MAX_ITEMS_PER_ORDER: 100,
    MAX_WEIGHT_KG: 50,
    MAX_VOLUME_CM3: 1000000,
    MAX_ORDERS_PER_BATCH: 50,
  } as const,

  // Fulfillment Centers (Bangladesh)
  CENTERS: {
    DHAKA: 'dhaka',
    CHITTAGONG: 'chittagong',
    SYLHET: 'sylhet',
    RAJSHAHI: 'rajshahi',
    KHULNA: 'khulna',
    BARISHAL: 'barishal',
    RANGPUR: 'rangpur',
    MYMENSINGH: 'mymensingh',
  } as const,

  // Center Labels
  CENTER_LABELS: {
    DHAKA: 'Dhaka Fulfillment Center',
    CHITTAGONG: 'Chittagong Fulfillment Center',
    SYLHET: 'Sylhet Fulfillment Center',
    RAJSHAHI: 'Rajshahi Fulfillment Center',
    KHULNA: 'Khulna Fulfillment Center',
    BARISHAL: 'Barishal Fulfillment Center',
    RANGPUR: 'Rangpur Fulfillment Center',
    MYMENSINGH: 'Mymensingh Fulfillment Center',
  } as const,
} as const;

// Fulfillment Types
export type LogisticsFulfillmentType =
  (typeof LOGISTICS_FULFILLMENT.TYPES)[keyof typeof LOGISTICS_FULFILLMENT.TYPES];

// Fulfillment Statuses
export type LogisticsFulfillmentStatus =
  (typeof LOGISTICS_FULFILLMENT.STATUS)[keyof typeof LOGISTICS_FULFILLMENT.STATUS];

// Fulfillment Methods
export type LogisticsFulfillmentMethod =
  (typeof LOGISTICS_FULFILLMENT.METHODS)[keyof typeof LOGISTICS_FULFILLMENT.METHODS];

// Fulfillment Priorities
export type LogisticsFulfillmentPriority =
  (typeof LOGISTICS_FULFILLMENT.PRIORITIES)[keyof typeof LOGISTICS_FULFILLMENT.PRIORITIES];

// Fulfillment Centers
export type LogisticsFulfillmentCenter =
  (typeof LOGISTICS_FULFILLMENT.CENTERS)[keyof typeof LOGISTICS_FULFILLMENT.CENTERS];

// Utility Functions
export function logisticsFulfillmentGetTypeLabel(type: LogisticsFulfillmentType): string {
  const labels: Record<LogisticsFulfillmentType, string> = {
    [LOGISTICS_FULFILLMENT.TYPES.STANDARD]: 'Standard',
    [LOGISTICS_FULFILLMENT.TYPES.EXPRESS]: 'Express',
    [LOGISTICS_FULFILLMENT.TYPES.SAME_DAY]: 'Same Day',
    [LOGISTICS_FULFILLMENT.TYPES.NEXT_DAY]: 'Next Day',
    [LOGISTICS_FULFILLMENT.TYPES.SCHEDULED]: 'Scheduled',
    [LOGISTICS_FULFILLMENT.TYPES.RUSH]: 'Rush',
  };
  return labels[type] || 'Unknown';
}

export function logisticsFulfillmentGetStatusLabel(status: LogisticsFulfillmentStatus): string {
  const labels: Record<LogisticsFulfillmentStatus, string> = {
    [LOGISTICS_FULFILLMENT.STATUS.PENDING]: 'Pending',
    [LOGISTICS_FULFILLMENT.STATUS.PROCESSING]: 'Processing',
    [LOGISTICS_FULFILLMENT.STATUS.PICKING]: 'Picking',
    [LOGISTICS_FULFILLMENT.STATUS.PACKING]: 'Packing',
    [LOGISTICS_FULFILLMENT.STATUS.READY]: 'Ready',
    [LOGISTICS_FULFILLMENT.STATUS.DISPATCHED]: 'Dispatched',
    [LOGISTICS_FULFILLMENT.STATUS.IN_TRANSIT]: 'In Transit',
    [LOGISTICS_FULFILLMENT.STATUS.DELIVERED]: 'Delivered',
    [LOGISTICS_FULFILLMENT.STATUS.FAILED]: 'Failed',
    [LOGISTICS_FULFILLMENT.STATUS.CANCELLED]: 'Cancelled',
    [LOGISTICS_FULFILLMENT.STATUS.RETURNED]: 'Returned',
  };
  return labels[status] || 'Unknown';
}

export function logisticsFulfillmentGetMethodLabel(method: LogisticsFulfillmentMethod): string {
  const labels: Record<LogisticsFulfillmentMethod, string> = {
    [LOGISTICS_FULFILLMENT.METHODS.MANUAL]: 'Manual',
    [LOGISTICS_FULFILLMENT.METHODS.AUTOMATED]: 'Automated',
    [LOGISTICS_FULFILLMENT.METHODS.HYBRID]: 'Hybrid',
  };
  return labels[method] || 'Unknown';
}

export function logisticsFulfillmentGetPriorityLabel(
  priority: LogisticsFulfillmentPriority
): string {
  const labels: Record<LogisticsFulfillmentPriority, string> = {
    [LOGISTICS_FULFILLMENT.PRIORITIES.CRITICAL]: 'Critical',
    [LOGISTICS_FULFILLMENT.PRIORITIES.HIGH]: 'High',
    [LOGISTICS_FULFILLMENT.PRIORITIES.MEDIUM]: 'Medium',
    [LOGISTICS_FULFILLMENT.PRIORITIES.LOW]: 'Low',
    [LOGISTICS_FULFILLMENT.PRIORITIES.BACKGROUND]: 'Background',
  };
  return labels[priority] || 'Unknown';
}

export function logisticsFulfillmentGetTimeEstimate(type: LogisticsFulfillmentType): number {
  const estimates: Record<LogisticsFulfillmentType, number> = {
    [LOGISTICS_FULFILLMENT.TYPES.STANDARD]: LOGISTICS_FULFILLMENT.TIME_ESTIMATES.STANDARD,
    [LOGISTICS_FULFILLMENT.TYPES.EXPRESS]: LOGISTICS_FULFILLMENT.TIME_ESTIMATES.EXPRESS,
    [LOGISTICS_FULFILLMENT.TYPES.SAME_DAY]: LOGISTICS_FULFILLMENT.TIME_ESTIMATES.SAME_DAY,
    [LOGISTICS_FULFILLMENT.TYPES.NEXT_DAY]: LOGISTICS_FULFILLMENT.TIME_ESTIMATES.NEXT_DAY,
    [LOGISTICS_FULFILLMENT.TYPES.SCHEDULED]: LOGISTICS_FULFILLMENT.TIME_ESTIMATES.SCHEDULED,
    [LOGISTICS_FULFILLMENT.TYPES.RUSH]: LOGISTICS_FULFILLMENT.TIME_ESTIMATES.RUSH,
  };
  return estimates[type] || LOGISTICS_FULFILLMENT.TIME_ESTIMATES.STANDARD;
}

export function logisticsFulfillmentIsComplete(status: LogisticsFulfillmentStatus): boolean {
  const completeStatuses: LogisticsFulfillmentStatus[] = [
    LOGISTICS_FULFILLMENT.STATUS.DELIVERED,
    LOGISTICS_FULFILLMENT.STATUS.FAILED,
    LOGISTICS_FULFILLMENT.STATUS.CANCELLED,
    LOGISTICS_FULFILLMENT.STATUS.RETURNED,
  ];
  return completeStatuses.includes(status);
}

export function logisticsFulfillmentIsInProgress(status: LogisticsFulfillmentStatus): boolean {
  const inProgressStatuses: LogisticsFulfillmentStatus[] = [
    LOGISTICS_FULFILLMENT.STATUS.PROCESSING,
    LOGISTICS_FULFILLMENT.STATUS.PICKING,
    LOGISTICS_FULFILLMENT.STATUS.PACKING,
    LOGISTICS_FULFILLMENT.STATUS.READY,
    LOGISTICS_FULFILLMENT.STATUS.DISPATCHED,
    LOGISTICS_FULFILLMENT.STATUS.IN_TRANSIT,
  ];
  return inProgressStatuses.includes(status);
}

export function logisticsFulfillmentGetCenterLabel(center: LogisticsFulfillmentCenter): string {
  const labels: Record<LogisticsFulfillmentCenter, string> = {
    [LOGISTICS_FULFILLMENT.CENTERS.DHAKA]: LOGISTICS_FULFILLMENT.CENTER_LABELS.DHAKA,
    [LOGISTICS_FULFILLMENT.CENTERS.CHITTAGONG]: LOGISTICS_FULFILLMENT.CENTER_LABELS.CHITTAGONG,
    [LOGISTICS_FULFILLMENT.CENTERS.SYLHET]: LOGISTICS_FULFILLMENT.CENTER_LABELS.SYLHET,
    [LOGISTICS_FULFILLMENT.CENTERS.RAJSHAHI]: LOGISTICS_FULFILLMENT.CENTER_LABELS.RAJSHAHI,
    [LOGISTICS_FULFILLMENT.CENTERS.KHULNA]: LOGISTICS_FULFILLMENT.CENTER_LABELS.KHULNA,
    [LOGISTICS_FULFILLMENT.CENTERS.BARISHAL]: LOGISTICS_FULFILLMENT.CENTER_LABELS.BARISHAL,
    [LOGISTICS_FULFILLMENT.CENTERS.RANGPUR]: LOGISTICS_FULFILLMENT.CENTER_LABELS.RANGPUR,
    [LOGISTICS_FULFILLMENT.CENTERS.MYMENSINGH]: LOGISTICS_FULFILLMENT.CENTER_LABELS.MYMENSINGH,
  };
  return labels[center] || 'Unknown';
}
