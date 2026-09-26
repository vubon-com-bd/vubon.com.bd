import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface RefundJobPayload {
  readonly refundId: string;
  readonly paymentId: string;
  readonly amount: number;
  readonly currency: string;
}

@Injectable()
export class RefundQueue {
  readonly queueName = 'refund';

  constructor(private readonly queueService: QueueService) {}

  async enqueueProcess(payload: RefundJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'process-refund', payload, {
      priority: QUEUE_PRIORITY.HIGH,
    });
  }
}
