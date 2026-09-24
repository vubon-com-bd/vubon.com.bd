import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

export const IN_APP_QUEUE = 'in_app';

export interface SendInAppJobPayload {
  readonly userId: string;
  readonly title: string;
  readonly body: string;
}

@Injectable()
export class InAppQueue {
  readonly queueName = IN_APP_QUEUE;

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: SendInAppJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'send', payload);
  }
}
