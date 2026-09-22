import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

const QUEUE_NAME = 'notification';

@Injectable()
export class NotificationQueue {
  readonly queueName = QUEUE_NAME;
  constructor(private readonly queueService: QueueService) {}

  async enqueueEmail(payload: {
    to: string;
    template: string;
    variables: Record<string, string | number | boolean>;
  }): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'send-email', payload);
  }

  async enqueueSms(payload: { to: string; message: string }): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'send-sms', payload);
  }

  async enqueuePush(payload: { deviceToken: string; title: string; body: string }): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'send-push', payload);
  }
}
