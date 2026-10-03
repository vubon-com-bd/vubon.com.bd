/**
 * QueuesWorkersModule — BullMQ queues + workers
 * @module cart-service/infrastructure
 */
import { Module } from '@nestjs/common';
import { RedisRepositoriesModule } from './persistence/redis/redis-repositories.module.js';

import { QueueFactory } from './queues/queue.factory.js';
import { CartQueueService } from './queues/cart-queue.service.js';
import { AbandonmentQueueService } from './queues/abandonment-queue.service.js';
import { PriceSyncQueueService } from './queues/price-sync-queue.service.js';
import { AnalyticsQueueService } from './queues/analytics-queue.service.js';

import { CartExpiryWorker } from './workers/cart-expiry.worker.js';
import { CartAbandonmentWorker } from './workers/cart-abandonment.worker.js';
import { CartReminderWorker } from './workers/cart-reminder.worker.js';
import { PriceSyncWorker } from './workers/price-sync.worker.js';
import { StockSyncWorker } from './workers/stock-sync.worker.js';
import { CartCleanupWorker } from './workers/cart-cleanup.worker.js';
import { AnalyticsProcessorWorker } from './workers/analytics-processor.worker.js';

import { AbandonmentDetectorService } from './services/internal/abandonment-detector.service.js';
import { PricingClient } from './services/external/pricing.client.js';
import { ProductClient } from './services/external/product.client.js';
import { StockCheckService } from './services/internal/stock-check.service.js';

@Module({
  imports: [RedisRepositoriesModule],
  providers: [
    QueueFactory,
    CartQueueService,
    AbandonmentQueueService,
    PriceSyncQueueService,
    AnalyticsQueueService,
    AbandonmentDetectorService,
    PricingClient,
    ProductClient,
    StockCheckService,
    CartExpiryWorker,
    CartAbandonmentWorker,
    CartReminderWorker,
    PriceSyncWorker,
    StockSyncWorker,
    CartCleanupWorker,
    AnalyticsProcessorWorker,
  ],
  exports: [
    QueueFactory,
    CartQueueService,
    AbandonmentQueueService,
    PriceSyncQueueService,
    AnalyticsQueueService,
  ],
})
export class QueuesWorkersModule {}
