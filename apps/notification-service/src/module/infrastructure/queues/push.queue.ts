/**
 * PushQueue — push notification channel queue
 * @module notification-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import {
  NOTIFICATION_QUEUE_NAME,
  NOTIFICATION_JOB_NAME,
  NOTIFICATION_QUEUE_PRIORITY,
} from './queue.constants.js';

export interface PushJobPayload {
  readonly notificationId: string;
  readonly tokens: readonly string[];
  readonly title: string;
  readonly body: string;
  readonly data?: Readonly<Record<string, unknown>>;
  readonly silent?: boolean;
}

@Injectable()
export class PushQueue {
  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: PushJobPayload, delayMs?: number): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.PUSH,
      NOTIFICATION_JOB_NAME.SEND,
      payload,
      {
        priority: NOTIFICATION_QUEUE_PRIORITY.HIGH,
        delayMs,
        jobId: `push:${payload.notificationId}`,
      },
    );
  }
}
