/**
 * AnalyticsProcessorWorker
 * @module cart-service/infrastructure/workers
 */
import { Injectable } from '@nestjs/common';
import type { Job } from 'bullmq';
import { BaseWorker } from './base.worker.js';
import { ANALYTICS_QUEUE, JOB_TYPES } from '../queues/queue.constants.js';

@Injectable()
export class AnalyticsProcessorWorker extends BaseWorker {
  constructor() {
    super(ANALYTICS_QUEUE, AnalyticsProcessorWorker.name);
  }

  protected async handle(job: Job): Promise<void> {
    if (job.name !== JOB_TYPES.ANALYTICS_TRACK) return;
    const event = String(job.data.event ?? 'unknown');
    this.logger.debug(`Analytics event: ${event}`);
  }
}
