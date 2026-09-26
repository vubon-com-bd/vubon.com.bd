import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface PaymentJobPayload {
  readonly paymentId: string;
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
}

@Injectable()
export class PaymentQueue {
  readonly queueName = 'payment';

  constructor(private readonly queueService: QueueService) {}

  async enqueueProcess(payload: PaymentJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'process-payment', payload, {
      priority: QUEUE_PRIORITY.HIGH,
    });
  }

  async enqueueRetry(payload: PaymentJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'retry-payment', payload, {
      priority: QUEUE_PRIORITY.CRITICAL,
    });
  }
}
