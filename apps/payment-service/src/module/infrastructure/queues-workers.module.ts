/**
 * QueuesWorkersModule — wires queues + internal workers
 * @module payment-service/infrastructure
 *
 * NOTE: WebhookProcessorWorker is registered in WebhookModule (feature
 * module) because it depends on WebhookService (application layer).
 * Keeping it here creates a circular dependency:
 *   InfrastructureModule → QueuesWorkersModule → WebhookService ← WebhookModule
 */
import { Global, Module } from '@nestjs/common';
import { QueueModule } from '@vubon/shared-kernel/infrastructure/messaging/queue';

import { PaymentQueue } from './queues/payment.queue.js';
import { RefundQueue } from './queues/refund.queue.js';
import { WebhookQueue } from './queues/webhook.queue.js';

import { PaymentRetryWorker } from './workers/payment-retry.worker.js';
import { PaymentExpiryWorker } from './workers/payment-expiry.worker.js';
import { RefundProcessorWorker } from './workers/refund-processor.worker.js';
import { ReconciliationWorker } from './workers/reconciliation.worker.js';

import { PrismaRepositoriesModule } from './persistence/prisma/prisma-repositories.module.js';
import { GatewaysModule } from './gateways/gateways.module.js';

@Global()
@Module({
  imports: [QueueModule, PrismaRepositoriesModule, GatewaysModule],
  providers: [
    PaymentQueue,
    RefundQueue,
    WebhookQueue,
    PaymentRetryWorker,
    PaymentExpiryWorker,
    RefundProcessorWorker,
    ReconciliationWorker,
  ],
  exports: [
    PaymentQueue,
    RefundQueue,
    WebhookQueue,
    ReconciliationWorker,
  ],
})
export class QueuesWorkersModule {}
