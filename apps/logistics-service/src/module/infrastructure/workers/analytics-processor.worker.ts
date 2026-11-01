import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { LOGISTICS_QUEUE_NAME, LOGISTICS_JOB_NAME } from '../queues/queue.constants.js';

type JobPayload = { metric?: string; fromDate?: string; toDate?: string };

@Injectable()
export class AnalyticsProcessorWorker extends BaseWorker<JobPayload> {
  protected readonly queueName = LOGISTICS_QUEUE_NAME.ANALYTICS;
  protected readonly jobNames = [
    LOGISTICS_JOB_NAME.AGGREGATE_ANALYTICS,
    LOGISTICS_JOB_NAME.CLEANUP_STALE,
  ] as const;

  constructor(queueService: QueueService) {
    super(queueService, 'AnalyticsProcessorWorker');
  }

  protected async handle(payload: JobPayload): Promise<unknown> {
    this.logger.log(`Analytics: metric=${payload.metric ?? 'cleanup'}`);
    return { processed: true, metric: payload.metric };
  }

  protected concurrency(): number { return 2; }
}
