import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface SendEmailJobPayload {
  readonly to: string;
  readonly template: string;
  readonly variables: Readonly<Record<string, string | number | boolean>>;
}

@Injectable()
export class NotificationQueue {
  readonly queueName = QUEUE_NAME.NOTIFICATION;

  constructor(private readonly queueService: QueueService) {}

  async enqueueEmail(payload: SendEmailJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'send-email', payload, {
      priority: QUEUE_PRIORITY.NORMAL,
    });
  }
}
