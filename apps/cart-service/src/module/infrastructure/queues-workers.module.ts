/**
 * Queues + Workers Module
 * @module cart-service/infrastructure
 */
import { Module } from '@nestjs/common';
import { QueueModule } from '@vubon/shared-kernel/infrastructure/messaging/queue';

// ─── Queues ─────────────────────────────────
import { CartQueue } from './queues/cart.queue.js';
import { AbandonmentQueue } from './queues/abandonment.queue.js';
import { ReminderQueue } from './queues/reminder.queue.js';
import { PriceSyncQueue } from './queues/price-sync.queue.js';
import { AnalyticsQueue } from './queues/analytics.queue.js';

// ─── Workers ────────────────────────────────
import { CartExpiryWorker } from './workers/cart-expiry.worker.js';
import { CartAbandonmentWorker } from './workers/cart-abandonment.worker.js';
import { CartReminderWorker } from './workers/cart-reminder.worker.js';
import { PriceSyncWorker } from './workers/price-sync.worker.js';
import { StockSyncWorker } from './workers/stock-sync.worker.js';
import { CartCleanupWorker } from './workers/cart-cleanup.worker.js';
import { AnalyticsProcessorWorker } from './workers/analytics-processor.worker.js';

const QUEUES = [
  CartQueue,
  AbandonmentQueue,
  ReminderQueue,
  PriceSyncQueue,
  AnalyticsQueue,
];

const WORKERS = [
  CartExpiryWorker,
  CartAbandonmentWorker,
  CartReminderWorker,
  PriceSyncWorker,
  StockSyncWorker,
  CartCleanupWorker,
  AnalyticsProcessorWorker,
];

@Module({
  imports: [QueueModule],
  providers: [...QUEUES, ...WORKERS],
  exports: [...QUEUES],
})
export class QueuesWorkersModule {}
