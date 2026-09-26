import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

export const SMS_QUEUE = 'sms';

export interface SendSmsJobPayload {
  readonly to: string;
  readonly body: string;
  readonly from?: string;
}

@Injectable()
export class SmsQueue {
  readonly queueName = SMS_QUEUE;

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: SendSmsJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'send', payload);
  }
}
