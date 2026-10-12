/**
 * VendorPayoutQueue
 * @module vendor-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { VENDOR_QUEUE, VENDOR_JOB, VENDOR_JOB_OPTIONS } from './queue.constants.js';

export interface PayoutProcessingJob {
  readonly payoutId: string;
  readonly vendorId: string;
  readonly processedBy: string;
}

@Injectable()
export class VendorPayoutQueue {
  constructor(
    @InjectQueue(VENDOR_QUEUE.PAYOUT_PROCESSING) private readonly queue: Queue,
  ) {}

  async enqueueProcessPayout(job: PayoutProcessingJob): Promise<void> {
    await this.queue.add(VENDOR_JOB.PROCESS_PAYOUT, job, VENDOR_JOB_OPTIONS);
  }

  async getJobCount(): Promise<number> {
    return this.queue.count();
  }
}
