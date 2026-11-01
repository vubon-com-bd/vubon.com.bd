/**
 * HandleBkashWebhookCommand
 * @module payment-service/application/commands/webhook
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { BkashWebhookRequestDTO } from '@application/dtos/requests/webhook/index.js';

export class HandleBkashWebhookCommand extends BaseCommand {
  readonly type = 'payment.webhook.bkash';
  constructor(public readonly dto: BkashWebhookRequestDTO) {
    super();
  }
}
