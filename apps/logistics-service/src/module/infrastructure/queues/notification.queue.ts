import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface NotificationJobPayload {
  readonly userId: string;
  readonly title: string;
  readonly body: string;
  readonly channels?: readonly string[];
}

@Injectable()
export class NotificationQueue {
  readonly queueName = QUEUE_NAME.NOTIFICATION;

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: NotificationJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'notification-job', payload, {
      priority: QUEUE_PRIORITY.NORMAL,
    });
  }
}
