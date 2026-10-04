export const WEBHOOK_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

export const WEBHOOK_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PAUSED: 'paused',
  FAILED: 'failed',
  DISABLED: 'disabled',
} as const;

export const WEBHOOK_DELIVERY_STATUS = {
  PENDING: 'pending',
  DELIVERED: 'delivered',
  FAILED: 'failed',
  RETRYING: 'retrying',
  ABANDONED: 'abandoned',
} as const;

export const WEBHOOK_EVENT = {
  ORDER_CREATED: 'order.created',
  ORDER_UPDATED: 'order.updated',
  ORDER_CANCELLED: 'order.cancelled',
  ORDER_DELIVERED: 'order.delivered',
  PAYMENT_SUCCEEDED: 'payment.succeeded',
  PAYMENT_FAILED: 'payment.failed',
  PAYMENT_REFUNDED: 'payment.refunded',
  USER_CREATED: 'user.created',
  USER_UPDATED: 'user.updated',
  USER_DELETED: 'user.deleted',
  PRODUCT_CREATED: 'product.created',
  PRODUCT_UPDATED: 'product.updated',
  PRODUCT_DELETED: 'product.deleted',
  VENDOR_APPROVED: 'vendor.approved',
  VENDOR_REJECTED: 'vendor.rejected',
  SHIPMENT_CREATED: 'shipment.created',
  SHIPMENT_DELIVERED: 'shipment.delivered',
} as const;

export const WEBHOOK = {
  TIMEOUT_SECONDS: 30,
  MAX_RETRIES: 5,
  RETRY_DELAYS_SECONDS: [10, 30, 120, 600, 3600],
  MAX_PAYLOAD_SIZE_KB: 256,
  MAX_HEADERS: 20,
  MAX_ACTIVE_WEBHOOKS: 50,
  SIGNATURE_ALGORITHM: 'sha256',
  SIGNATURE_HEADER: 'x-webhook-signature',
  TRACK_DELIVERIES: true,
  RETENTION_DAYS: 30,
} as const;

export type WebhookMethodType = (typeof WEBHOOK_METHOD)[keyof typeof WEBHOOK_METHOD];
export type WebhookStatusType = (typeof WEBHOOK_STATUS)[keyof typeof WEBHOOK_STATUS];
export type WebhookDeliveryStatusType =
  (typeof WEBHOOK_DELIVERY_STATUS)[keyof typeof WEBHOOK_DELIVERY_STATUS];
export type WebhookEventType = (typeof WEBHOOK_EVENT)[keyof typeof WEBHOOK_EVENT];
