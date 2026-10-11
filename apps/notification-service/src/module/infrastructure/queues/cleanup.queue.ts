/**
 * CleanupQueue — enqueue helpers for scheduled housekeeping jobs
 * @module notification-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import {
  NOTIFICATION_QUEUE_NAME,
  NOTIFICATION_JOB_NAME,
  NOTIFICATION_QUEUE_LIMITS,
} from './queue.constants.js';

export interface CleanupStalePayload {
  readonly olderThanMinutes: number;
}

export interface CleanupExpiredPayload {
  readonly batchSize?: number;
}

@Injectable()
export class CleanupQueue {
  private readonly logger = new Logger(CleanupQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueStaleCleanup(
    payload: CleanupStalePayload,
    delayMs: number = NOTIFICATION_QUEUE_LIMITS.CLEANUP_INTERVAL_MS,
  ): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.CLEANUP,
      NOTIFICATION_JOB_NAME.CLEANUP_STALE_NOTIFICATIONS,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.BACKGROUND,
        delayMs,
        jobId: `clean:stale:${Date.now()}`,
      },
    );
  }

  async enqueueExpiredCleanup(
    payload: CleanupExpiredPayload = {},
    delayMs: number = NOTIFICATION_QUEUE_LIMITS.CLEANUP_INTERVAL_MS,
  ): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.CLEANUP,
      NOTIFICATION_JOB_NAME.CLEANUP_EXPIRED_NOTIFICATIONS,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.BACKGROUND,
        delayMs,
        jobId: `clean:expired:${Date.now()}`,
      },
    );
  }

  async enqueueOldAttemptsCleanup(delayMs: number = 24 * 60 * 60 * 1000): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.CLEANUP,
      NOTIFICATION_JOB_NAME.CLEANUP_OLD_ATTEMPTS,
      {},
      {
        priority: QUEUE_PRIORITY.BACKGROUND,
        delayMs,
        jobId: `clean:attempts:${Date.now()}`,
      },
    );
  }

  async enqueueRateLimitCleanup(delayMs: number = 24 * 60 * 60 * 1000): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.CLEANUP,
      NOTIFICATION_JOB_NAME.CLEANUP_RATE_LIMITS,
      {},
      {
        priority: QUEUE_PRIORITY.BACKGROUND,
        delayMs,
        jobId: `clean:ratelimit:${Date.now()}`,
      },
    );
  }
}
