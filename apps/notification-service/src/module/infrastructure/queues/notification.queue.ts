/**
 * NotificationQueue — enqueue helpers for notification core jobs
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

export interface DispatchNotificationPayload {
  readonly notificationId: string;
  readonly channel: string;
  readonly userId: string;
  readonly priority?: string;
}

export interface ProcessQueuedPayload {
  readonly notificationId: string;
}

export interface RetryNotificationPayload {
  readonly notificationId: string;
  readonly attempt: number;
}

export interface ExpireNotificationPayload {
  readonly notificationId: string;
}

@Injectable()
export class NotificationQueue {
  private readonly logger = new Logger(NotificationQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueDispatch(payload: DispatchNotificationPayload, delayMs?: number): Promise<string> {
    const priority =
      payload.priority === 'critical'
        ? QUEUE_PRIORITY.CRITICAL
        : payload.priority === 'high'
          ? QUEUE_PRIORITY.HIGH
          : QUEUE_PRIORITY.NORMAL;
    const jobId = await this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.NOTIFICATION,
      NOTIFICATION_JOB_NAME.DISPATCH_NOTIFICATION,
      payload as unknown as Record<string, unknown>,
      {
        priority,
        delayMs,
        jobId: `dispatch:${payload.notificationId}`,
      },
    );
    this.logger.debug(`enqueueDispatch ${payload.notificationId} channel=${payload.channel}`);
    return jobId;
  }

  async enqueueProcessQueued(payload: ProcessQueuedPayload): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.NOTIFICATION,
      NOTIFICATION_JOB_NAME.PROCESS_QUEUED,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        jobId: `queued:${payload.notificationId}`,
      },
    );
  }

  async enqueueProcessScheduled(
    payload: ProcessQueuedPayload,
    scheduledAt: Date,
  ): Promise<string> {
    const delayMs = Math.max(0, scheduledAt.getTime() - Date.now());
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.NOTIFICATION,
      NOTIFICATION_JOB_NAME.PROCESS_SCHEDULED,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.HIGH,
        delayMs,
        jobId: `scheduled:${payload.notificationId}`,
      },
    );
  }

  async enqueueRetry(
    payload: RetryNotificationPayload,
    delayMs: number = NOTIFICATION_QUEUE_LIMITS.RETRY_DELAY_MS,
  ): Promise<string> {
    const jobId = await this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.NOTIFICATION,
      NOTIFICATION_JOB_NAME.RETRY_NOTIFICATION,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.HIGH,
        delayMs,
        jobId: `retry:${payload.notificationId}:${payload.attempt}`,
      },
    );
    this.logger.debug(`enqueueRetry ${payload.notificationId} attempt=${payload.attempt}`);
    return jobId;
  }

  async enqueueExpire(payload: ExpireNotificationPayload, delayMs: number = 30 * 60 * 1000): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.NOTIFICATION,
      NOTIFICATION_JOB_NAME.EXPIRE_NOTIFICATION,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.LOW,
        delayMs,
        jobId: `expire:${payload.notificationId}`,
      },
    );
  }
}
