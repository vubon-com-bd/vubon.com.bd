import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

export const WEBHOOK_QUEUE = 'webhook';

export interface SendWebhookJobPayload {
  readonly webhookId: string;
  readonly event: string;
  readonly url: string;
  readonly payload: Record<string, unknown>;
}

@Injectable()
export class WebhookQueue {
  readonly queueName = WEBHOOK_QUEUE;

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: SendWebhookJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'send', payload);
  }
}
