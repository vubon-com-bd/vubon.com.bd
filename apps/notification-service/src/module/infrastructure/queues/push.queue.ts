import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

export const PUSH_QUEUE = 'push';

export interface SendPushJobPayload {
  readonly deviceToken: string;
  readonly title: string;
  readonly body: string;
  readonly data?: Record<string, string>;
}

@Injectable()
export class PushQueue {
  readonly queueName = PUSH_QUEUE;

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: SendPushJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'send', payload);
  }
}
