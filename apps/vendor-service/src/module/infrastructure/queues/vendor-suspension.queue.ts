/**
 * VendorSuspensionQueue
 * @module vendor-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { VENDOR_QUEUE, VENDOR_JOB, VENDOR_JOB_OPTIONS } from './queue.constants.js';

export interface AutoLiftJob {
  readonly suspensionId: string;
  readonly vendorId: string;
}

@Injectable()
export class VendorSuspensionQueue {
  constructor(
    @InjectQueue(VENDOR_QUEUE.SUSPENSION_AUTO_LIFT) private readonly queue: Queue,
  ) {}

  async enqueueAutoLift(job: AutoLiftJob): Promise<void> {
    await this.queue.add(VENDOR_JOB.AUTO_LIFT_SUSPENSION, job, VENDOR_JOB_OPTIONS);
  }

  async getJobCount(): Promise<number> {
    return this.queue.count();
  }
}
