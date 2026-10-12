/**
 * VendorVerificationQueue (document expiry)
 * @module vendor-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { VENDOR_QUEUE, VENDOR_JOB, VENDOR_JOB_OPTIONS } from './queue.constants.js';

export interface DocumentExpiryJob {
  readonly vendorId?: string;
  readonly checkAt: string;
}

@Injectable()
export class VendorVerificationQueue {
  constructor(
    @InjectQueue(VENDOR_QUEUE.DOCUMENT_EXPIRY) private readonly queue: Queue,
  ) {}

  async enqueueExpiryCheck(job: DocumentExpiryJob): Promise<void> {
    await this.queue.add(VENDOR_JOB.EXPIRE_DOCUMENTS, job, VENDOR_JOB_OPTIONS);
  }

  async getJobCount(): Promise<number> {
    return this.queue.count();
  }
}
