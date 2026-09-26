import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

export interface SmsJobPayload {
  readonly to: string;
  readonly message: string;
}

@Injectable()
export class SmsQueue {
  readonly queueName = 'marketing-sms';

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: SmsJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'send', payload);
  }
}
