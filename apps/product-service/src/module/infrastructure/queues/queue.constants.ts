/**
 * Queue names & job types
 * @module product-service/infrastructure/queues
 */
export const PRODUCT_QUEUE = 'product';
export const INVENTORY_QUEUE = 'inventory';
export const SEARCH_QUEUE = 'search';
export const MEDIA_QUEUE = 'media';
export const REVIEW_QUEUE = 'review';
export const NOTIFICATION_QUEUE = 'notification';

export const QUEUE_NAMES = [
  PRODUCT_QUEUE,
  INVENTORY_QUEUE,
  SEARCH_QUEUE,
  MEDIA_QUEUE,
  REVIEW_QUEUE,
  NOTIFICATION_QUEUE,
] as const;

export type QueueName = (typeof QUEUE_NAMES)[number];

export const JOB_TYPES = {
  // product
  PRODUCT_REINDEX: 'product.reindex',
  PRODUCT_INDEX_ONE: 'product.index.one',
  PRODUCT_REMOVE_INDEX: 'product.remove.index',
  // inventory
  INVENTORY_LOW_STOCK_ALERT: 'inventory.low_stock.alert',
  INVENTORY_OUT_OF_STOCK_ALERT: 'inventory.out_of_stock.alert',
  INVENTORY_RESERVE_EXPIRY: 'inventory.reserve.expiry',
  // search
  SEARCH_BULK_REINDEX: 'search.bulk.reindex',
  SEARCH_CLEAR_CACHE: 'search.clear.cache',
  // media
  MEDIA_PROCESS_IMAGE: 'media.process.image',
  MEDIA_GENERATE_THUMBNAIL: 'media.generate.thumbnail',
  // review
  REVIEW_AUTO_MODERATE: 'review.auto.moderate',
  REVIEW_UPDATE_STATS: 'review.update.stats',
  // notification
  NOTIFY_ADMIN: 'notify.admin',
  NOTIFY_VENDOR: 'notify.vendor',
} as const;

export type JobType = (typeof JOB_TYPES)[keyof typeof JOB_TYPES];

export interface QueueJobPayload {
  readonly [key: string]: unknown;
}
