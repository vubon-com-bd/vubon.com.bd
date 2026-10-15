/**
 * AnalyticsProcessorWorker — async analytics ingestion
 * @module cart-service/infrastructure/workers
 */
import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { CART_QUEUE_NAME, CART_JOB_NAME } from '../queues/queue.constants.js';
import type { ProcessAnalyticsPayload } from '../queues/analytics.queue.js';

@Injectable()
export class AnalyticsProcessorWorker extends BaseWorker<ProcessAnalyticsPayload> {
  protected readonly queueName = CART_QUEUE_NAME.CART_ANALYTICS;
  protected readonly jobNames = [CART_JOB_NAME.PROCESS_ANALYTICS] as const;

  constructor(queueService: QueueService) {
    super(queueService, 'AnalyticsProcessorWorker');
  }

  protected async handle(payload: ProcessAnalyticsPayload): Promise<unknown> {
    // Placeholder — real ingestion via ClickHouse / OLAP adapter in Step 6
    this.logger.debug(
      `Analytics: ${payload.eventName} (${payload.aggregateId})`,
    );
    return { recorded: true };
  }

  protected concurrency(): number {
    return 10;
  }
}
