import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

const QUEUE_NAME = 'commission';

@Injectable()
export class CommissionQueue {
  readonly queueName = QUEUE_NAME;
  constructor(private readonly queueService: QueueService) {}

  async enqueueCalculation(payload: {
    vendorId: string;
    orderId: string;
    orderAmount: number;
    currency: string;
  }): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'commission-calculate', payload);
  }
}
