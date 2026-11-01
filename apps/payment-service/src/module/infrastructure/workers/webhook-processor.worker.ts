/**
 * WebhookProcessorWorker — replays webhooks for idempotent processing
 * @module payment-service/infrastructure/workers
 */
import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { PAYMENT_QUEUE_NAME } from '../queues/queue.constants.js';
import type { ProcessWebhookPayload } from '../queues/webhook.queue.js';

@Injectable()
export class WebhookProcessorWorker extends BaseWorker<ProcessWebhookPayload> {
  protected readonly queueName = PAYMENT_QUEUE_NAME.WEBHOOK;

  constructor(queueService: QueueService) {
    super(queueService, 'webhook-processor-worker');
  }

  protected async handle(payload: ProcessWebhookPayload): Promise<unknown> {
    // Real impl: dispatch to the appropriate Handle*WebhookCommand via CommandBus
    this.logger.log(
      `Webhook ${payload.provider}/${payload.eventId} processed (payment=${payload.paymentId ?? 'n/a'})`,
    );
    return { processed: true };
  }
}
