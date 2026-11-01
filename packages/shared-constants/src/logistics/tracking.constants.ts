export const TRACKING_EVENT = {
  ORDER_PLACED: 'order_placed',
  SHIPMENT_CREATED: 'shipment_created',
  LABEL_GENERATED: 'label_generated',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  AT_HUB: 'at_hub',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERY_ATTEMPTED: 'delivery_attempted',
  DELIVERED: 'delivered',
  FAILED: 'failed',
  RETURNED: 'returned',
  EXCEPTION: 'exception',
  CUSTOMS_CLEARED: 'customs_cleared',
  CUSTOMS_HOLD: 'customs_hold',
} as const;

export const TRACKING_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  FAILED: 'failed',
  EXPIRED: 'expired',
  UNKNOWN: 'unknown',
} as const;

export const TRACKING_SOURCE = {
  COURIER_API: 'courier_api',
  WEBHOOK: 'webhook',
  MANUAL: 'manual',
  INTERNAL: 'internal',
  THIRD_PARTY: 'third_party',
} as const;

export const TRACKING = {
  EVENT: TRACKING_EVENT,
  STATUS: TRACKING_STATUS,
  SOURCE: TRACKING_SOURCE,
  REFRESH_INTERVAL_MINUTES: 30,
  MAX_EVENTS: 500,
  RETENTION_DAYS: 730,
  NOTIFY_ON_UPDATE: true,
  NOTIFY_ON_DELIVERED: true,
  NOTIFY_ON_EXCEPTION: true,
  PUBLIC_TRACKING_ENABLED: true,
  REQUIRE_ORDER_NUMBER: true,
  REQUIRE_PHONE_OR_EMAIL: false,
  MAX_TRACKING_PER_DAY: 10000,
} as const;

export type TrackingEventType = (typeof TRACKING_EVENT)[keyof typeof TRACKING_EVENT];
export type TrackingStatusType = (typeof TRACKING_STATUS)[keyof typeof TRACKING_STATUS];
export type TrackingSourceType = (typeof TRACKING_SOURCE)[keyof typeof TRACKING_SOURCE];
