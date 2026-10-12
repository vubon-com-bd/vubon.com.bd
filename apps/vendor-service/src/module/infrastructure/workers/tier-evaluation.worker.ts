/**
 * TierEvaluationWorker
 * @module vendor-service/infrastructure/workers
 */
import { Processor, WorkerHost } from '@nestjs/bullmq';
import type { Job } from 'bullmq';
import { VENDOR_QUEUE, VENDOR_JOB } from '../queues/queue.constants.js';
import type { TierEvaluationJob } from '../queues/vendor-tier.queue.js';

@Processor(VENDOR_QUEUE.TIER_EVALUATION)
export class TierEvaluationWorker extends WorkerHost {
  async process(job: Job<TierEvaluationJob>): Promise<{ ok: boolean }> {
    if (job.name !== VENDOR_JOB.EVALUATE_TIERS) {
      return { ok: false };
    }
    // Real logic: evaluate all vendors (or vendorId) and emit tier change events
    return { ok: true };
  }
}
