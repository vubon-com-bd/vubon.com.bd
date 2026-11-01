/**
 * AnalyticsProcessorWorker — forwards auth events to analytics pipeline
 * @module identity-service/infrastructure/workers
 */
import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { AUTH_QUEUE_NAME, AUTH_JOB_NAME } from '../queues/queue.constants.js';
import type { AnalyticsEventPayload } from '../queues/analytics.queue.js';

@Injectable()
export class AnalyticsProcessorWorker extends BaseWorker<AnalyticsEventPayload> {
  protected readonly queueName = AUTH_QUEUE_NAME.ANALYTICS;
  protected readonly jobNames = [AUTH_JOB_NAME.ANALYTICS_EVENT] as const;

  constructor(queueService: QueueService) {
    super(queueService, 'AnalyticsProcessorWorker');
  }

  protected async handle(payload: AnalyticsEventPayload): Promise<unknown> {
    this.logger.debug(
      `analytics event: ${payload.eventName} user=${payload.userId ?? 'anonymous'}`,
    );
    // In production: forward to analytics-service or event bus
    return { accepted: true, eventName: payload.eventName };
  }

  protected concurrency(): number {
    return 4;
  }
}
