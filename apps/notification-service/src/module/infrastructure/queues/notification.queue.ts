import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

export const NOTIFICATION_QUEUE = 'notification';

export interface SendNotificationJobPayload {
  readonly notificationId: string;
  readonly channel: string;
  readonly recipient: string;
}

@Injectable()
export class NotificationQueue {
  readonly queueName = NOTIFICATION_QUEUE;

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: SendNotificationJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'send', payload);
  }
}
