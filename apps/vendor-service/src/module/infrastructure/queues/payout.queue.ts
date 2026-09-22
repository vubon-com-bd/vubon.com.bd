import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

const QUEUE_NAME = 'payout';

@Injectable()
export class PayoutQueue {
  readonly queueName = QUEUE_NAME;
  constructor(private readonly queueService: QueueService) {}

  async enqueueProcessing(payload: { payoutId: string }): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'payout-process', payload);
  }
}
