export const ORDER_TRACKING_EVENT = {
  ORDER_PLACED: 'order_placed',
  ORDER_CONFIRMED: 'order_confirmed',
  PAYMENT_RECEIVED: 'payment_received',
  PROCESSING_STARTED: 'processing_started',
  PACKED: 'packed',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  DELIVERY_FAILED: 'delivery_failed',
  RETURNED: 'returned',
  CANCELLED: 'cancelled',
} as const;

export const ORDER_TRACKING = {
  REFRESH_INTERVAL_SECONDS: 300,
  HISTORY_RETENTION_DAYS: 365,
  NOTIFY_ON_UPDATE: true,
  TRACK_LOCATION: true,
  TRACK_BY_PHONE: true,
} as const;

export type OrderTrackingEventType =
  (typeof ORDER_TRACKING_EVENT)[keyof typeof ORDER_TRACKING_EVENT];
