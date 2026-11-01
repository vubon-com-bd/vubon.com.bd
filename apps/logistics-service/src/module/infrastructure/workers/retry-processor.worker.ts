import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { LOGISTICS_QUEUE_NAME, LOGISTICS_JOB_NAME, LOGISTICS_QUEUE_LIMITS } from '../queues/queue.constants.js';

type JobPayload = {
  operation: string;
  aggregateId: string;
  attempt: number;
  context?: Record<string, unknown>;
};

@Injectable()
export class RetryProcessorWorker extends BaseWorker<JobPayload> {
  protected readonly queueName = LOGISTICS_QUEUE_NAME.RETRY;
  protected readonly jobNames = [LOGISTICS_JOB_NAME.RETRY_OPERATION] as const;

  constructor(queueService: QueueService) {
    super(queueService, 'RetryProcessorWorker');
  }

  protected async handle(payload: JobPayload): Promise<unknown> {
    if (payload.attempt >= LOGISTICS_QUEUE_LIMITS.MAX_ATTEMPTS) {
      this.logger.warn(`Max attempts reached for ${payload.operation}:${payload.aggregateId}`);
      return { skipped: true, reason: 'max_attempts' };
    }
    this.logger.log(`Retrying ${payload.operation} for ${payload.aggregateId} (attempt ${payload.attempt})`);
    return { retried: true, attempt: payload.attempt };
  }

  protected concurrency(): number { return 3; }
}
