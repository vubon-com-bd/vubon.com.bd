/**
 * WebhookQueue — webhook delivery + retry queue
 * @module notification-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import {
  NOTIFICATION_QUEUE_NAME,
  NOTIFICATION_JOB_NAME,
  NOTIFICATION_QUEUE_PRIORITY,
} from './queue.constants.js';

export interface DeliverWebhookJobPayload {
  readonly webhookId: string;
  readonly deliveryId: string;
  readonly event: string;
  readonly payload: Readonly<Record<string, unknown>>;
}

export interface RetryWebhookJobPayload {
  readonly deliveryId: string;
  readonly attempt: number;
}

@Injectable()
export class WebhookQueue {
  constructor(private readonly queueService: QueueService) {}

  async enqueueDeliver(payload: DeliverWebhookJobPayload): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.WEBHOOK,
      NOTIFICATION_JOB_NAME.DELIVER_WEBHOOK,
      payload,
      {
        priority: NOTIFICATION_QUEUE_PRIORITY.HIGH,
        jobId: `webhook:deliver:${payload.deliveryId}`,
      },
    );
  }

  async enqueueRetry(
    payload: RetryWebhookJobPayload,
    delayMs: number,
  ): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.WEBHOOK,
      NOTIFICATION_JOB_NAME.RETRY_WEBHOOK,
      payload,
      {
        priority: NOTIFICATION_QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `webhook:retry:${payload.deliveryId}:${payload.attempt}`,
      },
    );
  }
}
