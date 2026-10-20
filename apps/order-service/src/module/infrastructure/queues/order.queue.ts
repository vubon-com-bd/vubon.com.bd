/**
 * OrderQueue — enqueue helpers
 * @module order-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import {
  ORDER_QUEUE_NAME,
  ORDER_JOB_NAME,
  ORDER_QUEUE_LIMITS,
} from './queue.constants.js';

export interface ProcessOrderPayload {
  readonly orderId: string;
}

export interface RetryOrderPayload {
  readonly orderId: string;
  readonly attempt: number;
}

@Injectable()
export class OrderQueue {
  private readonly logger = new Logger(OrderQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueProcess(
    payload: ProcessOrderPayload,
    delayMs?: number,
  ): Promise<string> {
    return this.queueService.enqueue(
      ORDER_QUEUE_NAME.ORDER_PROCESSING,
      ORDER_JOB_NAME.PROCESS_ORDER,
      payload,
      {
        priority: QUEUE_PRIORITY.HIGH,
        delayMs,
        jobId: `process-order:${payload.orderId}`,
      },
    );
  }

  async enqueueAutoCancel(
    payload: ProcessOrderPayload,
    delayMs: number,
  ): Promise<string> {
    return this.queueService.enqueue(
      ORDER_QUEUE_NAME.ORDER_PROCESSING,
      ORDER_JOB_NAME.AUTO_CANCEL_ORDER,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `auto-cancel:${payload.orderId}`,
      },
    );
  }

  async enqueueRetry(
    payload: RetryOrderPayload,
    delayMs: number = ORDER_QUEUE_LIMITS.RETRY_DELAY_MS,
  ): Promise<string> {
    return this.queueService.enqueue(
      ORDER_QUEUE_NAME.ORDER_PROCESSING,
      ORDER_JOB_NAME.PROCESS_ORDER,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `retry:${payload.orderId}:${payload.attempt}`,
      },
    );
  }
}
