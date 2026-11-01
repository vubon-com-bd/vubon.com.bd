/**
 * NotificationQueue — main send pipeline queue
 * @module notification-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import {
  NOTIFICATION_QUEUE_NAME,
  NOTIFICATION_JOB_NAME,
  NOTIFICATION_QUEUE_PRIORITY,
  NOTIFICATION_QUEUE_LIMITS,
} from './queue.constants.js';

export interface SendJobPayload {
  readonly notificationId: string;
  readonly channel: string;
  readonly userId: string;
}

export interface SendBulkJobPayload {
  readonly notificationIds: readonly string[];
  readonly userId: string;
}

@Injectable()
export class NotificationQueue {
  private readonly logger = new Logger(NotificationQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueSend(
    payload: SendJobPayload,
    options?: { readonly delayMs?: number; readonly priority?: number },
  ): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.NOTIFICATION_PROCESSING,
      NOTIFICATION_JOB_NAME.SEND,
      payload,
      {
        priority: options?.priority ?? NOTIFICATION_QUEUE_PRIORITY.NORMAL,
        delayMs: options?.delayMs,
        jobId: `send:${payload.notificationId}`.replace(/[:.]/g, '-'),
      },
    );
  }

  async enqueueSendBulk(
    payload: SendBulkJobPayload,
    options?: { readonly delayMs?: number },
  ): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.NOTIFICATION_PROCESSING,
      NOTIFICATION_JOB_NAME.SEND_BULK,
      payload,
      {
        priority: NOTIFICATION_QUEUE_PRIORITY.NORMAL,
        delayMs: options?.delayMs,
        jobId: `send-bulk:${Date.now()}`.replace(/[:.]/g, '-'),
      },
    );
  }

  async enqueueDeliver(payload: SendJobPayload): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.NOTIFICATION_PROCESSING,
      NOTIFICATION_JOB_NAME.DELIVER,
      payload,
      {
        priority: NOTIFICATION_QUEUE_PRIORITY.HIGH,
        jobId: `deliver:${payload.notificationId}:${payload.channel}`.replace(/[:.]/g, '-'),
      },
    );
  }

  async getQueueMetrics(): Promise<{
    readonly waiting: number;
    readonly active: number;
    readonly failed: number;
    readonly completed: number;
  }> {
    const queue = this.queueService.getQueue(NOTIFICATION_QUEUE_NAME.NOTIFICATION_PROCESSING);
    const [waiting, active, failed, completed] = await Promise.all([
      queue.getWaitingCount(),
      queue.getActiveCount(),
      queue.getFailedCount(),
      queue.getCompletedCount(),
    ]);
    this.logger.debug(
      `Notification queue: waiting=${waiting} active=${active} failed=${failed}`,
    );
    return { waiting, active, failed, completed };
  }

  static readonly _limits = NOTIFICATION_QUEUE_LIMITS;
}
