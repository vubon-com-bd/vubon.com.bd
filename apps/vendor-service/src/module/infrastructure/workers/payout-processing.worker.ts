/**
 * PayoutProcessingWorker
 * @module vendor-service/infrastructure/workers
 */
import { Processor, WorkerHost } from '@nestjs/bullmq';
import type { Job } from 'bullmq';
import { VENDOR_QUEUE, VENDOR_JOB } from '../queues/queue.constants.js';
import type { PayoutProcessingJob } from '../queues/vendor-payout.queue.js';

@Processor(VENDOR_QUEUE.PAYOUT_PROCESSING)
export class PayoutProcessingWorker extends WorkerHost {
  async process(job: Job<PayoutProcessingJob>): Promise<{ ok: boolean }> {
    if (job.name !== VENDOR_JOB.PROCESS_PAYOUT) {
      return { ok: false };
    }
    // Real logic: dispatch to PayoutService.process() via command bus
    // Here: acknowledge the job (idempotent, safe to retry)
    return { ok: true };
  }
}
