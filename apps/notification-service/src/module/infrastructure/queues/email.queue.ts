import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

export const EMAIL_QUEUE = 'email';

export interface SendEmailJobPayload {
  readonly to: string;
  readonly subject: string;
  readonly html?: string;
  readonly text?: string;
}

@Injectable()
export class EmailQueue {
  readonly queueName = EMAIL_QUEUE;

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: SendEmailJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'send', payload);
  }
}
