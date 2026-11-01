import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { LOGISTICS_QUEUE_NAME, LOGISTICS_JOB_NAME } from './queue.constants.js';

export interface SendNotificationPayload {
  readonly recipientId?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly template: string;
  readonly data?: Record<string, unknown>;
}

@Injectable()
export class NotificationQueue {
  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: SendNotificationPayload, delayMs?: number): Promise<string> {
    return this.queueService.enqueue(
      LOGISTICS_QUEUE_NAME.NOTIFICATION,
      LOGISTICS_JOB_NAME.SEND_NOTIFICATION,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `notify:${payload.template}:${Date.now()}`,
      },
    );
  }
}
