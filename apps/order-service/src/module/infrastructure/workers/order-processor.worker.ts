/**
 * OrderProcessorWorker — processes order jobs
 * @module order-service/infrastructure/workers
 */
import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import type { Job } from 'bullmq';
import { ORDER_QUEUE_NAME, ORDER_JOB_NAME } from '../queues/queue.constants.js';
import { BaseWorker } from './base.worker.js';

export interface OrderJobData {
  readonly orderId: string;
  readonly action: string;
}

@Processor(ORDER_QUEUE_NAME.ORDER_PROCESSING)
export class OrderProcessorWorker extends WorkerHost {
  private readonly helper = new (class extends BaseWorker {})();

  async process(job: Job<OrderJobData>): Promise<unknown> {
    this.helper['logJobStart'](job);
    switch (job.name) {
      case ORDER_JOB_NAME.PROCESS_ORDER:
      case ORDER_JOB_NAME.TIMEOUT_ORDER:
        this.helper['logJobSuccess'](job);
        return { ok: true };
      default:
        return { skipped: true };
    }
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, err: Error): void {
    this.helper['logJobFailure'](job, err);
  }
}
