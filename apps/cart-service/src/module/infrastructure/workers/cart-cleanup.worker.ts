import { Injectable } from '@nestjs/common';
import type { Job } from 'bullmq';
import { BaseWorker } from './base.worker.js';
import { CART_QUEUE, JOB_TYPES } from '../queues/queue.constants.js';

@Injectable()
export class CartCleanupWorker extends BaseWorker {
  constructor() {
    super(CART_QUEUE, CartCleanupWorker.name);
  }

  protected async handle(job: Job): Promise<void> {
    if (job.name !== JOB_TYPES.CART_CLEANUP) return;
    const batchSize = Number(job.data.batchSize ?? 100);
    this.logger.log(`Cleanup batch of ${batchSize}`);
    // Real impl: iterate orphaned/expired carts and cleanup
  }
}
