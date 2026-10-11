/**
 * InAppQueue — enqueue helpers for in-app notification jobs
 * @module notification-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { NOTIFICATION_QUEUE_NAME, NOTIFICATION_JOB_NAME } from './queue.constants.js';

export interface SendInAppPayload {
  readonly notificationId: string;
  readonly userId: string;
  readonly title: string;
  readonly body: string;
  readonly type: string;
  readonly data?: Readonly<Record<string, unknown>>;
}

export interface BroadcastInAppPayload {
  readonly batchId: string;
  readonly userIds: readonly string[];
  readonly title: string;
  readonly body: string;
  readonly data?: Readonly<Record<string, unknown>>;
}

export interface DeliverRealtimePayload {
  readonly notificationId: string;
  readonly userId: string;
}

@Injectable()
export class InAppQueue {
  private readonly logger = new Logger(InAppQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueSend(payload: SendInAppPayload): Promise<string> {
    const jobId = await this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.NOTIFICATION,
      NOTIFICATION_JOB_NAME.SEND_IN_APP,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        jobId: `inapp:${payload.notificationId}`,
      },
    );
    this.logger.debug(`enqueueSend inapp=${payload.notificationId} user=${payload.userId}`);
    return jobId;
  }

  async enqueueBroadcast(payload: BroadcastInAppPayload): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.NOTIFICATION,
      NOTIFICATION_JOB_NAME.BROADCAST_IN_APP,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        jobId: `inapp:broadcast:${payload.batchId}`,
      },
    );
  }

  async enqueueRealtime(payload: DeliverRealtimePayload): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.NOTIFICATION,
      NOTIFICATION_JOB_NAME.DELIVER_REALTIME,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.CRITICAL,
        jobId: `inapp:rt:${payload.notificationId}`,
      },
    );
  }
}
