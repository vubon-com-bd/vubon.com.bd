/**
 * QueuesWorkersModule — DB_MODE-aware
 * @module order-service/infrastructure
 *
 * In memory mode: workers use MemoryRepositoriesModule (via OrderCommonModule).
 * In prisma mode: workers use PrismaRepositoriesModule.
 */
import { DynamicModule, Module } from '@nestjs/common';
import { QueueModule } from '@vubon/shared-kernel/infrastructure/messaging/queue';

import { PrismaRepositoriesModule } from './persistence/prisma/prisma-repositories.module.js';
import { IS_MEMORY_MODE } from './config/db-mode.config.js';

// ─── Queues ────────────────────────────────
import { OrderQueue } from './queues/order.queue.js';
import { CheckoutQueue } from './queues/checkout.queue.js';
import { DeliveryQueue } from './queues/delivery.queue.js';
import { NotificationQueue } from './queues/notification.queue.js';
import { AnalyticsQueue } from './queues/analytics.queue.js';

// ─── Workers ───────────────────────────────
import { OrderProcessorWorker } from './workers/order-processor.worker.js';
import { CheckoutCleanupWorker } from './workers/checkout-cleanup.worker.js';
import { DeliveryTrackerWorker } from './workers/delivery-tracker.worker.js';
import { OrderTimeoutWorker } from './workers/order-timeout.worker.js';
import { ReturnProcessorWorker } from './workers/return-processor.worker.js';
import { AnalyticsProcessorWorker } from './workers/analytics-processor.worker.js';

const QUEUES = [OrderQueue, CheckoutQueue, DeliveryQueue, NotificationQueue, AnalyticsQueue];
const WORKERS = [
  OrderProcessorWorker,
  CheckoutCleanupWorker,
  DeliveryTrackerWorker,
  OrderTimeoutWorker,
  ReturnProcessorWorker,
  AnalyticsProcessorWorker,
];

@Module({})
export class QueuesWorkersModule {
  static forRoot(): DynamicModule {
    // ⚠️ Only import PrismaRepositoriesModule in prisma mode.
    // In memory mode, ORDER_REPOSITORY comes from MemoryRepositoriesModule
    // (registered via OrderCommonModule.forRoot()).
    const repoModules = IS_MEMORY_MODE ? [] : [PrismaRepositoriesModule];

    return {
      module: QueuesWorkersModule,
      imports: [QueueModule, ...repoModules],
      providers: [...QUEUES, ...WORKERS],
      exports: [...QUEUES],
    };
  }
}
