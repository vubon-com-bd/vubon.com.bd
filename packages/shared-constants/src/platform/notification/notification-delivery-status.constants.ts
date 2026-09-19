export const NOTIFICATION_DELIVERY_STATUS = {
  QUEUED: 'queued',
  SENDING: 'sending',
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
  FAILED: 'failed',
  BOUNCED: 'bounced',
  REJECTED: 'rejected',
  UNSUBSCRIBED: 'unsubscribed',
  BLOCKED: 'blocked',
} as const;

export const NOTIFICATION_DELIVERY_FAILURE_REASON = {
  INVALID_ADDRESS: 'invalid_address',
  INVALID_PHONE: 'invalid_phone',
  INVALID_TOKEN: 'invalid_token',
  RATE_LIMITED: 'rate_limited',
  QUOTA_EXCEEDED: 'quota_exceeded',
  GATEWAY_ERROR: 'gateway_error',
  NETWORK_ERROR: 'network_error',
  TIMEOUT: 'timeout',
  UNSUBSCRIBED: 'unsubscribed',
  BLOCKED: 'blocked',
  UNKNOWN: 'unknown',
} as const;

export type NotificationDeliveryStatusType =
  (typeof NOTIFICATION_DELIVERY_STATUS)[keyof typeof NOTIFICATION_DELIVERY_STATUS];
export type NotificationDeliveryFailureReasonType =
  (typeof NOTIFICATION_DELIVERY_FAILURE_REASON)[keyof typeof NOTIFICATION_DELIVERY_FAILURE_REASON];
