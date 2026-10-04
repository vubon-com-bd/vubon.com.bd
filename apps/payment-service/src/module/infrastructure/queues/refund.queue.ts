/**
 * RefundQueue — enqueue helpers for refund jobs
 * @module payment-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { PAYMENT_QUEUE_NAME, PAYMENT_JOB_NAME } from './queue.constants.js';

export interface ProcessRefundPayload {
  readonly refundId: string;
}

export interface RetryRefundPayload {
  readonly refundId: string;
  readonly attempt: number;
}

@Injectable()
export class RefundQueue {
  private readonly logger = new Logger(RefundQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueProcess(payload: ProcessRefundPayload): Promise<string> {
    const jobId = await this.queueService.enqueue(
      PAYMENT_QUEUE_NAME.PAYMENT_PROCESSING,
      PAYMENT_JOB_NAME.PROCESS_REFUND,
      payload,
      { priority: QUEUE_PRIORITY.HIGH, jobId: `refund:${payload.refundId}` },
    );
    this.logger.debug(`enqueueProcess refund=${payload.refundId}`);
    return jobId;
  }

  async enqueueRetry(payload: RetryRefundPayload, delayMs = 60_000): Promise<string> {
    return this.queueService.enqueue(
      PAYMENT_QUEUE_NAME.PAYMENT_PROCESSING,
      PAYMENT_JOB_NAME.RETRY_REFUND,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `refund-retry:${payload.refundId}:${payload.attempt}`,
      },
    );
  }
}
