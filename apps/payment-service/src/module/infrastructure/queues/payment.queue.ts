/**
 * PaymentQueue — enqueue helpers for payment lifecycle jobs
 * @module payment-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import {
  PAYMENT_QUEUE_NAME,
  PAYMENT_JOB_NAME,
  PAYMENT_QUEUE_LIMITS,
} from './queue.constants.js';

export interface ProcessPaymentPayload {
  readonly paymentId: string;
}

export interface RetryPaymentPayload {
  readonly paymentId: string;
  readonly attempt: number;
}

@Injectable()
export class PaymentQueue {
  private readonly logger = new Logger(PaymentQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueProcess(
    payload: ProcessPaymentPayload,
    delayMs?: number,
  ): Promise<string> {
    return this.queueService.enqueue(
      PAYMENT_QUEUE_NAME.PAYMENT_PROCESSING,
      PAYMENT_JOB_NAME.PROCESS_PAYMENT,
      payload,
      {
        priority: QUEUE_PRIORITY.HIGH,
        delayMs,
        jobId: `process-payment:${payload.paymentId}`,
      },
    );
  }

  async enqueueRetry(
    payload: RetryPaymentPayload,
    delayMs: number = PAYMENT_QUEUE_LIMITS.RETRY_DELAY_MS,
  ): Promise<string> {
    return this.queueService.enqueue(
      PAYMENT_QUEUE_NAME.PAYMENT_PROCESSING,
      PAYMENT_JOB_NAME.RETRY_PAYMENT,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `retry-payment:${payload.paymentId}:${payload.attempt}`,
      },
    );
  }

  async enqueueExpire(payload: ProcessPaymentPayload, delayMs: number): Promise<string> {
    return this.queueService.enqueue(
      PAYMENT_QUEUE_NAME.PAYMENT_PROCESSING,
      PAYMENT_JOB_NAME.EXPIRE_PAYMENT,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `expire-payment:${payload.paymentId}`,
      },
    );
  }
}
