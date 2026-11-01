/**
 * Cart Service — Queue names + Job names + Limits
 * @module cart-service/infrastructure/queues
 */

export const CART_QUEUE_NAME = {
  CART_LIFECYCLE: 'cart-lifecycle',
  CART_ABANDONMENT: 'cart-abandonment',
  CART_REMINDER: 'cart-reminder',
  CART_PRICE_SYNC: 'cart-price-sync',
  CART_STOCK_SYNC: 'cart-stock-sync',
  CART_ANALYTICS: 'cart-analytics',
} as const;

export const CART_JOB_NAME = {
  EXPIRE_CART: 'expire-cart',
  ABANDON_CART: 'abandon-cart',
  SEND_REMINDER: 'send-reminder',
  SYNC_PRICE: 'sync-price',
  SYNC_STOCK: 'sync-stock',
  PROCESS_ANALYTICS: 'process-analytics',
  CLEANUP_STALE: 'cleanup-stale',
} as const;

export const CART_QUEUE_LIMITS = {
  MAX_ATTEMPTS: 3,
  BACKOFF_MS: 5000,
  CONCURRENCY: 5,
  RETRY_DELAY_MS: 30000,
} as const;

export type CartQueueName = (typeof CART_QUEUE_NAME)[keyof typeof CART_QUEUE_NAME];
export type CartJobName = (typeof CART_JOB_NAME)[keyof typeof CART_JOB_NAME];
