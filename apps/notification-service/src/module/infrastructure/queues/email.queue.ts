/**
 * EmailQueue — email channel send queue
 * @module notification-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import {
  NOTIFICATION_QUEUE_NAME,
  NOTIFICATION_JOB_NAME,
  NOTIFICATION_QUEUE_PRIORITY,
} from './queue.constants.js';

export interface EmailJobPayload {
  readonly notificationId: string;
  readonly to: string;
  readonly subject: string;
  readonly text?: string;
  readonly html?: string;
  readonly templateId?: string;
  readonly variables?: Readonly<Record<string, unknown>>;
}

@Injectable()
export class EmailQueue {
  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: EmailJobPayload, delayMs?: number): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.EMAIL,
      NOTIFICATION_JOB_NAME.SEND,
      payload,
      {
        priority: NOTIFICATION_QUEUE_PRIORITY.HIGH,
        delayMs,
        jobId: `email:${payload.notificationId}`,
      },
    );
  }
}
