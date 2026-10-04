export const ORDER_FULFILLMENT_STATUS = {
  UNFULFILLED: 'unfulfilled',
  PARTIALLY_FULFILLED: 'partially_fulfilled',
  FULFILLED: 'fulfilled',
  RESTOCKED: 'restocked',
  PENDING: 'pending',
  CANCELLED: 'cancelled',
} as const;

export const ORDER_FULFILLMENT_TYPE = {
  STANDARD: 'standard',
  EXPRESS: 'express',
  SAME_DAY: 'same_day',
  SCHEDULED: 'scheduled',
  PICKUP: 'pickup',
  DIGITAL: 'digital',
} as const;

export const ORDER_FULFILLMENT = {
  MAX_ITEMS_PER_SHIPMENT: 50,
  AUTO_FULFILL: false,
  ALLOW_PARTIAL: true,
  NOTIFY_CUSTOMER: true,
  SLA_HOURS: 48,
} as const;

export type OrderFulfillmentStatusType =
  (typeof ORDER_FULFILLMENT_STATUS)[keyof typeof ORDER_FULFILLMENT_STATUS];
export type OrderFulfillmentTypeType =
  (typeof ORDER_FULFILLMENT_TYPE)[keyof typeof ORDER_FULFILLMENT_TYPE];
