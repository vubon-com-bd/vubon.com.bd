/**
 * AnalyticsProcessorWorker — sends events to analytics-service
 * @module order-service/infrastructure/workers
 */
import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { ORDER_QUEUE_NAME, ORDER_JOB_NAME } from '../queues/queue.constants.js';
import type { AnalyticsPayload } from '../queues/analytics.queue.js';

@Injectable()
export class AnalyticsProcessorWorker extends BaseWorker<AnalyticsPayload> {
  protected readonly queueName = ORDER_QUEUE_NAME.ANALYTICS;
  protected readonly jobNames = [ORDER_JOB_NAME.UPDATE_ANALYTICS] as const;

  constructor(queueService: QueueService) {
    super(queueService, 'AnalyticsProcessorWorker');
  }

  protected async handle(payload: AnalyticsPayload): Promise<unknown> {
    this.logger.debug(
      `Analytics event: ${payload.event} for order ${payload.orderId}`,
    );
    // Real integration: send to analytics-service via HTTP/BullMQ
    return { accepted: true, event: payload.event };
  }

  protected concurrency(): number {
    return 10;
  }
}
