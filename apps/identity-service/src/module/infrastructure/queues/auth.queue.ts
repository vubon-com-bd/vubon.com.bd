/**
 * Auth Queue — generic enqueue helpers for auth events
 * @module identity-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { AUTH_QUEUE_NAME, AUTH_JOB_NAME } from './queue.constants.js';
import type { AnalyticsEventPayload } from './analytics.queue.js';

@Injectable()
export class AuthQueue {
  private readonly logger = new Logger(AuthQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueAnalytics(payload: AnalyticsEventPayload): Promise<string> {
    try {
      return await this.queueService.enqueue(
        AUTH_QUEUE_NAME.ANALYTICS,
        AUTH_JOB_NAME.ANALYTICS_EVENT,
        payload as unknown as Record<string, unknown>,
        {
          priority: QUEUE_PRIORITY.LOW,
          jobId: `analytics:${payload.eventName}:${Date.now()}`,
        },
      );
    } catch (err) {
      this.logger.warn(
        `enqueue analytics failed: ${err instanceof Error ? err.message : 'unknown'}`,
      );
      return '';
    }
  }
}
