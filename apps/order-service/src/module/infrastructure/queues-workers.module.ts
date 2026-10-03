/**
 * QueuesWorkersModule — wires BullMQ root + 5 queues + 6 workers
 * @module order-service/infrastructure
 *
 * Redis connection uses REDIS_CONFIG.url (single URI).
 */
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { REDIS_CONFIG } from '@vubon/shared-config/infrastructure';

import { OrderQueueRegistration } from './queues/order.queue.js';
import { CheckoutQueueRegistration } from './queues/checkout.queue.js';
import { DeliveryQueueRegistration } from './queues/delivery.queue.js';
import { NotificationQueueRegistration } from './queues/notification.queue.js';
import { AnalyticsQueueRegistration } from './queues/analytics.queue.js';

import { OrderProcessorWorker } from './workers/order-processor.worker.js';
import { CheckoutCleanupWorker } from './workers/checkout-cleanup.worker.js';
import { DeliveryTrackerWorker } from './workers/delivery-tracker.worker.js';
import { OrderTimeoutWorker } from './workers/order-timeout.worker.js';
import { ReturnProcessorWorker } from './workers/return-processor.worker.js';
import { AnalyticsProcessorWorker } from './workers/analytics-processor.worker.js';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        url: REDIS_CONFIG.url,
        // BullMQ/ioredis accepts host/port or url; url alone is enough.
        // tls + password are embedded in the URL when required.
      },
    }),
    OrderQueueRegistration,
    CheckoutQueueRegistration,
    DeliveryQueueRegistration,
    NotificationQueueRegistration,
    AnalyticsQueueRegistration,
  ],
  providers: [
    OrderProcessorWorker,
    CheckoutCleanupWorker,
    DeliveryTrackerWorker,
    OrderTimeoutWorker,
    ReturnProcessorWorker,
    AnalyticsProcessorWorker,
  ],
  exports: [BullModule],
})
export class QueuesWorkersModule {}
