/**
 * Queues + Workers Module
 * @module payment-service/infrastructure
 */
import { Module } from '@nestjs/common';
import { QueueModule } from '@vubon/shared-kernel/infrastructure/messaging/queue';

import { PaymentQueue } from './queues/payment.queue.js';
import { RefundQueue } from './queues/refund.queue.js';
import { SubscriptionQueue } from './queues/subscription.queue.js';
import { InvoiceQueue } from './queues/invoice.queue.js';
import { WebhookQueue } from './queues/webhook.queue.js';
import { NotificationQueue } from './queues/notification.queue.js';

import { PaymentProcessorWorker } from './workers/payment-processor.worker.js';
import { PaymentRetryWorker } from './workers/payment-retry.worker.js';
import { PaymentExpiryWorker } from './workers/payment-expiry.worker.js';
import { RefundProcessorWorker } from './workers/refund-processor.worker.js';
import { SubscriptionRenewalWorker } from './workers/subscription-renewal.worker.js';
import { InvoiceGeneratorWorker } from './workers/invoice-generator.worker.js';
import { WebhookProcessorWorker } from './workers/webhook-processor.worker.js';
import { ReconciliationWorker } from './workers/reconciliation.worker.js';

const QUEUES = [
  PaymentQueue,
  RefundQueue,
  SubscriptionQueue,
  InvoiceQueue,
  WebhookQueue,
  NotificationQueue,
];

const WORKERS = [
  PaymentProcessorWorker,
  PaymentRetryWorker,
  PaymentExpiryWorker,
  RefundProcessorWorker,
  SubscriptionRenewalWorker,
  InvoiceGeneratorWorker,
  WebhookProcessorWorker,
  ReconciliationWorker,
];

@Module({
  imports: [QueueModule],
  providers: [...QUEUES, ...WORKERS],
  exports: [...QUEUES],
})
export class QueuesWorkersModule {}
