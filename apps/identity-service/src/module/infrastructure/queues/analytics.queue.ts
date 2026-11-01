/**
 * Analytics Queue — auth events → analytics-service
 * @module identity-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { AUTH_QUEUE_NAME, AUTH_JOB_NAME } from './queue.constants.js';

export interface AnalyticsEventPayload {
  readonly eventName: string;
  readonly userId?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly occurredAt: string;
}

@Injectable()
export class AnalyticsQueue {
  private readonly logger = new Logger(AnalyticsQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueEvent(payload: AnalyticsEventPayload): Promise<string> {
    try {
      return await this.queueService.enqueue(
        AUTH_QUEUE_NAME.ANALYTICS,
        AUTH_JOB_NAME.ANALYTICS_EVENT,
        payload as unknown as Record<string, unknown>,
        { priority: QUEUE_PRIORITY.LOW },
      );
    } catch (err) {
      this.logger.warn(`analytics enqueue failed: ${err instanceof Error ? err.message : 'unknown'}`);
      return '';
    }
  }
}
