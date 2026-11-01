export const FULFILLMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  PICKING: 'picking',
  PACKING: 'packing',
  READY_TO_SHIP: 'ready_to_ship',
  SHIPPED: 'shipped',
  PARTIALLY_FULFILLED: 'partially_fulfilled',
  FULFILLED: 'fulfilled',
  CANCELLED: 'cancelled',
  FAILED: 'failed',
  ON_HOLD: 'on_hold',
} as const;

export const FULFILLMENT_TYPE = {
  STANDARD: 'standard',
  EXPRESS: 'express',
  SAME_DAY: 'same_day',
  BACKORDER: 'backorder',
  PREORDER: 'preorder',
  DROPSHIP: 'dropship',
  CROSS_DOCK: 'cross_dock',
} as const;

export const FULFILLMENT_PRIORITY = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

export const FULFILLMENT = {
  STATUS: FULFILLMENT_STATUS,
  TYPE: FULFILLMENT_TYPE,
  PRIORITY: FULFILLMENT_PRIORITY,
  MAX_ITEMS_PER_FULFILLMENT: 100,
  MAX_FULFILLMENTS_PER_ORDER: 10,
  AUTO_FULFILL: false,
  ALLOW_PARTIAL: true,
  SLA_HOURS: 48,
  PICKING_TIMEOUT_MINUTES: 60,
  PACKING_TIMEOUT_MINUTES: 30,
  REQUIRE_QC: true,
  REQUIRE_LABEL: true,
  NOTIFY_CUSTOMER: true,
} as const;

export type FulfillmentStatusType = (typeof FULFILLMENT_STATUS)[keyof typeof FULFILLMENT_STATUS];
export type FulfillmentTypeType = (typeof FULFILLMENT_TYPE)[keyof typeof FULFILLMENT_TYPE];
export type FulfillmentPriorityType =
  (typeof FULFILLMENT_PRIORITY)[keyof typeof FULFILLMENT_PRIORITY];
