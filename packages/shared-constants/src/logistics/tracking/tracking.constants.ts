/**
 * Tracking Constants
 * Configuration for shipment tracking
 */

export const LOGISTICS_TRACKING = {
  // Tracking Types
  TYPES: {
    SHIPMENT: 'shipment',
    DELIVERY: 'delivery',
    ORDER: 'order',
    RETURN: 'return',
  } as const,

  // Tracking Statuses
  STATUS: {
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

  // Tracking Events
  EVENTS: {
    BOOKED: 'booked',
    PICKED_UP: 'picked_up',
    PROCESSED: 'processed',
    DISPATCHED: 'dispatched',
    IN_TRANSIT: 'in_transit',
    ARRIVED: 'arrived',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    RETURNED: 'returned',
    CANCELLED: 'cancelled',
  } as const,

  // Event Types
  EVENT_TYPES: {
    BOOKING: 'booking',
    PICKUP: 'pickup',
    PROCESSING: 'processing',
    TRANSPORT: 'transport',
    DELIVERY: 'delivery',
    EXCEPTION: 'exception',
    RETURN: 'return',
  } as const,

  // Tracking Providers (Bangladesh)
  PROVIDERS: {
    SA_PARIBOHON: 'sa_paribohon',
    PAPERFLY: 'paperfly',
    REDX: 'redx',
    PATHO: 'patho',
    SUNDARBAN: 'sundarban',
    KARATOYA: 'karatoya',
    DHL: 'dhl',
    FEDEX: 'fedex',
    CUSTOM: 'custom',
  } as const,

  // Tracking URLs
  TRACKING_URLS: {
    SA_PARIBOHON: 'https://www.saparibohon.com/tracking/',
    PAPERFLY: 'https://www.paperfly.com/tracking/',
    REDX: 'https://www.redx.com.bd/tracking/',
    PATHO: 'https://www.pathao.com/tracking/',
    SUNDARBAN: 'https://www.sundarbancourier.com/tracking/',
    KARATOYA: 'https://www.karatoya.com/tracking/',
    DHL: 'https://www.dhl.com.bd/tracking/',
    FEDEX: 'https://www.fedex.com/tracking/',
    CUSTOM: '',
  } as const,

  // Tracking Limits
  LIMITS: {
    MAX_TRACKING_NUMBER_LENGTH: 50,
    MAX_STATUS_UPDATES: 100,
    MAX_EVENTS_PER_SHIPMENT: 50,
    MAX_TRACKING_RETENTION_DAYS: 90,
    MAX_TRACKING_REQUESTS_PER_DAY: 1000,
  } as const,

  // Update Frequency (in minutes)
  UPDATE_FREQUENCY: {
    REAL_TIME: 0,
    HIGH: 5,
    MEDIUM: 15,
    LOW: 30,
  } as const,
} as const;

// Tracking Types
export type LogisticsTrackingType =
  (typeof LOGISTICS_TRACKING.TYPES)[keyof typeof LOGISTICS_TRACKING.TYPES];

// Tracking Statuses
export type LogisticsTrackingStatus =
  (typeof LOGISTICS_TRACKING.STATUS)[keyof typeof LOGISTICS_TRACKING.STATUS];

// Tracking Events
export type LogisticsTrackingEvent =
  (typeof LOGISTICS_TRACKING.EVENTS)[keyof typeof LOGISTICS_TRACKING.EVENTS];

// Event Types
export type LogisticsTrackingEventType =
  (typeof LOGISTICS_TRACKING.EVENT_TYPES)[keyof typeof LOGISTICS_TRACKING.EVENT_TYPES];

// Tracking Providers
export type LogisticsTrackingProvider =
  (typeof LOGISTICS_TRACKING.PROVIDERS)[keyof typeof LOGISTICS_TRACKING.PROVIDERS];

// Utility Functions
export function logisticsTrackingGetTypeLabel(type: LogisticsTrackingType): string {
  const labels: Record<LogisticsTrackingType, string> = {
    [LOGISTICS_TRACKING.TYPES.SHIPMENT]: 'Shipment',
    [LOGISTICS_TRACKING.TYPES.DELIVERY]: 'Delivery',
    [LOGISTICS_TRACKING.TYPES.ORDER]: 'Order',
    [LOGISTICS_TRACKING.TYPES.RETURN]: 'Return',
  };
  return labels[type] || 'Unknown';
}

export function logisticsTrackingGetStatusLabel(status: LogisticsTrackingStatus): string {
  const labels: Record<LogisticsTrackingStatus, string> = {
    [LOGISTICS_TRACKING.STATUS.PENDING]: 'Pending',
    [LOGISTICS_TRACKING.STATUS.PROCESSING]: 'Processing',
    [LOGISTICS_TRACKING.STATUS.DISPATCHED]: 'Dispatched',
    [LOGISTICS_TRACKING.STATUS.IN_TRANSIT]: 'In Transit',
    [LOGISTICS_TRACKING.STATUS.ARRIVED]: 'Arrived',
    [LOGISTICS_TRACKING.STATUS.OUT_FOR_DELIVERY]: 'Out for Delivery',
    [LOGISTICS_TRACKING.STATUS.DELIVERED]: 'Delivered',
    [LOGISTICS_TRACKING.STATUS.FAILED]: 'Failed',
    [LOGISTICS_TRACKING.STATUS.RETURNED]: 'Returned',
    [LOGISTICS_TRACKING.STATUS.CANCELLED]: 'Cancelled',
  };
  return labels[status] || 'Unknown';
}

export function logisticsTrackingGetProviderLabel(provider: LogisticsTrackingProvider): string {
  const labels: Record<LogisticsTrackingProvider, string> = {
    [LOGISTICS_TRACKING.PROVIDERS.SA_PARIBOHON]: 'SA Paribohon',
    [LOGISTICS_TRACKING.PROVIDERS.PAPERFLY]: 'Paperfly',
    [LOGISTICS_TRACKING.PROVIDERS.REDX]: 'RedX',
    [LOGISTICS_TRACKING.PROVIDERS.PATHO]: 'Pathao',
    [LOGISTICS_TRACKING.PROVIDERS.SUNDARBAN]: 'Sundarban',
    [LOGISTICS_TRACKING.PROVIDERS.KARATOYA]: 'Karatoya',
    [LOGISTICS_TRACKING.PROVIDERS.DHL]: 'DHL',
    [LOGISTICS_TRACKING.PROVIDERS.FEDEX]: 'FedEx',
    [LOGISTICS_TRACKING.PROVIDERS.CUSTOM]: 'Custom',
  };
  return labels[provider] || 'Unknown';
}

export function logisticsTrackingGetProviderURL(provider: LogisticsTrackingProvider): string {
  const urls: Record<LogisticsTrackingProvider, string> = {
    [LOGISTICS_TRACKING.PROVIDERS.SA_PARIBOHON]: LOGISTICS_TRACKING.TRACKING_URLS.SA_PARIBOHON,
    [LOGISTICS_TRACKING.PROVIDERS.PAPERFLY]: LOGISTICS_TRACKING.TRACKING_URLS.PAPERFLY,
    [LOGISTICS_TRACKING.PROVIDERS.REDX]: LOGISTICS_TRACKING.TRACKING_URLS.REDX,
    [LOGISTICS_TRACKING.PROVIDERS.PATHO]: LOGISTICS_TRACKING.TRACKING_URLS.PATHO,
    [LOGISTICS_TRACKING.PROVIDERS.SUNDARBAN]: LOGISTICS_TRACKING.TRACKING_URLS.SUNDARBAN,
    [LOGISTICS_TRACKING.PROVIDERS.KARATOYA]: LOGISTICS_TRACKING.TRACKING_URLS.KARATOYA,
    [LOGISTICS_TRACKING.PROVIDERS.DHL]: LOGISTICS_TRACKING.TRACKING_URLS.DHL,
    [LOGISTICS_TRACKING.PROVIDERS.FEDEX]: LOGISTICS_TRACKING.TRACKING_URLS.FEDEX,
    [LOGISTICS_TRACKING.PROVIDERS.CUSTOM]: LOGISTICS_TRACKING.TRACKING_URLS.CUSTOM,
  };
  return urls[provider] || '';
}

export function logisticsTrackingIsDelivered(status: LogisticsTrackingStatus): boolean {
  return status === LOGISTICS_TRACKING.STATUS.DELIVERED;
}

export function logisticsTrackingIsInTransit(status: LogisticsTrackingStatus): boolean {
  const transitStatuses: LogisticsTrackingStatus[] = [
    LOGISTICS_TRACKING.STATUS.DISPATCHED,
    LOGISTICS_TRACKING.STATUS.IN_TRANSIT,
    LOGISTICS_TRACKING.STATUS.ARRIVED,
    LOGISTICS_TRACKING.STATUS.OUT_FOR_DELIVERY,
  ];
  return transitStatuses.includes(status);
}

export function logisticsTrackingIsComplete(status: LogisticsTrackingStatus): boolean {
  const completeStatuses: LogisticsTrackingStatus[] = [
    LOGISTICS_TRACKING.STATUS.DELIVERED,
    LOGISTICS_TRACKING.STATUS.FAILED,
    LOGISTICS_TRACKING.STATUS.RETURNED,
    LOGISTICS_TRACKING.STATUS.CANCELLED,
  ];
  return completeStatuses.includes(status);
}

export function logisticsTrackingIsFailed(status: LogisticsTrackingStatus): boolean {
  return (
    status === LOGISTICS_TRACKING.STATUS.FAILED || status === LOGISTICS_TRACKING.STATUS.RETURNED
  );
}

export function logisticsTrackingGetEventLabel(event: LogisticsTrackingEvent): string {
  const labels: Record<LogisticsTrackingEvent, string> = {
    [LOGISTICS_TRACKING.EVENTS.BOOKED]: 'Booked',
    [LOGISTICS_TRACKING.EVENTS.PICKED_UP]: 'Picked Up',
    [LOGISTICS_TRACKING.EVENTS.PROCESSED]: 'Processed',
    [LOGISTICS_TRACKING.EVENTS.DISPATCHED]: 'Dispatched',
    [LOGISTICS_TRACKING.EVENTS.IN_TRANSIT]: 'In Transit',
    [LOGISTICS_TRACKING.EVENTS.ARRIVED]: 'Arrived',
    [LOGISTICS_TRACKING.EVENTS.OUT_FOR_DELIVERY]: 'Out for Delivery',
    [LOGISTICS_TRACKING.EVENTS.DELIVERED]: 'Delivered',
    [LOGISTICS_TRACKING.EVENTS.FAILED]: 'Failed',
    [LOGISTICS_TRACKING.EVENTS.RETURNED]: 'Returned',
    [LOGISTICS_TRACKING.EVENTS.CANCELLED]: 'Cancelled',
  };
  return labels[event] || 'Unknown';
}
