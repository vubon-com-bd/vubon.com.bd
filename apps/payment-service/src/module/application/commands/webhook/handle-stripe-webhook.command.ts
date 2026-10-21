/**
 * HandleStripeWebhookCommand
 * @module payment-service/application/commands/webhook
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { StripeWebhookRequestDTO } from '@application/dtos/requests/webhook/index.js';

export class HandleStripeWebhookCommand extends BaseCommand {
  readonly type = 'payment.webhook.stripe';
  constructor(public readonly dto: StripeWebhookRequestDTO) {
    super();
  }
}
