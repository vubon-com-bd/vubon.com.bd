/**
 * StatsAggregationWorker
 * @module vendor-service/infrastructure/workers
 */
import { Processor, WorkerHost } from '@nestjs/bullmq';
import type { Job } from 'bullmq';
import { VENDOR_QUEUE, VENDOR_JOB } from '../queues/queue.constants.js';
import type { StatsAggregationJob } from '../queues/vendor-stats.queue.js';

@Processor(VENDOR_QUEUE.STATS_AGGREGATION)
export class StatsAggregationWorker extends WorkerHost {
  async process(job: Job<StatsAggregationJob>): Promise<{ ok: boolean }> {
    if (job.name !== VENDOR_JOB.AGGREGATE_STATS) {
      return { ok: false };
    }
    // Real logic: compute daily stats for vendorId (or all if '*')
    return { ok: true };
  }
}
