/**
 * QueuesWorkersModule — wires queues + workers
 * @module logistics-service/infrastructure
 */
import { Global, Module } from '@nestjs/common';
import { QueueModule } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { PrismaRepositoriesModule } from './persistence/prisma/prisma-repositories.module.js';

import {
  ShipmentQueue, DeliveryQueue, TrackingQueue, CourierQueue,
  FulfillmentQueue, DispatchQueue, NotificationQueue, AnalyticsQueue,
} from './queues/index.js';

import {
  ShipmentProcessorWorker, TrackingSyncWorker, DeliverySchedulerWorker, CourierSyncWorker,
} from './workers/index.js';

const QUEUES = [
  ShipmentQueue, DeliveryQueue, TrackingQueue, CourierQueue,
  FulfillmentQueue, DispatchQueue, NotificationQueue, AnalyticsQueue,
] as const;

const WORKERS = [
  ShipmentProcessorWorker, TrackingSyncWorker, DeliverySchedulerWorker, CourierSyncWorker,
] as const;

@Global()
@Module({
  imports: [QueueModule, PrismaRepositoriesModule],
  providers: [...QUEUES, ...WORKERS],
  exports: [...QUEUES, ...WORKERS],
})
export class QueuesWorkersModule {}
