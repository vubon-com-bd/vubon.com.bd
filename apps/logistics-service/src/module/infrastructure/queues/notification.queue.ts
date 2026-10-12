import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

export interface NotificationJobPayload {
  readonly userId: string;
  readonly title: string;
  readonly body: string;
  readonly channels: readonly string[];
}

@Injectable()
export class NotificationQueue {
  constructor(private readonly queue: QueueService) {}
  async enqueue(payload: NotificationJobPayload): Promise<string> {
    return this.queue.enqueue(QUEUE_NAME.NOTIFICATION, 'notification.send', payload);
  }
}
