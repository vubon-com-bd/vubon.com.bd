/**
 * Queue names, job names, limits
 * @module logistics-service/infrastructure/queues
 *
 * ⚠️ BullMQ v5 — NO ':' in queue names (use '-')
 * ⚠️ jobId pattern — `${prefix}:${id}:${suffix}` — ':' allowed in jobId, not queue
 */
export const LOGISTICS_QUEUE_NAME = {
  SHIPMENT_PROCESSING: 'logistics-shipment-processing',
  DELIVERY_PROCESSING: 'logistics-delivery-processing',
  TRACKING_SYNC: 'logistics-tracking-sync',
  COURIER_SYNC: 'logistics-courier-sync',
  FULFILLMENT_PROCESSING: 'logistics-fulfillment-processing',
  DISPATCH_PROCESSING: 'logistics-dispatch-processing',
  NOTIFICATION: 'logistics-notification',
  RETRY: 'logistics-retry',
  ANALYTICS: 'logistics-analytics',
} as const;

export type QueueName = typeof LOGISTICS_QUEUE_NAME[keyof typeof LOGISTICS_QUEUE_NAME];

export const LOGISTICS_JOB_NAME = {
  // Shipment
  PROCESS_SHIPMENT: 'process-shipment',
  EXPIRE_SHIPMENT: 'expire-shipment',
  RETRY_SHIPMENT: 'retry-shipment',
  // Delivery
  PROCESS_DELIVERY: 'process-delivery',
  EXPIRE_DELIVERY: 'expire-delivery',
  RETRY_DELIVERY: 'retry-delivery',
  // Tracking
  SYNC_TRACKING: 'sync-tracking',
  FETCH_TRACKING_EVENTS: 'fetch-tracking-events',
  // Courier
  SYNC_COURIER_STATUS: 'sync-courier-status',
  // Fulfillment
  PROCESS_FULFILLMENT: 'process-fulfillment',
  CHECK_SLA: 'check-sla',
  // Dispatch
  PROCESS_DISPATCH: 'process-dispatch',
  // Notification
  SEND_NOTIFICATION: 'send-notification',
  // Retry
  RETRY_OPERATION: 'retry-operation',
  // Analytics
  AGGREGATE_ANALYTICS: 'aggregate-analytics',
  CLEANUP_STALE: 'cleanup-stale',
} as const;

export const LOGISTICS_QUEUE_LIMITS = {
  MAX_ATTEMPTS: 3,
  BACKOFF_MS: 5_000,
  DEFAULT_CONCURRENCY: 5,
  RETRY_DELAY_MS: 30_000,
} as const;
