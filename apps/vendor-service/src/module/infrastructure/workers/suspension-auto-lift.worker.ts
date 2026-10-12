/**
 * SuspensionAutoLiftWorker
 * @module vendor-service/infrastructure/workers
 */
import { Processor, WorkerHost } from '@nestjs/bullmq';
import type { Job } from 'bullmq';
import { VENDOR_QUEUE, VENDOR_JOB } from '../queues/queue.constants.js';
import type { AutoLiftJob } from '../queues/vendor-suspension.queue.js';

@Processor(VENDOR_QUEUE.SUSPENSION_AUTO_LIFT)
export class SuspensionAutoLiftWorker extends WorkerHost {
  async process(job: Job<AutoLiftJob>): Promise<{ ok: boolean }> {
    if (job.name !== VENDOR_JOB.AUTO_LIFT_SUSPENSION) {
      return { ok: false };
    }
    // Real logic: lift suspension if expired + auto-lift policy allows
    return { ok: true };
  }
}
