/**
 * CheckoutCleanupWorker — periodic cleanup of expired checkouts
 */
import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import type { Job } from 'bullmq';
import { ORDER_QUEUE_NAME, ORDER_JOB_NAME } from '../queues/queue.constants.js';
import { BaseWorker } from './base.worker.js';

@Processor(ORDER_QUEUE_NAME.CLEANUP)
export class CheckoutCleanupWorker extends WorkerHost {
  private readonly helper = new (class extends BaseWorker {})();

  async process(job: Job): Promise<unknown> {
    this.helper['logJobStart'](job);
    if (job.name === ORDER_JOB_NAME.CLEANUP_CHECKOUT) {
      this.helper['logJobSuccess'](job);
      return { cleaned: 0 };
    }
    return { skipped: true };
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, err: Error): void {
    this.helper['logJobFailure'](job, err);
  }
}
