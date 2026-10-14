/**
 * Queues + Workers Module — BullMQ queues and processors
 * @module vendor-service/infrastructure
 *
 * Imports PrismaRepositoriesModule for worker dependency injection.
 */
import { Module } from '@nestjs/common';
import { QueueModule } from '@vubon/shared-kernel/infrastructure/messaging/queue';

import { PrismaRepositoriesModule } from './persistence/prisma/prisma-repositories.module.js';

// ─── Queues ───
import { CommissionQueue } from './queues/commission.queue.js';
import { PayoutQueue } from './queues/payout.queue.js';
import { SettlementQueue } from './queues/settlement.queue.js';
import { DocumentQueue } from './queues/document.queue.js';
import { NotificationQueue } from './queues/notification.queue.js';

// ─── Workers ───
import { CommissionCalculatorWorker } from './workers/commission-calculator.worker.js';
import { PayoutProcessorWorker } from './workers/payout-processor.worker.js';
import { SettlementProcessorWorker } from './workers/settlement-processor.worker.js';
import { DocumentExpiryWorker } from './workers/document-expiry.worker.js';
import { PerformanceTrackerWorker } from './workers/performance-tracker.worker.js';
import { TierEvaluatorWorker } from './workers/tier-evaluator.worker.js';
import { SubscriptionRenewalWorker } from './workers/subscription-renewal.worker.js';

const QUEUES = [
  CommissionQueue,
  PayoutQueue,
  SettlementQueue,
  DocumentQueue,
  NotificationQueue,
];

const WORKERS = [
  CommissionCalculatorWorker,
  PayoutProcessorWorker,
  SettlementProcessorWorker,
  DocumentExpiryWorker,
  PerformanceTrackerWorker,
  TierEvaluatorWorker,
  SubscriptionRenewalWorker,
];

@Module({
  imports: [
    QueueModule,
    PrismaRepositoriesModule,
  ],
  providers: [...QUEUES, ...WORKERS],
  exports: [...QUEUES, ...WORKERS],
})
export class QueuesWorkersModule {}
