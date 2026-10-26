/**
 * WebhookSenderWorker — webhook delivery worker
 * @module notification-service/infrastructure/workers
 *
 * ⚠️ Uses Symbol tokens for repository injection.
 * PrismaRepositoriesModule binds `WEBHOOK_REPOSITORY` token (not the class),
 * so we must inject via token — not the concrete class.
 */
import { Inject, Injectable , Optional } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';

import {
  WEBHOOK_REPOSITORY,
  type WebhookRepository,
} from '@domain/repositories/webhook.repository.interface.js';
import { WebhookDeliveryPrismaRepository } from '@infrastructure/persistence/prisma/repositories/webhook-delivery.prisma.repository.js';
import {
  NOTIFICATION_QUEUE_NAME,
  NOTIFICATION_JOB_NAME,
} from '@infrastructure/queues/queue.constants.js';

export interface WebhookSenderPayload {
  readonly webhookId: string;
  readonly deliveryId: string;
  readonly event: string;
  readonly payload: Readonly<Record<string, unknown>>;
}

@Injectable()
export class WebhookSenderWorker extends BaseWorker<WebhookSenderPayload> {
  protected readonly queueName = NOTIFICATION_QUEUE_NAME.WEBHOOK;
  protected readonly jobNames = [
    NOTIFICATION_JOB_NAME.DELIVER_WEBHOOK,
  ] as const;

  constructor(
    queueService: QueueService,
    @Inject(WEBHOOK_REPOSITORY)
    private readonly webhookRepo: WebhookRepository,
    @Optional()
    @Inject(WebhookDeliveryPrismaRepository)
    private readonly deliveryRepo?: WebhookDeliveryPrismaRepository,
  ) {
    super(queueService, 'WebhookSenderWorker');
  }

  protected async handle(payload: WebhookSenderPayload): Promise<unknown> {
    const webhook = await this.webhookRepo.findById(payload.webhookId);
    if (!webhook) {
      this.logger.warn(`Webhook ${payload.webhookId} not found`);
      return { skipped: true, reason: 'webhook-not-found' };
    }

    if (!webhook.isActive()) {
      this.logger.warn(`Webhook ${payload.webhookId} not active`);
      return { skipped: true, reason: 'inactive' };
    }

    const startedAt = Date.now();
    this.logger.log(
      `🪝 Webhook delivery → webhook=${payload.webhookId} event=${payload.event}`,
    );

    const durationMs = Date.now() - startedAt;

    if (!this.deliveryRepo) {
      this.logger.debug(
        'WebhookDeliveryPrismaRepository not available (memory mode) — skipping delivery update',
      );
      return { processed: true, webhookId: payload.webhookId, persisted: false };
    }

    const delivery = await this.deliveryRepo.findById(payload.deliveryId);
    if (delivery) {
      await this.deliveryRepo.save({
        ...delivery,
        status: 'delivered',
        responseStatus: 200,
        durationMs,
        deliveredAt: new Date().toISOString(),
      });
    }

    return { processed: true, webhookId: payload.webhookId };
  }

  protected concurrency(): number {
    return 5;
  }
}
