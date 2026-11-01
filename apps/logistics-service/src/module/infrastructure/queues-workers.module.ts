/**
 * QueuesWorkersModule — wires queues + workers
 * @module logistics-service/infrastructure
 *
 * ⚠️ Workers auto-start via BaseWorker.OnModuleInit (if QUEUE_CONFIG.autoStartWorkers)
 * ⚠️ Depends on repositories (from InfrastructureModule/feature modules)
 */
import { Module } from '@nestjs/common';
import { QueueModule } from '@vubon/shared-kernel/infrastructure/messaging/queue';

// Repositories module (provides all 17 repos)
import { PrismaRepositoriesModule } from './persistence/prisma/prisma-repositories.module.js';

// Queues
import {
  ShipmentQueue,
  DeliveryQueue,
  TrackingQueue,
  CourierQueue,
  FulfillmentQueue,
  DispatchQueue,
  NotificationQueue,
  RetryQueue,
  AnalyticsQueue,
} from './queues/index.js';

// Workers
import {
  ShipmentProcessorWorker,
  DeliveryProcessorWorker,
  TrackingSyncWorker,
  CourierSyncWorker,
  FulfillmentProcessorWorker,
  DispatchProcessorWorker,
  NotificationProcessorWorker,
  RetryProcessorWorker,
  AnalyticsProcessorWorker,
} from './workers/index.js';

const QUEUES = [
  ShipmentQueue,
  DeliveryQueue,
  TrackingQueue,
  CourierQueue,
  FulfillmentQueue,
  DispatchQueue,
  NotificationQueue,
  RetryQueue,
  AnalyticsQueue,
] as const;

const WORKERS = [
  ShipmentProcessorWorker,
  DeliveryProcessorWorker,
  TrackingSyncWorker,
  CourierSyncWorker,
  FulfillmentProcessorWorker,
  DispatchProcessorWorker,
  NotificationProcessorWorker,
  RetryProcessorWorker,
  AnalyticsProcessorWorker,
] as const;

@Module({
  imports: [
    QueueModule,
    PrismaRepositoriesModule,
  ],
  providers: [
    ...QUEUES,
    ...WORKERS,
  ],
  exports: [
    ...QUEUES,
    ...WORKERS,
  ],
})
export class QueuesWorkersModule {}
