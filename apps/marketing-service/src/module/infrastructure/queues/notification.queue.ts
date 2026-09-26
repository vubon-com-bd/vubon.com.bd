import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

export interface NotificationJobPayload {
  readonly userId: string;
  readonly channel: 'email' | 'sms' | 'push';
  readonly template: string;
}

@Injectable()
export class NotificationQueue {
  readonly queueName = 'marketing-notification';

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: NotificationJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, payload.channel, payload);
  }
}
