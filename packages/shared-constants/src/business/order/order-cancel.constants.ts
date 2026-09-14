export const ORDER_CANCEL_REASON = {
  CUSTOMER_REQUEST: 'customer_request',
  OUT_OF_STOCK: 'out_of_stock',
  PAYMENT_FAILED: 'payment_failed',
  FRAUD_SUSPECTED: 'fraud_suspected',
  ADDRESS_INVALID: 'address_invalid',
  DELIVERY_UNAVAILABLE: 'delivery_unavailable',
  PRICE_ERROR: 'price_error',
  DUPLICATE_ORDER: 'duplicate_order',
  OTHER: 'other',
} as const;

export const ORDER_CANCEL_STATUS = {
  REQUESTED: 'requested',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  PROCESSED: 'processed',
  REFUNDED: 'refunded',
} as const;

export const ORDER_CANCEL = {
  WINDOW_HOURS: 24,
  ALLOW_AFTER_SHIPMENT: false,
  AUTO_APPROVE: true,
  REFUND_AUTO: true,
  RESTOCK_INVENTORY: true,
  MAX_REASON_LENGTH: 500,
} as const;

export type OrderCancelReasonType = (typeof ORDER_CANCEL_REASON)[keyof typeof ORDER_CANCEL_REASON];
export type OrderCancelStatusType = (typeof ORDER_CANCEL_STATUS)[keyof typeof ORDER_CANCEL_STATUS];
