/**
 * PaymentQueue — enqueue helpers for payment-related jobs
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

export interface RetryPaymentPayload {
  readonly paymentId: string;
  readonly attempt: number;
}

export interface ExpirePaymentPayload {
  readonly paymentId: string;
}

export interface ReconcilePaymentPayload {
  readonly paymentId?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

@Injectable()
export class PaymentQueue {
  private readonly logger = new Logger(PaymentQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueRetry(
    payload: RetryPaymentPayload,
    delayMs: number = PAYMENT_QUEUE_LIMITS.RETRY_DELAY_MS,
  ): Promise<string> {
    const jobId = await this.queueService.enqueue(
      PAYMENT_QUEUE_NAME.PAYMENT_PROCESSING,
      PAYMENT_JOB_NAME.RETRY_PAYMENT,
      payload,
      {
        priority: QUEUE_PRIORITY.HIGH,
        delayMs,
        jobId: `retry:${payload.paymentId}:${payload.attempt}`,
      },
    );
    this.logger.debug(`enqueueRetry ${payload.paymentId} attempt=${payload.attempt}`);
    return jobId;
  }

  async enqueueExpire(
    payload: ExpirePaymentPayload,
    delayMs: number = 30 * 60 * 1000,
  ): Promise<string> {
    return this.queueService.enqueue(
      PAYMENT_QUEUE_NAME.PAYMENT_PROCESSING,
      PAYMENT_JOB_NAME.EXPIRE_PAYMENT,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `expire:${payload.paymentId}`,
      },
    );
  }

  async enqueueReconcile(payload: ReconcilePaymentPayload = {}): Promise<string> {
    return this.queueService.enqueue(
      PAYMENT_QUEUE_NAME.PAYMENT_PROCESSING,
      PAYMENT_JOB_NAME.RECONCILE_PAYMENT,
      payload as unknown as Record<string, unknown>,
      { priority: QUEUE_PRIORITY.LOW },
    );
  }
}
