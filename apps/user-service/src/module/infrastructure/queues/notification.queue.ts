/**
 * Notification Queue
 */
import { Injectable } from '@nestjs/common';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

export interface NotificationJobPayload {
  readonly userId: string;
  readonly channel: 'email' | 'sms' | 'push';
  readonly template: string;
  readonly data: Readonly<Record<string, unknown>>;
}

@Injectable()
export class NotificationQueue {
  static readonly name = QUEUE_NAME.NOTIFICATION;

  constructor(private readonly queues: QueueService) {}

  async enqueue(payload: NotificationJobPayload): Promise<void> {
    await this.queues.enqueue(
      NotificationQueue.name,
      'notification.dispatch',
      {
        userId: payload.userId,
        channel: payload.channel,
        template: payload.template,
        data: payload.data as Record<string, unknown>,
      },
      {
        priority: QUEUE_PRIORITY.HIGH,
      }
    );
  }
}
