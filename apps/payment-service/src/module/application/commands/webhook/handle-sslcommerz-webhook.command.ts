/**
 * HandleSslcommerzWebhookCommand
 * @module payment-service/application/commands/webhook
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SslcommerzWebhookRequestDTO } from '@application/dtos/requests/webhook/index.js';

export class HandleSslcommerzWebhookCommand extends BaseCommand {
  readonly type = 'payment.webhook.sslcommerz';
  constructor(public readonly dto: SslcommerzWebhookRequestDTO) {
    super();
  }
}
