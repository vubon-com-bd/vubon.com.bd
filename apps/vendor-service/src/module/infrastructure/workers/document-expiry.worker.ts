/**
 * DocumentExpiryWorker
 * @module vendor-service/infrastructure/workers
 */
import { Processor, WorkerHost } from '@nestjs/bullmq';
import type { Job } from 'bullmq';
import { VENDOR_QUEUE, VENDOR_JOB } from '../queues/queue.constants.js';
import type { DocumentExpiryJob } from '../queues/vendor-verification.queue.js';

@Processor(VENDOR_QUEUE.DOCUMENT_EXPIRY)
export class DocumentExpiryWorker extends WorkerHost {
  async process(job: Job<DocumentExpiryJob>): Promise<{ ok: boolean }> {
    if (job.name !== VENDOR_JOB.EXPIRE_DOCUMENTS) {
      return { ok: false };
    }
    // Real logic: mark documents as expired and notify vendors
    return { ok: true };
  }
}
