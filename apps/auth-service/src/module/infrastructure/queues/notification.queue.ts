import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface SendEmailJobPayload {
  readonly to: string;
  readonly template: string;
  readonly variables: Readonly<Record<string, string | number | boolean>>;
}

export interface SendSmsJobPayload {
  readonly to: string;
  readonly message: string;
}

export interface SendPushJobPayload {
  readonly deviceToken: string;
  readonly title: string;
  readonly body: string;
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

  async enqueueSms(payload: SendSmsJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'send-sms', payload, {
      priority: QUEUE_PRIORITY.HIGH,
    });
  }

  async enqueuePush(payload: SendPushJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'send-push', payload, {
      priority: QUEUE_PRIORITY.NORMAL,
    });
  }
}
