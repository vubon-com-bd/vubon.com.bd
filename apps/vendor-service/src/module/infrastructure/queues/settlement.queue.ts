import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

const QUEUE_NAME = 'settlement';

@Injectable()
export class SettlementQueue {
  readonly queueName = QUEUE_NAME;
  constructor(private readonly queueService: QueueService) {}

  async enqueueProcessing(payload: { settlementId: string }): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'settlement-process', payload);
  }
}
