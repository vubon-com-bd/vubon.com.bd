/**
 * InAppQueue — in-app notification channel queue
 * @module notification-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import {
  NOTIFICATION_QUEUE_NAME,
  NOTIFICATION_JOB_NAME,
  NOTIFICATION_QUEUE_PRIORITY,
} from './queue.constants.js';

export interface InAppJobPayload {
  readonly notificationId: string;
  readonly userId: string;
  readonly title: string;
  readonly body: string;
  readonly imageUrl?: string;
  readonly actions?: readonly {
    readonly id: string;
    readonly label: string;
    readonly url?: string;
  }[];
}

@Injectable()
export class InAppQueue {
  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: InAppJobPayload): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.IN_APP,
      NOTIFICATION_JOB_NAME.SEND,
      payload,
      {
        priority: NOTIFICATION_QUEUE_PRIORITY.NORMAL,
        jobId: `in-app:${payload.notificationId}`,
      },
    );
  }
}
