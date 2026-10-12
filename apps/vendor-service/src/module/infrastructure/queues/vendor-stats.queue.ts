/**
 * VendorStatsQueue
 * @module vendor-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { VENDOR_QUEUE, VENDOR_JOB, VENDOR_JOB_OPTIONS } from './queue.constants.js';

export interface StatsAggregationJob {
  readonly vendorId: string;
  readonly periodStart: string;
  readonly periodEnd: string;
}

@Injectable()
export class VendorStatsQueue {
  constructor(
    @InjectQueue(VENDOR_QUEUE.STATS_AGGREGATION) private readonly queue: Queue,
  ) {}

  async enqueueAggregate(job: StatsAggregationJob): Promise<void> {
    await this.queue.add(VENDOR_JOB.AGGREGATE_STATS, job, VENDOR_JOB_OPTIONS);
  }

  async enqueueDaily(): Promise<void> {
    const end = new Date();
    const start = new Date(end.getTime() - 24 * 60 * 60 * 1000);
    await this.queue.add(
      VENDOR_JOB.AGGREGATE_STATS,
      {
        vendorId: '*',
        periodStart: start.toISOString(),
        periodEnd: end.toISOString(),
      },
      { ...VENDOR_JOB_OPTIONS, repeat: undefined },
    );
  }

  async getJobCount(): Promise<number> {
    return this.queue.count();
  }
}
