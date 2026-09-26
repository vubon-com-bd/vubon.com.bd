import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface NotificationJobPayload {
  readonly type: 'email' | 'sms' | 'push';
  readonly to: string;
  readonly template: string;
  readonly variables: Readonly<Record<string, string | number | boolean>>;
}

@Injectable()
export class NotificationQueue {
  readonly queueName = 'notification';

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: NotificationJobPayload): Promise<string> {
    return this.queueService.enqueue(
      this.queueName,
      `send-${payload.type}`,
      payload,
      { priority: QUEUE_PRIORITY.NORMAL },
    );
  }
}
