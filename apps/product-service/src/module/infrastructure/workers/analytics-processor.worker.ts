/**
 * AnalyticsProcessorWorker
 * @module product-service/infrastructure/workers
 */
import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import {
  PRODUCT_QUEUE_NAME,
  PRODUCT_JOB_NAME,
} from '../queues/queue.constants.js';
import type { RecordAnalyticsPayload } from '../queues/analytics.queue.js';

@Injectable()
export class AnalyticsProcessorWorker extends BaseWorker<RecordAnalyticsPayload> {
  protected readonly queueName = PRODUCT_QUEUE_NAME.ANALYTICS;
  protected readonly jobNames = [PRODUCT_JOB_NAME.RECORD_ANALYTICS] as const;

  constructor(queueService: QueueService) {
    super(queueService, 'AnalyticsProcessorWorker');
  }

  protected async handle(payload: RecordAnalyticsPayload): Promise<unknown> {
    // Real implementation: write to ClickHouse / BigQuery / events table.
    this.logger.debug(
      `Recorded analytics: ${payload.eventName} for ${payload.aggregateId}`,
    );
    return {
      recorded: true,
      aggregateId: payload.aggregateId,
      eventName: payload.eventName,
    };
  }

  protected concurrency(): number {
    return 20;
  }
}
