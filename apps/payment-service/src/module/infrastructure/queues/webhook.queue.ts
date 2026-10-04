/**
 * WebhookQueue — enqueue helpers for webhook processing
 * @module payment-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { PAYMENT_QUEUE_NAME, PAYMENT_JOB_NAME } from './queue.constants.js';

export interface ProcessWebhookPayload {
  readonly webhookId: string;
}

export interface RetryWebhookPayload {
  readonly webhookId: string;
  readonly attempt: number;
}

@Injectable()
export class WebhookQueue {
  private readonly logger = new Logger(WebhookQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueProcess(payload: ProcessWebhookPayload): Promise<string> {
    const jobId = await this.queueService.enqueue(
      PAYMENT_QUEUE_NAME.WEBHOOK,
      PAYMENT_JOB_NAME.PROCESS_WEBHOOK,
      payload,
      { priority: QUEUE_PRIORITY.CRITICAL, jobId: `wh:${payload.webhookId}` },
    );
    this.logger.debug(`enqueueProcess webhook=${payload.webhookId}`);
    return jobId;
  }

  async enqueueRetry(payload: RetryWebhookPayload, delayMs = 60_000): Promise<string> {
    return this.queueService.enqueue(
      PAYMENT_QUEUE_NAME.WEBHOOK,
      PAYMENT_JOB_NAME.RETRY_WEBHOOK,
      payload,
      {
        priority: QUEUE_PRIORITY.HIGH,
        delayMs,
        jobId: `wh-retry:${payload.webhookId}:${payload.attempt}`,
      },
    );
  }

  async enqueueCleanupStale(delayMs = 60 * 60 * 1000): Promise<string> {
    return this.queueService.enqueue(
      PAYMENT_QUEUE_NAME.CLEANUP,
      PAYMENT_JOB_NAME.CLEANUP_STALE_WEBHOOKS,
      {},
      { priority: QUEUE_PRIORITY.BACKGROUND, delayMs },
    );
  }
}
