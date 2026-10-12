/**
 * VendorTierQueue
 * @module vendor-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { VENDOR_QUEUE, VENDOR_JOB, VENDOR_JOB_OPTIONS } from './queue.constants.js';

export interface TierEvaluationJob {
  readonly vendorId?: string;
}

@Injectable()
export class VendorTierQueue {
  constructor(
    @InjectQueue(VENDOR_QUEUE.TIER_EVALUATION) private readonly queue: Queue,
  ) {}

  async enqueueEvaluation(job: TierEvaluationJob): Promise<void> {
    await this.queue.add(VENDOR_JOB.EVALUATE_TIERS, job, VENDOR_JOB_OPTIONS);
  }

  async getJobCount(): Promise<number> {
    return this.queue.count();
  }
}
