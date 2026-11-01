/**
 * WebhookQueue
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

export interface ProcessWebhookPayload {
  readonly provider: string;
  readonly eventId: string;
  readonly paymentId?: string;
}

export interface RetryWebhookPayload extends ProcessWebhookPayload {
  readonly attempt: number;
}

@Injectable()
export class WebhookQueue {
  private readonly logger = new Logger(WebhookQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueProcess(payload: ProcessWebhookPayload): Promise<string> {
    return this.queueService.enqueue(
      PAYMENT_QUEUE_NAME.WEBHOOK,
      PAYMENT_JOB_NAME.PROCESS_WEBHOOK,
      payload,
      {
        priority: QUEUE_PRIORITY.HIGH,
        jobId: `process-webhook:${payload.provider}:${payload.eventId}`,
      },
    );
  }

  async enqueueRetry(
    payload: RetryWebhookPayload,
    delayMs: number = PAYMENT_QUEUE_LIMITS.RETRY_DELAY_MS,
  ): Promise<string> {
    return this.queueService.enqueue(
      PAYMENT_QUEUE_NAME.WEBHOOK,
      PAYMENT_JOB_NAME.RETRY_WEBHOOK,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `retry-webhook:${payload.provider}:${payload.eventId}:${payload.attempt}`,
      },
    );
  }
}
