/**
 * WebhookDelivererWorker — delivers outbound webhooks to subscriber endpoints
 * @module notification-service/infrastructure/workers
 *
 * Jobs: deliver-webhook, retry-webhook, disable-failing-webhook
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { WEBHOOK } from '@vubon/shared-constants/platform/notification';
import { BaseWorker } from './base.worker.js';
import { NOTIFICATION_QUEUE_NAME, NOTIFICATION_JOB_NAME } from '../queues/queue.constants.js';
import { WebhookQueue } from '../queues/webhook.queue.js';
import type {
  DeliverWebhookPayload,
  RetryWebhookPayload,
  DisableFailingWebhookPayload,
} from '../queues/webhook.queue.js';
import {
  WEBHOOK_REPOSITORY,
  type WebhookRepository,
} from '../../domain/repositories/webhook.repository.interface.js';
import { WebhookIdVO } from '../../domain/value-objects/primitives/webhook-id.vo.js';

const MAX_ATTEMPTS = 5;
const BACKOFF_MS = [10_000, 30_000, 120_000, 600_000, 3_600_000] as const;
const DISABLE_THRESHOLD = 20;

@Injectable()
export class WebhookDelivererWorker extends BaseWorker<
  DeliverWebhookPayload | RetryWebhookPayload | DisableFailingWebhookPayload
> {
  protected readonly queueName = NOTIFICATION_QUEUE_NAME.WEBHOOK;
  protected readonly jobNames = [
    NOTIFICATION_JOB_NAME.DELIVER_WEBHOOK,
    NOTIFICATION_JOB_NAME.RETRY_WEBHOOK,
    NOTIFICATION_JOB_NAME.DISABLE_FAILING_WEBHOOK,
  ] as const;

  constructor(
    queueService: QueueService,
    @Inject(WEBHOOK_REPOSITORY) private readonly webhookRepo: WebhookRepository,
    private readonly webhookQueue: WebhookQueue,
  ) {
    super(queueService, 'WebhookDelivererWorker');
  }

  protected async handle(
    payload:
      | DeliverWebhookPayload
      | RetryWebhookPayload
      | DisableFailingWebhookPayload,
  ): Promise<unknown> {
    const anyPayload = payload as unknown as Record<string, unknown>;
    const webhookId = String(anyPayload['webhookId'] ?? '');
    if (!webhookId) return { skipped: true, reason: 'no_id' };

    const vo = WebhookIdVO.create(webhookId);
    const webhook = await this.webhookRepo.findByIdVO(vo);
    if (!webhook) return { skipped: true, reason: 'not_found' };

    // disable-failing-webhook
    if ('failureCount' in anyPayload && !('event' in anyPayload)) {
      if (webhook.failureCount >= DISABLE_THRESHOLD) {
        webhook.disable(`Auto-disabled after ${webhook.failureCount} failures`);
        await this.webhookRepo.save(webhook);
        this.logger.warn(`Webhook ${webhookId} auto-disabled`);
        return { disabled: true };
      }
      return { skipped: true, reason: 'below_threshold' };
    }

    // deliver + retry
    const event = String(anyPayload['event'] ?? 'webhook.test');
    const attempt = Number(anyPayload['attempt'] ?? 1);
    const body = (anyPayload['payload'] as Record<string, unknown>) ?? {};

    const started = Date.now();
    let success = false;
    let status: number | undefined;
    let error: string | undefined;

    try {
      const res = await fetch(webhook.url.value, {
        method: webhook.method.value,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Vubon-Webhook/1.0',
          'X-Webhook-Event': event,
        },
        body: webhook.method.hasBody() ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(WEBHOOK.TIMEOUT_SECONDS * 1000),
      });
      status = res.status;
      success = res.ok;
      if (!success) error = `HTTP ${res.status}`;
    } catch (err) {
      error = (err as Error).message;
    }

    const durationMs = Date.now() - started;

    if (success) {
      webhook.recordDeliverySuccess(event, status ?? 200, durationMs);
      await this.webhookRepo.save(webhook);
      this.logger.log(`Webhook ${webhookId} delivered (${durationMs}ms)`);
      return { delivered: true, durationMs };
    }

    webhook.recordDeliveryFailure(event, attempt, error ?? 'unknown', status);
    await this.webhookRepo.save(webhook);

    if (attempt < MAX_ATTEMPTS) {
      const delay = BACKOFF_MS[attempt - 1] ?? BACKOFF_MS[BACKOFF_MS.length - 1];
      await this.webhookQueue.enqueueRetry(
        { webhookId, deliveryId: String(anyPayload['deliveryId'] ?? webhookId), attempt: attempt + 1 },
        delay,
      );
      this.logger.log(`Webhook retry scheduled in ${delay}ms (attempt ${attempt + 1})`);
    } else {
      this.logger.error(`Webhook ${webhookId} exhausted retries`);
    }

    return { delivered: false, retried: attempt < MAX_ATTEMPTS };
  }
}
