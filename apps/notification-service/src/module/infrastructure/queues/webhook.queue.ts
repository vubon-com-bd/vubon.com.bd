/**
 * WebhookQueue — enqueue helpers for outbound webhook delivery
 * @module notification-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY, QUEUE_NAME } from '@vubon/shared-constants/infrastructure';
import { NOTIFICATION_QUEUE_NAME, NOTIFICATION_JOB_NAME } from './queue.constants.js';

export interface DeliverWebhookPayload {
  readonly webhookId: string;
  readonly event: string;
  readonly payload: Readonly<Record<string, unknown>>;
  readonly deliveryId?: string;
}

export interface RetryWebhookPayload {
  readonly webhookId: string;
  readonly deliveryId: string;
  readonly attempt: number;
}

export interface DisableFailingWebhookPayload {
  readonly webhookId: string;
  readonly failureCount: number;
}

@Injectable()
export class WebhookQueue {
  private readonly logger = new Logger(WebhookQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueDeliver(payload: DeliverWebhookPayload): Promise<string> {
    const jobId = await this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.WEBHOOK,
      NOTIFICATION_JOB_NAME.DELIVER_WEBHOOK,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.HIGH,
        jobId: payload.deliveryId
          ? `wh:${payload.deliveryId}`
          : `wh:${payload.webhookId}:${Date.now()}`,
      },
    );
    this.logger.debug(`enqueueDeliver webhook=${payload.webhookId} event=${payload.event}`);
    return jobId;
  }

  async enqueueRetry(payload: RetryWebhookPayload, delayMs: number = 60_000): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.WEBHOOK,
      NOTIFICATION_JOB_NAME.RETRY_WEBHOOK,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `wh:retry:${payload.deliveryId}:${payload.attempt}`,
      },
    );
  }

  async enqueueDisableFailing(payload: DisableFailingWebhookPayload): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.WEBHOOK,
      NOTIFICATION_JOB_NAME.DISABLE_FAILING_WEBHOOK,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.LOW,
        jobId: `wh:disable:${payload.webhookId}`,
      },
    );
  }

  /** Alias for payment-pattern consistency. */
  async enqueueCleanupStale(delayMs = 60 * 60 * 1000): Promise<string> {
    return this.queueService.enqueue(
      QUEUE_NAME.CLEANUP,
      NOTIFICATION_JOB_NAME.CLEANUP_OLD_ATTEMPTS,
      {},
      { priority: QUEUE_PRIORITY.BACKGROUND, delayMs },
    );
  }
}
