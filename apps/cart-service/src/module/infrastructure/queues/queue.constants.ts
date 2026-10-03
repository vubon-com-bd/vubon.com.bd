/**
 * Queue names & job types
 * @module cart-service/infrastructure/queues
 */
export const CART_QUEUE = 'cart';
export const ABANDONMENT_QUEUE = 'abandonment';
export const REMINDER_QUEUE = 'reminder';
export const PRICE_SYNC_QUEUE = 'price-sync';
export const ANALYTICS_QUEUE = 'analytics';

export const QUEUE_NAMES = [
  CART_QUEUE,
  ABANDONMENT_QUEUE,
  REMINDER_QUEUE,
  PRICE_SYNC_QUEUE,
  ANALYTICS_QUEUE,
] as const;

export type QueueName = (typeof QUEUE_NAMES)[number];

export const JOB_TYPES = {
  CART_EXPIRY: 'cart.expiry',
  CART_CLEANUP: 'cart.cleanup',
  ABANDONMENT_DETECT: 'abandonment.detect',
  REMINDER_SEND: 'reminder.send',
  PRICE_SYNC_ONE: 'price.sync.one',
  PRICE_SYNC_BULK: 'price.sync.bulk',
  STOCK_SYNC: 'stock.sync',
  ANALYTICS_TRACK: 'analytics.track',
} as const;

export type JobType = (typeof JOB_TYPES)[keyof typeof JOB_TYPES];

export interface QueueJobPayload {
  readonly [key: string]: unknown;
}
