/**
 * CheckoutQueue
 * @module order-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { ORDER_QUEUE_NAME, ORDER_JOB_NAME } from './queue.constants.js';

export interface ProcessCheckoutPayload {
  readonly checkoutId: string;
}

@Injectable()
export class CheckoutQueue {
  private readonly logger = new Logger(CheckoutQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueProcess(
    payload: ProcessCheckoutPayload,
    delayMs?: number,
  ): Promise<string> {
    return this.queueService.enqueue(
      ORDER_QUEUE_NAME.ORDER_PROCESSING,
      ORDER_JOB_NAME.PROCESS_CHECKOUT,
      payload,
      {
        priority: QUEUE_PRIORITY.HIGH,
        delayMs,
        jobId: `process-checkout:${payload.checkoutId}`,
      },
    );
  }

  async enqueueCleanup(
    payload: ProcessCheckoutPayload,
    delayMs: number,
  ): Promise<string> {
    return this.queueService.enqueue(
      ORDER_QUEUE_NAME.CLEANUP,
      ORDER_JOB_NAME.CLEANUP_CHECKOUT,
      payload,
      {
        priority: QUEUE_PRIORITY.LOW,
        delayMs,
        jobId: `cleanup-checkout:${payload.checkoutId}`,
      },
    );
  }
}
