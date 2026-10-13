/**
 * Product-service queue names + job names + limits
 * @module product-service/infrastructure/queues
 */
export const PRODUCT_QUEUE_NAME = {
  PRODUCT_PROCESSING: 'product-product-processing',
  INVENTORY_SYNC: 'product-inventory-sync',
  SEARCH_INDEX: 'product-search-index',
  MEDIA_PROCESSING: 'product-media-processing',
  ANALYTICS: 'product-analytics',
} as const;

export const PRODUCT_JOB_NAME = {
  PROCESS_PRODUCT: 'process-product',
  SYNC_INVENTORY: 'sync-inventory',
  LOW_STOCK_ALERT: 'low-stock-alert',
  INDEX_PRODUCT: 'index-product',
  REINDEX_PRODUCT: 'reindex-product',
  REMOVE_FROM_INDEX: 'remove-from-index',
  PROCESS_MEDIA: 'process-media',
  GENERATE_THUMBNAIL: 'generate-thumbnail',
  RECORD_ANALYTICS: 'record-analytics',
  CLEANUP_STALE: 'cleanup-stale',
} as const;

export const PRODUCT_QUEUE_LIMITS = {
  MAX_ATTEMPTS: 3,
  BACKOFF_MS: 5_000,
  CONCURRENCY: 5,
  RETRY_DELAY_MS: 30_000,
  LOCK_TTL_SECONDS: 30,
} as const;

export type ProductJobNameType =
  (typeof PRODUCT_JOB_NAME)[keyof typeof PRODUCT_JOB_NAME];
