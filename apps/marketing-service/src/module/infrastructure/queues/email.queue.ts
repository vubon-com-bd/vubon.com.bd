import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

export interface EmailJobPayload {
  readonly to: string;
  readonly template: string;
  readonly variables: Readonly<Record<string, string>>;
}

@Injectable()
export class EmailQueue {
  readonly queueName = 'marketing-email';

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: EmailJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'send', payload);
  }
}
