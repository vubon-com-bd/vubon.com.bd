/**
 * ReconciliationWorker — runs periodic reconciliation between payment records
 * and gateway-reported statuses.
 * @module payment-service/infrastructure/workers
 *
 * Cron-driven (external scheduler or QueueService repeating job).
 * Responsibilities:
 *  - Find expired authorizations → cancel
 *  - Find stale pendings → mark failed
 *  - Find failed payments still within retry budget → re-enqueue
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  PAYMENT_REPOSITORY,
  type PaymentRepository,
} from '../../domain/repositories/payment.repository.interface.js';
import { PaymentQueue } from '../queues/payment.queue.js';
import { PAYMENT_LIMIT } from '@vubon/shared-constants/business/payment';

@Injectable()
export class ReconciliationWorker implements OnModuleInit {
  private readonly logger = new Logger(ReconciliationWorker.name);

  constructor(
    @Inject(PAYMENT_REPOSITORY) private readonly paymentRepo: PaymentRepository,
    private readonly paymentQueue: PaymentQueue,
  ) {}

  onModuleInit(): void {
    this.logger.log('ReconciliationWorker registered — external scheduler triggers `run()`');
  }

  /** Called by scheduler (cron) or admin endpoint. */
  async run(): Promise<{
    expired: number;
    staleFailed: number;
    retryEnqueued: number;
  }> {
    const now = new Date().toISOString();
    let expired = 0;
    let staleFailed = 0;
    let retryEnqueued = 0;

    // 1) Expired authorizations (past capture window)
    const expiredAuths = await this.paymentRepo.findExpiredAuthorizations(
      PAYMENT_LIMIT.CAPTURE_WINDOW_HOURS,
    );
    for (const p of expiredAuths) {
      try {
        p.expire(now);
        await this.paymentRepo.save(p);
        expired++;
      } catch (err) {
        this.logger.warn(`expire fail ${p.id}: ${(err as Error).message}`);
      }
    }

    // 2) Stale pendings older than 30 min
    const stalePendings = await this.paymentRepo.findStalePending(30);
    for (const p of stalePendings) {
      try {
        p.fail(
          { value: 'Payment session expired' } as never,
          { value: 'STALE_PENDING' } as never,
          now,
        );
        await this.paymentRepo.save(p);
        staleFailed++;
      } catch {
        /* ignore */
      }
    }

    // 3) Retryable payments → enqueue
    const retryable = await this.paymentRepo.findRetryable();
    for (const p of retryable) {
      try {
        await this.paymentQueue.enqueueRetry({
          paymentId: p.id,
          attempt: p.retryAttempts + 1,
        });
        retryEnqueued++;
      } catch {
        /* ignore */
      }
    }

    this.logger.log(
      `Reconciliation done — expired=${expired} staleFailed=${staleFailed} retried=${retryEnqueued}`,
    );
    return { expired, staleFailed, retryEnqueued };
  }
}
