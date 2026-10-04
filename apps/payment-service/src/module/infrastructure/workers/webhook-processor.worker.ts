/**
 * WebhookProcessorWorker — pulls unprocessed webhooks from DB and routes them
 * @module payment-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import {
  PAYMENT_QUEUE_NAME,
  PAYMENT_JOB_NAME,
} from '../queues/queue.constants.js';
import type { ProcessWebhookPayload } from '../queues/webhook.queue.js';
import { WebhookService } from '../../application/services/impl/webhook.service.js';

@Injectable()
export class WebhookProcessorWorker extends BaseWorker<ProcessWebhookPayload> {
  protected readonly queueName = PAYMENT_QUEUE_NAME.WEBHOOK;
  protected readonly jobNames = [
    PAYMENT_JOB_NAME.PROCESS_WEBHOOK,
    PAYMENT_JOB_NAME.RETRY_WEBHOOK,
  ] as const;

  constructor(
    queueService: QueueService,
    private readonly webhookService: WebhookService,
  ) {
    super(queueService, 'WebhookProcessorWorker');
  }

  protected async handle(payload: ProcessWebhookPayload): Promise<unknown> {
    const { webhookId } = payload;
    const event = await this.webhookService.getById(webhookId);
    if (!event) return { skipped: true, reason: 'not_found' };
    if (event.processed) return { skipped: true, reason: 'already_processed' };

    // Re-drive via service.process() — it re-routes based on payload
    const result = await this.webhookService.process({
      gateway: event.gateway,
      gatewayEventId: event.gatewayEventId,
      eventType: event.eventType,
      payload: {}, // service will pull from DB via dedup
      signature: undefined,
    });
    this.logger.log(`Webhook ${webhookId} re-processed: ${JSON.stringify(result)}`);
    return result;
  }

  protected concurrency(): number {
    return 3;
  }
}
