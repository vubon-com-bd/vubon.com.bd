import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface ProcessOrderJobPayload {
  readonly orderId: string;
  readonly correlationId?: string;
}

@Injectable()
export class OrderQueue {
  readonly queueName = QUEUE_NAME.AUTH;

  constructor(private readonly queueService: QueueService) {}

  async enqueueProcess(payload: ProcessOrderJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'process-order', payload, {
      priority: QUEUE_PRIORITY.HIGH,
    });
  }

  async enqueueTimeout(orderId: string, delayMs: number): Promise<string> {
    return this.queueService.enqueue(
      this.queueName,
      'timeout-order',
      { orderId },
      { priority: QUEUE_PRIORITY.NORMAL, delayMs },
    );
  }
}
