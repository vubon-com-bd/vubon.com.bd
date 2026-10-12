/**
 * ReportGenerationWorker
 * @module vendor-service/infrastructure/workers
 */
import { Processor, WorkerHost } from '@nestjs/bullmq';
import type { Job } from 'bullmq';
import { VENDOR_QUEUE, VENDOR_JOB } from '../queues/queue.constants.js';
import type { ReportGenerationJob } from '../queues/vendor-report.queue.js';

@Processor(VENDOR_QUEUE.REPORT_GENERATION)
export class ReportGenerationWorker extends WorkerHost {
  async process(job: Job<ReportGenerationJob>): Promise<{ ok: boolean }> {
    if (job.name !== VENDOR_JOB.GENERATE_REPORT) {
      return { ok: false };
    }
    // Real logic: build report file + persist + notify
    return { ok: true };
  }
}
