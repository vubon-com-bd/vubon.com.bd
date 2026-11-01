/**
 * Session Queue — cleanup + expiry jobs
 * @module identity-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import {
  AUTH_QUEUE_NAME,
  AUTH_JOB_NAME,
  AUTH_QUEUE_LIMITS,
} from './queue.constants.js';

export interface SessionCleanupPayload {
  readonly olderThanHours: number;
}

@Injectable()
export class SessionQueue {
  private readonly logger = new Logger(SessionQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueCleanup(
    payload: SessionCleanupPayload = { olderThanHours: 24 },
  ): Promise<string> {
    try {
      return await this.queueService.enqueue(
        AUTH_QUEUE_NAME.SESSION,
        AUTH_JOB_NAME.SESSION_CLEANUP,
        payload as unknown as Record<string, unknown>,
        {
          priority: QUEUE_PRIORITY.BACKGROUND,
          jobId: `session-cleanup:${Date.now()}`,
        },
      );
    } catch (err) {
      this.logger.warn(
        `session cleanup enqueue failed: ${err instanceof Error ? err.message : 'unknown'}`,
      );
      return '';
    }
  }

  async enqueueExpiringSoon(): Promise<string> {
    try {
      return await this.queueService.enqueue(
        AUTH_QUEUE_NAME.SESSION,
        AUTH_JOB_NAME.SESSION_EXPIRING_SOON,
        {} as Record<string, unknown>,
        {
          priority: QUEUE_PRIORITY.LOW,
          delayMs: AUTH_QUEUE_LIMITS.RETRY_DELAY_MS,
        },
      );
    } catch (err) {
      this.logger.warn(
        `session expiring-soon enqueue failed: ${err instanceof Error ? err.message : 'unknown'}`,
      );
      return '';
    }
  }
}
